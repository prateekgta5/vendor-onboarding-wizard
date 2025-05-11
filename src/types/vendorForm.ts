
export type BusinessType = 
  | 'Manufacturer' 
  | 'Corporate Gifting' 
  | 'Reseller' 
  | 'Wholesaler' 
  | 'Other';

export type BrandingCapability = 
  | 'Logo Printing' 
  | 'Custom Packaging' 
  | 'Stickers/Decals' 
  | 'Embroidery' 
  | 'Others';

export type ProductType = 
  | 'Apparel' 
  | 'Gifts/Accessories' 
  | 'Electronics' 
  | 'Custom Products (Non-branded)' 
  | 'Others';

export type CapacitySize = 'Small' | 'Medium' | 'Large';

export type WarehouseLocation = 
  | 'Delhi' 
  | 'Mumbai' 
  | 'Bangalore' 
  | 'Chennai' 
  | 'Hyderabad' 
  | 'Pune' 
  | 'Kolkata' 
  | 'Other';

export type BankAccountType = 'Savings' | 'Current';

export type PaymentMethod = 'Bank Transfer' | 'PayPal' | 'Digital Wallet (Razorpay, Paytm)';

export interface VendorFormData {
  // Step 1: Basic Vendor Information
  business_name: string;
  business_type: BusinessType[];
  address_street: string;
  address_city: string;
  address_state: string;
  address_pin_code: string;
  address_country: string;
  contact_person_name: string;
  email_address: string;
  phone_primary: string;
  phone_primary_verified: boolean;
  phone_secondary?: string;
  
  // Step 2: MSME & GST
  msme_status: boolean;
  msme_registration_number?: string;
  gstin: string;
  gst_registration_type?: string;
  gst_tax_slab?: string;
  registered_state?: string;
  
  // Step 3: KYC Verification
  upload_pan_card?: File | null;
  upload_aadhaar_card?: File | null;
  upload_selfie?: File | null;
  
  // Step 4: Production & Branding
  in_house_production: boolean;
  production_capacity?: CapacitySize;
  lead_time_for_production?: string;
  products_manufactured_in_house?: ProductType[];
  in_house_branding: boolean;
  branding_capabilities?: BrandingCapability[];
  branding_capacity?: CapacitySize;
  
  // Step 5: Warehousing
  requires_warehousing: boolean;
  preferred_warehouse_location?: WarehouseLocation;
  warehouse_location?: string; // Google Maps location
  storage_volume?: string;
  storage_duration?: string;
  
  // Step 6: Banking & Payment
  bank_account_type: BankAccountType;
  account_number: string;
  bank_name: string;
  ifsc_code: string;
  payment_method: PaymentMethod;
  payment_terms_agreement: boolean;
  payment_terms_satisfaction: boolean;
  
  // Step 7: Cross-Listing & Agreement
  branding_offer: boolean;
  cross_listing_permission?: boolean;
  cross_listing_agreement?: boolean;
  agreement_terms: string;
  digital_signature?: string;
}
