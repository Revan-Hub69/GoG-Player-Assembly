-- Row Level Security (RLS) Policies for GoG Player Assembly
-- This file implements comprehensive security policies for all tables

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE servers ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE cspi_declarations ENABLE ROW LEVEL SECURITY;
ALTER TABLE cspi_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE discussion_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE discussion_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE developer_responses ENABLE ROW LEVEL SECURITY;

-- Helper function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = user_id 
        AND role = 'admin' 
        AND verified = true
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function to check if user is verified representative
CREATE OR REPLACE FUNCTION is_verified_representative(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = user_id 
        AND role = 'representative' 
        AND verified = true
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function to get user's server_id
CREATE OR REPLACE FUNCTION get_user_server_id(user_id UUID)
RETURNS UUID AS $$
DECLARE
    server_id UUID;
BEGIN
    SELECT p.server_id INTO server_id
    FROM profiles p
    WHERE p.id = user_id;
    
    RETURN server_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- PROFILES TABLE POLICIES
-- Users can read their own profile and other verified representatives' profiles
CREATE POLICY "Users can read own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Verified representatives can read other representatives" ON profiles
    FOR SELECT USING (
        is_verified_representative(auth.uid()) 
        AND role = 'representative' 
        AND verified = true
    );

CREATE POLICY "Admins can read all profiles" ON profiles
    FOR SELECT USING (is_admin(auth.uid()));

-- Users can update their own profile (except role and verified status)
CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id)
    WITH CHECK (
        auth.uid() = id 
        AND role = OLD.role 
        AND verified = OLD.verified
    );

-- Only admins can insert new profiles (during registration process)
CREATE POLICY "Admins can insert profiles" ON profiles
    FOR INSERT WITH CHECK (is_admin(auth.uid()));

-- Only admins can update role and verified status
CREATE POLICY "Admins can update profile verification" ON profiles
    FOR UPDATE USING (is_admin(auth.uid()));

-- SERVERS TABLE POLICIES
-- All verified representatives can read servers
CREATE POLICY "Verified representatives can read servers" ON servers
    FOR SELECT USING (is_verified_representative(auth.uid()) OR is_admin(auth.uid()));

-- Only admins can modify servers
CREATE POLICY "Admins can manage servers" ON servers
    FOR ALL USING (is_admin(auth.uid()));

-- PROPOSALS TABLE POLICIES
-- All verified representatives can read proposals
CREATE POLICY "Verified representatives can read proposals" ON proposals
    FOR SELECT USING (is_verified_representative(auth.uid()) OR is_admin(auth.uid()));

-- Verified representatives can create proposals
CREATE POLICY "Verified representatives can create proposals" ON proposals
    FOR INSERT WITH CHECK (
        is_verified_representative(auth.uid()) 
        AND auth.uid() = author_id
    );

-- Authors can update their own proposals (if not in voting status)
CREATE POLICY "Authors can update own proposals" ON proposals
    FOR UPDATE USING (
        auth.uid() = author_id 
        AND status NOT IN ('voting', 'approved', 'rejected')
    );

-- Admins can update any proposal
CREATE POLICY "Admins can update proposals" ON proposals
    FOR UPDATE USING (is_admin(auth.uid()));

-- VOTES TABLE POLICIES
-- Verified representatives can read votes
CREATE POLICY "Verified representatives can read votes" ON votes
    FOR SELECT USING (is_verified_representative(auth.uid()) OR is_admin(auth.uid()));

-- Verified representatives can cast votes (one per proposal)
CREATE POLICY "Verified representatives can vote" ON votes
    FOR INSERT WITH CHECK (
        is_verified_representative(auth.uid()) 
        AND auth.uid() = representative_id
        AND NOT EXISTS (
            SELECT 1 FROM votes 
            WHERE proposal_id = NEW.proposal_id 
            AND representative_id = auth.uid()
        )
    );

-- Representatives cannot update or delete votes (immutable)
-- Only admins can delete votes in exceptional circumstances
CREATE POLICY "Admins can delete votes" ON votes
    FOR DELETE USING (is_admin(auth.uid()));

-- FEEDBACK TABLE POLICIES
-- Representatives can read feedback from their own server
CREATE POLICY "Representatives can read own server feedback" ON feedback
    FOR SELECT USING (
        (is_verified_representative(auth.uid()) AND server_id = get_user_server_id(auth.uid()))
        OR is_admin(auth.uid())
    );

-- Representatives can create feedback for their own server
CREATE POLICY "Representatives can create feedback" ON feedback
    FOR INSERT WITH CHECK (
        is_verified_representative(auth.uid()) 
        AND auth.uid() = representative_id
        AND server_id = get_user_server_id(auth.uid())
    );

-- Representatives can update their own feedback
CREATE POLICY "Representatives can update own feedback" ON feedback
    FOR UPDATE USING (
        auth.uid() = representative_id
        AND is_verified_representative(auth.uid())
    );

