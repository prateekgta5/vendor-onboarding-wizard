
import { useState, useEffect } from "react";

type FormPersistenceOptions<T> = {
  key: string;
  defaultValues: T;
};

export const useFormPersistence = <T extends Record<string, any>>({ 
  key, 
  defaultValues 
}: FormPersistenceOptions<T>) => {
  const [savedData, setSavedData] = useState<T | null>(null);
  const [hasResumedSession, setHasResumedSession] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);

  // Load saved form data on initial render
  useEffect(() => {
    loadSavedFormData();
  }, []);

  // Save form data to localStorage
  const saveFormData = (data: T, currentStep?: number) => {
    try {
      const formData = {
        data,
        step: currentStep || step,
        timestamp: new Date().toISOString()
      };
      
      localStorage.setItem(key, JSON.stringify(formData));
    } catch (error) {
      console.error("Error saving form data:", error);
    }
  };
  
  // Load saved form data from localStorage
  const loadSavedFormData = () => {
    try {
      const savedData = localStorage.getItem(key);
      
      if (savedData) {
        const { data, step: savedStep } = JSON.parse(savedData);
        
        if (data) {
          setSavedData(data);
          setStep(savedStep || 1);
          setHasResumedSession(true);
          return { data, step: savedStep };
        }
      }
      return null;
    } catch (error) {
      console.error("Error loading saved form data:", error);
      return null;
    }
  };
  
  // Clear saved form data
  const clearSavedFormData = () => {
    localStorage.removeItem(key);
  };

  return {
    savedData,
    hasResumedSession,
    setHasResumedSession,
    step,
    setStep,
    saveFormData,
    clearSavedFormData
  };
};
