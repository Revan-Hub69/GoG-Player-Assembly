'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Vote, 
  MessageSquare, 
  TrendingUp, 
  Users, 
  Shield,
  Sword,
  Coins,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowLeft
} from 'lucide-react'
import Link from 'next/link'

interface Proposal {
  id: string
  title: string
  description: string
  category: 'gameplay' | 'balance' | 'economy' | 'social'
  status: 'active' | 'passed' | 'rejected' | 'pending'
  votes: {
    yes: number
    no: number
    abstain: number
  }
  supportingServers: string[]
  cspiImpact: number
  createdAt: string
  votingEnds: string
}

const proposals: Proposal[] = [
  {
    id: '1',
    title: 'Riforma del Sistema di Attivazione delle Skill delle Guardie',
    description: 'Il gioco è diventato troppo casuale. Si può perdere al 30% e vincere al 30% con le stesse formazioni consecutive. La casualità ha troppa importanza ora, denaturando la strategia e la bravura dei giocatori.',
    category: 'gameplay',
    status: 'active',
    votes: { yes: 127, no: 23, abstain: 8 },
    supportingServers: ['Server 1', 'Server 15', 'Server 23', 'Server 45', 'Server 67', 'Server 89', 'Server 102', 'Server 134'],
    cspiImpact: 0.42,
    createdAt: '2024-01-15',
    votingEnds: '2024-02-15'
  },
  {
    id: '2',
    title: 'Nuovo Titolo "Nemico del Regno" per Rouge Players',
    description: 'Capitano spesso giocatori soli che rovinano i regni facendo smettere altri giocatori. Proposta: un nuovo titolo per le prigioni "Nemico del Regno" - un giocatore con questo titolo non può mettere scudo né teletrasportarsi per tutto il tempo in cui ha il titolo.',
    category: 'social',
    status: 'active',
    votes: { yes: 89, no: 45, abstain: 12 },
    supportingServers: ['Server 3', 'Server 12', 'Server 28', 'Server 56', 'Server 78', 'Server 91'],
    cspiImpact: 0.28,
    createdAt: '2024-01-18',
    votingEnds: '2024-02-18'
  },
  {
    id: '3',
    title: 'Riequilibrio Costi Pellicano e Skill',
    description: 'Molti giocatori hanno speso tantissimi materiali e tempo, ma ora l\'aumento del costo in biscotti non fa quasi più sfruttare le skill costosissime implementate. Proposta: dimezzare il costo dei biscotti e dimezzare le truppe che si possono prendere.',
    category: 'economy',
    status: 'active',
    votes: { yes: 156, no: 18, abstain: 5 },
    supportingServers: ['Server 5', 'Server 17', 'Server 29', 'Server 41', 'Server 63', 'Server 85', 'Server 97', 'Server 118', 'Server 142'],
    cspiImpact: 0.51,
    createdAt: '2024-01-20',
    votingEnds: '2024-02-20'
  }
]

const categoryIcons = {
  gameplay: Sword,
  balance: Shield,
  economy: Coins,
  social: Users
}

const categoryColors = {
  gameplay: 'bg-red-100 text-red-800',
  balance: 'bg-blue-100 text-blue-800',
  economy: 'bg-green-100 text-green-800',
  social: 'bg-purple-100 text-purple-800'
}

const statusColors = {
  active: 'bg-yellow-100 text-yellow-800',
  passed: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  pending: 'bg-gray-100 text-gray-800'
}

