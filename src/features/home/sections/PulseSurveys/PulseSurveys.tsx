"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  FileText,
  TrendingUp,
  Settings,
  BarChart3,
  Target,
  CheckCircle2,
  Clock,
  AlertCircle,
  Sparkles,
  Shield,
  Brain,
  ArrowRight,
  Play,
  MessageSquare,
  Smile,
  Meh,
  Frown,
  Check,
  ChevronDown,
  Activity,
  Lock,
  Eye,
  Heart,
  Calendar,
  Send,
  Zap,
  Quote,
  Share2,
  TrendingDown,
  Database,
  ArrowUpRight,
  Cpu,
  HelpCircle,
  ToggleLeft,
  ToggleRight
} from "lucide-react";
import "./PulseSurveys.scss";
import { useProtoStore } from "@/src/store/useProtoStore";

/* ──────────────────────────────────────────────
   Scroll Reveal Hook
   ────────────────────────────────────────────── */
function useScrollReveal(threshold = 0.08) {
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

export default function PulseSurveys() {
  const setDemoModalOpen = useProtoStore((state) => state.setDemoModalOpen);
  // Navigation & FAQ States
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  // Hero Simulator states
  const [heroTab, setHeroTab] = useState<"sentiment" | "slack" | "teams">("sentiment");
  const [selectedHeroEmoji, setSelectedHeroEmoji] = useState<string | null>(null);
  const [selectedHeroScale, setSelectedHeroScale] = useState<number | null>(null);

  // Bento simulators states
  const [activeCohort, setActiveCohort] = useState<"sales" | "marketing" | "cs">("sales");
  const [activeBenchmark, setActiveBenchmark] = useState<"tech" | "finance" | "prof">("tech");
  const [activeEvent, setActiveEvent] = useState<"tools" | "leadership" | "migration">("tools");

  // ROI Calculator states
  const [headcount, setHeadcount] = useState(500);

  // Dark Cockpit Tour states
  const [activeTourTab, setActiveTourTab] = useState<"builder" | "nlp" | "playbook" | "change">("builder");

  // Integrations states
  const [integrations, setIntegrations] = useState({
    slack: true,
    teams: true,
    workday: true,
    bamboohr: false
  });

  // Client Testimonials Slider
  const [activeQuote, setActiveQuote] = useState(0);

  // CTA form states
  const [emailInput, setEmailInput] = useState("");
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle");

  // Scroll Reveal Refs
  const [heroRef, heroRevealed] = useScrollReveal();
  const [problemRef, problemRevealed] = useScrollReveal();
  const [capabilitiesRef, capabilitiesRevealed] = useScrollReveal();
  const [roiRef, roiRevealed] = useScrollReveal();
  const [howRef, howRevealed] = useScrollReveal();
  const [tourRef, tourRevealed] = useScrollReveal();
  const [integrationsRef, integrationsRevealed] = useScrollReveal();
  const [faqRef, faqRevealed] = useScrollReveal();
  const [ctaRef, ctaRevealed] = useScrollReveal();

  const problemCards = [
    {
      title: "Delayed Feedback Loops",
      desc: "Annual surveys provide static insights long after cultural problems and burnout have already developed.",
      icon: <Clock size={22} />,
      color: "rose"
    },
    {
      title: "Low Visibility Into Change",
      desc: "Leaders struggle to track how restructuring, new tools, or policy initiatives affect employee experiences in real time.",
      icon: <Eye size={22} />,
      color: "blue"
    },
    {
      title: "Reactive Decision Making",
      desc: "Organizations respond only after engagement declines and retention drops, rather than preventing turnover issues.",
      icon: <Activity size={22} />,
      color: "purple"
    },
    {
      title: "Retention Risks Go Unnoticed",
      desc: "Early warning signs of cohort friction remain hidden until resignation letters are officially registered.",
      icon: <AlertCircle size={22} />,
      color: "amber"
    }
  ];

  const steps = [
    {
      step: "01",
      title: "Launch Pulse Surveys",
      desc: "Deploy short, science-backed surveys designed to capture employee sentiment quickly via Email, Slack, or Teams.",
      badge: "Survey Builder"
    },
    {
      step: "02",
      title: "Gather Real-Time Responses",
      desc: "Collect responses with ease. Multi-channel integrations yield 85%+ participation rates without survey fatigue.",
      badge: "Frictionless Listening"
    },
    {
      step: "03",
      title: "Analyze Trends & Shifts",
      desc: "Track department sentiment timelines, map scores to organization events, and detect early retention anomalies.",
      badge: "Real-time Dashboards"
    },
    {
      step: "04",
      title: "Deploy Targeted Actions",
      desc: "Equip managers with tailored playbooks, recommend conversation checklists, and track improvement indicators.",
      badge: "Manager Playbooks"
    }
  ];

  const testimonials = [
    {
      quote: "Switching from annual surveys to VibeOS pulse loops was a game-changer. We now gather weekly alignment checks and address employee stress levels instantly rather than reactively.",
      author: "Marcus Vance",
      role: "VP of People Experience, Attentive",
      avatarBg: "#7e53ff",
      avatarColor: "#ffffff",
      avatarText: "MV"
    },
    {
      quote: "Our response rate jumped to 89% when we launched VibeOS Slack surveys. The built-in playbooks give our department managers instant action plans to prevent flight risks.",
      author: "Christian Gisy",
      role: "Chief Executive Officer",
      avatarBg: "#3b82f6",
      avatarColor: "#ffffff",
      avatarText: "CG"
    },
    {
      quote: "We measured our cultural index before and after the workplace relocation. Having the exact data to prove a 12% rise in wellbeing justified our flexible policy to the board.",
      author: "John Ferguson",
      role: "Chief Human Resources Officer",
      avatarBg: "#10b981",
      avatarColor: "#ffffff",
      avatarText: "JF"
    }
  ];

  const faqs = [
    {
      q: "What is a pulse survey?",
      a: "A pulse survey is a short, frequent survey sent to employees to continuously measure engagement, track organizational changes, and capture real-time sentiment without causing survey fatigue."
    },
    {
      q: "How often should pulse surveys be sent?",
      a: "We recommend bi-weekly or monthly pulse cycles. This frequency allows leadership to track sentiment shifts and respond to team concerns without overloading employees with questionnaires."
    },
    {
      q: "How many questions should a pulse survey contain?",
      a: "To preserve high response rates, pulse surveys should be extremely short—usually containing 2 to 5 targeted, science-backed questions taking less than a minute to complete."
    },
    {
      q: "Can pulse surveys measure employee engagement?",
      a: "Yes. By mapping responses over time across core culture metrics (alignment, growth, psychological safety), pulse surveys provide a much more accurate representation of engagement than annual surveys."
    },
    {
      q: "How do pulse surveys improve retention?",
      a: "By flagging sentiment drops, workload anomalies, and satisfaction issues early, pulse surveys alert managers to flight risks, allowing them to proactively resolve issues before resignation notices occur."
    },
    {
      q: "Can managers view team-level insights?",
      a: "Yes. Managers have access to aggregate dashboard views showing cohort-level scores and recommendations, provided the team meets our strict privacy aggregation threshold (e.g. 5+ members)."
    },
    {
      q: "How is employee anonymity protected?",
      a: "Anonymity is a core pillar of VibeOS. Individual survey responses are aggregated into cohort reports, and strict minimum-response thresholds are enforced to ensure individual identities cannot be singled out."
    },
    {
      q: "Can pulse surveys be customized?",
      a: "Yes. While we provide a library of science-backed templates, you can easily customize surveys, write custom questions, and set custom schedules using our drag-and-drop builder."
    }
  ];

  // Attrition data helper
  const getCohortData = (cohort: "sales" | "marketing" | "cs") => {
    switch (cohort) {
      case "sales":
        return {
          risk: "84% High Risk",
          colorClass: "rose",
          drivers: ["Lack of Career Growth (62%)", "Comp Discrepancy (24%)"],
          playbook: "Deploy Sales Career Progression Path"
        };
      case "marketing":
        return {
          risk: "56% Moderate Risk",
          colorClass: "amber",
          drivers: ["Meeting Overload / Burnout (48%)", "Role Ambiguity (18%)"],
          playbook: "Initiate Meeting Cooldown Calendar"
        };
      case "cs":
        return {
          risk: "18% Low Risk",
          colorClass: "emerald",
          drivers: ["Lack of Collaboration (12%)", "Goal Alignment (6%)"],
          playbook: "Conduct Customer Success Retro"
        };
    }
  };

  // Benchmark helper
  const getBenchmarkOffset = (bench: "tech" | "finance" | "prof") => {
    switch (bench) {
      case "tech":
        return { score: 74, offset: "+7% Above Average", isPositive: true };
      case "finance":
        return { score: 78, offset: "+3% Above Average", isPositive: true };
      case "prof":
        return { score: 83, offset: "-2% Below Average", isPositive: false };
    }
  };

  // Change timeline helper
  const getEventData = (evt: "tools" | "leadership" | "migration") => {
    switch (evt) {
      case "tools":
        return {
          title: "New Tools Deployed",
          date: "Week 1",
          before: "68%",
          after: "80%",
          diff: "+12% Wellbeing Index",
          color: "emerald",
          desc: "Collaboration metrics rose after cleaning up redundant tools."
        };
      case "leadership":
        return {
          title: "Leadership Reorganization",
          date: "Week 3",
          before: "74%",
          after: "68%",
          diff: "-6% Alignment Index",
          color: "rose",
          desc: "Brief alignment dip during transitional planning."
        };
      case "migration":
        return {
          title: "Flex Office Migration",
          date: "Week 5",
          before: "70%",
          after: "84%",
          diff: "+14% Office Vibe Index",
          color: "purple",
          desc: "Flexible working policy boosted overall team psychological safety."
        };
    }
  };

  // Integrations toggle
  const handleToggleIntegration = (service: "slack" | "teams" | "workday" | "bamboohr") => {
    setIntegrations(prev => ({
      ...prev,
      [service]: !prev[service]
    }));
  };

  // CTA form submit
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

  // Auto-rotating testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveQuote(prev => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <div className="ps-page">
      {/* Ambient background glows */}
      <div className="ps-ambient-glow" />

      {/* ==========================================
          1. HERO SECTION (WITH TABS HERO SIMULATOR)
          ========================================== */}
      <section className="ps-hero" ref={heroRef}>
        <div className="ps-hero__container">
          <div className="ps-hero__grid">
            
            {/* Left Content Column */}
            <div className={`ps-hero__content ${heroRevealed ? "reveal-active" : ""}`}>
              <div className="ps-hero__badge">
                <Sparkles size={12} className="text-purple-400 animate-pulse" />
                <span>Continuous Employee Listening</span>
              </div>
              <h1 className="ps-hero__title">
                Pulse surveys: <span>Understand the impact of your engagement initiatives</span>
              </h1>
              <p className="ps-hero__desc">
                Maintain the flow of feedback with science-backed pulse surveys that make it easy to track the impact of organizational changes. Gain real-time actionable data that drives decision-making and improves retention, engagement, and productivity.
              </p>
              
              <div className="ps-hero__cta">
                <button onClick={() => setDemoModalOpen(true)} className="ps-btn ps-btn--primary">
                  <span>Book a Demo</span>
                  <ArrowRight size={16} />
                </button>
                <a href="#capabilities" className="ps-btn ps-btn--secondary">
                  <span>Explore Capabilities</span>
                </a>
              </div>

              {/* Security & Compliance Badges */}
              <div className="ps-hero__compliance">
                <div className="badge-item">
                  <Shield size={14} />
                  <span>SOC2 Certified</span>
                </div>
                <div className="badge-item">
                  <Lock size={14} />
                  <span>Data Encrypted</span>
                </div>
                <div className="badge-item">
                  <CheckCircle2 size={14} />
                  <span>HIPAA Compliant</span>
                </div>
              </div>
            </div>

            {/* Right Interactive Dashboard Mockup Column */}
            <div className={`ps-hero__visual ${heroRevealed ? "reveal-active" : ""}`}>
              <div className="dashboard-mock">
                {/* Browser Header */}
                <div className="dashboard-mock__header">
                  <div className="dots"><span /><span /><span /></div>
                  <div className="hero-tabs-selector flex gap-1">
                    {["sentiment", "slack", "teams"].map((tab) => (
                      <button
                        key={tab}
                        className={`tab-btn-pill ${heroTab === tab ? "active" : ""}`}
                        onClick={() => setHeroTab(tab as any)}
                      >
                        {tab === "sentiment" ? "Real-time Pulse" : tab === "slack" ? "Slack Bot" : "MS Teams"}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="dashboard-mock__body">
                  <AnimatePresence mode="wait">
                    {heroTab === "sentiment" && (
                      <motion.div
                        key="sentiment"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="hero-tab-view sentiment-view"
                      >
                        {/* Sentiment dials and info */}
                        <div className="mock-grid-row">
                          <div className="mock-widget mock-widget--sentiment">
                            <span className="widget-label">Pulse Sentiment Score</span>
                            <div className="sentiment-bar-progress">
                              <svg viewBox="0 0 36 36" className="score-ring">
                                <circle cx="18" cy="18" r="15.915" className="bg" />
                                <circle cx="18" cy="18" r="15.915" className="fill fill-81" />
                              </svg>
                              <div className="score-text">81%</div>
                            </div>
                            <span className="widget-trend text-emerald-500">▲ 4% Positive Sentiment</span>
                          </div>

                          <div className="mock-widget mock-widget--stats">
                            <span className="widget-label">Survey Performance</span>
                            <div className="performance-stats">
                              <div className="stat-row">
                                <span className="lbl">Participation</span>
                                <strong className="text-purple-600">87%</strong>
                              </div>
                              <div className="stat-row">
                                <span className="lbl">Response Speed</span>
                                <strong className="text-blue-600">4.2h avg</strong>
                              </div>
                              <div className="stat-row">
                                <span className="lbl">Pulse Loops</span>
                                <strong className="text-emerald-600">Weekly</strong>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Trend Tracker Graph */}
                        <div className="mock-widget mock-widget--trend mt-4">
                          <div className="trend-header">
                            <span className="trend-title">Engagement Score Trends</span>
                            <span className="trend-indicator text-emerald-500 font-bold">Stable (7.8/10)</span>
                          </div>
                          <div className="trend-graph-wrapper mt-3">
                            <svg viewBox="0 0 400 100" className="w-full h-24">
                              <defs>
                                <linearGradient id="hero-trend-grad" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%" stopColor="#7e53ff" stopOpacity="0.25" />
                                  <stop offset="100%" stopColor="#7e53ff" stopOpacity="0" />
                                </linearGradient>
                              </defs>
                              <path d="M 0 80 Q 80 50 160 65 T 320 30 T 400 25 L 400 100 L 0 100 Z" fill="url(#hero-trend-grad)" />
                              <path d="M 0 80 Q 80 50 160 65 T 320 30 T 400 25" fill="none" stroke="#7e53ff" strokeWidth="3" strokeLinecap="round" />
                              <circle cx="320" cy="30" r="4" fill="#7e53ff" />
                              <circle cx="320" cy="30" r="8" fill="#7e53ff" fillOpacity="0.25" className="pulse" />
                            </svg>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {heroTab === "slack" && (
                      <motion.div
                        key="slack"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="hero-tab-view slack-view-container"
                      >
                        {/* Slack Sidebar */}
                        <div className="slack-sidebar">
                          <div className="slack-sidebar__header">
                            <span className="workspace-title">CoreShift</span>
                            <span className="dropdown-arrow">▾</span>
                          </div>
                          <div className="slack-sidebar__channels">
                            <div className="section-hdr">Channels</div>
                            <div className="channel-item"># general</div>
                            <div className="channel-item"># marketing</div>
                            <div className="channel-item active"># vibe-pulse-bot</div>
                            
                            <div className="section-hdr mt-4">Apps</div>
                            <div className="channel-item app-item active">
                              <span className="status-dot online"></span>
                              VibeOS
                            </div>
                          </div>
                        </div>

                        {/* Slack Chat Area */}
                        <div className="slack-chat-area">
                          <div className="slack-chat-header">
                            <span className="channel-name"># vibe-pulse-bot</span>
                            <span className="channel-desc">Collect weekly pulse alignment check-ins</span>
                          </div>
                          <div className="slack-chat-body">
                            <div className="message flex gap-3">
                              <div className="bot-avatar bg-purple-600 text-white font-extrabold text-xs flex items-center justify-center rounded-lg w-8 h-8 shrink-0">
                                V
                              </div>
                              <div className="message-content">
                                <span className="username text-xs font-black text-slate-800">
                                  VibeOS Bot <span className="app-badge">APP</span> <span className="timestamp text-[9px] text-slate-400">10:42 AM</span>
                                </span>
                                <p className="text-xs text-slate-600 mt-1">Hey team! Time for your bi-weekly pulse check-in. Anonymity is 100% active.</p>
                                
                                <div className="slack-card mt-3 bg-white border border-slate-200 border-l-4 border-purple-500 rounded-r-xl p-3 shadow-sm">
                                  <h5 className="text-xs font-extrabold text-slate-800">Q: My weekly meeting load is manageable.</h5>
                                  
                                  <div className="emoji-reaction-row flex gap-2 mt-3">
                                    {[
                                      { emoji: "😫", text: "Too heavy" },
                                      { emoji: "😐", text: "Manageable" },
                                      { emoji: "😊", text: "Just right" }
                                    ].map((item) => (
                                      <button
                                        key={item.text}
                                        className={`emoji-reaction-pill ${selectedHeroEmoji === item.emoji ? "active" : ""}`}
                                        onClick={() => setSelectedHeroEmoji(item.emoji)}
                                      >
                                        <span className="emoji">{item.emoji}</span>
                                        <span className="lbl text-[10px]">{item.text}</span>
                                        <span className="count text-[9px] ml-1">
                                          {selectedHeroEmoji === item.emoji ? 1 : 0}
                                        </span>
                                      </button>
                                    ))}
                                  </div>

                                  {selectedHeroEmoji && (
                                    <div className="confirmation-badge mt-3 text-[10px] text-emerald-600 font-bold bg-emerald-50 p-2 rounded-lg border border-emerald-100 flex items-center gap-1">
                                      <Check size={12} />
                                      <span>Response submitted anonymously: &quot;{selectedHeroEmoji}&quot;</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {heroTab === "teams" && (
                      <motion.div
                        key="teams"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="hero-tab-view teams-view-container"
                      >
                        {/* Teams Sidebar */}
                        <div className="teams-sidebar">
                          {/* Rail (Activity, Chat, etc.) */}
                          <div className="teams-sidebar__rail">
                            <div className="rail-item"><Activity size={16} /><span>Activity</span></div>
                            <div className="rail-item active"><MessageSquare size={16} /><span>Chat</span></div>
                            <div className="rail-item"><Users size={16} /><span>Teams</span></div>
                          </div>
                          
                          {/* Chat List */}
                          <div className="teams-sidebar__chats">
                            <div className="chat-hdr">Recent</div>
                            <div className="chat-list-item active">
                              <div className="chat-avatar bg-blue-600 text-white text-[10px] font-black flex items-center justify-center rounded-full w-6 h-6">T</div>
                              <div className="chat-text">
                                <span className="name">VibeOS Bot</span>
                                <span className="sub text-[8px] opacity-70">Goal Enablement...</span>
                              </div>
                            </div>
                            <div className="chat-list-item">
                              <div className="chat-avatar bg-slate-200 text-slate-700 text-[10px] font-black flex items-center justify-center rounded-full w-6 h-6">JD</div>
                              <div className="chat-text">
                                <span className="name">John Doe</span>
                                <span className="sub text-[8px] opacity-70">Meeting at 2?</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Teams Chat Area */}
                        <div className="teams-chat-area">
                          <div className="teams-chat-header flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="chat-avatar bg-blue-600 text-white text-[10px] font-black flex items-center justify-center rounded-full w-6 h-6">T</div>
                              <span className="title text-xs font-bold text-slate-800">VibeOS Enablement Pulse</span>
                            </div>
                            <span className="active-dot bg-emerald-500 w-2 h-2 rounded-full" />
                          </div>
                          
                          <div className="teams-chat-body">
                            <div className="message flex gap-3">
                              <div className="bot-avatar bg-blue-600 text-white font-extrabold text-xs flex items-center justify-center rounded-lg w-8 h-8 shrink-0">
                                T
                              </div>
                              <div className="message-content flex-1">
                                <span className="username text-xs font-black text-slate-800">
                                  VibeOS Enablement Pulse <span className="timestamp text-[9px] text-slate-400">10:42 AM</span>
                                </span>
                                
                                <div className="teams-pulse-card mt-3 bg-white border border-slate-200 border-l-4 border-blue-600 rounded-r-xl p-4 shadow-sm">
                                  <h5 className="text-xs font-extrabold text-slate-800">Q: I have the resources and tools to complete my goals.</h5>
                                  
                                  <div className="teams-scale flex justify-between gap-1.5 mt-4">
                                    {[1, 2, 3, 4, 5].map((n) => (
                                      <button
                                        key={n}
                                        className={`teams-scale-btn ${selectedHeroScale === n ? "active" : ""}`}
                                        onClick={() => setSelectedHeroScale(n)}
                                      >
                                        {n}
                                      </button>
                                    ))}
                                  </div>
                                  <div className="teams-scale-labels flex justify-between text-[9px] text-slate-400 mt-2 font-bold">
                                    <span>Strongly Disagree</span>
                                    <span>Strongly Agree</span>
                                  </div>

                                  {selectedHeroScale && (
                                    <div className="confirmation-badge mt-4 text-[10px] text-emerald-600 font-bold bg-emerald-50 p-2.5 rounded-lg border border-emerald-100 flex items-center gap-1">
                                      <Check size={12} />
                                      <span>Response recorded anonymously. Thank you!</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Customer Logo Trust Strip */}
        <div className="ps-hero__logos">
          <div className="container">
            <span className="logos-title">TRUSTED BY 6,000+ COMPANIES WORLDWIDE</span>
            <div className="logos-grid">
              <div className="logo-item"><span>Miro</span></div>
              <div className="logo-item"><span>Steve Madden</span></div>
              <div className="logo-item"><span>ZS Associates</span></div>
              <div className="logo-item"><span>LendingTree</span></div>
              <div className="logo-item"><span>Canva</span></div>
              <div className="logo-item"><span>Bolt</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          2. PROBLEM SECTION (THE CONTRAST)
          ========================================== */}
      <section className="ps-problem" ref={problemRef}>
        <div className="ps-problem__container">
          <div className="problem-split-grid">
            
            {/* Sticky Left Sidebar Header */}
            <div className={`problem-sticky-header ${problemRevealed ? "reveal-active" : ""}`}>
              <span className="section-kicker flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                The Contrast
              </span>
              <h2 className="section-title">Annual surveys can&apos;t keep up with a <span>changing workforce</span></h2>
              <p className="section-desc">
                Organizations often rely on infrequent employee surveys, making it difficult to understand how workplace changes impact engagement, productivity, and retention in real time.
              </p>
            </div>

            {/* Right Card Grid */}
            <div className="problem-cards-column">
              {problemCards.map((card, idx) => (
                <div 
                  key={idx} 
                  className={`problem-card problem-card--split problem-card--${card.color} ${problemRevealed ? "reveal-active" : ""}`}
                  style={{ transitionDelay: `${idx * 0.1}s` }}
                >
                  <div className="problem-card__icon">
                    {card.icon}
                  </div>
                  <div className="problem-card__text">
                    <h3 className="problem-card__title">{card.title}</h3>
                    <p className="problem-card__desc">{card.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ==========================================
          3. CORE CAPABILITIES BENTO MATRIX
          ========================================== */}
      <section className="ps-bento" id="capabilities" ref={capabilitiesRef}>
        <div className="container">
          <div className={`ps-section-header ${capabilitiesRevealed ? "reveal-active" : ""}`}>
            <span className="section-kicker">Core Capabilities</span>
            <h2 className="section-title">Redesigning feedback with <span>Pulse Intelligence</span></h2>
            <p className="section-desc">
              Three robust columns engineered to capture sentiment, comparison metrics, and event dynamics in real time.
            </p>
          </div>

          <div className="ps-bento-grid">
            {/* Card 1: Reduce regrettable attrition */}
            <div className={`bento-card bento-card--attrition ${capabilitiesRevealed ? "reveal-active" : ""}`}>
              <div className="bento-card__content">
                <div className="pillar-icon icon-rose">
                  <AlertCircle size={20} />
                </div>
                <h3>Reduce regrettable attrition across your workforce</h3>
                <p>By combining moment-in-time pulse surveys with deeper engagement insights, you can understand why your best employees are leaving – and stop it before it’s too late.</p>

                {/* Attrition Simulator Widget */}
                <div className="simulator-widget mt-6">
                  <span className="sim-badge text-rose-500">ATTRITION WARNER</span>
                  <div className="cohort-selectors flex gap-1.5 mt-3">
                    {["sales", "marketing", "cs"].map((cohort) => (
                      <button
                        key={cohort}
                        className={`cohort-pill cohort-pill--${cohort} ${activeCohort === cohort ? "active" : ""}`}
                        onClick={() => setActiveCohort(cohort as any)}
                      >
                        {cohort === "sales" ? "Sales (6-12m)" : cohort === "marketing" ? "Marketing (1-2y)" : "CS Team"}
                      </button>
                    ))}
                  </div>

                  <div className="cohort-display-card mt-3">
                    <div className="display-header flex justify-between items-center">
                      <span className="label">Risk Index:</span>
                      <span className={`risk-tag font-bold ${getCohortData(activeCohort).colorClass}`}>
                        {getCohortData(activeCohort).risk}
                      </span>
                    </div>

                    <div className="display-drivers mt-3">
                      <span className="driver-title">Key Exit Drivers:</span>
                      <div className="drivers-list flex flex-col gap-2 mt-2">
                        {getCohortData(activeCohort).drivers.map((driver, i) => {
                          const match = driver.match(/(.*)\s*\((\d+%)\)/);
                          const name = match ? match[1] : driver;
                          const percent = match ? match[2] : "50%";
                          return (
                            <div key={i} className="driver-progress-row">
                              <div className="driver-info flex justify-between text-[10.5px] font-bold text-slate-700">
                                <span>{name}</span>
                                <span className="text-slate-900">{percent}</span>
                              </div>
                              <div className="driver-bar-track mt-1 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div 
                                  className={`driver-bar-fill h-full rounded-full transition-all duration-500 ${
                                    activeCohort === "sales" ? "bg-rose-500" : activeCohort === "marketing" ? "bg-amber-500" : "bg-emerald-500"
                                  }`} 
                                  style={{ width: percent }} 
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="display-playbook mt-3 pt-3 border-t border-slate-100">
                      <span className="playbook-title">Stay Playbook:</span>
                      <p className="playbook-desc text-xs mt-1 text-purple-600 font-bold">
                        {getCohortData(activeCohort).playbook}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Share & contextualize results */}
            <div className={`bento-card bento-card--benchmarks ${capabilitiesRevealed ? "reveal-active" : ""}`} style={{ transitionDelay: "0.15s" }}>
              <div className="bento-card__content">
                <div className="pillar-icon icon-blue">
                  <BarChart3 size={20} />
                </div>
                <h3>Easily share and contextualize results</h3>
                <p>Drive meaningful change among leadership and management teams with transparent, intuitive reports that automatically put your survey results into context with built-in benchmarks.</p>

                {/* Benchmark Comparator Widget */}
                <div className="simulator-widget mt-6">
                  <span className="sim-badge text-blue-500">BENCHMARK COMPARATOR</span>
                  <div className="benchmark-selectors flex gap-1.5 mt-3">
                    {["tech", "finance", "prof"].map((bench) => (
                      <button
                        key={bench}
                        className={`benchmark-pill ${activeBenchmark === bench ? "active" : ""}`}
                        onClick={() => setActiveBenchmark(bench as any)}
                      >
                        {bench === "tech" ? "Tech" : bench === "finance" ? "Finance" : "Prof Services"}
                      </button>
                    ))}
                  </div>

                  <div className="benchmark-display-card mt-3">
                    <div className="graph-comparison flex flex-col gap-3">
                      <div className="graph-row">
                        <div className="row-info flex justify-between text-xs font-bold text-slate-700">
                          <span>Our Pulse Score</span>
                          <span>81%</span>
                        </div>
                        <div className="row-bar-track mt-1"><div className="row-bar-fill bg-purple-600" style={{ width: "81%" }} /></div>
                      </div>

                      <div className="graph-row">
                        <div className="row-info flex justify-between text-xs font-bold text-slate-500">
                          <span>{activeBenchmark === "tech" ? "Tech Average" : activeBenchmark === "finance" ? "Finance Average" : "Prof Services Average"}</span>
                          <span>{getBenchmarkOffset(activeBenchmark).score}%</span>
                        </div>
                        <div className="row-bar-track mt-1"><div className="row-bar-fill bg-slate-300" style={{ width: `${getBenchmarkOffset(activeBenchmark).score}%` }} /></div>
                      </div>
                    </div>

                    <div className="benchmark-comparison-badge mt-4 flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                      <span className="text-[11px] text-slate-500">Offset Indicator</span>
                      <strong className={`text-xs font-bold ${getBenchmarkOffset(activeBenchmark).isPositive ? "text-emerald-600" : "text-rose-600"}`}>
                        {getBenchmarkOffset(activeBenchmark).offset}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Improve engagement and culture */}
            <div className={`bento-card bento-card--engagement ${capabilitiesRevealed ? "reveal-active" : ""}`} style={{ transitionDelay: "0.3s" }}>
              <div className="bento-card__content">
                <div className="pillar-icon icon-purple">
                  <Activity size={20} />
                </div>
                <h3>Improve engagement and company culture</h3>
                <p>Identify how organizational changes impact the employee experience, what motivates and engages your employees, and what drives them away.</p>

                {/* Change Timeline Monitor Widget */}
                <div className="simulator-widget mt-6">
                  <span className="sim-badge text-purple-500">CHANGE TIMELINE MONITOR</span>
                  
                  <div className="event-timeline-nodes flex justify-between items-center relative mt-4">
                    <div className="timeline-line-bg absolute left-3 right-3 h-1 bg-slate-200 rounded">
                      <div 
                        className="timeline-line-fill h-full bg-purple-600 rounded transition-all duration-300"
                        style={{ width: activeEvent === "tools" ? "0%" : activeEvent === "leadership" ? "50%" : "100%" }}
                      />
                    </div>
                    {["tools", "leadership", "migration"].map((evt) => (
                      <button
                        key={evt}
                        className={`timeline-node-dot relative flex items-center justify-center ${activeEvent === evt ? "active" : ""}`}
                        onClick={() => setActiveEvent(evt as any)}
                      >
                        <span className="dot-circle" />
                        <span className="dot-label text-[9px] font-bold text-slate-400 absolute top-6 whitespace-nowrap">
                          {evt === "tools" ? "Wk 1" : evt === "leadership" ? "Wk 3" : "Wk 5"}
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="event-display-card mt-6">
                    <div className="event-header flex justify-between items-center">
                      <h5 className="event-title text-xs font-bold text-slate-800">
                        {getEventData(activeEvent).title}
                      </h5>
                      <span className="event-date text-[10px] text-slate-400 font-bold">
                        {getEventData(activeEvent).date}
                      </span>
                    </div>

                    <div className="event-impact-row mt-3 flex items-center gap-3">
                      <div className="score-compare flex items-center gap-1.5 text-xs text-slate-500">
                        <span>{getEventData(activeEvent).before}</span>
                        <span>➔</span>
                        <strong className="text-slate-800">{getEventData(activeEvent).after}</strong>
                      </div>
                      <span className={`impact-badge text-[10px] font-extrabold px-2 py-0.5 rounded ${getEventData(activeEvent).color}`}>
                        {getEventData(activeEvent).diff}
                      </span>
                    </div>

                    <p className="event-desc text-xs mt-2 text-slate-600 leading-relaxed">
                      {getEventData(activeEvent).desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          4. INTERACTIVE ROI CALCULATOR SECTION (NEW)
          ========================================== */}
      <section className="ps-roi" ref={roiRef}>
        <div className="container">
          <div className="roi-card-wrapper">
            <div className={`roi-card-left ${roiRevealed ? "reveal-active" : ""}`}>
              <span className="section-kicker">Interactive Utility</span>
              <h2 className="section-title">Calculate the value of <span>Pulse listening</span></h2>
              <p className="section-desc">
                Adjust your organization headcount slider to estimate hours saved and predicted retention optimization outcomes using VibeOS.
              </p>

              <div className="headcount-slider-wrap mt-8">
                <div className="slider-header flex justify-between items-center mb-3">
                  <span className="lbl text-sm font-bold text-slate-700">Organization Headcount:</span>
                  <strong className="headcount-display text-xl text-purple-600">{headcount} Employees</strong>
                </div>
                <input 
                  type="range" 
                  min="50" 
                  max="10000" 
                  step="50"
                  value={headcount} 
                  onChange={(e) => setHeadcount(parseInt(e.target.value))}
                  className="headcount-slider w-full"
                />
              </div>
            </div>

            <div className={`roi-card-right ${roiRevealed ? "reveal-active" : ""}`}>
              <div className="roi-metrics-grid">
                <div className="roi-m-card">
                  <span className="m-title">Hours Saved Monthly</span>
                  <strong className="m-val text-purple-600">{(headcount * 0.15).toFixed(0)} hrs</strong>
                  <p className="m-desc">Saved on survey setup and automated reports compile.</p>
                </div>
                <div className="roi-m-card">
                  <span className="m-title">Operational Value</span>
                  <strong className="m-val text-blue-600">${(headcount * 0.15 * 55).toLocaleString(undefined, {maximumFractionDigits: 0})}</strong>
                  <p className="m-desc">Based on an average admin rate of $55/hr.</p>
                </div>
                <div className="roi-m-card">
                  <span className="m-title">Attrition Optimized</span>
                  <strong className="m-val text-emerald-600">+{Math.max(1, Math.round(headcount * 0.02))} Employees</strong>
                  <p className="m-desc">Retained yearly through proactive warnings.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          5. HOW IT WORKS SECTION
          ========================================== */}
      <section className="ps-how" ref={howRef}>
        <div className="ps-how__container">
          <div className={`ps-section-header ${howRevealed ? "reveal-active" : ""}`}>
            <span className="section-kicker">Flow</span>
            <h2 className="section-title">Continuous listening <span>made simple</span></h2>
          </div>

          <div className={`ps-how__timeline-wrapper ${howRevealed ? "reveal-active" : ""}`}>
            <div className="ps-how__split-container">
              {/* Left Column: Dynamic Graphic Canvas */}
              <div className="ps-how__visual-pane">
                <AnimatePresence mode="wait">
                  {activeStep === 0 && (
                    <motion.div
                      key="step-0"
                      initial={{ opacity: 0, scale: 0.96, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="visual-step-card"
                    >
                      <div className="flex flex-col gap-2">
                        <span className="step-preview-badge text-purple-600 bg-purple-50">Pulse Survey Builder</span>
                        <h4 className="text-sm font-bold text-slate-800 mt-1">Configure Workload Check-in</h4>
                        <p className="text-[11px] text-slate-500">Pick from science-backed templates or write custom questions in seconds.</p>
                        
                        <div className="sim-builder flex flex-col gap-2 mt-4">
                          <div className="row bg-slate-50 p-2.5 rounded-xl border border-slate-200/50 flex items-center justify-between shadow-sm">
                            <span className="text-[11px] font-bold text-slate-800">1. My weekly meeting load is manageable.</span>
                            <span className="text-[9px] text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full font-bold">1-5 Scale</span>
                          </div>
                          <div className="row bg-slate-50 p-2.5 rounded-xl border border-slate-200/50 flex items-center justify-between shadow-sm">
                            <span className="text-[11px] font-bold text-slate-800">2. Did you get adequate rest this weekend?</span>
                            <span className="text-[9px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full font-bold">Yes/No</span>
                          </div>
                        </div>
                      </div>
                      <button className="w-full bg-slate-900 text-white rounded-xl py-2.5 text-xs font-bold hover:bg-purple-600 transition-colors shadow-sm mt-6">
                        Publish Pulse Loop
                      </button>
                    </motion.div>
                  )}

                  {activeStep === 1 && (
                    <motion.div
                      key="step-1"
                      initial={{ opacity: 0, scale: 0.96, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="visual-step-card"
                    >
                      <div className="flex flex-col gap-2">
                        <span className="step-preview-badge text-blue-600 bg-blue-50">Slack & Teams Check-ins</span>
                        <h4 className="text-sm font-bold text-slate-800 mt-1">Frictionless Feedback Gathering</h4>
                        <p className="text-[11px] text-slate-500">Meet employees where they work with automated messaging bots.</p>

                        <div className="slack-balloon bg-slate-50 p-3.5 rounded-xl border border-slate-200/60 mt-4 flex gap-3 shadow-sm">
                          <div className="bot-avatar bg-purple-600 text-white font-extrabold text-[10px] flex items-center justify-center rounded-lg w-7 h-7 shrink-0">V</div>
                          <div className="msg flex-1 min-w-0">
                            <span className="name text-xs font-black text-slate-800 flex items-center gap-1.5">
                              VibeOS Bot <span className="text-[8px] bg-slate-200 px-1 py-0.5 rounded font-black text-slate-500 uppercase">App</span>
                            </span>
                            <p className="text-[10px] text-slate-600 mt-1 leading-relaxed">My weekly meeting load is manageable.</p>
                            <div className="flex gap-1.5 mt-2.5">
                              <span className="px-2 py-1 bg-white border border-slate-200 rounded text-[10px] cursor-default">😫 0</span>
                              <span className="px-2 py-1 bg-white border border-slate-200 rounded text-[10px] cursor-default">😐 0</span>
                              <span className="px-2 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded text-[10px] font-bold cursor-default">😊 1</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="participation-tracker bg-white p-3 rounded-xl border border-slate-200/50 shadow-sm mt-4">
                        <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-1">
                          <span>Live Participation Rate</span>
                          <span className="text-purple-600 font-extrabold">87%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 w-[87%] rounded-full" />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeStep === 2 && (
                    <motion.div
                      key="step-2"
                      initial={{ opacity: 0, scale: 0.96, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="visual-step-card"
                    >
                      <div className="flex flex-col gap-2">
                        <span className="step-preview-badge text-rose-600 bg-rose-50">Real-time Sentiment Insights</span>
                        <h4 className="text-sm font-bold text-slate-800 mt-1">Track Sentiment Trends</h4>
                        <p className="text-[11px] text-slate-500">Track department sentiment shifts and trigger flight risk alerts.</p>

                        <div className="graph-card bg-slate-50 p-3 rounded-xl border border-slate-200/60 mt-4 flex flex-col gap-2 shadow-sm">
                          <div className="flex justify-between items-center text-[10px] font-bold text-slate-700">
                            <span>Marketing Cohort</span>
                            <span className="text-rose-600 font-bold bg-rose-50 border border-rose-100 px-1.5 py-0.5 rounded">Wellbeing Dip Alert</span>
                          </div>
                          <svg viewBox="0 0 300 70" className="w-full h-14 mt-1 overflow-visible">
                            <path d="M 0 50 Q 60 20 120 45 T 240 10 T 300 50 L 300 70 L 0 70 Z" fill="rgba(239, 68, 68, 0.05)" />
                            <path d="M 0 50 Q 60 20 120 45 T 240 10 T 300 50" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
                            <circle cx="240" cy="10" r="3" fill="#ef4444" />
                            <circle cx="240" cy="10" r="7" fill="#ef4444" fillOpacity="0.2" className="animate-pulse" />
                          </svg>
                        </div>
                      </div>

                      <div className="flex gap-2 justify-between mt-4">
                        <div className="stat bg-white p-2 rounded-xl border border-slate-200/50 shadow-sm flex-1 text-center">
                          <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Score</span>
                          <strong className="block text-slate-800 text-xs mt-0.5">68%</strong>
                        </div>
                        <div className="stat bg-white p-2 rounded-xl border border-slate-200/50 shadow-sm flex-1 text-center">
                          <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Exit Risk</span>
                          <strong className="block text-rose-500 text-xs mt-0.5 font-black">High</strong>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeStep === 3 && (
                    <motion.div
                      key="step-3"
                      initial={{ opacity: 0, scale: 0.96, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="visual-step-card"
                    >
                      <div className="flex flex-col gap-2">
                        <span className="step-preview-badge text-emerald-600 bg-emerald-50">Action Plan Deployer</span>
                        <h4 className="text-sm font-bold text-slate-800 mt-1">Suggested Actions</h4>
                        <p className="text-[11px] text-slate-500">Equip department managers with targeted playbooks and templates.</p>

                        <div className="checklist-card bg-slate-50 p-3.5 rounded-xl border border-slate-200/60 mt-4 flex flex-col gap-2.5 shadow-sm">
                          <div className="flex items-center gap-2 text-[11px] text-slate-700 font-bold">
                            <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                            <span>Conduct 1-on-1 workload balancing check-ins</span>
                          </div>
                          <div className="flex items-center gap-2 text-[11px] text-slate-700 font-bold">
                            <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                            <span>Prune sprint meeting load in Google Calendar</span>
                          </div>
                          <div className="flex items-center gap-2 text-[11px] text-slate-400 font-bold">
                            <div className="w-3.5 h-3.5 rounded-full border border-slate-300 shrink-0" />
                            <span>Initiate career mapping workshop</span>
                          </div>
                        </div>
                      </div>

                      <button className="w-full bg-emerald-600 text-white rounded-xl py-2.5 text-xs font-bold hover:bg-emerald-700 transition-colors shadow-sm mt-4 flex items-center justify-center gap-1.5">
                        <Zap size={13} />
                        <span>Deploy Playbook Action</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Right Column: Steps Stepper List */}
              <div className="ps-how__steps-list">
                {steps.map((step, idx) => {
                  const active = idx === activeStep;
                  return (
                    <div 
                      key={idx} 
                      className={`how-step-card ${active ? "active" : ""}`}
                      onMouseEnter={() => setActiveStep(idx)}
                      onClick={() => setActiveStep(idx)}
                    >
                      <div className="step-card-kicker">
                        <div className="step-card-num">{step.step}</div>
                        <span className="step-card-badge">{step.badge}</span>
                      </div>
                      <h3 className="step-card-title">{step.title}</h3>
                      <p className="step-card-desc">{step.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          6. SLEEK DARK COCKPIT SHOWCASE SECTION
          ========================================== */}
      <section className="ps-showcase" id="visual" ref={tourRef}>
        <div className="ps-showcase__bg">
          <div className="showcase-glow" />
        </div>

        <div className="ps-showcase__container">
          <div className={`ps-section-header ${tourRevealed ? "reveal-active" : ""}`}>
            <span className="section-kicker">Platform Tour</span>
            <h2 className="section-title">Everything you need to <span>understand employee sentiment</span></h2>
          </div>

          <div className={`ps-showcase__grid-wrap ${tourRevealed ? "reveal-active" : ""}`}>
            {/* Left Control Tabs (Vertical Layout) */}
            <div className="showcase-tour-tabs">
              {[
                { id: "builder", label: "Pulse Survey Builder", desc: "Science-backed template builder", icon: <MessageSquare size={18} /> },
                { id: "nlp", label: "NLP Sentiment Analytics", desc: "Category comment classification", icon: <Cpu size={18} /> },
                { id: "playbook", label: "Action Playbooks", desc: "Guided manager task checklists", icon: <Target size={18} /> },
                { id: "change", label: "Change Tracking", desc: "Event sentiment timeline mapping", icon: <Activity size={18} /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  className={`tour-tab-btn ${activeTourTab === tab.id ? "active" : ""}`}
                  onClick={() => setActiveTourTab(tab.id as any)}
                >
                  <div className="btn-icon-wrap">{tab.icon}</div>
                  <div className="btn-text">
                    <span className="lbl font-bold">{tab.label}</span>
                    <span className="sub">{tab.desc}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Right Display Panel */}
            <div className="showcase-tour-display">
              <div className="display-window bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
                <div className="window-header border-b border-slate-800 px-4 py-3 flex items-center justify-between">
                  <div className="dots flex gap-1.5"><span /><span /><span /></div>
                  <span className="window-address text-[10px] text-slate-500 font-mono">vibeos.com/platform/pulse/{activeTourTab}</span>
                </div>

                <div className="window-body-wrap p-6 min-h-[300px] flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    {activeTourTab === "builder" && (
                      <motion.div
                        key="builder"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.25 }}
                        className="tour-preview w-full"
                      >
                        <div className="flex flex-col gap-3">
                          <span className="preview-lbl text-[10px] text-purple-400 font-bold uppercase tracking-wider">Drag & Drop Builder</span>
                          <h4 className="text-sm font-bold text-white">Create Workload Check-in</h4>
                          <div className="sim-builder-rows flex flex-col gap-2 mt-2">
                            <div className="builder-row bg-slate-800/60 border border-slate-700/60 p-2.5 rounded-lg text-xs text-slate-300 flex justify-between items-center">
                              <span>1. Q: My weekly meeting load is manageable.</span>
                              <span className="text-[10px] text-slate-500 font-bold">Scale (1-5)</span>
                            </div>
                            <div className="builder-row bg-slate-800/60 border border-slate-700/60 p-2.5 rounded-lg text-xs text-slate-300 flex justify-between items-center">
                              <span>2. Q: Did you get adequate rest this weekend?</span>
                              <span className="text-[10px] text-slate-500 font-bold">Yes/No</span>
                            </div>
                          </div>
                          <button className="add-question-btn mt-2 border border-dashed border-slate-700 hover:border-purple-500 text-[11px] text-slate-400 hover:text-purple-400 py-2 rounded-lg transition-colors font-bold">
                            + Add Custom Question
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {activeTourTab === "nlp" && (
                      <motion.div
                        key="nlp"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.25 }}
                        className="tour-preview w-full"
                      >
                        <div className="flex flex-col gap-3">
                          <span className="preview-lbl text-[10px] text-purple-400 font-bold uppercase tracking-wider">NLP Sentiment Word Bubble</span>
                          <h4 className="text-sm font-bold text-white">NLP Category Frequency Mapping</h4>
                          <div className="nlp-categories flex flex-wrap gap-2 mt-2">
                            <span className="nlp-tag bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs px-2.5 py-1 rounded-full font-bold">burnout (42 mentions)</span>
                            <span className="nlp-tag bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-2.5 py-1 rounded-full font-bold">alignment (28 mentions)</span>
                            <span className="nlp-tag bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs px-2.5 py-1 rounded-full font-bold">career goals (15 mentions)</span>
                            <span className="nlp-tag bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs px-2.5 py-1 rounded-full font-bold">tools feedback (8 mentions)</span>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {activeTourTab === "playbook" && (
                      <motion.div
                        key="playbook"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.25 }}
                        className="tour-preview w-full"
                      >
                        <div className="flex flex-col gap-3">
                          <span className="preview-lbl text-[10px] text-purple-400 font-bold uppercase tracking-wider">Stay Playbook Taskboard</span>
                          <h4 className="text-sm font-bold text-white">Suggested manager actions: Wellbeing drop</h4>
                          <div className="playbook-checklist flex flex-col gap-2.5 mt-2">
                            <div className="check-row flex items-center gap-2 text-xs text-slate-300">
                              <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                              <span>Conduct 1-on-1 workload balancing check-ins</span>
                            </div>
                            <div className="check-row flex items-center gap-2 text-xs text-slate-300">
                              <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                              <span>Deploy calendar audits to prune Sprint meetings</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {activeTourTab === "change" && (
                      <motion.div
                        key="change"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.25 }}
                        className="tour-preview w-full"
                      >
                        <div className="flex flex-col gap-3">
                          <span className="preview-lbl text-[10px] text-purple-400 font-bold uppercase tracking-wider">Event Timeline Mapping</span>
                          <h4 className="text-sm font-bold text-white">Sentiment response: Office Migration</h4>
                          <div className="metric-bars flex gap-4 mt-3">
                            <div className="bar-col flex-1 text-center bg-slate-800/40 p-2 rounded-lg border border-slate-700/40">
                              <span className="lbl text-[9px] text-slate-500">Before Migration</span>
                              <strong className="val block text-rose-400 text-lg">70% Score</strong>
                            </div>
                            <div className="bar-col flex-1 text-center bg-slate-800/40 p-2 rounded-lg border border-slate-700/40">
                              <span className="lbl text-[9px] text-slate-500">Post Migration</span>
                              <strong className="val block text-emerald-400 text-lg">84% Score</strong>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          7. INTERACTIVE INTEGRATIONS GRID SECTION (NEW)
          ========================================== */}
      <section className="ps-integrations" ref={integrationsRef}>
        <div className="container">
          <div className={`ps-section-header ${integrationsRevealed ? "reveal-active" : ""}`}>
            <span className="section-kicker">Ecosystem Sync</span>
            <h2 className="section-title">Seamlessly sync with your <span>workplace directories</span></h2>
            <p className="section-desc">
              Toggle connections to see how VibeOS coordinates directory updates and triggers surveys via HRIS platforms and messaging bots.
            </p>
          </div>

          <div className="integrations-toggles-grid">
            {[
              { id: "slack", label: "Slack Integration", desc: "Automate bi-weekly survey checks directly inside custom channels.", logo: "S" },
              { id: "teams", label: "Microsoft Teams", desc: "Deliver quick 1-5 scales using Teams bot prompts.", logo: "T" },
              { id: "workday", label: "Workday HRIS", desc: "Sync user list, department codes, and tenure milestones.", logo: "W" },
              { id: "bamboohr", label: "BambooHR Sync", desc: "Retrieve active team changes and exit indicators.", logo: "B" }
            ].map((service) => {
              const active = (integrations as any)[service.id];
              return (
                <div 
                  key={service.id} 
                  className={`integration-card ${active ? "active" : ""} ${integrationsRevealed ? "reveal-active" : ""}`}
                  onClick={() => handleToggleIntegration(service.id as any)}
                >
                  <div className="card-top flex justify-between items-start">
                    <div className="logo-badge flex items-center justify-center font-black text-white bg-slate-800 rounded-lg w-10 h-10">
                      {service.logo}
                    </div>
                    <span className={`status-badge text-[9px] font-bold px-2 py-0.5 rounded-full ${active ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-400"}`}>
                      {active ? "Connected" : "Disconnected"}
                    </span>
                  </div>

                  <h3 className="card-title text-sm font-extrabold text-slate-800 mt-4">{service.label}</h3>
                  <p className="card-desc text-xs text-slate-500 mt-2">{service.desc}</p>

                  <div className="toggle-trigger mt-4 flex justify-end">
                    {active ? (
                      <ToggleRight size={24} className="text-purple-600" />
                    ) : (
                      <ToggleLeft size={24} className="text-slate-300" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==========================================
          8. FAQ SECTION (Accordion)
          ========================================== */}
      <section className="ps-faq" ref={faqRef}>
        <div className="ps-faq__container">
          <div className={`ps-section-header ${faqRevealed ? "reveal-active" : ""}`}>
            <span className="section-kicker">FAQ</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>

          <div className={`ps-faq__list ${faqRevealed ? "reveal-active" : ""}`}>
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx}
                  className={`faq-accordion-item ${isOpen ? "active" : ""}`}
                  onClick={() => toggleFaq(idx)}
                >
                  <div className="faq-question">
                    <span>{faq.q}</span>
                    <ChevronDown size={18} className="faq-arrow" />
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
          9. FINAL CTA SECTION (MESH THEME WITH TESTIMONIALS SLIDER)
          ========================================== */}
      <section className="ps-cta" ref={ctaRef}>
        <div className="ps-cta__mesh" />
        <div className="ps-cta__circle circle-1" />
        <div className="ps-cta__circle circle-2" />

        <div className={`ps-cta__container ${ctaRevealed ? "reveal-active" : ""}`}>
          <h2 className="ps-cta__title">Stay connected to your workforce every day</h2>
          <p className="ps-cta__desc">
            Move beyond annual surveys and start understanding employee experiences in real time. Use pulse surveys to improve engagement, reduce turnover, and make confident people decisions.
          </p>

          <div className="ps-cta__buttons">
            <button onClick={() => setDemoModalOpen(true)} className="ps-btn ps-btn--white">Book a Demo</button>
            <a href="#expert" className="ps-btn ps-btn--outline">Talk To An Expert</a>
          </div>

          {/* Testimonial Slider Box */}
          <div className="ps-cta__testimonial mt-8 relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeQuote}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="testimonial-slide flex flex-col items-center"
              >
                <Quote size={18} className="quote-icon text-purple-400 mb-3" />
                <p className="quote-text text-sm text-slate-300 italic text-center max-w-md">
                  &quot;{testimonials[activeQuote].quote}&quot;
                </p>
                <div className="author flex flex-col items-center mt-4">
                  <strong className="text-white text-xs">{testimonials[activeQuote].author}</strong>
                  <span className="text-[10px] text-slate-400 font-bold">{testimonials[activeQuote].role}</span>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="slide-dots flex gap-1.5 mt-4 justify-center">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`dot-pill ${activeQuote === i ? "active" : ""}`}
                  onClick={() => setActiveQuote(i)}
                />
              ))}
            </div>
          </div>

          {/* Success badges */}
          <div className="ps-cta__badges">
            <span className="badge-item">🏆 Leader Summer 2026</span>
            <span className="badge-item">⭐ 4.9/5 on G2</span>
            <span className="badge-item">🔒 SOC2 Certified</span>
          </div>
        </div>
      </section>
    </div>
  );
}
