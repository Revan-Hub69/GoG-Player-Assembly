-- Seed data for GoG Player Assembly
-- This file contains sample data for development and testing

-- Insert sample servers
INSERT INTO servers (id, name, region, active) VALUES
    ('550e8400-e29b-41d4-a716-446655440001', 'Server Alpha', 'Europe', true),
    ('550e8400-e29b-41d4-a716-446655440002', 'Server Beta', 'North America', true),
    ('550e8400-e29b-41d4-a716-446655440003', 'Server Gamma', 'Asia Pacific', true),
    ('550e8400-e29b-41d4-a716-446655440004', 'Server Delta', 'Europe', true),
    ('550e8400-e29b-41d4-a716-446655440005', 'Server Epsilon', 'South America', true);

-- Note: Profiles will be created through Supabase Auth signup process
-- The following are example profiles that would be created after user registration

-- Sample CSPI declarations (these would be created after profiles exist)
-- INSERT INTO cspi_declarations (server_id, representative_id, propensity_level, reasoning) VALUES
--     ('550e8400-e29b-41d4-a716-446655440001', 'user-uuid-1', 2, 'Recent changes have caused some concern among players'),
--     ('550e8400-e29b-41d4-a716-446655440002', 'user-uuid-2', 1, 'Players are generally satisfied with current state'),
--     ('550e8400-e29b-41d4-a716-446655440003', 'user-uuid-3', 3, 'Significant issues with recent update affecting player engagement');

-- Sample CSPI snapshot (historical data)
INSERT INTO cspi_snapshots (value, participating_servers, total_servers) VALUES
    (0.4500, 3, 5),
    (0.3200, 4, 5),
    (0.5100, 5, 5);

-- Sample discussion threads (these would be created after profiles exist)
-- INSERT INTO discussion_threads (title, description, creator_id) VALUES
--     ('Economy Balance Discussion', 'Discussion about recent economy changes and their impact', 'user-uuid-1'),
--     ('Event Scheduling Coordination', 'Coordinating feedback on event timing across regions', 'user-uuid-2');

-- Sample proposals (these would be created after profiles exist)
-- INSERT INTO proposals (title, description, category, author_id, status) VALUES
--     ('Reduce Resource Costs', 'Proposal to reduce building upgrade costs by 20%', 'economy', 'user-uuid-1', 'active'),
--     ('New PvP Event Format', 'Introduction of weekly cross-server tournaments', 'events', 'user-uuid-2', 'draft'),
--     ('Bug Fix: Alliance Chat', 'Fix for alliance chat not displaying properly on mobile', 'technical', 'user-uuid-3', 'voting');