
import React from "react";
import { VendorOnboardingSystem } from "@/components/VendorOnboardingSystem";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <div className="bg-indigo-600 text-white py-2 px-4 rounded-md flex items-center shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <path d="M17 6.1H3"></path>
                <path d="M21 12.1H3"></path>
                <path d="M15.1 18H3"></path>
              </svg>
              <span className="font-bold text-lg">BaseCampMart</span>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Vendor Onboarding Portal</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Complete the application below to join BaseCampMart's vendor network.
            Our AI assistant can help you with any questions throughout the process.
          </p>
        </header>

        {/* Vendor Onboarding System */}
        <VendorOnboardingSystem />
        
        <footer className="mt-16 text-center text-sm text-gray-500">
          <p>© 2025 BaseCampMart. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <a href="#" className="hover:text-indigo-600">Privacy Policy</a>
            <a href="#" className="hover:text-indigo-600">Terms of Service</a>
            <a href="#" className="hover:text-indigo-600">Contact Support</a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
