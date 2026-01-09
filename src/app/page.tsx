'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/layout/Header'
import { RequestCard } from '@/components/requests/RequestCard'
import { KingdomsTable } from '@/components/kingdoms/KingdomsTable'
import { AIProcessFlow } from '@/components/ai/AIProcessFlow'
import { RepresentativeApplicationForm } from '@/components/forms/RepresentativeApplicationForm'
import { ActiveRequestsModal } from '@/components/modals/ActiveRequestsModal'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { getTranslations, type Language } from '@/lib/translations'
import type { KingdomStats } from '@/types'

interface CommunityRequest {
  id: string
  title: { it: string; en: string }
  description: { it: string; en: string }
  category: 'gameplay' | 'economy' | 'social' | 'technical'
  priority: 'critical' | 'high' | 'medium' | 'low'
  status: 'draft' | 'review' | 'submitted' | 'acknowledged'
  submittedBy: { it: string; en: string }
  submittedDate: string
  technicalDetails: { it: string; en: string }
  expectedOutcome: { it: string; en: string }
}

const communityRequests: CommunityRequest[] = [
  {
    id: '1',
    title: {
      it: 'Standardizzazione Sistema di Attivazione Skill delle Guardie',
      en: 'Guard Skill Activation System Standardization'
    },
    description: {
      it: 'Richiesta aggregata da 23 proposte della community per standardizzare il sistema RNG delle skill delle guardie. L\'AI ha identificato pattern comuni nelle lamentele riguardo l\'imprevedibilità dei risultati di battaglia.',
      en: 'Aggregated request from 23 community proposals to standardize the guard skill RNG system. AI identified common patterns in complaints about unpredictable battle outcomes.'
    },
    category: 'gameplay',
    priority: 'critical',
    status: 'review',
    submittedBy: {
      it: 'Sistema AI Assembly (23 proposte aggregate)',
      en: 'AI Assembly System (23 aggregated proposals)'
    },
    submittedDate: '15/01/2024',
    technicalDetails: {
      it: 'Implementare attivazione skill deterministica basata su ordine di turno o sistema di cooldown. Analisi AI suggerisce sistema ibrido con 70% determinismo e 30% casualità controllata.',
      en: 'Implement deterministic skill activation based on turn order or cooldown system. AI analysis suggests hybrid system with 70% determinism and 30% controlled randomness.'
    },
    expectedOutcome: {
      it: 'Risultati di battaglia più consistenti che premiano la pianificazione strategica. Riduzione del 60% delle lamentele relative all\'RNG secondo l\'analisi predittiva AI.',
      en: 'More consistent battle outcomes rewarding strategic planning. 60% reduction in RNG-related complaints according to AI predictive analysis.'
    }
  },
  {
    id: '2',
    title: {
      it: 'Sistema di Mitigazione Disturbi del Regno',
      en: 'Kingdom Disruption Mitigation System'
    },
    description: {
      it: 'Aggregazione AI di 18 proposte riguardanti la gestione di giocatori disturbanti. L\'analisi ha identificato pattern comportamentali comuni e soluzioni convergenti.',
      en: 'AI aggregation of 18 proposals regarding disruptive player management. Analysis identified common behavioral patterns and convergent solutions.'
    },
    category: 'social',
    priority: 'high',
    status: 'draft',
    submittedBy: {
      it: 'Sistema AI Assembly (18 proposte aggregate)',
      en: 'AI Assembly System (18 aggregated proposals)'
    },
    submittedDate: '12/01/2024',
    technicalDetails: {
      it: 'Sistema di reputazione multi-livello con restrizioni temporanee graduate. L\'AI raccomanda implementazione graduale con periodo di test di 30 giorni.',
      en: 'Multi-level reputation system with graduated temporary restrictions. AI recommends gradual implementation with 30-day testing period.'
    },
    expectedOutcome: {
      it: 'Riduzione del 45% del turnover dei regni e miglioramento del 35% della retention secondo modelli predittivi AI.',
      en: '45% reduction in kingdom turnover and 35% improvement in retention according to AI predictive models.'
    }
  },
  {
    id: '3',
    title: {
      it: 'Riequilibrio Economia delle Risorse',
      en: 'Resource Economy Rebalancing'
    },
    description: {
      it: 'Sintesi AI di 31 proposte economiche che identificano barriere di accessibilità. L\'analisi ha rivelato pattern comuni nei costi delle risorse e suggerimenti di miglioramento.',
      en: 'AI synthesis of 31 economic proposals identifying accessibility barriers. Analysis revealed common patterns in resource costs and improvement suggestions.'
    },
    category: 'economy',
    priority: 'high',
    status: 'submitted',
    submittedBy: {
      it: 'Sistema AI Assembly (31 proposte aggregate)',
      en: 'AI Assembly System (31 aggregated proposals)'
    },
    submittedDate: '10/01/2024',
    technicalDetails: {
      it: 'Modello di pricing dinamico a livelli con percorsi alternativi. L\'AI suggerisce implementazione A/B testing per validare l\'impatto sui ricavi.',
      en: 'Dynamic tiered pricing model with alternative pathways. AI suggests A/B testing implementation to validate revenue impact.'
    },
    expectedOutcome: {
      it: 'Miglioramento del 40% nell\'accessibilità delle funzionalità mantenendo l\'equilibrio economico secondo simulazioni AI.',
      en: '40% improvement in feature accessibility while maintaining economic balance according to AI simulations.'
    }
  }
]

