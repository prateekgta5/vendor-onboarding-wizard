
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface IntelligentFormAssistantProps {
  onClose: () => void;
  onReopen: () => void;
}

export const IntelligentFormAssistant: React.FC<IntelligentFormAssistantProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your AI assistant for the vendor onboarding process. I can help with form completion, answer questions, and provide suggestions. How can I help you today?',
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsThinking(true);
    
    // Simulate AI response (in a real implementation, this would call an AI service)
    setTimeout(() => {
      const aiResponses: {[key: string]: string} = {
        'gst': 'GST (Goods and Services Tax) registration is required for vendors with annual turnover exceeding ₹20 lakhs (₹10 lakhs for special category states). You'll need to provide your 15-character GSTIN which we can verify automatically.',
        'msme': 'MSME registration offers benefits like easier access to credit, protection against delayed payments, and various government schemes. It\'s not mandatory but highly recommended.',
        'documents': 'You\'ll need to upload: 1) Business PAN Card, 2) GST Certificate, 3) Bank Account details with canceled cheque, 4) Owner\'s ID proof, and 5) Business address proof.',
        'payment': 'We typically process payments within 7-14 days after order fulfillment verification. You can choose between bank transfers, digital wallets, or other payment methods during setup.',
        'help': 'I can help you with understanding form requirements, document verification, explaining business terms, and provide guidance on optimizing your vendor profile. Just ask me any question!'
      };

      let aiResponse = 'I\'ll help you with that. Please provide more details about your business needs or check the form instructions for guidance.';
      
      // Simple keyword matching (would be more sophisticated in a real AI implementation)
      for (const [keyword, response] of Object.entries(aiResponses)) {
        if (input.toLowerCase().includes(keyword)) {
          aiResponse = response;
          break;
        }
      }
      
      const assistantMessage: Message = {
        id: Date.now().toString(),
        content: aiResponse,
        sender: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsThinking(false);
    }, 1000);
  };

  return (
    <Card className="h-[600px] flex flex-col bg-white shadow-xl overflow-hidden">
      <div className="bg-indigo-600 text-white p-3 flex justify-between items-center">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <path d="M12 8V4H8"></path>
            <rect width="16" height="12" x="4" y="8" rx="2"></rect>
            <path d="M2 14h2"></path>
            <path d="M20 14h2"></path>
            <path d="M15 13v2"></path>
            <path d="M9 13v2"></path>
          </svg>
          <span className="font-medium">AI Assistant</span>
        </div>
        <button onClick={onClose} className="text-white hover:text-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.map(message => (
          <div 
            key={message.id}
            className={`mb-4 max-w-[85%] ${message.sender === 'assistant' ? 'mr-auto' : 'ml-auto'}`}
          >
            <div className={`p-3 rounded-lg ${
              message.sender === 'assistant' 
                ? 'bg-white border border-gray-200' 
                : 'bg-indigo-600 text-white'
            }`}>
              {message.content}
            </div>
            <div className={`text-xs mt-1 text-gray-500 ${
              message.sender === 'user' ? 'text-right' : ''
            }`}>
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        ))}
        {isThinking && (
          <div className="mb-4 max-w-[85%] mr-auto">
            <div className="bg-white border border-gray-200 p-3 rounded-lg flex space-x-2">
              <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
              <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-3 border-t">
        <div className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask me anything about the vendor process..."
            className="flex-1 border rounded-l-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Button 
            onClick={handleSendMessage}
            disabled={isThinking || !input.trim()}
            className="rounded-l-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m22 2-7 20-4-9-9-4Z"></path>
              <path d="M22 2 11 13"></path>
            </svg>
          </Button>
        </div>
        <div className="mt-2 text-xs text-gray-500 text-center">
          Ask about GST, MSME benefits, required documents, or any vendor-related questions
        </div>
      </div>
    </Card>
  );
};
