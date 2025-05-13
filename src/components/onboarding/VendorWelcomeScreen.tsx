
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface VendorWelcomeScreenProps {
  onStart: () => void;
}

export const VendorWelcomeScreen: React.FC<VendorWelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <Card className="p-8 shadow-xl bg-white">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <h2 className="text-3xl font-bold mb-2">Welcome to BaseCampMart</h2>
          <p className="text-gray-600 max-w-lg mx-auto">
            Our AI-powered vendor onboarding system will guide you through the process with intelligent 
            suggestions, real-time validation, and automated assistance.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                <path d="m9 12 2 2 4-4"></path>
              </svg>
            </div>
            <h3 className="font-semibold text-lg">Smart Assistance</h3>
            <p className="text-gray-600 text-sm">
              Our AI assistant helps complete your application faster with contextual suggestions.
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
            </div>
            <h3 className="font-semibold text-lg">Real-time Notifications</h3>
            <p className="text-gray-600 text-sm">
              Receive instant updates on your application status and required actions.
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600">
                <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path>
                <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path>
                <path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path>
              </svg>
            </div>
            <h3 className="font-semibold text-lg">Automated Verification</h3>
            <p className="text-gray-600 text-sm">
              Document and information verification happens automatically to speed up approval.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <p className="text-gray-600 mb-4">
            Ready to become a BaseCampMart vendor? Start your application now.
          </p>
          <Button onClick={onStart} size="lg" className="px-8 py-6 text-lg font-medium">
            Start Application
          </Button>
        </div>
      </Card>
    </div>
  );
};
