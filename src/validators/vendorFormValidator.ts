
import { z } from "zod";

// Helper function for GSTIN validation
const isValidGSTIN = (gstin: string) => {
  // Basic GSTIN format validation (15 alphanumeric characters)
  const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/;
  return gstinRegex.test(gstin);
};

// Helper for PAN validation
const isValidPAN = (pan: string) => {
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return panRegex.test(pan);
};

export const vendorFormSchema = z.object({
  // Step 1: Basic Vendor Information
  business_name: z.string().min(1, { message: "Business name is required" })
    .regex(/^[a-zA-Z0-9\s.\-]+$/, {
      message: "Business name can only contain letters, numbers, spaces, dots, and hyphens",
    }),
  business_type: z.array(z.enum(["Manufacturer", "Corporate Gifting", "Reseller", "Wholesaler", "Other"]))
    .min(1, { message: "Please select at least one business type" }),
  address_street: z.string().min(1, { message: "Street address is required" }),
  address_city: z.string().min(1, { message: "City is required" }),
  address_state: z.string().min(1, { message: "State is required" }),
  address_pin_code: z.string().min(1, { message: "PIN code is required" })
    .regex(/^[1-9][0-9]{5}$/, { message: "Enter a valid 6-digit PIN code" }),
  address_country: z.string().default("India"),
  contact_person_name: z.string().min(1, { message: "Contact person name is required" }),
  email_address: z.string().email({ message: "Enter a valid email address" }),
  phone_primary: z.string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .regex(/^[6-9]\d{9}$/, { message: "Enter a valid Indian mobile number" }),
  phone_primary_verified: z.boolean().default(false),
  phone_secondary: z.string().optional(),

  // Step 2: MSME & GST
  msme_status: z.boolean(),
  msme_registration_number: z.string().optional(),
  gstin: z.string()
    .min(15, { message: "GSTIN must be 15 characters" })
    .max(15, { message: "GSTIN must be 15 characters" })
    .refine(isValidGSTIN, { message: "Enter a valid GSTIN" }),
  gst_registration_type: z.string().optional(),
  gst_tax_slab: z.string().optional(),
  registered_state: z.string().optional(),

  // Step 3: KYC Verification
  upload_pan_card: z.any().optional(),
  upload_aadhaar_card: z.any().optional(),
  upload_selfie: z.any().optional(),

  // Step 4: Production & Branding
  in_house_production: z.boolean(),
  production_capacity: z.enum(["Small", "Medium", "Large"]).optional(),
  lead_time_for_production: z.string().optional(),
  products_manufactured_in_house: z.array(
    z.enum([
      "Apparel",
      "Gifts/Accessories",
      "Electronics",
      "Custom Products (Non-branded)",
      "Others",
    ])
  ).optional(),
  in_house_branding: z.boolean(),
  branding_capabilities: z.array(
    z.enum([
      "Logo Printing",
      "Custom Packaging",
      "Stickers/Decals",
      "Embroidery",
      "Others",
    ])
  ).optional(),
  branding_capacity: z.enum(["Small", "Medium", "Large"]).optional(),

  // Step 5: Warehousing
  requires_warehousing: z.boolean(),
  preferred_warehouse_location: z.enum([
    "Delhi",
    "Mumbai",
    "Bangalore",
    "Chennai",
    "Hyderabad",
    "Pune",
    "Kolkata",
    "Other",
  ]).optional(),
  warehouse_location: z.string().optional(),
  storage_volume: z.string().optional(),
  storage_duration: z.string().optional(),

  // Step 6: Banking & Payment
  bank_account_type: z.enum(["Savings", "Current"]),
  account_number: z.string()
    .min(1, { message: "Account number is required" })
    .regex(/^\d{9,18}$/, { message: "Enter a valid account number" }),
  bank_name: z.string().min(1, { message: "Bank name is required" }),
  ifsc_code: z.string()
    .min(11, { message: "IFSC code must be 11 characters" })
    .max(11, { message: "IFSC code must be 11 characters" })
    .regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, { message: "Enter a valid IFSC code" }),
  payment_method: z.enum([
    "Bank Transfer",
    "PayPal",
    "Digital Wallet (Razorpay, Paytm)",
  ]),
  payment_terms_agreement: z.literal(true, {
    message: "You must agree to the payment terms",
  }),
  payment_terms_satisfaction: z.literal(true, {
    message: "You must agree to the customer satisfaction terms",
  }),

  // Step 7: Cross-Listing & Agreement
  branding_offer: z.boolean(),
  cross_listing_permission: z.boolean().optional(),
  cross_listing_agreement: z.boolean().optional(),
  agreement_terms: z.string(),
  digital_signature: z.string().optional(),
});

export type VendorFormSchemaType = z.infer<typeof vendorFormSchema>;
