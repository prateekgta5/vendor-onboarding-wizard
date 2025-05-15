import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { vendorFormSchema, VendorFormSchemaType } from '@/validators/vendorFormValidator';
import { Card } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { StepsIndicator } from './StepsIndicator';
import { vendorFormSteps } from '@/config/vendorFormSteps';
import { WizardStepNavigator } from './WizardStepNavigator';
import { useVendorFormState } from '@/hooks/useVendorFormState';

// Import step components
import { BasicInfoStep } from './steps/BasicInfoStep';
import { GstStep } from './steps/GstStep';
import { KycStep } from './steps/KycStep';
import { ProductionBrandingStep } from './steps/ProductionBrandingStep';
import { WarehousingStep } from './steps/WarehousingStep';
import { BankingStep } from './steps/BankingStep';
import { AgreementStep } from './steps/AgreementStep';
import { SubmissionSuccessStep } from './steps/SubmissionSuccessStep';
import { useToast } from '@/hooks/use-toast';
import { SessionResumeNotice } from './SessionResumeNotice';

export const OnboardingWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const { toast } = useToast();
  
  // Custom hook for form state management with persistence
  const { 
    savedData, 
    saveFormData, 
    clearFormData, 
    hasResumedSession,
    setHasResumedSession
  } = useVendorFormState('vendor_form_data');
  
  // React Hook Form setup with Zod validation
  const form = useForm<VendorFormSchemaType>({
    resolver: zodResolver(vendorFormSchema),
    defaultValues: savedData || {
      business_name: '',
      business_type: [],
      address_street: '',
      address_city: '',
      address_state: '',
      address_pin_code: '',
      address_country: 'India',
      contact_person_name: '',
      email_address: '',
      phone_primary: '',
      phone_primary_verified: false,
      msme_status: false,
      in_house_production: false,
      in_house_branding: false,
      requires_warehousing: false,
      bank_account_type: 'Current',
      payment_method: 'Bank Transfer',
      payment_terms_agreement: true,
      payment_terms_satisfaction: true,
      branding_offer: false,
    }
  });
  
  const { 
    control, 
    handleSubmit, 
    watch, 
    setValue, 
    getValues,
    formState: { errors },
    trigger
  } = form;
  
  // Watch values for conditional fields
  const watchMsmeStatus = watch('msme_status');
  const watchInHouseProduction = watch('in_house_production');
  const watchInHouseBranding = watch('in_house_branding');
  const watchRequiresWarehousing = watch('requires_warehousing');
  const watchBrandingOffer = watch('branding_offer');
  
  // Save form data when fields change
  useEffect(() => {
    const subscription = watch((value) => {
      if (!isFormSubmitted) {
        saveFormData(value as VendorFormSchemaType, currentStep);
      }
    });
    
    return () => subscription.unsubscribe();
  }, [watch, currentStep, isFormSubmitted, saveFormData]);
  
  // Validate current step fields and move to next step
  const goToNextStep = async () => {
    // Get fields to validate for current step
    const fieldsToValidate = getFieldsForStep(currentStep);
    
    // Trigger validation for those fields
    const isValid = await trigger(fieldsToValidate);
    
    if (isValid) {
      if (currentStep < vendorFormSteps.length) {
        setCurrentStep(currentStep + 1);
        // Automatically save progress when advancing to next step
        saveFormData(getValues(), currentStep + 1);
      } else {
        // Final step - submit form
        handleFormSubmission();
      }
    } else {
      // Show validation error toast
      toast({
        title: "Validation Error",
        description: "Please correct the errors before proceeding.",
        variant: "destructive"
      });
    }
  };
  
  // Go to previous step
  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  // Save progress explicitly
  const saveProgress = () => {
    saveFormData(getValues(), currentStep);
    
    toast({
      title: "Progress Saved",
      description: "Your application progress has been saved. You can return to complete it later.",
      variant: "default"
    });
  };
  
  // Handle form submission
  const handleFormSubmission = handleSubmit(async (data) => {
    setIsSubmitting(true);
    
    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log("Form submitted with data:", data);
      
      // Show success message
      toast({
        title: "Application Submitted",
        description: "Your vendor application has been submitted successfully!",
      });
      
      // Clear saved form data
      clearFormData();
      
      // Show success step
      setIsFormSubmitted(true);
    } catch (error) {
      toast({
        title: "Submission Error",
        description: "An error occurred while submitting your application. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  });
  
  // Return fields that should be validated for each step
  const getFieldsForStep = (step: number): (keyof VendorFormSchemaType)[] => {
    switch (step) {
      case 1: // Basic Info
        return [
          'business_name',
          'business_type',
          'address_street',
          'address_city',
          'address_state',
          'address_pin_code',
          'address_country',
          'contact_person_name',
          'email_address',
          'phone_primary',
          'phone_primary_verified',
        ];
      case 2: // MSME & GST
        return ['gstin'];
      case 3: // KYC
        return [];
      case 4: // Production & Branding
        return [];
      case 5: // Warehousing
        return [];
      case 6: // Banking & Payment
        return [
          'bank_account_type',
          'account_number',
          'bank_name',
          'ifsc_code',
          'payment_method',
          'payment_terms_agreement',
          'payment_terms_satisfaction',
        ];
      case 7: // Agreement
        return ['agreement_terms'];
      default:
        return [];
    }
  };
  
  // Render success step after form submission
  if (isFormSubmitted) {
    return <SubmissionSuccessStep />;
  }
  
  // Render current step
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <BasicInfoStep control={control} errors={errors} />;
      case 2:
        return (
          <GstStep 
            control={control} 
            errors={errors} 
            watchMsmeStatus={watchMsmeStatus} 
          />
        );
      case 3:
        return <KycStep control={control} />;
      case 4:
        return (
          <ProductionBrandingStep 
            control={control} 
            watchInHouseProduction={watchInHouseProduction}
            watchInHouseBranding={watchInHouseBranding}
          />
        );
      case 5:
        return (
          <WarehousingStep 
            control={control} 
            watchRequiresWarehousing={watchRequiresWarehousing} 
          />
        );
      case 6:
        return <BankingStep control={control} errors={errors} />;
      case 7:
        return (
          <AgreementStep 
            control={control} 
            errors={errors} 
            watchBrandingOffer={watchBrandingOffer} 
          />
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Steps indicator */}
      <StepsIndicator 
        steps={vendorFormSteps} 
        currentStep={currentStep} 
      />
      
      {/* Session resume notification */}
      {hasResumedSession && (
        <SessionResumeNotice 
          onDismiss={() => setHasResumedSession(false)} 
        />
      )}
      
      {/* Form card */}
      <Card className="mt-6 p-6 shadow-lg">
        <Form {...form}>
          <form>
            {/* Current step content */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">{vendorFormSteps[currentStep - 1]}</h2>
              {renderCurrentStep()}
            </div>
            
            {/* Navigation controls */}
            <WizardStepNavigator 
              currentStep={currentStep}
              totalSteps={vendorFormSteps.length}
              onPrevious={goToPreviousStep}
              onNext={goToNextStep}
              onSave={saveProgress}
              isSubmitting={isSubmitting}
              isLastStep={currentStep === vendorFormSteps.length}
            />
          </form>
        </Form>
      </Card>
    </div>
  );
};
