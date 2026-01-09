'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { KingdomsModal } from './KingdomsModal'
import type { KingdomStats } from '@/types'
import type { Translations } from '@/lib/translations'

interface KingdomsTableProps {
  kingdoms: KingdomStats[]
  translations: Translations
  className?: string
}

export function KingdomsTable({ kingdoms, translations, className }: KingdomsTableProps) {
  const [showModal, setShowModal] = useState(false)

  const activeKingdoms = kingdoms.filter(k => k.participation_status === 'active')
  const availableSlots = kingdoms.filter(k => !k.representative_name)
  const totalProposals = kingdoms.reduce((sum, k) => sum + k.proposals_submitted, 0)

  return (
    <>
      <Card className={`card-enhanced interactive-hover cursor-pointer ${className || ''}`} onClick={() => setShowModal(true)}>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <span>Regni Partecipanti</span>
            </div>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </CardTitle>
          <CardDescription className="text-lg">
            Clicca per vedere tutti i regni partecipanti e candidarti come rappresentante
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl text-center hover:scale-105 transition-transform">
              <div className="text-2xl font-bold text-blue-600">{kingdoms.length}</div>
              <div className="text-sm text-blue-700 font-medium">Regni Totali</div>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl text-center hover:scale-105 transition-transform">
              <div className="text-2xl font-bold text-green-600">{activeKingdoms.length}</div>
              <div className="text-sm text-green-700 font-medium">Attivi</div>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-xl text-center hover:scale-105 transition-transform">
              <div className="text-2xl font-bold text-purple-600">
                {kingdoms.filter(k => k.representative_name).length}
              </div>
              <div className="text-sm text-purple-700 font-medium">Con Rappresentante</div>
            </div>
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-xl text-center hover:scale-105 transition-transform">
              <div className="text-2xl font-bold text-orange-600">{totalProposals}</div>
              <div className="text-sm text-orange-700 font-medium">Proposte Totali</div>
            </div>
          </div>

          {/* Preview of top kingdoms */}
          <div className="space-y-3 mb-6">
            <h4 className="font-semibold text-gray-900 flex items-center space-x-2">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Regni Più Attivi</span>
            </h4>
            {activeKingdoms.slice(0, 3).map((kingdom, index) => (
              <div key={kingdom.server_id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                    {kingdom.kingdom_name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{kingdom.kingdom_name}</p>
                    <p className="text-xs text-gray-500">{kingdom.region}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">{kingdom.proposals_submitted}</p>
                  <p className="text-xs text-gray-500">proposte</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          {availableSlots.length > 0 && (
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-xl border border-green-200 mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    🎯 {availableSlots.length} Slot Disponibili
                  </h4>
                  <p className="text-sm text-gray-600">
                    Regni in cerca di rappresentante democratico
                  </p>
                </div>
                <Badge className="bg-green-100 text-green-800 border-green-200 animate-pulse">
                  Candidati!
                </Badge>
              </div>
            </div>
          )}

          {/* Action Button */}
          <Button 
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] btn-focus"
            onClick={(e) => {
              e.stopPropagation()
              setShowModal(true)
            }}
          >
            <div className="flex items-center justify-center space-x-2">
              <span>Vedi Tutti i Regni</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </Button>
        </CardContent>
      </Card>

      {/* Modal */}
      {showModal && (
        <KingdomsModal
          kingdoms={kingdoms}
          translations={translations}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  )
}