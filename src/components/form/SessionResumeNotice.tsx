
import React from "react";

interface SessionResumeNoticeProps {
  onDismiss: () => void;
}

const SessionResumeNotice: React.FC<SessionResumeNoticeProps> = ({ onDismiss }) => {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-4 flex items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-blue-500 mr-3"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <div>
        <h3 className="font-medium text-blue-700">Session Resumed</h3>
        <p className="text-sm text-blue-600">
          Your previous progress has been restored. You can continue from where you left off.
        </p>
      </div>
      <button
        className="ml-auto text-sm text-blue-700 hover:text-blue-900"
        onClick={onDismiss}
      >
        Dismiss
      </button>
    </div>
  );
};

export default SessionResumeNotice;
