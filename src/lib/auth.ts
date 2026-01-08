import { supabase, supabaseAdmin } from './supabase'
import type { User } from '@/types'

// Authentication and profile management functions

export interface RegistrationData {
  email: string
  password: string
  name: string
  serverId: string
}

export interface ProfileUpdateData {
  name?: string
  email?: string
}

/**
 * Register a new representative
 */
export async function registerRepresentative(data: RegistrationData) {
  try {
    if (!supabase) {
      return { success: false, error: 'Supabase not configured' }
    }

    // First, check if server is available
    const { data: server, error: serverError } = await supabase
      .from('servers')
      .select('id, name, active, representative_id')
      .eq('id', data.serverId)
      .single()

    if (serverError) {
      return { success: false, error: 'Server not found' }
    }

    if (!server.active) {
      return { success: false, error: 'Server is not active' }
    }

    if (server.representative_id) {
      return { success: false, error: 'Server already has a representative' }
    }

    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          name: data.name,
          server_id: data.serverId,
        }
      }
    })

    if (authError) {
      return { success: false, error: authError.message }
    }

    if (!authData.user) {
      return { success: false, error: 'Failed to create user' }
    }

    // Create profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: authData.user.id,
        email: data.email,
        name: data.name,
        server_id: data.serverId,
        role: 'representative',
        verified: false,
      })
      .select()
      .single()

    if (profileError) {
      // If profile creation fails, we should clean up the auth user
      // In a production system, this would be handled by database triggers
      console.error('Profile creation failed:', profileError)
      return { success: false, error: 'Failed to create profile' }
    }

    return { 
      success: true, 
      user: authData.user, 
      profile: profile as User 
    }
  } catch (error) {
    console.error('Registration error:', error)
    return { success: false, error: 'An unexpected error occurred' }
  }
}

/**
 * Verify a representative (admin only)
 */
export async function verifyRepresentative(userId: string, serverId: string) {
  try {
    if (!supabaseAdmin) {
      return { success: false, error: 'Supabase admin not configured' }
    }

    // This should be called with admin privileges
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .update({ 
        verified: true,
        server_id: serverId 
      })
      .eq('id', userId)
      .select()
      .single()

    if (profileError) {
      return { success: false, error: profileError.message }
    }

    // Update server to assign representative
    const { error: serverError } = await supabaseAdmin
      .from('servers')
      .update({ representative_id: userId })
      .eq('id', serverId)

    if (serverError) {
      // Rollback profile verification
      await supabaseAdmin
        .from('profiles')
        .update({ verified: false })
        .eq('id', userId)
      
      return { success: false, error: 'Failed to assign server representative' }
    }

    return { success: true, profile: profile as User }
  } catch (error) {
    console.error('Verification error:', error)
    return { success: false, error: 'An unexpected error occurred' }
  }
}

/**
 * Update user profile
 */
export async function updateProfile(userId: string, updates: ProfileUpdateData) {
  try {
    const { data: profile, error } = await supabase
      .from('profiles')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId)
      .select()
      .single()

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true, profile: profile as User }
  } catch (error) {
    console.error('Profile update error:', error)
    return { success: false, error: 'An unexpected error occurred' }
  }
}

/**
 * Get user profile with server information
 */
export async function getProfileWithServer(userId: string) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select(`
        *,
        server:servers(
          id,
          name,
          region,
          active
        )
      `)
      .eq('id', userId)
      .single()

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true, profile: data }
  } catch (error) {
    console.error('Profile fetch error:', error)
    return { success: false, error: 'An unexpected error occurred' }
  }
}

/**
 * Get all unverified representatives (admin only)
 */
export async function getUnverifiedRepresentatives() {
  try {
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .select(`
        *,
        server:servers(
          id,
          name,
          region,
          active
        )
      `)
      .eq('role', 'representative')
      .eq('verified', false)
      .order('created_at')

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true, representatives: data }
  } catch (error) {
    console.error('Fetch unverified representatives error:', error)
    return { success: false, error: 'An unexpected error occurred' }
  }
}

/**
 * Get all verified representatives
 */
export async function getVerifiedRepresentatives() {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select(`
        *,
        server:servers(
          id,
          name,
          region,
          active
        )
      `)
      .eq('role', 'representative')
      .eq('verified', true)
      .order('name')

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true, representatives: data }
  } catch (error) {
    console.error('Fetch verified representatives error:', error)
    return { success: false, error: 'An unexpected error occurred' }
  }
}

/**
 * Check if user can access admin functions
 */
export async function checkAdminAccess(userId: string) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('role, verified')
      .eq('id', userId)
      .single()

    if (error) {
      return { success: false, error: error.message }
    }

    const isAdmin = data.role === 'admin' && data.verified === true
    return { success: true, isAdmin }
  } catch (error) {
    console.error('Admin access check error:', error)
    return { success: false, error: 'An unexpected error occurred' }
  }
}

/**
 * Update last active timestamp
 */
export async function updateLastActive(userId: string) {
  try {
    const { error } = await supabase
      .from('profiles')
      .update({ last_active: new Date().toISOString() })
      .eq('id', userId)

    if (error) {
      console.error('Update last active error:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error('Update last active error:', error)
    return { success: false, error: 'An unexpected error occurred' }
  }
}

/**
 * Get server activity summary
 */
export async function getServerActivitySummary() {
  try {
    if (!supabase) {
      return { success: false, error: 'Supabase not configured' }
    }

    const { data, error } = await supabase.rpc('get_server_activity_summary')

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true, summary: data }
  } catch (error) {
    console.error('Server activity summary error:', error)
    return { success: false, error: 'An unexpected error occurred' }
  }
}

/**
 * Flag inactive representatives (admin function)
 */
export async function flagInactiveRepresentatives(daysSinceLastActive: number = 30) {
  try {
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - daysSinceLastActive)

    const { data, error } = await supabaseAdmin
      .from('profiles')
      .select('id, name, email, last_active, server:servers(name)')
      .eq('role', 'representative')
      .eq('verified', true)
      .lt('last_active', cutoffDate.toISOString())

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true, inactiveRepresentatives: data }
  } catch (error) {
    console.error('Flag inactive representatives error:', error)
    return { success: false, error: 'An unexpected error occurred' }
  }
}