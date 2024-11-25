import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const tools = [
  {
    name: "Blackjack Assistant",
    description: "Get real-time advice on the best moves to make in blackjack.",
    href: "/tools/blackjack"
  },
    {
        name: "Poker Assistant",
        description: "Analyze your poker hands and get advice on the best plays.",
        href: "/tools/poker"
    },
    {
        name: "Roulette Assistant",
        description: "Predict the outcome of roulette spins using machine learning.",
        href: "/tools/roulette"
    },
    {
        name: "Backgammon Assistant",
        description: "Get advice on the best moves to make in backgammon.",
        href: "/tools/backgammon"
    },
]

export default function AIToolsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {tools.map((tool) => (
        <Card key={tool.name} className="flex flex-col">
          <CardHeader>
            <CardTitle>{tool.name}</CardTitle>
            <CardDescription>{tool.description}</CardDescription>
          </CardHeader>
          <CardFooter className="mt-auto">
            <Button asChild className="w-full">
              <a href={tool.href}>Get Strategy</a>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

