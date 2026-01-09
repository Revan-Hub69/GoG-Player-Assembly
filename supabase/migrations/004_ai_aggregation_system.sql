-- AI Aggregation System Migration
-- Adds tables for AI-powered proposal aggregation and kingdom participation tracking

-- Raw proposals submitted by representatives
CREATE TABLE raw_proposals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(500) NOT NULL,
    description TEXT NOT NULL,
    category proposal_category NOT NULL,
    priority INTEGER DEFAULT 3 CHECK (priority >= 1 AND priority <= 5), -- 1=critical, 5=low
    submitted_by UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    server_id UUID NOT NULL REFERENCES servers(id) ON DELETE CASCADE,
    technical_details TEXT,
    expected_outcome TEXT,
    community_impact TEXT,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'aggregated', 'rejected')),
    ai_processed BOOLEAN DEFAULT false,
    ai_processing_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI aggregated requests (final output)
CREATE TABLE aggregated_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(500) NOT NULL,
    description TEXT NOT NULL,
    category proposal_category NOT NULL,
    priority INTEGER NOT NULL CHECK (priority >= 1 AND priority <= 5),
    technical_specification TEXT NOT NULL,
    expected_outcome TEXT NOT NULL,
    community_impact_analysis TEXT NOT NULL,
    implementation_suggestions TEXT,
    source_proposal_count INTEGER DEFAULT 0,
    ai_confidence_score DECIMAL(3,2) CHECK (ai_confidence_score >= 0 AND ai_confidence_score <= 1),
    status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'review', 'submitted', 'acknowledged', 'implemented')),
    submitted_to_developers_at TIMESTAMP WITH TIME ZONE,
    developer_response TEXT,
    developer_response_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Link raw proposals to aggregated requests
CREATE TABLE proposal_aggregation_links (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    raw_proposal_id UUID NOT NULL REFERENCES raw_proposals(id) ON DELETE CASCADE,
    aggregated_request_id UUID NOT NULL REFERENCES aggregated_requests(id) ON DELETE CASCADE,
    similarity_score DECIMAL(3,2) CHECK (similarity_score >= 0 AND similarity_score <= 1),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(raw_proposal_id, aggregated_request_id)
);

-- Kingdom participation tracking
CREATE TABLE kingdom_participation (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    server_id UUID NOT NULL REFERENCES servers(id) ON DELETE CASCADE UNIQUE,
    representative_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    participation_status VARCHAR(50) DEFAULT 'pending' CHECK (participation_status IN ('pending', 'active', 'inactive', 'suspended')),
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_activity_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    proposals_submitted INTEGER DEFAULT 0,
    engagement_score DECIMAL(3,2) DEFAULT 0.0 CHECK (engagement_score >= 0 AND engagement_score <= 1),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI processing logs
CREATE TABLE ai_processing_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    processing_type VARCHAR(100) NOT NULL, -- 'similarity_analysis', 'aggregation', 'technical_validation'
    input_data JSONB,
    output_data JSONB,
    processing_time_ms INTEGER,
    success BOOLEAN DEFAULT true,
    error_message TEXT,
    ai_model_used VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Monthly assembly reports
CREATE TABLE assembly_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    report_month DATE NOT NULL, -- First day of the month
    total_raw_proposals INTEGER DEFAULT 0,
    total_aggregated_requests INTEGER DEFAULT 0,
    participating_kingdoms INTEGER DEFAULT 0,
    active_representatives INTEGER DEFAULT 0,
    requests_submitted_to_developers INTEGER DEFAULT 0,
    developer_responses_received INTEGER DEFAULT 0,
    report_data JSONB, -- Detailed statistics
    generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(report_month)
);

-- Create indexes
CREATE INDEX idx_raw_proposals_submitted_by ON raw_proposals(submitted_by);
CREATE INDEX idx_raw_proposals_server_id ON raw_proposals(server_id);
CREATE INDEX idx_raw_proposals_status ON raw_proposals(status);
CREATE INDEX idx_raw_proposals_ai_processed ON raw_proposals(ai_processed);
CREATE INDEX idx_raw_proposals_category ON raw_proposals(category);
CREATE INDEX idx_raw_proposals_created_at ON raw_proposals(created_at DESC);

CREATE INDEX idx_aggregated_requests_status ON aggregated_requests(status);
CREATE INDEX idx_aggregated_requests_category ON aggregated_requests(category);
CREATE INDEX idx_aggregated_requests_priority ON aggregated_requests(priority);
CREATE INDEX idx_aggregated_requests_created_at ON aggregated_requests(created_at DESC);

CREATE INDEX idx_proposal_aggregation_links_raw_proposal_id ON proposal_aggregation_links(raw_proposal_id);
CREATE INDEX idx_proposal_aggregation_links_aggregated_request_id ON proposal_aggregation_links(aggregated_request_id);

