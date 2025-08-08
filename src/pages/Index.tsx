import { useState } from "react";
import { AIModelSelector } from "@/components/AIModelSelector";
import { FileUploadZone } from "@/components/FileUploadZone";
import { ChatInterface } from "@/components/ChatInterface";
import { CyberButton } from "@/components/ui/cyber-button";
import { Zap, Brain, Code, Palette, Bot } from "lucide-react";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  content?: string;
}

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const Index = () => {
  const [selectedModel, setSelectedModel] = useState("claude-sonnet-4");
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFilesUploaded = (files: UploadedFile[]) => {
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const handleRemoveFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: crypto.randomUUID(),
      type: 'user',
      content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: crypto.randomUUID(),
        type: 'assistant',
        content: `I understand you want to: "${content}"\n\nI'm ready to help you create amazing content! With the NeoGlass AI system, I can:\n\n• Generate complete eBooks with chapters\n• Create illustrated comics with storylines\n• Build functional websites and apps\n• Develop bots and automation scripts\n• Fix and improve your code\n\nPlease specify what type of content you'd like me to create, and I'll get started right away!`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background cyber-grid p-4">
      {/* Header */}
      <header className="glass-panel rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-neon flex items-center justify-center neon-glow">
              <Zap className="h-6 w-6 text-background" />
            </div>
            <div>
              <h1 className="text-3xl font-cyber text-neon-cyan">NeoGlass AI</h1>
              <p className="text-muted-foreground">Multifunctional AI-Powered Creation Studio</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse"></div>
              System Online
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* AI Model Selection */}
        <div className="glass-panel rounded-lg p-6">
          <h2 className="text-xl font-cyber text-neon-cyan mb-4 flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Engine
          </h2>
          <AIModelSelector
            selectedModel={selectedModel}
            onModelChange={setSelectedModel}
          />
        </div>

        {/* Quick Actions */}
        <div className="glass-panel rounded-lg p-6">
          <h2 className="text-xl font-cyber text-neon-cyan mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-2">
            <CyberButton variant="outline" size="sm" className="h-auto py-3 flex-col gap-1">
              <Palette className="h-4 w-4" />
              <span className="text-xs">Comic</span>
            </CyberButton>
            <CyberButton variant="outline" size="sm" className="h-auto py-3 flex-col gap-1">
              <Code className="h-4 w-4" />
              <span className="text-xs">Website</span>
            </CyberButton>
            <CyberButton variant="outline" size="sm" className="h-auto py-3 flex-col gap-1">
              <Bot className="h-4 w-4" />
              <span className="text-xs">Bot</span>
            </CyberButton>
            <CyberButton variant="outline" size="sm" className="h-auto py-3 flex-col gap-1">
              <Brain className="h-4 w-4" />
              <span className="text-xs">eBook</span>
            </CyberButton>
          </div>
        </div>

        {/* File Upload */}
        <div className="glass-panel rounded-lg p-6">
          <h2 className="text-xl font-cyber text-neon-cyan mb-4">File Processing</h2>
          <FileUploadZone
            onFilesUploaded={handleFilesUploaded}
            uploadedFiles={uploadedFiles}
            onRemoveFile={handleRemoveFile}
          />
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="h-[600px]">
        <ChatInterface
          selectedModel={selectedModel}
          onSendMessage={handleSendMessage}
          messages={messages}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default Index;
