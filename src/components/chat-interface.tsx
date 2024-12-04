"use client"

import { useRef, useEffect, useState } from "react"
import { useChat } from "ai/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Bot, User, Upload } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"
import type { Message } from 'ai'
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function ChatInterface() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat()
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const sendAudioRef = useRef<HTMLAudioElement>(null)
  const receiveAudioRef = useRef<HTMLAudioElement>(null)
  const [showVisualCue, setShowVisualCue] = useState(false)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages])

  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      
      if (lastMessage.role === 'user') {
        sendAudioRef.current?.play().catch(error => {
          console.error('Error playing send audio:', error);
          setShowVisualCue(true);
          setTimeout(() => setShowVisualCue(false), 1000);
        });
      } else if (lastMessage.role === 'assistant' && !isLoading) {
        receiveAudioRef.current?.play().catch(error => {
          console.error('Error playing receive audio:', error);
          setShowVisualCue(true);
          setTimeout(() => setShowVisualCue(false), 1000);
        });
      }
    }
  }, [messages, isLoading]);

  return (
    <TooltipProvider>
      <div className="flex flex-col h-screen">
        <Navbar />
        <main className="flex-grow flex flex-col bg-background overflow-hidden">
          <div 
            className="flex-grow overflow-auto px-4 py-6 scroll-smooth" 
            ref={scrollAreaRef}
          >
            <div className="max-w-6xl mx-auto">
              <AnimatePresence initial={false}>
                {messages.map((message) => (
                  <MessageBubble key={message.id} message={message} />
                ))}
              </AnimatePresence>
            </div>
          </div>
          <div className="w-full max-w-6xl mx-auto px-4 py-4">
            <form onSubmit={handleSubmit} className="flex items-center space-x-2">
              <Input
                type="text"
                placeholder="Type your message here..."
                value={input}
                onChange={handleInputChange}
                className="flex-grow"
              />
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button type="button" variant="outline" size="icon" disabled>
                    <Upload className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Under development</p>
                </TooltipContent>
              </Tooltip>
              <Button type="submit" disabled={isLoading}>
                <Send className="h-4 w-4 mr-2" />
                Send
              </Button>
            </form>
          </div>
        </main>
        <Footer />
        <audio ref={sendAudioRef}>
          <source src="/sounds/send.mp3" type="audio/mpeg" />
          <source src="/sounds/send.ogg" type="audio/ogg" />
          Your browser does not support the audio element.
        </audio>
        <audio ref={receiveAudioRef}>
          <source src="/sounds/receive.mp3" type="audio/mpeg" />
          <source src="/sounds/receive.ogg" type="audio/ogg" />
          Your browser does not support the audio element.
        </audio>
        {showVisualCue && (
          <div className="fixed top-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-md shadow-lg">
            New message
          </div>
        )}
      </div>
    </TooltipProvider>
  )
}

function MessageBubble({ message }: { message: Message }) {
  const isAi = message.role === "assistant"
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={`flex items-start space-x-2 mb-4 ${isAi ? "justify-start" : "justify-end"}`}
    >
      {isAi && (
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <Bot className="text-primary-foreground w-5 h-5" />
        </div>
      )}
      <div
        className={`max-w-[80%] p-3 rounded-lg ${
          isAi
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-secondary-foreground"
        }`}
      >
        {message.content}
      </div>
      {!isAi && (
        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
          <User className="text-secondary-foreground w-5 h-5" />
        </div>
      )}
    </motion.div>
  )
}

