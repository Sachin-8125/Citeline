import { ArrowUp, LoaderCircle } from "lucide-react";

export default function ChatInput({
  input,
  chatStatus,
  activeDocument,
  textareaRef,
  onInput,
  onKeyDown,
  onSend,
}) {
  return (
    <div className="p-6 border-t border-rule bg-paper-raised">
      <div className="relative max-w-2xl mx-auto">
        <textarea
          ref={textareaRef}
          value={input}
          onInput={onInput}
          onKeyDown={onKeyDown}
          disabled={chatStatus === "sending"}
          className="w-full bg-paper border border-rule rounded-xl px-5 py-4 pr-16 text-sm focus:outline-none focus:border-moss min-h-[60px] max-h-32 resize-none transition-all disabled:opacity-50"
          placeholder={
            activeDocument
              ? "Follow up or extract citation..."
              : "Upload a document first..."
          }
          rows="1"
        />
        <button
          onClick={onSend}
          disabled={
            !input.trim() ||
            chatStatus === "sending" ||
            !activeDocument
          }
          className="absolute right-3 bottom-3 p-2 bg-moss text-paper-raised rounded-lg hover:opacity-90 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {chatStatus === "sending" ? (
            <LoaderCircle size={20} className="animate-spin" />
          ) : (
            <ArrowUp size={20} />
          )}
        </button>
      </div>
    </div>
  );
}