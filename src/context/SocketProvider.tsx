"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export const SOCKET_URL = "https://rnj64vmh-4500.inc1.devtunnels.ms/api/v1";

const SUPPORT_EVENTS = {
  JOIN_TICKET: "join-ticket",
  SEND_MESSAGE: "send-message",
  RECEIVE_MESSAGE: "receive-message",
  CONNECT: "connect",
  DISCONNECT: "disconnect",
  TICKET_UPDATED: "ticket-updated",
};

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  joinTicket: (ticketId: string) => void;
  sendMessageSocket: (
    ticketId: string,
    message: string,
    attachments?: string[],
  ) => void; // ← Updated
  newMessage: any;
  setNewMessage: React.Dispatch<React.SetStateAction<any>>;
  newConversation: any;
  setNewConversation: React.Dispatch<React.SetStateAction<any>>;
}

const SocketContext = createContext<SocketContextType | null>(null);

export const useSocketContext = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocketContext must be used within a SocketProvider");
  }
  return context;
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [newMessage, setNewMessage] = useState<any>(null);
  const [newConversation, setNewConversation] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken") || "";
    if (!token) return;
    const socketInstance = io("https://rnj64vmh-4500.inc1.devtunnels.ms", {
      query: { token },
      transports: ["websocket"],
    });
    setSocket(socketInstance);

    socketInstance.on(SUPPORT_EVENTS.CONNECT, () => {
      console.log("Support Socket connected:", socketInstance.id);
      setIsConnected(true);
    });

    socketInstance.on(SUPPORT_EVENTS.DISCONNECT, () => {
      console.log("Support Socket disconnected");
      setIsConnected(false);
      setSocket(null);
    });

    socketInstance.on(SUPPORT_EVENTS.RECEIVE_MESSAGE, (data) => {
      console.log("New Message Received in Socket:", data);
      setNewMessage(data);
    });

    socketInstance.on(SUPPORT_EVENTS.TICKET_UPDATED, (data) => {
      console.log("Ticket Updated in Socket:", data);
      setNewConversation(data);
    });

    return () => {
      socketInstance.off(SUPPORT_EVENTS.RECEIVE_MESSAGE);
      socketInstance.off(SUPPORT_EVENTS.TICKET_UPDATED);
      socketInstance.disconnect();
    };
  }, []);

  const joinTicket = (ticketId: string) => {
    if (!socket) {
      console.warn("Socket not found in joinTicket");
      return;
    }
    console.log(`Joining room via ${SUPPORT_EVENTS.JOIN_TICKET}:`, ticketId);
    socket.emit(SUPPORT_EVENTS.JOIN_TICKET, { ticketId });
  };

  const sendMessageSocket = (
    ticketId: string,
    message: string,
    attachments: string[] = [],
  ) => {
    if (!socket || !socket.connected) {
      console.error("Socket not connected!");
      return;
    }

    const payload = {
      ticketId,
      message: message || "",
      attachments,
    };

    console.log("Sending message with attachments:", payload);
    socket.emit(SUPPORT_EVENTS.SEND_MESSAGE, payload);
  };
  return (
    <SocketContext.Provider
      value={{
        socket,
        isConnected,
        joinTicket,
        sendMessageSocket,
        newMessage,
        setNewMessage,
        newConversation,
        setNewConversation,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
