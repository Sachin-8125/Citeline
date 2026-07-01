import { FileText } from "lucide-react";

const MessageType = {
  USER: "user",
  ASSISTANT: "assistant",
  SYSTEM: "system",
};

export default function ChatMessage({ msg }) {
  return (
    <div
      className={`flex flex-col ${
        msg.type === MessageType.USER ? "items-end" : "items-start"
      }`}
    >
      {/* Message Bubble */}
      <div
        className={`px-5 py-4 rounded-xl max-w-[85%] ${
          msg.type === MessageType.USER
            ? "bg-primary text-paper-raised rounded-tr-none"
            : msg.type === MessageType.SYSTEM
            ? "bg-warning/10 text-warning border border-warning/20 rounded-xl"
            : "bg-paper-raised text-ink rounded-tl-none border border-rule shadow-sm"
        }`}
      >
        <p className="font-body text-body leading-relaxed whitespace-pre-wrap">
          {msg.content}
        </p>

        {/* Sources — only on assistant messages */}
        {msg.sources && msg.sources.length > 0 && (
          <div className="mt-3 pt-3 border-t border-rule/30">
            <span className="font-caption-mono text-[10px] text-ink-muted uppercase tracking-wider">
              Sources:
            </span>
            {msg.sources.map((source, i) => (
              <div
                key={i}
                className="flex items-center gap-2 mt-1 text-xs text-primary cursor-pointer hover:underline"
              >
                <FileText size={12} />
                <span>
                  {source.documentName} — p.{source.pageNumber}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Timestamp / Label */}
      {msg.type === MessageType.USER && (
        <span className="font-caption-mono text-[10px] text-ink-muted mt-2">
          {new Date(msg.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      )}
      {msg.type === MessageType.ASSISTANT && (
        <span className="font-caption-mono text-[10px] text-ink-muted mt-2">
          Assistant •{" "}
          {msg.sources ? "Verified Source" : "Generated Response"}
        </span>
      )}
    </div>
  );
}