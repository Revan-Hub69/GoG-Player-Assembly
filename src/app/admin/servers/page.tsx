'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
interface Server {
  id: string
  name: string
  region: string
  representative_id?: string
  active: boolean
  created_at: string
  representative?: {
    id: string
    name: string
    email: string
    verified: boolean
  }
}

interface Representative {
  id: string
  name: string
  email: string
  server_id?: string
  verified: boolean
}

export default function ServersAdminPage() {
  const { user, profile, loading } = useAuth()
  const router = useRouter()
  const [servers, setServers] = useState<Server[]>([])
  const [availableRepresentatives, setAvailableRepresentatives] = useState<Representative[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newServer, setNewServer] = useState({ name: '', region: '' })

  // Redirect if not admin
  useEffect(() => {
    if (!loading && (!user || profile?.role !== 'admin')) {
      router.push('/dashboard')
    }
  }, [user, profile, loading, router])

  // Fetch servers and available representatives
  useEffect(() => {
    if (profile?.role === 'admin') {
      fetchServers()
      fetchAvailableRepresentatives()
    }
  }, [profile])

  const fetchServers = async () => {
    try {
      const response = await fetch('/api/servers')
      const data = await response.json()
      
      if (response.ok) {
        setServers(data.data || [])
      } else {
        setError(data.error?.message || 'Failed to fetch servers')
      }
    } catch (err) {
      setError('Failed to fetch servers')
    } finally {
      setIsLoading(false)
    }
  }

  const fetchAvailableRepresentatives = async () => {
    try {
      const response = await fetch('/api/representatives/available')
      const data = await response.json()
      
      if (response.ok) {
        setAvailableRepresentatives(data.data || [])
      }
    } catch (err) {
      console.error('Failed to fetch available representatives:', err)
    }
  }

  const handleCreateServer = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/servers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newServer),
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setServers([...servers, data.data])
        setNewServer({ name: '', region: '' })
        setShowCreateForm(false)
      } else {
        setError(data.error?.message || 'Failed to create server')
      }
    } catch (err) {
      setError('Failed to create server')
    }
  }

  const handleAssignRepresentative = async (serverId: string, representativeId: string) => {
    try {
      const response = await fetch(`/api/servers/${serverId}/assign-representative`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ representative_id: representativeId }),
      })
      
      const data = await response.json()
      
      if (response.ok) {
        // Update servers list
        setServers(servers.map(server => 
          server.id === serverId ? data.data : server
        ))
        // Refresh available representatives
        fetchAvailableRepresentatives()
      } else {
        setError(data.error?.message || 'Failed to assign representative')
      }
    } catch (err) {
      setError('Failed to assign representative')
    }
  }

  const handleRemoveRepresentative = async (serverId: string) => {
    try {
      const response = await fetch(`/api/servers/${serverId}/remove-representative`, {
        method: 'POST',
      })
      
      const data = await response.json()
      
      if (response.ok) {
        // Update servers list
        setServers(servers.map(server => 
          server.id === serverId ? data.data : server
        ))
        // Refresh available representatives
        fetchAvailableRepresentatives()
      } else {
        setError(data.error?.message || 'Failed to remove representative')
      }
    } catch (err) {
      setError('Failed to remove representative')
    }
  }

  const handleDeactivateServer = async (serverId: string) => {
    if (!confirm('Are you sure you want to deactivate this server?')) return
    
    try {
      const response = await fetch(`/api/servers/${serverId}`, {
        method: 'DELETE',
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setServers(servers.filter(server => server.id !== serverId))
        fetchAvailableRepresentatives()
      } else {
        setError(data.error?.message || 'Failed to deactivate server')
      }
    } catch (err) {
      setError('Failed to deactivate server')
    }
  }

  if (loading || isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  if (!user || profile?.role !== 'admin') {
    return null
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Server Management</h1>
          <p className="text-muted-foreground">
            Manage servers and their representative assignments
          </p>
        </div>
        <Button onClick={() => setShowCreateForm(true)}>
          <img src="/icons/plus.svg" alt="Plus" className="w-4 h-4 mr-2" />
          Add Server
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
          <button 
            onClick={() => setError(null)}
            className="float-right text-red-500 hover:text-red-700"
          >
            ×
          </button>
        </div>
      )}

      {showCreateForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Create New Server</CardTitle>
            <CardDescription>
              Add a new server to the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateServer} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Server Name</label>
                <Input
                  value={newServer.name}
                  onChange={(e) => setNewServer({ ...newServer, name: e.target.value })}
                  placeholder="Enter server name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Region</label>
                <Input
                  value={newServer.region}
                  onChange={(e) => setNewServer({ ...newServer, region: e.target.value })}
                  placeholder="Enter region"
                  required
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit">Create Server</Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowCreateForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6">
        {servers.map((server) => (
          <Card key={server.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {server.name}
                    <Badge variant={server.active ? 'default' : 'secondary'}>
                      {server.active ? 'Active' : 'Inactive'}
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    Region: {server.region} • Created: {new Date(server.created_at).toLocaleDateString()}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <img src="/icons/edit.svg" alt="Edit" className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDeactivateServer(server.id)}
                  >
                    <img src="/icons/trash.svg" alt="Delete" className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Representative Assignment</h4>
                  {server.representative ? (
                    <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded">
                      <div>
                        <div className="font-medium">{server.representative.name}</div>
                        <div className="text-sm text-muted-foreground">{server.representative.email}</div>
                        <Badge variant={server.representative.verified ? 'default' : 'secondary'} className="mt-1">
                          {server.representative.verified ? 'Verified' : 'Unverified'}
                        </Badge>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleRemoveRepresentative(server.id)}
                      >
                        <img src="/icons/user-minus.svg" alt="Remove User" className="w-4 h-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
                      <div className="text-sm text-muted-foreground mb-3">No representative assigned</div>
                      {availableRepresentatives.length > 0 ? (
                        <div className="space-y-2">
                          <div className="text-sm font-medium">Available Representatives:</div>
                          {availableRepresentatives.map((rep) => (
                            <div key={rep.id} className="flex items-center justify-between p-2 bg-white border rounded">
                              <div>
                                <div className="font-medium">{rep.name}</div>
                                <div className="text-sm text-muted-foreground">{rep.email}</div>
                              </div>
                              <Button 
                                size="sm"
                                onClick={() => handleAssignRepresentative(server.id, rep.id)}
                                disabled={!rep.verified}
                              >
                                <img src="/icons/user-plus.svg" alt="Add User" className="w-4 h-4 mr-2" />
                                Assign
                              </Button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-sm text-muted-foreground">
                          No available representatives. All verified representatives are already assigned.
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {servers.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <div className="text-muted-foreground">
              No servers found. Create your first server to get started.
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}