
import React, { useRef, useState } from "react";
import { Button } from "./ui/button";

interface FileUploadProps {
  id: string;
  label: string;
  accept: string;
  maxSize?: number; // in MB
  onChange: (file: File | null) => void;
  value?: File | null;
}

const FileUpload: React.FC<FileUploadProps> = ({
  id,
  label,
  accept,
  maxSize = 5, // Default max size is 5MB
  onChange,
  value,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    
    if (file) {
      // Check file size
      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > maxSize) {
        setError(`File size exceeds ${maxSize}MB limit`);
        setFileName("");
        onChange(null);
        return;
      }

      // Check file type
      const fileType = file.type;
      const acceptableTypes = accept.split(',').map(type => type.trim());
      
      const isAcceptableType = acceptableTypes.some(type => {
        if (type.startsWith('.')) {
          // Check file extension
          const extension = '.' + file.name.split('.').pop()?.toLowerCase();
          return extension === type.toLowerCase();
        } else {
          // Check MIME type
          return fileType.includes(type);
        }
      });

      if (!isAcceptableType) {
        setError(`Invalid file type. Accepted types: ${accept}`);
        setFileName("");
        onChange(null);
        return;
      }

      setFileName(file.name);
      setError(null);
      onChange(file);
    } else {
      setFileName("");
      setError(null);
      onChange(null);
    }
  };

  const handleRemove = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setFileName("");
    setError(null);
    onChange(null);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <div className="flex flex-col space-y-2">
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
        <div className="flex items-center gap-2 w-full">
          <input
            type="file"
            id={id}
            ref={fileInputRef}
            accept={accept}
            onChange={handleFileChange}
            className="hidden"
          />
          <Button
            type="button"
            onClick={handleButtonClick}
            className="bg-basecamp-primary hover:bg-basecamp-secondary"
          >
            Browse
          </Button>
          {fileName ? (
            <div className="flex-1 flex justify-between items-center border px-3 py-2 rounded-md">
              <span className="text-sm truncate max-w-[200px]">{fileName}</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleRemove}
                className="h-7 text-red-500 hover:text-red-600 hover:bg-red-50"
              >
                Remove
              </Button>
            </div>
          ) : (
            <span className="text-sm text-gray-500">No file selected</span>
          )}
        </div>
        {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        <p className="text-xs text-gray-500">
          Max size: {maxSize}MB. Accepted formats: {accept.replace(/\./g, "")}
        </p>
      </div>
    </div>
  );
};

export default FileUpload;
