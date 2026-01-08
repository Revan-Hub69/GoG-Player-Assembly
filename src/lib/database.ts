import { supabase, supabaseAdmin } from './supabase'
import type {
  User,
  Server,
  Proposal,
  Vote,
  Feedback,
  CSPIDeclaration,
  CSPISnapshot,
} from '@/types'

// Database utility functions for GoG Player Assembly

// Server operations
export async function getServers() {
  const { data, error } = await supabase
    .from('servers')
    .select('*')
    .eq('active', true)
    .order('name')

  if (error) throw error
  return data as Server[]
}

export async function getServerById(id: string) {
  const { data, error } = await supabase
    .from('servers')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data as Server
}

// Profile operations
export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) throw error
  return data as User
}

export async function updateProfile(userId: string, updates: Partial<User>) {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()

  if (error) throw error
  return data as User
}

export async function createProfile(profile: Omit<User, 'created_at' | 'last_active'>) {
  const { data, error } = await supabase
    .from('profiles')
    .insert(profile)
    .select()
    .single()

  if (error) throw error
  return data as User
}

// Proposal operations
export async function getProposals(status?: Proposal['status']) {
  let query = supabase
    .from('proposals')
    .select(`
      *,
      author:profiles(name, server_id),
      votes(vote, representative_id)
    `)
    .order('created_at', { ascending: false })

  if (status) {
    query = query.eq('status', status)
  }

  const { data, error } = await query

  if (error) throw error
  return data
}

export async function getProposalById(id: string) {
  const { data, error } = await supabase
    .from('proposals')
    .select(`
      *,
      author:profiles(name, server_id),
      votes(vote, representative_id, profiles(name, server_id))
    `)
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

export async function createProposal(proposal: Omit<Proposal, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('proposals')
    .insert(proposal)
    .select()
    .single()

  if (error) throw error
  return data as Proposal
}

export async function updateProposal(id: string, updates: Partial<Proposal>) {
  const { data, error } = await supabase
    .from('proposals')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as Proposal
}

// Vote operations
export async function castVote(vote: Omit<Vote, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('votes')
    .insert(vote)
    .select()
    .single()

  if (error) throw error
  return data as Vote
}

export async function getVotesByProposal(proposalId: string) {
  const { data, error } = await supabase
    .from('votes')
    .select(`
      *,
      representative:profiles(name, server_id)
    `)
    .eq('proposal_id', proposalId)

  if (error) throw error
  return data
}

export async function hasUserVoted(proposalId: string, userId: string) {
  const { data, error } = await supabase
    .from('votes')
    .select('id')
    .eq('proposal_id', proposalId)
    .eq('representative_id', userId)
    .single()

  if (error && error.code !== 'PGRST116') throw error
  return !!data
}

// Feedback operations
export async function createFeedback(feedback: Omit<Feedback, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('feedback')
    .insert(feedback)
    .select()
    .single()

  if (error) throw error
  return data as Feedback
}

export async function getFeedbackByServer(serverId: string) {
  const { data, error } = await supabase
    .from('feedback')
    .select(`
      *,
      representative:profiles(name),
      related_proposal:proposals(title)
    `)
    .eq('server_id', serverId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

// CSPI operations
export async function createCSPIDeclaration(
  declaration: Omit<CSPIDeclaration, 'id' | 'created_at'>
) {
  const { data, error } = await supabase
    .from('cspi_declarations')
    .insert(declaration)
    .select()
    .single()

  if (error) throw error
  return data as CSPIDeclaration
}

export async function getLatestCSPIDeclarations() {
  const { data, error } = await supabase
    .from('cspi_declarations')
    .select(`
      *,
      server:servers(name, region),
      representative:profiles(name)
    `)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function calculateCurrentCSPI() {
  // Get the latest declaration for each server
  const { data: declarations, error } = await supabase.rpc('get_latest_cspi_declarations')

  if (error) throw error

  if (!declarations || declarations.length === 0) {
    return { cspi: 0, participating_servers: 0, total_servers: 0 }
  }

  const totalServers = await getTotalActiveServers()
  const participatingServers = declarations.length
  const totalPropensity = declarations.reduce(
    (sum: number, decl: any) => sum + decl.propensity_level,
    0
  )

  const cspi = totalPropensity / (participatingServers * 4) // Normalize to 0-1 scale

  return {
    cspi,
    participating_servers: participatingServers,
    total_servers: totalServers,
  }
}

export async function createCSPISnapshot(snapshot: Omit<CSPISnapshot, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('cspi_snapshots')
    .insert(snapshot)
    .select()
    .single()

  if (error) throw error
  return data as CSPISnapshot
}

export async function getCSPIHistory(limit = 30) {
  const { data, error } = await supabase
    .from('cspi_snapshots')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) throw error
  return data as CSPISnapshot[]
}

// Utility functions
export async function getTotalActiveServers() {
  const { count, error } = await supabase
    .from('servers')
    .select('*', { count: 'exact', head: true })
    .eq('active', true)

  if (error) throw error
  return count || 0
}

export async function getActiveRepresentatives() {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('role', 'representative')
    .eq('verified', true)
    .not('server_id', 'is', null)

  if (error) throw error
  return data as User[]
}

// Admin functions (using service role)
export async function verifyRepresentative(userId: string, serverId: string) {
  const { data, error } = await supabaseAdmin
    .from('profiles')
    .update({ verified: true, server_id: serverId })
    .eq('id', userId)
    .select()
    .single()

  if (error) throw error

  // Update server representative
  await supabaseAdmin
    .from('servers')
    .update({ representative_id: userId })
    .eq('id', serverId)

  return data as User
}

export async function getUnverifiedRepresentatives() {
  const { data, error } = await supabaseAdmin
    .from('profiles')
    .select('*')
    .eq('role', 'representative')
    .eq('verified', false)
    .order('created_at')

  if (error) throw error
  return data as User[]
}