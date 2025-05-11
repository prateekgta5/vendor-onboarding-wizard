
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { sendOTP, verifyOTP, showToast } from "@/utils/formUtils";

interface OTPVerificationProps {
  phoneNumber: string;
  onVerified: () => void;
}

const OTPVerification: React.FC<OTPVerificationProps> = ({
  phoneNumber,
  onVerified,
}) => {
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      showToast("Invalid Phone Number", "Please enter a valid phone number", "error");
      return;
    }

    setLoading(true);
    try {
      const result = await sendOTP(phoneNumber);
      if (result) {
        setOtpSent(true);
        showToast("OTP Sent", `OTP has been sent to ${phoneNumber}`, "success");
      } else {
        showToast("Failed to Send OTP", "Please try again later", "error");
      }
    } catch (error) {
      showToast("Error", "An error occurred while sending OTP", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 4) {
      showToast("Invalid OTP", "Please enter a valid 4-digit OTP", "error");
      return;
    }

    setLoading(true);
    try {
      const result = await verifyOTP(phoneNumber, otp);
      if (result) {
        showToast("Verified", "Phone number verified successfully", "success");
        onVerified();
      } else {
        showToast("Invalid OTP", "The OTP you entered is incorrect", "error");
      }
    } catch (error) {
      showToast("Error", "An error occurred while verifying OTP", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-2 p-3 border border-basecamp-secondary rounded-md bg-basecamp-accent">
      {!otpSent ? (
        <div className="flex items-center gap-2">
          <Button
            type="button"
            size="sm"
            onClick={handleSendOTP}
            disabled={loading || !phoneNumber || phoneNumber.length < 10}
            className="bg-basecamp-primary hover:bg-basecamp-secondary"
          >
            {loading ? "Sending..." : "Send OTP"}
          </Button>
          <span className="text-sm text-slate-600">
            Verify your phone number with OTP
          </span>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Input
              type="text"
              placeholder="Enter 4-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={4}
              className="w-36"
            />
            <Button
              type="button"
              size="sm"
              onClick={handleVerifyOTP}
              disabled={loading || otp.length !== 4}
              className="bg-basecamp-primary hover:bg-basecamp-secondary"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </Button>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-600">
              OTP sent to {phoneNumber}
            </span>
            <Button
              type="button"
              variant="link"
              size="sm"
              onClick={handleSendOTP}
              disabled={loading}
              className="text-xs p-0 h-auto"
            >
              Resend OTP
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OTPVerification;
