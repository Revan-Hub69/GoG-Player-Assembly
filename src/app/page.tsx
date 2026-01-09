'use client'

import { useState, useEffect, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface Proposal {
  id: string
  title: string
  description: string
  category: string
  averageImpact: number
  totalVotes: number
  color: string
  icon: string
}

interface Vote {
  proposalId: string
  kingdom: string
  impactScore: number
  timestamp: number
}

const proposals: Proposal[] = [
  {
    id: '1',
    title: 'Riforma del Sistema di Attivazione delle Skill delle Guardie',
    description: 'Il gioco è diventato troppo casuale. Si può perdere al 30% e vincere al 30% con le stesse formazioni consecutive. La casualità ha troppa importanza ora, denaturando la strategia e la bravura dei giocatori.',
    category: 'Gameplay',
    averageImpact: 0,
    totalVotes: 0,
    color: 'from-red-500 to-pink-600',
    icon: '⚔️'
  },
  {
    id: '2', 
    title: 'Nuovo Titolo "Nemico del Regno" per Rouge Players',
    description: 'Capitano spesso giocatori soli che rovinano i regni facendo smettere altri giocatori. Proposta: un nuovo titolo per le prigioni "Nemico del Regno" - un giocatore con questo titolo non può mettere scudo né teletrasportarsi per tutto il tempo in cui ha il titolo.',
    category: 'Social',
    averageImpact: 0,
    totalVotes: 0,
    color: 'from-purple-500 to-indigo-600',
    icon: '👑'
  },
  {
    id: '3',
    title: 'Riequilibrio Costi Pellicano e Skill', 
    description: 'Molti giocatori hanno speso tantissimi materiali e tempo, ma ora l&apos;aumento del costo in biscotti non fa quasi più sfruttare le skill costosissime implementate. Proposta: dimezzare il costo dei biscotti e dimezzare le truppe che si possono prendere.',
    category: 'Economy',
    averageImpact: 0,
    totalVotes: 0,
    color: 'from-emerald-500 to-teal-600',
    icon: '💰'
  }
]

export default function Home() {
  // Inizializza votes direttamente dal localStorage usando lazy initializer
  const [votes, setVotes] = useState<Vote[]>(() => {
    if (typeof window !== 'undefined') {
      const savedVotes = localStorage.getItem('gog-premium-votes')
      if (savedVotes) {
        try {
          return JSON.parse(savedVotes)
        } catch (error) {
          console.error('Error parsing saved votes:', error)
        }
      }
    }
    return []
  })
  
  const [votingData, setVotingData] = useState<{[key: string]: {kingdom: string, score: string}}>({})
  const [isLoading, setIsLoading] = useState(true)
  const [hoveredProposal, setHoveredProposal] = useState<string | null>(null)

  // Calcola le statistiche usando useMemo invece di useEffect
  const proposalStats = useMemo(() => {
    return proposals.map(proposal => {
      const proposalVotes = votes.filter(vote => vote.proposalId === proposal.id)
      const totalVotes = proposalVotes.length
      const averageImpact = totalVotes > 0 
        ? proposalVotes.reduce((sum, vote) => sum + vote.impactScore, 0) / totalVotes
        : 0
      
      return {
        ...proposal,
        averageImpact: Math.round(averageImpact * 10) / 10,
        totalVotes
      }
    })
  }, [votes]) // Si ricalcola solo quando votes cambia

  // Solo per il loading timer (nessun setState di dati)
  useEffect(() => {
    // Simula loading per effetto premium
    const loadingTimer = setTimeout(() => setIsLoading(false), 1500)
    
    // Cleanup
    return () => clearTimeout(loadingTimer)
  }, []) // Esegue solo al mount

  const handleVote = (proposalId: string) => {
    const data = votingData[proposalId]
    if (!data || !data.kingdom || !data.score) {
      return
    }

    const score = parseInt(data.score)
    if (score < 1 || score > 10) {
      return
    }

    const newVote: Vote = {
      proposalId,
      kingdom: data.kingdom,
      impactScore: score,
      timestamp: Date.now()
    }

    const updatedVotes = [...votes, newVote]
    setVotes(updatedVotes)
    localStorage.setItem('gog-premium-votes', JSON.stringify(updatedVotes))
    // Rimossa updateProposalStats - ora usa useMemo automaticamente

    // Reset form con animazione
    setVotingData(prev => ({
      ...prev,
      [proposalId]: { kingdom: '', score: '' }
    }))
  }

  const updateVotingData = (proposalId: string, field: 'kingdom' | 'score', value: string) => {
    setVotingData(prev => ({
      ...prev,
      [proposalId]: {
        ...prev[proposalId],
        [field]: value
      }
    }))
  }

  const overallAverage = proposalStats.length > 0 
    ? proposalStats.reduce((sum, p) => sum + (p.averageImpact * p.totalVotes), 0) / 
      proposalStats.reduce((sum, p) => sum + p.totalVotes, 0)
    : 0

  const totalVotes = proposalStats.reduce((sum, p) => sum + p.totalVotes, 0)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-32 h-32 border-4 border-purple-500/30 rounded-full animate-spin border-t-purple-500"></div>
            <div className="absolute inset-0 w-32 h-32 border-4 border-pink-500/30 rounded-full animate-spin border-t-pink-500 animate-reverse" style={{animationDelay: '0.5s'}}></div>
          </div>
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">GoG Player Assembly</h2>
          <p className="text-purple-300 animate-pulse">Caricamento esperienza premium...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/20"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      {/* Floating Orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>

      {/* Header */}
      <div className="relative z-10 backdrop-blur-xl bg-white/5 border-b border-white/10">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-6 shadow-2xl shadow-purple-500/25">
              <span className="text-3xl">⚡</span>
            </div>
            <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-pink-200 mb-6 leading-tight">
              GoG Player Assembly
            </h1>
            <p className="text-xl text-purple-200 max-w-4xl mx-auto leading-relaxed">
              La piattaforma premium per il feedback della community. Vota anonimamente su quanto ogni proposta 
              impatta la tua voglia di investire nel gioco.
            </p>
            <div className="flex items-center justify-center space-x-8 mt-8 text-sm text-purple-300">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                Completamente Anonimo
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></div>
                Real-time Analytics
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse"></div>
                Premium Experience
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Dashboard Premium */}
        <div className="mb-12">
          <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl shadow-purple-500/10">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl font-bold text-white mb-4">
                🎯 Indice Generale di Impatto
              </CardTitle>
              <CardDescription className="text-purple-200 text-lg">
                Sentiment della community sulla voglia di investire
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="relative inline-block">
                <div className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 mb-6">
                  {totalVotes > 0 ? overallAverage.toFixed(1) : '0.0'}
                </div>
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl"></div>
              </div>
              
              <div className="text-lg text-purple-200 mb-8">
                su 10 • {totalVotes} voti dalla community
              </div>
              
              {/* Premium Progress Bar */}
              <div className="relative w-full max-w-2xl mx-auto">
                <div className="h-6 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                  <div 
                    className="h-full bg-gradient-to-r from-green-400 via-yellow-400 via-orange-400 to-red-500 rounded-full transition-all duration-1000 ease-out shadow-lg"
                    style={{ width: `${totalVotes > 0 ? (overallAverage / 10) * 100 : 0}%` }}
                  >
                    <div className="h-full bg-white/20 animate-pulse"></div>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-purple-300 mt-3">
                  <span>💚 Nessun Impatto</span>
                  <span>⚠️ Impatto Moderato</span>
                  <span>🔥 Smetterei di Investire</span>
                </div>
              </div>

              {/* Live Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12">
                <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10">
                  <div className="text-3xl font-bold text-green-400">{proposalStats.filter(p => p.averageImpact < 4).length}</div>
                  <div className="text-green-300 text-sm">Basso Impatto</div>
                </div>
                <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10">
                  <div className="text-3xl font-bold text-yellow-400">{proposalStats.filter(p => p.averageImpact >= 4 && p.averageImpact < 7).length}</div>
                  <div className="text-yellow-300 text-sm">Medio Impatto</div>
                </div>
                <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10">
                  <div className="text-3xl font-bold text-red-400">{proposalStats.filter(p => p.averageImpact >= 7).length}</div>
                  <div className="text-red-300 text-sm">Alto Impatto</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Premium Proposals */}
        <div className="space-y-8">
          {proposalStats.map((proposal) => (
            <Card 
              key={proposal.id} 
              className={`backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-purple-500/20 ${
                hoveredProposal === proposal.id ? 'ring-2 ring-purple-400/50' : ''
              }`}
              onMouseEnter={() => setHoveredProposal(proposal.id)}
              onMouseLeave={() => setHoveredProposal(null)}
            >
              <CardHeader className="relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-r ${proposal.color} opacity-10`}></div>
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className={`w-16 h-16 bg-gradient-to-br ${proposal.color} rounded-2xl flex items-center justify-center text-2xl shadow-lg`}>
                          {proposal.icon}
                        </div>
                        <div>
                          <span className={`px-4 py-2 bg-gradient-to-r ${proposal.color} text-white rounded-full text-sm font-bold shadow-lg`}>
                            {proposal.category}
                          </span>
                          <div className="flex items-center mt-2 text-purple-300">
                            <span className="text-lg font-bold text-white">
                              {proposal.averageImpact}/10
                            </span>
                            <span className="ml-2 text-sm">
                              ({proposal.totalVotes} voti)
                            </span>
                          </div>
                        </div>
                      </div>
                      <CardTitle className="text-2xl font-bold text-white mb-4 leading-tight">
                        {proposal.title}
                      </CardTitle>
                      <CardDescription className="text-purple-200 text-base leading-relaxed">
                        {proposal.description}
                      </CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="relative">
                {/* Impact Visualization */}
                <div className="mb-8 p-6 backdrop-blur-sm bg-white/5 rounded-2xl border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-bold text-white text-lg">Impatto sulla Voglia di Investire</span>
                    <div className="flex items-center space-x-2">
                      <div className={`text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r ${proposal.color}`}>
                        {proposal.averageImpact}/10
                      </div>
                      {proposal.averageImpact >= 7 && <span className="text-red-400">🔥</span>}
                      {proposal.averageImpact >= 4 && proposal.averageImpact < 7 && <span className="text-yellow-400">⚠️</span>}
                      {proposal.averageImpact < 4 && <span className="text-green-400">💚</span>}
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="h-4 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${proposal.color} rounded-full transition-all duration-1000 ease-out shadow-lg`}
                        style={{ width: `${(proposal.averageImpact / 10) * 100}%` }}
                      >
                        <div className="h-full bg-white/30 animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-sm text-purple-300 mt-2">
                    {proposal.totalVotes > 0 
                      ? `Basato su ${proposal.totalVotes} voti della community`
                      : 'Sii il primo a votare questa proposta'
                    }
                  </div>
                </div>

                {/* Premium Voting Form */}
                <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10">
                  <h4 className="font-bold text-white mb-6 text-lg">🗳️ Vota Anonimamente</h4>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-purple-200 mb-3">
                        Regno di Rappresentanza
                      </label>
                      <Input
                        placeholder="es. Regno 123"
                        value={votingData[proposal.id]?.kingdom || ''}
                        onChange={(e) => updateVotingData(proposal.id, 'kingdom', e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder-purple-300 backdrop-blur-sm focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-purple-200 mb-3">
                        Impatto (1-10)
                      </label>
                      <Input
                        type="number"
                        min="1"
                        max="10"
                        placeholder="1-10"
                        value={votingData[proposal.id]?.score || ''}
                        onChange={(e) => updateVotingData(proposal.id, 'score', e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder-purple-300 backdrop-blur-sm focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                      />
                      <div className="text-xs text-purple-300 mt-2">
                        1 = Nessun impatto • 10 = Smetterei di investire
                      </div>
                    </div>
                    <div className="flex items-end">
                      <Button 
                        onClick={() => handleVote(proposal.id)}
                        className={`w-full bg-gradient-to-r ${proposal.color} hover:scale-105 transition-all duration-300 shadow-lg font-bold text-white border-0`}
                        disabled={!votingData[proposal.id]?.kingdom || !votingData[proposal.id]?.score}
                      >
                        ✨ Vota Ora
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Premium Footer */}
        <Card className="mt-12 backdrop-blur-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-white/20 shadow-2xl">
          <CardContent className="pt-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="font-bold text-white text-xl mb-4">Esperienza Premium</h3>
              <p className="text-purple-200 max-w-2xl mx-auto leading-relaxed">
                Ogni voto è completamente anonimo e sicuro. I dati vengono salvati localmente nel tuo browser. 
                L&apos;indice generale riflette il sentiment della community sulla voglia di continuare a investire nel gioco.
              </p>
              <div className="flex items-center justify-center space-x-8 mt-8 text-sm">
                <div className="flex items-center text-green-300">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                  100% Anonimo
                </div>
                <div className="flex items-center text-blue-300">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></div>
                  Dati Locali
                </div>
                <div className="flex items-center text-purple-300">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse"></div>
                  Real-time
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}