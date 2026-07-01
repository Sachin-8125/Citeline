import {
  Plus,
  Library,
  Folder,
  Bookmark,
  History,
  Settings,
  HelpCircle,
  FileText,
  LoaderCircle,
} from "lucide-react";

export default function Sidebar({
  user,
  uploadStatus,
  uploadedFile,
  documents,
  activeDocument,
  fileInputRef,
  onDocumentSelect,
  UploadStatus,
}) {
  return (
    <aside className="fixed left-0 top-0 h-full w-rail-width bg-paper dark:bg-surface-dim border-r border-rule dark:border-outline-variant flex flex-col py-6 px-4 z-20">
      {/* Brand */}
      <div className="mb-8 px-2">
        <h1 className="font-display-md text-display-md text-primary leading-none">
          Citeline
        </h1>
        <p className="font-body text-xs text-ink-muted uppercase tracking-wider mt-1">
          AI-Powered Research Assistant
        </p>
      </div>

      {/* New Research Button */}
      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={uploadStatus !== UploadStatus.IDLE}
        className="w-full flex items-center justify-center gap-2 bg-primary text-paper-raised py-3 px-4 rounded-lg mb-8 hover:opacity-90 transition-opacity font-heading text-body shadow-sm disabled:opacity-50"
      >
        {uploadStatus === UploadStatus.UPLOADING ? (
          <>
            <LoaderCircle size={16} className="animate-spin" />
            Uploading...
          </>
        ) : (
          <>
            <Plus size={16} />
            New Research
          </>
        )}
      </button>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1">
        <div className="flex items-center gap-3 px-3 py-2 rounded transition-colors text-primary font-heading border-r-2 border-primary bg-paper-raised cursor-pointer">
          <Library size={20} />
          <span className="text-body">Library</span>
        </div>
        <div className="flex items-center gap-3 px-3 py-2 rounded transition-colors text-on-surface-variant font-body hover:bg-paper-raised cursor-pointer">
          <Folder size={20} />
          <span className="text-body">Collections</span>
        </div>
        <div className="flex items-center gap-3 px-3 py-2 rounded transition-colors text-on-surface-variant font-body hover:bg-paper-raised cursor-pointer">
          <Bookmark size={20} />
          <span className="text-body">Bookmarks</span>
        </div>
        <div className="flex items-center gap-3 px-3 py-2 rounded transition-colors text-on-surface-variant font-body hover:bg-paper-raised cursor-pointer">
          <History size={20} />
          <span className="text-body">Recent</span>
        </div>

        {/* Documents List */}
        <div className="mt-8">
          <span className="font-label-caps text-ink-muted text-[11px] px-3 mb-2 block">
            RECENT DOCUMENTS
          </span>

          {/* Upload Progress */}
          {uploadStatus !== UploadStatus.IDLE &&
            uploadStatus !== UploadStatus.READY && (
              <div className="flex flex-col gap-2 p-3 rounded-lg bg-paper-raised border border-rule mx-3 mb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-ink-muted" />
                    <span className="font-sans text-body truncate">
                      {uploadedFile?.name || "document.pdf"}
                    </span>
                  </div>
                  <span className="font-mono text-caption-mono text-[10px] px-2 py-0.5 rounded uppercase transition-colors duration-500 bg-moss/10 text-moss">
                    {uploadStatus === UploadStatus.UPLOADING && "Uploading…"}
                    {uploadStatus === UploadStatus.READING && "Reading…"}
                    {uploadStatus === UploadStatus.INDEXING && "Indexing…"}
                  </span>
                </div>
                <div className="w-full bg-paper h-1 rounded-full overflow-hidden">
                  <div
                    className="bg-moss h-full transition-all duration-2000ms ease-out"
                    style={{
                      width:
                        uploadStatus === UploadStatus.UPLOADING
                          ? "20%"
                          : uploadStatus === UploadStatus.READING
                          ? "40%"
                          : "85%",
                    }}
                  />
                </div>
              </div>
            )}

          {/* Document Items */}
          <div className="space-y-1">
            {documents.map((doc) => (
              <div
                key={doc.id}
                onClick={() => onDocumentSelect(doc)}
                className={`group flex items-center justify-between px-3 py-2 rounded cursor-pointer border transition-all mx-3 ${
                  activeDocument?.id === doc.id
                    ? "bg-paper-raised border-rule text-primary font-medium"
                    : "hover:bg-paper-raised border-transparent hover:border-rule text-ink-muted"
                }`}
              >
                <span className="text-sm truncate">{doc.name}</span>
                <span className="font-caption-mono text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded">
                  READY
                </span>
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* Sidebar Footer */}
      <div className="border-t border-rule pt-4 space-y-1">
        <div className="flex items-center gap-3 px-3 py-2 text-on-surface-variant font-body hover:bg-paper-raised cursor-pointer">
          <Settings size={20} />
          <span className="text-body">Settings</span>
        </div>
        <div className="flex items-center gap-3 px-3 py-2 text-on-surface-variant font-body hover:bg-paper-raised cursor-pointer">
          <HelpCircle size={20} />
          <span className="text-body">Help</span>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-3 px-3 pt-4">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-heading text-sm">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">
              {user?.name || "User"}
            </p>
            <p className="text-xs text-ink-muted truncate">
              {user?.email || ""}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}