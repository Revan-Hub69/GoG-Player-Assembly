export interface CommunityRequest {
  id: string
  title: string
  description: string
  category: 'gameplay' | 'economy' | 'social' | 'technical'
  priority: 'critical' | 'high' | 'medium' | 'low'
  status: 'draft' | 'review' | 'submitted' | 'acknowledged'
  submittedBy: string
  submittedDate: string
  technicalDetails?: string
  expectedOutcome: string
}

export interface Representative {
  id: string
  name: string
  kingdom: string
  contactMethod: string
  isActive: boolean
  joinedDate: string
}

export interface AssemblyProcess {
  stage: 'collection' | 'analysis' | 'articulation' | 'submission'
  description: string
  responsible: string
  estimatedDuration: string
}