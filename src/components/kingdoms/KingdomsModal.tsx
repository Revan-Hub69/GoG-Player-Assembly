'use client'

import { useState } from 'react'
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
      active: 'bg-green-100 text-green-800 border-green-300',
      pending: 'bg-amber-100 text-amber-800 border-amber-300',
      inactive: 'bg-slate-100 text-slate-600 border-slate-300',
      suspended: 'bg-red-100 text-red-800 border-red-300'
    }
    return colors[status] || colors.inactive
  }

  const getEngagementLevel = (score: number): { level: string; color: string } => {
    if (score >= 0.8) return { level: 'High', color: 'text-green-600' }
    if (score >= 0.6) return { level: 'Medium', color: 'text-blue-600' }
    if (score >= 0.4) return { level: 'Low', color: 'text-amber-600' }
    return { level: 'Minimal', color: 'text-slate-500' }
  }

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
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
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-slate-900 bg-opacity-75 transition-opacity" 
          aria-hidden="true"
          onClick={onClose}
        ></div>

        {/* Modal panel */}
        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-6xl">
          <div className="bg-white px-6 py-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900" id="modal-title">
                    Kingdom Participation Registry
                  </h3>
                  <p className="text-sm text-slate-500">
                    Democratic representation system overview
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="rounded-md bg-white text-slate-400 hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 p-2"
                aria-label="Close"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <div className="text-2xl font-bold text-slate-900">{kingdoms.length}</div>
                <div className="text-xs text-slate-500 uppercase tracking-wide font-medium">Total Kingdoms</div>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <div className="text-2xl font-bold text-green-600">{activeKingdoms.length}</div>
                <div className="text-xs text-slate-500 uppercase tracking-wide font-medium">Active</div>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <div className="text-2xl font-bold text-blue-600">
                  {kingdoms.filter(k => k.representative_name).length}
                </div>
                <div className="text-xs text-slate-500 uppercase tracking-wide font-medium">Represented</div>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <div className="text-2xl font-bold text-amber-600">{availableSlots.length}</div>
                <div className="text-xs text-slate-500 uppercase tracking-wide font-medium">Available Slots</div>
              </div>
            </div>

            {/* CTA Section */}
            {availableSlots.length > 0 && (
              <div className="mb-6 p-4 bg-slate-900 rounded-lg border border-slate-700">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-1 flex items-center space-x-2">
                      <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span>Representative Position Available</span>
                    </h4>
                    <p className="text-xs text-slate-300 mb-3">
                      {availableSlots.length} kingdoms require democratic representation
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-slate-400">
                      <div className="flex items-center space-x-1">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                        <span>Democratic process</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                        <span>Technical governance</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => setShowApplicationForm(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-medium rounded-md shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                  >
                    Apply Now
                  </Button>
                </div>
              </div>
            )}

            {/* Kingdoms List */}
            <div className="max-h-96 overflow-y-auto space-y-3">
              {kingdoms.map((kingdom, index) => {
                const engagement = getEngagementLevel(kingdom.engagement_score)
                
                return (
                  <div 
                    key={kingdom.server_id} 
                    className="bg-slate-50 border border-slate-200 rounded-lg p-4 hover:bg-slate-100 transition-colors duration-200"
                  >
                    <div className="grid grid-cols-12 gap-4 items-center">
                      {/* Kingdom Info */}
                      <div className="col-span-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center text-white font-mono text-sm">
                            {kingdom.kingdom_name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h4 className="font-medium text-slate-900 text-sm">{kingdom.kingdom_name}</h4>
                            <p className="text-xs text-slate-500">{kingdom.region}</p>
                          </div>
                        </div>
                      </div>

                      {/* Representative */}
                      <div className="col-span-3">
                        {kingdom.representative_name ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                              <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div>
                              <p className="font-medium text-slate-900 text-xs">{kingdom.representative_name}</p>
                              <p className="text-xs text-slate-500 truncate max-w-32">{kingdom.representative_email}</p>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2 text-amber-600">
                            <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center">
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div>
                              <p className="font-medium text-xs">Available</p>
                              <p className="text-xs text-slate-500">No representative</p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Status */}
                      <div className="col-span-2">
                        <Badge 
                          variant="outline" 
                          className={`${getStatusColor(kingdom.participation_status)} text-xs px-2 py-1`}
                        >
                          {kingdom.participation_status.charAt(0).toUpperCase() + kingdom.participation_status.slice(1)}
                        </Badge>
                      </div>

                      {/* Proposals */}
                      <div className="col-span-1 text-center">
                        <div className="text-sm font-semibold text-slate-900">{kingdom.proposals_submitted}</div>
                        <div className="text-xs text-slate-500">Props</div>
                      </div>

                      {/* Engagement */}
                      <div className="col-span-2 text-right">
                        <div className={`text-sm font-semibold ${engagement.color}`}>
                          {Math.round(kingdom.engagement_score * 100)}%
                        </div>
                        <div className="text-xs text-slate-500">{engagement.level}</div>
                      </div>
                    </div>

                    {/* Additional Info */}
                    <div className="mt-3 pt-3 border-t border-slate-200">
                      <div className="grid grid-cols-2 gap-4 text-xs text-slate-500">
                        <div>Joined: {formatDate(kingdom.joined_at)}</div>
                        <div>Last active: {formatDate(kingdom.last_activity_at)}</div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {kingdoms.length === 0 && (
              <div className="text-center py-12">
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h4 className="text-sm font-medium text-slate-900 mb-2">No kingdoms registered</h4>
                <p className="text-xs text-slate-500">Kingdoms will appear here as they join the assembly.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}