import Navbar from '../components/navbar'
import AIToolsGrid from '../components/ai-tools-grid'
import Footer from '../components/footer'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">AI Gambling Assistant</h1>
        <AIToolsGrid />
      </main>
      <Footer />
    </div>
  )
}