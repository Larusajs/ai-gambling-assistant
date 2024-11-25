"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Bot, User } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { createOpenAI } from "@ai-sdk/openai"
import { generateText } from "ai"

interface Message {
  id: number
  text: string
  sender: "user" | "ai"
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const openAI = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const handleSendMessage = async () => {
    if (inputMessage.trim() === "") return
  
    const newUserMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
    }
  
    setMessages((prev) => [...prev, newUserMessage])
    setInputMessage("")
  
    try {
      // OpenAI API'ye bağlanarak cevap alın
      const { text } = await generateText({
        model: openAI("gpt-4-turbo"),
        prompt:
          messages
            .map(
              (msg) =>
                `${msg.sender === "user" ? "User:" : "AI:"} ${msg.text}`
            )
            .join("\n") + `\nUser: ${inputMessage}\nAI:`, // Tek bir string oluşturuldu
      })
  
      const aiMessage: Message = {
        id: messages.length + 2,
        text: text.trim(),
        sender: "ai",
      }
  
      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error("Error fetching OpenAI response:", error)
    }
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-lg overflow-hidden">
      <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
        </AnimatePresence>
      </ScrollArea>
      <div className="p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            placeholder="Type your message here..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSendMessage()
              }
            }}
            className="flex-grow"
          />
          <Button onClick={handleSendMessage} size="icon">
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

function MessageBubble({ message }: { message: Message }) {
  const isAi = message.sender === "ai"
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={`flex items-start space-x-2 mb-4 ${isAi ? "justify-start" : "justify-end"}`}
    >
      {isAi && (
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
          <Bot className="text-white w-5 h-5" />
        </div>
      )}
      <div
        className={`max-w-[80%] p-3 rounded-lg ${
          isAi
            ? "bg-blue-500 text-white"
            : "bg-white text-gray-800 dark:bg-gray-700 dark:text-white"
        }`}
      >
        {message.text}
      </div>
      {!isAi && (
        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
          <User className="text-white w-5 h-5" />
        </div>
      )}
    </motion.div>
  )
}