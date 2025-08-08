// AI Service for handling API calls
// In production, these should be called via Supabase Edge Functions for security

interface AIConfig {
  endpoint: string;
  headers: Record<string, string>;
}

// API configurations for different models
const AI_CONFIGS: Record<string, AIConfig> = {
  'claude-sonnet-4': {
    endpoint: 'https://api.anthropic.com/v1/messages',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': '', // Will be set from Supabase secrets
      'anthropic-version': '2023-06-01'
    }
  },
  'claude-opus-4': {
    endpoint: 'https://api.anthropic.com/v1/messages',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': '', // Will be set from Supabase secrets
      'anthropic-version': '2023-06-01'
    }
  },
  'claude-opus-41': {
    endpoint: 'https://api.anthropic.com/v1/messages',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': '', // Will be set from Supabase secrets
      'anthropic-version': '2023-06-01'
    }
  },
  'gemini': {
    endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
    headers: {
      'Content-Type': 'application/json'
    }
  },
  'deepseek': {
    endpoint: 'https://api.deepseek.com/v1/chat/completions',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': '', // Will be set from Supabase secrets
    }
  },
  'chatgpt-5': {
    endpoint: 'https://api.openai.com/v1/chat/completions',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': '', // Will be set from Supabase secrets
    }
  },
  'chatgpt-5-v2': {
    endpoint: 'https://api.openai.com/v1/chat/completions',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': '', // Will be set from Supabase secrets
    }
  },
  'chatgpt-4': {
    endpoint: 'https://api.openai.com/v1/chat/completions',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': '', // Will be set from Supabase secrets
    }
  }
};

// For development: temporary API keys (should be moved to Supabase secrets)
const TEMP_API_KEYS = {
  'claude-sonnet-4': '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',
  'claude-opus-4': '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',
  'claude-opus-41': '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',
  'gemini': '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',
  'deepseek': 'sk-or-v1-958295610b26a53c1066f142d33bf0ae49f01f452464fb9229815713ed67acb',
  'chatgpt-5': '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',
  'chatgpt-5-v2': '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',
  'chatgpt-4': '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'
};

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export const sendMessage = async (modelId: string, messages: ChatMessage[]): Promise<string> => {
  const config = AI_CONFIGS[modelId];
  if (!config) {
    throw new Error(`Unsupported model: ${modelId}`);
  }

  // For development, use temp keys
  // In production, this should call a Supabase Edge Function
  const headers = { ...config.headers };
  
  if (modelId.includes('claude')) {
    headers['x-api-key'] = TEMP_API_KEYS[modelId];
  } else if (modelId.includes('chatgpt')) {
    headers['Authorization'] = `Bearer ${TEMP_API_KEYS[modelId]}`;
  } else if (modelId === 'deepseek') {
    headers['Authorization'] = `Bearer ${TEMP_API_KEYS[modelId]}`;
  }

  try {
    // Format request based on model type
    let requestBody: any;
    
    if (modelId.includes('claude')) {
      requestBody = {
        model: modelId,
        max_tokens: 1024,
        messages: messages.map(msg => ({
          role: msg.role,
          content: msg.content
        }))
      };
    } else if (modelId.includes('chatgpt') || modelId === 'deepseek') {
      requestBody = {
        model: modelId,
        messages: messages,
        max_tokens: 1024
      };
    } else if (modelId === 'gemini') {
      requestBody = {
        contents: [{
          parts: [{ text: messages[messages.length - 1].content }]
        }]
      };
      headers['x-goog-api-key'] = TEMP_API_KEYS[modelId];
    }

    const response = await fetch(config.endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    
    // Extract response based on model type
    if (modelId.includes('claude')) {
      return data.content[0].text;
    } else if (modelId.includes('chatgpt') || modelId === 'deepseek') {
      return data.choices[0].message.content;
    } else if (modelId === 'gemini') {
      return data.candidates[0].content.parts[0].text;
    }
    
    return 'Response received successfully';
  } catch (error) {
    console.error('AI API Error:', error);
    throw error;
  }
};

// TODO: Move to Supabase Edge Function for production
export const callAIViaEdgeFunction = async (modelId: string, messages: ChatMessage[]): Promise<string> => {
  // This would call a Supabase Edge Function that handles the API keys securely
  // Example implementation:
  /*
  const { data, error } = await supabase.functions.invoke('ai-chat', {
    body: { modelId, messages }
  });
  
  if (error) throw error;
  return data.response;
  */
  
  // For now, fallback to direct API call
  return sendMessage(modelId, messages);
};