CREATE INDEX idx_kingdom_participation_server_id ON kingdom_participation(server_id);
CREATE INDEX idx_kingdom_participation_representative_id ON kingdom_participation(representative_id);
CREATE INDEX idx_kingdom_participation_status ON kingdom_participation(participation_status);
CREATE INDEX idx_kingdom_participation_last_activity ON kingdom_participation(last_activity_at DESC);

CREATE INDEX idx_ai_processing_logs_processing_type ON ai_processing_logs(processing_type);
CREATE INDEX idx_ai_processing_logs_created_at ON ai_processing_logs(created_at DESC);
CREATE INDEX idx_ai_processing_logs_success ON ai_processing_logs(success);

CREATE INDEX idx_assembly_reports_report_month ON assembly_reports(report_month DESC);

-- Add updated_at triggers
CREATE TRIGGER update_raw_proposals_updated_at BEFORE UPDATE ON raw_proposals FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_aggregated_requests_updated_at BEFORE UPDATE ON aggregated_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_kingdom_participation_updated_at BEFORE UPDATE ON kingdom_participation FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to update kingdom participation stats
CREATE OR REPLACE FUNCTION update_kingdom_participation_stats()
RETURNS TRIGGER AS $
BEGIN
    -- Update proposals_submitted count
    IF TG_OP = 'INSERT' AND NEW.status = 'pending' THEN
        UPDATE kingdom_participation 
        SET 
            proposals_submitted = proposals_submitted + 1,
            last_activity_at = NOW()
        WHERE server_id = NEW.server_id;
    END IF;
    
    RETURN COALESCE(NEW, OLD);
END;
$ language 'plpgsql';

-- Trigger to update participation stats when raw proposals are added
CREATE TRIGGER update_participation_stats_trigger 
    AFTER INSERT ON raw_proposals 
    FOR EACH ROW 
    EXECUTE FUNCTION update_kingdom_participation_stats();

-- Function to calculate engagement scores
CREATE OR REPLACE FUNCTION calculate_engagement_score(server_uuid UUID)
RETURNS DECIMAL(3,2) AS $
DECLARE
    proposal_count INTEGER;
    days_since_join INTEGER;
    last_activity_days INTEGER;
    score DECIMAL(3,2);
BEGIN
    SELECT 
        proposals_submitted,
        EXTRACT(DAYS FROM NOW() - joined_at)::INTEGER,
        EXTRACT(DAYS FROM NOW() - last_activity_at)::INTEGER
    INTO proposal_count, days_since_join, last_activity_days
    FROM kingdom_participation 
    WHERE server_id = server_uuid;
    
    -- Base score from proposal activity (0-0.6)
    score := LEAST(0.6, proposal_count * 0.1);
    
    -- Activity recency bonus (0-0.3)
    IF last_activity_days <= 7 THEN
        score := score + 0.3;
    ELSIF last_activity_days <= 30 THEN
        score := score + 0.2;
    ELSIF last_activity_days <= 90 THEN
        score := score + 0.1;
    END IF;
    
    -- Consistency bonus (0-0.1)
    IF days_since_join > 0 AND proposal_count > 0 THEN
        score := score + LEAST(0.1, (proposal_count::DECIMAL / days_since_join) * 30);
    END IF;
    
    RETURN LEAST(1.0, score);
END;
$ language 'plpgsql';

-- View for kingdom statistics
CREATE VIEW kingdom_stats AS
SELECT 
    s.id as server_id,
    s.name as kingdom_name,
    s.region,
    p.name as representative_name,
    p.email as representative_email,
    kp.participation_status,
    kp.joined_at,
    kp.last_activity_at,
    kp.proposals_submitted,
    kp.engagement_score,
    CASE 
        WHEN kp.last_activity_at > NOW() - INTERVAL '7 days' THEN 'active'
        WHEN kp.last_activity_at > NOW() - INTERVAL '30 days' THEN 'recent'
        ELSE 'inactive'
    END as activity_status
FROM servers s
LEFT JOIN kingdom_participation kp ON s.id = kp.server_id
LEFT JOIN profiles p ON kp.representative_id = p.id
WHERE s.active = true;

-- View for AI processing dashboard
CREATE VIEW ai_processing_dashboard AS
SELECT 
    DATE_TRUNC('day', created_at) as processing_date,
    processing_type,
    COUNT(*) as total_operations,
    COUNT(*) FILTER (WHERE success = true) as successful_operations,
    COUNT(*) FILTER (WHERE success = false) as failed_operations,
    AVG(processing_time_ms) as avg_processing_time_ms,
    MAX(processing_time_ms) as max_processing_time_ms
FROM ai_processing_logs
WHERE created_at > NOW() - INTERVAL '30 days'
GROUP BY DATE_TRUNC('day', created_at), processing_type
ORDER BY processing_date DESC, processing_type;