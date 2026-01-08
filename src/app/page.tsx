'use client'

import { useState, useEffect } from 'react'
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
}

interface Vote {
  proposalId: string
  kingdom: string
  impactScore: number
}

const proposals: Proposal[] = [
  {
    id: '1',
    title: 'Riforma del Sistema di Attivazione delle Skill delle Guardie',
    description: 'Il gioco è diventato troppo casuale. Si può perdere al 30% e vincere al 30% con le stesse formazioni consecutive. La casualità ha troppa importanza ora, denaturando la strategia e la bravura dei giocatori.',
    category: 'Gameplay',
    averageImpact: 0,
    totalVotes: 0
  },
  {
    id: '2', 
    title: 'Nuovo Titolo "Nemico del Regno" per Rouge Players',
    description: 'Capitano spesso giocatori soli che rovinano i regni facendo smettere altri giocatori. Proposta: un nuovo titolo per le prigioni "Nemico del Regno" - un giocatore con questo titolo non può mettere scudo né teletrasportarsi per tutto il tempo in cui ha il titolo.',
    category: 'Social',
    averageImpact: 0,
    totalVotes: 0
  },
  {
    id: '3',
    title: 'Riequilibrio Costi Pellicano e Skill', 
    description: 'Molti giocatori hanno speso tantissimi materiali e tempo, ma ora l&apos;aumento del costo in biscotti non fa quasi più sfruttare le skill costosissime implementate. Proposta: dimezzare il costo dei biscotti e dimezzare le truppe che si possono prendere.',
    category: 'Economy',
    averageImpact: 0,
    totalVotes: 0
  }
]

export default function Home() {
  const [votes, setVotes] = useState<Vote[]>([])
  const [proposalStats, setProposalStats] = useState<Proposal[]>(proposals)
  const [votingData, setVotingData] = useState<{[key: string]: {kingdom: string, score: string}}>({})

  // Carica i voti dal localStorage
  useEffect(() => {
    const savedVotes = localStorage.getItem('gog-votes')
    if (savedVotes) {
      const parsedVotes = JSON.parse(savedVotes)
      setVotes(parsedVotes)
      updateProposalStats(parsedVotes)
    }
  }, [])

  const updateProposalStats = (allVotes: Vote[]) => {
    const updatedProposals = proposals.map(proposal => {
      const proposalVotes = allVotes.filter(vote => vote.proposalId === proposal.id)
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
    setProposalStats(updatedProposals)
  }

  const handleVote = (proposalId: string) => {
    const data = votingData[proposalId]
    if (!data || !data.kingdom || !data.score) {
      alert('Inserisci regno e voto per continuare')
      return
    }

    const score = parseInt(data.score)
    if (score < 1 || score > 10) {
      alert('Il voto deve essere tra 1 e 10')
      return
    }

    const newVote: Vote = {
      proposalId,
      kingdom: data.kingdom,
      impactScore: score
    }

    const updatedVotes = [...votes, newVote]
    setVotes(updatedVotes)
    localStorage.setItem('gog-votes', JSON.stringify(updatedVotes))
    updateProposalStats(updatedVotes)

    // Reset form
    setVotingData(prev => ({
      ...prev,
      [proposalId]: { kingdom: '', score: '' }
    }))

    alert('Voto registrato! Grazie per il feedback.')
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Guns of Glory - Feedback Community
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Vota anonimamente su quanto ogni proposta ti fa venir voglia di smettere di spendere nel gioco.
              Scala da 1 (nessun impatto) a 10 (smetterei completamente di spendere).
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Indice Generale */}
        <Card className="mb-8 border-2 border-orange-200">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-orange-600">
              Indice Generale di Impatto sulla Spesa
            </CardTitle>
            <CardDescription>
              Media ponderata di tutte le proposte
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-6xl font-bold text-orange-600 mb-4">
              {totalVotes > 0 ? overallAverage.toFixed(1) : '0.0'}
            </div>
            <div className="text-lg text-gray-600 mb-4">
              su 10 (basato su {totalVotes} voti totali)
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className="bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 h-4 rounded-full transition-all duration-500"
                style={{ width: `${totalVotes > 0 ? (overallAverage / 10) * 100 : 0}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>Nessun Impatto</span>
              <span>Impatto Moderato</span>
              <span>Smetterei di Spendere</span>
            </div>
          </CardContent>
        </Card>

        {/* Proposte */}
        <div className="space-y-8">
          {proposalStats.map((proposal) => (
            <Card key={proposal.id} className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        {proposal.category}
                      </span>
                      <div className="flex items-center text-orange-600">
                        <span className="text-sm font-medium">
                          Impatto: {proposal.averageImpact}/10 ({proposal.totalVotes} voti)
                        </span>
                      </div>
                    </div>
                    <CardTitle className="text-2xl mb-3">{proposal.title}</CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {proposal.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                {/* Indicatore di Impatto */}
                <div className="mb-6 p-4 bg-orange-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">Impatto sulla Voglia di Spendere</span>
                    <span className="text-2xl font-bold text-orange-600">
                      {proposal.averageImpact}/10
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${(proposal.averageImpact / 10) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    {proposal.totalVotes > 0 
                      ? `Basato su ${proposal.totalVotes} voti`
                      : 'Nessun voto ancora registrato'
                    }
                  </div>
                </div>

                {/* Form di Voto */}
                <div className="border-t pt-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Vota Anonimamente</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Regno di Rappresentanza
                      </label>
                      <Input
                        placeholder="es. Regno 123"
                        value={votingData[proposal.id]?.kingdom || ''}
                        onChange={(e) => updateVotingData(proposal.id, 'kingdom', e.target.value)}
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
                      />
                      <div className="text-xs text-gray-500 mt-1">
                        1 = Nessun impatto, 10 = Smetterei di spendere
                      </div>
                    </div>
                    <div className="flex items-end">
                      <Button 
                        onClick={() => handleVote(proposal.id)}
                        className="w-full"
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

        {/* Info */}
        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="font-semibold text-blue-900 mb-2">Come Funziona</h3>
              <p className="text-blue-800 text-sm">
                Ogni voto è completamente anonimo. I dati vengono salvati solo nel tuo browser. 
                L&apos;indice generale mostra quanto la community è preoccupata per questi cambiamenti 
                e il loro impatto sulla voglia di continuare a spendere nel gioco.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}