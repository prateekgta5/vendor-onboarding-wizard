
import React, { useState } from 'react';
import { OnboardingWizard } from './onboarding/OnboardingWizard';
import { VendorWelcomeScreen } from './onboarding/VendorWelcomeScreen';
import { IntelligentFormAssistant } from './ai/IntelligentFormAssistant';

export const VendorOnboardingSystem: React.FC = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const [showAssistant, setShowAssistant] = useState(true);

  return (
    <div className="relative">
      {!hasStarted ? (
        <VendorWelcomeScreen onStart={() => setHasStarted(true)} />
      ) : (
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <OnboardingWizard />
          </div>
          
          {showAssistant && (
            <div className="md:w-80 w-full">
              <IntelligentFormAssistant 
                onClose={() => setShowAssistant(false)}
                onReopen={() => setShowAssistant(true)}
              />
            </div>
          )}
          
          {!showAssistant && (
            <button 
              onClick={() => setShowAssistant(true)}
              className="fixed bottom-4 right-4 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
              aria-label="Open AI Assistant"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 8V4H8"></path>
                <rect width="16" height="12" x="4" y="8" rx="2"></rect>
                <path d="M2 14h2"></path>
                <path d="M20 14h2"></path>
                <path d="M15 13v2"></path>
                <path d="M9 13v2"></path>
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
};
