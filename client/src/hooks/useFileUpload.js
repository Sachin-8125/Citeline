import { useState, useRef, useCallback } from "react";
import { useAuth } from "../context/useAuth";

const MessageType = {
  USER: "user",
  ASSISTANT: "assistant",
  SYSTEM: "system",
};

export function useChat(activeDocument) {
  const { accessToken } = useAuth();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [chatStatus, setChatStatus] = useState("idle");
  const textareaRef = useRef(null);
  const messagesEndRef = useRef(null);

  const handleInput = useCallback((e) => {
    const el = e.target;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 128)}px`;
    setInput(el.value);
  }, []);

  const handleSendMessage = useCallback(async () => {
    if (!input.trim() || chatStatus === "sending") return;

    const userMessage = {
      type: MessageType.USER,
      content: input.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setChatStatus("sending");

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    try {
      const response = await fetch("/api/documents/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          message: userMessage.content,
          documentId: activeDocument?.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          type: MessageType.ASSISTANT,
          content: data.response,
          sources: data.sources,
          timestamp: new Date().toISOString(),
        },
      ]);
      setChatStatus("idle");
    } catch (error) {
      setChatStatus("error");
      setMessages((prev) => [
        ...prev,
        {
          type: MessageType.SYSTEM,
          content: `Error: ${error.message}`,
          timestamp: new Date().toISOString(),
        },
      ]);
    }
  }, [input, chatStatus, activeDocument, accessToken]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    },
    [handleSendMessage]
  );

  return {
    messages,
    setMessages,
    input,
    chatStatus,
    textareaRef,
    messagesEndRef,
    handleInput,
    handleSendMessage,
    handleKeyDown,
    MessageType,
  };
}