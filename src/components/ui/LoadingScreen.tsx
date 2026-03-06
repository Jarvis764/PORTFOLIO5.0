"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 15 + 5;
      if (current >= 100) {
        current = 100;
        setProgress(100);
        clearInterval(interval);
        setTimeout(() => setIsLoading(false), 600);
      } else {
        setProgress(Math.floor(current));
      }
    }, 80);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[10000] bg-[#080810] flex flex-col items-center justify-center"
          exit={{
            opacity: 0,
            y: "-100%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* Background grid */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />

          {/* Glowing orb */}
          <div className="absolute w-96 h-96 rounded-full bg-purple-900/20 blur-[100px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

          {/* Content */}
          <motion.div
            className="relative z-10 flex flex-col items-center gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Logo mark */}
            <motion.div
              className="relative w-20 h-20"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute inset-0 rounded-full border-2 border-transparent"
                style={{
                  background: "linear-gradient(#080810, #080810) padding-box, linear-gradient(135deg, #6366f1, #8b5cf6, transparent, #6366f1) border-box",
                }}
              />
              <div className="absolute inset-3 rounded-full border border-purple-500/30" />
              <div className="absolute inset-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600"
                style={{ boxShadow: "0 0 20px rgba(139, 92, 246, 0.6)" }}
              />
            </motion.div>

            {/* Name */}
            <div className="text-center">
              <motion.h1
                className="text-2xl font-bold tracking-widest text-white/90 mb-1"
                initial={{ letterSpacing: "0.3em", opacity: 0 }}
                animate={{ letterSpacing: "0.2em", opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                PRASANNA G
              </motion.h1>
              <motion.p
                className="text-xs tracking-[0.3em] text-purple-400/70 uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                AI Engineer · Full Stack Developer
              </motion.p>
            </div>

            {/* Progress bar */}
            <div className="w-64">
              <div className="flex justify-between text-xs text-white/30 mb-2 font-mono">
                <span>Initializing</span>
                <span>{progress}%</span>
              </div>
              <div className="h-[2px] bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
                    boxShadow: "0 0 8px rgba(139, 92, 246, 0.8)",
                  }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
