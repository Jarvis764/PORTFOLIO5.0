"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const stories = [
  {
    number: "01",
    title: "Passion for AI",
    subtitle: "Where it all began",
    description:
      "Fascinated by the power of artificial intelligence, I dove deep into machine learning, neural networks, and intelligent systems — driven by the belief that AI will transform every industry on earth.",
    tags: ["AI", "ML", "Deep Learning", "Neural Networks"],
    color: "#6366f1",
    gradient: "from-indigo-900/30 to-purple-900/20",
  },
  {
    number: "02",
    title: "Building Systems",
    subtitle: "Engineering at scale",
    description:
      "From full-stack web applications to intelligent backend services, I architect systems that are fast, scalable, and production-ready — using modern frameworks and cloud-native patterns.",
    tags: ["Next.js", "Node.js", "System Design", "Cloud"],
    color: "#8b5cf6",
    gradient: "from-purple-900/30 to-pink-900/20",
  },
  {
    number: "03",
    title: "Internship Journey",
    subtitle: "Real-world impact",
    description:
      "At RootsGoods, I applied ML research to production systems — building LSTM models, fine-tuning vision-language models, and creating OpenCV pipelines that delivered measurable improvements.",
    tags: ["LSTM", "Florence-2", "OpenCV", "Production ML"],
    color: "#a78bfa",
    gradient: "from-violet-900/30 to-blue-900/20",
  },
  {
    number: "04",
    title: "Impactful Applications",
    subtitle: "Shipping real products",
    description:
      "I build web experiences that users love — from AI-powered career platforms to smart e-commerce systems, each project blending beautiful design with intelligent functionality.",
    tags: ["React", "Gemini AI", "Prisma", "User Experience"],
    color: "#60a5fa",
    gradient: "from-blue-900/30 to-cyan-900/20",
  },
];

function StoryCard({
  story,
}: {
  story: (typeof stories)[0];
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.9, 1, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={cardRef}
      style={{ y, scale, opacity }}
      className={`relative rounded-3xl overflow-hidden bg-gradient-to-br ${story.gradient} glass border border-white/10 p-8 md:p-12`}
    >
      {/* Decorative glow */}
      <div
        className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] opacity-20 pointer-events-none"
        style={{ background: story.color }}
      />

      <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
        {/* Number */}
        <div>
          <span
            className="text-7xl font-black opacity-10 block leading-none mb-4"
            style={{ color: story.color }}
          >
            {story.number}
          </span>
          <h3
            className="text-3xl md:text-4xl font-bold text-white mb-2"
          >
            {story.title}
          </h3>
          <p className="text-sm tracking-widest uppercase mb-6" style={{ color: story.color }}>
            {story.subtitle}
          </p>
          <p className="text-white/60 text-lg leading-relaxed">{story.description}</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-3">
          {story.tags.map((tag) => (
            <motion.span
              key={tag}
              className="px-4 py-2 rounded-xl text-sm font-medium"
              style={{
                background: `${story.color}20`,
                border: `1px solid ${story.color}40`,
                color: story.color,
              }}
              whileHover={{ scale: 1.05, y: -2 }}
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function StorySection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section id="about" ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-purple-900/20 blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-purple-500/30 mb-6">
            <span className="text-purple-400 text-xs font-mono tracking-widest uppercase">My Story</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
            The Journey
            <span className="gradient-text"> So Far</span>
          </h2>
          <p className="text-white/50 text-xl max-w-2xl mx-auto">
            From curiosity about AI to building production systems — four chapters that define my path.
          </p>
        </motion.div>

        {/* Story cards */}
        <div className="flex flex-col gap-6">
          {stories.map((story) => (
            <StoryCard key={story.number} story={story} />
          ))}
        </div>
      </div>
    </section>
  );
}
