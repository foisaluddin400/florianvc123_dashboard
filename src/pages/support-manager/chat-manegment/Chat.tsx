"use client";
import { useState, useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";
import { PageContent, PageLayout } from "../../../components/shared/PageLayout";
import ChatFormalCard from "./ChatFormalCard";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";
import { SOCKET_URL, useSocketContext } from "../../../context/SocketProvider";

export default function Chat() {
  const {
    joinTicket,
    sendMessageSocket,
    newMessage,
    setNewMessage,
    newConversation,
    setNewConversation,
    isConnected,
  } = useSocketContext();

  const [tickets, setTickets] = useState<any[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoadingTickets, setIsLoadingTickets] = useState(true);


  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // ---------------------------
  // FETCH TICKETS
  // ---------------------------
  const fetchTickets = async () => {
    setIsLoadingTickets(true);
    try {
      const res = await fetch(`${SOCKET_URL}/support-ticket/my-tickets`, {
        headers: {
          Authorization: `${localStorage.getItem("accessToken")}`,
        },
      });

      const result = await res.json();

      if (result.success && Array.isArray(result.data.data)) {
        setTickets(result.data.data);

        if (!selectedTicket && result.data.data.length > 0) {
          setSelectedTicket(result.data.data[0]);
        }
      } else {
        setTickets([]);
      }
    } catch (err) {
      console.error("Error fetching tickets", err);
      setTickets([]);
    } finally {
      setIsLoadingTickets(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  // ---------------------------
  // FETCH HISTORY + JOIN ROOM
  // ---------------------------
  useEffect(() => {
    if (!selectedTicket) return;

    const fetchHistory = async () => {
     
      try {
        const res = await fetch(
          `${SOCKET_URL}/support-message/get/${selectedTicket.id}`,
          {
            headers: {
              Authorization: `${localStorage.getItem("accessToken")}`,
            },
          },
        );

        const result = await res.json();

        if (result.success && Array.isArray(result.data)) {
          const mapped = result.data
            .map((item: any) => ({
              id: item.id,
              text: item.message,
              sender: item.senderRole === "SUPPORT_MEMBER" ? "me" : "other",
              time: new Date(item.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
              attachments: item.attachments || [],
            }))
            .reverse();

          setMessages(mapped);
        } else {
          setMessages([]);
        }
      } catch (err) {
        console.error(err);
        setMessages([]);
      } finally {
       
      }
    };

    fetchHistory();

    if (isConnected) {
      joinTicket(selectedTicket.id);
    }
  }, [selectedTicket, isConnected]);

  // ---------------------------
  // NEW CONVERSATION (FIXED)
  // ---------------------------
  useEffect(() => {
    if (!newConversation) return;

    setTickets((prev) => {
      const index = prev.findIndex((t) => t.id === newConversation.id);

      if (index !== -1) {
        const updated = {
          ...prev[index],
          ...newConversation,
        };

        const list = [...prev];
        list.splice(index, 1);

        return [updated, ...list];
      }

      return [newConversation, ...prev];
    });

    setSelectedTicket(newConversation);
    setNewConversation(null);
  }, [newConversation]);

  // ---------------------------
  // NEW MESSAGE (FIXED - NO DUPLICATE EFFECT)
  // ---------------------------
  useEffect(() => {
  if (!newMessage) return;

  // ticket list update
  setTickets((prev) =>
    prev.map((ticket) => {
      if (ticket.id === newMessage.ticketId) {
        return {
          ...ticket,
          lastMessage: newMessage.message,
          unseenCount:
            selectedTicket?.id === ticket.id
              ? 0
              : (ticket.unseenCount || 0) + 1,
        };
      }
      return ticket;
    }),
  );

 
  if (newMessage.senderRole === "SUPPORT_MEMBER") {
    setNewMessage(null);
    return;
  }

  
  if (selectedTicket && newMessage.ticketId === selectedTicket.id) {
    const msg = {
      id: newMessage.id || Date.now(),
      text: newMessage.message,
      sender: "other",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      attachments: newMessage.attachments || [],
    };

    setMessages((prev) => [...prev, msg]);
  }

  setNewMessage(null);
}, [newMessage]);




  const handleSendWithFiles = async (
    ticketId: string,
    message: string,
    attachments: string[],
  ) => {
    if (!ticketId || (!message.trim() && attachments.length === 0)) return;

    const tempMsg = {
      id: Date.now(),
      text: message.trim() || "📎 Attachment",
      sender: "me" as const,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      attachments: attachments.length > 0 ? attachments : undefined,
    };

    setMessages((prev) => [...prev, tempMsg]);

    sendMessageSocket(ticketId, message.trim(), attachments);
  };

  return (
    <PageLayout title="Support Dashboard Chat">
      <PageContent>
        <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-200px)]">
          {/* SIDEBAR */}
          <div className="hidden lg:block lg:w-1/4 h-full">
            <div className="bg-white border h-full rounded-lg p-4 overflow-y-auto">
              {isLoadingTickets ? (
                <div className="flex items-center justify-center py-10">
                  <Loader2 className="animate-spin" />
                </div>
              ) : tickets.length ? (
                tickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    onClick={() => setSelectedTicket(ticket)}
                    className={`p-3 mb-3 border rounded-xl cursor-pointer ${
                      selectedTicket?.id === ticket.id ? "bg-orange-50" : ""
                    }`}
                  >
                    <div className="font-bold">
                      {ticket.client?.name || "User"}
                    </div>
                    <div className="text-xs text-gray-400">
                      {ticket.lastMessage}
                    </div>
                  </div>
                ))
              ) : (
                <p>No conversations</p>
              )}
            </div>
          </div>

          {/* CHAT */}
          <div className="flex-1 h-full min-h-0">
            {selectedTicket ? (
              <ChatFormalCard
                name={selectedTicket.client?.name}
                status={isConnected ? "Online" : "Connecting..."}
                bodyStyle="h-full flex flex-col bg-white"
              >
                <div className="flex-1 overflow-y-auto px-4 pt-2">
                  <ChatMessages messages={messages} />
                  <div ref={messagesEndRef} />
                </div>

                <ChatInput
                  value={inputValue}
                  onChange={setInputValue}
                  onSend={handleSendWithFiles}
                  ticketId={selectedTicket?.id || ""}
                />
              </ChatFormalCard>
            ) : (
              <div className="flex items-center justify-center h-full text-zinc-400">
                Select a ticket
              </div>
            )}
          </div>
        </div>
      </PageContent>
    </PageLayout>
  );
}
