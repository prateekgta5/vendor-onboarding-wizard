
import VendorForm from "@/components/VendorForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <div className="bg-basecamp-primary text-white py-2 px-4 rounded-md flex items-center">
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
              <span className="font-bold">BaseCampMart</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Vendor Onboarding Form</h1>
          <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
            Please complete the form below to register as a vendor with BaseCampMart. All fields marked with * are required.
          </p>
        </header>
        
        <VendorForm />
        
        <footer className="mt-16 text-center text-sm text-gray-500">
          <p>© 2025 BaseCampMart. All rights reserved.</p>
          <p className="mt-1">
            For assistance, contact{" "}
            <a href="mailto:support@basecampmart.com" className="text-basecamp-primary hover:underline">
              support@basecampmart.com
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
