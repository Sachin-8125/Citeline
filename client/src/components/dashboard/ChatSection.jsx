import { FileText } from "lucide-react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

export default function ChatSection({
  messages,
  input,
  chatStatus,
  activeDocument,
  textareaRef,
  messagesEndRef,
  onInput,
  onKeyDown,
  onSend,
}) {
  return (
    <section className="flex-1 min-w-chat-min-width h-full flex flex-col border-r border-rule relative">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-margin space-y-8 max-w-2xl mx-auto w-full scroll-smooth">
        {/* Empty State */}
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center pt-20">
            <FileText size={48} className="text-ink-muted/30 mb-4" />
            <h3 className="font-heading text-lg text-ink mb-2">
              {activeDocument
                ? "Ask a question about your document"
                : "Upload a document to get started"}
            </h3>
            <p className="font-body text-sm text-on-surface-variant max-w-md">
              {activeDocument
                ? "Type your question below and I'll help you find answers from the document."
                : "Click 'New Research' in the sidebar to upload a PDF, DOCX, or TXT file."}
            </p>
          </div>
        )}

        {/* Message List */}
        {messages.map((msg, index) => (
          <ChatMessage key={index} msg={msg} />
        ))}

        {/* Auto-scroll anchor */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <ChatInput
        input={input}
        chatStatus={chatStatus}
        activeDocument={activeDocument}
        textareaRef={textareaRef}
        onInput={onInput}
        onKeyDown={onKeyDown}
        onSend={onSend}
      />
    </section>
  );
}