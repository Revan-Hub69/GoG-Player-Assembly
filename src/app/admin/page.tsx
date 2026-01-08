'use client'

import { useAuth } from '@/hooks/useAuth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function AdminPage() {
  const { isAdmin, loading } = useAuth()
  const router = useRouter()

  if (loading) {
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
            <Button onClick={() => router.push('/')} className="w-full">
              Torna alla Home
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Pannello Amministratore</h1>
          <p className="text-gray-600">Gestisci la piattaforma e i rappresentanti della community</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Gestione Rappresentanti</CardTitle>
              <CardDescription>
                Verifica e gestisci i rappresentanti dei server
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/representatives">
                <Button className="w-full">
                  Gestisci Rappresentanti
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Gestione Server</CardTitle>
              <CardDescription>
                Gestisci server e assegnazioni rappresentanti
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/servers">
                <Button className="w-full">
                  Gestisci Server
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow opacity-50">
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>
                Visualizza metriche e genera report
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button disabled className="w-full">
                Prossimamente
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Azioni Rapide</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Link href="/admin/representatives">
                  <Button variant="outline">
                    Verifica Rappresentanti
                  </Button>
                </Link>
                <Link href="/admin/servers">
                  <Button variant="outline">
                    Gestisci Server
                  </Button>
                </Link>
                <Link href="/">
                  <Button variant="outline">
                    Torna alla Home
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}