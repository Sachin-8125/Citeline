import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { LoaderCircle } from "lucide-react";

import { useChat } from "../hooks/useChat";
import { useFileUpload } from "../hooks/useFileUpload";

import Sidebar from "../components/dashboard/Sidebar";
import Header from "../components/dashboard/Header";
import ChatSection from "../components/dashboard/ChatSection";
import PDFViewer from "../components/dashboard/PDFViewer";

export default function Dashboard() {
  const { user, isAuthenticated, isBootstrapping } = useAuth();
  const navigate = useNavigate();

  const [documents, setDocuments] = useState([]);
  const [activeDocument, setActiveDocument] = useState(null);
  const [viewerZoom, setViewerZoom] = useState(100);

  const fileInputRef = useRef(null);

  const {
    messages,
    setMessages,
    input,
    chatStatus,
    textareaRef,
    messagesEndRef,
    handleInput,
    handleSendMessage,
    handleKeyDown,
  } = useChat(activeDocument);

  const {
    uploadStatus,
    uploadedFile,
    handleFileUpload,
    UploadStatus,
  } = useFileUpload(setMessages, setDocuments, setActiveDocument);

  // ── Auth Guard ─────────────────────────
  useEffect(() => {
    if (!isBootstrapping && !isAuthenticated) {
      navigate("/signin", { replace: true });
    }
  }, [isBootstrapping, isAuthenticated, navigate]);

  // ── Auto-scroll to new messages ────────
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, messagesEndRef]);

  // ── Loading state ──────────────────────
  if (isBootstrapping) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper">
        <div className="text-center">
          <LoaderCircle
            size={40}
            className="animate-spin text-primary mx-auto mb-4"
          />
          <p className="font-body text-on-surface-variant">
            Loading Citeline...
          </p>
        </div>
      </div>
    );
  }

  // ── Render ─────────────────────────────
  return (
    <div className="bg-paper text-ink font-body h-screen overflow-hidden flex">
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.docx,.txt"
        className="hidden"
        onChange={handleFileUpload}
      />

      {/* Sidebar */}
      <Sidebar
        user={user}
        uploadStatus={uploadStatus}
        uploadedFile={uploadedFile}
        documents={documents}
        activeDocument={activeDocument}
        fileInputRef={fileInputRef}
        onDocumentSelect={setActiveDocument}
        UploadStatus={UploadStatus}
      />

      <main className="flex-1 flex flex-col ml-rail-width h-screen bg-paper overflow-hidden relative">
        <Header activeDocument={activeDocument} />

        <div className="flex flex-1 pt-16 h-full">
          {/* Chat */}
          <ChatSection
            messages={messages}
            input={input}
            chatStatus={chatStatus}
            activeDocument={activeDocument}
            textareaRef={textareaRef}
            messagesEndRef={messagesEndRef}
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            onSend={handleSendMessage}
          />

          {/* PDF Viewer */}
          <PDFViewer
            activeDocument={activeDocument}
            viewerZoom={viewerZoom}
            onZoomIn={() => setViewerZoom((z) => Math.min(200, z + 10))}
            onZoomOut={() => setViewerZoom((z) => Math.max(50, z - 10))}
          />
        </div>
      </main>
    </div>
  );
}