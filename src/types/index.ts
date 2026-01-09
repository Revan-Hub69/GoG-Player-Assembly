// Core types for GoG Player Assembly

export interface User {
  id: string
  email: string
  name: string
  server_id?: string
  role: 'representative' | 'admin'
  verified: boolean
  created_at: string
  last_active: string
}

export interface Server {
  id: string
  name: string
  region: string
  representative_id?: string
  active: boolean
  created_at: string
  updated_at: string
}

export interface Profile extends User {
  server?: Server
}

// Raw proposals submitted by representatives
export interface RawProposal {
  id: string
  title: string
  description: string
  category: 'gameplay' | 'economy' | 'events' | 'technical'
  priority: 1 | 2 | 3 | 4 | 5 // 1=critical, 5=low
  submitted_by: string
  server_id: string
  technical_details?: string
  expected_outcome?: string
  community_impact?: string
  status: 'pending' | 'processing' | 'aggregated' | 'rejected'
  ai_processed: boolean
  ai_processing_notes?: string
  created_at: string
  updated_at: string
}

// AI aggregated requests (final output)
export interface AggregatedRequest {
  id: string
  title: string
  description: string
  category: 'gameplay' | 'economy' | 'events' | 'technical'
  priority: 1 | 2 | 3 | 4 | 5
  technical_specification: string
  expected_outcome: string
  community_impact_analysis: string
  implementation_suggestions?: string
  source_proposal_count: number
  ai_confidence_score?: number
  status: 'draft' | 'review' | 'submitted' | 'acknowledged' | 'implemented'
  submitted_to_developers_at?: string
  developer_response?: string
  developer_response_at?: string
  created_at: string
  updated_at: string
}

// Kingdom participation tracking
export interface KingdomParticipation {
  id: string
  server_id: string
  representative_id?: string
  participation_status: 'pending' | 'active' | 'inactive' | 'suspended'
  joined_at: string
  last_activity_at: string
  proposals_submitted: number
  engagement_score: number
  notes?: string
  created_at: string
  updated_at: string
}

// Kingdom statistics view
export interface KingdomStats {
  server_id: string
  kingdom_name: string
  region: string
  representative_name?: string
  representative_email?: string
  participation_status: 'pending' | 'active' | 'inactive' | 'suspended'
  joined_at: string
  last_activity_at: string
  proposals_submitted: number
  engagement_score: number
  activity_status: 'active' | 'recent' | 'inactive'
}

// AI processing logs
export interface AIProcessingLog {
  id: string
  processing_type: string
  input_data?: Record<string, unknown>
  output_data?: Record<string, unknown>
  processing_time_ms?: number
  success: boolean
  error_message?: string
  ai_model_used?: string
  created_at: string
}

// Monthly assembly reports
export interface AssemblyReport {
  id: string
  report_month: string
  total_raw_proposals: number
  total_aggregated_requests: number
  participating_kingdoms: number
  active_representatives: number
  requests_submitted_to_developers: number
  developer_responses_received: number
  report_data?: Record<string, unknown>
  generated_at: string
}

// Legacy types for backward compatibility
export interface CommunityRequest extends AggregatedRequest {
  submittedBy: string
  submittedDate: string
  technicalDetails?: string
  requestDetails?: Record<string, unknown>
}

export interface Proposal {
  id: string
  title: string
  description: string
  category: 'gameplay' | 'economy' | 'events' | 'technical'
  author_id: string
  status: 'draft' | 'active' | 'voting' | 'approved' | 'rejected'
  voting_deadline?: string
  created_at: string
  updated_at: string
}

export interface Vote {
  id: string
  proposal_id: string
  representative_id: string
  vote: 'approve' | 'reject' | 'abstain'
  created_at: string
}

export interface Feedback {
  id: string
  content: string
  category: string
  server_id: string
  representative_id: string
  related_proposal_id?: string
  created_at: string
  updated_at: string
}

export interface CSPIDeclaration {
  id: string
  server_id: string
  representative_id: string
  propensity_level: 0 | 1 | 2 | 3 | 4
  reasoning?: string
  created_at: string
}

export interface CSPISnapshot {
  id: string
  value: number // 0-1 normalized
  participating_servers: number
  total_servers: number
  created_at: string
}

// API Response Types
export interface ApiResponse<T = Record<string, unknown>> {
  data?: T
  error?: {
    code: string
    message: string
    details?: Record<string, unknown>
  }
  timestamp: string
  request_id: string
}

// Form Types
export interface ProposalFormData {
  title: string
  description: string
  category: Proposal['category']
}

export interface RawProposalFormData {
  title: string
  description: string
  category: RawProposal['category']
  priority: RawProposal['priority']
  technical_details?: string
  expected_outcome?: string
  community_impact?: string
}

export interface FeedbackFormData {
  content: string
  category: string
  related_proposal_id?: string
}

export interface CSPIDeclarationFormData {
  propensity_level: CSPIDeclaration['propensity_level']
  reasoning?: string
}