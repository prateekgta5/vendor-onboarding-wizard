
import React from "react";
import { Control, Controller, FieldErrors, UseFormRegister } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { VendorFormSchemaType } from "@/validators/vendorFormValidator";

interface GstStepProps {
  control: Control<VendorFormSchemaType>;
  register: UseFormRegister<VendorFormSchemaType>;
  errors: FieldErrors<VendorFormSchemaType>;
  watchMsmeStatus: boolean;
  watchGSTIN: string;
  isGSTVerifying: boolean;
  handleVerifyGSTIN: () => void;
}

const GstStep: React.FC<GstStepProps> = ({
  control,
  register,
  errors,
  watchMsmeStatus,
  watchGSTIN,
  isGSTVerifying,
  handleVerifyGSTIN
}) => {
  return (
    <div className="space-y-6">
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
  );
};

export default GstStep;
