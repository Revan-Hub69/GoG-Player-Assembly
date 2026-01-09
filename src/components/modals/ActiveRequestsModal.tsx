'use client'

import { useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { RequestCard } from '@/components/requests/RequestCard'
import type { Translations } from '@/lib/translations'

interface CommunityRequest {
  id: string
  title: string
  description: string
  category: 'gameplay' | 'economy' | 'social' | 'technical'
  priority: 'critical' | 'high' | 'medium' | 'low'
  status: 'draft' | 'review' | 'submitted' | 'acknowledged'
  submittedBy: string
  submittedDate: string
  technicalDetails: string
  expectedOutcome: string
}

interface ActiveRequestsModalProps {
  requests: CommunityRequest[]
  translations: Translations
  onClose: () => void
}

export function ActiveRequestsModal({ requests, translations, onClose }: ActiveRequestsModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  // Focus management and keyboard handling
  useEffect(() => {
    // Store the previously focused element
    previousFocusRef.current = document.activeElement as HTMLElement

    // Focus the modal when it opens
    if (modalRef.current) {
      modalRef.current.focus()
    }

    // Handle escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    // Trap focus within modal
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        const firstElement = focusableElements[0] as HTMLElement
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault()
            lastElement.focus()
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault()
            firstElement.focus()
          }
        }
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.addEventListener('keydown', handleTabKey)

    // Prevent body scroll
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('keydown', handleTabKey)
      document.body.style.overflow = 'unset'
      
      // Return focus to the element that opened the modal
      if (previousFocusRef.current) {
        previousFocusRef.current.focus()
      }
    }
  }, [onClose])

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog" 
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop with proper opacity and blur */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300" 
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal container - centered and properly sized */}
      <div 
        ref={modalRef}
        className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-xl shadow-2xl animate-fade-in-up overflow-hidden focus:outline-none"
        tabIndex={-1}
      >
        {/* Header - fixed at top */}
        <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900" id="modal-title">
                  {translations.modals.activeRequests.title}
                </h2>
                <p className="text-sm text-slate-500">
                  {translations.modals.activeRequests.subtitle}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              aria-label={translations.modals.activeRequests.close}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)] p-6">
          {requests.length > 0 ? (
            <div className="space-y-6">
              {requests.map((request, index) => (
                <div key={request.id} className="animate-fade-in-up" style={{animationDelay: `${index * 100}ms`}}>
                  <RequestCard request={request} translations={translations} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-2">
                {translations.modals.activeRequests.noRequests}
              </h3>
              <p className="text-sm text-slate-500">
                {translations.requests.subtitle}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 z-10 bg-white border-t border-slate-200 px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-sm text-slate-500">
              {requests.length} {requests.length === 1 ? 'richiesta attiva' : 'richieste attive'}
            </div>
            <Button
              onClick={onClose}
              className="bg-slate-900 hover:bg-slate-800 text-white focus:ring-2 focus:ring-slate-500"
            >
              {translations.modals.activeRequests.close}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}