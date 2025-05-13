
import React from 'react';
import { Control, FieldErrors } from 'react-hook-form';
import { VendorFormSchemaType } from '@/validators/vendorFormValidator';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface BankingStepProps {
  control: Control<VendorFormSchemaType>;
  errors: FieldErrors<VendorFormSchemaType>;
}

export const BankingStep: React.FC<BankingStepProps> = ({ control, errors }) => {
  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="bank_account_type"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Account Type *</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="Current" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    Current Account (Recommended for businesses)
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="Savings" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    Savings Account
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div className="grid md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="account_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account Number *</FormLabel>
              <FormControl>
                <Input placeholder="Enter account number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="bank_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bank Name *</FormLabel>
              <FormControl>
                <Input placeholder="Enter bank name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <FormField
        control={control}
        name="ifsc_code"
        render={({ field }) => (
          <FormItem>
            <FormLabel>IFSC Code *</FormLabel>
            <FormControl>
              <Input placeholder="Enter 11-character IFSC Code" maxLength={11} className="uppercase" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="payment_method"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Preferred Payment Method *</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="Bank Transfer" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    Bank Transfer (NEFT/RTGS/IMPS)
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="PayPal" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    PayPal
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="Digital Wallet (Razorpay, Paytm)" />
                  </FormControl>
                  <FormLabel className="font-normal">
                    Digital Wallet (Razorpay, Paytm)
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div className="space-y-4">
        <FormField
          control={control}
          name="payment_terms_agreement"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Payment Terms Agreement *
                </FormLabel>
                <p className="text-sm text-gray-500">
                  I agree that payments will be processed within 7-14 days after order fulfillment 
                  is verified, subject to the terms and conditions of BaseCampMart.
                </p>
              </div>
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="payment_terms_satisfaction"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Customer Satisfaction Agreement *
                </FormLabel>
                <p className="text-sm text-gray-500">
                  I understand that payments may be withheld in case of order disputes or 
                  customer satisfaction issues until resolution.
                </p>
              </div>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
