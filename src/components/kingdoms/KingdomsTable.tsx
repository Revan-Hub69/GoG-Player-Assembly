'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { KingdomStats } from '@/types'
import type { Translations } from '@/lib/translations'

interface KingdomsTableProps {
  kingdoms: KingdomStats[]
  translations: Translations
  className?: string
}

export function KingdomsTable({ kingdoms, translations, className }: KingdomsTableProps) {
  const getStatusColor = (status: string): string => {
    const colors: Record<string, string> = {
      active: 'bg-green-100 text-green-800 border-green-200',
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      inactive: 'bg-gray-100 text-gray-800 border-gray-200',
      suspended: 'bg-red-100 text-red-800 border-red-200'
    }
    return colors[status] || colors.inactive
  }

  const getActivityColor = (activity: string): string => {
    const colors: Record<string, string> = {
      active: 'bg-emerald-100 text-emerald-800',
      recent: 'bg-blue-100 text-blue-800',
      inactive: 'bg-gray-100 text-gray-800'
    }
    return colors[activity] || colors.inactive
  }

  const getEngagementLevel = (score: number): { level: string; color: string } => {
    if (score >= 0.8) return { level: 'Eccellente', color: 'text-green-600' }
    if (score >= 0.6) return { level: 'Buono', color: 'text-blue-600' }
    if (score >= 0.4) return { level: 'Moderato', color: 'text-yellow-600' }
    if (score >= 0.2) return { level: 'Basso', color: 'text-orange-600' }
    return { level: 'Minimo', color: 'text-red-600' }
  }

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  return (
    <Card className={`border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 ${className || ''}`}>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-900 flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <span>Regni Partecipanti</span>
        </CardTitle>
        <CardDescription className="text-lg">
          Panoramica dei regni che partecipano al GoG Player Assembly e dei loro rappresentanti
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="grid gap-6">
          {/* Statistics Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl">
              <div className="text-2xl font-bold text-blue-600">{kingdoms.length}</div>
              <div className="text-sm text-blue-700">Regni Totali</div>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl">
              <div className="text-2xl font-bold text-green-600">
                {kingdoms.filter(k => k.participation_status === 'active').length}
              </div>
              <div className="text-sm text-green-700">Attivi</div>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-xl">
              <div className="text-2xl font-bold text-purple-600">
                {kingdoms.filter(k => k.representative_name).length}
              </div>
              <div className="text-sm text-purple-700">Con Rappresentante</div>
            </div>
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-xl">
              <div className="text-2xl font-bold text-orange-600">
                {kingdoms.reduce((sum, k) => sum + k.proposals_submitted, 0)}
              </div>
              <div className="text-sm text-orange-700">Proposte Totali</div>
            </div>
          </div>

          {/* Kingdoms Table */}
          <div className="overflow-x-auto">
            <div className="grid gap-4">
              {kingdoms.map((kingdom, index) => {
                const engagement = getEngagementLevel(kingdom.engagement_score)
                
                return (
                  <div 
                    key={kingdom.server_id} 
                    className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all duration-300 hover:scale-[1.01] animate-fade-in-up"
                    style={{animationDelay: `${index * 50}ms`}}
                  >
                    <div className="grid md:grid-cols-12 gap-4 items-center">
                      {/* Kingdom Info */}
                      <div className="md:col-span-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                            {kingdom.kingdom_name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 text-lg">{kingdom.kingdom_name}</h3>
                            <p className="text-sm text-gray-500">{kingdom.region}</p>
                          </div>
                        </div>
                      </div>

                      {/* Representative */}
                      <div className="md:col-span-3">
                        {kingdom.representative_name ? (
                          <div>
                            <p className="font-medium text-gray-900">{kingdom.representative_name}</p>
                            <p className="text-sm text-gray-500">{kingdom.representative_email}</p>
                          </div>
                        ) : (
                          <div className="text-sm text-gray-400 italic">Nessun rappresentante</div>
                        )}
                      </div>

                      {/* Status & Activity */}
                      <div className="md:col-span-2">
                        <div className="space-y-2">
                          <Badge 
                            variant="outline" 
                            className={`${getStatusColor(kingdom.participation_status)} hover:scale-105 transition-transform`}
                          >
                            {kingdom.participation_status === 'active' ? 'Attivo' :
                             kingdom.participation_status === 'pending' ? 'In Attesa' :
                             kingdom.participation_status === 'inactive' ? 'Inattivo' : 'Sospeso'}
                          </Badge>
                          <Badge 
                            className={`${getActivityColor(kingdom.activity_status)} hover:scale-105 transition-transform`}
                          >
                            {kingdom.activity_status === 'active' ? 'Recente' :
                             kingdom.activity_status === 'recent' ? 'Moderata' : 'Inattiva'}
                          </Badge>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="md:col-span-2">
                        <div className="text-center">
                          <div className="text-lg font-bold text-gray-900">{kingdom.proposals_submitted}</div>
                          <div className="text-xs text-gray-500">Proposte</div>
                        </div>
                      </div>

                      {/* Engagement Score */}
                      <div className="md:col-span-1">
                        <div className="text-center">
                          <div className={`text-lg font-bold ${engagement.color}`}>
                            {Math.round(kingdom.engagement_score * 100)}%
                          </div>
                          <div className="text-xs text-gray-500">{engagement.level}</div>
                        </div>
                      </div>
                    </div>

                    {/* Additional Info */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Iscritto:</span> {formatDate(kingdom.joined_at)}
                        </div>
                        <div>
                          <span className="font-medium">Ultima attività:</span> {formatDate(kingdom.last_activity_at)}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {kingdoms.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nessun regno partecipante</h3>
              <p className="text-gray-500">I regni che si uniranno al Player Assembly appariranno qui.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}