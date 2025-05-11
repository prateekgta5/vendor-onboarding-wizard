
import { toast } from "@/components/ui/use-toast";

// Mock API call for OTP verification - in a real implementation, this would connect to a real SMS gateway
export const sendOTP = async (phoneNumber: string): Promise<boolean> => {
  console.log(`Sending OTP to ${phoneNumber}`);
  
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1500));
  
  // Always return true for this demo
  return true;
};

export const verifyOTP = async (phoneNumber: string, otp: string): Promise<boolean> => {
  console.log(`Verifying OTP ${otp} for ${phoneNumber}`);
  
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1500));
  
  // For demo purposes, any 4-digit OTP will be considered valid
  return otp.length === 4 && /^\d{4}$/.test(otp);
};

// Mock GST verification API - in a real implementation, this would connect to IDfy or similar service
export const verifyGSTIN = async (gstin: string): Promise<{ 
  valid: boolean;
  registrationType?: string;
  taxSlab?: string;
  registeredState?: string;
}> => {
  console.log(`Verifying GSTIN ${gstin}`);
  
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 2000));
  
  // Basic GSTIN validation
  const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/;
  const isValid = gstinRegex.test(gstin);
  
  if (!isValid) {
    return { valid: false };
  }
  
  // Mock data based on GSTIN state code (first 2 digits)
  const stateCode = gstin.substring(0, 2);
  let state = "Unknown";
  
  // Map state codes to state names
  const stateCodes: Record<string, string> = {
    "01": "Jammu and Kashmir",
    "02": "Himachal Pradesh",
    "03": "Punjab",
    "04": "Chandigarh",
    "05": "Uttarakhand",
    "06": "Haryana",
    "07": "Delhi",
    "08": "Rajasthan",
    "09": "Uttar Pradesh",
    "10": "Bihar",
    "11": "Sikkim",
    "12": "Arunachal Pradesh",
    "13": "Nagaland",
    "14": "Manipur",
    "15": "Mizoram",
    "16": "Tripura",
    "17": "Meghalaya",
    "18": "Assam",
    "19": "West Bengal",
    "20": "Jharkhand",
    "21": "Odisha",
    "22": "Chhattisgarh",
    "23": "Madhya Pradesh",
    "24": "Gujarat",
    "27": "Maharashtra",
    "29": "Karnataka",
    "32": "Kerala",
    "33": "Tamil Nadu",
    "36": "Telangana",
    "37": "Andhra Pradesh",
  };
  
  if (stateCodes[stateCode]) {
    state = stateCodes[stateCode];
  }
  
  // For demo, determine registration type and tax slab randomly
  const registrationTypes = ["Regular", "Composition"];
  const registrationType = registrationTypes[Math.floor(Math.random() * registrationTypes.length)];
  
  const taxSlabs = ["CGST", "SGST", "IGST"];
  const taxSlab = taxSlabs[Math.floor(Math.random() * taxSlabs.length)];
  
  return {
    valid: true,
    registrationType,
    taxSlab,
    registeredState: state,
  };
};

// Function to display toast notifications
export const showToast = (title: string, description: string, type: 'default' | 'success' | 'error' = 'default') => {
  toast({
    title,
    description,
    variant: type === 'error' ? 'destructive' : 'default',
  });
};

// Mock form submission
export const submitVendorForm = async (formData: any): Promise<{ success: boolean; message: string }> => {
  console.log("Submitting form data:", formData);
  
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 3000));
  
  // For demo purposes, always return success
  return {
    success: true,
    message: "Vendor registration submitted successfully! Our team will review your application and contact you shortly.",
  };
};

// Indian states for dropdown
export const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];
