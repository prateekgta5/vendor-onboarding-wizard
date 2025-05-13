
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const SubmissionSuccessStep: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <Card className="p-8 text-center border-green-200 bg-white">
        <div className="mb-6">
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Application Submitted Successfully!</h2>
        <p className="text-gray-600 mb-8 max-w-lg mx-auto">
          Thank you for applying to become a vendor with BaseCampMart. Our team will review your application and get back to you within 3-5 business days.
        </p>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-8 max-w-md mx-auto">
          <h3 className="font-semibold text-gray-700 mb-2">What happens next?</h3>
          <ul className="text-left text-gray-600 space-y-2">
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600 mr-2 mt-1">
                <path d="m9 18 6-6-6-6"></path>
              </svg>
              <span>Our team will verify your application details</span>
            </li>
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600 mr-2 mt-1">
                <path d="m9 18 6-6-6-6"></path>
              </svg>
              <span>You'll receive an email with the verification status</span>
            </li>
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600 mr-2 mt-1">
                <path d="m9 18 6-6-6-6"></path>
              </svg>
              <span>Once approved, you'll get access to the vendor dashboard</span>
            </li>
          </ul>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button variant="outline" onClick={() => window.location.href = "/"}>
            Return to Home
          </Button>
          <Button onClick={() => window.open('mailto:support@basecampmart.com')}>
            Contact Support
          </Button>
        </div>
      </Card>
    </div>
  );
};
