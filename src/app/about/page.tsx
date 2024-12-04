import Navbar from '../../components/navbar'
import Footer from '../../components/footer'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Target, Shield, Users } from 'lucide-react'
import Image from 'next/image'

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="bg-primary text-primary-foreground py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About AI Gambling Assistant</h1>
            <p className="text-xl mb-8">Revolutionizing the gambling industry with cutting-edge AI technology</p>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                <p className="text-muted-foreground mb-6">
                  At AI Gambling Assistant, we're on a mission to empower gamblers with advanced AI tools and insights. 
                  We believe in responsible gambling and aim to provide our users with the most accurate and up-to-date 
                  information to make informed decisions.
                </p>
                <Button>Learn More</Button>
              </div>
              <div className="relative h-64 md:h-full">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="AI Gambling Assistant Team"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { icon: Brain, title: "Innovation", description: "Pushing the boundaries of AI in gambling" },
                { icon: Target, title: "Accuracy", description: "Providing precise and reliable predictions" },
                { icon: Shield, title: "Integrity", description: "Promoting responsible and ethical gambling" },
                { icon: Users, title: "Community", description: "Building a supportive network of users" }
              ].map((value, index) => (
                <Card key={index}>
                  <CardContent className="flex flex-col items-center text-center pt-6">
                    <value.icon className="h-12 w-12 mb-4 text-primary" />
                    <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: "Jane Doe", role: "CEO & Founder", image: "/placeholder.svg?height=300&width=300" },
                { name: "John Smith", role: "CTO", image: "/placeholder.svg?height=300&width=300" },
                { name: "Alice Johnson", role: "Head of AI Research", image: "/placeholder.svg?height=300&width=300" }
              ].map((member, index) => (
                <Card key={index}>
                  <CardContent className="flex flex-col items-center text-center pt-6">
                    <div className="relative w-32 h-32 mb-4">
                      <Image
                        src={member.image}
                        alt={member.name}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-full"
                      />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                    <Badge variant="secondary">{member.role}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-primary text-primary-foreground py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Journey</h2>
            <p className="text-xl mb-8">Be part of the AI revolution in gambling. Start using our tools today!</p>
            <Button variant="secondary" size="lg">Get Started</Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

