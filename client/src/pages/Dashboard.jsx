import { useState, useEffect, useRef } from "react";
import {
  Plus,
  Library,
  Folder,
  Bookmark,
  History,
  Settings,
  HelpCircle,
  FileText,
  Search,
  Bell,
  ArrowUp,
  ZoomIn,
  ZoomOut,
  Printer,
  ExternalLink,
} from "lucide-react";

export default function Dashboard() {
  const [uploadStatus, setUploadStatus] = useState("idle");
  const textareaRef = useRef(null);

  useEffect(() => {
    const t1 = setTimeout(() => setUploadStatus("reading"), 100);
    const t2 = setTimeout(() => setUploadStatus("indexing"), 2500);
    const t3 = setTimeout(() => setUploadStatus("ready"), 5500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const handleInput = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <div className="bg-paper text-ink font-body h-screen overflow-hidden flex">
      <aside className="fixed left-0 top-0 h-full w-rail-width bg-paper dark:bg-surface-dim border-r border-rule dark:border-outline-variant flex flex-col py-6 px-4 z-20">
        <div className="mb-8 px-2">
          <h1 className="font-display-md text-display-md text-primary leading-none">
            Citeline
          </h1>
          <p className="font-body text-xs text-ink-muted uppercase tracking-wider mt-1">
            Reasearch Assistant
          </p>
        </div>

        <button className="w-full flex items-center justify-center gap-2 bg-primary text-paper-raised py-3 px-4 rounded-lg mb-8 hover:opacity-90 transition-opacity font-heading text-body shadow-sm">
          <Plus size={16} />
          New Research
        </button>

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

          <div className="mt-8">
            <span className="font-label-caps text-ink-muted text-[11px] px-3 mb-2 block">
              RECENT DOCUMENTS
            </span>
            <div className="library-rail-content space-y-3 mb-2 px-3">
              {uploadStatus !== "idle" && (
                <div
                  className={`flex flex-col gap-2 p-3 rounded-lg bg-paper-raised border transition-all duration-300 animate-in fade-in slide-in-from-left-4 ${
                    uploadStatus === "ready" ? "border-rule ring-1 ring-moss/30" : "border-rule"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-ink-muted" />
                      <span className="font-sans text-body truncate">
                        seminar-notes.pdf
                      </span>
                    </div>
                    <span
                      className={`font-mono text-caption-mono text-[10px] px-2 py-0.5 rounded uppercase transition-colors duration-500 ${
                        uploadStatus === "reading"
                          ? "bg-paper text-ink-muted"
                          : uploadStatus === "indexing"
                          ? "bg-moss/10 text-moss"
                          : "bg-moss text-white"
                      }`}
                    >
                      {uploadStatus === "reading" && "Reading…"}
                      {uploadStatus === "indexing" && "Indexing passages…"}
                      {uploadStatus === "ready" && "Ready"}
                    </span>
                  </div>
                  <div className="w-full bg-paper h-1 rounded-full overflow-hidden">
                    <div
                      className="bg-moss h-full transition-all duration-2000 ease-out"
                      style={{
                        width:
                          uploadStatus === "reading"
                            ? "40%"
                            : uploadStatus === "indexing"
                            ? "85%"
                            : "100%",
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="space-y-1">
              <div className="group flex items-center justify-between px-3 py-2 rounded hover:bg-paper-raised cursor-pointer border border-transparent hover:border-rule transition-all">
                <span className="text-sm truncate text-primary font-medium">
                  lecture-notes.pdf
                </span>
                <span className="font-caption-mono text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded">
                  READY
                </span>
              </div>
              <div className="group flex items-center justify-between px-3 py-2 rounded hover:bg-paper-raised cursor-pointer border border-transparent hover:border-rule transition-all">
                <span className="text-sm truncate text-ink-muted">
                  research-paper.pdf
                </span>
                <span className="font-caption-mono text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded">
                  READY
                </span>
              </div>
              <div className="group flex items-center justify-between px-3 py-2 rounded hover:bg-paper-raised cursor-pointer border border-transparent hover:border-rule transition-all">
                <span className="text-sm truncate text-ink-muted">
                  methodology_draft.pdf
                </span>
                <span className="font-caption-mono text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded">
                  READY
                </span>
              </div>
            </div>
          </div>
        </nav>

        <div className="border-t border-rule pt-4 space-y-1">
          <div className="flex items-center gap-3 px-3 py-2 text-on-surface-variant font-body hover:bg-paper-raised cursor-pointer">
            <Settings size={20} />
            <span className="text-body">Settings</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2 text-on-surface-variant font-body hover:bg-paper-raised cursor-pointer">
            <HelpCircle size={20} />
            <span className="text-body">Help</span>
          </div>
          <div className="flex items-center gap-3 px-3 pt-4">
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
              alt="User profile"
              className="w-8 h-8 rounded-full border border-rule object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Julian Barnes</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col ml-rail-width h-screen bg-paper overflow-hidden relative">
        <header className="fixed top-0 right-0 w-[calc(100%-theme(spacing.rail-width))] h-16 bg-paper border-b border-rule flex justify-between items-center px-6 z-10">
          <div className="flex items-center gap-4">
            <FileText className="text-ink-muted" size={24} />
            <div className="flex flex-col">
              <h2 className="font-heading text-sm text-ink leading-none">
                lecture-notes.pdf
              </h2>
              <span className="font-caption-mono text-[11px] text-ink-muted">
                Page 14 of 42
              </span>
            </div>
          </div>

          <div className="flex-1 max-w-md mx-8">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted text-sm group-focus-within:text-primary" size={18} />
              <input
                type="text"
                placeholder="Search document or ask..."
                className="w-full bg-paper-raised border-rule border text-sm py-2 pl-10 pr-4 rounded-lg focus:outline-none focus:ring-0 focus:border-primary focus:bg-white transition-all"
              />
            </div>
          </div>

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
            <div className="h-6 w-px bg-rule"></div>
            <div className="flex items-center gap-3">
              <Bell className="text-ink-muted cursor-pointer hover:text-primary" size={20} />
              <button className="bg-moss text-paper-raised px-4 py-1.5 rounded text-sm font-heading hover:opacity-90">
                Share
              </button>
            </div>
          </div>
        </header>

        <div className="flex flex-1 pt-16 h-full">
          <section className="flex-1 min-w-chat-min-width h-full flex flex-col border-r border-rule relative">
            <div className="flex-1 overflow-y-auto p-margin space-y-8 max-w-2xl mx-auto w-full scroll-smooth">
              <div className="flex flex-col items-end">
                <div className="bg-primary text-paper-raised px-5 py-4 rounded-xl rounded-tr-none max-w-[85%] border border-primary/20">
                  <p className="font-body text-body">
                    How does the author characterize the impact of large language
                    models on traditional qualitative research methodologies in
                    chapter 3?
                  </p>
                </div>
                <span className="font-caption-mono text-[10px] text-ink-muted mt-2">
                  10:42 AM
                </span>
              </div>

              <div className="flex flex-col items-start relative pr-12">
                <div className="bg-paper-raised text-ink px-6 py-5 rounded-xl rounded-tl-none border border-rule shadow-sm relative w-full">
                  <p className="font-body text-body leading-relaxed">
                    In Chapter 3, the author argues that LLMs represent a
                    "transitional friction" for qualitative researchers.
                    Specifically, they note that while traditional coding processes
                    are accelerated, there is a risk of losing the{" "}
                    <span className="border-b-2 border-ochre/30 bg-ochre/5 cursor-pointer">
                      "nuanced semiotic interpretation"
                    </span>{" "}
                    that human ethnographers provide.
                  </p>
                  <p className="font-body text-body leading-relaxed mt-4">
                    Crucially, the text suggests that LLMs should be viewed as
                    "collaborative agents" rather than "replacement engines,"
                    emphasizing that the primary value remains in the researcher's
                    ability to ground synthetic findings in lived experience.
                  </p>

                  <div className="margin-mark group">
                    <div className="bg-moss text-paper-raised font-caption-mono text-[10px] px-1.5 py-3 rounded-r-md cursor-help flex flex-col items-center gap-1 shadow-sm hover:translate-x-1 transition-transform">
                      <span className="rotate-90">p14</span>
                    </div>
                  </div>
                </div>
                <span className="font-caption-mono text-[10px] text-ink-muted mt-2">
                  Assistant • Verified Source
                </span>
              </div>

              <div className="flex flex-col items-start relative pr-12">
                <div className="bg-paper-raised text-ink px-6 py-5 rounded-xl rounded-tl-none border border-rule shadow-sm relative w-full">
                  <p className="font-body text-body leading-relaxed">
                    The passage on page 14 highlights that the shift toward
                    automated thematic analysis must be balanced with strict
                    evidentiary chains.
                  </p>
                  <div className="margin-mark">
                    <div className="bg-moss text-paper-raised font-caption-mono text-[10px] px-1.5 py-3 rounded-r-md cursor-help flex flex-col items-center gap-1 shadow-sm hover:translate-x-1 transition-transform">
                      <span className="rotate-90">p16</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-rule bg-paper-raised">
              <div className="relative max-w-2xl mx-auto">
                <textarea
                  ref={textareaRef}
                  onInput={handleInput}
                  className="w-full bg-paper border border-rule rounded-xl px-5 py-4 pr-16 text-sm focus:outline-none focus:border-moss min-h-[60px] max-h-32 resize-none transition-all"
                  placeholder="Follow up or extract citation..."
                  rows="1"
                ></textarea>
                <button className="absolute right-3 bottom-3 p-2 bg-moss text-paper-raised rounded-lg hover:opacity-90 transition-opacity">
                  <ArrowUp size={20} />
                </button>
              </div>
            </div>
          </section>

          <section className="w-viewer-width-pct h-full bg-white flex flex-col shadow-inner">
            <div className="h-12 border-b border-rule flex items-center justify-between px-6 bg-paper-raised">
              <div className="flex items-center gap-4">
                <button className="text-ink-muted hover:text-ink">
                  <ZoomIn size={20} />
                </button>
                <button className="text-ink-muted hover:text-ink">
                  <ZoomOut size={20} />
                </button>
                <span className="text-xs font-caption-mono text-ink-muted">
                  100%
                </span>
              </div>
              <div className="flex items-center gap-4">
                <button className="text-ink-muted hover:text-ink">
                  <Printer size={20} />
                </button>
                <button className="text-ink-muted hover:text-ink">
                  <ExternalLink size={20} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-12 bg-surface-container-low flex justify-center">
              <div className="w-full max-w-[800px] bg-white shadow-xl min-h-screen p-16 relative">
                <div className="space-y-6 text-ink opacity-90 select-none">
                  <p className="font-display-lg text-xl mb-12 border-b border-rule pb-4">
                    Chapter 3: The Synthetic Turn
                  </p>
                  <p className="font-body text-base leading-relaxed">
                    The integration of transformer-based architectures into the
                    qualitative workflow marks a significant departure from
                    traditional inductive methods. Historically, the researcher
                    acted as the sole filter for thematic emergence. However, the
                    rise of "Scale-First" analysis introduces a second, non-human
                    filter.
                  </p>
                  <p className="font-body text-base leading-relaxed">
                    This friction is most evident when analyzing colloquial
                    transcripts. The LLM prioritizes frequency and structural
                    coherence, often overlooking the{" "}
                    <span className="bg-ochre/20 px-1 rounded-sm border-b border-ochre/50 relative">
                      nuanced semiotic interpretation
                      <span className="absolute -top-6 left-0 font-caption-mono text-[9px] text-ochre bg-white px-1 shadow-sm border border-ochre/30">
                        Assistant Highlight
                      </span>
                    </span>{" "}
                    that defines the ethnographic tradition. It is here that we
                    find the primary methodological tension.
                  </p>
                  <div className="h-32 w-full bg-surface-container flex items-center justify-center border-2 border-dashed border-rule mt-8">
                    <span className="font-caption-mono text-ink-muted text-xs">
                      Figure 3.1: Evidentiary Flow in Synthetic Workflows
                    </span>
                  </div>
                  <p className="font-body text-base leading-relaxed mt-12">
                    Moving forward, the "transitional friction" described must be
                    acknowledged not as a flaw, but as a necessary guardrail. By
                    grounding synthetic findings in the lived experience of the
                    primary investigator, we maintain the integrity of the
                    qualitative record.
                  </p>
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-caption-mono text-[11px] text-ink-muted">
                    — 14 —
                  </div>
                </div>
                <div className="absolute left-0 top-0 h-full w-8 border-r border-rule/30 pointer-events-none"></div>
                <div className="absolute right-0 top-0 h-full w-8 border-l border-rule/30 pointer-events-none"></div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}