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
      <Card className={`bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer ${className || ''}`} onClick={() => setShowModal(true)}>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-900 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <span>Kingdom Participation</span>
            </div>
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </CardTitle>
          <CardDescription className="text-sm text-slate-600">
            View all participating kingdoms and apply for representative positions
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-center">
              <div className="text-xl font-bold text-slate-900">{kingdoms.length}</div>
              <div className="text-xs text-slate-500 uppercase tracking-wide font-medium">Total</div>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-center">
              <div className="text-xl font-bold text-green-600">{activeKingdoms.length}</div>
              <div className="text-xs text-slate-500 uppercase tracking-wide font-medium">Active</div>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-center">
              <div className="text-xl font-bold text-blue-600">
                {kingdoms.filter(k => k.representative_name).length}
              </div>
              <div className="text-xs text-slate-500 uppercase tracking-wide font-medium">Represented</div>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-center">
              <div className="text-xl font-bold text-slate-900">{totalProposals}</div>
              <div className="text-xs text-slate-500 uppercase tracking-wide font-medium">Proposals</div>
            </div>
          </div>

          {/* Preview of top kingdoms */}
          <div className="space-y-2 mb-6">
            <h4 className="font-medium text-slate-900 text-sm flex items-center space-x-2">
              <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Most Active Kingdoms</span>
            </h4>
            {activeKingdoms.slice(0, 3).map((kingdom, index) => (
              <div key={kingdom.server_id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-slate-700 rounded-lg flex items-center justify-center text-white font-mono text-xs">
                    {kingdom.kingdom_name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 text-sm">{kingdom.kingdom_name}</p>
                    <p className="text-xs text-slate-500">{kingdom.region}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-900">{kingdom.proposals_submitted}</p>
                  <p className="text-xs text-slate-500">proposals</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          {availableSlots.length > 0 && (
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-white mb-1 text-sm">
                    {availableSlots.length} Representative Positions Available
                  </h4>
                  <p className="text-xs text-slate-300">
                    Democratic representation system requires kingdom delegates
                  </p>
                </div>
                <Badge className="bg-blue-600 text-white border-blue-500 text-xs px-2 py-1">
                  Apply
                </Badge>
              </div>
            </div>
          )}

          {/* Action Button */}
          <Button 
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-2 rounded-md shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 text-sm"
            onClick={(e) => {
              e.stopPropagation()
              setShowModal(true)
            }}
          >
            <div className="flex items-center justify-center space-x-2">
              <span>View All Kingdoms</span>
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