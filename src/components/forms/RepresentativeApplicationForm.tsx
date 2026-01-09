'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import type { Translations } from '@/lib/translations'

interface RepresentativeApplicationFormProps {
  translations: Translations
  onClose: () => void
  className?: string
}

interface FormData {
  playerName: string
  email: string
  discordTag: string
  kingdomName: string
  region: string
  experience: string
  motivation: string
  availability: string
}

export function RepresentativeApplicationForm({ translations, onClose, className }: RepresentativeApplicationFormProps) {
  const [formData, setFormData] = useState<FormData>({
    playerName: '',
    email: '',
    discordTag: '',
    kingdomName: '',
    region: '',
    experience: '',
    motivation: '',
    availability: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 3

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Here you would send the data to your API
    console.log('Representative application submitted:', formData)
    
    setIsSubmitting(false)
    onClose()
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.playerName && formData.email && formData.discordTag
      case 2:
        return formData.kingdomName && formData.region
      case 3:
        return formData.experience && formData.motivation && formData.availability
      default:
        return false
    }
  }

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 ${className || ''}`}>
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto card-enhanced animate-fade-in">
        <CardHeader className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <CardTitle className="text-2xl font-bold text-gray-900 flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <span>Candidatura Rappresentante</span>
          </CardTitle>
          <CardDescription className="text-lg">
            Diventa il rappresentante ufficiale del tuo regno nel GoG Player Assembly
          </CardDescription>
          
          {/* Progress indicator */}
          <div className="flex items-center space-x-2 mt-4">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div key={i} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                  i + 1 <= currentStep 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {i + 1}
                </div>
                {i < totalSteps - 1 && (
                  <div className={`w-12 h-1 mx-2 rounded transition-all duration-300 ${
                    i + 1 < currentStep ? 'bg-blue-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-fade-in-up">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Informazioni Personali</h3>
                  <p className="text-gray-600">Fornisci i tuoi dati di contatto per l'attivazione</p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome Giocatore *
                    </label>
                    <Input
                      type="text"
                      value={formData.playerName}
                      onChange={(e) => handleInputChange('playerName', e.target.value)}
                      placeholder="Il tuo nome nel gioco"
                      className="w-full"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="tua.email@esempio.com"
                      className="w-full"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Utilizzata per comunicazioni ufficiali e attivazione account
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Discord Tag *
                    </label>
                    <Input
                      type="text"
                      value={formData.discordTag}
                      onChange={(e) => handleInputChange('discordTag', e.target.value)}
                      placeholder="NomeUtente#1234"
                      className="w-full"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Per coordinamento e comunicazioni rapide con altri rappresentanti
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Kingdom Information */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-fade-in-up">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Informazioni Regno</h3>
                  <p className="text-gray-600">Dettagli sul regno che rappresenterai</p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome Regno *
                    </label>
                    <Input
                      type="text"
                      value={formData.kingdomName}
                      onChange={(e) => handleInputChange('kingdomName', e.target.value)}
                      placeholder="Nome del tuo regno"
                      className="w-full"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Regione Server *
                    </label>
                    <select
                      value={formData.region}
                      onChange={(e) => handleInputChange('region', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Seleziona regione</option>
                      <option value="Europa">Europa</option>
                      <option value="America">America</option>
                      <option value="Asia">Asia</option>
                      <option value="Oceania">Oceania</option>
                    </select>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <svg className="w-5 h-5 text-blue-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <h4 className="font-medium text-blue-900">Rappresentanza Democratica</h4>
                        <p className="text-sm text-blue-700 mt-1">
                          Ogni regno può avere un solo rappresentante per garantire equità e voce democratica a tutti i regni, indipendentemente dalla dimensione.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Experience and Motivation */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-fade-in-up">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Esperienza e Motivazione</h3>
                  <p className="text-gray-600">Raccontaci perché vuoi rappresentare il tuo regno</p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Esperienza di Gioco *
                    </label>
                    <textarea
                      value={formData.experience}
                      onChange={(e) => handleInputChange('experience', e.target.value)}
                      placeholder="Descrivi la tua esperienza con Guns of Glory (tempo di gioco, ruoli ricoperti, conoscenza del gioco...)"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Motivazione *
                    </label>
                    <textarea
                      value={formData.motivation}
                      onChange={(e) => handleInputChange('motivation', e.target.value)}
                      placeholder="Perché vuoi diventare rappresentante? Come pensi di contribuire al miglioramento del gioco?"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Disponibilità *
                    </label>
                    <select
                      value={formData.availability}
                      onChange={(e) => handleInputChange('availability', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Seleziona disponibilità</option>
                      <option value="alta">Alta (più di 2 ore al giorno)</option>
                      <option value="media">Media (1-2 ore al giorno)</option>
                      <option value="bassa">Bassa (meno di 1 ora al giorno)</option>
                    </select>
                  </div>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h4 className="font-medium text-green-900">Processo di Approvazione</h4>
                      <p className="text-sm text-green-700 mt-1">
                        La tua candidatura sarà valutata dal team Assembly. Riceverai una risposta via email entro 48 ore con le istruzioni per l'attivazione.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex justify-between pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Indietro</span>
              </Button>
              
              {currentStep < totalSteps ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  disabled={!isStepValid()}
                  className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <span>Avanti</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={!isStepValid() || isSubmitting}
                  className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Invio in corso...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      <span>Invia Candidatura</span>
                    </>
                  )}
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}