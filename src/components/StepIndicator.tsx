
import React from "react";
import { Check } from "lucide-react";

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center justify-between w-full py-4 px-2 mb-4 overflow-x-auto">
      {steps.map((step, i) => (
        <div
          key={i}
          className={`step-item relative flex flex-col items-center ${
            i !== steps.length - 1 ? "flex-1" : ""
          }`}
        >
          {/* Connector line */}
          {i !== steps.length - 1 && (
            <div
              className={`absolute top-4 h-[2px] left-[50%] right-0 -translate-y-1/2 w-full ${
                currentStep > i + 1 ? "bg-basecamp-primary" : "bg-gray-200"
              }`}
            ></div>
          )}
          
          {/* Step circle */}
          <div
            className={`z-10 flex items-center justify-center w-8 h-8 rounded-full font-medium text-sm transition-all duration-300 ${
              currentStep > i + 1
                ? "bg-basecamp-primary text-white"
                : currentStep === i + 1
                ? "bg-basecamp-primary text-white ring-4 ring-basecamp-primary/30"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            {currentStep > i + 1 ? <Check size={18} /> : i + 1}
          </div>
          
          {/* Step label */}
          <p className={`text-xs mt-1 text-center font-medium transition-colors ${
            currentStep === i + 1 ? "text-basecamp-primary" : 
            currentStep > i + 1 ? "text-basecamp-primary/80" : "text-gray-500"
          }`}>
            {step}
          </p>
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;
