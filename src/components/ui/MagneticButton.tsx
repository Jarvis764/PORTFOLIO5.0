"use client";

import { useEffect, useRef, ReactNode } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  strength?: number;
}

export default function MagneticButton({
  children,
  className = "",
  onClick,
  strength = 0.4,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const content = contentRef.current;
    if (!el || !content) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;

      el.style.transform = `translate(${distX * strength}px, ${distY * strength}px)`;
      content.style.transform = `translate(${distX * strength * 0.5}px, ${distY * strength * 0.5}px)`;
    };

    const handleMouseLeave = () => {
      el.style.transform = "translate(0, 0)";
      content.style.transform = "translate(0, 0)";
      el.style.transition = "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)";
      content.style.transition = "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)";
    };

    const handleMouseEnter = () => {
      el.style.transition = "transform 0.1s ease";
      content.style.transition = "transform 0.1s ease";
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);
    el.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
      el.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [strength]);

  return (
    <div
      ref={ref}
      className={`inline-block cursor-pointer ${className}`}
      onClick={onClick}
      style={{ transition: "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)" }}
    >
      <div ref={contentRef} style={{ transition: "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)" }}>
        {children}
      </div>
    </div>
  );
}
