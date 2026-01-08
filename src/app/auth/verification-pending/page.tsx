'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, Clock, AlertCircle } from 'lucide-react'
import type { User } from '@/types'

export default function VerificationPendingPage() {
  const [profile, setProfile] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkVerificationStatus()
  }, [])

  const checkVerificationStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/auth/login')
        return
      }

      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error) {
        console.error('Error fetching profile:', error)
        return
      }

      setProfile(profileData)

      // If user is verified, redirect to dashboard
      if (profileData?.verified) {
        router.push('/dashboard')
      }
    } catch (err) {
      console.error('Error checking verification status:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const handleRefresh = () => {
    setLoading(true)
    checkVerificationStatus()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Controllo stato verifica...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            {profile?.verified ? (
              <CheckCircle className="h-16 w-16 text-green-500" />
            ) : (
              <Clock className="h-16 w-16 text-yellow-500" />
            )}
          </div>
          <CardTitle className="text-2xl font-bold">
            {profile?.verified ? 'Account Verificato!' : 'Verifica in Attesa'}
          </CardTitle>
          <CardDescription>
            {profile?.verified 
              ? 'Il tuo account è stato verificato con successo'
              : 'Il tuo account è in attesa di verifica da parte di un amministratore'
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!profile?.verified && (
            <>
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div className="text-sm text-yellow-800">
                    <p className="font-medium mb-1">Account in attesa di verifica</p>
                    <p>
                      Un amministratore deve verificare la tua affiliazione al server prima 
                      che tu possa accedere alle funzionalità della piattaforma.
                    </p>
                  </div>
                </div>
              </div>

              {profile && (
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Nome:</span>
                    <span className="font-medium">{profile.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium">{profile.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ruolo:</span>
                    <span className="font-medium capitalize">{profile.role}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Stato:</span>
                    <span className="font-medium text-yellow-600">In attesa di verifica</span>
                  </div>
                </div>
              )}

              <div className="pt-4 space-y-2">
                <Button onClick={handleRefresh} variant="outline" className="w-full">
                  Controlla Stato Verifica
                </Button>
                <Button onClick={handleLogout} variant="ghost" className="w-full">
                  Esci
                </Button>
              </div>

              <div className="text-xs text-gray-500 text-center">
                <p>
                  La verifica può richiedere fino a 24-48 ore. 
                  Riceverai una notifica email quando il tuo account sarà verificato.
                </p>
              </div>
            </>
          )}

          {profile?.verified && (
            <div className="pt-4">
              <Button onClick={() => router.push('/dashboard')} className="w-full">
                Vai alla Dashboard
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}