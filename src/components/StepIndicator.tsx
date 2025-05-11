
import React from "react";
import { Check } from "lucide-react";

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center justify-between w-full py-4 px-2">
      {steps.map((step, i) => (
        <div
          key={i}
          className={`step-item ${currentStep === i + 1 ? "active" : ""} ${
            currentStep > i + 1 ? "complete" : ""
          }`}
        >
          <div className={`step ${currentStep === i + 1 ? "active" : ""} ${
            currentStep > i + 1 ? "complete" : ""
          }`}>
            {currentStep > i + 1 ? <Check size={18} /> : i + 1}
          </div>
          <p className="text-xs mt-1 text-center whitespace-nowrap">{step}</p>
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;
