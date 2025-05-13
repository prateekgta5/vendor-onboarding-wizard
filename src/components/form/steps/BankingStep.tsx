
import React from "react";
import { Control, Controller, FieldErrors, UseFormRegister } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { VendorFormSchemaType } from "@/validators/vendorFormValidator";

interface BankingStepProps {
  control: Control<VendorFormSchemaType>;
  register: UseFormRegister<VendorFormSchemaType>;
  errors: FieldErrors<VendorFormSchemaType>;
}

const BankingStep: React.FC<BankingStepProps> = ({
  control,
  register,
  errors
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-6">Banking & Payment Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-2">
          <Label htmlFor="bank_account_type">Account Type *</Label>
          <Controller
            control={control}
            name="bank_account_type"
            render={({ field }) => (
              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Savings" id="account_type_savings" />
                  <Label htmlFor="account_type_savings" className="font-normal">Savings</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Current" id="account_type_current" />
                  <Label htmlFor="account_type_current" className="font-normal">Current</Label>
                </div>
              </RadioGroup>
            )}
          />
          {errors.bank_account_type && (
            <p className="text-sm text-red-500">{errors.bank_account_type.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="payment_method">Preferred Payment Method *</Label>
          <Controller
            control={control}
            name="payment_method"
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                  <SelectItem value="PayPal">PayPal</SelectItem>
                  <SelectItem value="Digital Wallet (Razorpay, Paytm)">Digital Wallet (Razorpay, Paytm)</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.payment_method && (
            <p className="text-sm text-red-500">{errors.payment_method.message}</p>
          )}
        </div>
      </div>
      
      <div className="space-y-6 mb-6">
        <div className="space-y-2">
          <Label htmlFor="account_number">Account Number *</Label>
          <Input
            id="account_number"
            {...register("account_number")}
            placeholder="Enter account number"
            type="password"
          />
          {errors.account_number && (
            <p className="text-sm text-red-500">{errors.account_number.message}</p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="bank_name">Bank Name *</Label>
            <Input
              id="bank_name"
              {...register("bank_name")}
              placeholder="Enter bank name"
            />
            {errors.bank_name && (
              <p className="text-sm text-red-500">{errors.bank_name.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="ifsc_code">IFSC Code *</Label>
            <Input
              id="ifsc_code"
              {...register("ifsc_code")}
              placeholder="Enter IFSC code"
            />
            {errors.ifsc_code && (
              <p className="text-sm text-red-500">{errors.ifsc_code.message}</p>
            )}
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Controller
            control={control}
            name="payment_terms_agreement"
            render={({ field }) => (
              <Checkbox
                id="payment_terms_agreement"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
          <Label htmlFor="payment_terms_agreement" className="font-normal text-sm">
            I agree to the payment terms and conditions of BaseCampMart, including processing times and transaction fees.
          </Label>
        </div>
        {errors.payment_terms_agreement && (
          <p className="text-sm text-red-500">{errors.payment_terms_agreement.message}</p>
        )}
        
        <div className="flex items-center space-x-2">
          <Controller
            control={control}
            name="payment_terms_satisfaction"
            render={({ field }) => (
              <Checkbox
                id="payment_terms_satisfaction"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
          <Label htmlFor="payment_terms_satisfaction" className="font-normal text-sm">
            I understand that all payments are subject to customer satisfaction and quality verification.
          </Label>
        </div>
        {errors.payment_terms_satisfaction && (
          <p className="text-sm text-red-500">{errors.payment_terms_satisfaction.message}</p>
        )}
      </div>
    </div>
  );
};

export default BankingStep;
