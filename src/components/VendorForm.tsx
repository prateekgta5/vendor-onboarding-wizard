
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { vendorFormSchema, VendorFormSchemaType } from "@/validators/vendorFormValidator";
import { showToast, submitVendorForm, verifyGSTIN } from "@/utils/formUtils";
import { useToast } from "@/hooks/use-toast";
import { useFormPersistence } from "@/hooks/useFormPersistence";

// Import components
import StepIndicator from "./StepIndicator";
import FormNavigation from "./form/FormNavigation";
import SessionResumeNotice from "./form/SessionResumeNotice";
import FormSuccess from "./form/FormSuccess";

// Import form step components
import BasicInfoStep from "./form/steps/BasicInfoStep";
import GstStep from "./form/steps/GstStep";
import KycStep from "./form/steps/KycStep";
import ProductionBrandingStep from "./form/steps/ProductionBrandingStep";
import WarehousingStep from "./form/steps/WarehousingStep";
import BankingStep from "./form/steps/BankingStep";
import AgreementStep from "./form/steps/AgreementStep";

// Key for localStorage
const FORM_STORAGE_KEY = "vendor_form_data";

const VendorForm: React.FC = () => {
  const [isGSTVerifying, setIsGSTVerifying] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { toast } = useToast();
  
  // Define steps
  const steps = [
    "Basic Info",
    "MSME & GST",
    "KYC",
    "Production",
    "Warehousing",
    "Banking",
    "Agreement",
  ];
  
  const defaultValues: Partial<VendorFormSchemaType> = {
    business_name: "",
    business_type: [],
    address_street: "",
    address_city: "",
    address_state: "",
    address_pin_code: "",
    address_country: "India",
    contact_person_name: "",
    email_address: "",
    phone_primary: "",
    phone_primary_verified: false,
    msme_status: false,
    in_house_production: false,
    in_house_branding: false,
    requires_warehousing: false,
    bank_account_type: "Current",
    payment_method: "Bank Transfer",
    payment_terms_agreement: true,
    payment_terms_satisfaction: true,
    branding_offer: false,
    agreement_terms: "I hereby agree that all information provided is accurate and complete. I understand and accept the terms and conditions of BaseCampMart's vendor onboarding process."
  };
  
  // Use form persistence hook
  const { 
    hasResumedSession, 
    setHasResumedSession, 
    step: currentStep, 
    setStep: setCurrentStep, 
    saveFormData, 
    clearSavedFormData 
  } = useFormPersistence<VendorFormSchemaType>({
    key: FORM_STORAGE_KEY,
    defaultValues: defaultValues as VendorFormSchemaType
  });
  
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
    trigger,
    reset
  } = useForm<VendorFormSchemaType>({
    resolver: zodResolver(vendorFormSchema),
    defaultValues,
    mode: "onChange",
  });
  
  // Watch values for conditional rendering
  const watchBusinessType = watch("business_type", []);
  const watchMsmeStatus = watch("msme_status");
  const watchInHouseProduction = watch("in_house_production");
  const watchInHouseBranding = watch("in_house_branding");
  const watchRequiresWarehousing = watch("requires_warehousing");
  const watchBrandingOffer = watch("branding_offer");
  const watchPhonePrimaryVerified = watch("phone_primary_verified");
  const watchPhonePrimary = watch("phone_primary");
  const watchGSTIN = watch("gstin");
  
  // Effect to save form data when fields change
  useEffect(() => {
    const subscription = watch((value) => {
      if (!formSubmitted) {
        saveFormData(value as VendorFormSchemaType, currentStep);
      }
    });
    
    return () => subscription.unsubscribe();
  }, [watch, currentStep, formSubmitted, saveFormData]);
  
  // Save current progress and show message
  const saveProgress = () => {
    const currentData = getValues();
    saveFormData(currentData, currentStep);
    
    showToast(
      "Progress Saved", 
      "Your progress has been saved. You can return to complete the form later.", 
      "success"
    );
  };
  
  // Step navigation functions
  const nextStep = async () => {
    // Validate the current step's fields
    const fieldsToValidate = getFieldsForStep(currentStep);
    const isValid = await trigger(fieldsToValidate as any);
    
    if (isValid) {
      if (currentStep === steps.length) {
        handleFormSubmit();
      } else {
        setCurrentStep(currentStep + 1);
        // Save progress when advancing to next step
        saveFormData(getValues(), currentStep + 1);
      }
    } else {
      // Show errors
      showToast("Validation Error", "Please correct the errors before proceeding", "error");
    }
  };
  
  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };
  
  // Get fields to validate for the current step
  const getFieldsForStep = (step: number): (keyof VendorFormSchemaType)[] => {
    switch (step) {
      case 1: // Basic Info
        return [
          "business_name",
          "business_type",
          "address_street",
          "address_city",
          "address_state",
          "address_pin_code",
          "address_country",
          "contact_person_name",
          "email_address",
          "phone_primary",
          "phone_primary_verified",
        ];
      case 2: // MSME & GST
        return ["gstin"];
      case 3: // KYC
        // File uploads aren't strictly validated
        return [];
      case 4: // Production & Branding
        // Validation depends on conditional fields
        return [];
      case 5: // Warehousing
        // Validation depends on conditional fields
        return [];
      case 6: // Banking & Payment
        return [
          "bank_account_type",
          "account_number",
          "bank_name",
          "ifsc_code",
          "payment_method",
          "payment_terms_agreement",
          "payment_terms_satisfaction",
        ];
      case 7: // Agreement
        return [
          "agreement_terms",
          "digital_signature",
        ];
      default:
        return [];
    }
  };
  
  // Handle form submission
  const handleFormSubmit = handleSubmit(async (data) => {
    setIsSubmitting(true);
    try {
      const result = await submitVendorForm(data);
      if (result.success) {
        showToast("Success", result.message, "success");
        setFormSubmitted(true);
        // Clear saved form data after successful submission
        clearSavedFormData();
      } else {
        showToast("Error", result.message, "error");
      }
    } catch (error) {
      showToast("Error", "An unexpected error occurred. Please try again later.", "error");
    } finally {
      setIsSubmitting(false);
    }
  });
  
  // Phone verification callback
  const handlePhoneVerified = () => {
    setValue("phone_primary_verified", true);
  };
  
  // GSTIN verification
  const handleVerifyGSTIN = async () => {
    const gstin = watchGSTIN;
    if (!gstin || gstin.length !== 15) {
      showToast("Invalid GSTIN", "Please enter a valid 15-character GSTIN", "error");
      return;
    }
    
    setIsGSTVerifying(true);
    try {
      const result = await verifyGSTIN(gstin);
      if (result.valid) {
        setValue("gst_registration_type", result.registrationType || "");
        setValue("gst_tax_slab", result.taxSlab || "");
        setValue("registered_state", result.registeredState || "");
        showToast("GSTIN Verified", "GSTIN verification successful", "success");
      } else {
        showToast("Invalid GSTIN", "The GSTIN could not be verified", "error");
      }
    } catch (error) {
      showToast("Error", "An error occurred while verifying GSTIN", "error");
    } finally {
      setIsGSTVerifying(false);
    }
  };
  
  // If form has been successfully submitted, show success message
  if (formSubmitted) {
    return <FormSuccess />;
  }
  
  // Render current form step
  const renderFormStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicInfoStep 
            control={control} 
            register={register} 
            errors={errors}
            watchPhonePrimary={watchPhonePrimary}
            watchPhonePrimaryVerified={watchPhonePrimaryVerified}
            handlePhoneVerified={handlePhoneVerified}
          />
        );
      case 2:
        return (
          <GstStep 
            control={control} 
            register={register} 
            errors={errors}
            watchMsmeStatus={watchMsmeStatus}
            watchGSTIN={watchGSTIN}
            isGSTVerifying={isGSTVerifying}
            handleVerifyGSTIN={handleVerifyGSTIN}
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
        return (
          <BankingStep 
            control={control} 
            register={register} 
            errors={errors}
          />
        );
      case 7:
        return (
          <AgreementStep 
            control={control} 
            register={register} 
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
      {/* Progress bar */}
      <StepIndicator steps={steps} currentStep={currentStep} />
      
      {/* Session resume notification */}
      {hasResumedSession && (
        <SessionResumeNotice onDismiss={() => setHasResumedSession(false)} />
      )}
      
      <div className="bg-white shadow-md rounded-lg p-6 mt-4">
        <form>
          {/* Current form step */}
          {renderFormStep()}
          
          {/* Form navigation */}
          <FormNavigation 
            currentStep={currentStep}
            totalSteps={steps.length}
            onNext={nextStep}
            onPrev={prevStep}
            onSave={saveProgress}
            isSubmitting={isSubmitting}
            isLastStep={currentStep === steps.length}
          />
        </form>
      </div>
    </div>
  );
};

export default VendorForm;
