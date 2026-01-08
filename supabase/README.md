# Supabase Database Setup

This directory contains the database schema, migrations, and configuration for the GoG Player Assembly project.

## Files Overview

- `migrations/001_initial_schema.sql` - Initial database schema with all tables, indexes, and constraints
- `migrations/002_custom_functions.sql` - Custom SQL functions for business logic
- `migrations/003_rls_policies.sql` - Row Level Security policies for data access control
- `seed.sql` - Sample data for development and testing
- `config.toml` - Supabase local development configuration

## Database Schema

### Core Tables

1. **profiles** - User profiles (extends Supabase auth.users)
2. **servers** - Game servers information
3. **proposals** - Community proposals for game changes
4. **votes** - Votes cast on proposals
5. **feedback** - Feedback collected from players
6. **cspi_declarations** - Community Spending Propensity Index declarations
7. **cspi_snapshots** - Historical CSPI values
8. **messages** - Inter-representative messaging
9. **discussion_threads** - Discussion topics
10. **discussion_messages** - Messages within discussion threads
11. **developer_responses** - Developer responses to proposals

### Key Features

- **Single Representative Constraint**: Each server can have only one active representative
- **Immutable Records**: Votes and CSPI declarations cannot be modified after creation
- **Automatic Timestamps**: All tables have created_at and updated_at fields
- **Comprehensive Indexing**: Optimized for common query patterns

## Security Model

### Row Level Security (RLS)

All tables have RLS enabled with policies that enforce:

- **Profile Access**: Users can read their own profile and other verified representatives
- **Proposal Management**: Verified representatives can create and vote on proposals
- **Server-based Access**: Representatives can only manage data for their assigned server
- **Admin Privileges**: Admins have full access to all data
- **Immutable Records**: Votes and CSPI declarations cannot be modified

### User Roles

- **representative**: Can create proposals, vote, submit feedback, and declare CSPI
- **admin**: Full system access, can verify representatives and manage all data

## Setup Instructions

### Local Development

1. Install Supabase CLI:
```bash
npm install -g @supabase/cli
```

2. Initialize Supabase in your project:
```bash
supabase init
```

3. Start local Supabase:
```bash
supabase start
```

4. Apply migrations:
```bash
supabase db reset
```

5. (Optional) Load seed data:
```bash
supabase db seed
```

### Production Setup

1. Create a new Supabase project at https://supabase.com
2. Copy your project URL and keys to `.env.local`
3. Apply migrations through the Supabase dashboard or CLI:
```bash
supabase db push
```

## Environment Variables

Required environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

## Custom Functions

The database includes several custom functions:

- `get_latest_cspi_declarations()` - Gets the most recent CSPI declaration for each server
- `calculate_quorum(proposal_id)` - Calculates voting quorum for a proposal
- `get_proposal_results(proposal_id)` - Gets complete voting results for a proposal
- `get_server_activity_summary()` - Provides activity metrics for all servers
- `can_user_vote(user_id, proposal_id)` - Checks if a user can vote on a proposal

## Testing

Database constraints and RLS policies are tested in:
- `src/__tests__/database-constraints.test.ts` - Property-based tests for constraints
- `src/__tests__/rls-policies.test.ts` - Unit tests for security policies

Run tests with:
```bash
npm test
```

## Maintenance

### Adding New Migrations

1. Create a new migration file: `supabase/migrations/004_description.sql`
2. Write your SQL changes
3. Test locally: `supabase db reset`
4. Apply to production: `supabase db push`

### Monitoring

- Use Supabase dashboard for real-time monitoring
- Check RLS policy performance in the SQL editor
- Monitor slow queries and add indexes as needed

## Security Considerations

- All sensitive operations require user authentication
- RLS policies prevent unauthorized data access
- Admin functions use SECURITY DEFINER for elevated privileges
- Immutable records prevent data tampering
- Server-based isolation prevents cross-server data leaks