"use client"

import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Bot, User } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
}

const exampleMessages: Message[] = [
  { id: 1, text: "Hello! How can I assist you today?", sender: 'ai' },
  { id: 2, text: "I need help with my project.", sender: 'user' },
  { id: 3, text: "Sure, I'd be happy to help. What kind of project are you working on?", sender: 'ai' },
]

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return

    const newUserMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
    }

    const newAiMessage: Message = {
      id: messages.length + 2,
      text: "I'm creating a strategy for you!",
      sender: 'ai',
    }

    setMessages([...messages, newUserMessage, newAiMessage])
    setInputMessage('')
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-lg overflow-hidden">
      <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
        <AnimatePresence initial={false}>
          {messages.length === 0 ? (
            exampleMessages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))
          ) : (
            messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))
          )}
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
              if (e.key === 'Enter') {
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
  const isAi = message.sender === 'ai'
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={`flex items-start space-x-2 mb-4 ${isAi ? 'justify-start' : 'justify-end'}`}
    >
      {isAi && (
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
          <Bot className="text-white w-5 h-5" />
        </div>
      )}
      <div
        className={`max-w-[80%] p-3 rounded-lg ${
          isAi
            ? 'bg-blue-500 text-white'
            : 'bg-white text-gray-800 dark:bg-gray-700 dark:text-white'
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

