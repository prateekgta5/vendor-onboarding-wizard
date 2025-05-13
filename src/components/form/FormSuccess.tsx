
import React from "react";
import { Button } from "@/components/ui/button";

const FormSuccess: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Registration Successful!</h2>
      <p className="text-gray-600 mb-6">
        Thank you for registering as a vendor with BaseCampMart. Our team will review your application and contact you shortly.
      </p>
      <Button 
        className="bg-basecamp-primary hover:bg-basecamp-secondary"
        onClick={() => window.location.reload()}
      >
        Register Another Vendor
      </Button>
    </div>
  );
};

export default FormSuccess;
