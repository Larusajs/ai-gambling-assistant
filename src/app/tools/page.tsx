import ChatInterface from '@/components/chat-interface'
import Navbar from '../../components/navbar'
import AIToolsGrid from '../../components/ai-tools-grid'
import Footer from '../../components/footer'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'

export default function ToolsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">AI Gambling Tools</h1>
            <p className="text-xl mb-8">Explore our cutting-edge AI tools to enhance your gambling strategies</p>
            <div className="max-w-md mx-auto">
              <div className="flex w-full items-center space-x-2">
                <Input type="text" placeholder="Search tools..." className="bg-primary-foreground text-primary" />
                <Button type="submit" size="icon">
                  <Search className="h-4 w-4" />
                  <span className="sr-only">Search</span>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* AI Tools Grid Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Our AI Tools</h2>
            <AIToolsGrid />
          </div>
        </section>

        {/* Featured Tool Section */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Featured Tool: AI Predictor</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Predict Outcomes with Precision</h3>
                <p className="text-muted-foreground mb-6">
                  Our AI Predictor uses advanced machine learning algorithms to analyze historical data,
                  current trends, and multiple variables to provide accurate predictions for various gambling scenarios.
                </p>
                <Button>Try AI Predictor</Button>
              </div>
              <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                [AI Predictor Screenshot or Illustration]
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary text-primary-foreground py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Elevate Your Gambling Game?</h2>
            <p className="text-xl mb-8">Sign up now to get full access to all our AI gambling tools!</p>
            <Button variant="secondary" size="lg">Get Started</Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

