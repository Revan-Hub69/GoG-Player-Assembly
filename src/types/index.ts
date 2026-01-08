// Database Types
export interface User {
  id: string
  email: string
  name: string
  server_id: string
  role: 'representative' | 'admin'
  verified: boolean
  created_at: Date
  last_active: Date
}

export interface Server {
  id: string
  name: string
  region: string
  representative_id?: string
  active: boolean
  created_at: Date
}

export interface Proposal {
  id: string
  title: string
  description: string
  category: 'gameplay' | 'economy' | 'events' | 'technical'
  author_id: string
  status: 'draft' | 'active' | 'voting' | 'approved' | 'rejected'
  voting_deadline?: Date
  created_at: Date
  updated_at: Date
}

export interface Vote {
  id: string
  proposal_id: string
  representative_id: string
  vote: 'approve' | 'reject' | 'abstain'
  created_at: Date
}

export interface Feedback {
  id: string
  content: string
  category: string
  server_id: string
  representative_id: string
  related_proposal_id?: string
  created_at: Date
}

export interface CSPIDeclaration {
  id: string
  server_id: string
  representative_id: string
  propensity_level: 0 | 1 | 2 | 3 | 4
  reasoning?: string
  created_at: Date
}

export interface CSPISnapshot {
  id: string
  value: number // 0-1 normalized
  participating_servers: number
  total_servers: number
  created_at: Date
}

// API Response Types
export interface ApiResponse<T = any> {
  data?: T
  error?: {
    code: string
    message: string
    details?: any
  }
  timestamp: Date
  request_id: string
}

// Form Types
export interface ProposalFormData {
  title: string
  description: string
  category: Proposal['category']
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
