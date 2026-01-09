'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { RepresentativeApplicationForm } from '@/components/forms/RepresentativeApplicationForm'
import type { KingdomStats } from '@/types'
import type { Translations } from '@/lib/translations'

interface KingdomsModalProps {
  kingdoms: KingdomStats[]
  translations: Translations
  onClose: () => void
  className?: string
}

export function KingdomsModal({ kingdoms, translations, onClose, className }: KingdomsModalProps) {
  const [showApplicationForm, setShowApplicationForm] = useState(false)

  const getStatusColor = (status: string): string => {
    const colors: Record<string, string> = {
      active: 'bg-green-100 text-green-800 border-green-200',
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      inactive: 'bg-gray-100 text-gray-800 border-gray-200',
      suspended: 'bg-red-100 text-red-800 border-red-200'
    }
    return colors[status] || colors.inactive
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

  const activeKingdoms = kingdoms.filter(k => k.participation_status === 'active')
  const availableSlots = kingdoms.filter(k => !k.representative_name)

  if (showApplicationForm) {
    return (
      <RepresentativeApplicationForm
        translations={translations}
        onClose={() => setShowApplicationForm(false)}
      />
    )
  }

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 ${className || ''}`}>
      <Card className="w-full max-w-6xl max-h-[90vh] overflow-hidden card-enhanced animate-fade-in">
        <CardHeader className="relative border-b bg-gradient-to-r from-blue-50 to-purple-50">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white hover:bg-gray-100 rounded-full flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg focus-enhanced"
            aria-label="Chiudi"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <CardTitle className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <span>Regni Partecipanti</span>
          </CardTitle>
          <CardDescription className="text-lg">
            Panoramica completa dei regni nel GoG Player Assembly
          </CardDescription>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <div className="text-2xl font-bold text-blue-600">{kingdoms.length}</div>
              <div className="text-sm text-gray-600">Regni Totali</div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <div className="text-2xl font-bold text-green-600">{activeKingdoms.length}</div>
              <div className="text-sm text-gray-600">Attivi</div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <div className="text-2xl font-bold text-purple-600">
                {kingdoms.filter(k => k.representative_name).length}
              </div>
              <div className="text-sm text-gray-600">Con Rappresentante</div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <div className="text-2xl font-bold text-orange-600">{availableSlots.length}</div>
              <div className="text-sm text-gray-600">Slot Disponibili</div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6 overflow-y-auto max-h-[60vh]">
          {/* CTA Section */}
          {availableSlots.length > 0 && (
            <div className="mb-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    🎯 Diventa Rappresentante del Tuo Regno
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {availableSlots.length} regni stanno cercando un rappresentante. 
                    Unisciti al Player Assembly e dai voce alla tua community!
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Processo democratico</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Un regno = una voce</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <svg className="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Comunicazione diretta con sviluppatori</span>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() => setShowApplicationForm(true)}
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-6 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 btn-focus"
                >
                  Candidati Ora
                </Button>
              </div>
            </div>
          )}

          {/* Kingdoms List */}
          <div className="space-y-4">
            {kingdoms.map((kingdom, index) => {
              const engagement = getEngagementLevel(kingdom.engagement_score)
              
              return (
                <div 
                  key={kingdom.server_id} 
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all duration-300 hover:scale-[1.01] fade-in-observer card-focus"
                  style={{animationDelay: `${index * 50}ms`}}
                  tabIndex={0}
                >
                  <div className="grid md:grid-cols-12 gap-4 items-center">
                    {/* Kingdom Info */}
                    <div className="md:col-span-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md">
                          {kingdom.kingdom_name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 text-lg">{kingdom.kingdom_name}</h3>
                          <p className="text-sm text-gray-500 flex items-center space-x-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            <span>{kingdom.region}</span>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Representative */}
                    <div className="md:col-span-3">
                      {kingdom.representative_name ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 text-sm">{kingdom.representative_name}</p>
                            <p className="text-xs text-gray-500">{kingdom.representative_email}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2 text-amber-600">
                          <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div>
                            <p className="font-medium text-sm">Slot Disponibile</p>
                            <p className="text-xs">Cerca rappresentante</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Status & Activity */}
                    <div className="md:col-span-2">
                      <div className="space-y-2">
                        <Badge 
                          variant="outline" 
                          className={`${getStatusColor(kingdom.participation_status)} hover:scale-105 transition-transform text-xs`}
                        >
                          {kingdom.participation_status === 'active' ? 'Attivo' :
                           kingdom.participation_status === 'pending' ? 'In Attesa' :
                           kingdom.participation_status === 'inactive' ? 'Inattivo' : 'Sospeso'}
                        </Badge>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="md:col-span-2">
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900">{kingdom.proposals_submitted}</div>
                        <div className="text-xs text-gray-500">Proposte Inviate</div>
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
                    <div className="grid grid-cols-2 gap-4 text-xs text-gray-600">
                      <div className="flex items-center space-x-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        <span>Iscritto: {formatDate(kingdom.joined_at)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        <span>Ultima attività: {formatDate(kingdom.last_activity_at)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
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
        </CardContent>
      </Card>
    </div>
  )
}