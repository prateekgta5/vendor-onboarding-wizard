
import React from "react";
import { Control, Controller, FieldErrors, UseFormRegister } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { indianStates } from "@/utils/formUtils";
import OTPVerification from "@/components/OTPVerification";
import { VendorFormSchemaType } from "@/validators/vendorFormValidator";

interface BasicInfoStepProps {
  control: Control<VendorFormSchemaType>;
  register: UseFormRegister<VendorFormSchemaType>;
  errors: FieldErrors<VendorFormSchemaType>;
  watchPhonePrimary: string;
  watchPhonePrimaryVerified: boolean;
  handlePhoneVerified: () => void;
}

const BasicInfoStep: React.FC<BasicInfoStepProps> = ({
  control,
  register,
  errors,
  watchPhonePrimary,
  watchPhonePrimaryVerified,
  handlePhoneVerified
}) => {
  return (
    <div className="space-y-6">
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
  );
};

export default BasicInfoStep;
