import { FileText, User, Zap, ZoomIn, MoreVertical } from "lucide-react";

export default function PreviewCard() {
  return (
    <div className="w-full max-w-5xl mx-auto rounded-xl border border-rule shadow-2xl bg-white overflow-hidden animate-float">
      <div className="h-10 bg-surface-container flex items-center px-4 border-b border-rule gap-2">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/20"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400/20"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-400/20"></div>
        </div>
        <div className="mx-auto bg-paper px-6 py-1 rounded text-[11px] font-caption-mono text-ink-muted border border-rule">
          margin.app / research / quantum_computing_citations
        </div>
      </div>

      <div className="flex h-[500px] text-left">
        <aside className="w-48 border-r border-rule bg-paper p-4 flex flex-col gap-6">
          <div>
            <span className="text-[10px] font-label-caps uppercase tracking-widest text-ink-muted mb-3 block font-semibold">
              My Library
            </span>
            <div className="space-y-2">
              <div className="bg-moss/10 text-moss px-2 py-1.5 rounded flex items-center gap-2 text-[12px] font-medium">
                <FileText size={14} /> Nature_2023.pdf
              </div>
              <div className="px-2 py-1.5 text-ink-muted hover:bg-rule/20 rounded flex items-center gap-2 text-[12px] transition-colors cursor-pointer">
                <FileText size={14} /> arXiv_2104.0.pdf
              </div>
              <div className="px-2 py-1.5 text-ink-muted hover:bg-rule/20 rounded flex items-center gap-2 text-[12px] transition-colors cursor-pointer">
                <FileText size={14} /> Thesis_Draft.doc
              </div>
            </div>
          </div>
        </aside>

        <section className="flex-1 bg-white p-6 overflow-y-auto border-r border-rule">
          <div className="space-y-6">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-moss/10 flex items-center justify-center shrink-0">
                <User size={18} className="text-moss" />
              </div>
              <div className="bg-paper-raised p-4 rounded-lg border border-rule max-w-[80%]">
                <p className="text-[14px] text-ink">
                  Summarize the implications of decoherence in the 2023 Nature
                  paper.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-moss flex items-center justify-center shrink-0">
                <Zap size={18} className="text-white fill-white" />
              </div>
              <div className="bg-white p-4 rounded-lg border border-rule max-w-[90%] relative">
                <p className="text-[14px] leading-relaxed text-ink">
                  The 2023 study highlights that decoherence remains the primary
                  bottleneck for scaling{" "}
                  <span className="bg-ochre/20 border-b border-ochre cursor-pointer">
                    superconducting qubits
                  </span>
                  .
                  <span className="absolute -right-16 top-4 font-caption-mono text-moss text-[11px] font-semibold">
                    [p. 42]
                  </span>
                  It specifically notes that environmental noise at the
                  millikelvin level accounts for 85% of gate fidelity loss.
                  <span className="absolute -right-16 top-16 font-caption-mono text-moss text-[11px] font-semibold">
                    [Table 2]
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>

        <aside className="w-72 bg-surface-container-low p-0 overflow-hidden flex flex-col">
          <div className="p-3 border-b border-rule bg-white flex justify-between items-center">
            <span className="text-[11px] font-caption-mono text-ink-muted">
              Nature_2023.pdf (Page 42)
            </span>
            <div className="flex gap-2">
              <button className="text-ink-muted hover:text-ink">
                <ZoomIn size={16} />
              </button>
              <button className="text-ink-muted hover:text-ink">
                <MoreVertical size={16} />
              </button>
            </div>
          </div>
          <div className="p-6 bg-white flex-1 overflow-y-auto">
            <div className="h-4 w-3/4 bg-rule/20 rounded mb-2"></div>
            <div className="h-4 w-full bg-rule/20 rounded mb-2"></div>
            <div className="h-4 w-full bg-ochre/20 rounded mb-2 border-l-2 border-ochre"></div>
            <div className="h-4 w-5/6 bg-ochre/20 rounded mb-2 border-l-2 border-ochre"></div>
            <div className="h-4 w-full bg-rule/20 rounded mb-2"></div>
            <div className="h-4 w-2/3 bg-rule/20 rounded mb-8"></div>

            <div className="border border-rule p-4 rounded-sm bg-paper-raised">
              <div className="w-full h-24 bg-rule/10 rounded flex items-center justify-center">
                <span className="text-[10px] font-caption-mono text-ink-muted">
                  Fig 4.2: Gate Fidelity Analysis
                </span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
