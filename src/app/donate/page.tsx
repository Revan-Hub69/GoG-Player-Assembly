'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Heart, 
  Star, 
  Target, 
  CheckCircle, 
  Users, 
  Shield, 
  Zap,
  BarChart3,
  Globe,
  ArrowLeft,
  ExternalLink
} from 'lucide-react'
import Link from 'next/link'

export default function DonatePage() {
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
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">GoG Player Assembly</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Support Our Community Mission
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Help us build and maintain the most comprehensive community governance platform for Guns of Glory. 
            Your support directly enables democratic participation and transparent communication.
          </p>
        </div>

        {/* Impact Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">150+</div>
              <div className="text-sm text-gray-600">Servers Connected</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-green-600 mb-2">89%</div>
              <div className="text-sm text-gray-600">Representative Participation</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-purple-600 mb-2">42</div>
              <div className="text-sm text-gray-600">Community Proposals</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-sm text-gray-600">Platform Availability</div>
            </CardContent>
          </Card>
        </div>

        {/* Donation Tiers */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-xl">Community Supporter</CardTitle>
              <div className="text-4xl font-bold text-blue-600 mt-2">$5</div>
              <CardDescription>Perfect for individual players who want to help</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <div className="font-medium">Server Infrastructure</div>
                    <div className="text-sm text-gray-600">Help cover hosting and database costs</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <div className="font-medium">Community Recognition</div>
                    <div className="text-sm text-gray-600">Supporter badge on your profile</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <div className="font-medium">Monthly Updates</div>
                    <div className="text-sm text-gray-600">Exclusive development updates</div>
                  </div>
                </div>
              </div>
              <Button className="w-full" size="lg">
                <Heart className="w-4 h-4 mr-2" />
                Donate $5
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-200 shadow-xl relative transform scale-105">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-medium shadow-lg">
                Most Popular
              </span>
            </div>
            <CardHeader className="text-center pt-8">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-purple-600" />
              </div>
              <CardTitle className="text-xl">Platform Champion</CardTitle>
              <div className="text-4xl font-bold text-purple-600 mt-2">$25</div>
              <CardDescription>For server leaders and active community members</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <div className="font-medium">Feature Development</div>
                    <div className="text-sm text-gray-600">Fund new platform capabilities</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <div className="font-medium">Priority Support</div>
                    <div className="text-sm text-gray-600">Faster response to issues and questions</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <div className="font-medium">Champion Badge</div>
                    <div className="text-sm text-gray-600">Special recognition across the platform</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <div className="font-medium">Beta Access</div>
                    <div className="text-sm text-gray-600">Early access to new features</div>
                  </div>
                </div>
              </div>
              <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700" size="lg">
                <Star className="w-4 h-4 mr-2" />
                Donate $25
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-orange-600" />
              </div>
              <CardTitle className="text-xl">Community Leader</CardTitle>
              <div className="text-4xl font-bold text-orange-600 mt-2">$100</div>
              <CardDescription>For those who want to shape the platform's future</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <div className="font-medium">Sustain Development</div>
                    <div className="text-sm text-gray-600">Support long-term platform growth</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <div className="font-medium">Feature Requests</div>
                    <div className="text-sm text-gray-600">Direct input on development priorities</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <div className="font-medium">Advisory Role</div>
                    <div className="text-sm text-gray-600">Participate in platform governance decisions</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <div className="font-medium">Leader Badge</div>
                    <div className="text-sm text-gray-600">Exclusive recognition and status</div>
                  </div>
                </div>
              </div>
              <Button className="w-full bg-orange-600 hover:bg-orange-700" size="lg">
                <Target className="w-4 h-4 mr-2" />
                Donate $100
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Custom Amount */}
        <Card className="mb-12">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Custom Contribution</CardTitle>
            <CardDescription>
              Choose your own amount to support the platform
            </CardDescription>
          </CardHeader>
          <CardContent className="max-w-md mx-auto">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <input 
                    type="number" 
                    placeholder="25" 
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <Button size="lg">
                Donate Now
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* How Funds Are Used */}
        <Card className="mb-12">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">How Your Donation Is Used</CardTitle>
            <CardDescription>
              Complete transparency on fund allocation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Infrastructure (40%)</h3>
                <p className="text-gray-600 text-sm">
                  Hosting, database, security monitoring, and backup systems to ensure 24/7 availability
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Development (35%)</h3>
                <p className="text-gray-600 text-sm">
                  New features, bug fixes, security updates, and platform improvements
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Analytics (15%)</h3>
                <p className="text-gray-600 text-sm">
                  Advanced reporting tools, data processing, and community insights
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Community (10%)</h3>
                <p className="text-gray-600 text-sm">
                  Support resources, documentation, and community outreach programs
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card className="mb-12">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">Is GoG Player Assembly officially affiliated with the game developers?</h3>
                <p className="text-gray-600">
                  No, we are an independent community initiative. We aim to facilitate communication between the community and developers, but we are not officially endorsed or operated by the game's creators.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">How do you ensure transparency in fund usage?</h3>
                <p className="text-gray-600">
                  We publish quarterly financial reports showing exactly how donations are used. All major expenses are documented and shared with the community. Our code is also open source for complete transparency.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Can I get a refund if I change my mind?</h3>
                <p className="text-gray-600">
                  While donations are generally non-refundable, we understand circumstances change. Contact us within 30 days if you need to discuss a refund, and we'll work with you on a case-by-case basis.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Do you accept cryptocurrency donations?</h3>
                <p className="text-gray-600">
                  Currently, we only accept traditional payment methods through our secure payment processor. We're exploring cryptocurrency options for the future based on community demand.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alternative Support */}
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Other Ways to Support</CardTitle>
            <CardDescription>
              Can't donate? Here are other valuable ways to help
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Spread the Word</h3>
                <p className="text-gray-600 text-sm">
                  Share the platform with other server representatives and community leaders
                </p>
              </div>

              <div className="text-center p-6 bg-green-50 rounded-lg">
                <Star className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Provide Feedback</h3>
                <p className="text-gray-600 text-sm">
                  Help us improve by reporting bugs, suggesting features, and testing new functionality
                </p>
              </div>

              <div className="text-center p-6 bg-purple-50 rounded-lg">
                <ExternalLink className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Contribute Code</h3>
                <p className="text-gray-600 text-sm">
                  Our platform is open source - developers can contribute directly to the codebase
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}