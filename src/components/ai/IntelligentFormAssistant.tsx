
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface IntelligentFormAssistantProps {
  onClose: () => void;
  onReopen: () => void;
}

export const IntelligentFormAssistant: React.FC<IntelligentFormAssistantProps> = ({
  onClose,
  onReopen
}) => {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState<{role: string; content: string}[]>([
    {
      role: 'assistant',
      content: 'Hello! I\'m your AI assistant for vendor onboarding. How can I help you today? You can ask me questions about any part of the form, and I\'ll provide guidance.'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Add user message to conversation
    const newConversation = [
      ...conversation,
      { role: 'user', content: message }
    ];
    
    setConversation(newConversation);
    setIsLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      // Sample responses based on keywords in user's message
      let responseText = '';
      const lowerCaseMessage = message.toLowerCase();
      
      if (lowerCaseMessage.includes('gstin') || lowerCaseMessage.includes('gst')) {
        responseText = 'GSTIN (Goods and Services Tax Identification Number) is a unique 15-character code assigned to businesses registered under GST. Please ensure you enter a valid GSTIN in the format: 22AAAAA0000A1Z5.';
      } else if (lowerCaseMessage.includes('pan')) {
        responseText = 'PAN (Permanent Account Number) is a 10-character alphanumeric identifier issued by the Income Tax Department. The format is AAAPL1234C, where the first 5 are letters, next 4 are numbers, and the last is a letter.';
      } else if (lowerCaseMessage.includes('aadhaar')) {
        responseText = 'Aadhaar is a 12-digit unique identification number issued by the UIDAI. Please ensure you enter all 12 digits without any spaces or special characters.';
      } else if (lowerCaseMessage.includes('document') || lowerCaseMessage.includes('upload')) {
        responseText = 'For document uploads, please ensure files are in PDF, JPG, or PNG format with a maximum size of 5MB. You\'ll need to upload your GSTIN certificate and may need to upload additional documents based on your business type.';
      } else if (lowerCaseMessage.includes('payment') || lowerCaseMessage.includes('bank')) {
        responseText = 'For payment details, please provide your preferred payment method and bank account information. We support Bank Transfer, PayPal, and Razorpay. Your bank details should include account number and IFSC code for verification.';
      } else if (lowerCaseMessage.includes('address') || lowerCaseMessage.includes('location')) {
        responseText = 'Please provide your complete business address, including street address, city, state, and postal code. This will be used for invoicing and communication purposes.';
      } else {
        responseText = 'Thank you for your question. I\'m here to help with any aspect of the vendor onboarding process. You can ask about GSTIN verification, document requirements, payment terms, or any other part of the application process.';
      }
      
      setConversation([...newConversation, { role: 'assistant', content: responseText }]);
      setIsLoading(false);
      setMessage('');
    }, 1000);
  };

  return (
    <Card className="relative bg-white shadow-md rounded-lg overflow-hidden h-[calc(100vh-14rem)] max-h-[600px] flex flex-col">
      <div className="p-3 bg-indigo-600 text-white flex justify-between items-center">
        <h3 className="font-medium">AI Form Assistant</h3>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-white hover:bg-indigo-700"
          onClick={onClose}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
          <span className="sr-only">Close</span>
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {conversation.map((msg, i) => (
          <div 
            key={i} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] rounded-lg p-3 ${
                msg.role === 'user' 
                  ? 'bg-indigo-100 text-gray-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg p-3 text-gray-800 max-w-[80%]">
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-indigo-600 rounded-full animate-bounce"></div>
                <div className="h-2 w-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="h-2 w-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-3 border-t">
        <div className="flex space-x-2">
          <Input
            placeholder="Ask me anything about the form..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1"
          />
          <Button 
            onClick={handleSendMessage}
            className="bg-indigo-600 hover:bg-indigo-700"
            disabled={!message.trim() || isLoading}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m22 2-7 20-4-9-9-4Z" />
              <path d="M22 2 11 13" />
            </svg>
          </Button>
        </div>
      </div>
    </Card>
  );
};
