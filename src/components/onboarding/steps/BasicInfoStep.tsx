
import React from 'react';
import { Control, FieldErrors, useFormContext } from 'react-hook-form';
import { VendorFormSchemaType } from '@/validators/vendorFormValidator';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { indianStates } from '@/utils/formUtils';
import { Checkbox } from '@/components/ui/checkbox';
import { SelectBusinessTypeField } from '../form-fields/SelectBusinessTypeField';
import { PhoneVerificationField } from '../form-fields/PhoneVerificationField';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface BasicInfoStepProps {
  control: Control<VendorFormSchemaType>;
  errors: FieldErrors<VendorFormSchemaType>;
}

export const BasicInfoStep: React.FC<BasicInfoStepProps> = ({ control, errors }) => {
  // We need to ensure we're using this component within a FormProvider context
  // The Form component from shadcn/ui uses FormProvider from react-hook-form
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="business_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Name *</FormLabel>
              <FormControl>
                <Input placeholder="Enter your business name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <SelectBusinessTypeField control={control} />
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="address_street"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Street Address *</FormLabel>
              <FormControl>
                <Input placeholder="Street address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="address_city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City *</FormLabel>
              <FormControl>
                <Input placeholder="City" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="address_state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>State *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {indianStates.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="address_pin_code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>PIN Code *</FormLabel>
              <FormControl>
                <Input placeholder="6-digit PIN code" maxLength={6} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="contact_person_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Person Name *</FormLabel>
              <FormControl>
                <Input placeholder="Full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="email_address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address *</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Email address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <PhoneVerificationField control={control} />
      
      <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
        <div className="flex items-start">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 mr-2 mt-1">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 16v-4"></path>
            <path d="M12 8h.01"></path>
          </svg>
          <div>
            <h4 className="font-medium text-blue-800">Why we need this information</h4>
            <p className="text-sm text-blue-700 mt-1">
              Your business details help us properly set up your vendor account and ensure
              smooth communication throughout the onboarding process.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
