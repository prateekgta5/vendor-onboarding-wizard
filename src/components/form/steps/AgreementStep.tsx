
import React from "react";
import { Control, Controller, FieldErrors, UseFormRegister } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { VendorFormSchemaType } from "@/validators/vendorFormValidator";

interface AgreementStepProps {
  control: Control<VendorFormSchemaType>;
  register: UseFormRegister<VendorFormSchemaType>;
  errors: FieldErrors<VendorFormSchemaType>;
  watchBrandingOffer: boolean;
}

const AgreementStep: React.FC<AgreementStepProps> = ({
  control,
  register,
  errors,
  watchBrandingOffer
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-6">Final Agreement & Terms</h2>
      
      <div className="space-y-6 mb-6">
        <div className="flex items-center space-x-2">
          <Controller
            control={control}
            name="branding_offer"
            render={({ field }) => (
              <Checkbox
                id="branding_offer"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
          <Label htmlFor="branding_offer">Would you like to offer exclusive branding services to BaseCampMart customers?</Label>
        </div>
        
        {watchBrandingOffer && (
          <div className="ml-6 space-y-4">
            <div className="flex items-center space-x-2">
              <Controller
                control={control}
                name="cross_listing_permission"
                render={({ field }) => (
                  <Checkbox
                    id="cross_listing_permission"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Label htmlFor="cross_listing_permission" className="font-normal text-sm">
                I grant permission for BaseCampMart to list my products on their platform.
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Controller
                control={control}
                name="cross_listing_agreement"
                render={({ field }) => (
                  <Checkbox
                    id="cross_listing_agreement"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Label htmlFor="cross_listing_agreement" className="font-normal text-sm">
                I understand and agree to BaseCampMart's commission structure for cross-listed products.
              </Label>
            </div>
          </div>
        )}
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="agreement_terms">Vendor Agreement *</Label>
          <Textarea
            id="agreement_terms"
            {...register("agreement_terms")}
            className="h-40"
            defaultValue="I hereby agree that all information provided is accurate and complete. I understand and accept the terms and conditions of BaseCampMart's vendor onboarding process."
          />
          {errors.agreement_terms && (
            <p className="text-sm text-red-500">{errors.agreement_terms.message}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="digital_signature">Digital Signature *</Label>
          <Textarea
            id="digital_signature"
            {...register("digital_signature")}
            className="h-20"
            placeholder="Type your full name as signature"
          />
          {errors.digital_signature && (
            <p className="text-sm text-red-500">{errors.digital_signature.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgreementStep;
