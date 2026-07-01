import { FileText, Search, Bell } from "lucide-react";

export default function Header({ activeDocument }) {
  return (
    <header className="fixed top-0 right-0 w-[calc(100%-theme(spacing.rail-width))] h-16 bg-paper border-b border-rule flex justify-between items-center px-6 z-10">
      {/* Document Info */}
      <div className="flex items-center gap-4">
        <FileText className="text-ink-muted" size={24} />
        <div className="flex flex-col">
          <h2 className="font-heading text-sm text-ink leading-none">
            {activeDocument?.name || "No document selected"}
          </h2>
          <span className="font-caption-mono text-[11px] text-ink-muted">
            {activeDocument
              ? `Page ${activeDocument.currentPage || 1} of ${
                  activeDocument.totalPages || "?"
                }`
              : "Upload a document to begin"}
          </span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative group">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted text-sm group-focus-within:text-primary"
            size={18}
          />
          <input
            type="text"
            placeholder="Search document or ask..."
            className="w-full bg-paper-raised border-rule border text-sm py-2 pl-10 pr-4 rounded-lg focus:outline-none focus:ring-0 focus:border-primary focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-6">
        <div className="flex gap-4">
          <button className="text-sm font-heading text-primary border-b-2 border-primary pb-1">
            Research
          </button>
          <button className="text-sm font-body text-on-surface-variant hover:text-primary transition-colors">
            Cite
          </button>
          <button className="text-sm font-body text-on-surface-variant hover:text-primary transition-colors">
            Export
          </button>
        </div>
        <div className="h-6 w-px bg-rule" />
        <div className="flex items-center gap-3">
          <Bell
            className="text-ink-muted cursor-pointer hover:text-primary"
            size={20}
          />
          <button className="bg-moss text-paper-raised px-4 py-1.5 rounded text-sm font-heading hover:opacity-90">
            Share
          </button>
        </div>
      </div>
    </header>
  );
}