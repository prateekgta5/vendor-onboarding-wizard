
import { useState, useEffect } from 'react';
import { VendorFormSchemaType } from '@/validators/vendorFormValidator';

interface UseVendorFormStateReturn {
  savedData: VendorFormSchemaType | null;
  saveFormData: (data: VendorFormSchemaType, step: number) => void;
  clearFormData: () => void;
  hasResumedSession: boolean;
  setHasResumedSession: (value: boolean) => void;
}

export const useVendorFormState = (storageKey: string): UseVendorFormStateReturn => {
  const [savedData, setSavedData] = useState<VendorFormSchemaType | null>(null);
  const [hasResumedSession, setHasResumedSession] = useState(false);
  
  // Load saved data on component mount
  useEffect(() => {
    try {
      const savedForm = localStorage.getItem(storageKey);
      
      if (savedForm) {
        const parsedData = JSON.parse(savedForm);
        setSavedData(parsedData.data);
        setHasResumedSession(true);
      }
    } catch (error) {
      console.error('Error loading saved form data:', error);
    }
  }, [storageKey]);
  
  // Save form data to localStorage
  const saveFormData = (data: VendorFormSchemaType, step: number) => {
    try {
      const saveData = {
        data,
        step,
        timestamp: new Date().toISOString(),
      };
      
      localStorage.setItem(storageKey, JSON.stringify(saveData));
    } catch (error) {
      console.error('Error saving form data:', error);
    }
  };
  
  // Clear saved form data
  const clearFormData = () => {
    try {
      localStorage.removeItem(storageKey);
      setSavedData(null);
    } catch (error) {
      console.error('Error clearing form data:', error);
    }
  };
  
  return {
    savedData,
    saveFormData,
    clearFormData,
    hasResumedSession,
    setHasResumedSession,
  };
};
