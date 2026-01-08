'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import type { User as SupabaseUser } from '@supabase/supabase-js'
import type { User } from '@/types'

interface AuthState {
  user: SupabaseUser | null
  profile: User | null
  loading: boolean
  error: string | null
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    profile: null,
    loading: true,
    error: null,
  })
  const router = useRouter()

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          setAuthState(prev => ({ ...prev, error: error.message, loading: false }))
          return
        }

        if (session?.user) {
          await loadUserProfile(session.user)
        } else {
          setAuthState(prev => ({ ...prev, loading: false }))
        }
      } catch (err) {
        setAuthState(prev => ({ 
          ...prev, 
          error: 'Failed to load session', 
          loading: false 
        }))
      }
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          await loadUserProfile(session.user)
        } else if (event === 'SIGNED_OUT') {
          setAuthState({
            user: null,
            profile: null,
            loading: false,
            error: null,
          })
        } else if (event === 'TOKEN_REFRESHED' && session?.user) {
          await loadUserProfile(session.user)
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const loadUserProfile = async (user: SupabaseUser) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error && error.code !== 'PGRST116') {
        throw error
      }

      setAuthState({
        user,
        profile: profile || null,
        loading: false,
        error: null,
      })
    } catch (err) {
      console.error('Error loading profile:', err)
      setAuthState(prev => ({
        ...prev,
        user,
        profile: null,
        loading: false,
        error: 'Failed to load profile',
      }))
    }
  }

  const signIn = async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }))
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setAuthState(prev => ({ ...prev, error: error.message, loading: false }))
        return { success: false, error: error.message }
      }

      return { success: true, user: data.user }
    } catch (err) {
      const errorMessage = 'An unexpected error occurred'
      setAuthState(prev => ({ ...prev, error: errorMessage, loading: false }))
      return { success: false, error: errorMessage }
    }
  }

  const signUp = async (email: string, password: string, userData: any) => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }))
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
        },
      })

      if (error) {
        setAuthState(prev => ({ ...prev, error: error.message, loading: false }))
        return { success: false, error: error.message }
      }

      return { success: true, user: data.user }
    } catch (err) {
      const errorMessage = 'An unexpected error occurred'
      setAuthState(prev => ({ ...prev, error: errorMessage, loading: false }))
      return { success: false, error: errorMessage }
    }
  }

  const signOut = async () => {
    setAuthState(prev => ({ ...prev, loading: true }))
    
    try {
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        setAuthState(prev => ({ ...prev, error: error.message, loading: false }))
        return { success: false, error: error.message }
      }

      router.push('/')
      return { success: true }
    } catch (err) {
      const errorMessage = 'Failed to sign out'
      setAuthState(prev => ({ ...prev, error: errorMessage, loading: false }))
      return { success: false, error: errorMessage }
    }
  }

  const updateProfile = async (updates: Partial<User>) => {
    if (!authState.user) return { success: false, error: 'Not authenticated' }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', authState.user.id)
        .select()
        .single()

      if (error) {
        return { success: false, error: error.message }
      }

      setAuthState(prev => ({ ...prev, profile: data }))
      return { success: true, profile: data }
    } catch (err) {
      return { success: false, error: 'Failed to update profile' }
    }
  }

  const refreshProfile = async () => {
    if (!authState.user) return

    await loadUserProfile(authState.user)
  }

  // Helper functions
  const isAuthenticated = !!authState.user
  const isVerified = !!authState.profile?.verified
  const isAdmin = authState.profile?.role === 'admin'
  const isRepresentative = authState.profile?.role === 'representative'
  const hasServerAssigned = !!authState.profile?.server_id

  return {
    ...authState,
    signIn,
    signUp,
    signOut,
    updateProfile,
    refreshProfile,
    isAuthenticated,
    isVerified,
    isAdmin,
    isRepresentative,
    hasServerAssigned,
  }
}