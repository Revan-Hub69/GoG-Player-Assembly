'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="border-b bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-2">
              <img src="/icons/arrow-left.svg" alt="Back" className="w-5 h-5 text-gray-600" />
              <span className="text-gray-600 hover:text-gray-900">Back to Home</span>
            </Link>
            <div className="flex items-center space-x-2">
              <img src="/logo.svg" alt="GoG Player Assembly" className="w-8 h-8" />
              <span className="text-xl font-bold text-gray-900">GoG Player Assembly</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <img src="/icons/heart.svg" alt="Heart" className="w-10 h-10 text-white" />
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
                <img src="/icons/heart.svg" alt="Heart" className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-xl">Community Supporter</CardTitle>
              <div className="text-4xl font-bold text-blue-600 mt-2">$5</div>
              <CardDescription>Perfect for individual players who want to help</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <img src="/icons/check-circle.svg" alt="Check" className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <div className="font-medium">Server Infrastructure</div>
                    <div className="text-sm text-gray-600">Help cover hosting and database costs</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <img src="/icons/check-circle.svg" alt="Check" className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <div className="font-medium">Community Recognition</div>
                    <div className="text-sm text-gray-600">Supporter badge on your profile</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <img src="/icons/check-circle.svg" alt="Check" className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <div className="font-medium">Monthly Updates</div>
                    <div className="text-sm text-gray-600">Exclusive development updates</div>
                  </div>
                </div>
              </div>
              <Button className="w-full" size="lg">
                <img src="/icons/heart.svg" alt="Heart" className="w-4 h-4 mr-2" />
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
                <img src="/icons/star.svg" alt="Star" className="w-8 h-8 text-purple-600" />
              </div>
              <CardTitle className="text-xl">Platform Champion</CardTitle>
              <div className="text-4xl font-bold text-purple-600 mt-2">$25</div>
              <CardDescription>For server leaders and active community members</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <img src="/icons/check-circle.svg" alt="Check" className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <div className="font-medium">Feature Development</div>
                    <div className="text-sm text-gray-600">Fund new platform capabilities</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <img src="/icons/check-circle.svg" alt="Check" className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <div className="font-medium">Priority Support</div>
                    <div className="text-sm text-gray-600">Faster response to issues and questions</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <img src="/icons/check-circle.svg" alt="Check" className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <div className="font-medium">Champion Badge</div>
                    <div className="text-sm text-gray-600">Special recognition across the platform</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <img src="/icons/check-circle.svg" alt="Check" className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <div className="font-medium">Beta Access</div>
                    <div className="text-sm text-gray-600">Early access to new features</div>
                  </div>
                </div>
              </div>
              <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700" size="lg">
                <img src="/icons/star.svg" alt="Star" className="w-4 h-4 mr-2" />
                Donate $25
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <img src="/icons/target.svg" alt="Target" className="w-8 h-8 text-orange-600" />
              </div>
              <CardTitle className="text-xl">Community Leader</CardTitle>
              <div className="text-4xl font-bold text-orange-600 mt-2">$100</div>
              <CardDescription>For those who want to shape the platform&apos;s future</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <img src="/icons/check-circle.svg" alt="Check" className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <div className="font-medium">Sustain Development</div>
                    <div className="text-sm text-gray-600">Support long-term platform growth</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <img src="/icons/check-circle.svg" alt="Check" className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <div className="font-medium">Feature Requests</div>
                    <div className="text-sm text-gray-600">Direct input on development priorities</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <img src="/icons/check-circle.svg" alt="Check" className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <div className="font-medium">Advisory Role</div>
                    <div className="text-sm text-gray-600">Participate in platform governance decisions</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <img src="/icons/check-circle.svg" alt="Check" className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <div className="font-medium">Leader Badge</div>
                    <div className="text-sm text-gray-600">Exclusive recognition and status</div>
                  </div>
                </div>
              </div>
              <Button className="w-full bg-orange-600 hover:bg-orange-700" size="lg">
                <img src="/icons/target.svg" alt="Target" className="w-4 h-4 mr-2" />
                Donate $100
              </Button>
            </CardContent>
          </Card>
        </div>

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
                  <img src="/icons/shield.svg" alt="Shield" className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Infrastructure (40%)</h3>
                <p className="text-gray-600 text-sm">
                  Hosting, database, security monitoring, and backup systems to ensure 24/7 availability
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <img src="/icons/zap.svg" alt="Zap" className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Development (35%)</h3>
                <p className="text-gray-600 text-sm">
                  New features, bug fixes, security updates, and platform improvements
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <img src="/icons/bar-chart.svg" alt="Analytics" className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Analytics (15%)</h3>
                <p className="text-gray-600 text-sm">
                  Advanced reporting tools, data processing, and community insights
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <img src="/icons/globe.svg" alt="Globe" className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Community (10%)</h3>
                <p className="text-gray-600 text-sm">
                  Support resources, documentation, and community outreach programs
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
              Can&apos;t donate? Here are other valuable ways to help
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <img src="/icons/users.svg" alt="Users" className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Spread the Word</h3>
                <p className="text-gray-600 text-sm">
                  Share the platform with other server representatives and community leaders
                </p>
              </div>

              <div className="text-center p-6 bg-green-50 rounded-lg">
                <img src="/icons/star.svg" alt="Star" className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Provide Feedback</h3>
                <p className="text-gray-600 text-sm">
                  Help us improve by reporting bugs, suggesting features, and testing new functionality
                </p>
              </div>

              <div className="text-center p-6 bg-purple-50 rounded-lg">
                <img src="/icons/external-link.svg" alt="External Link" className="w-12 h-12 text-purple-600 mx-auto mb-4" />
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