'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function DashboardPage() {
  const { user, profile, loading, signOut, isVerified, isAdmin, isRepresentative } = useAuth()
  const [stats, setStats] = useState({
    totalProposals: 0,
    activeVotes: 0,
    pendingFeedback: 0,
    currentCSPI: 0,
  })

  useEffect(() => {
    // Load dashboard statistics
    loadDashboardStats()
  }, [])

  const loadDashboardStats = async () => {
    // This would load real statistics from the database
    // For now, using mock data
    setStats({
      totalProposals: 12,
      activeVotes: 3,
      pendingFeedback: 8,
      currentCSPI: 0.45,
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Caricamento dashboard...</p>
        </div>
      </div>
    )
  }

  if (!isVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Account non verificato</CardTitle>
            <CardDescription>
              Il tuo account deve essere verificato per accedere alla dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={signOut} className="w-full">
              Esci
            </Button>
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
              <h1 className="text-2xl font-bold text-gray-900">GoG Player Assembly</h1>
              <p className="text-sm text-gray-600">
                Benvenuto, {profile?.name} ({profile?.role})
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {isAdmin && (
                <Link href="/admin">
                  <Button variant="outline" size="sm">
                    <img src="/icons/settings.svg" alt="Settings" className="h-4 w-4 mr-2" />
                    Admin
                  </Button>
                </Link>
              )}
              <Button onClick={signOut} variant="ghost" size="sm">
                Esci
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Proposte Totali</CardTitle>
              <img src="/icons/file-text.svg" alt="File Text" className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProposals}</div>
              <p className="text-xs text-muted-foreground">
                Proposte create dalla comunità
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Voti Attivi</CardTitle>
              <img src="/icons/vote.svg" alt="Vote" className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeVotes}</div>
              <p className="text-xs text-muted-foreground">
                Proposte in fase di votazione
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Feedback Pendenti</CardTitle>
              <img src="/icons/message.svg" alt="Message" className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingFeedback}</div>
              <p className="text-xs text-muted-foreground">
                Feedback da processare
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">CSPI Corrente</CardTitle>
              <img src="/icons/trending.svg" alt="Trending" className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{(stats.currentCSPI * 100).toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">
                Community Spending Propensity Index
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <img src="/icons/file-text.svg" alt="File Text" className="h-5 w-5 mr-2" />
                Proposte
              </CardTitle>
              <CardDescription>
                Gestisci le proposte della comunità
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/proposals">
                <Button className="w-full" variant="outline">
                  Visualizza Proposte
                </Button>
              </Link>
              {isRepresentative && (
                <Link href="/proposals/create">
                  <Button className="w-full">
                    Crea Nuova Proposta
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <img src="/icons/vote.svg" alt="Vote" className="h-5 w-5 mr-2" />
                Votazioni
              </CardTitle>
              <CardDescription>
                Partecipa alle votazioni attive
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/voting">
                <Button className="w-full">
                  Vai alle Votazioni
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <img src="/icons/message.svg" alt="Message" className="h-5 w-5 mr-2" />
                Feedback
              </CardTitle>
              <CardDescription>
                Raccogli feedback dai giocatori
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/feedback">
                <Button className="w-full" variant="outline">
                  Visualizza Feedback
                </Button>
              </Link>
              {isRepresentative && (
                <Link href="/feedback/create">
                  <Button className="w-full">
                    Aggiungi Feedback
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <img src="/icons/trending.svg" alt="Trending" className="h-5 w-5 mr-2" />
                CSPI
              </CardTitle>
              <CardDescription>
                Community Spending Propensity Index
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/cspi">
                <Button className="w-full" variant="outline">
                  Visualizza CSPI
                </Button>
              </Link>
              {isRepresentative && (
                <Link href="/cspi/declare">
                  <Button className="w-full">
                    Dichiara Propensione
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <img src="/icons/users.svg" alt="Users" className="h-5 w-5 mr-2" />
                Comunicazione
              </CardTitle>
              <CardDescription>
                Comunica con altri rappresentanti
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/messages">
                <Button className="w-full">
                  Messaggi
                </Button>
              </Link>
            </CardContent>
          </Card>

          {isAdmin && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <img src="/icons/settings.svg" alt="Settings" className="h-5 w-5 mr-2" />
                  Amministrazione
                </CardTitle>
                <CardDescription>
                  Gestione sistema e utenti
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/admin">
                  <Button className="w-full">
                    Pannello Admin
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}