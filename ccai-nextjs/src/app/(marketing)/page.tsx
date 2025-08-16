import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Truck, Bot, BarChart3, Mail, Phone, Receipt } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Truck className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">CCAI</span>
          </div>
          <Button asChild>
            <Link href="/demo">Demo Login</Link>
          </Button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            AI-Powered Trucking Brokerage
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Revolutionize your freight operations with intelligent communication sorting, 
            automated invoice processing, and AI-driven bid assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/demo">Try Demo Now</Link>
            </Button>
            <Button size="lg" variant="outline">
              Watch Demo Video
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Powerful Features for Modern Brokerages
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to streamline operations and grow your business
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <Mail className="h-10 w-10 text-blue-600 mb-2" />
              <CardTitle>Smart Inbox</CardTitle>
              <CardDescription>
                AI automatically sorts emails and calls into buckets: Leads, Invoices, Dispatch, and more
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Receipt className="h-10 w-10 text-green-600 mb-2" />
              <CardTitle>Invoice Processing</CardTitle>
              <CardDescription>
                Extract data from invoices automatically and suggest journal entries for your ERP
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Phone className="h-10 w-10 text-purple-600 mb-2" />
              <CardTitle>Lead Management</CardTitle>
              <CardDescription>
                Convert communications to leads with AI-powered bid drafting and rate suggestions
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Bot className="h-10 w-10 text-orange-600 mb-2" />
              <CardTitle>AI Bid Assistant</CardTitle>
              <CardDescription>
                Generate professional responses and quotes using GPT-4 with trucking industry expertise
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <BarChart3 className="h-10 w-10 text-red-600 mb-2" />
              <CardTitle>Analytics Dashboard</CardTitle>
              <CardDescription>
                Track KPIs, monitor performance, and get insights to optimize your operations
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Truck className="h-10 w-10 text-indigo-600 mb-2" />
              <CardTitle>Carrier Integration</CardTitle>
              <CardDescription>
                Connect with carriers, track loads, and manage dispatch operations seamlessly
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Brokerage?
          </h2>
          <p className="text-xl mb-8">
            Join hundreds of brokerages already using CCAI to streamline their operations
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/demo">Start Demo Now</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Truck className="h-6 w-6" />
              <span className="text-lg font-semibold">CCAI</span>
            </div>
            <p className="text-gray-400">
              © 2024 CCAI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}