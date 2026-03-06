"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function AnimatedCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const dotX = useSpring(mouseX, { damping: 50, stiffness: 500, mass: 0.1 });
  const dotY = useSpring(mouseY, { damping: 50, stiffness: 500, mass: 0.1 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth < 768) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 20);
      mouseY.set(e.clientY - 20);
      setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handlePointerChange = () => {
      const el = document.elementFromPoint(
        mouseX.get() + 20,
        mouseY.get() + 20
      );
      if (el) {
        const computed = window.getComputedStyle(el);
        setIsPointer(computed.cursor === "pointer");
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mousemove", handlePointerChange);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mousemove", handlePointerChange);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="hidden md:block">
      {/* Outer ring */}
      <motion.div
        ref={cursorRef}
        className="cursor-dot fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          scale: isPointer ? 1.8 : isClicking ? 0.7 : 1,
          borderColor: isPointer ? "rgba(139, 92, 246, 0.8)" : "rgba(99, 102, 241, 0.6)",
        }}
        transition={{ duration: 0.15 }}
      >
        <div
          className="w-full h-full rounded-full border-2"
          style={{
            borderColor: isPointer ? "rgba(139, 92, 246, 0.8)" : "rgba(99, 102, 241, 0.6)",
            background: isPointer
              ? "rgba(139, 92, 246, 0.1)"
              : "transparent",
            boxShadow: isPointer
              ? "0 0 15px rgba(139, 92, 246, 0.4)"
              : "0 0 10px rgba(99, 102, 241, 0.2)",
          }}
        />
      </motion.div>

      {/* Inner dot */}
      <motion.div
        ref={cursorDotRef}
        className="cursor-dot fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: dotX,
          y: dotY,
          translateX: "19px",
          translateY: "19px",
          opacity: isVisible ? 1 : 0,
        }}
      >
        <motion.div
          className="w-2 h-2 rounded-full"
          style={{
            background: "rgba(139, 92, 246, 1)",
            boxShadow: "0 0 6px rgba(139, 92, 246, 0.8)",
          }}
          animate={{ scale: isClicking ? 2 : 1 }}
          transition={{ duration: 0.1 }}
        />
      </motion.div>
    </div>
  );
}