// Mock data for kingdoms
const mockKingdoms: KingdomStats[] = [
  {
    server_id: '1',
    kingdom_name: 'Regno del Nord',
    region: 'Europa',
    representative_name: 'Marco Rossi',
    representative_email: 'marco.rossi@email.com',
    participation_status: 'active',
    joined_at: '2024-01-01T00:00:00Z',
    last_activity_at: '2024-01-20T10:30:00Z',
    proposals_submitted: 8,
    engagement_score: 0.85,
    activity_status: 'active'
  },
  {
    server_id: '2',
    kingdom_name: 'Impero del Sud',
    region: 'Europa',
    representative_name: 'Sofia Bianchi',
    representative_email: 'sofia.bianchi@email.com',
    participation_status: 'active',
    joined_at: '2024-01-03T00:00:00Z',
    last_activity_at: '2024-01-19T15:45:00Z',
    proposals_submitted: 12,
    engagement_score: 0.92,
    activity_status: 'active'
  },
  {
    server_id: '3',
    kingdom_name: 'Alleanza Orientale',
    region: 'Asia',
    representative_name: 'Chen Wei',
    representative_email: 'chen.wei@email.com',
    participation_status: 'active',
    joined_at: '2024-01-05T00:00:00Z',
    last_activity_at: '2024-01-18T09:20:00Z',
    proposals_submitted: 6,
    engagement_score: 0.73,
    activity_status: 'recent'
  },
  {
    server_id: '4',
    kingdom_name: 'Federazione Occidentale',
    region: 'America',
    representative_name: 'John Smith',
    representative_email: 'john.smith@email.com',
    participation_status: 'active',
    joined_at: '2024-01-02T00:00:00Z',
    last_activity_at: '2024-01-21T14:10:00Z',
    proposals_submitted: 15,
    engagement_score: 0.88,
    activity_status: 'active'
  },
  {
    server_id: '5',
    kingdom_name: 'Coalizione Artica',
    region: 'Europa',
    representative_name: 'Anna Kowalski',
    representative_email: 'anna.kowalski@email.com',
    participation_status: 'pending',
    joined_at: '2024-01-15T00:00:00Z',
    last_activity_at: '2024-01-16T11:30:00Z',
    proposals_submitted: 2,
    engagement_score: 0.45,
    activity_status: 'recent'
  },
  {
    server_id: '6',
    kingdom_name: 'Unione del Pacifico',
    region: 'Oceania',
    representative_name: undefined,
    representative_email: undefined,
    participation_status: 'inactive',
    joined_at: '2024-01-08T00:00:00Z',
    last_activity_at: '2024-01-10T16:20:00Z',
    proposals_submitted: 1,
    engagement_score: 0.25,
    activity_status: 'inactive'
  }
]

