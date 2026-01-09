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
    title: 'Guard Skill Activation System Standardization',
    description: 'Current RNG-based skill activation creates unpredictable battle outcomes that undermine strategic gameplay. Request standardization of activation rates or implementation of skill rotation system.',
    category: 'gameplay',
    priority: 'critical',
    status: 'review',
    submittedBy: 'Kingdom Representatives Coalition',
    submittedDate: '2024-01-15',
    technicalDetails: 'Implement deterministic skill activation based on turn order or cooldown system rather than pure RNG',
    expectedOutcome: 'Consistent battle outcomes that reward strategic planning over random chance'
  },
  {
    id: '2',
    title: 'Kingdom Disruption Mitigation System',
    description: 'Implementation of accountability measures for players who systematically disrupt kingdom harmony and cause player attrition.',
    category: 'social',
    priority: 'high',
    status: 'draft',
    submittedBy: 'Multi-Kingdom Alliance',
    submittedDate: '2024-01-12',
    technicalDetails: 'Introduce reputation system with temporary restrictions for verified disruptive behavior',
    expectedOutcome: 'Reduced kingdom turnover and improved player retention'
  },
  {
    id: '3',
    title: 'Resource Economy Rebalancing',
    description: 'Current resource costs for advanced features create accessibility barriers. Request for graduated cost structure that maintains progression while improving accessibility.',
    category: 'economy',
    priority: 'high',
    status: 'draft',
    submittedBy: 'Economic Advisory Committee',
    submittedDate: '2024-01-10',
    technicalDetails: 'Implement tiered pricing model with alternative resource paths for skill activation',
    expectedOutcome: 'Improved feature accessibility without compromising game balance'
  }
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
              GoG Player Assembly
            </h1>
            <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
              Structured community feedback platform transforming player concerns into 
              technically sound, actionable requests for game developers.
            </p>
            <div className="mt-10 flex items-center justify-center space-x-12 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Democratic Process</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Technical Validation</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Professional Communication</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Process Overview */}
        <section id="process" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Assembly Process</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              A structured approach to collecting, validating, and articulating community feedback 
              into professional development requests.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <span className="text-blue-600 font-bold text-xl">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Collection</h3>
              <p className="text-gray-600">
                Kingdom representatives gather community concerns and proposals through structured channels.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <span className="text-green-600 font-bold text-xl">2</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Analysis</h3>
              <p className="text-gray-600">
                Technical review and consolidation of similar requests with impact assessment.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <span className="text-purple-600 font-bold text-xl">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Articulation</h3>
              <p className="text-gray-600">
                Formulation of clear, technically sound requests with expected outcomes.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <span className="text-orange-600 font-bold text-xl">4</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Submission</h3>
              <p className="text-gray-600">
                Professional presentation to development team with supporting documentation.
              </p>
            </div>
          </div>
        </section>

        {/* Current Requests */}
        <section id="requests" className="mb-20">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Current Requests</h2>
              <p className="mt-2 text-lg text-gray-600">
                Community-driven requests currently in various stages of the assembly process.
              </p>
            </div>
            <Button size="lg">Submit New Request</Button>
          </div>

          <div className="space-y-8">
            {communityRequests.map((request) => (
              <RequestCard key={request.id} request={request} />
            ))}
          </div>
        </section>

        {/* Assembly Principles */}
        <section className="mb-20">
          <Card className="border-0 shadow-sm bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardContent className="pt-12 pb-12">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-gray-900 mb-6">Assembly Principles</h3>
                <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                  Our structured approach ensures every community concern is properly evaluated, 
                  technically validated, and professionally communicated to development teams.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-12">
                <div className="text-center">
                  <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">Democratic Representation</h4>
                  <p className="text-gray-600">
                    Each kingdom elects representatives who collect and prioritize community concerns 
                    through established democratic processes.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">Technical Validation</h4>
                  <p className="text-gray-600">
                    All requests undergo technical review to ensure feasibility and provide 
                    clear implementation pathways for developers.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">Professional Communication</h4>
                  <p className="text-gray-600">
                    Requests are articulated in professional language with clear objectives, 
                    technical specifications, and expected outcomes.
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
              GoG Player Assembly - Transforming community feedback into actionable development requests
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
              <span>Democratic Process</span>
              <span className="text-gray-300">•</span>
              <span>Technical Validation</span>
              <span className="text-gray-300">•</span>
              <span>Professional Communication</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}