
import React from "react";
import { Control, Controller } from "react-hook-form";
import FileUpload from "@/components/FileUpload";
import { VendorFormSchemaType } from "@/validators/vendorFormValidator";

interface KycStepProps {
  control: Control<VendorFormSchemaType>;
}

const KycStep: React.FC<KycStepProps> = ({ control }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-6">KYC Verification</h2>
      
      <div className="space-y-6">
        <Controller
          control={control}
          name="upload_pan_card"
          render={({ field }) => (
            <FileUpload
              id="upload_pan_card"
              label="Upload PAN Card *"
              accept=".pdf,.jpg,.jpeg,.png"
              maxSize={5}
              onChange={field.onChange}
              value={field.value}
            />
          )}
        />
        
        <Controller
          control={control}
          name="upload_aadhaar_card"
          render={({ field }) => (
            <FileUpload
              id="upload_aadhaar_card"
              label="Upload Aadhaar/Other ID *"
              accept=".pdf,.jpg,.jpeg,.png"
              maxSize={5}
              onChange={field.onChange}
              value={field.value}
            />
          )}
        />
        
        <Controller
          control={control}
          name="upload_selfie"
          render={({ field }) => (
            <FileUpload
              id="upload_selfie"
              label="Selfie for Face Match *"
              accept=".jpg,.jpeg,.png"
              maxSize={2}
              onChange={field.onChange}
              value={field.value}
            />
          )}
        />
        
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md">
          <p className="text-sm text-yellow-700">
            Note: In a production environment, these documents would be verified with IDfy API for KYC compliance. For this demo, file upload functionality is included without actual verification.
          </p>
        </div>
      </div>
    </div>
  );
};

export default KycStep;
