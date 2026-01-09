'use client'

import { useState, useMemo } from 'react'
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
  priority: 'high' | 'medium' | 'low'
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
    priority: 'high'
  },
  {
    id: '2', 
    title: 'Nuovo Titolo "Nemico del Regno" per Rouge Players',
    description: 'Capitano spesso giocatori soli che rovinano i regni facendo smettere altri giocatori. Proposta: un nuovo titolo per le prigioni "Nemico del Regno" - un giocatore con questo titolo non può mettere scudo né teletrasportarsi per tutto il tempo in cui ha il titolo.',
    category: 'Social',
    averageImpact: 0,
    totalVotes: 0,
    priority: 'medium'
  },
  {
    id: '3',
    title: 'Riequilibrio Costi Pellicano e Skill', 
    description: 'Molti giocatori hanno speso tantissimi materiali e tempo, ma ora l&apos;aumento del costo in biscotti non fa quasi più sfruttare le skill costosissime implementate. Proposta: dimezzare il costo dei biscotti e dimezzare le truppe che si possono prendere.',
    category: 'Economy',
    averageImpact: 0,
    totalVotes: 0,
    priority: 'medium'
  }
]

export default function Home() {
  // Inizializza votes direttamente dal localStorage usando lazy initializer
  const [votes, setVotes] = useState<Vote[]>(() => {
    if (typeof window !== 'undefined') {
      const savedVotes = localStorage.getItem('gog-votes')
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

  // Calcola le statistiche usando useMemo
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
  }, [votes])

  const handleVote = (proposalId: string) => {
    const data = votingData[proposalId]
    if (!data || !data.kingdom || !data.score) return

    const score = parseInt(data.score)
    if (score < 1 || score > 10) return

    const newVote: Vote = {
      proposalId,
      kingdom: data.kingdom,
      impactScore: score,
      timestamp: Date.now()
    }

    const updatedVotes = [...votes, newVote]
    setVotes(updatedVotes)
    localStorage.setItem('gog-votes', JSON.stringify(updatedVotes))

    // Reset form
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

  const getPriorityColor = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low': return 'bg-green-100 text-green-800 border-green-200'
    }
  }

  const getImpactColor = (impact: number) => {
    if (impact >= 7) return 'text-red-600 bg-red-50'
    if (impact >= 4) return 'text-yellow-600 bg-yellow-50'
    return 'text-green-600 bg-green-50'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              GoG Player Assembly
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Piattaforma per raccogliere feedback della community su Guns of Glory. 
              Vota quanto ogni proposta impatta la tua esperienza di gioco.
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Dashboard */}
        <Card className="mb-8 border-0 shadow-sm">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
              Indice Generale di Impatto
            </CardTitle>
            <CardDescription className="text-gray-600">
              Sentiment della community sulla voglia di investire nel gioco
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="mb-6">
              <div className="text-6xl font-bold text-gray-900 mb-2">
                {totalVotes > 0 ? overallAverage.toFixed(1) : '0.0'}
              </div>
              <div className="text-gray-500">
                su 10 • {totalVotes} voti totali
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full max-w-md mx-auto mb-6">
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 transition-all duration-500"
                  style={{ width: `${totalVotes > 0 ? (overallAverage / 10) * 100 : 0}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>Nessun impatto</span>
                <span>Impatto moderato</span>
                <span>Alto impatto</span>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <div className="text-2xl font-bold text-green-600">
                  {proposalStats.filter(p => p.averageImpact < 4).length}
                </div>
                <div className="text-green-700 text-sm">Basso Impatto</div>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                <div className="text-2xl font-bold text-yellow-600">
                  {proposalStats.filter(p => p.averageImpact >= 4 && p.averageImpact < 7).length}
                </div>
                <div className="text-yellow-700 text-sm">Medio Impatto</div>
              </div>
              <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                <div className="text-2xl font-bold text-red-600">
                  {proposalStats.filter(p => p.averageImpact >= 7).length}
                </div>
                <div className="text-red-700 text-sm">Alto Impatto</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Proposals */}
        <div className="space-y-6">
          {proposalStats
            .sort((a, b) => {
              // Ordina per priorità, poi per voti
              const priorityOrder = { high: 3, medium: 2, low: 1 }
              if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
                return priorityOrder[b.priority] - priorityOrder[a.priority]
              }
              return b.totalVotes - a.totalVotes
            })
            .map((proposal) => (
            <Card key={proposal.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(proposal.priority)}`}>
                        {proposal.category}
                      </span>
                      {proposal.totalVotes > 0 && (
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getImpactColor(proposal.averageImpact)}`}>
                          {proposal.averageImpact}/10 ({proposal.totalVotes} voti)
                        </div>
                      )}
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 mb-2 leading-tight">
                      {proposal.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 leading-relaxed">
                      {proposal.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                {/* Impact Visualization */}
                {proposal.totalVotes > 0 && (
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium text-gray-900">Impatto sulla Voglia di Investire</span>
                      <span className="text-2xl font-bold text-gray-900">
                        {proposal.averageImpact}/10
                      </span>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div 
                        className="h-2 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-full transition-all duration-500"
                        style={{ width: `${(proposal.averageImpact / 10) * 100}%` }}
                      />
                    </div>
                    
                    <div className="text-sm text-gray-500">
                      Basato su {proposal.totalVotes} voti della community
                    </div>
                  </div>
                )}

                {/* Voting Form */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-4">Vota questa proposta</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Regno
                      </label>
                      <Input
                        placeholder="es. Regno 123"
                        value={votingData[proposal.id]?.kingdom || ''}
                        onChange={(e) => updateVotingData(proposal.id, 'kingdom', e.target.value)}
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Impatto (1-10)
                      </label>
                      <Input
                        type="number"
                        min="1"
                        max="10"
                        placeholder="1-10"
                        value={votingData[proposal.id]?.score || ''}
                        onChange={(e) => updateVotingData(proposal.id, 'score', e.target.value)}
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                      <div className="text-xs text-gray-500 mt-1">
                        1 = Nessun impatto • 10 = Smetterei di investire
                      </div>
                    </div>
                    <div className="flex items-end">
                      <Button 
                        onClick={() => handleVote(proposal.id)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium"
                        disabled={!votingData[proposal.id]?.kingdom || !votingData[proposal.id]?.score}
                      >
                        Vota
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer */}
        <Card className="mt-8 border-0 shadow-sm bg-blue-50">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="font-bold text-gray-900 text-lg mb-2">Informazioni</h3>
              <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed mb-4">
                Ogni voto è completamente anonimo e sicuro. I dati vengono salvati localmente nel tuo browser. 
                L&apos;indice generale riflette il sentiment della community sulla voglia di continuare a investire nel gioco.
              </p>
              <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  100% Anonimo
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  Dati Locali
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                  Open Source
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}