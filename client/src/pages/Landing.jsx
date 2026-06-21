import { useState, useEffect } from "react";
import { Anchor, BookOpen, Quote, CheckCircle2, Globe, Rss } from "lucide-react";
import PreviewCard from "../components/PreviewCard";
import { Link } from "react-router-dom";

export default function Landing() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-paper text-ink font-body selection:bg-moss/20 min-h-screen">
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md border-b border-rule h-16 flex items-center justify-between px-margin ${
          isScrolled ? "bg-paper/95 shadow-sm" : "bg-paper/80"
        }`}
      >
        <div className="flex items-center gap-8">
          <span className="font-display-md text-display-md text-moss font-extrabold tracking-tight ml-3">
            Citeline
          </span>
          <div className="hidden md:flex gap-6">
            <a href="#" className="text-label-caps font-label-caps font-semibold text-on-surface-variant hover:text-moss transition-colors">Research</a>
            <a href="#" className="text-label-caps font-label-caps font-semibold text-on-surface-variant hover:text-moss transition-colors">Cite</a>
            <a href="#" className="text-label-caps font-label-caps font-semibold text-on-surface-variant hover:text-moss transition-colors">Export</a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="font-label-caps text-label-caps font-semibold px-4 py-2 text-ink hover:text-moss transition-colors">
            <Link to="/signin">Log In</Link>
          </button>
          <button className="bg-moss text-paper-raised bg-emerald-800 px-5 py-2.5 rounded-lg font-heading text-[14px] font-semibold hover:opacity-90 active:scale-95 transition-all">
            <Link to="/signup">Get Started Free</Link>
          </button>
        </div>
      </nav>

      <main className="pt-16">
        <section className="relative overflow-hidden pt-20 pb-32 px-margin">
          <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
            <h1 className="font-display-lg text-display-lg md:text-[64px] mb-6 text-ink max-w-3xl leading-[1.1] font-semibold">
              Research with receipts.
            </h1>
            
            <p className="font-body text-heading text-ink-muted max-w-2xl mb-10">
              Citeline is the first academic assistant that grounds every AI generation in your specific document library. No hallucinations, just evidence-based synthesis.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-20">
              <button className="bg-moss text-paper-raised bg-emerald-800 px-8 py-4 rounded-lg font-heading text-heading font-semibold hover:shadow-xl transition-all hover:-translate-y-0.5 active:scale-95">
                <Link to="/signup">Get Started Free</Link>
              </button>
              <button className="border border-rule text-ink px-8 py-4 rounded-lg font-heading text-heading font-semibold hover:bg-paper-raised transition-all active:scale-95">
                View Documentation
              </button>
            </div>

            <PreviewCard/>
          </div>
          <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none opacity-40"></div>
        </section>

        <section className="py-24 px-margin bg-paper-raised relative border-y border-rule">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16 text-center">
              <h2 className="font-display-md text-display-md text-ink mb-4 font-semibold">Built for Rigorous Minds.</h2>
              <p className="text-ink max-w-xl mx-auto text-body">
                Standard LLMs guess. Citeline proves. Every claim is anchored to a PDF in your library.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-8 glossy-card p-10 rounded-xl relative overflow-hidden group">
                <div className="relative z-10">
                  <Anchor size={48} className="text-moss mb-6 fill-moss text-emerald-800" />
                  <h3 className="font-heading text-heading  font-semibold mb-4">Instant Grounding</h3>
                  <p className="font-body text-ink-muted max-w-md">
                    Every sentence the AI writes is dynamically linked to its source document. Click any claim to jump exactly to the paragraph and page where the information lives.
                  </p>
                </div>
                <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-moss/5 rounded-full blur-3xl group-hover:bg-moss/10 transition-colors"></div>
              </div>

              <div className="md:col-span-4 border border-rule bg-white p-10 rounded-xl">
                <BookOpen size={40} className="text-ochre mb-6 text-yellow-600" />
                <h3 className="font-heading text-heading font-semibold mb-4">Source Sidecar</h3>
                <p className="font-body text-ink-muted">
                  Keep your focus. The Source Sidecar docks your original PDFs alongside the chat window, highlighting relevant passages in real-time.
                </p>
              </div>

              <div className="md:col-span-5 border border-rule bg-white p-10 rounded-xl">
                <Quote size={40} className="text-moss mb-6 text-emerald-800" />
                <h3 className="font-heading text-heading font-semibold mb-4">Automated BibTeX</h3>
                <p className="font-body text-ink-muted">
                  Stop worrying about formatting. Export perfect citations in APA, MLA, or BibTeX with one click.
                </p>
              </div>

              <div className="md:col-span-7 glossy-card p-10 rounded-xl flex items-center justify-between">
                <div>
                  <h3 className="font-heading text-heading  font-semibold mb-3">Multi-Source Synthesis</h3>
                  <p className="font-body text-ink-muted max-w-sm">
                    Citeline doesn't just read one paper; it connects the dots across your entire collection, finding contradictions and consensus.
                  </p>
                </div>
                <div className="hidden sm:block">
                  <div className="flex -space-x-4">
                    <div className="w-16 h-20 bg-moss/20 rounded border border-moss/30 rotate-12 shadow-lg bg-emerald-800 opacity-20"></div>
                    <div className="w-16 h-20 bg-moss/40 rounded border border-moss/50 rotate-[-4deg] shadow-lg bg-emerald-800 opacity-35"></div>
                    <div className="w-16 h-20 bg-moss/60 rounded border border-moss/70 rotate-[8deg] shadow-lg bg-emerald-800 opacity-50"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 px-margin bg-paper overflow-hidden">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1">
              <span className="font-caption-mono text-caption-mono text-ochre font-medium text-yellow-600 uppercase tracking-widest block mb-4">
                Transparency First
              </span>
              <h2 className="font-display-md text-display-md text-ink font-semibold mb-6">Read the actual text.</h2>
              <p className="font-body text-ink-muted mb-8 leading-relaxed">
                In academia, an answer without a source is just an opinion. Margin ensures that the AI is never the "final word"—it's a guide that brings you back to the primary literature.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-moss mt-0.5" />
                  <span className="font-body text-ink">Verifiable data extraction from tables and figures.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-moss mt-0.5" />
                  <span className="font-body text-ink">Smart OCR for scanned manuscripts and archives.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-moss mt-0.5" />
                  <span className="font-body text-ink">Secure, private library hosting on encrypted servers.</span>
                </li>
              </ul>
            </div>
            <div className="flex-1 relative">
              <div className="w-full aspect-square bg-moss rounded-full opacity-[0.03] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-150"></div>
              <img 
                src="https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=600&auto=format&fit=crop" 
                alt="Scientific journal on a table" 
                className="w-full h-auto rounded-lg shadow-2xl relative z-10 border border-rule object-cover aspect-4/3"
              />
            </div>
          </div>
        </section>

        <section className="py-24 px-margin bg-moss text-paper-raised relative overflow-hidden bg-emerald-800">
          <div className="absolute inset-0 opacity-10 mix-blend-overlay">
            <div className="grid grid-cols-12 h-full w-full">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="border-r border-paper-raised h-full"></div>
              ))}
            </div>
          </div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="font-display-lg text-[48px] font-semibold mb-8">Ready to ground your research?</h2>
            <p className="font-body text-[18px] opacity-80 mb-10 max-w-xl mx-auto">
              Join 15,000+ researchers using Citeline to turn chaotic libraries into structured knowledge.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-paper-raised text-moss px-10 py-4 rounded-lg font-heading text-heading text-emerald-700 font-semibold hover:bg-white transition-all shadow-lg active:scale-95">
                <Link to="/signup">Create Free Account</Link>
              </button>
              <button className="border border-paper-raised/30 text-paper-raised px-10 py-4 rounded-lg font-heading text-heading font-semibold hover:bg-paper-raised/10 transition-all active:scale-95">
                Request Institutional Access
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-paper py-20 px-margin border-t border-rule">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-12">
          <div className="col-span-2">
            <span className="font-display-md text-display-md text-moss font-bold mb-6 block">Citeline</span>
            <p className="text-ink-muted text-[14px] max-w-xs mb-8">
              The evidence-based research assistant. Built for clarity, transparency, and the pursuit of knowledge.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-rule flex items-center justify-center text-ink-muted hover:border-moss hover:text-moss transition-all">
                <Globe size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-rule flex items-center justify-center text-ink-muted hover:border-moss hover:text-moss transition-all">
                <Rss size={20} />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-label-caps text-label-caps font-semibold text-ink mb-6 uppercase tracking-widest">Product</h4>
            <ul className="space-y-4 text-[14px] text-ink-muted">
              <li><a href="#" className="hover:text-moss transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-moss transition-colors">Security</a></li>
              <li><a href="#" className="hover:text-moss transition-colors">Integrations</a></li>
              <li><a href="#" className="hover:text-moss transition-colors">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-label-caps text-label-caps font-semibold text-ink mb-6 uppercase tracking-widest">Resources</h4>
            <ul className="space-y-4 text-[14px] text-ink-muted">
              <li><a href="#" className="hover:text-moss transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-moss transition-colors">API Reference</a></li>
              <li><a href="#" className="hover:text-moss transition-colors">Community</a></li>
              <li><a href="#" className="hover:text-moss transition-colors">Research Lab</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-label-caps text-label-caps font-semibold text-ink mb-6 uppercase tracking-widest">Company</h4>
            <ul className="space-y-4 text-[14px] text-ink-muted">
              <li><a href="#" className="hover:text-moss transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-moss transition-colors">Ethics Policy</a></li>
              <li><a href="#" className="hover:text-moss transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-moss transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-20 pt-8 border-t border-rule flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[12px] text-ink-muted font-caption-mono">
            © 2026 Citeline Technologies Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-[12px] text-ink-muted font-caption-mono">
            <div className="w-2 h-2 rounded-full bg-moss animate-pulse"></div>
            All Systems Operational
          </div>
        </div>
      </footer>
    </div>
  );
}