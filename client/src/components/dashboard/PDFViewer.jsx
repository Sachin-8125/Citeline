import { FileText, ZoomIn, ZoomOut, Printer, ExternalLink } from "lucide-react";

export default function PDFViewer({ activeDocument, viewerZoom, onZoomIn, onZoomOut }) {
  return (
    <section className="w-viewer-width-pct h-full bg-white flex flex-col shadow-inner">
      {/* Viewer Toolbar */}
      <div className="h-12 border-b border-rule flex items-center justify-between px-6 bg-paper-raised">
        <div className="flex items-center gap-4">
          <button
            onClick={onZoomOut}
            className="text-ink-muted hover:text-ink"
            aria-label="Zoom out"
          >
            <ZoomOut size={20} />
          </button>
          <span className="text-xs font-caption-mono text-ink-muted min-w-[40px] text-center">
            {viewerZoom}%
          </span>
          <button
            onClick={onZoomIn}
            className="text-ink-muted hover:text-ink"
            aria-label="Zoom in"
          >
            <ZoomIn size={20} />
          </button>
        </div>
        <div className="flex items-center gap-4">
          <button
            className="text-ink-muted hover:text-ink"
            aria-label="Print"
          >
            <Printer size={20} />
          </button>
          <button
            className="text-ink-muted hover:text-ink"
            aria-label="Open in new tab"
          >
            <ExternalLink size={20} />
          </button>
        </div>
      </div>

      {/* Viewer Content */}
      <div className="flex-1 overflow-y-auto p-12 bg-surface-container-low flex justify-center">
        {activeDocument ? (
          <div
            className="w-full max-w-[800px] bg-white shadow-xl min-h-screen p-16 relative"
            style={{ zoom: `${viewerZoom}%` }}
          >
            <div className="space-y-6 text-ink opacity-90 select-none">
              <p className="font-display-lg text-xl mb-12 border-b border-rule pb-4">
                {activeDocument.name}
              </p>
              <p className="font-body text-base leading-relaxed text-on-surface-variant italic">
                Document preview would load here from the backend.
              </p>
            </div>
            {/* Page margin decorations */}
            <div className="absolute left-0 top-0 h-full w-8 border-r border-rule/30 pointer-events-none" />
            <div className="absolute right-0 top-0 h-full w-8 border-l border-rule/30 pointer-events-none" />
          </div>
        ) : (
          // Empty state
          <div className="flex flex-col items-center justify-center h-full text-center">
            <FileText size={64} className="text-ink-muted/20 mb-4" />
            <p className="font-body text-on-surface-variant">
              Select or upload a document to view
            </p>
          </div>
        )}
      </div>
    </section>
  );
}