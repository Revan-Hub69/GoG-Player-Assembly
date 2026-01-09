'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'

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
    title: 'Guard Skill Activation System Reform',
    description: 'The game has become too random. You can lose at 30% and win at 30% with the same consecutive formations. Randomness has too much importance now, undermining strategy and player skill.',
    category: 'Gameplay',
    averageImpact: 0,
    totalVotes: 0,
    priority: 'high'
  },
  {
    id: '2', 
    title: 'New "Kingdom Enemy" Title for Rogue Players',
    description: 'Solo players often ruin kingdoms by making other players quit. Proposal: a new prison title "Kingdom Enemy" - a player with this title cannot shield or teleport for the entire duration of the title.',
    category: 'Social',
    averageImpact: 0,
    totalVotes: 0,
    priority: 'medium'
  },
  {
    id: '3',
    title: 'Pelican Costs and Skills Rebalancing', 
    description: 'Many players have spent enormous amounts of materials and time, but now the increased cookie cost makes the expensive implemented skills barely usable. Proposal: halve cookie costs and halve the troops you can take.',
    category: 'Economy',
    averageImpact: 0,
    totalVotes: 0,
    priority: 'medium'
  }
]

export default function Home() {
  // Initialize votes directly from localStorage using lazy initializer
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

  // Calculate statistics using useMemo
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
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Image src="/logo.svg" alt="GoG Player Assembly" width={120} height={40} />
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 font-medium">How It Works</a>
              <a href="#proposals" className="text-gray-600 hover:text-blue-600 font-medium">Proposals</a>
              <Button variant="outline" size="sm">Join as Representative</Button>
            </nav>
          </div>
          
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Transforming Community Feedback into Real Dialogue
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
              GoG Player Assembly is not a protest platform. It&apos;s a tool to transform community feedback into meaningful dialogue with developers.
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <Image src="/icons/shield.svg" alt="" width={16} height={16} className="text-blue-500" />
                <span>Democratic</span>
              </div>
              <div className="flex items-center space-x-2">
                <Image src="/icons/users.svg" alt="" width={16} height={16} className="text-green-500" />
                <span>One Voice per Kingdom</span>
              </div>
              <div className="flex items-center space-x-2">
                <Image src="/icons/message.svg" alt="" width={16} height={16} className="text-purple-500" />
                <span>Constructive Dialogue</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* How It Works Section */}
        <section id="how-it-works" className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A structured, democratic process that transforms chaotic feedback into clear, actionable proposals.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-sm">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Image src="/icons/users.svg" alt="" width={24} height={24} className="text-blue-600" />
                </div>
                <CardTitle className="text-xl">1. Kingdom Representatives</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Each kingdom elects one representative who collects real problems, shared proposals, and perceived impact on gameplay and investment willingness.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Image src="/icons/message.svg" alt="" width={24} height={24} className="text-green-600" />
                </div>
                <CardTitle className="text-xl">2. AI-Assisted Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  AI translates feedback, eliminates duplicates, groups similar themes, and highlights recurring patterns. It organizes and clarifies, but doesn&apos;t decide.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Image src="/icons/vote.svg" alt="" width={24} height={24} className="text-purple-600" />
                </div>
                <CardTitle className="text-xl">3. Monthly Open Letter</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Representatives validate the synthesis and create a clear, concrete proposal sent monthly to developers with respectful, constructive, professional language.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Impact Dashboard */}
        <Card className="mb-12 border-0 shadow-sm">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
              Community Impact Index
            </CardTitle>
            <CardDescription className="text-gray-600">
              Community sentiment on willingness to invest in the game
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="mb-6">
              <div className="text-6xl font-bold text-gray-900 mb-2">
                {totalVotes > 0 ? overallAverage.toFixed(1) : '0.0'}
              </div>
              <div className="text-gray-500">
                out of 10 • {totalVotes} total votes
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
                <span>No impact</span>
                <span>Moderate impact</span>
                <span>High impact</span>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <div className="text-2xl font-bold text-green-600">
                  {proposalStats.filter(p => p.averageImpact < 4).length}
                </div>
                <div className="text-green-700 text-sm">Low Impact</div>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                <div className="text-2xl font-bold text-yellow-600">
                  {proposalStats.filter(p => p.averageImpact >= 4 && p.averageImpact < 7).length}
                </div>
                <div className="text-yellow-700 text-sm">Medium Impact</div>
              </div>
              <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                <div className="text-2xl font-bold text-red-600">
                  {proposalStats.filter(p => p.averageImpact >= 7).length}
                </div>
                <div className="text-red-700 text-sm">High Impact</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Proposals Section */}
        <section id="proposals">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Current Proposals</h2>
            <p className="text-gray-600">
              Vote on how much each proposal impacts your gaming experience and investment willingness.
            </p>
          </div>

          <div className="space-y-6">
            {proposalStats
              .sort((a, b) => {
                // Sort by priority, then by votes
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
                            {proposal.averageImpact}/10 ({proposal.totalVotes} votes)
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
                        <span className="font-medium text-gray-900">Impact on Investment Willingness</span>
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
                        Based on {proposal.totalVotes} community votes
                      </div>
                    </div>
                  )}

                  {/* Voting Form */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-4">Vote on this proposal</h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Kingdom
                        </label>
                        <Input
                          placeholder="e.g. Kingdom 123"
                          value={votingData[proposal.id]?.kingdom || ''}
                          onChange={(e) => updateVotingData(proposal.id, 'kingdom', e.target.value)}
                          className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Impact (1-10)
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
                          1 = No impact • 10 = Would stop investing
                        </div>
                      </div>
                      <div className="flex items-end">
                        <Button 
                          onClick={() => handleVote(proposal.id)}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium"
                          disabled={!votingData[proposal.id]?.kingdom || !votingData[proposal.id]?.score}
                        >
                          Vote
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Why It Works Section */}
        <section className="mt-16 mb-12">
          <Card className="border-0 shadow-sm bg-blue-50">
            <CardContent className="pt-8">
              <div className="text-center mb-8">
                <h3 className="font-bold text-gray-900 text-2xl mb-4">Why Developers Will Listen</h3>
                <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
                  This system eliminates noise and creates structured, actionable feedback that&apos;s impossible to ignore.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">❌ What We Eliminate</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Social media flames and toxicity</li>
                    <li>• Useless petitions and protests</li>
                    <li>• Chaotic, unstructured feedback</li>
                    <li>• Duplicate complaints and noise</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">✅ What We Provide</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Single, unified community voice</li>
                    <li>• Organized, prioritized data</li>
                    <li>• Clear priorities and impact metrics</li>
                    <li>• Equitable kingdom representation</li>
                  </ul>
                </div>
              </div>
              
              <div className="text-center mt-8">
                <p className="text-lg font-medium text-blue-800">
                  &ldquo;Less noise. More listening. One voice per kingdom.&rdquo;
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Footer */}
        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="font-bold text-gray-900 text-lg mb-2">Transparent & Anonymous</h3>
              <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed mb-4">
                Every vote is completely anonymous and secure. Data is stored locally in your browser. 
                The general index reflects community sentiment on willingness to continue investing in the game.
              </p>
              <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  100% Anonymous
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  Local Data
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