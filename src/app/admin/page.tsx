'use client'

import { useAuth } from '@/hooks/useAuth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, Server, FileText, BarChart3, Settings } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AdminDashboard() {
  const { user, profile, loading } = useAuth()
  const router = useRouter()

  // Redirect if not admin
  useEffect(() => {
    if (!loading && (!user || profile?.role !== 'admin')) {
      router.push('/dashboard')
    }
  }, [user, profile, loading, router])

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  if (!user || profile?.role !== 'admin') {
    return null
  }

  const adminSections = [
    {
      title: 'Representative Management',
      description: 'Verify and manage server representatives',
      icon: Users,
      href: '/admin/representatives',
      color: 'bg-blue-500',
    },
    {
      title: 'Server Management',
      description: 'Manage servers and representative assignments',
      icon: Server,
      href: '/admin/servers',
      color: 'bg-green-500',
    },
    {
      title: 'Proposal Management',
      description: 'Review and manage community proposals',
      icon: FileText,
      href: '/admin/proposals',
      color: 'bg-purple-500',
      disabled: true, // Will be implemented in later tasks
    },
    {
      title: 'Analytics & Reports',
      description: 'View community metrics and generate reports',
      icon: BarChart3,
      href: '/admin/analytics',
      color: 'bg-orange-500',
      disabled: true, // Will be implemented in later tasks
    },
    {
      title: 'System Settings',
      description: 'Configure system-wide settings',
      icon: Settings,
      href: '/admin/settings',
      color: 'bg-gray-500',
      disabled: true, // Will be implemented in later tasks
    },
  ]

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage the GoG Player Assembly platform
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminSections.map((section) => {
          const Icon = section.icon
          
          return (
            <Card key={section.title} className={section.disabled ? 'opacity-50' : ''}>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${section.color} text-white`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{section.title}</CardTitle>
                  </div>
                </div>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
              <CardContent>
                {section.disabled ? (
                  <Button disabled className="w-full">
                    Coming Soon
                  </Button>
                ) : (
                  <Link href={section.href}>
                    <Button className="w-full">
                      Manage
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common administrative tasks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Link href="/admin/representatives">
                <Button variant="outline">
                  <Users className="w-4 h-4 mr-2" />
                  Verify Representatives
                </Button>
              </Link>
              <Link href="/admin/servers">
                <Button variant="outline">
                  <Server className="w-4 h-4 mr-2" />
                  Manage Servers
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="outline">
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}