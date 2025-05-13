
import React from 'react';
import { Control, FieldErrors } from 'react-hook-form';
import { VendorFormSchemaType } from '@/validators/vendorFormValidator';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

interface AgreementStepProps {
  control: Control<VendorFormSchemaType>;
  errors: FieldErrors<VendorFormSchemaType>;
  watchBrandingOffer: boolean;
}

export const AgreementStep: React.FC<AgreementStepProps> = ({ control, errors, watchBrandingOffer }) => {
  return (
    <div className="space-y-8">
      <div className="bg-indigo-50 p-5 rounded-lg border border-indigo-100">
        <h3 className="font-medium text-indigo-800 mb-2">Vendor Terms & Conditions</h3>
        <div className="h-40 overflow-y-auto bg-white p-3 rounded border border-indigo-100 text-sm text-gray-700">
          <p className="mb-2"><strong>1. GENERAL PROVISIONS</strong></p>
          <p className="mb-2">These terms and conditions ("Agreement") govern the relationship between vendors ("Vendor") and BaseCampMart ("Company"). By submitting the vendor application and checking the acceptance box, Vendor agrees to be bound by this Agreement.</p>
          
          <p className="mb-2"><strong>2. PRODUCT QUALITY & COMPLIANCE</strong></p>
          <p className="mb-2">Vendor agrees to provide products that meet all applicable quality standards and comply with relevant laws and regulations. Products must match the descriptions and specifications provided to the Company.</p>
          
          <p className="mb-2"><strong>3. PRICING & PAYMENTS</strong></p>
          <p className="mb-2">Vendor agrees to the pricing structure outlined in their specific vendor package. Payments will be processed within the agreed timeframe after order fulfillment verification.</p>
          
          <p className="mb-2"><strong>4. ORDER FULFILLMENT</strong></p>
          <p className="mb-2">Vendor commits to fulfilling orders within the agreed timeframe. Delays must be communicated to the Company immediately.</p>
          
          <p className="mb-2"><strong>5. TERMINATION</strong></p>
          <p className="mb-2">Either party may terminate this Agreement with 30 days written notice. The Company reserves the right to terminate immediately for violations of this Agreement.</p>
        </div>
      </div>
      
      <FormField
        control={control}
        name="branding_offer"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">Cross-Listing Opt-In</FormLabel>
              <FormDescription>
                Allow BaseCampMart to list your products on partner platforms for increased visibility
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </FormItem>
        )}
      />
      
      {watchBrandingOffer && (
        <FormField
          control={control}
          name="cross_listing_agreement"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 pl-4 border-l-2 border-indigo-100">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Cross-Listing Agreement
                </FormLabel>
                <p className="text-sm text-gray-500">
                  I agree that BaseCampMart may list my products on partner platforms and marketplaces. 
                  I understand that additional commission rates may apply for sales through these channels.
                </p>
              </div>
            </FormItem>
          )}
        />
      )}
      
      <FormField
        control={control}
        name="agreement_terms"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Digital Signature *</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Type your full name as signature"
                className="resize-none"
                {...field}
              />
            </FormControl>
            <FormDescription>
              By typing your full name above, you agree to all the terms and conditions of the vendor agreement.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div className="bg-green-50 p-4 rounded-md border border-green-200">
        <div className="flex items-start">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 mr-2 mt-1">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <div>
            <h4 className="font-medium text-green-800">Almost Done!</h4>
            <p className="text-sm text-green-700 mt-1">
              Once you submit your application, our team will review the details and contact you
              within 3-5 business days with the next steps.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
