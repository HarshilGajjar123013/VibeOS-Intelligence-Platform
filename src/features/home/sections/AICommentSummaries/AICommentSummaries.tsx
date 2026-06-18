"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Users,
  Sparkles,
  TrendingUp,
  Shield,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  BarChart3,
  Activity,
  Brain,
  Target,
  Settings,
  Lock,
  Eye,
  MessageSquare,
  Play,
  Mail,
  RefreshCw,
  Share2,
  ChevronLeft,
  ChevronRight,
  Smile,
  Meh,
  Frown
} from "lucide-react";
import "./AICommentSummaries.scss";
import { useProtoStore } from "@/src/store/useProtoStore";

/* ──────────────────────────────────────────────
   Scroll Reveal Hook
   ────────────────────────────────────────────── */
function useScrollReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, [threshold]);

  return [ref, revealed] as const;
}

/* ──────────────────────────────────────────────
   useCounter Hook
   ────────────────────────────────────────────── */
function useCounter(target: number, revealed: boolean, duration = 2000, suffix = "") {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!revealed) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [revealed, target, duration]);
  return count + suffix;
}

/* ──────────────────────────────────────────────
   Mock Data & Constants
   ────────────────────────────────────────────── */
const LOGO_COMPANIES = ["BOLT", "STRIPE", "VERCEL", "AIRBNB", "SLACK", "ATTENTIVE"];

const PILLARS_DATA = [
  {
    id: "tasks",
    title: "Automate manual tasks",
    desc: "Get an automated summary of all your employee comments – empowering your HR teams to focus their resources and energy on the most meaningful and impactful work.",
    badge: "Automation"
  },
  {
    id: "analysis",
    title: "Analyze survey results in seconds",
    desc: "With instant analysis of survey results and AI-powered recommendations, it’s easier than ever to take action off of survey results.",
    badge: "Instant Insights"
  },
  {
    id: "reports",
    title: "Easily generate and share reports",
    desc: "Drive more informed decision-making among leaders and managers with easy-to-share, summarized reports.",
    badge: "Seamless Share"
  }
];

const PERSONAS_DATA = [
  {
    id: "hr",
    label: "HR Teams",
    title: "Unbiased synthesis at scale",
    desc: "Give HR teams the data and insights to digest thousands of employee comments instantly and identify key thematic clusters with confidence.",
    points: [
      "Process 10,000+ comments in under 5 seconds",
      "Auto-cluster themes by tenure, location, and department",
      "Remove human bias and manual sorting overhead"
    ]
  },
  {
    id: "leaders",
    label: "Leaders",
    title: "Strategic executive dashboards",
    desc: "With summarized thematic dashboards, you can build a case for change and guide leaders towards strategic action.",
    points: [
      "Executive summary briefs ready for board presentations",
      "High-level heatmaps mapping cultural friction points",
      "Benchmark comparison against global industry leaders"
    ]
  },
  {
    id: "managers",
    label: "Managers",
    title: "Empower local team actions",
    desc: "Empower managers with localized comment summaries to take quick action on what their people care about most.",
    points: [
      "Department-specific feedback analysis (ensuring privacy)",
      "Suggested playbooks and meeting guide templates",
      "Continuous tracking loop of post-survey milestones"
    ]
  }
];

const TESTIMONIALS_DATA = [
  {
    quote: "Having access to a holistic, analytical approach allowed us to make decisions that have had the greatest impact over the past three years.",
    author: "Sahra Kaboli-Nejad",
    role: "Head of DEI and Social Impact at On",
    avatarText: "SK",
    avatarBg: "rgba(126, 83, 255, 0.1)",
    avatarColor: "#7e53ff"
  },
  {
    quote: "Working with VibeOS has enabled us to achieve our aim of elevating our employee listening. We now have a continuous listening and action loop. This has allowed us to empower our managers with data and show a tangible, quick response to what our people have told us is important.",
    author: "Christian Gisy",
    role: "CEO",
    avatarText: "CG",
    avatarBg: "rgba(59, 130, 246, 0.1)",
    avatarColor: "#3b82f6"
  },
  {
    quote: "Data is vital when we're pushing for policy changes. The insights we gathered through VibeOS have been key in shaping our decisions and actions.",
    author: "John Ferguson",
    role: "Chief Human Resources Officer",
    avatarText: "JF",
    avatarBg: "rgba(16, 185, 129, 0.1)",
    avatarColor: "#10b981"
  }
];

