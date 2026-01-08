'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useMemo } from 'react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

export default function Home() {
  const isSupabaseConfigured = useMemo(() => {
    // Check if Supabase is configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    return supabaseUrl && 
      supabaseUrl !== 'your_supabase_project_url' &&
      supabaseUrl !== 'https://your-project.supabase.co'
  }, [])

  if (isSupabaseConfigured === false) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Setup Required</CardTitle>
            <CardDescription>
              Supabase database needs to be configured
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/setup" className="w-full">
              <Button className="w-full">Configure Database</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <img src="/logo.svg" alt="GoG Player Assembly" className="w-8 h-8" />
              <span className="text-xl font-bold text-gray-900">GoG Player Assembly</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
              <a href="#proposals" className="text-gray-600 hover:text-gray-900 transition-colors">Proposals</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">How it Works</a>
              <a href="#support" className="text-gray-600 hover:text-gray-900 transition-colors">Support</a>
              <Link href="/auth/login">
                <Button variant="outline" size="sm">Sign In</Button>
              </Link>
              <Link href="/auth/register">
                <Button size="sm">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  <img src="/icons/zap.svg" alt="Community Initiative" className="w-4 h-4 mr-2" />
                  Community-Driven Initiative
                </div>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Unite the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Guns of Glory</span> Community
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  A democratic platform where server representatives collaborate to shape the future of Guns of Glory through structured feedback, transparent voting, and data-driven insights.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/auth/register">
                  <Button size="lg" className="w-full sm:w-auto">
                    Join as Representative
                    <img src="/icons/arrow-right.svg" alt="Arrow Right" className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    <img src="/icons/github.svg" alt="GitHub" className="w-4 h-4 mr-2" />
                    View on GitHub
                  </Button>
                </a>
              </div>

              <div className="flex items-center space-x-8 text-sm text-gray-500">
                <div className="flex items-center">
                  <img src="/icons/check.svg" alt="Open Source" className="w-4 h-4 mr-2" />
                  Open Source
                </div>
                <div className="flex items-center">
                  <img src="/icons/shield.svg" alt="Secure" className="w-4 h-4 mr-2" />
                  Secure & Transparent
                </div>
                <div className="flex items-center">
                  <img src="/icons/globe.svg" alt="Global" className="w-4 h-4 mr-2" />
                  Global Community
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Community Metrics</h3>
                    <div className="flex items-center text-green-600">
                      <img src="/icons/trending.svg" alt="Live" className="w-4 h-4 mr-1" />
                      <span className="text-sm font-medium">Live</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">150+</div>
                      <div className="text-sm text-gray-600">Servers</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">89%</div>
                      <div className="text-sm text-gray-600">Participation</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">3</div>
                      <div className="text-sm text-gray-600">Active Proposals</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">0.40</div>
                      <div className="text-sm text-gray-600">CSPI Index</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Background decoration */}
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-20 blur-3xl"></div>
              <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20 blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Community Governance
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built with transparency, democracy, and data-driven insights at its core
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <img src="/icons/vote.svg" alt="Democratic Voting" className="w-6 h-6" />
                </div>
                <CardTitle>Democratic Voting</CardTitle>
                <CardDescription>
                  Transparent voting system with 60% quorum requirement and real-time results
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <img src="/icons/check.svg" alt="Check" className="w-4 h-4 mr-2" />
                    One vote per representative
                  </li>
                  <li className="flex items-center">
                    <img src="/icons/check.svg" alt="Check" className="w-4 h-4 mr-2" />
                    Immutable voting records
                  </li>
                  <li className="flex items-center">
                    <img src="/icons/check.svg" alt="Check" className="w-4 h-4 mr-2" />
                    Automatic result calculation
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <img src="/icons/message.svg" alt="Structured Feedback" className="w-6 h-6" />
                </div>
                <CardTitle>Structured Feedback</CardTitle>
                <CardDescription>
                  Collect, categorize, and aggregate player feedback from across all servers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <img src="/icons/check.svg" alt="Check" className="w-4 h-4 mr-2" />
                    Automatic categorization
                  </li>
                  <li className="flex items-center">
                    <img src="/icons/check.svg" alt="Check" className="w-4 h-4 mr-2" />
                    Trend analysis
                  </li>
                  <li className="flex items-center">
                    <img src="/icons/check.svg" alt="Check" className="w-4 h-4 mr-2" />
                    Proposal linking
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <img src="/icons/cspi.svg" alt="CSPI Analytics" className="w-6 h-6" />
                </div>
                <CardTitle>CSPI Analytics</CardTitle>
                <CardDescription>
                  Community Spending Propensity Index tracks sentiment and engagement patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <img src="/icons/check.svg" alt="Check" className="w-4 h-4 mr-2" />
                    Historical tracking
                  </li>
                  <li className="flex items-center">
                    <img src="/icons/check.svg" alt="Check" className="w-4 h-4 mr-2" />
                    Predictive insights
                  </li>
                  <li className="flex items-center">
                    <img src="/icons/check.svg" alt="Check" className="w-4 h-4 mr-2" />
                    Neutral reporting
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <img src="/icons/users.svg" alt="Representative Network" className="w-6 h-6" />
                </div>
                <CardTitle>Representative Network</CardTitle>
                <CardDescription>
                  Verified server representatives with secure communication channels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <img src="/icons/check.svg" alt="Check" className="w-4 h-4 mr-2" />
                    Identity verification
                  </li>
                  <li className="flex items-center">
                    <img src="/icons/check.svg" alt="Check" className="w-4 h-4 mr-2" />
                    Secure messaging
                  </li>
                  <li className="flex items-center">
                    <img src="/icons/check.svg" alt="Check" className="w-4 h-4 mr-2" />
                    Activity tracking
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <img src="/icons/shield.svg" alt="Security & Privacy" className="w-6 h-6" />
                </div>
                <CardTitle>Security & Privacy</CardTitle>
                <CardDescription>
                  Enterprise-grade security with Row Level Security and audit trails
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <img src="/icons/check.svg" alt="Check" className="w-4 h-4 mr-2" />
                    End-to-end encryption
                  </li>
                  <li className="flex items-center">
                    <img src="/icons/check.svg" alt="Check" className="w-4 h-4 mr-2" />
                    Audit logging
                  </li>
                  <li className="flex items-center">
                    <img src="/icons/check.svg" alt="Check" className="w-4 h-4 mr-2" />
                    GDPR compliant
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <img src="/icons/target.svg" alt="Developer Relations" className="w-6 h-6" />
                </div>
                <CardTitle>Developer Relations</CardTitle>
                <CardDescription>
                  Direct communication channel with game developers and structured reporting
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <img src="/icons/check.svg" alt="Check" className="w-4 h-4 mr-2" />
                    Structured reports
                  </li>
                  <li className="flex items-center">
                    <img src="/icons/check.svg" alt="Check" className="w-4 h-4 mr-2" />
                    Response tracking
                  </li>
                  <li className="flex items-center">
                    <img src="/icons/check.svg" alt="Check" className="w-4 h-4 mr-2" />
                    Impact measurement
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Proposals Section */}
      <section id="proposals" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Active Community Proposals
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Vote on the issues that matter most to the Guns of Glory community
            </p>
          </div>

          {/* Proposals Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <Card className="text-center border-0 shadow-lg">
              <CardContent className="pt-6">
                <img src="/icons/vote.svg" alt="Votes" className="w-12 h-12 mx-auto mb-4" />
                <div className="text-3xl font-bold text-blue-600 mb-2">372</div>
                <div className="text-sm text-gray-600">Total Votes Cast</div>
              </CardContent>
            </Card>
            <Card className="text-center border-0 shadow-lg">
              <CardContent className="pt-6">
                <img src="/icons/proposal.svg" alt="Proposals" className="w-12 h-12 mx-auto mb-4" />
                <div className="text-3xl font-bold text-green-600 mb-2">3</div>
                <div className="text-sm text-gray-600">Active Proposals</div>
              </CardContent>
            </Card>
            <Card className="text-center border-0 shadow-lg">
              <CardContent className="pt-6">
                <img src="/icons/users.svg" alt="Servers" className="w-12 h-12 mx-auto mb-4" />
                <div className="text-3xl font-bold text-purple-600 mb-2">23</div>
                <div className="text-sm text-gray-600">Supporting Servers</div>
              </CardContent>
            </Card>
            <Card className="text-center border-0 shadow-lg">
              <CardContent className="pt-6">
                <img src="/icons/cspi.svg" alt="CSPI" className="w-12 h-12 mx-auto mb-4" />
                <div className="text-3xl font-bold text-orange-600 mb-2">0.40</div>
                <div className="text-sm text-gray-600">CSPI Index</div>
              </CardContent>
            </Card>
          </div>

          {/* Proposals List */}
          <div className="space-y-8">
            {/* Proposal 1: Guard Skills */}
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <Badge className="bg-red-100 text-red-800">Gameplay</Badge>
                      <Badge className="bg-yellow-100 text-yellow-800">Active Voting</Badge>
                      <div className="flex items-center text-orange-600">
                        <img src="/icons/trending.svg" alt="High Impact" className="w-4 h-4 mr-1" />
                        <span className="text-sm font-medium">High CSPI Impact: 0.42</span>
                      </div>
                    </div>
                    <CardTitle className="text-2xl mb-3">Riforma del Sistema di Attivazione delle Skill delle Guardie</CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      Il gioco è diventato troppo casuale. Si può perdere al 30% e vincere al 30% con le stesse formazioni consecutive. 
                      La casualità ha troppa importanza ora, denaturando la strategia e la bravura dei giocatori.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Voting Results */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-gray-900">Risultati Votazione</span>
                    <span className="text-sm text-gray-600">158 voti totali</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-20 text-sm text-gray-600">Sì (127)</div>
                      <div className="flex-1 bg-gray-200 rounded-full h-3 mx-3">
                        <div className="bg-green-500 h-3 rounded-full" style={{ width: '80.4%' }}></div>
                      </div>
                      <div className="w-12 text-sm text-gray-600 text-right">80.4%</div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-20 text-sm text-gray-600">No (23)</div>
                      <div className="flex-1 bg-gray-200 rounded-full h-3 mx-3">
                        <div className="bg-red-500 h-3 rounded-full" style={{ width: '14.6%' }}></div>
                      </div>
                      <div className="w-12 text-sm text-gray-600 text-right">14.6%</div>
                    </div>
                  </div>
                </div>

                {/* Supporting Servers */}
                <div className="mb-6">
                  <div className="flex items-center mb-3">
                    <img src="/icons/users.svg" alt="Servers" className="w-5 h-5 mr-2" />
                    <span className="font-medium text-gray-900">Server Sostenitori (8)</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['Server 1', 'Server 15', 'Server 23', 'Server 45', 'Server 67', 'Server 89', 'Server 102', 'Server 134'].map((server, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {server}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <img src="/icons/vote.svg" alt="Vote" className="w-4 h-4 mr-2" />
                    Vota Ora
                  </Button>
                  <Button variant="outline">
                    <img src="/icons/message.svg" alt="Discuss" className="w-4 h-4 mr-2" />
                    Discuti
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Proposal 2: Rouge Players */}
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <Badge className="bg-purple-100 text-purple-800">Social</Badge>
                      <Badge className="bg-yellow-100 text-yellow-800">Active Voting</Badge>
                      <div className="flex items-center text-orange-600">
                        <img src="/icons/trending.svg" alt="Moderate Impact" className="w-4 h-4 mr-1" />
                        <span className="text-sm font-medium">Moderate CSPI Impact: 0.28</span>
                      </div>
                    </div>
                    <CardTitle className="text-2xl mb-3">Nuovo Titolo &quot;Nemico del Regno&quot; per Rouge Players</CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      Capitano spesso giocatori soli che rovinano i regni facendo smettere altri giocatori. 
                      Proposta: un nuovo titolo per le prigioni &quot;Nemico del Regno&quot; - un giocatore con questo titolo 
                      non può mettere scudo né teletrasportarsi per tutto il tempo in cui ha il titolo.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Voting Results */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-gray-900">Risultati Votazione</span>
                    <span className="text-sm text-gray-600">146 voti totali</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-20 text-sm text-gray-600">Sì (89)</div>
                      <div className="flex-1 bg-gray-200 rounded-full h-3 mx-3">
                        <div className="bg-green-500 h-3 rounded-full" style={{ width: '61.0%' }}></div>
                      </div>
                      <div className="w-12 text-sm text-gray-600 text-right">61.0%</div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-20 text-sm text-gray-600">No (45)</div>
                      <div className="flex-1 bg-gray-200 rounded-full h-3 mx-3">
                        <div className="bg-red-500 h-3 rounded-full" style={{ width: '30.8%' }}></div>
                      </div>
                      <div className="w-12 text-sm text-gray-600 text-right">30.8%</div>
                    </div>
                  </div>
                </div>

                {/* Supporting Servers */}
                <div className="mb-6">
                  <div className="flex items-center mb-3">
                    <img src="/icons/users.svg" alt="Servers" className="w-5 h-5 mr-2" />
                    <span className="font-medium text-gray-900">Server Sostenitori (6)</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['Server 3', 'Server 12', 'Server 28', 'Server 56', 'Server 78', 'Server 91'].map((server, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {server}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <img src="/icons/vote.svg" alt="Vote" className="w-4 h-4 mr-2" />
                    Vota Ora
                  </Button>
                  <Button variant="outline">
                    <img src="/icons/message.svg" alt="Discuss" className="w-4 h-4 mr-2" />
                    Discuti
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Proposal 3: Pelican Costs */}
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <Badge className="bg-green-100 text-green-800">Economy</Badge>
                      <Badge className="bg-yellow-100 text-yellow-800">Active Voting</Badge>
                      <div className="flex items-center text-red-600">
                        <img src="/icons/trending.svg" alt="Very High Impact" className="w-4 h-4 mr-1" />
                        <span className="text-sm font-medium">Very High CSPI Impact: 0.51</span>
                      </div>
                    </div>
                    <CardTitle className="text-2xl mb-3">Riequilibrio Costi Pellicano e Skill</CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      Molti giocatori hanno speso tantissimi materiali e tempo, ma ora l&apos;aumento del costo in biscotti 
                      non fa quasi più sfruttare le skill costosissime implementate. Proposta: dimezzare il costo dei 
                      biscotti e dimezzare le truppe che si possono prendere.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Voting Results */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-gray-900">Risultati Votazione</span>
                    <span className="text-sm text-gray-600">179 voti totali</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-20 text-sm text-gray-600">Sì (156)</div>
                      <div className="flex-1 bg-gray-200 rounded-full h-3 mx-3">
                        <div className="bg-green-500 h-3 rounded-full" style={{ width: '87.2%' }}></div>
                      </div>
                      <div className="w-12 text-sm text-gray-600 text-right">87.2%</div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-20 text-sm text-gray-600">No (18)</div>
                      <div className="flex-1 bg-gray-200 rounded-full h-3 mx-3">
                        <div className="bg-red-500 h-3 rounded-full" style={{ width: '10.1%' }}></div>
                      </div>
                      <div className="w-12 text-sm text-gray-600 text-right">10.1%</div>
                    </div>
                  </div>
                </div>

                {/* Supporting Servers */}
                <div className="mb-6">
                  <div className="flex items-center mb-3">
                    <img src="/icons/users.svg" alt="Servers" className="w-5 h-5 mr-2" />
                    <span className="font-medium text-gray-900">Server Sostenitori (9)</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['Server 5', 'Server 17', 'Server 29', 'Server 41', 'Server 63', 'Server 85', 'Server 97', 'Server 118', 'Server 142'].map((server, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {server}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <img src="/icons/vote.svg" alt="Vote" className="w-4 h-4 mr-2" />
                    Vota Ora
                  </Button>
                  <Button variant="outline">
                    <img src="/icons/message.svg" alt="Discuss" className="w-4 h-4 mr-2" />
                    Discuti
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CSPI Index Display */}
          <Card className="mt-12 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <img src="/icons/cspi.svg" alt="CSPI" className="w-8 h-8 mr-3" />
                Community Spending Propensity Index (CSPI)
              </CardTitle>
              <CardDescription className="text-lg">
                Current community sentiment indicator based on active proposals and server feedback
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-6">
                <div className="text-5xl font-bold text-orange-600">0.40</div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">Based on 3 active proposals</div>
                  <div className="text-sm text-gray-600">Last updated: {new Date().toLocaleDateString()}</div>
                </div>
              </div>
              
              <div className="bg-gray-200 rounded-full h-6 mb-3">
                <div className="bg-yellow-500 h-6 rounded-full" style={{ width: '40%' }}></div>
              </div>
              
              <div className="flex justify-between text-sm text-gray-600 mb-6">
                <span>Low Impact (0.0)</span>
                <span>Moderate Impact (0.5)</span>
                <span>High Impact (1.0)</span>
              </div>
              
              <div className="p-6 bg-orange-50 rounded-xl">
                <p className="text-lg text-orange-800 mb-3">
                  <strong>Current Status:</strong> Moderate community engagement with rising concerns
                </p>
                <p className="text-sm text-orange-700">
                  The CSPI reflects community sentiment based on proposal impact assessments and server representative feedback. 
                  Higher values indicate greater community concern about game changes. The current index shows moderate engagement 
                  with some high-impact proposals requiring developer attention.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      <section id="how-it-works" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              How GoG Player Assembly Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A simple, transparent process that amplifies the community voice
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Register as Representative</h3>
              <p className="text-gray-600">
                Server leaders register and verify their identity to become official representatives
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-purple-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Collect Feedback</h3>
              <p className="text-gray-600">
                Representatives gather structured feedback from their server communities
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Create & Vote</h3>
              <p className="text-gray-600">
                Transform feedback into proposals and vote democratically on community priorities
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-orange-600">4</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Developer Engagement</h3>
              <p className="text-gray-600">
                Approved proposals are presented to developers with comprehensive data and metrics
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section id="support" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <img src="/icons/heart.svg" alt="Support" className="w-16 h-16 mx-auto mb-6" />
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Support Our Mission
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Help us build and maintain this community-driven platform. Your support enables us to provide free, transparent tools for the entire Guns of Glory community.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card className="border-0 shadow-lg">
                <CardHeader className="text-center">
                  <CardTitle className="text-lg">Community Supporter</CardTitle>
                  <div className="text-3xl font-bold text-blue-600 mt-2">$5</div>
                  <CardDescription>One-time contribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <img src="/icons/check-circle.svg" alt="Check" className="w-4 h-4 text-green-500 mr-2" />
                      Support server costs
                    </li>
                    <li className="flex items-center">
                      <img src="/icons/check-circle.svg" alt="Check" className="w-4 h-4 text-green-500 mr-2" />
                      Community recognition
                    </li>
                  </ul>
                  <Button className="w-full mt-6">
                    <img src="/icons/heart.svg" alt="Donate" className="w-4 h-4 mr-2" />
                    Donate $5
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-200 shadow-xl relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
                <CardHeader className="text-center">
                  <CardTitle className="text-lg">Platform Champion</CardTitle>
                  <div className="text-3xl font-bold text-purple-600 mt-2">$25</div>
                  <CardDescription>One-time contribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <img src="/icons/check-circle.svg" alt="Check" className="w-4 h-4 text-green-500 mr-2" />
                      Fund new features
                    </li>
                    <li className="flex items-center">
                      <img src="/icons/check-circle.svg" alt="Check" className="w-4 h-4 text-green-500 mr-2" />
                      Priority support
                    </li>
                    <li className="flex items-center">
                      <img src="/icons/check-circle.svg" alt="Check" className="w-4 h-4 text-green-500 mr-2" />
                      Special badge
                    </li>
                  </ul>
                  <Button className="w-full mt-6 bg-purple-600 hover:bg-purple-700">
                    <img src="/icons/vote.svg" alt="Champion" className="w-4 h-4 mr-2" />
                    Donate $25
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="text-center">
                  <CardTitle className="text-lg">Community Leader</CardTitle>
                  <div className="text-3xl font-bold text-orange-600 mt-2">$100</div>
                  <CardDescription>One-time contribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <img src="/icons/check-circle.svg" alt="Check" className="w-4 h-4 text-green-500 mr-2" />
                      Sustain development
                    </li>
                    <li className="flex items-center">
                      <img src="/icons/check-circle.svg" alt="Check" className="w-4 h-4 text-green-500 mr-2" />
                      Feature requests
                    </li>
                    <li className="flex items-center">
                      <img src="/icons/check-circle.svg" alt="Check" className="w-4 h-4 text-green-500 mr-2" />
                      Advisory input
                    </li>
                  </ul>
                  <Button className="w-full mt-6 bg-orange-600 hover:bg-orange-700">
                    <img src="/icons/target.svg" alt="Leader" className="w-4 h-4 mr-2" />
                    Donate $100
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Your Support Matters</h3>
              <div className="grid md:grid-cols-2 gap-8 text-left">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">🚀 Platform Development</h4>
                  <p className="text-gray-600 text-sm">
                    Continuous development of new features, security updates, and performance improvements
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">🛡️ Infrastructure Costs</h4>
                  <p className="text-gray-600 text-sm">
                    Reliable hosting, database management, and security monitoring for 24/7 availability
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">🌍 Community Growth</h4>
                  <p className="text-gray-600 text-sm">
                    Expanding to support more servers, languages, and community features
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">📊 Data Analytics</h4>
                  <p className="text-gray-600 text-sm">
                    Advanced analytics tools to provide better insights and reporting capabilities
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img src="/logo.svg" alt="GoG Player Assembly" className="w-8 h-8" />
                <span className="text-xl font-bold">GoG Player Assembly</span>
              </div>
              <p className="text-gray-400 text-sm">
                Empowering the Guns of Glory community through democratic governance and transparent communication.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/auth/register" className="hover:text-white transition-colors">Get Started</Link></li>
                <li><Link href="/auth/login" className="hover:text-white transition-colors">Sign In</Link></li>
                <li><Link href="/proposals" className="hover:text-white transition-colors">Proposals</Link></li>
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Discord</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Reddit</a></li>
                <li><a href="#" className="hover:text-white transition-colors">GitHub</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#support" className="hover:text-white transition-colors">Donate</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 GoG Player Assembly. Built with ❤️ for the community. Open source and transparent.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
