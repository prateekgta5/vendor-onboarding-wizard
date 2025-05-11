import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { vendorFormSchema, VendorFormSchemaType } from "@/validators/vendorFormValidator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { indianStates, showToast, submitVendorForm, verifyGSTIN } from "@/utils/formUtils";
import StepIndicator from "./StepIndicator";
import OTPVerification from "./OTPVerification";
import FileUpload from "./FileUpload";
import { VendorFormData } from "@/types/vendorForm";
import { useToast } from "@/hooks/use-toast";

// Key for localStorage
const FORM_STORAGE_KEY = "vendor_form_data";

const VendorForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isGSTVerifying, setIsGSTVerifying] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [hasResumedSession, setHasResumedSession] = useState<boolean>(false);
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
    payment_terms_agreement: false, // Fix: Changed from true to false to match type
    payment_terms_satisfaction: false, // Fix: Changed from true to false to match type
    branding_offer: false,
    agreement_terms: "I hereby agree that all information provided is accurate and complete. I understand and accept the terms and conditions of BaseCampMart's vendor onboarding process."
  };
  
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    reset,
    formState: { errors },
    trigger,
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
  
  // Effect to load saved form data on initial render
  useEffect(() => {
    loadSavedFormData();
  }, []);

  // Effect to save form data when fields change
  useEffect(() => {
    const subscription = watch((value) => {
      saveFormData(value as VendorFormSchemaType);
    });
    
    return () => subscription.unsubscribe();
  }, [watch]);

  // Save form data to localStorage
  const saveFormData = (data: VendorFormSchemaType) => {
    try {
      // Don't save if the form has been submitted
      if (formSubmitted) return;
      
      const formData = {
        data,
        step: currentStep,
        timestamp: new Date().toISOString()
      };
      
      localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(formData));
    } catch (error) {
      console.error("Error saving form data:", error);
    }
  };
  
  // Load saved form data from localStorage
  const loadSavedFormData = () => {
    try {
      const savedData = localStorage.getItem(FORM_STORAGE_KEY);
      
      if (savedData) {
        const { data, step } = JSON.parse(savedData);
        
        if (data) {
          // Reset form with saved data
          reset(data);
          setCurrentStep(step || 1);
          setHasResumedSession(true);
          
          showToast("Form Resumed", "Your previous progress has been loaded.", "success");
        }
      }
    } catch (error) {
      console.error("Error loading saved form data:", error);
    }
  };
  
  // Clear saved form data
  const clearSavedFormData = () => {
    localStorage.removeItem(FORM_STORAGE_KEY);
  };
  
  // Save current progress and show message
  const saveProgress = () => {
    const currentData = getValues();
    saveFormData(currentData);
    
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
        setCurrentStep((prev) => prev + 1);
        // Save progress when advancing to next step
        saveFormData(getValues());
      }
    } else {
      // Show errors
      showToast("Validation Error", "Please correct the errors before proceeding", "error");
    }
  };
  
  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
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
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Registration Successful!</h2>
        <p className="text-gray-600 mb-6">
          Thank you for registering as a vendor with BaseCampMart. Our team will review your application and contact you shortly.
        </p>
        <Button 
          className="bg-basecamp-primary hover:bg-basecamp-secondary"
          onClick={() => window.location.reload()}
        >
          Register Another Vendor
        </Button>
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Progress bar */}
      <StepIndicator steps={steps} currentStep={currentStep} />
      
      {/* Session resume notification */}
      {hasResumedSession && (
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-4 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-blue-500 mr-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <h3 className="font-medium text-blue-700">Session Resumed</h3>
            <p className="text-sm text-blue-600">
              Your previous progress has been restored. You can continue from where you left off.
            </p>
          </div>
          <button 
            className="ml-auto text-sm text-blue-700 hover:text-blue-900"
            onClick={() => setHasResumedSession(false)}
          >
            Dismiss
          </button>
        </div>
      )}
      
      <div className="bg-white shadow-md rounded-lg p-6 mt-4">
        <form>
          {/* Step 1: Basic Vendor Information */}
          <div className={`form-section ${currentStep === 1 ? "visible" : "hidden"}`}>
            <h2 className="text-xl font-semibold mb-6">Basic Vendor Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <Label htmlFor="business_name">Business Name *</Label>
                <Input
                  id="business_name"
                  {...register("business_name")}
                  placeholder="Enter your business name"
                />
                {errors.business_name && (
                  <p className="text-sm text-red-500">{errors.business_name.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label>Business Type *</Label>
                <div className="flex flex-col gap-2">
                  <Controller
                    control={control}
                    name="business_type"
                    render={({ field }) => (
                      <>
                        {["Manufacturer", "Corporate Gifting", "Reseller", "Wholesaler", "Other"].map((type) => (
                          <div className="flex items-center space-x-2" key={type}>
                            <Checkbox
                              id={`business_type_${type}`}
                              checked={field.value?.includes(type as any)}
                              onCheckedChange={(checked) => {
                                const currentValues = [...(field.value || [])];
                                if (checked) {
                                  field.onChange([...currentValues, type]);
                                } else {
                                  field.onChange(
                                    currentValues.filter((value) => value !== type)
                                  );
                                }
                              }}
                            />
                            <Label htmlFor={`business_type_${type}`} className="font-normal">
                              {type}
                            </Label>
                          </div>
                        ))}
                      </>
                    )}
                  />
                  {errors.business_type && (
                    <p className="text-sm text-red-500">{errors.business_type.message}</p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              <h3 className="font-medium">Business Address *</h3>
              <div className="space-y-2">
                <Label htmlFor="address_street">Street Address *</Label>
                <Input
                  id="address_street"
                  {...register("address_street")}
                  placeholder="Enter street address"
                />
                {errors.address_street && (
                  <p className="text-sm text-red-500">{errors.address_street.message}</p>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="address_city">City *</Label>
                  <Input
                    id="address_city"
                    {...register("address_city")}
                    placeholder="Enter city"
                  />
                  {errors.address_city && (
                    <p className="text-sm text-red-500">{errors.address_city.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address_state">State *</Label>
                  <Controller
                    control={control}
                    name="address_state"
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          {indianStates.map((state) => (
                            <SelectItem key={state} value={state}>
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.address_state && (
                    <p className="text-sm text-red-500">{errors.address_state.message}</p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="address_pin_code">PIN Code *</Label>
                  <Input
                    id="address_pin_code"
                    {...register("address_pin_code")}
                    placeholder="Enter PIN code"
                  />
                  {errors.address_pin_code && (
                    <p className="text-sm text-red-500">{errors.address_pin_code.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address_country">Country</Label>
                  <Input
                    id="address_country"
                    {...register("address_country")}
                    value="India"
                    disabled
                  />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <Label htmlFor="contact_person_name">Contact Person Name *</Label>
                <Input
                  id="contact_person_name"
                  {...register("contact_person_name")}
                  placeholder="Enter contact person's name"
                />
                {errors.contact_person_name && (
                  <p className="text-sm text-red-500">{errors.contact_person_name.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email_address">Email Address *</Label>
                <Input
                  id="email_address"
                  type="email"
                  {...register("email_address")}
                  placeholder="Enter email address"
                />
                {errors.email_address && (
                  <p className="text-sm text-red-500">{errors.email_address.message}</p>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="phone_primary">Phone Number (Primary) *</Label>
                <Input
                  id="phone_primary"
                  {...register("phone_primary")}
                  placeholder="Enter phone number"
                />
                {errors.phone_primary && (
                  <p className="text-sm text-red-500">{errors.phone_primary.message}</p>
                )}
                
                {watchPhonePrimary && watchPhonePrimary.length >= 10 && !watchPhonePrimaryVerified && (
                  <OTPVerification 
                    phoneNumber={watchPhonePrimary} 
                    onVerified={handlePhoneVerified} 
                  />
                )}
                
                {watchPhonePrimaryVerified && (
                  <div className="flex items-center text-sm text-green-600 mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Phone number verified
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone_secondary">Phone Number (Secondary)</Label>
                <Input
                  id="phone_secondary"
                  {...register("phone_secondary")}
                  placeholder="Enter secondary phone number (optional)"
                />
                {errors.phone_secondary && (
                  <p className="text-sm text-red-500">{errors.phone_secondary.message}</p>
                )}
              </div>
            </div>
          </div>
          
          {/* Step 2: MSME Registration & GST */}
          <div className={`form-section ${currentStep === 2 ? "visible" : "hidden"}`}>
            <h2 className="text-xl font-semibold mb-6">MSME Registration & GST Verification</h2>
            
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-4">
                <Controller
                  control={control}
                  name="msme_status"
                  render={({ field }) => (
                    <Checkbox
                      id="msme_status"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <Label htmlFor="msme_status">Are you an MSME?</Label>
              </div>
              
              {watchMsmeStatus && (
                <div className="ml-6 space-y-2">
                  <Label htmlFor="msme_registration_number">MSME Registration Number</Label>
                  <Input
                    id="msme_registration_number"
                    {...register("msme_registration_number")}
                    placeholder="Enter MSME registration number"
                  />
                </div>
              )}
            </div>
            
            <div className="space-y-6">
              <h3 className="font-medium">GST Verification & Compliance</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div className="space-y-2">
                  <Label htmlFor="gstin">GSTIN *</Label>
                  <div className="flex gap-2">
                    <Input
                      id="gstin"
                      {...register("gstin")}
                      placeholder="Enter GSTIN"
                    />
                    <Button
                      type="button"
                      disabled={isGSTVerifying || !watchGSTIN || watchGSTIN.length !== 15}
                      onClick={handleVerifyGSTIN}
                      className="whitespace-nowrap bg-basecamp-primary hover:bg-basecamp-secondary"
                    >
                      {isGSTVerifying ? "Verifying..." : "Verify GSTIN"}
                    </Button>
                  </div>
                  {errors.gstin && (
                    <p className="text-sm text-red-500">{errors.gstin.message}</p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="gst_registration_type">GST Registration Type</Label>
                  <Input
                    id="gst_registration_type"
                    {...register("gst_registration_type")}
                    placeholder="Auto-filled after verification"
                    disabled
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="gst_tax_slab">GST Tax Slab</Label>
                  <Input
                    id="gst_tax_slab"
                    {...register("gst_tax_slab")}
                    placeholder="Auto-filled after verification"
                    disabled
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="registered_state">Registered State</Label>
                  <Input
                    id="registered_state"
                    {...register("registered_state")}
                    placeholder="Auto-filled after verification"
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Step 3: KYC Verification */}
          <div className={`form-section ${currentStep === 3 ? "visible" : "hidden"}`}>
            <h2 className="text-xl font-semibold mb-6">KYC Verification</h2>
            
            <div className="space-y-6">
              <Controller
                control={control}
                name="upload_pan_card"
                render={({ field }) => (
                  <FileUpload
                    id="upload_pan_card"
                    label="Upload PAN Card *"
                    accept=".pdf,.jpg,.jpeg,.png"
                    maxSize={5}
                    onChange={field.onChange}
                    value={field.value}
                  />
                )}
              />
              
              <Controller
                control={control}
                name="upload_aadhaar_card"
                render={({ field }) => (
                  <FileUpload
                    id="upload_aadhaar_card"
                    label="Upload Aadhaar/Other ID *"
                    accept=".pdf,.jpg,.jpeg,.png"
                    maxSize={5}
                    onChange={field.onChange}
                    value={field.value}
                  />
                )}
              />
              
              <Controller
                control={control}
                name="upload_selfie"
                render={({ field }) => (
                  <FileUpload
                    id="upload_selfie"
                    label="Selfie for Face Match *"
                    accept=".jpg,.jpeg,.png"
                    maxSize={2}
                    onChange={field.onChange}
                    value={field.value}
                  />
                )}
              />
              
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md">
                <p className="text-sm text-yellow-700">
                  Note: In a production environment, these documents would be verified with IDfy API for KYC compliance. For this demo, file upload functionality is included without actual verification.
                </p>
              </div>
            </div>
          </div>
          
          {/* Step 4: Production & Branding */}
          <div className={`form-section ${currentStep === 4 ? "visible" : "hidden"}`}>
            <h2 className="text-xl font-semibold mb-6">Production & Branding Preferences</h2>
            
            <div className="space-y-6 mb-6">
              <div className="flex items-center space-x-2">
                <Controller
                  control={control}
                  name="in_house_production"
                  render={({ field }) => (
                    <Checkbox
                      id="in_house_production"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <Label htmlFor="in_house_production">Do you have in-house production capabilities?</Label>
              </div>
              
              {watchInHouseProduction && (
                <div className="ml-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="production_capacity">Production Capacity</Label>
                    <Controller
                      control={control}
                      name="production_capacity"
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select production capacity" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Small">Small (Under 500 units/month)</SelectItem>
                            <SelectItem value="Medium">Medium (500-5000 units/month)</SelectItem>
                            <SelectItem value="Large">Large (5000+ units/month)</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lead_time_for_production">Lead Time for Production</Label>
                    <Input
                      id="lead_time_for_production"
                      {...register("lead_time_for_production")}
                      placeholder="e.g., 5 days"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Types of Products Manufactured In-House</Label>
                    <div className="flex flex-col gap-2">
                      <Controller
                        control={control}
                        name="products_manufactured_in_house"
                        render={({ field }) => (
                          <>
                            {["Apparel", "Gifts/Accessories", "Electronics", "Custom Products (Non-branded)", "Others"].map((type) => (
                              <div className="flex items-center space-x-2" key={type}>
                                <Checkbox
                                  id={`product_type_${type}`}
                                  checked={field.value?.includes(type as any)}
                                  onCheckedChange={(checked) => {
                                    const currentValues = [...(field.value || [])];
                                    if (checked) {
                                      field.onChange([...currentValues, type]);
                                    } else {
                                      field.onChange(
                                        currentValues.filter((value) => value !== type)
                                      );
                                    }
                                  }}
                                />
                                <Label htmlFor={`product_type_${type}`} className="font-normal">
                                  {type}
                                </Label>
                              </div>
                            ))}
                          </>
                        )}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <Controller
                  control={control}
                  name="in_house_branding"
                  render={({ field }) => (
                    <Checkbox
                      id="in_house_branding"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <Label htmlFor="in_house_branding">Do you offer in-house branding services?</Label>
              </div>
              
              {watchInHouseBranding && (
                <div className="ml-6 space-y-4">
                  <div className="space-y-2">
                    <Label>What type of branding capabilities do you offer?</Label>
                    <div className="flex flex-col gap-2">
                      <Controller
                        control={control}
                        name="branding_capabilities"
                        render={({ field }) => (
                          <>
                            {["Logo Printing", "Custom Packaging", "Stickers/Decals", "Embroidery", "Others"].map((type) => (
                              <div className="flex items-center space-x-2" key={type}>
                                <Checkbox
                                  id={`branding_capability_${type}`}
                                  checked={field.value?.includes(type as any)}
                                  onCheckedChange={(checked) => {
                                    const currentValues = [...(field.value || [])];
                                    if (checked) {
                                      field.onChange([...currentValues, type]);
                                    } else {
                                      field.onChange(
                                        currentValues.filter((value) => value !== type)
                                      );
                                    }
                                  }}
                                />
                                <Label htmlFor={`branding_capability_${type}`} className="font-normal">
                                  {type}
                                </Label>
                              </div>
                            ))}
                          </>
                        )}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="branding_capacity">Branding Capacity</Label>
                    <Controller
                      control={control}
                      name="branding_capacity"
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select branding capacity" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Small">Small (Under 500 branded units/month)</SelectItem>
                            <SelectItem value="Medium">Medium (500-5000 branded units/month)</SelectItem>
                            <SelectItem value="Large">Large (5000+ branded units/month)</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Step 5: Warehousing */}
          <div className={`form-section ${currentStep === 5 ? "visible" : "hidden"}`}>
            <h2 className="text-xl font-semibold mb-6">Warehousing Preferences & Compliance</h2>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <Controller
                  control={control}
                  name="requires_warehousing"
                  render={({ field }) => (
                    <Checkbox
                      id="requires_warehousing"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <Label htmlFor="requires_warehousing">Do you require warehousing for your products?</Label>
              </div>
              
              {watchRequiresWarehousing && (
                <div className="ml-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="preferred_
