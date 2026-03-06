"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import MagneticButton from "@/components/ui/MagneticButton";

const AIBrain = dynamic(() => import("@/components/threejs/AIBrain"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-16 h-16 rounded-full border-2 border-purple-500/30 border-t-purple-500 animate-spin" />
    </div>
  ),
});

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-900/20 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-indigo-900/20 blur-[100px] pointer-events-none" />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-20"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left: Text content */}
          <div className="flex flex-col gap-8">
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-green-500/30">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 text-xs font-medium tracking-wide">
                  Available for opportunities
                </span>
              </div>
            </motion.div>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight">
                <span className="block text-white/90">Prasanna</span>
                <span className="block gradient-text text-glow">G.</span>
              </h1>
            </motion.div>

            {/* Role */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="space-y-2"
            >
              <div className="flex items-center gap-3">
                <div className="h-px w-12 bg-gradient-to-r from-indigo-500 to-purple-500" />
                <span className="text-purple-400 font-mono text-sm tracking-widest uppercase">
                  AI Engineer · Full Stack Developer
                </span>
              </div>
              <p className="text-xl text-white/50 max-w-lg leading-relaxed">
                Building intelligent AI systems and modern web experiences that
                push the boundaries of what&apos;s possible.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex gap-8"
            >
              {[
                { value: "9.36", label: "CGPA" },
                { value: "4+", label: "Projects" },
                { value: "2+", label: "Years Exp" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-xs text-white/40 tracking-widest uppercase mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <MagneticButton strength={0.5}>
                <button
                  onClick={() => scrollTo("projects")}
                  className="group relative px-8 py-4 rounded-2xl font-semibold text-white overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                    boxShadow: "0 0 30px rgba(139, 92, 246, 0.4)",
                  }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    View Projects
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </MagneticButton>

              <MagneticButton strength={0.5}>
                <button
                  onClick={() => scrollTo("contact")}
                  className="group px-8 py-4 rounded-2xl font-semibold text-white/80 hover:text-white glass border border-white/10 hover:border-purple-500/50 transition-all duration-300"
                >
                  <span className="flex items-center gap-2">
                    Contact Me
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </span>
                </button>
              </MagneticButton>
            </motion.div>

            {/* Tech stack pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="flex flex-wrap gap-2"
            >
              {["Next.js", "Python", "TensorFlow", "React", "Node.js"].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full text-xs text-white/50 glass border border-white/5"
                >
                  {tech}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right: 3D Brain */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="relative h-[500px] lg:h-[600px]"
          >
            {/* Glow behind brain */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-80 h-80 rounded-full bg-purple-600/15 blur-[80px]" />
            </div>
            <AIBrain />

            {/* Floating info cards */}
            <motion.div
              className="absolute top-8 left-0 glass border border-white/10 rounded-2xl p-4 hidden lg:block"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="text-xs text-white/50 mb-1">Education</div>
              <div className="text-sm font-medium text-white">B.E. ISE · DSCE</div>
              <div className="text-xs text-purple-400 mt-1">CGPA: 9.36</div>
            </motion.div>

            <motion.div
              className="absolute bottom-16 right-0 glass border border-white/10 rounded-2xl p-4 hidden lg:block"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <div className="text-xs text-white/50 mb-1">Specialization</div>
              <div className="text-sm font-medium text-white">AI / ML Systems</div>
              <div className="text-xs text-indigo-400 mt-1">Full Stack Dev</div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span className="text-xs text-white/30 tracking-widest uppercase">Scroll</span>
          <motion.div
            className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1"
          >
            <motion.div
              className="w-1 h-1.5 rounded-full bg-purple-400"
              animate={{ y: [0, 14, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
