"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const SkillGalaxy = dynamic(() => import("@/components/threejs/SkillGalaxy"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-16 h-16 rounded-full border-2 border-purple-500/30 border-t-purple-500 animate-spin" />
    </div>
  ),
});

const skillCategories = [
  {
    name: "Languages",
    color: "#3b82f6",
    skills: ["Python", "Java", "C"],
    icon: "⌨️",
  },
  {
    name: "Frontend",
    color: "#06b6d4",
    skills: ["React", "Next.js", "TailwindCSS"],
    icon: "🎨",
  },
  {
    name: "Backend",
    color: "#10b981",
    skills: ["Node.js", "Prisma", "MySQL", "MongoDB"],
    icon: "⚙️",
  },
  {
    name: "AI / ML",
    color: "#f59e0b",
    skills: ["TensorFlow", "PyTorch", "Keras", "HuggingFace"],
    icon: "🧠",
  },
  {
    name: "Tools",
    color: "#8b5cf6",
    skills: ["GitHub", "OpenCV"],
    icon: "🛠️",
  },
];

export default function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <section id="skills" ref={sectionRef} className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-indigo-900/15 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-purple-500/30 mb-6">
            <span className="text-purple-400 text-xs font-mono tracking-widest uppercase">Skill Galaxy</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
            Technical
            <span className="gradient-text"> Arsenal</span>
          </h2>
          <p className="text-white/50 text-xl max-w-2xl mx-auto">
            Technologies orbiting my development universe — from AI to full-stack engineering.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 3D Galaxy */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="h-[500px] relative"
          >
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-64 h-64 rounded-full bg-purple-600/10 blur-[80px]" />
            </div>
            <SkillGalaxy />
          </motion.div>

          {/* Skill categories */}
          <div className="flex flex-col gap-4">
            {skillCategories.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group cursor-pointer"
                onClick={() => setActiveCategory(activeCategory === cat.name ? null : cat.name)}
              >
                <div
                  className={`rounded-2xl p-5 transition-all duration-300 ${
                    activeCategory === cat.name
                      ? "glass-strong border"
                      : "glass border border-white/5 hover:border-white/15"
                  }`}
                  style={{
                    borderColor: activeCategory === cat.name ? `${cat.color}40` : undefined,
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{cat.icon}</span>
                      <span className="text-white font-semibold">{cat.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-white/40 font-mono">{cat.skills.length} skills</span>
                      <motion.div
                        animate={{ rotate: activeCategory === cat.name ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <svg className="w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </motion.div>
                    </div>
                  </div>

                  {/* Skill dots */}
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill) => (
                      <motion.span
                        key={skill}
                        className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200"
                        style={{
                          background: `${cat.color}15`,
                          color: cat.color,
                          border: `1px solid ${cat.color}30`,
                        }}
                        whileHover={{
                          scale: 1.05,
                          background: `${cat.color}25`,
                          boxShadow: `0 0 12px ${cat.color}30`,
                        }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>

                  {/* Progress bar */}
                  <div className="mt-3 h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, ${cat.color}, ${cat.color}80)` }}
                      initial={{ width: 0 }}
                      whileInView={{ width: "75%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.15, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
