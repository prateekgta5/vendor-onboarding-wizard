
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
          <h1 className="text-4xl font-bold text-gray-800 mb-2">AI-Powered Vendor Onboarding</h1>
          <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
            Our intelligent system guides you through the onboarding process, providing 
            real-time assistance and validation to ensure a smooth experience.
          </p>
        </header>
        
        <VendorOnboardingSystem />
        
        <footer className="mt-16 text-center text-sm text-gray-500">
          <p>© 2025 BaseCampMart. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <a href="#" className="text-indigo-600 hover:text-indigo-800 hover:underline">Privacy Policy</a>
            <a href="#" className="text-indigo-600 hover:text-indigo-800 hover:underline">Terms of Service</a>
            <a href="mailto:support@basecampmart.com" className="text-indigo-600 hover:text-indigo-800 hover:underline">
              Contact Support
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
