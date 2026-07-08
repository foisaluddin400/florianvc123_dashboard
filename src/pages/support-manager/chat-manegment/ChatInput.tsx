import { useState, useEffect } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { SentIcon } from "@hugeicons/core-free-icons";
import { useAddFileUploadMutation } from "../../../redux/supportManager/supportMangerApi";
import { Loader } from "lucide-react";
import { CiImageOn } from "react-icons/ci";
import { PiLinkSimpleHorizontalThin } from "react-icons/pi";


interface ChatInputProps {
  value: string;
  onChange: (val: string) => void;
  onSend: (ticketId: string, message: string, attachments: string[]) => void;
  ticketId: string;
}

export const ChatInput = ({
  value,
  onChange,
  onSend,
  ticketId,
}: ChatInputProps) => {
  const [fileUpload] = useAddFileUploadMutation();

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  // Cleanup previews
  useEffect(() => {
    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previews]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const imageFiles = files.filter((f) => f.type.startsWith("image/"));
    const newPreviews = imageFiles.map((file) => URL.createObjectURL(file));

    setSelectedFiles((prev) => [...prev, ...imageFiles]);
    setPreviews((prev) => [...prev, ...newPreviews]);
    e.target.value = "";
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const nonImageFiles = files.filter((f) => !f.type.startsWith("image/"));
    setSelectedFiles((prev) => [...prev, ...nonImageFiles]);
    e.target.value = "";
  };

  const removeFile = (index: number) => {
    const file = selectedFiles[index];
    if (file.type.startsWith("image/")) {
      const previewIndex =
        selectedFiles
          .slice(0, index + 1)
          .filter((f) => f.type.startsWith("image/")).length - 1;

      if (previews[previewIndex]) URL.revokeObjectURL(previews[previewIndex]);
      setPreviews((prev) => prev.filter((_, i) => i !== previewIndex));
    }
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // ==================== MAIN SEND HANDLER ====================
  const handleSend = async () => {
    if ((!value.trim() && selectedFiles.length === 0) || !ticketId) return;

    const currentMessage = value.trim();
    const filesToUpload = [...selectedFiles];

    const hasFiles = filesToUpload.length > 0;

    // Optimistic UI
    onSend(ticketId, currentMessage, []);

    onChange("");
    setSelectedFiles([]);
    setPreviews([]);

    // 👉 ONLY set loading if file exists
    if (hasFiles) {
      setIsUploading(true);

      try {
        const formData = new FormData();

        filesToUpload.forEach((file) => {
          if (file.type.startsWith("image/")) {
            formData.append("chat_images", file);
          } else {
            formData.append("chat_files", file);
          }
        });

        const response = await fileUpload(formData).unwrap();

        const attachments: string[] = [
          ...(response.data?.images || []),
          ...(response.data?.files || []),
        ];

        onSend(ticketId, currentMessage, attachments);
      } catch (error) {
        console.error("File upload failed:", error);
        alert("Failed to upload files.");
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div className="flex-shrink-0 relative border-t bg-white p-4">
      {/* Preview Section */}
      {selectedFiles.length > 0 && (
        <div className="absolute -top-[108px] left-4 right-4 z-20 bg-white border rounded-2xl p-3 shadow-md max-h-[100px] overflow-auto">
          <div className="flex flex-wrap gap-3">
            {selectedFiles.map((file, index) => {
              const isImage = file.type.startsWith("image/");
              const previewUrl = isImage
                ? previews[
                    selectedFiles
                      .slice(0, index + 1)
                      .filter((f) => f.type.startsWith("image/")).length - 1
                  ]
                : null;

              return (
                <div key={index} className="relative group">
                  {isImage && previewUrl ? (
                    <img
                      src={previewUrl}
                      alt={file.name}
                      className="w-20 h-20 object-cover rounded-xl border shadow-sm"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-zinc-100 border rounded-xl flex flex-col items-center justify-center p-2 text-center">
                      <span className="text-3xl mb-1">📄</span>
                      <p className="text-[10px] truncate w-full px-1">
                        {file.name}
                      </p>
                    </div>
                  )}

                  <button
                    onClick={() => removeFile(index)}
                    className="absolute -top-1.5 -right-1.5 bg-red-500 hover:bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs shadow"
                  >
                    ✕
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Input Row */}
      <div className="flex items-center gap-2 relative z-10">
        <label className="cursor-pointer p-2.5 bg-zinc-100 hover:bg-zinc-200 rounded transition-colors">
          <CiImageOn />
          <input
            type="file"
            className="hidden"
            accept="image/*"
            multiple
            onChange={handleImageSelect}
          />
        </label>

        <label className="cursor-pointer p-2 text-xl bg-zinc-100 hover:bg-zinc-200 rounded transition-colors">
          <PiLinkSimpleHorizontalThin />
          <input
            type="file"
            className="hidden"
            accept=".pdf,.doc,.docx,.txt,.zip,.rar"
            multiple
            onChange={handleFileSelect}
          />
        </label>

        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 py-3 px-5 border border-zinc-200 rounded-2xl text-sm outline-nonefocus:border-[#D4B98E]"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <button
          onClick={handleSend}
          disabled={!value.trim() && selectedFiles.length === 0}
          className="p-3 text-[#D4B98E] relative"
        >
          {isUploading ? (
            <Loader className="animate-spin " />
          ) : (
            <HugeiconsIcon icon={SentIcon} size={26} />
          )}
        </button>
      </div>
    </div>
  );
};
