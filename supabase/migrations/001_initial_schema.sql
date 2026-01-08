-- GoG Player Assembly Database Schema
-- Initial migration for all core tables

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE user_role AS ENUM ('representative', 'admin');
CREATE TYPE proposal_category AS ENUM ('gameplay', 'economy', 'events', 'technical');
CREATE TYPE proposal_status AS ENUM ('draft', 'active', 'voting', 'approved', 'rejected');
CREATE TYPE vote_type AS ENUM ('approve', 'reject', 'abstain');
CREATE TYPE cspi_level AS ENUM ('0', '1', '2', '3', '4');

-- Servers table
CREATE TABLE servers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL UNIQUE,
    region VARCHAR(100) NOT NULL,
    representative_id UUID UNIQUE, -- Will reference profiles table
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Profiles table (extends Supabase auth.users)
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    server_id UUID REFERENCES servers(id) ON DELETE SET NULL,
    role user_role DEFAULT 'representative',
    verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_active TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add foreign key constraint from servers to profiles
ALTER TABLE servers 
ADD CONSTRAINT fk_servers_representative 
FOREIGN KEY (representative_id) REFERENCES profiles(id) ON DELETE SET NULL;

-- Proposals table
CREATE TABLE proposals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(500) NOT NULL,
    description TEXT NOT NULL,
    category proposal_category NOT NULL,
    author_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    status proposal_status DEFAULT 'draft',
    voting_deadline TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Votes table
CREATE TABLE votes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    proposal_id UUID NOT NULL REFERENCES proposals(id) ON DELETE CASCADE,
    representative_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    vote vote_type NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Ensure one vote per representative per proposal
    UNIQUE(proposal_id, representative_id)
);

-- Feedback table
CREATE TABLE feedback (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    content TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    server_id UUID NOT NULL REFERENCES servers(id) ON DELETE CASCADE,
    representative_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    related_proposal_id UUID REFERENCES proposals(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- CSPI Declarations table
CREATE TABLE cspi_declarations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    server_id UUID NOT NULL REFERENCES servers(id) ON DELETE CASCADE,
    representative_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    propensity_level INTEGER NOT NULL CHECK (propensity_level >= 0 AND propensity_level <= 4),
    reasoning TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Ensure one active declaration per server (latest is active)
    UNIQUE(server_id, created_at)
);

-- CSPI Snapshots table (historical CSPI values)
CREATE TABLE cspi_snapshots (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    value DECIMAL(5,4) NOT NULL CHECK (value >= 0 AND value <= 1), -- 0-1 normalized
    participating_servers INTEGER NOT NULL,
    total_servers INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Messages table (for representative communication)
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sender_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    recipient_id UUID REFERENCES profiles(id) ON DELETE CASCADE, -- NULL for broadcast
    subject VARCHAR(255),
    content TEXT NOT NULL,
    is_broadcast BOOLEAN DEFAULT false,
    read_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Discussion threads table
CREATE TABLE discussion_threads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    creator_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    related_proposal_id UUID REFERENCES proposals(id) ON DELETE SET NULL,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Discussion messages table
CREATE TABLE discussion_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    thread_id UUID NOT NULL REFERENCES discussion_threads(id) ON DELETE CASCADE,
    author_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Developer responses table
CREATE TABLE developer_responses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    proposal_id UUID NOT NULL REFERENCES proposals(id) ON DELETE CASCADE,
    response_text TEXT NOT NULL,
    developer_name VARCHAR(255),
    developer_email VARCHAR(255),
    response_type VARCHAR(50) DEFAULT 'general', -- 'accepted', 'rejected', 'deferred', 'general'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_profiles_server_id ON profiles(server_id);
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_verified ON profiles(verified);
CREATE INDEX idx_servers_active ON servers(active);
CREATE INDEX idx_servers_representative_id ON servers(representative_id);
CREATE INDEX idx_proposals_author_id ON proposals(author_id);
CREATE INDEX idx_proposals_status ON proposals(status);
CREATE INDEX idx_proposals_category ON proposals(category);
CREATE INDEX idx_proposals_voting_deadline ON proposals(voting_deadline);
CREATE INDEX idx_votes_proposal_id ON votes(proposal_id);
CREATE INDEX idx_votes_representative_id ON votes(representative_id);
CREATE INDEX idx_feedback_server_id ON feedback(server_id);
CREATE INDEX idx_feedback_representative_id ON feedback(representative_id);
CREATE INDEX idx_feedback_related_proposal_id ON feedback(related_proposal_id);
CREATE INDEX idx_cspi_declarations_server_id ON cspi_declarations(server_id);
CREATE INDEX idx_cspi_declarations_created_at ON cspi_declarations(created_at DESC);
CREATE INDEX idx_cspi_snapshots_created_at ON cspi_snapshots(created_at DESC);
CREATE INDEX idx_messages_sender_id ON messages(sender_id);
CREATE INDEX idx_messages_recipient_id ON messages(recipient_id);
CREATE INDEX idx_messages_created_at ON messages(created_at DESC);
CREATE INDEX idx_discussion_threads_creator_id ON discussion_threads(creator_id);
CREATE INDEX idx_discussion_threads_related_proposal_id ON discussion_threads(related_proposal_id);
CREATE INDEX idx_discussion_messages_thread_id ON discussion_messages(thread_id);
CREATE INDEX idx_discussion_messages_author_id ON discussion_messages(author_id);
CREATE INDEX idx_developer_responses_proposal_id ON developer_responses(proposal_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_servers_updated_at BEFORE UPDATE ON servers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_proposals_updated_at BEFORE UPDATE ON proposals FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_feedback_updated_at BEFORE UPDATE ON feedback FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_discussion_threads_updated_at BEFORE UPDATE ON discussion_threads FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_discussion_messages_updated_at BEFORE UPDATE ON discussion_messages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create function to ensure single representative per server
CREATE OR REPLACE FUNCTION ensure_single_representative()
RETURNS TRIGGER AS $$
BEGIN
    -- If we're setting a representative_id on a server
    IF NEW.representative_id IS NOT NULL AND (OLD.representative_id IS NULL OR OLD.representative_id != NEW.representative_id) THEN
        -- Remove this representative from any other server
        UPDATE servers 
        SET representative_id = NULL 
        WHERE representative_id = NEW.representative_id AND id != NEW.id;
        
        -- Update the profile's server_id
        UPDATE profiles 
        SET server_id = NEW.id 
        WHERE id = NEW.representative_id;
    END IF;
    
    -- If we're removing a representative from a server
    IF NEW.representative_id IS NULL AND OLD.representative_id IS NOT NULL THEN
        -- Clear the server_id from the profile
        UPDATE profiles 
        SET server_id = NULL 
        WHERE id = OLD.representative_id;
    END IF;
    
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add trigger for single representative constraint
CREATE TRIGGER ensure_single_representative_trigger 
    BEFORE UPDATE ON servers 
    FOR EACH ROW 
    EXECUTE FUNCTION ensure_single_representative();

-- Create function to update last_active on profile access
CREATE OR REPLACE FUNCTION update_last_active()
RETURNS TRIGGER AS $$
BEGIN
    NEW.last_active = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add trigger for last_active updates (will be triggered by app logic)
CREATE TRIGGER update_profiles_last_active 
    BEFORE UPDATE ON profiles 
    FOR EACH ROW 
    WHEN (OLD.last_active IS DISTINCT FROM NEW.last_active)
    EXECUTE FUNCTION update_last_active();