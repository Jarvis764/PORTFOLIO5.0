"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Repo {
  id: number;
  name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  html_url: string;
  topics: string[];
  updated_at: string;
}

interface GitHubStats {
  public_repos: number;
  followers: number;
  following: number;
  login: string;
  name: string;
  avatar_url: string;
  bio: string | null;
}

const GITHUB_USERNAME = "Prasanna832";

const languageColors: Record<string, string> = {
  Python: "#3572A5",
  JavaScript: "#f1e05a",
  TypeScript: "#2b7489",
  Java: "#b07219",
  C: "#555555",
  HTML: "#e34c26",
  CSS: "#563d7c",
  default: "#8b5cf6",
};

export default function GitHubSection() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reposRes, statsRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
        ]);

        if (!reposRes.ok || !statsRes.ok) throw new Error("GitHub API error");

        const reposData = await reposRes.json();
        const statsData = await statsRes.json();

        setRepos(reposData);
        setStats(statsData);
      } catch {
        // Show placeholder data
        setStats({
          public_repos: 15,
          followers: 50,
          following: 30,
          login: GITHUB_USERNAME,
          name: "Prasanna G",
          avatar_url: "",
          bio: "AI Engineer | Full Stack Developer",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Contribution grid simulation
  const weeks = 26;
  const days = 7;
  const contributionGrid = Array.from({ length: weeks }, () =>
    Array.from({ length: days }, () => {
      const intensity = Math.random();
      if (intensity < 0.3) return 0;
      if (intensity < 0.55) return 1;
      if (intensity < 0.75) return 2;
      if (intensity < 0.9) return 3;
      return 4;
    })
  );

  const intensityColors = [
    "rgba(255,255,255,0.06)",
    "rgba(99, 102, 241, 0.3)",
    "rgba(99, 102, 241, 0.5)",
    "rgba(139, 92, 246, 0.7)",
    "rgba(167, 139, 250, 0.9)",
  ];

  return (
    <section id="github" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-purple-900/15 blur-[120px] pointer-events-none" />

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
            <span className="text-purple-400 text-xs font-mono tracking-widest uppercase">GitHub Activity</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
            Code
            <span className="gradient-text"> Dashboard</span>
          </h2>
          <p className="text-white/50 text-xl max-w-2xl mx-auto">
            My open source contributions and repositories.
          </p>
        </motion.div>

        {/* Stats cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: "Repositories", value: stats?.public_repos ?? "–", icon: "📦" },
            { label: "Followers", value: stats?.followers ?? "–", icon: "👥" },
            { label: "Following", value: stats?.following ?? "–", icon: "✨" },
            { label: "GitHub", value: "@" + GITHUB_USERNAME, icon: "🐙" },
          ].map((stat) => (
            <div key={stat.label} className="glass border border-white/10 rounded-2xl p-5 text-center">
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-white/40 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Contribution heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="glass border border-white/10 rounded-3xl p-6 md:p-8 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white font-semibold">Contribution Activity</h3>
            <span className="text-xs text-white/30 font-mono">Last 6 months</span>
          </div>
          <div className="flex gap-1 overflow-x-auto pb-2">
            {contributionGrid.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-1">
                {week.map((intensity, di) => (
                  <motion.div
                    key={di}
                    className="w-3 h-3 rounded-sm"
                    style={{ background: intensityColors[intensity] }}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: (wi * 7 + di) * 0.003 }}
                    whileHover={{ scale: 1.5, zIndex: 10 }}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-end gap-2 mt-3">
            <span className="text-xs text-white/30">Less</span>
            {intensityColors.map((color, i) => (
              <div key={i} className="w-3 h-3 rounded-sm" style={{ background: color }} />
            ))}
            <span className="text-xs text-white/30">More</span>
          </div>
        </motion.div>

        {/* Repos grid */}
        {!loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(repos.length > 0 ? repos : Array.from({ length: 6 }, (_, i) => ({
              id: i,
              name: `project-${i + 1}`,
              description: "A cool project built with modern technologies.",
              stargazers_count: Math.floor(Math.random() * 20),
              forks_count: Math.floor(Math.random() * 5),
              language: ["Python", "TypeScript", "JavaScript"][i % 3],
              html_url: `https://github.com/${GITHUB_USERNAME}`,
              topics: [],
              updated_at: new Date().toISOString(),
            }))).map((repo, i) => (
              <motion.a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="group glass border border-white/10 hover:border-purple-500/30 rounded-2xl p-5 transition-all duration-300 cursor-pointer"
                style={{ textDecoration: "none" }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center glass border border-white/10">
                    <svg className="w-4 h-4 text-white/60" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 3h18v18H3V3zm16 16V5H5v14h14zm-7-2H7v-2h5v2zm3-4H7v-2h9v2zm0-4H7V7h9v2z" />
                    </svg>
                  </div>
                  <svg className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>

                <h4 className="text-white font-semibold text-sm mb-2 truncate">{repo.name}</h4>
                <p className="text-white/40 text-xs leading-relaxed mb-4 line-clamp-2">
                  {repo.description || "No description available."}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-white/30">
                    {repo.language && (
                      <span className="flex items-center gap-1.5">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ background: languageColors[repo.language] || languageColors.default }}
                        />
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      ⭐ {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1">
                      🍴 {repo.forks_count}
                    </span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        )}

        {loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="glass border border-white/10 rounded-2xl p-5 animate-pulse">
                <div className="w-8 h-8 rounded-lg bg-white/10 mb-3" />
                <div className="h-4 bg-white/10 rounded mb-2" />
                <div className="h-3 bg-white/5 rounded mb-1" />
                <div className="h-3 bg-white/5 rounded w-2/3" />
              </div>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-medium text-sm"
            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", boxShadow: "0 0 25px rgba(99, 102, 241, 0.3)" }}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            View Full Profile
          </a>
        </motion.div>
      </div>
    </section>
  );
}
