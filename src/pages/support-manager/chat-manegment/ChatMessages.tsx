import { useState } from "react";
import { cn } from "../../../lib/utils";
import type { Message } from "../../../types/chat";

export const ChatMessages = ({ messages }: { messages: Message[] }) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  console.log(messages)
  const isImage = (url: string) => {
    return /\.(jpg|jpeg|png|webp|gif)$/i.test(url);
  };

  return (
    <>
      <div className="space-y-6 pb-4">
        <div className="text-center text-[10px] text-zinc-400 font-bold tracking-widest uppercase my-4 sticky top-0 bg-white/90 backdrop-blur-sm py-2 z-10">
          Today
        </div>

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${
              msg.sender === "me" ? "items-end" : "items-start"
            }`}
          >
            {/* TEXT */}
            {msg.text && (
              <div
                className={cn(
                  "max-w-[50%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm break-words whitespace-pre-wrap",
                  msg.sender === "me"
                    ? "bg-[#D4B785] text-[#666666] rounded-tr-none"
                    : "bg-[#EFF0F2] text-[#666666] rounded-tl-none"
                )}
              >
                {msg.text}
              </div>
            )}

            {/* ATTACHMENTS */}
            {msg.attachments && msg.attachments.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {msg.attachments.map((attachment, index) => (
                  <div key={index}>
                    {isImage(attachment) ? (
                      <img
                        src={attachment}
                        alt="Attachment"
                        onClick={() => setPreviewImage(attachment)}
                        className="w-20 h-20 object-cover rounded-lg border cursor-pointer hover:scale-105 transition"
                      />
                    ) : (
                      <a
                        href={attachment}
                        target="_blank"
                        className="w-40 h-12 bg-zinc-100 border rounded-lg flex items-center justify-center text-xs px-2 hover:bg-zinc-200"
                      >
                        📄 File
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}

            <span className="text-[10px] text-zinc-400 mt-1 px-1 font-medium">
              {msg.time}
            </span>
          </div>
        ))}
      </div>

      {/* IMAGE PREVIEW MODAL */}
      {previewImage && (
        <div
          onClick={() => setPreviewImage(null)}
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
        >
          <img
            src={previewImage}
            className="max-w-[90%] max-h-[90%] rounded-xl shadow-lg"
          />
        </div>
      )}
    </>
  );
};