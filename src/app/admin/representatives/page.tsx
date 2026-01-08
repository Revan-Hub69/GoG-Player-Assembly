'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { getUnverifiedRepresentatives, verifyRepresentative, getVerifiedRepresentatives } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Clock, User, Server, Mail, Calendar } from 'lucide-react'
import Link from 'next/link'

interface RepresentativeWithServer {
  id: string
  name: string
  email: string
  role: string
  verified: boolean
  created_at: string
  server?: {
    id: string
    name: string
    region: string
    active: boolean
  }
}

export default function AdminRepresentativesPage() {
  const { isAdmin, loading: authLoading } = useAuth()
  const [unverifiedReps, setUnverifiedReps] = useState<RepresentativeWithServer[]>([])
  const [verifiedReps, setVerifiedReps] = useState<RepresentativeWithServer[]>([])
  const [loading, setLoading] = useState(true)
  const [verifying, setVerifying] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!authLoading && isAdmin) {
      loadRepresentatives()
    }
  }, [authLoading, isAdmin])

  const loadRepresentatives = async () => {
    try {
      setLoading(true)
      
      const [unverifiedResult, verifiedResult] = await Promise.all([
        getUnverifiedRepresentatives(),
        getVerifiedRepresentatives()
      ])

      if (unverifiedResult.success) {
        setUnverifiedReps(unverifiedResult.representatives || [])
      }

      if (verifiedResult.success) {
        setVerifiedReps(verifiedResult.representatives || [])
      }

      if (!unverifiedResult.success || !verifiedResult.success) {
        setError('Failed to load some representative data')
      }
    } catch (err) {
      setError('Failed to load representatives')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyRepresentative = async (userId: string, serverId: string) => {
    setVerifying(userId)
    setError(null)

    try {
      const result = await verifyRepresentative(userId, serverId)

      if (result.success) {
        // Refresh the lists
        await loadRepresentatives()
      } else {
        setError(result.error || 'Verification failed')
      }
    } catch (err) {
      setError('Failed to verify representative')
    } finally {
      setVerifying(null)
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Caricamento...</p>
        </div>
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Accesso Negato</CardTitle>
            <CardDescription>
              Non hai i permessi per accedere a questa pagina
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard">
              <Button className="w-full">Torna alla Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Gestione Rappresentanti</h1>
              <p className="text-sm text-gray-600">
                Verifica e gestisci i rappresentanti dei server
              </p>
            </div>
            <Link href="/admin">
              <Button variant="outline">Torna al Pannello Admin</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 text-red-600 bg-red-50 border border-red-200 rounded-md">
            {error}
          </div>
        )}

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Attesa di Verifica</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{unverifiedReps.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Verificati</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{verifiedReps.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Totale</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{unverifiedReps.length + verifiedReps.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Unverified Representatives */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Rappresentanti in Attesa di Verifica ({unverifiedReps.length})
          </h2>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Caricamento rappresentanti...</p>
            </div>
          ) : unverifiedReps.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <p className="text-gray-600">Nessun rappresentante in attesa di verifica</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {unverifiedReps.map((rep) => (
                <Card key={rep.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{rep.name}</CardTitle>
                      <Badge variant="secondary">
                        <Clock className="h-3 w-3 mr-1" />
                        In Attesa
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="h-4 w-4 mr-2" />
                      {rep.email}
                    </div>
                    
                    {rep.server && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Server className="h-4 w-4 mr-2" />
                        {rep.server.name} ({rep.server.region})
                      </div>
                    )}
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      Registrato: {new Date(rep.created_at).toLocaleDateString('it-IT')}
                    </div>

                    <div className="pt-2">
                      <Button
                        onClick={() => rep.server && handleVerifyRepresentative(rep.id, rep.server.id)}
                        disabled={verifying === rep.id || !rep.server}
                        className="w-full"
                      >
                        {verifying === rep.id ? 'Verifica in corso...' : 'Verifica Rappresentante'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Verified Representatives */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Rappresentanti Verificati ({verifiedReps.length})
          </h2>
          
          {verifiedReps.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Nessun rappresentante verificato</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {verifiedReps.map((rep) => (
                <Card key={rep.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{rep.name}</CardTitle>
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verificato
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="h-4 w-4 mr-2" />
                      {rep.email}
                    </div>
                    
                    {rep.server && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Server className="h-4 w-4 mr-2" />
                        {rep.server.name} ({rep.server.region})
                      </div>
                    )}
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      Registrato: {new Date(rep.created_at).toLocaleDateString('it-IT')}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}