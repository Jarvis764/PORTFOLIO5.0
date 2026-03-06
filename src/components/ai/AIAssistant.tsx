"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const suggestedQuestions = [
  "Tell me about Prasanna's projects",
  "What technologies does he use?",
  "What was his internship experience?",
  "What is his education background?",
];

function generateResponse(question: string): string {
  const q = question.toLowerCase();

  if (q.includes("project") || q.includes("work") || q.includes("built")) {
    return `Prasanna has built several impressive projects:\n\n🤖 **AI Career Coach Platform** — Powered by Gemini AI with Next.js and Prisma for personalized career guidance.\n\n🛒 **GoCart** — A smart e-commerce platform using Next.js, Inngest for background jobs, and NeonDB.\n\n🏠 **PG-Life Finder** — Accommodation search platform with React and MongoDB.\n\n🧠 **Emotion Recognition System** — Multi-modal deep learning using Keras and OpenCV.\n\nEach project demonstrates his ability to combine AI with modern web development!`;
  }

  if (q.includes("technolog") || q.includes("skill") || q.includes("stack") || q.includes("use")) {
    return `Prasanna has a diverse technical stack:\n\n**Languages:** Python, Java, C\n\n**Frontend:** React, Next.js, TailwindCSS\n\n**Backend:** Node.js, Prisma, MySQL, MongoDB\n\n**AI/ML:** TensorFlow, PyTorch, Keras, HuggingFace\n\n**Tools:** GitHub, OpenCV\n\nHe specializes in bridging AI/ML with modern web development!`;
  }

  if (q.includes("intern") || q.includes("experience") || q.includes("rootsgood") || q.includes("work")) {
    return `Prasanna worked as an AI Intern at **RootsGoods** in Bengaluru:\n\n📈 **+22% Prediction Accuracy** — Developed LSTM model improving demand forecasting\n\n🔍 **+18% Classification** — Fine-tuned Florence-2 vision-language model\n\n👁️ **Computer Vision Pipeline** — Built OpenCV-based product classification systems\n\nHe delivered measurable ML improvements in a production environment!`;
  }

  if (q.includes("education") || q.includes("college") || q.includes("degree") || q.includes("cgpa") || q.includes("gpa")) {
    return `Prasanna's education:\n\n🎓 **B.E. Information Science Engineering**\nDayananda Sagar College of Engineering, Bengaluru\n\n⭐ **CGPA: 9.36** (Exceptional academic performance)\n\nBatch: 2021 – 2025\n\nHis strong academic foundation combined with practical project experience makes him stand out!`;
  }

  if (q.includes("github") || q.includes("code") || q.includes("repository") || q.includes("repos")) {
    return `You can find all of Prasanna's code on GitHub:\n\n🐙 **@Prasanna832** on GitHub\n\nHis repositories include AI/ML projects, full-stack web apps, and research implementations. He actively contributes and maintains clean, well-documented code!`;
  }

  if (q.includes("contact") || q.includes("hire") || q.includes("reach") || q.includes("email")) {
    return `Prasanna is **available for opportunities!**\n\n📧 Reach him through the contact form on this page\n\n🐙 GitHub: github.com/Prasanna832\n\nHe's particularly interested in roles involving AI/ML, full-stack development, or the intersection of both!`;
  }

  if (q.includes("about") || q.includes("who") || q.includes("prasanna")) {
    return `Prasanna G is an **AI Engineer & Full Stack Developer** 🚀\n\nHe's passionate about building intelligent systems and modern web experiences. With a CGPA of 9.36 from DSCE Bengaluru, he combines strong academic foundations with hands-on industry experience.\n\nHis specialty: Building AI-powered applications that are both intelligent and beautifully designed!`;
  }

  return `Great question! I'm Prasanna's AI assistant. I can tell you about:\n\n• **Projects** he has built\n• **Technologies** he works with\n• **Internship** experience at RootsGoods\n• **Education** background\n• **GitHub** repositories\n• How to **contact** him\n\nWhat would you like to know?`;
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! 👋 I'm Prasanna's AI assistant. Ask me anything about his projects, skills, or experience!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = generateResponse(text);
      const assistantMessage: Message = { role: "assistant", content: response };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
      setTimeout(scrollToBottom, 50);
    }, 800 + Math.random() * 400);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <>
      {/* Toggle button */}
      <motion.button
        className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-2xl flex items-center justify-center cursor-pointer"
        style={{
          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
          boxShadow: "0 0 25px rgba(139, 92, 246, 0.5)",
        }}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 2 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.svg
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </motion.svg>
          ) : (
            <motion.span
              key="open"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.2 }}
              className="text-2xl"
            >
              🤖
            </motion.span>
          )}
        </AnimatePresence>

        {/* Pulse ring */}
        {!isOpen && (
          <motion.div
            className="absolute inset-0 rounded-2xl border-2 border-purple-400/40"
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 left-6 z-50 w-[360px] max-w-[calc(100vw-3rem)]"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="glass-strong border border-purple-500/20 rounded-3xl overflow-hidden"
              style={{ boxShadow: "0 25px 60px rgba(0,0,0,0.5), 0 0 30px rgba(99, 102, 241, 0.15)" }}
            >
              {/* Header */}
              <div
                className="p-4 border-b border-white/10"
                style={{ background: "linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(139, 92, 246, 0.1))" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                    style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
                  >
                    🤖
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm">Prasanna&apos;s AI Assistant</h3>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-xs text-white/50">Online · Powered by AI</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="h-72 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "text-white rounded-br-sm"
                          : "text-white/80 rounded-bl-sm"
                      }`}
                      style={{
                        background:
                          msg.role === "user"
                            ? "linear-gradient(135deg, #6366f1, #8b5cf6)"
                            : "rgba(255,255,255,0.07)",
                        border:
                          msg.role === "assistant" ? "1px solid rgba(255,255,255,0.08)" : "none",
                        whiteSpace: "pre-line",
                      }}
                    >
                      {msg.content}
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="glass border border-white/10 rounded-2xl rounded-bl-sm px-4 py-3">
                      <div className="flex gap-1.5">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-1.5 h-1.5 rounded-full bg-purple-400"
                            animate={{ y: [0, -4, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Suggested questions */}
              {messages.length <= 1 && (
                <div className="px-4 pb-2">
                  <p className="text-xs text-white/30 mb-2">Suggested questions:</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedQuestions.map((q) => (
                      <button
                        key={q}
                        onClick={() => sendMessage(q)}
                        className="px-3 py-1.5 rounded-xl text-xs text-purple-400 glass border border-purple-500/20 hover:border-purple-500/40 transition-all"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="p-4 border-t border-white/10">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about Prasanna..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 transition-colors"
                  />
                  <motion.button
                    onClick={() => sendMessage(input)}
                    disabled={!input.trim()}
                    className="w-10 h-10 rounded-xl flex items-center justify-center disabled:opacity-40"
                    style={{
                      background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                      boxShadow: "0 0 15px rgba(99, 102, 241, 0.3)",
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