-- CSPI DECLARATIONS TABLE POLICIES
-- All verified representatives can read CSPI declarations
CREATE POLICY "Verified representatives can read CSPI declarations" ON cspi_declarations
    FOR SELECT USING (is_verified_representative(auth.uid()) OR is_admin(auth.uid()));

-- Representatives can create declarations for their own server
CREATE POLICY "Representatives can create CSPI declarations" ON cspi_declarations
    FOR INSERT WITH CHECK (
        is_verified_representative(auth.uid()) 
        AND auth.uid() = representative_id
        AND server_id = get_user_server_id(auth.uid())
    );

-- Representatives cannot update CSPI declarations (immutable record)
-- Only admins can delete in exceptional circumstances
CREATE POLICY "Admins can delete CSPI declarations" ON cspi_declarations
    FOR DELETE USING (is_admin(auth.uid()));

-- CSPI SNAPSHOTS TABLE POLICIES
-- All verified representatives can read CSPI snapshots
CREATE POLICY "Verified representatives can read CSPI snapshots" ON cspi_snapshots
    FOR SELECT USING (is_verified_representative(auth.uid()) OR is_admin(auth.uid()));

-- Only system/admin can create snapshots
CREATE POLICY "Admins can create CSPI snapshots" ON cspi_snapshots
    FOR INSERT WITH CHECK (is_admin(auth.uid()));

-- MESSAGES TABLE POLICIES
-- Users can read messages sent to them or sent by them
CREATE POLICY "Users can read own messages" ON messages
    FOR SELECT USING (
        auth.uid() = sender_id 
        OR auth.uid() = recipient_id 
        OR (is_broadcast = true AND is_verified_representative(auth.uid()))
        OR is_admin(auth.uid())
    );

-- Verified representatives can send messages
CREATE POLICY "Verified representatives can send messages" ON messages
    FOR INSERT WITH CHECK (
        is_verified_representative(auth.uid()) 
        AND auth.uid() = sender_id
    );

-- Users can update read status of their received messages
CREATE POLICY "Users can update message read status" ON messages
    FOR UPDATE USING (auth.uid() = recipient_id)
    WITH CHECK (
        auth.uid() = recipient_id 
        AND sender_id = OLD.sender_id
        AND recipient_id = OLD.recipient_id
        AND subject = OLD.subject
        AND content = OLD.content
        AND is_broadcast = OLD.is_broadcast
        AND created_at = OLD.created_at
    );

-- DISCUSSION THREADS TABLE POLICIES
-- All verified representatives can read discussion threads
CREATE POLICY "Verified representatives can read discussion threads" ON discussion_threads
    FOR SELECT USING (is_verified_representative(auth.uid()) OR is_admin(auth.uid()));

-- Verified representatives can create discussion threads
CREATE POLICY "Verified representatives can create discussion threads" ON discussion_threads
    FOR INSERT WITH CHECK (
        is_verified_representative(auth.uid()) 
        AND auth.uid() = creator_id
    );

-- Thread creators can update their own threads
CREATE POLICY "Thread creators can update own threads" ON discussion_threads
    FOR UPDATE USING (
        auth.uid() = creator_id 
        AND is_verified_representative(auth.uid())
    );

-- DISCUSSION MESSAGES TABLE POLICIES
-- All verified representatives can read discussion messages
CREATE POLICY "Verified representatives can read discussion messages" ON discussion_messages
    FOR SELECT USING (is_verified_representative(auth.uid()) OR is_admin(auth.uid()));

-- Verified representatives can create discussion messages
CREATE POLICY "Verified representatives can create discussion messages" ON discussion_messages
    FOR INSERT WITH CHECK (
        is_verified_representative(auth.uid()) 
        AND auth.uid() = author_id
    );

-- Message authors can update their own messages
CREATE POLICY "Message authors can update own messages" ON discussion_messages
    FOR UPDATE USING (
        auth.uid() = author_id 
        AND is_verified_representative(auth.uid())
    );

-- DEVELOPER RESPONSES TABLE POLICIES
-- All verified representatives can read developer responses
CREATE POLICY "Verified representatives can read developer responses" ON developer_responses
    FOR SELECT USING (is_verified_representative(auth.uid()) OR is_admin(auth.uid()));

-- Only admins can create/update/delete developer responses
CREATE POLICY "Admins can manage developer responses" ON developer_responses
    FOR ALL USING (is_admin(auth.uid()));

-- Grant necessary permissions to authenticated users
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- Grant permissions for the helper functions
GRANT EXECUTE ON FUNCTION is_admin(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION is_verified_representative(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION get_user_server_id(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION get_latest_cspi_declarations() TO authenticated;
GRANT EXECUTE ON FUNCTION calculate_quorum(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION get_proposal_results(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION get_server_activity_summary() TO authenticated;
GRANT EXECUTE ON FUNCTION can_user_vote(UUID, UUID) TO authenticated;