import { useRef, useEffect, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ImageAdd02Icon } from "@hugeicons/core-free-icons";

interface FileUploadProps {
  value: File[];
  onChange: (files: File[]) => void;
  error?: string;
  accept?: string;
  multiple?: boolean;
}

export default function FileUpload({ value, onChange, error, accept = "image/*", multiple = true }: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previews, setPreviews] = useState<string[]>([]);

  useEffect(() => {
    const objectUrls = value.map(file => URL.createObjectURL(file));
    setPreviews(objectUrls);

    return () => {
      objectUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [value]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filesList = e.target.files;
    if (!filesList) return;

    const newFiles = Array.from(filesList);
    const updatedFiles = multiple ? [...value, ...newFiles] : newFiles;
    
    onChange(updatedFiles);

    if (fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };

  const removeImage = (index: number) => {
    const newFiles = [...value];
    newFiles.splice(index, 1);
    onChange(newFiles);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        multiple={multiple}
        accept={accept}
        onChange={handleImageUpload}
        className="hidden"
      />
      <div
        onClick={handleUploadClick}
        className="border-2 border-brand/50 rounded-2xl p-6 flex items-center justify-center gap-4 cursor-pointer hover:border-brand/40 hover:bg-brand/5 transition-all group"
      >
        <div className="p-3 bg-gray-50 rounded-full group-hover:bg-brand/10 transition-colors">
          <HugeiconsIcon icon={ImageAdd02Icon} size={28} className="text-gray-400 group-hover:text-brand transition-colors" />
        </div>
        <span className="text-base text-gray-400 group-hover:text-brand/70 font-medium">Upload Files Here</span>
      </div>
      
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      {value.length > 0 && (
        <div className="flex flex-wrap gap-5 mt-6">
          {value.map((file, idx) => (
            <div key={idx} className="relative group w-32 h-24 rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              {file.type.startsWith('image/') ? (
                  <img src={previews[idx]} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
              ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center text-xs text-gray-500 text-center p-2 break-all overflow-hidden">
                      {file.name}
                  </div>
              )}
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <button
                onClick={(e) => { e.stopPropagation(); removeImage(idx); }}
                className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-lg flex items-center justify-center h-6 w-6"
              >
                <span className="text-white font-bold text-sm leading-none m-0 p-0 text-center inline-block translate-y-[0.5px]">×</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
