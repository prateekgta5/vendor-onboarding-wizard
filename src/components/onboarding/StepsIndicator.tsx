
import React from 'react';

interface StepsIndicatorProps {
  steps: string[];
  currentStep: number;
}

export const StepsIndicator: React.FC<StepsIndicatorProps> = ({ steps, currentStep }) => {
  return (
    <div className="w-full py-4">
      <div className="flex justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          
          return (
            <div key={step} className={`step-item ${isActive || isCompleted ? 'active' : ''}`}>
              <div className={`step ${isActive ? 'active' : ''} ${isCompleted ? 'complete' : ''}`}>
                {isCompleted ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                ) : (
                  stepNumber
                )}
              </div>
              <p className="text-xs mt-1 font-medium hidden sm:block">
                {step}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
