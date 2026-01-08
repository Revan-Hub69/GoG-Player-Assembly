'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
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
  }
}

export default function AdminRepresentativesPage() {
  const { isAdmin, loading: authLoading } = useAuth()
  const [unverifiedReps, setUnverifiedReps] = useState<RepresentativeWithServer[]>([])
  const [verifiedReps, setVerifiedReps] = useState<RepresentativeWithServer[]>([])
  const [loading, setLoading] = useState(true)

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Caricamento...</p>
        </div>
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-red-600">Accesso Negato</CardTitle>
            <CardDescription>
              Non hai i permessi per accedere a questa sezione
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/admin">
              <Button className="w-full">Torna al Pannello Admin</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
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

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Attesa di Verifica</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{unverifiedReps.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Verificati</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{verifiedReps.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Totale</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{unverifiedReps.length + verifiedReps.length}</div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          {/* Unverified Representatives */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Rappresentanti in Attesa di Verifica</h2>
            
            {unverifiedReps.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-gray-600">Nessun rappresentante in attesa di verifica</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {unverifiedReps.map((rep) => (
                  <Card key={rep.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{rep.name}</CardTitle>
                        <Badge variant="secondary">
                          In Attesa
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-3">
                      <div className="text-sm text-gray-600">
                        <strong>Email:</strong> {rep.email}
                      </div>
                      
                      {rep.server && (
                        <div className="text-sm text-gray-600">
                          <strong>Server:</strong> {rep.server.name} ({rep.server.region})
                        </div>
                      )}
                      
                      <div className="text-sm text-gray-600">
                        <strong>Registrato:</strong> {new Date(rep.created_at).toLocaleDateString('it-IT')}
                      </div>

                      <div className="pt-2">
                        <Button className="w-full">
                          Verifica Rappresentante
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
            <h2 className="text-xl font-semibold mb-4">Rappresentanti Verificati</h2>
            
            {verifiedReps.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-gray-600">Nessun rappresentante verificato</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {verifiedReps.map((rep) => (
                  <Card key={rep.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{rep.name}</CardTitle>
                        <Badge variant="default" className="bg-green-100 text-green-800">
                          Verificato
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-3">
                      <div className="text-sm text-gray-600">
                        <strong>Email:</strong> {rep.email}
                      </div>
                      
                      {rep.server && (
                        <div className="text-sm text-gray-600">
                          <strong>Server:</strong> {rep.server.name} ({rep.server.region})
                        </div>
                      )}
                      
                      <div className="text-sm text-gray-600">
                        <strong>Registrato:</strong> {new Date(rep.created_at).toLocaleDateString('it-IT')}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}