-- Custom SQL functions for GoG Player Assembly

-- Function to get latest CSPI declaration for each server
CREATE OR REPLACE FUNCTION get_latest_cspi_declarations()
RETURNS TABLE (
    server_id UUID,
    representative_id UUID,
    propensity_level INTEGER,
    reasoning TEXT,
    created_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    SELECT DISTINCT ON (cd.server_id)
        cd.server_id,
        cd.representative_id,
        cd.propensity_level,
        cd.reasoning,
        cd.created_at
    FROM cspi_declarations cd
    INNER JOIN servers s ON cd.server_id = s.id
    WHERE s.active = true
    ORDER BY cd.server_id, cd.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to calculate quorum for voting
CREATE OR REPLACE FUNCTION calculate_quorum(proposal_id_param UUID)
RETURNS TABLE (
    total_representatives INTEGER,
    votes_cast INTEGER,
    quorum_met BOOLEAN,
    quorum_percentage DECIMAL
) AS $$
DECLARE
    total_reps INTEGER;
    votes_count INTEGER;
    quorum_threshold DECIMAL := 0.6; -- 60% quorum requirement
BEGIN
    -- Count total active verified representatives
    SELECT COUNT(*)
    INTO total_reps
    FROM profiles p
    INNER JOIN servers s ON p.server_id = s.id
    WHERE p.role = 'representative' 
    AND p.verified = true 
    AND s.active = true;
    
    -- Count votes for this proposal
    SELECT COUNT(*)
    INTO votes_count
    FROM votes v
    WHERE v.proposal_id = proposal_id_param;
    
    RETURN QUERY
    SELECT 
        total_reps,
        votes_count,
        (votes_count::DECIMAL / total_reps::DECIMAL) >= quorum_threshold,
        CASE 
            WHEN total_reps > 0 THEN (votes_count::DECIMAL / total_reps::DECIMAL)
            ELSE 0::DECIMAL
        END;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get proposal voting results
CREATE OR REPLACE FUNCTION get_proposal_results(proposal_id_param UUID)
RETURNS TABLE (
    approve_votes INTEGER,
    reject_votes INTEGER,
    abstain_votes INTEGER,
    total_votes INTEGER,
    total_representatives INTEGER,
    quorum_met BOOLEAN,
    majority_reached BOOLEAN,
    result VARCHAR
) AS $$
DECLARE
    approve_count INTEGER := 0;
    reject_count INTEGER := 0;
    abstain_count INTEGER := 0;
    total_count INTEGER := 0;
    total_reps INTEGER := 0;
    quorum_check BOOLEAN := false;
    majority_check BOOLEAN := false;
    final_result VARCHAR := 'pending';
BEGIN
    -- Get vote counts
    SELECT 
        COUNT(CASE WHEN vote = 'approve' THEN 1 END),
        COUNT(CASE WHEN vote = 'reject' THEN 1 END),
        COUNT(CASE WHEN vote = 'abstain' THEN 1 END),
        COUNT(*)
    INTO approve_count, reject_count, abstain_count, total_count
    FROM votes
    WHERE proposal_id = proposal_id_param;
    
    -- Get total representatives
    SELECT COUNT(*)
    INTO total_reps
    FROM profiles p
    INNER JOIN servers s ON p.server_id = s.id
    WHERE p.role = 'representative' 
    AND p.verified = true 
    AND s.active = true;
    
    -- Check quorum (60% participation)
    quorum_check := (total_count::DECIMAL / total_reps::DECIMAL) >= 0.6;
    
    -- Check majority (more approve than reject, excluding abstains)
    majority_check := approve_count > reject_count;
    
    -- Determine result
    IF quorum_check THEN
        IF majority_check THEN
            final_result := 'approved';
        ELSE
            final_result := 'rejected';
        END IF;
    ELSE
        final_result := 'insufficient_quorum';
    END IF;
    
    RETURN QUERY
    SELECT 
        approve_count,
        reject_count,
        abstain_count,
        total_count,
        total_reps,
        quorum_check,
        majority_check,
        final_result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get server activity summary
CREATE OR REPLACE FUNCTION get_server_activity_summary()
RETURNS TABLE (
    server_id UUID,
    server_name VARCHAR,
    representative_name VARCHAR,
    proposals_created INTEGER,
    votes_cast INTEGER,
    feedback_submitted INTEGER,
    cspi_declarations INTEGER,
    last_activity TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        s.id,
        s.name,
        p.name,
        COALESCE(prop_count.count, 0)::INTEGER,
        COALESCE(vote_count.count, 0)::INTEGER,
        COALESCE(feedback_count.count, 0)::INTEGER,
        COALESCE(cspi_count.count, 0)::INTEGER,
        GREATEST(
            p.last_active,
            COALESCE(prop_count.last_activity, '1970-01-01'::TIMESTAMP WITH TIME ZONE),
            COALESCE(vote_count.last_activity, '1970-01-01'::TIMESTAMP WITH TIME ZONE),
            COALESCE(feedback_count.last_activity, '1970-01-01'::TIMESTAMP WITH TIME ZONE),
            COALESCE(cspi_count.last_activity, '1970-01-01'::TIMESTAMP WITH TIME ZONE)
        )
    FROM servers s
    LEFT JOIN profiles p ON s.representative_id = p.id
    LEFT JOIN (
        SELECT 
            author_id, 
            COUNT(*) as count,
            MAX(created_at) as last_activity
        FROM proposals 
        GROUP BY author_id
    ) prop_count ON p.id = prop_count.author_id
    LEFT JOIN (
        SELECT 
            representative_id, 
            COUNT(*) as count,
            MAX(created_at) as last_activity
        FROM votes 
        GROUP BY representative_id
    ) vote_count ON p.id = vote_count.representative_id
    LEFT JOIN (
        SELECT 
            representative_id, 
            COUNT(*) as count,
            MAX(created_at) as last_activity
        FROM feedback 
        GROUP BY representative_id
    ) feedback_count ON p.id = feedback_count.representative_id
    LEFT JOIN (
        SELECT 
            representative_id, 
            COUNT(*) as count,
            MAX(created_at) as last_activity
        FROM cspi_declarations 
        GROUP BY representative_id
    ) cspi_count ON p.id = cspi_count.representative_id
    WHERE s.active = true
    ORDER BY s.name;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user can vote on proposal
CREATE OR REPLACE FUNCTION can_user_vote(user_id_param UUID, proposal_id_param UUID)
RETURNS BOOLEAN AS $$
DECLARE
    user_verified BOOLEAN := false;
    user_is_representative BOOLEAN := false;
    already_voted BOOLEAN := false;
    proposal_status VARCHAR;
    voting_deadline TIMESTAMP WITH TIME ZONE;
BEGIN
    -- Check if user is verified representative
    SELECT verified, (role = 'representative')
    INTO user_verified, user_is_representative
    FROM profiles
    WHERE id = user_id_param;
    
    -- Check if already voted
    SELECT EXISTS(
        SELECT 1 FROM votes 
        WHERE proposal_id = proposal_id_param 
        AND representative_id = user_id_param
    ) INTO already_voted;
    
    -- Check proposal status and deadline
    SELECT status, voting_deadline
    INTO proposal_status, voting_deadline
    FROM proposals
    WHERE id = proposal_id_param;
    
    -- Return true if all conditions are met
    RETURN (
        user_verified = true AND
        user_is_representative = true AND
        already_voted = false AND
        proposal_status IN ('active', 'voting') AND
        (voting_deadline IS NULL OR voting_deadline > NOW())
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;