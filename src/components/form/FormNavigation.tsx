
import React from "react";
import { Button } from "@/components/ui/button";

interface FormNavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  onSave?: () => void;
  isSubmitting?: boolean;
  isLastStep?: boolean;
}

const FormNavigation: React.FC<FormNavigationProps> = ({
  currentStep,
  totalSteps,
  onNext,
  onPrev,
  onSave,
  isSubmitting = false,
  isLastStep = false
}) => {
  return (
    <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
      <Button
        type="button"
        variant="outline"
        onClick={onPrev}
        disabled={currentStep === 1 || isSubmitting}
      >
        Previous
      </Button>
      
      <div className="flex gap-3">
        {onSave && (
          <Button
            type="button"
            variant="outline"
            onClick={onSave}
            disabled={isSubmitting}
          >
            Save Progress
          </Button>
        )}
        
        <Button
          type="button"
          onClick={onNext}
          className="bg-basecamp-primary hover:bg-basecamp-secondary"
          disabled={isSubmitting}
        >
          {isSubmitting 
            ? "Processing..." 
            : isLastStep 
              ? "Submit" 
              : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default FormNavigation;
