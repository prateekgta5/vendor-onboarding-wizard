
import React, { useState } from 'react';
import { Control, FieldErrors } from 'react-hook-form';
import { VendorFormSchemaType } from '@/validators/vendorFormValidator';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { verifyGSTIN } from '@/utils/formUtils';
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';

interface GstStepProps {
  control: Control<VendorFormSchemaType>;
  errors: FieldErrors<VendorFormSchemaType>;
  watchMsmeStatus: boolean;
}

export const GstStep: React.FC<GstStepProps> = ({ control, errors, watchMsmeStatus }) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [isGstinVerified, setIsGstinVerified] = useState(false);
  const { toast } = useToast();
  
  const handleVerifyGSTIN = async (gstin: string, setValue: any) => {
    if (!gstin || gstin.length !== 15) {
      toast({
        title: "Invalid GSTIN",
        description: "Please enter a valid 15-character GSTIN",
        variant: "destructive"
      });
      return;
    }
    
    setIsVerifying(true);
    
    try {
      const result = await verifyGSTIN(gstin);
      
      if (result.valid) {
        setValue("gst_registration_type", result.registrationType || "");
        setValue("gst_tax_slab", result.taxSlab || "");
        setValue("registered_state", result.registeredState || "");
        
        setIsGstinVerified(true);
        
        toast({
          title: "GSTIN Verified",
          description: "Your GSTIN has been verified successfully"
        });
      } else {
        toast({
          title: "Invalid GSTIN",
          description: "The GSTIN could not be verified",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Verification Error",
        description: "An error occurred while verifying GSTIN",
        variant: "destructive"
      });
    } finally {
      setIsVerifying(false);
    }
  };
  
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <FormField
          control={control}
          name="msme_status"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">MSME Registered</FormLabel>
                <FormDescription>
                  Does your business have MSME (Micro, Small & Medium Enterprise) registration?
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        
        {watchMsmeStatus && (
          <FormField
            control={control}
            name="msme_registration_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>MSME Registration Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter registration number" {...field} value={field.value || ''} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </div>
      
      <div className="space-y-4">
        <FormField
          control={control}
          name="gstin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>GSTIN (Goods and Services Tax Identification Number) *</FormLabel>
              <div className="flex space-x-2">
                <FormControl>
                  <Input 
                    placeholder="15-character GSTIN" 
                    maxLength={15}
                    {...field} 
                    className="uppercase"
                    disabled={isGstinVerified}
                  />
                </FormControl>
                <FormField
                  control={control}
                  name="gst_registration_type"
                  render={({ field: gstField }) => (
                    <Button 
                      type="button" 
                      variant={isGstinVerified ? "outline" : "default"}
                      disabled={isVerifying || !field.value || field.value.length !== 15 || isGstinVerified}
                      onClick={() => handleVerifyGSTIN(field.value, gstField.onChange)}
                      className="whitespace-nowrap"
                    >
                      {isVerifying ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Verifying...
                        </span>
                      ) : isGstinVerified ? (
                        <span className="flex items-center text-green-600">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                          Verified
                        </span>
                      ) : (
                        'Verify GSTIN'
                      )}
                    </Button>
                  )}
                />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {isGstinVerified && (
          <Card className="p-4 bg-green-50 border-green-200">
            <h3 className="font-medium text-green-800 mb-2">Verified GST Information</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-green-700 font-medium">Registration Type</p>
                <FormField
                  control={control}
                  name="gst_registration_type"
                  render={({ field }) => (
                    <p className="text-sm">{field.value}</p>
                  )}
                />
              </div>
              <div>
                <p className="text-xs text-green-700 font-medium">Tax Slab</p>
                <FormField
                  control={control}
                  name="gst_tax_slab"
                  render={({ field }) => (
                    <p className="text-sm">{field.value}</p>
                  )}
                />
              </div>
              <div>
                <p className="text-xs text-green-700 font-medium">Registered State</p>
                <FormField
                  control={control}
                  name="registered_state"
                  render={({ field }) => (
                    <p className="text-sm">{field.value}</p>
                  )}
                />
              </div>
            </div>
          </Card>
        )}
        
        <div className="bg-amber-50 p-4 rounded-md border border-amber-200">
          <div className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500 mr-2 mt-1">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <div>
              <h4 className="font-medium text-amber-800">GST Verification Required</h4>
              <p className="text-sm text-amber-700 mt-1">
                A valid GSTIN is required for all vendor registrations. The information will be
                automatically verified with government records.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
