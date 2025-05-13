
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

interface SessionResumeNoticeProps {
  onDismiss: () => void;
}

export const SessionResumeNotice: React.FC<SessionResumeNoticeProps> = ({ onDismiss }) => {
  return (
    <Alert className="mt-4 bg-blue-50 border-blue-200 flex items-center justify-between">
      <div className="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 mr-2">
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
          <path d="m9 12 2 2 4-4"></path>
        </svg>
        <AlertDescription className="text-blue-800">
          We've restored your previous application progress. You can continue where you left off.
        </AlertDescription>
      </div>
      <Button variant="ghost" size="sm" onClick={onDismiss} className="ml-2 text-blue-800">
        Dismiss
      </Button>
    </Alert>
  );
};
