import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Truck, 
  Bot, 
  BarChart3, 
  Mail, 
  Phone, 
  Receipt,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  TrendingUp,
  Shield,
  Zap,
  PlayCircle,
  ChevronRight,
  Target,
  Award,
  LineChart,
  Clock,
  Globe,
  Brain,
  Building
} from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center shadow-soft">
                <Truck className="h-5 w-5 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-warning rounded-full flex items-center justify-center">
                <Sparkles className="h-2.5 w-2.5 text-white" />
              </div>
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                SEVOS.AI
              </span>
              <Badge variant="secondary" className="ml-2 text-xs px-2 py-0.5">
                Beta
              </Badge>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="hidden md:inline-flex">
              Features
            </Button>
            <Button variant="ghost" size="sm" className="hidden md:inline-flex">
              Pricing
            </Button>
            <Button size="sm" className="shadow-soft" asChild>
              <Link href="/demo" className="flex items-center space-x-2">
                <span>Try Demo</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary-light/10" />
        <div className="container mx-auto px-4 py-24 lg:py-32 relative">
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <Badge variant="outline" className="px-4 py-2 text-sm font-medium border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors">
                <Sparkles className="h-4 w-4 mr-2 text-primary" />
                Now Powered by GPT-4 Turbo
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
              <span className="bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent">
                The Future of
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary via-primary-dark to-primary bg-clip-text text-transparent">
                Trucking Brokerage
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Transform your freight operations with AI that thinks like an expert broker. 
              Automate communications, streamline operations, and scale your business.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Button size="lg" className="h-14 px-8 text-lg gradient-primary shadow-strong hover:shadow-intense transition-all duration-300" asChild>
                <Link href="/demo" className="flex items-center space-x-2">
                  <span>Experience the Demo</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-2 hover:bg-muted/50 transition-all duration-300">
                <PlayCircle className="h-5 w-5 mr-2" />
                Watch 2-min Demo
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex flex-col items-center space-y-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <div className="flex -space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-primary-dark border-2 border-background flex items-center justify-center">
                      <Users className="h-4 w-4 text-white" />
                    </div>
                  ))}
                </div>
                <span className="font-medium">Trusted by 500+ brokerages</span>
              </div>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                ))}
                <span className="ml-2 text-sm font-medium">4.9/5 customer satisfaction</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 lg:py-32 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <Badge variant="outline" className="mb-4 px-4 py-2">
              <Zap className="h-4 w-4 mr-2" />
              Powered by AI
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Everything Your Brokerage Needs
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From intelligent communication sorting to automated financial operations, 
              SEVOS.AI handles the complexity so you can focus on growth.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Mail,
                title: "Smart Communication Hub",
                description: "AI automatically categorizes emails and calls into Leads, Invoices, Dispatch, Claims, and more with 95%+ accuracy.",
                color: "bg-blue-500",
                badge: "Most Popular"
              },
              {
                icon: Bot,
                title: "AI Bid Assistant",
                description: "Generate professional quotes and responses with GPT-4, trained on trucking industry best practices and current market data.",
                color: "bg-purple-500",
                badge: "New"
              },
              {
                icon: Receipt,
                title: "Invoice Automation",
                description: "Extract invoice data instantly and generate accounting entries automatically, reducing manual work by 80%.",
                color: "bg-green-500"
              },
              {
                icon: Target,
                title: "Lead Pipeline",
                description: "Convert communications to opportunities with visual pipeline management and automated follow-ups.",
                color: "bg-orange-500"
              },
              {
                icon: LineChart,
                title: "Business Intelligence",
                description: "Real-time analytics on revenue, margins, carrier performance, and customer satisfaction metrics.",
                color: "bg-indigo-500"
              },
              {
                icon: Shield,
                title: "Enterprise Security",
                description: "Bank-level encryption, SOC 2 compliance, and role-based access control to protect your sensitive data.",
                color: "bg-red-500"
              }
            ].map((feature, index) => (
              <Card key={index} className="group relative overflow-hidden border-0 shadow-soft hover:shadow-strong transition-all duration-300 hover:-translate-y-1">
                {feature.badge && (
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="text-xs">
                      {feature.badge}
                    </Badge>
                  </div>
                )}
                <CardHeader className="pb-6">
                  <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-4 shadow-soft group-hover:shadow-moderate transition-all duration-300`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "95%", label: "Accuracy Rate", icon: Target },
              { value: "80%", label: "Time Saved", icon: Clock },
              { value: "500+", label: "Brokerages", icon: Building },
              { value: "24/7", label: "AI Support", icon: Bot }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-2">
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Get Started in Minutes
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              No complex setup or training required. SEVOS.AI integrates with your existing workflows seamlessly.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Connect Your Email",
                description: "Securely connect your business email and phone systems. Our AI starts learning your communication patterns immediately.",
                icon: Mail
              },
              {
                step: "02", 
                title: "AI Learns Your Business",
                description: "Our AI analyzes your historical data and learns your specific lanes, rates, and business preferences in hours, not weeks.",
                icon: Brain
              },
              {
                step: "03",
                title: "Start Automating",
                description: "Watch as SEVOS.AI automatically sorts communications, drafts responses, and manages your entire operation intelligently.",
                icon: Zap
              }
            ].map((step, index) => (
              <div key={index} className="relative">
                {index < 2 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-primary/20 to-transparent" />
                )}
                <div className="text-center">
                  <div className="w-24 h-24 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-strong">
                    <step.icon className="h-10 w-10 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-primary mb-4">{step.step}</div>
                  <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 gradient-primary" />
        <div className="absolute inset-0 bg-black/10" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Brokerage?
            </h2>
            <p className="text-xl mb-12 opacity-90">
              Join the growing community of brokerages using AI to scale their operations. 
              No credit card required, full access to all features.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button size="lg" variant="secondary" className="h-14 px-8 text-lg shadow-strong hover:shadow-intense transition-all duration-300" asChild>
                <Link href="/demo" className="flex items-center space-x-2">
                  <span>Start Free Demo</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-white/20 text-white hover:bg-white/10 transition-all duration-300">
                Schedule Live Demo
              </Button>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 text-sm opacity-80">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span>Free 14-day trial</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span>No setup fees</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
                  <Truck className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">SEVOS.AI</span>
              </div>
              <p className="text-muted-foreground mb-6 max-w-md">
                The most advanced AI platform for trucking brokerages. Automate operations, 
                increase margins, and scale your business with intelligent automation.
              </p>
              <div className="flex space-x-4">
                <Badge variant="outline">SOC 2 Compliant</Badge>
                <Badge variant="outline">GDPR Ready</Badge>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground transition-colors">Features</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Pricing</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Integrations</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">API Docs</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground transition-colors">About</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Careers</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t pt-8 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © 2024 SEVOS.AI. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Security</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}