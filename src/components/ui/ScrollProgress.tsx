"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      setScrollPercent(Math.round(v * 100));
    });
  }, [scrollYProgress]);

  return (
    <>
      {/* Top progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[100] h-[2px] origin-left"
        style={{
          scaleX,
          background: "linear-gradient(90deg, #6366f1, #8b5cf6, #a78bfa)",
          boxShadow: "0 0 10px rgba(139, 92, 246, 0.8)",
        }}
      />

      {/* Scroll percentage indicator */}
      <motion.div
        className="fixed bottom-8 right-8 z-50 hidden md:flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: scrollPercent > 5 ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative w-12 h-12">
          <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
            <circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke="rgba(99, 102, 241, 0.2)"
              strokeWidth="2"
            />
            <motion.circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke="url(#progressGrad)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="125.66"
              style={{
                strokeDashoffset: scaleX.get() ? 125.66 * (1 - scaleX.get()) : 125.66,
              }}
            />
            <defs>
              <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[9px] font-mono text-purple-400">{scrollPercent}%</span>
          </div>
        </div>
      </motion.div>
    </>
  );
}
