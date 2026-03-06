"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    company: "RootsGoods",
    role: "AI Intern",
    location: "Bengaluru, India",
    period: "2024",
    type: "Internship",
    color: "#8b5cf6",
    logo: "RG",
    achievements: [
      {
        title: "+22% Prediction Accuracy",
        description: "Developed an LSTM-based forecasting model that improved demand prediction accuracy by 22%, directly reducing inventory costs.",
        icon: "📈",
      },
      {
        title: "+18% Classification Accuracy",
        description: "Fine-tuned Florence-2, a state-of-the-art vision-language model, improving product classification accuracy by 18% on proprietary dataset.",
        icon: "🔍",
      },
      {
        title: "Computer Vision Pipeline",
        description: "Built end-to-end OpenCV-based product classification pipelines, enabling automated quality control and visual search capabilities.",
        icon: "👁️",
      },
    ],
  },
];

const education = {
  degree: "B.E. Information Science Engineering",
  institution: "Dayananda Sagar College of Engineering",
  location: "Bengaluru, India",
  period: "2021 – 2025",
  cgpa: "9.36",
  color: "#6366f1",
};

export default function ExperienceSection() {
  return (
    <section id="experience" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute right-0 bottom-0 w-[400px] h-[400px] rounded-full bg-indigo-900/15 blur-[120px] pointer-events-none" />

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
            <span className="text-purple-400 text-xs font-mono tracking-widest uppercase">Experience</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
            My
            <span className="gradient-text"> Journey</span>
          </h2>
          <p className="text-white/50 text-xl max-w-2xl mx-auto">
            Where I&apos;ve worked and what I&apos;ve built along the way.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-purple-500/50 to-transparent transform md:-translate-x-1/2" />

          {/* Experience card */}
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.2 }}
              className="relative mb-16"
            >
              <div className="flex flex-col md:flex-row gap-8 md:gap-0 items-start">
                {/* Left spacer for desktop */}
                <div className="hidden md:block md:w-1/2" />

                {/* Timeline node */}
                <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 -translate-y-1 z-10">
                  <motion.div
                    className="w-6 h-6 rounded-full border-2 flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                      borderColor: "#4f46e5",
                      boxShadow: "0 0 15px rgba(99, 102, 241, 0.6)",
                    }}
                    whileInView={{ scale: [0, 1.3, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.2 + 0.3 }}
                  >
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </motion.div>
                </div>

                {/* Card - right side on desktop */}
                <div className="w-full md:w-1/2 pl-16 md:pl-12">
                  <div className="glass-strong border border-purple-500/20 rounded-3xl p-8 relative overflow-hidden"
                    style={{ boxShadow: "0 0 40px rgba(99, 102, 241, 0.1)" }}
                  >
                    {/* Background glow */}
                    <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-purple-600/10 blur-[60px] pointer-events-none" />

                    <div className="relative z-10">
                      {/* Company header */}
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div
                            className="w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-white text-lg"
                            style={{
                              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                              boxShadow: "0 0 20px rgba(99, 102, 241, 0.4)",
                            }}
                          >
                            {exp.logo}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                            <p className="text-purple-400 font-medium">{exp.company}</p>
                            <p className="text-white/40 text-sm">{exp.location}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-mono text-white/40">{exp.period}</span>
                          <div className="mt-1">
                            <span className="px-2 py-0.5 rounded-full text-xs"
                              style={{ background: "rgba(139, 92, 246, 0.2)", color: "#a78bfa", border: "1px solid rgba(139, 92, 246, 0.3)" }}
                            >
                              {exp.type}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Achievements */}
                      <div className="space-y-4">
                        {exp.achievements.map((achievement, j) => (
                          <motion.div
                            key={j}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.2 + j * 0.1 + 0.4 }}
                            className="flex gap-4 p-4 rounded-2xl"
                            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                          >
                            <span className="text-2xl flex-shrink-0 mt-0.5">{achievement.icon}</span>
                            <div>
                              <div className="font-semibold text-white/90 mb-1 text-sm">{achievement.title}</div>
                              <p className="text-white/50 text-xs leading-relaxed">{achievement.description}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Education card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="relative"
          >
            <div className="flex flex-col md:flex-row gap-8 md:gap-0 items-start">
              {/* Left card on desktop */}
              <div className="w-full md:w-1/2 pr-0 md:pr-12 pl-16 md:pl-0">
                <div className="glass-strong border border-indigo-500/20 rounded-3xl p-8 relative overflow-hidden md:text-right"
                  style={{ boxShadow: "0 0 40px rgba(99, 102, 241, 0.1)" }}
                >
                  <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-indigo-600/10 blur-[60px] pointer-events-none" />
                  <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs mb-4"
                      style={{ background: "rgba(99, 102, 241, 0.2)", color: "#818cf8", border: "1px solid rgba(99, 102, 241, 0.3)" }}
                    >
                      🎓 Education
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">{education.degree}</h3>
                    <p className="text-indigo-400 font-medium mb-1">{education.institution}</p>
                    <p className="text-white/40 text-sm mb-4">{education.location} · {education.period}</p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl"
                      style={{ background: "linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.2))", border: "1px solid rgba(99, 102, 241, 0.3)" }}
                    >
                      <span className="text-2xl font-black gradient-text">{education.cgpa}</span>
                      <span className="text-white/50 text-sm">CGPA</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline node */}
              <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 z-10">
                <motion.div
                  className="w-6 h-6 rounded-full border-2 flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #4f46e5, #6366f1)",
                    borderColor: "#4338ca",
                    boxShadow: "0 0 15px rgba(99, 102, 241, 0.6)",
                  }}
                  whileInView={{ scale: [0, 1.3, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <div className="w-2 h-2 rounded-full bg-white" />
                </motion.div>
              </div>

              {/* Spacer */}
              <div className="hidden md:block md:w-1/2" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