const FAQS_DATA = [
  {
    q: "How does AI comment summarization work?",
    a: "Our advanced NLP engine securely reads all open-text comments, filters out identifying names to guarantee anonymity, groups similar ideas into distinct clusters, and synthesizes key takeaways, strengths, and areas of concern in seconds."
  },
  {
    q: "How is employee privacy and confidentiality maintained?",
    a: "We adhere to strict privacy rules. Comment Summaries are only generated for cohorts that exceed our minimum response threshold (e.g. 5 or more responses). Additionally, the AI strips out personal names, emails, and specific identifiers."
  },
  {
    q: "Can managers view and share their specific team summaries?",
    a: "Yes! Admin settings allow HR leaders to delegate local dashboard access to managers, letting them see feedback summaries filtered for their specific team without showing individual raw identifiers."
  },
  {
    q: "Does VibeOS integrate with other survey distributions?",
    a: "Yes, our AI comment summaries integrate directly with our pulse surveys, onboarding/exit milestones, and annual engagement trackers, giving you a continuous feedback loop across all employee lifecycle stages."
  },
  {
    q: "How accurate are the AI theme classifications?",
    a: "Calibration checks show our HR-specific model performs with over 96% accuracy in clustering topics like compensation, workload, tooling, and company alignment, matching the accuracy of trained People Scientists."
  }
];