export default function Home() {
  // Initialize language from localStorage using lazy initialization
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('gog-assembly-language') as Language
      if (savedLanguage && (savedLanguage === 'it' || savedLanguage === 'en')) {
        return savedLanguage
      }
    }
    return 'it'
  })
  const [showRepresentativeForm, setShowRepresentativeForm] = useState(false)
  const [showActiveRequestsModal, setShowActiveRequestsModal] = useState(false)
  const t = getTranslations(language)
  
  // Initialize intersection observer for fade-in animations
  useIntersectionObserver()

  // Save language preference to localStorage when changed
  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage)
    localStorage.setItem('gog-assembly-language', newLanguage)
  }

  // Transform requests for current language
  const localizedRequests = communityRequests.map(request => ({
    id: request.id,
    title: request.title[language],
    description: request.description[language],
    category: request.category,
    priority: request.priority,
    status: request.status,
    submittedBy: request.submittedBy[language],
    submittedDate: request.submittedDate,
    technicalDetails: request.technicalDetails[language],
    expectedOutcome: request.expectedOutcome[language]
  }))

  return (
    <div className="min-h-screen bg-slate-50 fade-in-on-load">
      <Header 
        language={language}
        translations={t}
        onLanguageChange={handleLanguageChange}
      />

      {/* Hero Section */}
      <section className="bg-white py-20 relative overflow-hidden border-b border-slate-200">
        {/* Subtle tech background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23334155' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="animate-fade-in-up">
              <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl lg:text-6xl mb-6">
                <span className="bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">{t.hero.title}</span>
              </h1>
              <div className="stagger-fade-in">
                <p className="mt-6 text-lg text-slate-600 max-w-4xl mx-auto leading-relaxed">
                  {t.hero.subtitle}
                </p>
              </div>
            </div>
            <div className="mt-12 flex items-center justify-center space-x-8 text-sm text-slate-500 animate-fade-in-up animation-delay-200">
              <div className="flex items-center space-x-2 hover:text-slate-700 transition-colors group">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="font-medium">{t.hero.democraticProcess}</span>
              </div>
              <div className="flex items-center space-x-2 hover:text-slate-700 transition-colors group">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="font-medium">{t.hero.technicalValidation}</span>
              </div>
              <div className="flex items-center space-x-2 hover:text-slate-700 transition-colors group">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="font-medium">{t.hero.professionalCommunication}</span>
              </div>
              <div className="flex items-center space-x-2 hover:text-slate-700 transition-colors group">
                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                <span className="font-medium">{t.hero.aiAggregation}</span>
              </div>
            </div>
            
            {/* Call to action */}
            <div className="mt-12 animate-fade-in-up animation-delay-400 flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => setShowActiveRequestsModal(true)}
                className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 text-sm font-medium rounded-md shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
              >
                {t.header.requests}
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => setShowRepresentativeForm(true)}
                className="border border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-3 text-sm font-medium rounded-md shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
              >
                {t.representativeForm.title}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Process Overview */}
        <section id="process" className="mb-20 fade-in-observer">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl font-bold text-gray-900">{t.process.title}</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              {t.process.subtitle}
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center group animate-fade-in-up animation-delay-100">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-all duration-300 group-hover:scale-110">
                <span className="text-blue-600 font-bold text-xl">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{t.process.collection.title}</h3>
              <p className="text-gray-600">
                {t.process.collection.description}
              </p>
            </div>

            <div className="text-center group animate-fade-in-up animation-delay-200">
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-all duration-300 group-hover:scale-110">
                <span className="text-green-600 font-bold text-xl">2</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{t.process.analysis.title}</h3>
              <p className="text-gray-600">
                {t.process.analysis.description}
              </p>
            </div>

            <div className="text-center group animate-fade-in-up animation-delay-300">
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-200 transition-all duration-300 group-hover:scale-110">
                <span className="text-purple-600 font-bold text-xl">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{t.process.articulation.title}</h3>
              <p className="text-gray-600">
                {t.process.articulation.description}
              </p>
            </div>

            <div className="text-center group animate-fade-in-up animation-delay-400">
              <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-200 transition-all duration-300 group-hover:scale-110">
                <span className="text-orange-600 font-bold text-xl">4</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{t.process.submission.title}</h3>
              <p className="text-gray-600">
                {t.process.submission.description}
              </p>
            </div>
          </div>
        </section>

        {/* Problem Statement Section */}
        <section className="mb-20 fade-in-observer">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-red-50 to-orange-50 hover:shadow-xl transition-shadow duration-300 card-focus" tabIndex={0}>
            <CardContent className="pt-12 pb-12">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-slate-900 mb-6">{t.problemStatement.title}</h3>
                <p className="text-lg text-slate-600 max-w-4xl mx-auto">
                  {t.problemStatement.subtitle}
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-12">
                {/* Problems */}
                <div>
                  <h4 className="text-xl font-semibold text-red-700 mb-6 flex items-center">
                    <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    {t.problemStatement.problems.title}
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                      <div>
                        <h5 className="font-medium text-slate-900">{t.problemStatement.problems.socialNoise.title}</h5>
                        <p className="text-slate-600 text-sm">{t.problemStatement.problems.socialNoise.description}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                      <div>
                        <h5 className="font-medium text-slate-900">{t.problemStatement.problems.toxicity.title}</h5>
                        <p className="text-slate-600 text-sm">{t.problemStatement.problems.toxicity.description}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                      <div>
                        <h5 className="font-medium text-slate-900">{t.problemStatement.problems.dominantVoices.title}</h5>
                        <p className="text-slate-600 text-sm">{t.problemStatement.problems.dominantVoices.description}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                      <div>
                        <h5 className="font-medium text-slate-900">{t.problemStatement.problems.unusableFeedback.title}</h5>
                        <p className="text-slate-600 text-sm">{t.problemStatement.problems.unusableFeedback.description}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Solutions */}
                <div>
                  <h4 className="text-xl font-semibold text-green-700 mb-6 flex items-center">
                    <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {t.problemStatement.solutions.title}
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <h5 className="font-medium text-slate-900">{t.problemStatement.solutions.organizedStructure.title}</h5>
                        <p className="text-slate-600 text-sm">{t.problemStatement.solutions.organizedStructure.description}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <h5 className="font-medium text-slate-900">{t.problemStatement.solutions.professionalCommunication.title}</h5>
                        <p className="text-slate-600 text-sm">{t.problemStatement.solutions.professionalCommunication.description}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <h5 className="font-medium text-slate-900">{t.problemStatement.solutions.fairRepresentation.title}</h5>
                        <p className="text-slate-600 text-sm">{t.problemStatement.solutions.fairRepresentation.description}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <h5 className="font-medium text-slate-900">{t.problemStatement.solutions.technicalValidation.title}</h5>
                        <p className="text-slate-600 text-sm">{t.problemStatement.solutions.technicalValidation.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* AI Process Flow */}
        <section id="ai-process" className="mb-20 fade-in-observer">
          <AIProcessFlow translations={t} />
        </section>

        {/* Project Costs Section */}
        <section id="project-costs" className="mb-20 fade-in-observer">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-green-50 to-emerald-50 hover:shadow-xl transition-shadow duration-300 card-focus" tabIndex={0}>
            <CardContent className="pt-12 pb-12">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-slate-900 mb-6">{t.projectCosts.title}</h3>
                <p className="text-lg text-slate-600 max-w-4xl mx-auto">
                  {t.projectCosts.subtitle}
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {/* Infrastructure */}
                <div className="text-center group">
                  <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-all duration-300 group-hover:scale-110">
                    <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-slate-900 mb-4">{t.projectCosts.infrastructure.title}</h4>
                  <p className="text-slate-600 mb-4">{t.projectCosts.infrastructure.description}</p>
                  <div className="text-2xl font-bold text-blue-600">{t.projectCosts.infrastructure.cost}</div>
                </div>

                {/* AI Services */}
                <div className="text-center group">
                  <div className="w-20 h-20 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-200 transition-all duration-300 group-hover:scale-110">
                    <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-slate-900 mb-4">{t.projectCosts.ai.title}</h4>
                  <p className="text-slate-600 mb-4">{t.projectCosts.ai.description}</p>
                  <div className="text-2xl font-bold text-purple-600">{t.projectCosts.ai.cost}</div>
                </div>

                {/* Development */}
                <div className="text-center group">
                  <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-all duration-300 group-hover:scale-110">
                    <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-slate-900 mb-4">{t.projectCosts.development.title}</h4>
                  <p className="text-slate-600 mb-4">{t.projectCosts.development.description}</p>
                  <div className="text-2xl font-bold text-green-600">{t.projectCosts.development.cost}</div>
                </div>
              </div>

              {/* Total Cost */}
              <div className="bg-slate-900 rounded-2xl p-8 text-center text-white mb-8">
                <h4 className="text-2xl font-bold mb-4">{t.projectCosts.total.title}</h4>
                <div className="text-4xl font-bold text-green-400 mb-4">{t.projectCosts.total.monthly}</div>
                <p className="text-slate-300 max-w-2xl mx-auto">
                  {t.projectCosts.total.description}
                </p>
              </div>

              {/* Support CTA */}
              <div className="text-center">
                <h4 className="text-2xl font-bold text-slate-900 mb-4">{t.projectCosts.support.title}</h4>
                <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
                  {t.projectCosts.support.description}
                </p>
                <Button 
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-.635 4.123zM19.35 7.715c-.79 4.155-3.27 5.605-7.232 5.605H9.98l-.635 4.123H2.47L4.944.901h7.46c2.57 0 4.578.543 5.69 1.81.454.518.692 1.068.692 1.68 0 .612-.238 1.162-.692 1.68-.79 4.155-3.27 5.605-7.232 5.605H9.98l-.635 4.123z"/>
                  </svg>
                  {t.projectCosts.support.paypal}
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Kingdoms Table */}
        <section id="kingdoms" className="mb-20 fade-in-observer">
          <KingdomsTable kingdoms={mockKingdoms} translations={t} />
        </section>

        {/* Current Requests */}
        <section id="requests" className="mb-20 fade-in-observer">
          <div className="flex items-center justify-between mb-10 animate-fade-in-up">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">{t.requests.title}</h2>
              <p className="mt-2 text-lg text-slate-600">
                {t.requests.subtitle}
              </p>
            </div>
            <Button 
              size="lg" 
              onClick={() => setShowActiveRequestsModal(true)}
              className="hover:scale-105 transition-transform btn-focus"
            >
              {t.modals.activeRequests.title}
            </Button>
          </div>

          <div className="space-y-8">
            {localizedRequests.slice(0, 2).map((request, index) => (
              <div key={request.id} className="animate-fade-in-up" style={{animationDelay: `${index * 100}ms`}}>
                <RequestCard request={request} translations={t} />
              </div>
            ))}
          </div>

          {localizedRequests.length > 2 && (
            <div className="text-center mt-8">
              <Button 
                variant="outline"
                onClick={() => setShowActiveRequestsModal(true)}
                className="hover:scale-105 transition-transform"
              >
                {t.modals.activeRequests.viewDetails} ({localizedRequests.length - 2} {language === 'it' ? 'altre' : 'more'})
              </Button>
            </div>
          )}
        </section>

        {/* Assembly Principles */}
        <section className="mb-20 fade-in-observer">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50 hover:shadow-xl transition-shadow duration-300 card-focus" tabIndex={0}>
            <CardContent className="pt-12 pb-12">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-gray-900 mb-6">{t.principles.title}</h3>
                <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                  {t.principles.subtitle}
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center group">
                  <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-all duration-300 group-hover:scale-110">
                    <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">{t.principles.democratic.title}</h4>
                  <p className="text-gray-600">
                    {t.principles.democratic.description}
                  </p>
                </div>
                <div className="text-center group">
                  <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-all duration-300 group-hover:scale-110">
                    <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">{t.principles.technical.title}</h4>
                  <p className="text-gray-600">
                    {t.principles.technical.description}
                  </p>
                </div>
                <div className="text-center group">
                  <div className="w-20 h-20 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-200 transition-all duration-300 group-hover:scale-110">
                    <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">{t.principles.professional.title}</h4>
                  <p className="text-gray-600">
                    {t.principles.professional.description}
                  </p>
                </div>
                <div className="text-center group">
                  <div className="w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-200 transition-all duration-300 group-hover:scale-110">
                    <svg className="w-10 h-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">{t.principles.aiPowered.title}</h4>
                  <p className="text-gray-600">
                    {t.principles.aiPowered.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <p className="text-lg text-gray-600 mb-4">
              {t.footer.description}
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
              <span className="hover:text-blue-600 transition-colors">{t.hero.democraticProcess}</span>
              <span className="text-gray-300">•</span>
              <span className="hover:text-green-600 transition-colors">{t.hero.technicalValidation}</span>
              <span className="text-gray-300">•</span>
              <span className="hover:text-purple-600 transition-colors">{t.hero.professionalCommunication}</span>
              <span className="text-gray-300">•</span>
              <span className="hover:text-orange-600 transition-colors">{t.hero.aiAggregation}</span>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Representative Application Form Modal */}
      {showRepresentativeForm && (
        <RepresentativeApplicationForm
          translations={t}
          onClose={() => setShowRepresentativeForm(false)}
        />
      )}

      {/* Active Requests Modal */}
      {showActiveRequestsModal && (
        <ActiveRequestsModal
          requests={localizedRequests}
          translations={t}
          onClose={() => setShowActiveRequestsModal(false)}
        />
      )}
    </div>
  )
}