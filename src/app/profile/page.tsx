'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { updateProfile, getProfileWithServer } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { User, Server, Mail, Shield, Calendar, MapPin } from 'lucide-react'
import Link from 'next/link'

interface ProfileWithServer {
  id: string
  name: string
  email: string
  role: string
  verified: boolean
  created_at: string
  last_active: string
  server?: {
    id: string
    name: string
    region: string
    active: boolean
  }
}

export default function ProfilePage() {
  const { user, profile, refreshProfile, isVerified } = useAuth()
  const [profileData, setProfileData] = useState<ProfileWithServer | null>(null)
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  })

  useEffect(() => {
    if (user) {
      loadProfileData()
    }
  }, [user])

  const loadProfileData = async () => {
    if (!user) return

    try {
      const result = await getProfileWithServer(user.id)
      
      if (result.success) {
        setProfileData(result.profile)
        setFormData({
          name: result.profile.name || '',
          email: result.profile.email || '',
        })
      } else {
        setError(result.error)
      }
    } catch (err) {
      setError('Failed to load profile data')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!user) return

    setSaving(true)
    setError(null)

    try {
      const result = await updateProfile(user.id, {
        name: formData.name,
        email: formData.email,
      })

      if (result.success) {
        await refreshProfile()
        await loadProfileData()
        setEditing(false)
      } else {
        setError(result.error)
      }
    } catch (err) {
      setError('Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    if (profileData) {
      setFormData({
        name: profileData.name || '',
        email: profileData.email || '',
      })
    }
    setEditing(false)
    setError(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Caricamento profilo...</p>
        </div>
      </div>
    )
  }

  if (!profileData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Errore</CardTitle>
            <CardDescription>
              {error || 'Impossibile caricare i dati del profilo'}
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Profilo Utente</h1>
              <p className="text-sm text-gray-600">
                Gestisci le informazioni del tuo account
              </p>
            </div>
            <Link href="/dashboard">
              <Button variant="outline">Torna alla Dashboard</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Informazioni Personali
                </CardTitle>
                <CardDescription>
                  Aggiorna le tue informazioni personali
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {error && (
                  <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Nome Completo
                  </label>
                  {editing ? (
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Il tuo nome completo"
                      disabled={saving}
                    />
                  ) : (
                    <p className="text-gray-900 py-2">{profileData.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  {editing ? (
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="la-tua-email@esempio.com"
                      disabled={saving}
                    />
                  ) : (
                    <p className="text-gray-900 py-2">{profileData.email}</p>
                  )}
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  {editing ? (
                    <>
                      <Button 
                        variant="outline" 
                        onClick={handleCancel}
                        disabled={saving}
                      >
                        Annulla
                      </Button>
                      <Button 
                        onClick={handleSave}
                        disabled={saving}
                      >
                        {saving ? 'Salvataggio...' : 'Salva Modifiche'}
                      </Button>
                    </>
                  ) : (
                    <Button onClick={() => setEditing(true)}>
                      Modifica Profilo
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Account Status */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Stato Account
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Ruolo:</span>
                  <span className="text-sm font-medium capitalize">
                    {profileData.role}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Stato:</span>
                  <span className={`text-sm font-medium ${
                    profileData.verified ? 'text-green-600' : 'text-yellow-600'
                  }`}>
                    {profileData.verified ? 'Verificato' : 'In attesa di verifica'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Registrato:</span>
                  <span className="text-sm font-medium">
                    {new Date(profileData.created_at).toLocaleDateString('it-IT')}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Ultimo accesso:</span>
                  <span className="text-sm font-medium">
                    {new Date(profileData.last_active).toLocaleDateString('it-IT')}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Server Information */}
            {profileData.server && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    Server Assegnato
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Nome:</span>
                    <span className="text-sm font-medium">
                      {profileData.server.name}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Regione:</span>
                    <span className="text-sm font-medium">
                      {profileData.server.region}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Stato:</span>
                    <span className={`text-sm font-medium ${
                      profileData.server.active ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {profileData.server.active ? 'Attivo' : 'Inattivo'}
                    </span>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Verification Status */}
            {!isVerified && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-yellow-600">
                    Account in Attesa
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Il tuo account è in attesa di verifica da parte di un amministratore. 
                    Una volta verificato, potrai accedere a tutte le funzionalità della piattaforma.
                  </p>
                  <Link href="/auth/verification-pending">
                    <Button variant="outline" size="sm" className="w-full">
                      Controlla Stato Verifica
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}