export default function ProposalsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')

  const filteredProposals = proposals.filter(proposal => {
    const categoryMatch = selectedCategory === 'all' || proposal.category === selectedCategory
    const statusMatch = selectedStatus === 'all' || proposal.status === selectedStatus
    return categoryMatch && statusMatch
  })

  const totalVotes = proposals.reduce((sum, p) => sum + p.votes.yes + p.votes.no + p.votes.abstain, 0)
  const averageCSPI = proposals.reduce((sum, p) => sum + p.cspiImpact, 0) / proposals.length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="border-b bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-2">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
              <span className="text-gray-600 hover:text-gray-900">Back to Home</span>
            </Link>
            <div className="flex items-center space-x-2">
              <img src="/logo.svg" alt="GoG Player Assembly" className="w-8 h-8" />
              <span className="text-xl font-bold text-gray-900">GoG Player Assembly</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Community Proposals</h1>
          <p className="text-xl text-gray-600 mb-6">
            Vote on proposals that shape the future of Guns of Glory
          </p>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <Vote className="w-8 h-8 text-blue-600 mr-3" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{totalVotes}</div>
                    <div className="text-sm text-gray-600">Total Votes</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <MessageSquare className="w-8 h-8 text-green-600 mr-3" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{proposals.length}</div>
                    <div className="text-sm text-gray-600">Active Proposals</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <TrendingUp className="w-8 h-8 text-purple-600 mr-3" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{averageCSPI.toFixed(2)}</div>
                    <div className="text-sm text-gray-600">Average CSPI Impact</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <Users className="w-8 h-8 text-orange-600 mr-3" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">89%</div>
                    <div className="text-sm text-gray-600">Participation Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Category:</span>
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm"
              >
                <option value="all">All Categories</option>
                <option value="gameplay">Gameplay</option>
                <option value="balance">Balance</option>
                <option value="economy">Economy</option>
                <option value="social">Social</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Status:</span>
              <select 
                value={selectedStatus} 
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="passed">Passed</option>
                <option value="rejected">Rejected</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
        </div>

        {/* Proposals List */}
        <div className="space-y-6">
          {filteredProposals.map((proposal) => {
            const CategoryIcon = categoryIcons[proposal.category]
            const totalVotes = proposal.votes.yes + proposal.votes.no + proposal.votes.abstain
            const yesPercentage = totalVotes > 0 ? (proposal.votes.yes / totalVotes) * 100 : 0
            const noPercentage = totalVotes > 0 ? (proposal.votes.no / totalVotes) * 100 : 0

            return (
              <Card key={proposal.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <CategoryIcon className="w-5 h-5 text-gray-600" />
                        <Badge className={categoryColors[proposal.category]}>
                          {proposal.category.charAt(0).toUpperCase() + proposal.category.slice(1)}
                        </Badge>
                        <Badge className={statusColors[proposal.status]}>
                          {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl mb-2">{proposal.title}</CardTitle>
                      <CardDescription className="text-base leading-relaxed">
                        {proposal.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  {/* Voting Results */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Voting Results</span>
                      <span className="text-sm text-gray-600">{totalVotes} total votes</span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <div className="w-16 text-sm text-gray-600">Yes ({proposal.votes.yes})</div>
                        <div className="flex-1 bg-gray-200 rounded-full h-2 mx-3">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${yesPercentage}%` }}
                          ></div>
                        </div>
                        <div className="w-12 text-sm text-gray-600 text-right">{yesPercentage.toFixed(1)}%</div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="w-16 text-sm text-gray-600">No ({proposal.votes.no})</div>
                        <div className="flex-1 bg-gray-200 rounded-full h-2 mx-3">
                          <div 
                            className="bg-red-500 h-2 rounded-full" 
                            style={{ width: `${noPercentage}%` }}
                          ></div>
                        </div>
                        <div className="w-12 text-sm text-gray-600 text-right">{noPercentage.toFixed(1)}%</div>
                      </div>
                    </div>
                  </div>

                  {/* Supporting Servers */}
                  <div className="mb-6">
                    <div className="flex items-center mb-2">
                      <Users className="w-4 h-4 text-gray-600 mr-2" />
                      <span className="text-sm font-medium text-gray-700">Supporting Servers ({proposal.supportingServers.length})</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {proposal.supportingServers.map((server, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {server}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* CSPI Impact */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <TrendingUp className="w-4 h-4 text-gray-600 mr-2" />
                        <span className="text-sm font-medium text-gray-700">CSPI Impact</span>
                      </div>
                      <div className="flex items-center">
                        <div className="text-lg font-bold text-orange-600">{proposal.cspiImpact.toFixed(2)}</div>
                        {proposal.cspiImpact > 0.4 ? (
                          <AlertTriangle className="w-4 h-4 text-red-500 ml-2" />
                        ) : (
                          <CheckCircle className="w-4 h-4 text-green-500 ml-2" />
                        )}
                      </div>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      {proposal.cspiImpact > 0.4 ? 'High community impact expected' : 'Moderate community impact expected'}
                    </div>
                  </div>

                  {/* Voting Period */}
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      Created: {new Date(proposal.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      Voting ends: {new Date(proposal.votingEnds).toLocaleDateString()}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <Button className="flex-1">
                      <Vote className="w-4 h-4 mr-2" />
                      Vote Now
                    </Button>
                    <Button variant="outline">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Discuss
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* CSPI Index Display */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-6 h-6 mr-2 text-orange-600" />
              Community Spending Propensity Index (CSPI)
            </CardTitle>
            <CardDescription>
              Current community sentiment indicator based on active proposals and server feedback
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div className="text-4xl font-bold text-orange-600">{averageCSPI.toFixed(2)}</div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Based on {proposals.length} active proposals</div>
                <div className="text-sm text-gray-600">Last updated: {new Date().toLocaleDateString()}</div>
              </div>
            </div>
            
            <div className="bg-gray-200 rounded-full h-4 mb-2">
              <div 
                className={`h-4 rounded-full ${averageCSPI > 0.6 ? 'bg-red-500' : averageCSPI > 0.3 ? 'bg-yellow-500' : 'bg-green-500'}`}
                style={{ width: `${Math.min(averageCSPI * 100, 100)}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between text-xs text-gray-600">
              <span>Low Impact (0.0)</span>
              <span>Moderate Impact (0.5)</span>
              <span>High Impact (1.0)</span>
            </div>
            
            <div className="mt-4 p-4 bg-orange-50 rounded-lg">
              <p className="text-sm text-orange-800">
                <strong>Current Status:</strong> {averageCSPI > 0.6 ? 'High community concern detected' : averageCSPI > 0.3 ? 'Moderate community engagement' : 'Stable community sentiment'}
              </p>
              <p className="text-xs text-orange-700 mt-2">
                The CSPI reflects community sentiment based on proposal impact assessments and server representative feedback. 
                Higher values indicate greater community concern about game changes.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}