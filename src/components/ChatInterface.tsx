import { useState, useRef, useEffect } from "react";
import { Send, Zap, Settings, Download } from "lucide-react";
import { CyberButton } from "@/components/ui/cyber-button";
import { CyberInput } from "@/components/ui/cyber-input";

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  selectedModel: string;
  onSendMessage: (message: string) => void;
  messages: Message[];
  isLoading: boolean;
}

export const ChatInterface = ({ selectedModel, onSendMessage, messages, isLoading }: ChatInterfaceProps) => {
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput("");
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="glass-panel rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-neon-cyan animate-pulse"></div>
            <div>
              <h3 className="font-cyber text-neon-cyan">NeoGlass AI Assistant</h3>
              <p className="text-sm text-muted-foreground">Model: {selectedModel}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <CyberButton variant="ghost" size="icon">
              <Settings className="h-4 w-4" />
            </CyberButton>
            <CyberButton variant="ghost" size="icon">
              <Download className="h-4 w-4" />
            </CyberButton>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 glass-panel rounded-lg p-4 overflow-y-auto space-y-4 scan-lines">
        {messages.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-cyber flex items-center justify-center">
              <Zap className="h-8 w-8 text-neon-cyan pulse-neon" />
            </div>
            <h3 className="text-lg font-cyber text-neon-cyan mb-2">Ready to Generate</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Start creating comics, eBooks, websites, or ask me to fix your code. 
              Upload files for project updates and AI-powered improvements.
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  message.type === 'user'
                    ? 'bg-gradient-neon text-background'
                    : 'glass-panel text-glass-foreground'
                }`}
              >
                <div className="whitespace-pre-wrap">{message.content}</div>
                <div className={`text-xs mt-2 opacity-70 ${
                  message.type === 'user' ? 'text-background/70' : 'text-muted-foreground'
                }`}>
                  {formatTime(message.timestamp)}
                </div>
              </div>
            </div>
          ))
        )}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="glass-panel rounded-lg p-4 text-glass-foreground">
              <div className="flex items-center gap-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-neon-cyan rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-neon-cyan rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-neon-cyan rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-sm text-muted-foreground">AI is thinking...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="glass-panel rounded-lg p-4">
          <div className="flex gap-3">
            <CyberInput
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me to create comics, eBooks, websites, fix code, or upload files for AI improvements..."
              className="flex-1"
              disabled={isLoading}
            />
            <CyberButton 
              type="submit" 
              variant="neon" 
              disabled={!input.trim() || isLoading}
            >
              <Send className="h-4 w-4" />
            </CyberButton>
          </div>
          
          <div className="flex gap-2 mt-3">
            <CyberButton variant="ghost" size="sm" type="button">
              📚 Create eBook
            </CyberButton>
            <CyberButton variant="ghost" size="sm" type="button">
              🎨 Generate Comic
            </CyberButton>
            <CyberButton variant="ghost" size="sm" type="button">
              🌐 Build Website
            </CyberButton>
            <CyberButton variant="ghost" size="sm" type="button">
              🤖 Create Bot
            </CyberButton>
          </div>
        </div>
      </form>
    </div>
  );
};