export default function AICommentSummaries() {
  const setDemoModalOpen = useProtoStore((state) => state.setDemoModalOpen);
  // Navigation & UI States
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeHeroTab, setActiveHeroTab] = useState<"summary" | "sentiment">("summary");
  const [activeBentoTab, setActiveBentoTab] = useState<"tasks" | "analysis" | "reports">("tasks");
  const [activePersona, setActivePersona] = useState<"hr" | "leaders" | "managers">("hr");
  const [activeQuote, setActiveQuote] = useState(0);

  // Auto-rotation states
  const [userPersonaInteracted, setUserPersonaInteracted] = useState(false);
  const [userQuoteInteracted, setUserQuoteInteracted] = useState(false);

  // Bento Interactive values
  const [selectedBentoTopic, setSelectedBentoTopic] = useState<"workload" | "onboarding" | "growth">("workload");

  // Form states
  const [emailInput, setEmailInput] = useState("");
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle");

  // Report Generator Simulator states
  const [reportGenerating, setReportGenerating] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);

  const handleGenerateReport = () => {
    setReportGenerating(true);
    setTimeout(() => {
      setReportGenerating(false);
      setReportGenerated(true);
    }, 1600);
  };

  // Scroll Reveal triggers
  const [heroRef, heroRevealed] = useScrollReveal();
  const [pillarsRef, pillarsRevealed] = useScrollReveal();
  const [statsRef, statsRevealed] = useScrollReveal();
  const [personaRef, personaRevealed] = useScrollReveal();
  const [testimonialRef, testimonialRevealed] = useScrollReveal();
  const [platformRef, platformRevealed] = useScrollReveal();
  const [faqRef, faqRevealed] = useScrollReveal();
  const [ctaRef, ctaRevealed] = useScrollReveal();

  // Statistics counters
  const countParticipation = useCounter(90, statsRevealed, 2000, "%");
  const countHoursSaved = useCounter(20, statsRevealed, 2000, "+ hrs");
  const countNps = useCounter(48, statsRevealed, 2000, "%");

  // Auto-rotating Persona Switcher
  useEffect(() => {
    if (userPersonaInteracted) return;
    const interval = setInterval(() => {
      setActivePersona((prev) => {
        if (prev === "hr") return "leaders";
        if (prev === "leaders") return "managers";
        return "hr";
      });
    }, 6000);
    return () => clearInterval(interval);
  }, [userPersonaInteracted]);

  // Auto-rotating Quote Testimonials
  useEffect(() => {
    if (userQuoteInteracted) return;
    const interval = setInterval(() => {
      setActiveQuote((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [userQuoteInteracted]);

  const handleCtaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes("@")) {
      setFormStatus("error");
      return;
    }
    setFormStatus("success");
    setTimeout(() => {
      setEmailInput("");
      setFormStatus("idle");
    }, 3000);
  };

  const getBentoSummaryText = () => {
    switch (selectedBentoTopic) {
      case "workload":
        return "AI Summary: Employees in Marketing report high fatigue due to recurring sprint meetings. Action recommendation: Deploy a Wednesday meeting cooldown.";
      case "onboarding":
        return "AI Summary: New hires rate the Day-30 guide highly (+35% sentiment). Action recommendation: Expand checklist templates to engineering cohorts.";
      case "growth":
        return "AI Summary: Compensation alignment comments show clusters around growth clarity. Action recommendation: Launch a career roadmap checkpoint.";
    }
  };

  return (
    <div className="aics-page">
      {/* ==========================================
          1. COSMIC SANDBOX HERO SECTION
          ========================================== */}
      <section className="aics-hero" ref={heroRef}>
        <div className="aics-hero__bg">
          <div className="aics-hero__glow aics-hero__glow--1" />
          <div className="aics-hero__glow aics-hero__glow--2" />
        </div>

        <div className="aics-hero__container">
          <motion.div
            className={`aics-hero__content ${heroRevealed ? "reveal-active" : ""}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="aics-hero__badge">
              <Sparkles size={12} className="mr-1.5 text-purple-400 animate-pulse" />
              Platform | Engage | AI comment summaries
            </span>
            <h1 className="aics-hero__title">
              Unlock all the critical <br />
              <span>insights hidden in your engagement data</span>
            </h1>
            <p className="aics-hero__desc">
              Get instant, secure, and unbiased summaries of the topics that matter most to your employees with Comment Summaries, powered by AI and underpinned by People Science. Make the right decisions based on accurate, actionable insights – all without the heavy lifting.
            </p>
            <div className="aics-hero__ctas">
              <button onClick={() => setDemoModalOpen(true)} className="aics-btn aics-btn--primary">
                Book a Demo
                <ArrowRight size={16} className="ml-1.5" />
              </button>
              <a href="#capabilities" className="aics-btn aics-btn--secondary">
                See How It Works
              </a>
            </div>

            <div className="aics-hero__trust">
              <span className="trust-label">TRUSTED BY GLOBAL TEAMS AT THE FOREFRONT OF CULTURE</span>
              <div className="trust-row">
                {LOGO_COMPANIES.map((company) => (
                  <span key={company} className="trust-logo">{company}</span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            className={`aics-hero__visual ${heroRevealed ? "reveal-active" : ""}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="hero-mock-browser">
              <div className="browser-header">
                <div className="browser-dots"><span /><span /><span /></div>
                <div className="browser-tabs">
                  <button
                    className={`tab-btn ${activeHeroTab === "summary" ? "active" : ""}`}
                    onClick={() => setActiveHeroTab("summary")}
                  >
                    AI Theme Summary
                  </button>
                  <button
                    className={`tab-btn ${activeHeroTab === "sentiment" ? "active" : ""}`}
                    onClick={() => setActiveHeroTab("sentiment")}
                  >
                    Live Comment Sentiment
                  </button>
                </div>
              </div>

              <div className="browser-body">
                <AnimatePresence mode="wait">
                  {activeHeroTab === "summary" ? (
                    <motion.div
                      key="summary"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="tab-content"
                    >
                      <div className="summary-card">
                        <div className="summary-header">
                          <Sparkles size={16} className="text-purple-500" />
                          <span>AI Topic Summary: Onboarding (35 Comments)</span>
                        </div>
                        <p className="summary-text">
                          New hires report overwhelming satisfaction with Day-30 onboarding manuals, highlighting ease of setup. A secondary cluster suggests some tooling fatigue in first-week logins.
                        </p>
                        <div className="tags-row">
                          <span className="tag tag--positive">Positive Vibe (+32%)</span>
                          <span className="tag tag--action">Action Required</span>
                        </div>
                      </div>

                      <div className="recommendations-box">
                        <h5>AI Suggested Action Plan</h5>
                        <ul className="rec-list">
                          <li>
                            <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                            <span>Audit Q2 new hire software integrations.</span>
                          </li>
                          <li>
                            <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                            <span>Map Day-30 documentation checklists.</span>
                          </li>
                        </ul>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="sentiment"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="tab-content"
                    >
                      <div className="sentiment-ratios">
                        <div className="ratio-header">
                          <span>Aggregate Sentiment Ratios</span>
                          <strong>Healthy (78%)</strong>
                        </div>
                        <div className="ratios-bar">
                          <div className="segment segment--pos" style={{ width: "70%" }} title="70% Positive" />
                          <div className="segment segment--neu" style={{ width: "18%" }} title="18% Neutral" />
                          <div className="segment segment--neg" style={{ width: "12%" }} title="12% Negative" />
                        </div>
                        <div className="ratio-legend">
                          <span className="leg"><Smile size={12} className="text-emerald-500" /> Positive (70%)</span>
                          <span className="leg"><Meh size={12} className="text-amber-500" /> Neutral (18%)</span>
                          <span className="leg"><Frown size={12} className="text-rose-500" /> Negative (12%)</span>
                        </div>
                      </div>

                      <div className="comment-feed">
                        <div className="comment-bubble">
                          <div className="bubble-meta">
                            <span>Engineering Team | 1yr tenure</span>
                            <span className="sentiment-indicator pos">Positive</span>
                          </div>
                          <p>&quot;The developer setup guide was incredibly helpful, cut configuration down to a single morning!&quot;</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="floating-widget widget-1">
              <Activity size={14} className="text-purple-500" />
              <span>Theme Clustering: Active</span>
            </div>
            <div className="floating-widget widget-2">
              <Shield size={14} className="text-emerald-500" />
              <span>SOC2 Anonymized</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==========================================
          2. CORE PILLARS SECTION (BENTO MATRIX)
          ========================================== */}
      <section className="aics-pillars" id="capabilities" ref={pillarsRef}>
        <div className="container">
          <div className={`aics-section-header text-center ${pillarsRevealed ? "reveal-active" : ""}`}>
            <span className="section-kicker">Core Capabilities</span>
            <h2>Take action off employee survey results</h2>
            <p>
              VibeOS provides all the tools you need to digest workforce feedback and act on key trends instantly.
            </p>
          </div>

          <div className={`aics-bento-grid ${pillarsRevealed ? "reveal-active" : ""}`}>
            {/* Card 1: Automate manual tasks (Pillar 1) */}
            <div className={`bento-card ${pillarsRevealed ? "reveal-active" : ""}`}>
              <div className="bento-card__content">
                <div className="pillar-icon icon-purple">
                  <Brain size={20} />
                </div>
                <span className="pillar-badge">Pillar 01</span>
                <h3>Automate manual tasks</h3>
                <p>
                  Get an automated summary of all your employee comments – empowering your HR teams to focus their resources and energy on the most meaningful and impactful work.
                </p>

                {/* Interactive theme selector */}
                <div className="bento-interactive-selector">
                  {["workload", "onboarding", "growth"].map((topic) => (
                    <button
                      key={topic}
                      className={`selector-pill ${selectedBentoTopic === topic ? "active" : ""}`}
                      onClick={() => setSelectedBentoTopic(topic as any)}
                    >
                      {topic.charAt(0).toUpperCase() + topic.slice(1)}
                    </button>
                  ))}
                </div>

                <div className="bento-summary-box">
                  <div className="summary-header">
                    <Sparkles size={12} className="text-purple-400" />
                    <span>Real-time Summarization</span>
                  </div>
                  <p className="summary-txt">{getBentoSummaryText()}</p>
                </div>

                {/* Interactive keyword cluster & sentiment visual */}
                <div className="bento-card__visualization">
                  <div className="viz-header">
                    <TrendingUp size={12} className="text-purple-400 animate-pulse" />
                    <span>Keyword Frequency & Sentiment Distribution</span>
                  </div>
                  <div className="viz-body">
                    {selectedBentoTopic === "workload" && (
                      <div className="viz-stats-bars">
                        <div className="bar-item">
                          <div className="bar-lbl">
                            <span>"meetings" / "calendar"</span>
                            <strong>68% mentions (High Negative)</strong>
                          </div>
                          <div className="bar-track"><span style={{ width: "68%" }} className="neg" /></div>
                        </div>
                        <div className="bar-item">
                          <div className="bar-lbl">
                            <span>"focus time"</span>
                            <strong>20% mentions (Moderate)</strong>
                          </div>
                          <div className="bar-track"><span style={{ width: "20%" }} className="neu" /></div>
                        </div>
                        <div className="bar-item">
                          <div className="bar-lbl">
                            <span>"async tools"</span>
                            <strong>12% mentions (Low)</strong>
                          </div>
                          <div className="bar-track"><span style={{ width: "12%" }} className="pos" /></div>
                        </div>
                      </div>
                    )}

                    {selectedBentoTopic === "onboarding" && (
                      <div className="viz-stats-bars">
                        <div className="bar-item">
                          <div className="bar-lbl">
                            <span>"setup guide" / "docs"</span>
                            <strong>72% mentions (High Positive)</strong>
                          </div>
                          <div className="bar-track"><span style={{ width: "72%" }} className="pos" /></div>
                        </div>
                        <div className="bar-item">
                          <div className="bar-lbl">
                            <span>"access logins"</span>
                            <strong>18% mentions (Moderate)</strong>
                          </div>
                          <div className="bar-track"><span style={{ width: "18%" }} className="neg" /></div>
                        </div>
                        <div className="bar-item">
                          <div className="bar-lbl">
                            <span>"buddy system"</span>
                            <strong>10% mentions (Positive)</strong>
                          </div>
                          <div className="bar-track"><span style={{ width: "10%" }} className="pos" /></div>
                        </div>
                      </div>
                    )}

                    {selectedBentoTopic === "growth" && (
                      <div className="viz-stats-bars">
                        <div className="bar-item">
                          <div className="bar-lbl">
                            <span>"career roadmap" / "milestones"</span>
                            <strong>58% mentions (Moderate Negative)</strong>
                          </div>
                          <div className="bar-track"><span style={{ width: "58%" }} className="neg" /></div>
                        </div>
                        <div className="bar-item">
                          <div className="bar-lbl">
                            <span>"mentorship"</span>
                            <strong>30% mentions (Positive)</strong>
                          </div>
                          <div className="bar-track"><span style={{ width: "30%" }} className="pos" /></div>
                        </div>
                        <div className="bar-item">
                          <div className="bar-lbl">
                            <span>"training budgets"</span>
                            <strong>12% mentions (Neutral)</strong>
                          </div>
                          <div className="bar-track"><span style={{ width: "12%" }} className="neu" /></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Analyze in seconds (Pillar 2) */}
            <div className={`bento-card ${pillarsRevealed ? "reveal-active" : ""}`}>
              <div className="bento-card__content">
                <div className="pillar-icon icon-blue">
                  <BarChart3 size={20} />
                </div>
                <span className="pillar-badge">Pillar 02</span>
                <h3>Analyze survey results in seconds</h3>
                <p>
                  With instant analysis of survey results and AI-powered recommendations, it’s easier than ever to take action off of survey results.
                </p>

                <div className="bento-insights-box">
                  <div className="insights-header">
                    <TrendingUp size={12} className="text-blue-400" />
                    <span>Action Playbook</span>
                  </div>
                  <ul className="insights-checklist">
                    <li>
                      <Check size={12} className="text-blue-400" />
                      <span>Implement no-meeting Wednesday</span>
                    </li>
                    <li>
                      <Check size={12} className="text-blue-400" />
                      <span>Distribute asynchronous tools FAQ</span>
                    </li>
                  </ul>
                </div>

                {/* Survey Score Trend Line Chart Visualization */}
                <div className="bento-card__visualization">
                  <div className="viz-header">
                    <Activity size={12} className="text-blue-400" />
                    <span>Survey Sentiment Score Trend</span>
                  </div>
                  <div className="viz-body">
                    <div className="bento-trend-chart">
                      <svg viewBox="0 0 200 80" className="chart-svg">
                        <path d="M10,70 Q40,55 70,60 T130,30 T190,15" fill="none" stroke="#3b82f6" strokeWidth="2.5" />
                        <circle cx="190" cy="15" r="3.5" fill="#3b82f6" className="animate-ping" style={{ transformOrigin: "190px 15px" }} />
                        <circle cx="190" cy="15" r="3.5" fill="#3b82f6" />
                        <circle cx="130" cy="30" r="2.5" fill="#3b82f6" />
                        <circle cx="70" cy="60" r="2.5" fill="#3b82f6" />
                      </svg>
                      <div className="chart-label flex justify-between text-[10px] text-slate-400 mt-1">
                        <span>Q1 (Baseline)</span>
                        <span>Q2 (Transition)</span>
                        <span>Q3 (AI Active)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Easily generate and share reports (Pillar 3) */}
            <div className={`bento-card ${pillarsRevealed ? "reveal-active" : ""}`}>
              <div className="bento-card__content">
                <div className="pillar-icon icon-emerald">
                  <Share2 size={20} />
                </div>
                <span className="pillar-badge">Pillar 03</span>
                <h3>Easily generate and share reports</h3>
                <p>
                  Drive more informed decision-making among leaders and managers with easy-to-share, summarized reports.
                </p>

                <div className="bento-share-box">
                  <div className="share-header">
                    <span>Export Summary Report</span>
                    <span className="file-badge">PDF</span>
                  </div>
                  <div className="share-recipients">
                    <div className="avatar">HR</div>
                    <div className="avatar">LD</div>
                    <div className="avatar">MG</div>
                    <div className="add-btn">+</div>
                  </div>
                </div>

                {/* Report Generator Studio Interactive Simulator */}
                <div className="bento-card__visualization">
                  <div className="viz-header">
                    <Share2 size={12} className="text-emerald-400" />
                    <span>Report Generator Studio</span>
                  </div>
                  <div className="viz-body">
                    {reportGenerating ? (
                      <div className="generating-loader flex flex-col items-center justify-center gap-2 py-4">
                        <RefreshCw size={20} className="animate-spin text-emerald-500" />
                        <span className="text-[11px] font-bold text-slate-500">Assembling executive PDF...</span>
                      </div>
                    ) : reportGenerated ? (
                      <div className="report-success flex flex-col items-center justify-center gap-2 py-2">
                        <CheckCircle2 size={22} className="text-emerald-500" />
                        <span className="text-[11px] font-bold text-emerald-600">Report sent to leaders & managers!</span>
                        <button onClick={() => setReportGenerated(false)} className="reset-btn text-[9px] text-slate-400 hover:text-slate-600 underline cursor-pointer mt-1">
                          Send another
                        </button>
                      </div>
                    ) : (
                      <div className="report-config-flow flex flex-col gap-3 pt-2">
                        <button onClick={handleGenerateReport} className="generate-action-btn flex items-center justify-center gap-2 w-full h-10 bg-slate-950 text-white rounded-lg text-xs font-bold hover:bg-emerald-500 hover:shadow-md transition-all">
                          <span>Generate & Send Report</span>
                          <ArrowRight size={12} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          3. STATISTICS SECTION
          ========================================== */}
      <section className="aics-stats" ref={statsRef}>
        <div className="container">
          <div className={`aics-section-header text-center ${statsRevealed ? "reveal-active" : ""}`}>
            <span className="section-kicker">Business Impact</span>
            <h2>The impact of VibeOS’s employee survey tools</h2>
            <p>Make smarter people decisions that drive business success.</p>
          </div>

          <div className={`aics-stats-grid ${statsRevealed ? "reveal-active" : ""}`}>
            {/* Stat 1 */}
            <div className={`stat-card ${statsRevealed ? "reveal-active" : ""}`}>
              <div className="stat-card__visual">
                <svg viewBox="0 0 36 36" className="stat-ring">
                  <path className="bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="fill purple" strokeDasharray="90, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div className="stat-number">{countParticipation}</div>
              </div>
              <h4>Initial employee engagement survey participation rate</h4>
              <p>Highly engaged cohorts complete feedback loops with premium compliance rates.</p>
            </div>

            {/* Stat 2 */}
            <div className={`stat-card ${statsRevealed ? "reveal-active" : ""}`}>
              <div className="stat-card__visual">
                <svg viewBox="0 0 36 36" className="stat-ring">
                  <path className="bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="fill blue" strokeDasharray="80, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div className="stat-number">{countHoursSaved}</div>
              </div>
              <h4>Saved per month on survey distribution and reporting</h4>
              <p>Automated thematic analysis completely replaces manual spreadsheet classification.</p>
            </div>

            {/* Stat 3 */}
            <div className={`stat-card ${statsRevealed ? "reveal-active" : ""}`}>
              <div className="stat-card__visual">
                <svg viewBox="0 0 36 36" className="stat-ring">
                  <path className="bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="fill emerald" strokeDasharray="48, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div className="stat-number">{countNps}</div>
              </div>
              <h4>Higher customer Net Promoter Score (NPS)</h4>
              <p>Culture first companies outpace global competitors by supporting their employees.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          4. INTERACTIVE PERSONA SWITCHER SECTION
          ========================================== */}
      <section className="aics-persona" ref={personaRef}>
        <div className="container">
          <div className={`aics-section-header text-center ${personaRevealed ? "reveal-active" : ""}`}>
            <span className="section-kicker">Deployment Matrix</span>
            <h2>AI comment summaries that work across your entire organization</h2>
            <p>Empower every layer of your business with localized, secure feedback trends.</p>
          </div>

          <div className={`persona-tabs ${personaRevealed ? "reveal-active" : ""}`}>
            {PERSONAS_DATA.map((persona) => (
              <button
                key={persona.id}
                className={`persona-tab-btn ${activePersona === persona.id ? "active" : ""}`}
                onClick={() => {
                  setActivePersona(persona.id as any);
                  setUserPersonaInteracted(true);
                }}
              >
                {persona.label}
              </button>
            ))}
          </div>

          <div className={`persona-viewport ${personaRevealed ? "reveal-active" : ""}`}>
            <AnimatePresence mode="wait">
              {PERSONAS_DATA.map((p) => {
                if (p.id !== activePersona) return null;
                return (
                  <motion.div
                    key={p.id}
                    className="persona-card-row"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="persona-card-row__content">
                      <span className="tag">Role Specific</span>
                      <h3>{p.title}</h3>
                      <p>{p.desc}</p>
                      <ul className="persona-points">
                        {p.points.map((pt, idx) => (
                          <li key={idx}>
                            <Check className="text-purple-500 shrink-0" size={16} />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="persona-card-row__visual">
                      <div className="dashboard-simulator">
                        <div className="simulator-header">
                          <div className="dots"><span /><span /><span /></div>
                          <span>Dashboard: {p.label} View</span>
                        </div>
                        <div className="simulator-body">
                          {p.id === "hr" && (
                            <div className="sim-block">
                              <div className="sim-kpi">
                                <span>Unsupervised Clusters</span>
                                <strong>12 Emerging Themes</strong>
                              </div>
                              <div className="cluster-list">
                                <div className="cluster-item">
                                  <span>Remote Tool Fatigue</span>
                                  <div className="tracker-bar"><span style={{ width: "84%" }} className="purple" /></div>
                                </div>
                                <div className="cluster-item">
                                  <span>Career Progression paths</span>
                                  <div className="tracker-bar"><span style={{ width: "62%" }} className="blue" /></div>
                                </div>
                              </div>
                            </div>
                          )}

                          {p.id === "leaders" && (
                            <div className="sim-block">
                              <div className="sim-kpi">
                                <span>Global Sentiment Index</span>
                                <strong>74% Positive</strong>
                              </div>
                              <div className="leadership-chart">
                                <div className="chart-bar" style={{ height: "40%" }} />
                                <div className="chart-bar" style={{ height: "65%" }} />
                                <div className="chart-bar" style={{ height: "80%" }} />
                                <div className="chart-bar active" style={{ height: "94%" }} />
                              </div>
                            </div>
                          )}

                          {p.id === "managers" && (
                            <div className="sim-block">
                              <div className="sim-kpi">
                                <span>Team Action Items</span>
                                <strong>3 Checklists</strong>
                              </div>
                              <ul className="manager-checklist">
                                <li>
                                  <input type="checkbox" defaultChecked disabled />
                                  <span>Establish weekly async update thread</span>
                                </li>
                                <li>
                                  <input type="checkbox" disabled />
                                  <span>Organize onboarding guide feedback chat</span>
                                </li>
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ==========================================
          5. CUSTOMER TESTIMONIALS CAROUSEL
          ========================================== */}
      <section className="aics-testimonials" ref={testimonialRef}>
        <div className="container">
          <div className={`aics-section-header text-center ${testimonialRevealed ? "reveal-active" : ""}`}>
            <span className="section-kicker">Success Stories</span>
            <h2>What HR Leaders Say About Us</h2>
          </div>

          <div className={`testimonials-carousel ${testimonialRevealed ? "reveal-active" : ""}`}>
            <div className="carousel-nav flex justify-between items-center">
              <button
                className="nav-btn"
                onClick={() => {
                  setActiveQuote((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
                  setUserQuoteInteracted(true);
                }}
              >
                <ChevronLeft size={20} />
              </button>

              <div className="carousel-viewport">
                <AnimatePresence mode="wait">
                  {TESTIMONIALS_DATA.map((t, idx) => {
                    if (idx !== activeQuote) return null;
                    return (
                      <motion.div
                        key={idx}
                        className="quote-panel"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.4 }}
                      >
                        <p className="quote-text">&quot;{t.quote}&quot;</p>
                        <div className="quote-author">
                          <div
                            className="author-avatar"
                            style={{ backgroundColor: t.avatarBg, color: t.avatarColor }}
                          >
                            {t.avatarText}
                          </div>
                          <div className="author-info">
                            <strong>{t.author}</strong>
                            <span>{t.role}</span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              <button
                className="nav-btn"
                onClick={() => {
                  setActiveQuote((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
                  setUserQuoteInteracted(true);
                }}
              >
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="carousel-dots">
              {TESTIMONIALS_DATA.map((_, idx) => (
                <button
                  key={idx}
                  className={`dot ${activeQuote === idx ? "active" : ""}`}
                  onClick={() => {
                    setActiveQuote(idx);
                    setUserQuoteInteracted(true);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          6. CROSS-SELL PLATFORM SECTION
          ========================================== */}
      <section className="aics-platform-explore" ref={platformRef}>
        <div className="container">
          <div className={`aics-section-header text-center ${platformRevealed ? "reveal-active" : ""}`}>
            <span className="section-kicker">Full Platform</span>
            <h2>Explore our full employee experience suite</h2>
            <p>Connect feedback, performance evaluation, and growth plans into a single directory.</p>
          </div>

          <div className={`platform-grid ${platformRevealed ? "reveal-active" : ""}`}>
            <div className="platform-card">
              <div className="platform-card__preview preview-engage">
                <div className="q-mini">
                  <span>"I feel supported at VibeOS."</span>
                  <div className="mini-scale">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <span key={num} className={num === 5 ? "active" : ""}>{num}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="card-top">
                <Users className="text-purple-500" size={20} />
                <span>Engage</span>
              </div>
              <h3>Boost employee engagement</h3>
              <p>Gain real-time insights to boost engagement, improve retention, and support your people.</p>
              <a href="/platform/ready-to-use-surveys" className="explore-btn">
                <span>Learn More</span>
                <ArrowRight size={14} />
              </a>
            </div>

            <div className="platform-card">
              <div className="platform-card__preview preview-perform">
                <div className="perf-mini">
                  <div className="perf-row">
                    <span>Q2 Goals Completed</span>
                    <strong>84%</strong>
                  </div>
                  <div className="mini-track"><span style={{ width: "84%" }} /></div>
                </div>
              </div>
              <div className="card-top">
                <Activity className="text-blue-500" size={20} />
                <span>Perform</span>
              </div>
              <h3>Unlock high performance</h3>
              <p>Empower teams with tools to improve effectiveness and drive continuous performance.</p>
              <a href="/platform/proven-action-plans" className="explore-btn">
                <span>Learn More</span>
                <ArrowRight size={14} />
              </a>
            </div>

            <div className="platform-card">
              <div className="platform-card__preview preview-develop">
                <div className="dev-mini">
                  <div className="step-circle active">1</div>
                  <div className="step-line" />
                  <div className="step-circle active">2</div>
                  <div className="step-line" />
                  <div className="step-circle">3</div>
                </div>
                <span className="dev-lbl">Level 2: Lead Architect Milestone</span>
              </div>
              <div className="card-top">
                <Target className="text-emerald-500" size={20} />
                <span>Develop</span>
              </div>
              <h3>Drive continuous growth</h3>
              <p>Align personal goals with company objectives to foster growth and development.</p>
              <a href="/platform/benchmarking" className="explore-btn">
                <span>Learn More</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          7. FAQ ACCORDIONS SECTION
          ========================================== */}
      <section className="aics-faq" ref={faqRef}>
        <div className="container">
          <div className={`aics-section-header text-center ${faqRevealed ? "reveal-active" : ""}`}>
            <span className="section-kicker">FAQ</span>
            <h2>Frequently Asked Questions</h2>
          </div>

          <div className={`aics-faq__list ${faqRevealed ? "reveal-active" : ""}`}>
            {FAQS_DATA.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className={`faq-accordion-item ${isOpen ? "active" : ""}`}
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                >
                  <div className="faq-question">
                    <span>{faq.q}</span>
                    <ChevronDown size={16} className="faq-arrow" />
                  </div>
                  <div className="faq-answer">
                    <p>{faq.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==========================================
          8. FINAL CTA FORM SECTION
          ========================================== */}
      <section className="aics-cta" ref={ctaRef}>
        <div className="aics-cta__mesh" />
        <div className="aics-cta__circle circle-1" />
        <div className="aics-cta__circle circle-2" />

        <div className={`aics-cta__container ${ctaRevealed ? "reveal-active" : ""}`}>
          <h2>Invest in your people and create impact</h2>
          <p>
            Get instant, secure, and unbiased summaries of the topics that matter most to your employees.
          </p>

          <form className="cta-form" onSubmit={handleCtaSubmit}>
            <div className="input-group">
              <Mail className="mail-icon" size={18} />
              <input
                type="email"
                placeholder="Enter work email..."
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                disabled={formStatus === "success"}
                required
              />
              <button type="submit" className="submit-btn" disabled={formStatus === "success"}>
                {formStatus === "success" ? "Subscribed!" : "Book a Demo"}
              </button>
            </div>
            {formStatus === "success" && (
              <span className="status-msg success">Success! We will email you shortly.</span>
            )}
            {formStatus === "error" && (
              <span className="status-msg error">Please enter a valid work email address.</span>
            )}
          </form>

          <div className="cta-badges">
            <span className="badge"><Shield size={12} /> SOC2 Compliant</span>
            <span className="badge"><Lock size={12} /> HIPAA Safe</span>
            <span className="badge"><CheckCircle2 size={12} /> 99.9% Uptime</span>
          </div>
        </div>
      </section>
    </div>
  );
}
