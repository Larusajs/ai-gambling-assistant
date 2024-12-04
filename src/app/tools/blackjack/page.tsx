import ChatInterface from '@/components/chat-interface'

export default function ChatPage() {
  return (
    <div className="container mx-auto px-4 py-8 h-[calc(100vh-4rem)] flex flex-col">
      <div className="flex-grow">
        <ChatInterface />
      </div>
    </div>
  )
}

