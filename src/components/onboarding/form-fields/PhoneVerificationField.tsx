
import React, { useState } from 'react';
import { Control } from 'react-hook-form';
import { VendorFormSchemaType } from '@/validators/vendorFormValidator';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { sendOTP, verifyOTP } from '@/utils/formUtils';
import { useToast } from '@/hooks/use-toast';

interface PhoneVerificationFieldProps {
  control: Control<VendorFormSchemaType>;
}

export const PhoneVerificationField: React.FC<PhoneVerificationFieldProps> = ({ control }) => {
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [otp, setOtp] = useState('');
  const { toast } = useToast();
  
  const handleSendOtp = async (phoneNumber: string) => {
    if (!phoneNumber || phoneNumber.length < 10) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit phone number",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsVerifying(true);
      await sendOTP(phoneNumber);
      setIsOtpSent(true);
      toast({
        title: "OTP Sent",
        description: "A verification code has been sent to your phone number"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send OTP. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsVerifying(false);
    }
  };
  
  const handleVerifyOtp = async (phoneNumber: string, setValue: any) => {
    if (otp.length !== 4) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 4-digit OTP",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsVerifying(true);
      const isValid = await verifyOTP(phoneNumber, otp);
      
      if (isValid) {
        setValue("phone_primary_verified", true);
        toast({
          title: "Phone Verified",
          description: "Your phone number has been verified successfully"
        });
      } else {
        toast({
          title: "Invalid OTP",
          description: "The OTP you entered is incorrect. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Verification Error",
        description: "An error occurred during verification. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsVerifying(false);
    }
  };
  
  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="phone_primary"
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel>Phone Number *</FormLabel>
            <div className="flex space-x-2">
              <FormControl>
                <Input 
                  placeholder="10-digit phone number" 
                  maxLength={10}
                  {...field} 
                  disabled={field.value && field.value.length === 10 && control._formValues.phone_primary_verified}
                />
              </FormControl>
              <FormField
                control={control}
                name="phone_primary_verified"
                render={({ field: verifiedField }) => (
                  <Button 
                    type="button" 
                    size="sm" 
                    variant={verifiedField.value ? "outline" : "default"}
                    disabled={isVerifying || !field.value || field.value.length !== 10 || verifiedField.value}
                    onClick={() => handleSendOtp(field.value)}
                    className="whitespace-nowrap"
                  >
                    {isVerifying ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : verifiedField.value ? (
                      <span className="flex items-center text-green-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                        Verified
                      </span>
                    ) : (
                      'Verify Phone'
                    )}
                  </Button>
                )}
              />
            </div>
            <FormMessage>{fieldState.error?.message}</FormMessage>
            
            {isOtpSent && !control._formValues.phone_primary_verified && (
              <div className="mt-3 flex items-center space-x-2">
                <Input
                  placeholder="Enter 4-digit OTP"
                  maxLength={4}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-40"
                />
                <FormField
                  control={control}
                  name="phone_primary_verified"
                  render={({ field: { onChange } }) => (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={isVerifying || otp.length !== 4}
                      onClick={() => handleVerifyOtp(field.value, onChange)}
                    >
                      {isVerifying ? 'Verifying...' : 'Submit OTP'}
                    </Button>
                  )}
                />
              </div>
            )}
          </FormItem>
        )}
      />
    </div>
  );
};
