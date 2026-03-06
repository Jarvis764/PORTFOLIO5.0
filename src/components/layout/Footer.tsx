"use client";

export default function Footer() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative py-16 overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 grid-bg opacity-10" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  boxShadow: "0 0 15px rgba(139, 92, 246, 0.4)",
                }}
              >
                <span className="text-white font-bold text-sm">PG</span>
              </div>
              <span className="text-white font-semibold">
                Prasanna<span className="text-purple-400">.</span>
              </span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              AI Engineer & Full Stack Developer building the future with intelligent systems and beautiful interfaces.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white/70 text-sm font-semibold uppercase tracking-widest mb-4">Navigation</h3>
            <div className="space-y-2">
              {["about", "skills", "projects", "experience", "github", "contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollTo(item)}
                  className="block text-white/40 hover:text-white/80 text-sm capitalize transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white/70 text-sm font-semibold uppercase tracking-widest mb-4">Connect</h3>
            <div className="space-y-3">
              {[
                { label: "GitHub", href: "https://github.com/Prasanna832" },
                { label: "LinkedIn", href: "https://linkedin.com" },
                { label: "Email", href: "mailto:prasanna@example.com" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/40 hover:text-white/80 text-sm transition-colors group"
                >
                  <span className="w-1 h-1 rounded-full bg-purple-500 group-hover:w-2 transition-all duration-200" />
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
          <p className="text-white/25 text-xs font-mono">
            © 2025 Prasanna G. Designed & Built with ❤️ and lots of ☕
          </p>
          <div className="flex items-center gap-4 text-xs text-white/25">
            <span>Next.js 14</span>
            <span>·</span>
            <span>Framer Motion</span>
            <span>·</span>
            <span>Three.js</span>
            <span>·</span>
            <span>TailwindCSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
