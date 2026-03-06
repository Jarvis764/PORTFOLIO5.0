"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "GitHub", href: "#github" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Track active section
      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className={`max-w-6xl mx-auto flex items-center justify-between rounded-2xl px-6 py-3 transition-all duration-500 ${
            scrolled
              ? "glass-strong shadow-2xl shadow-purple-900/20"
              : "bg-transparent"
          }`}
        >
          {/* Logo */}
          <motion.div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            whileHover={{ scale: 1.05 }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                boxShadow: "0 0 15px rgba(139, 92, 246, 0.4)",
              }}
            >
              <span className="text-white font-bold text-sm">PG</span>
            </div>
            <span className="text-white/80 font-semibold text-sm tracking-wide">
              Prasanna<span className="text-purple-400">.</span>
            </span>
          </motion.div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <MagneticButton key={link.href} strength={0.3}>
                <button
                  onClick={() => scrollTo(link.href)}
                  className={`px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                    activeSection === link.href.replace("#", "")
                      ? "text-purple-400 bg-purple-500/10"
                      : "text-white/60 hover:text-white/90 hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </button>
              </MagneticButton>
            ))}
          </nav>

          {/* CTA button */}
          <div className="hidden md:block">
            <MagneticButton>
              <button
                onClick={() => scrollTo("#contact")}
                className="px-4 py-2 rounded-xl text-sm font-medium text-white"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  boxShadow: "0 0 20px rgba(139, 92, 246, 0.3)",
                }}
              >
                Hire Me
              </button>
            </MagneticButton>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-white/70 hover:text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className="w-6 flex flex-col gap-1.5">
              <motion.span
                className="block h-0.5 bg-current rounded-full"
                animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              />
              <motion.span
                className="block h-0.5 bg-current rounded-full"
                animate={menuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
              />
              <motion.span
                className="block h-0.5 bg-current rounded-full"
                animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              />
            </div>
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
              onClick={() => setMenuOpen(false)}
            />
            <motion.nav
              className="absolute top-20 left-4 right-4 glass-strong rounded-2xl p-6 flex flex-col gap-2"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-left px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all text-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {link.label}
                </motion.button>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
