'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/layout/Header'
import { RequestCard } from '@/components/requests/RequestCard'

interface CommunityRequest {
  id: string
  title: string
  description: string
  category: 'gameplay' | 'economy' | 'social' | 'technical'
  priority: 'critical' | 'high' | 'medium' | 'low'
  status: 'draft' | 'review' | 'submitted' | 'acknowledged'
  submittedBy: string
  submittedDate: string
  technicalDetails?: string
  expectedOutcome: string
}

const communityRequests: CommunityRequest[] = [
  {
    id: '1',
    title: 'Standardizzazione Sistema di Attivazione Skill delle Guardie',
    description: 'L\'attuale sistema RNG per l\'attivazione delle skill crea risultati di battaglia imprevedibili che minano il gameplay strategico. Richiesta di standardizzazione dei tassi di attivazione o implementazione di sistema a rotazione.',
    category: 'gameplay',
    priority: 'critical',
    status: 'review',
    submittedBy: 'Coalizione Rappresentanti dei Regni',
    submittedDate: '15/01/2024',
    technicalDetails: 'Implementare attivazione skill deterministica basata su ordine di turno o sistema di cooldown invece di puro RNG',
    expectedOutcome: 'Risultati di battaglia consistenti che premiano la pianificazione strategica invece del caso'
  },
  {
    id: '2',
    title: 'Sistema di Mitigazione Disturbi del Regno',
    description: 'Implementazione di misure di responsabilizzazione per giocatori che sistematicamente disturbano l\'armonia del regno causando abbandoni.',
    category: 'social',
    priority: 'high',
    status: 'draft',
    submittedBy: 'Alleanza Multi-Regno',
    submittedDate: '12/01/2024',
    technicalDetails: 'Introdurre sistema di reputazione con restrizioni temporanee per comportamenti disturbanti verificati',
    expectedOutcome: 'Riduzione del turnover dei regni e miglioramento della retention dei giocatori'
  },
  {
    id: '3',
    title: 'Riequilibrio Economia delle Risorse',
    description: 'Gli attuali costi delle risorse per le funzionalità avanzate creano barriere di accessibilità. Richiesta di struttura di costi graduata che mantenga la progressione migliorando l\'accessibilità.',
    category: 'economy',
    priority: 'high',
    status: 'draft',
    submittedBy: 'Comitato Consultivo Economico',
    submittedDate: '10/01/2024',
    technicalDetails: 'Implementare modello di pricing a livelli con percorsi di risorse alternative per l\'attivazione delle skill',
    expectedOutcome: 'Migliorata accessibilità delle funzionalità senza compromettere l\'equilibrio del gioco'
  }
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-white py-16 relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23374151' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <div className="animate-fade-in-up">
              <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
                GoG Player Assembly
              </h1>
              <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
                Piattaforma strutturata per il feedback della community che trasforma le preoccupazioni 
                dei giocatori in richieste tecnicamente valide e attuabili per gli sviluppatori.
              </p>
            </div>
            <div className="mt-10 flex items-center justify-center space-x-12 text-sm text-gray-500 animate-fade-in-up animation-delay-200">
              <div className="flex items-center space-x-2 hover:text-blue-600 transition-colors">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span>Processo Democratico</span>
              </div>
              <div className="flex items-center space-x-2 hover:text-green-600 transition-colors">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse animation-delay-100"></div>
                <span>Validazione Tecnica</span>
              </div>
              <div className="flex items-center space-x-2 hover:text-purple-600 transition-colors">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse animation-delay-200"></div>
                <span>Comunicazione Professionale</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Process Overview */}
        <section id="process" className="mb-20">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl font-bold text-gray-900">Processo Assembly</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Un approccio strutturato per raccogliere, validare e articolare il feedback della community 
              in richieste professionali di sviluppo.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center group animate-fade-in-up animation-delay-100">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-all duration-300 group-hover:scale-110">
                <span className="text-blue-600 font-bold text-xl">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Raccolta</h3>
              <p className="text-gray-600">
                I rappresentanti dei regni raccolgono preoccupazioni e proposte della community attraverso canali strutturati.
              </p>
            </div>

            <div className="text-center group animate-fade-in-up animation-delay-200">
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-all duration-300 group-hover:scale-110">
                <span className="text-green-600 font-bold text-xl">2</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Analisi</h3>
              <p className="text-gray-600">
                Revisione tecnica e consolidamento di richieste simili con valutazione dell&apos;impatto.
              </p>
            </div>

            <div className="text-center group animate-fade-in-up animation-delay-300">
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-200 transition-all duration-300 group-hover:scale-110">
                <span className="text-purple-600 font-bold text-xl">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Articolazione</h3>
              <p className="text-gray-600">
                Formulazione di richieste chiare e tecnicamente valide con risultati attesi.
              </p>
            </div>

            <div className="text-center group animate-fade-in-up animation-delay-400">
              <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-200 transition-all duration-300 group-hover:scale-110">
                <span className="text-orange-600 font-bold text-xl">4</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Sottomissione</h3>
              <p className="text-gray-600">
                Presentazione professionale al team di sviluppo con documentazione di supporto.
              </p>
            </div>
          </div>
        </section>

        {/* Current Requests */}
        <section id="requests" className="mb-20">
          <div className="flex items-center justify-between mb-10 animate-fade-in-up">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Richieste Attuali</h2>
              <p className="mt-2 text-lg text-gray-600">
                Richieste guidate dalla community attualmente in varie fasi del processo assembly.
              </p>
            </div>
            <Button size="lg" className="hover:scale-105 transition-transform">
              Invia Nuova Richiesta
            </Button>
          </div>

          <div className="space-y-8">
            {communityRequests.map((request, index) => (
              <div key={request.id} className="animate-fade-in-up" style={{animationDelay: `${index * 100}ms`}}>
                <RequestCard request={request} />
              </div>
            ))}
          </div>
        </section>

        {/* Assembly Principles */}
        <section className="mb-20 animate-fade-in-up">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50 hover:shadow-xl transition-shadow duration-300">
            <CardContent className="pt-12 pb-12">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-gray-900 mb-6">Principi Assembly</h3>
                <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                  Il nostro approccio strutturato garantisce che ogni preoccupazione della community sia 
                  adeguatamente valutata, tecnicamente validata e comunicata professionalmente ai team di sviluppo.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-12">
                <div className="text-center group">
                  <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-all duration-300 group-hover:scale-110">
                    <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">Rappresentanza Democratica</h4>
                  <p className="text-gray-600">
                    Ogni regno elegge rappresentanti che raccolgono e prioritizzano le preoccupazioni della community 
                    attraverso processi democratici stabiliti.
                  </p>
                </div>
                <div className="text-center group">
                  <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-all duration-300 group-hover:scale-110">
                    <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">Validazione Tecnica</h4>
                  <p className="text-gray-600">
                    Tutte le richieste subiscono una revisione tecnica per garantire la fattibilità e fornire 
                    percorsi di implementazione chiari per gli sviluppatori.
                  </p>
                </div>
                <div className="text-center group">
                  <div className="w-20 h-20 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-200 transition-all duration-300 group-hover:scale-110">
                    <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">Comunicazione Professionale</h4>
                  <p className="text-gray-600">
                    Le richieste sono articolate in linguaggio professionale con obiettivi chiari, 
                    specifiche tecniche e risultati attesi.
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
              GoG Player Assembly - Trasformare il feedback della community in richieste di sviluppo attuabili
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
              <span className="hover:text-blue-600 transition-colors">Processo Democratico</span>
              <span className="text-gray-300">•</span>
              <span className="hover:text-green-600 transition-colors">Validazione Tecnica</span>
              <span className="text-gray-300">•</span>
              <span className="hover:text-purple-600 transition-colors">Comunicazione Professionale</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}