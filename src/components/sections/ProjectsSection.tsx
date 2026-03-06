"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

const projects = [
  {
    id: 1,
    title: "AI Career Coach Platform",
    description:
      "A next-generation career guidance platform powered by Gemini AI. Provides personalized career advice, resume analysis, interview preparation, and job matching powered by large language models.",
    tech: ["Next.js", "TailwindCSS", "Gemini AI", "Prisma", "NeonDB"],
    color: "#6366f1",
    gradient: "from-indigo-900/40 to-purple-900/30",
    accentGlow: "rgba(99, 102, 241, 0.3)",
    category: "AI · Full Stack",
    github: "https://github.com/Prasanna832",
    demo: "#",
    status: "Live",
    icon: "🤖",
  },
  {
    id: 2,
    title: "GoCart – Smart E-Commerce",
    description:
      "A modern e-commerce platform with intelligent product recommendations, seamless checkout, real-time inventory management, and background jobs powered by Inngest workflow engine.",
    tech: ["Next.js", "Inngest", "NeonDB", "Clerk", "TailwindCSS"],
    color: "#06b6d4",
    gradient: "from-cyan-900/40 to-blue-900/30",
    accentGlow: "rgba(6, 182, 212, 0.3)",
    category: "Full Stack · E-Commerce",
    github: "https://github.com/Prasanna832",
    demo: "#",
    status: "Live",
    icon: "🛒",
  },
  {
    id: 3,
    title: "PG-Life Accommodation Finder",
    description:
      "A comprehensive accommodation search and booking platform for students and professionals, featuring advanced filtering, map integration, and secure user management.",
    tech: ["React", "Bootstrap", "MongoDB", "Node.js", "Express"],
    color: "#10b981",
    gradient: "from-emerald-900/40 to-teal-900/30",
    accentGlow: "rgba(16, 185, 129, 0.3)",
    category: "Full Stack · Web App",
    github: "https://github.com/Prasanna832",
    demo: "#",
    status: "Completed",
    icon: "🏠",
  },
  {
    id: 4,
    title: "Multi-Modal Emotion Recognition",
    description:
      "A deep learning system that recognizes human emotions from both visual and audio inputs using MobileNet architecture, achieving high accuracy through multi-modal fusion techniques.",
    tech: ["Keras", "MobileNet", "OpenCV", "Python", "TensorFlow"],
    color: "#f59e0b",
    gradient: "from-amber-900/40 to-orange-900/30",
    accentGlow: "rgba(245, 158, 11, 0.3)",
    category: "AI · ML · Computer Vision",
    github: "https://github.com/Prasanna832",
    demo: "#",
    status: "Research",
    icon: "🧠",
  },
];

function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      style={{
        transform: hovered
          ? `perspective(1000px) rotateX(${-mousePos.y * 8}deg) rotateY(${mousePos.x * 8}deg)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg)",
        transition: hovered ? "transform 0.1s ease" : "transform 0.5s ease",
      }}
      className="group cursor-pointer"
    >
      <div
        className={`relative rounded-3xl overflow-hidden bg-gradient-to-br ${project.gradient} glass border border-white/10 p-8`}
        style={{
          boxShadow: hovered ? `0 20px 60px ${project.accentGlow}` : "none",
          borderColor: hovered ? `${project.color}40` : "rgba(255,255,255,0.08)",
          transition: "border-color 0.3s, box-shadow 0.3s",
        }}
      >
        {/* Glow overlay */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at ${(mousePos.x + 0.5) * 100}% ${(mousePos.y + 0.5) * 100}%, ${project.color}15, transparent 60%)`,
          }}
        />

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                style={{
                  background: `${project.color}20`,
                  border: `1px solid ${project.color}30`,
                  boxShadow: `0 0 20px ${project.color}20`,
                }}
              >
                {project.icon}
              </div>
              <div>
                <span
                  className="text-xs font-mono tracking-wider uppercase"
                  style={{ color: project.color }}
                >
                  {project.category}
                </span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  <span className="text-xs text-white/40">{project.status}</span>
                </div>
              </div>
            </div>

            <span className="text-4xl font-black text-white/5">{String(index + 1).padStart(2, "0")}</span>
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-white transition-colors">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-white/50 text-sm leading-relaxed mb-6">{project.description}</p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-3 py-1 rounded-lg text-xs font-medium"
                style={{
                  background: `${project.color}15`,
                  color: project.color,
                  border: `1px solid ${project.color}25`,
                }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white/70 hover:text-white glass border border-white/10 hover:border-white/25 transition-all duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
            <a
              href={project.demo}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white"
              style={{
                background: `linear-gradient(135deg, ${project.color}80, ${project.color}60)`,
                border: `1px solid ${project.color}40`,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Live Demo
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-purple-900/20 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-purple-500/30 mb-6">
            <span className="text-purple-400 text-xs font-mono tracking-widest uppercase">Featured Work</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
            Selected
            <span className="gradient-text"> Projects</span>
          </h2>
          <p className="text-white/50 text-xl max-w-2xl mx-auto">
            A showcase of my most impactful work — from AI systems to full-stack applications.
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* More projects link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/Prasanna832"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white/60 hover:text-white glass border border-white/10 hover:border-purple-500/40 transition-all duration-200 text-sm"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            View All Projects on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
