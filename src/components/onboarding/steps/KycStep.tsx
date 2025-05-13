
import React from 'react';
import { Control } from 'react-hook-form';
import { VendorFormSchemaType } from '@/validators/vendorFormValidator';
import { Card } from '@/components/ui/card';

interface KycStepProps {
  control: Control<VendorFormSchemaType>;
}

export const KycStep: React.FC<KycStepProps> = ({ control }) => {
  return (
    <div className="space-y-6">
      <p className="text-gray-700">
        Please upload the following documents for KYC verification. All documents should be clearly visible and in PDF or image format (JPG, PNG).
      </p>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-4 flex flex-col items-center justify-center min-h-40 border-dashed border-2 hover:border-indigo-300 transition-colors cursor-pointer">
          <div className="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-2 text-gray-400">
              <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
              <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
              <path d="M10 9H8"></path>
              <path d="M16 13H8"></path>
              <path d="M16 17H8"></path>
            </svg>
            <p className="font-medium">PAN Card</p>
            <p className="text-xs text-gray-500 mt-1">Click to upload</p>
          </div>
        </Card>
        
        <Card className="p-4 flex flex-col items-center justify-center min-h-40 border-dashed border-2 hover:border-indigo-300 transition-colors cursor-pointer">
          <div className="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-2 text-gray-400">
              <path d="M19 10V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3"></path>
              <path d="M12 14v6"></path>
              <path d="m15 17-3-3-3 3"></path>
              <rect width="18" height="6" x="3" y="10"></rect>
            </svg>
            <p className="font-medium">GST Certificate</p>
            <p className="text-xs text-gray-500 mt-1">Click to upload</p>
          </div>
        </Card>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-4 flex flex-col items-center justify-center min-h-40 border-dashed border-2 hover:border-indigo-300 transition-colors cursor-pointer">
          <div className="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-2 text-gray-400">
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <p className="font-medium">Business Proof</p>
            <p className="text-xs text-gray-500 mt-1">Click to upload</p>
          </div>
        </Card>
        
        <Card className="p-4 flex flex-col items-center justify-center min-h-40 border-dashed border-2 hover:border-indigo-300 transition-colors cursor-pointer">
          <div className="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-2 text-gray-400">
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
            </svg>
            <p className="font-medium">Cancelled Cheque</p>
            <p className="text-xs text-gray-500 mt-1">Click to upload</p>
          </div>
        </Card>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
        <div className="flex items-start">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 mr-2 mt-1">
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
            <path d="M12 9v4"></path>
            <path d="M12 17h.01"></path>
          </svg>
          <div>
            <h4 className="font-medium text-blue-800">Document Guidelines</h4>
            <ul className="text-sm text-blue-700 mt-1 list-disc list-inside space-y-1">
              <li>Documents should be clearly visible and legible</li>
              <li>File size should not exceed 5MB per document</li>
              <li>Supported formats: PDF, JPG, PNG</li>
              <li>All documents must be valid and not expired</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
