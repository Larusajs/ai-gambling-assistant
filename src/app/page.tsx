import Navbar from '../components/navbar'
import AIToolsGrid from '../components/ai-tools-grid'
import Footer from '../components/footer'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-background text-foreground py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">AI Gambling Assistant</h1>
            <p className="text-xl mb-8 text-muted-foreground">Make smarter bets with the power of AI</p>
            <Button asChild size="lg">
              <Link href="#features">Learn More</Link>
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {['Predictive Analytics', 'Risk Assessment', 'Personalized Strategies'].map((feature, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{feature}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary text-primary-foreground py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Elevate Your Gambling Game?</h2>
            <p className="text-xl mb-8">Join now and get access to our cutting-edge AI tools!</p>
            <Button asChild size="lg" variant="secondary">
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

