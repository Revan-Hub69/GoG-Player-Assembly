'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { ExternalLink, Database, Key, Server } from 'lucide-react'

export default function SetupPage() {
  const [step, setStep] = useState(1)
  const [config, setConfig] = useState({
    url: '',
    anonKey: '',
    serviceKey: ''
  })

  const isSupabaseConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && 
    process.env.NEXT_PUBLIC_SUPABASE_URL !== 'your_supabase_project_url'

  if (isSupabaseConfigured) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-green-600">Setup Complete!</CardTitle>
            <CardDescription>
              Supabase is already configured for this project.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <a href="/auth/login" className="w-full block">
              <Button className="w-full">Go to Login</Button>
            </a>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">GoG Player Assembly Setup</h1>
          <p className="text-gray-600 mt-2">
            Configure your Supabase database to get started
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Instructions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="w-5 h-5 mr-2" />
                  Step 1: Create Supabase Project
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">
                  First, you need to create a new Supabase project:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>Go to <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline inline-flex items-center">supabase.com <ExternalLink className="w-3 h-3 ml-1" /></a></li>
                  <li>Sign up or log in to your account</li>
                  <li>Click "New Project"</li>
                  <li>Choose your organization</li>
                  <li>Enter project name: "gog-player-assembly"</li>
                  <li>Set a strong database password</li>
                  <li>Select a region close to your users</li>
                  <li>Click "Create new project"</li>
                </ol>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Key className="w-5 h-5 mr-2" />
                  Step 2: Get API Keys
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">
                  Once your project is created:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>Go to Project Settings → API</li>
                  <li>Copy the "Project URL"</li>
                  <li>Copy the "anon public" key</li>
                  <li>Copy the "service_role" key (keep this secret!)</li>
                </ol>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Server className="w-5 h-5 mr-2" />
                  Step 3: Run Database Migrations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">
                  After configuring your environment variables:
                </p>
                <div className="bg-gray-100 p-3 rounded text-sm font-mono">
                  # The migrations are already created in supabase/migrations/<br/>
                  # You'll need to run them in your Supabase SQL editor
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Configuration Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Environment Configuration</CardTitle>
                <CardDescription>
                  Enter your Supabase project details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Project URL
                  </label>
                  <Input
                    placeholder="https://your-project.supabase.co"
                    value={config.url}
                    onChange={(e) => setConfig({ ...config, url: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Anon Key (Public)
                  </label>
                  <Input
                    placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                    value={config.anonKey}
                    onChange={(e) => setConfig({ ...config, anonKey: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Service Role Key (Secret)
                  </label>
                  <Input
                    type="password"
                    placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                    value={config.serviceKey}
                    onChange={(e) => setConfig({ ...config, serviceKey: e.target.value })}
                  />
                </div>

                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded">
                  <h4 className="font-medium text-yellow-800 mb-2">Manual Configuration Required</h4>
                  <p className="text-sm text-yellow-700">
                    Copy these values to your <code className="bg-yellow-100 px-1 rounded">.env.local</code> file:
                  </p>
                  <div className="mt-3 bg-gray-900 text-green-400 p-3 rounded text-xs font-mono">
                    NEXT_PUBLIC_SUPABASE_URL={config.url || 'your_project_url'}<br/>
                    NEXT_PUBLIC_SUPABASE_ANON_KEY={config.anonKey || 'your_anon_key'}<br/>
                    SUPABASE_SERVICE_ROLE_KEY={config.serviceKey || 'your_service_key'}
                  </div>
                </div>

                <div className="space-y-2">
                  <Button 
                    className="w-full" 
                    disabled={!config.url || !config.anonKey || !config.serviceKey}
                  >
                    Configuration Ready
                  </Button>
                  <p className="text-xs text-gray-500 text-center">
                    After updating .env.local, restart your development server
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-sm">Database Schema</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">
                  The database schema is already defined in the migration files. 
                  You'll need to run these SQL scripts in your Supabase SQL editor:
                </p>
                <ul className="text-sm space-y-1">
                  <li>• <code>001_initial_schema.sql</code> - Core tables</li>
                  <li>• <code>002_custom_functions.sql</code> - Database functions</li>
                  <li>• <code>003_rls_policies.sql</code> - Security policies</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}