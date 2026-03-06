"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission
    await new Promise((r) => setTimeout(r, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });

    setTimeout(() => setSubmitted(false), 5000);
  };

  const socialLinks = [
    {
      name: "Email",
      value: "prasanna.g@example.com",
      href: "mailto:prasanna.g@example.com",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      color: "#6366f1",
    },
    {
      name: "GitHub",
      value: "@Prasanna832",
      href: "https://github.com/Prasanna832",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
      color: "#8b5cf6",
    },
    {
      name: "LinkedIn",
      value: "Prasanna G",
      href: "https://linkedin.com/in/prasanna-g",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      color: "#0ea5e9",
    },
  ];

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-900/15 blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-purple-500/30 mb-6">
            <span className="text-purple-400 text-xs font-mono tracking-widest uppercase">Get In Touch</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
            Let&apos;s
            <span className="gradient-text"> Connect</span>
          </h2>
          <p className="text-white/50 text-xl max-w-2xl mx-auto">
            Open to exciting opportunities, collaborations, or just a great conversation about tech.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div
              className="glass-strong border border-purple-500/20 rounded-3xl p-8 relative overflow-hidden"
              style={{ boxShadow: "0 0 60px rgba(99, 102, 241, 0.08)" }}
            >
              {/* Animated bg glow */}
              <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-purple-600/10 blur-[80px] pointer-events-none" />

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center h-full py-12 text-center"
                >
                  <motion.div
                    className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mb-6"
                    style={{ background: "linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.2))" }}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 0.5 }}
                  >
                    ✅
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-white/50">Thanks for reaching out. I&apos;ll get back to you soon!</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="relative z-10 space-y-5">
                  <h3 className="text-xl font-bold text-white mb-6">Send a Message</h3>

                  {[
                    { name: "name", label: "Your Name", type: "text", placeholder: "John Doe" },
                    { name: "email", label: "Email Address", type: "email", placeholder: "john@example.com" },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="block text-xs text-white/50 uppercase tracking-widest mb-2">
                        {field.label}
                      </label>
                      <div className="relative">
                        <input
                          type={field.type}
                          placeholder={field.placeholder}
                          value={formData[field.name as keyof FormData]}
                          onChange={(e) =>
                            setFormData((p) => ({ ...p, [field.name]: e.target.value }))
                          }
                          onFocus={() => setFocused(field.name)}
                          onBlur={() => setFocused(null)}
                          required
                          className="w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none transition-all duration-200 text-sm"
                          style={{
                            borderColor:
                              focused === field.name
                                ? "rgba(139, 92, 246, 0.6)"
                                : "rgba(255,255,255,0.08)",
                            boxShadow:
                              focused === field.name
                                ? "0 0 0 3px rgba(139, 92, 246, 0.1)"
                                : "none",
                          }}
                        />
                      </div>
                    </div>
                  ))}

                  <div>
                    <label className="block text-xs text-white/50 uppercase tracking-widest mb-2">
                      Message
                    </label>
                    <textarea
                      placeholder="Tell me about your project or opportunity..."
                      value={formData.message}
                      onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused(null)}
                      required
                      rows={4}
                      className="w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none transition-all duration-200 text-sm resize-none"
                      style={{
                        borderColor:
                          focused === "message"
                            ? "rgba(139, 92, 246, 0.6)"
                            : "rgba(255,255,255,0.08)",
                        boxShadow:
                          focused === "message"
                            ? "0 0 0 3px rgba(139, 92, 246, 0.1)"
                            : "none",
                      }}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl font-semibold text-white relative overflow-hidden"
                    style={{
                      background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                      boxShadow: "0 0 30px rgba(139, 92, 246, 0.4)",
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <motion.div
                          className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                        />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        Send Message
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </span>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-col gap-5"
          >
            {/* Availability card */}
            <div className="glass border border-green-500/20 rounded-3xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 font-medium">Available for opportunities</span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed">
                Open to full-time positions, internships, and freelance projects. Especially interested in
                AI/ML, full-stack development, or where the two intersect.
              </p>
            </div>

            {/* Social links */}
            <div className="glass border border-white/10 rounded-3xl p-6 space-y-4">
              <h3 className="text-white font-semibold mb-4">Connect With Me</h3>
              {socialLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target={link.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl group transition-all duration-200 hover:scale-[1.02]"
                  style={{
                    background: `${link.color}10`,
                    border: `1px solid ${link.color}20`,
                  }}
                  whileHover={{
                    background: `${link.color}15`,
                    borderColor: `${link.color}40`,
                    boxShadow: `0 0 20px ${link.color}20`,
                  }}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${link.color}25`, color: link.color }}
                  >
                    {link.icon}
                  </div>
                  <div>
                    <div className="text-xs text-white/40 uppercase tracking-wide">{link.name}</div>
                    <div className="text-white/80 text-sm font-medium">{link.value}</div>
                  </div>
                  <div className="ml-auto">
                    <svg className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Response time */}
            <div className="glass border border-white/10 rounded-3xl p-6">
              <div className="flex items-center gap-2 text-white/50 text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Usually responds within 24 hours
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
