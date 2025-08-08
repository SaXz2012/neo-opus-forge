import { useState } from "react";
import {
  CyberSelect,
  CyberSelectContent,
  CyberSelectItem,
  CyberSelectTrigger,
  CyberSelectValue,
} from "@/components/ui/cyber-select";
import { Cpu, Zap, Brain, Sparkles } from "lucide-react";

interface AIModel {
  id: string;
  name: string;
  provider: string;
  icon: React.ReactNode;
  description: string;
}

const aiModels: AIModel[] = [
  {
    id: "claude-sonnet-4",
    name: "Claude Sonnet 4.0",
    provider: "Anthropic",
    icon: <Brain className="h-4 w-4" />,
    description: "Latest reasoning model"
  },
  {
    id: "claude-opus-4",
    name: "Claude Opus 4.0", 
    provider: "Anthropic",
    icon: <Sparkles className="h-4 w-4" />,
    description: "Most capable model"
  },
  {
    id: "claude-opus-41",
    name: "Claude Opus 4.1",
    provider: "Anthropic", 
    icon: <Sparkles className="h-4 w-4" />,
    description: "Enhanced version"
  },
  {
    id: "gemini",
    name: "Gemini",
    provider: "Google",
    icon: <Zap className="h-4 w-4" />,
    description: "Multimodal AI"
  },
  {
    id: "deepseek",
    name: "DeepSeek",
    provider: "DeepSeek",
    icon: <Cpu className="h-4 w-4" />,
    description: "Coding specialist"
  },
  {
    id: "chatgpt-5",
    name: "ChatGPT 5",
    provider: "OpenAI",
    icon: <Brain className="h-4 w-4" />,
    description: "Latest GPT model"
  },
  {
    id: "chatgpt-5-v2",
    name: "ChatGPT 5 v2",
    provider: "OpenAI",
    icon: <Brain className="h-4 w-4" />,
    description: "Enhanced version"
  },
  {
    id: "chatgpt-4",
    name: "ChatGPT 4",
    provider: "OpenAI",
    icon: <Cpu className="h-4 w-4" />,
    description: "Previous generation"
  }
];

interface AIModelSelectorProps {
  selectedModel: string;
  onModelChange: (modelId: string) => void;
}

export const AIModelSelector = ({ selectedModel, onModelChange }: AIModelSelectorProps) => {
  const selectedModelData = aiModels.find(model => model.id === selectedModel);

  return (
    <div className="space-y-2">
      <label className="text-sm font-cyber text-neon-cyan">AI Model</label>
      <CyberSelect value={selectedModel} onValueChange={onModelChange}>
        <CyberSelectTrigger className="w-full">
          <div className="flex items-center gap-2">
            {selectedModelData?.icon}
            <CyberSelectValue placeholder="Select AI Model" />
          </div>
        </CyberSelectTrigger>
        <CyberSelectContent>
          {aiModels.map((model) => (
            <CyberSelectItem key={model.id} value={model.id}>
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  {model.icon}
                  <div>
                    <div className="font-medium">{model.name}</div>
                    <div className="text-xs text-muted-foreground">{model.provider}</div>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">{model.description}</div>
              </div>
            </CyberSelectItem>
          ))}
        </CyberSelectContent>
      </CyberSelect>
    </div>
  );
};