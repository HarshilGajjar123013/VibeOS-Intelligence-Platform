"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Play,
  Check,
  ChevronDown,
  Users,
  MessageSquare,
  Zap,
  TrendingUp,
  Shield,
  EyeOff,
  Target,
  Brain,
  Sparkles,
  Heart,
  Send,
  ClipboardList,
  Activity,
  Layers,
  FileText,
  Clock,
  CheckCircle,
  ThumbsUp,
  ThumbsDown,
  ArrowUpRight,
  Bookmark,
  Award,
  ChevronLeft,
  ChevronRight,
  Mail,
  UserCheck,
  Building,
  Lock,
  RefreshCw,
  BarChart2,
  Calendar
} from "lucide-react";
import "./ReadyToUse.scss";

/* ──────────────────────────────────────────────
   Scroll Reveal Hook
   ────────────────────────────────────────────── */
function useScrollReveal(threshold = 0.12) {
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
   Animated Counter Hook
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
   Data Definitions
   ────────────────────────────────────────────── */
const TEMPLATE_TYPES = [
  {
    id: "engagement",
    label: "Engagement Surveys",
    templatesCount: 12,
    title: "Diagnose overall workplace health",
    desc: "Understand employee commitment, motivation, and strategy alignment with scientifically validated indexes.",
    sampleQuestion: "How happy are you with the current direction of the company?",
    inputType: "scale",
    metricLabel: "Alignment Index",
    metricVal: "91%",
    color: "#7e53ff"
  },
  {
    id: "lifecycle",
    label: "Lifecycle Surveys",
    templatesCount: 8,
    title: "Transition touchpoints (Onboarding & Exit)",
    desc: "Collect feedback during critical milestones (Day 30, Day 90, exit check-ins) to predict and prevent early attrition.",
    sampleQuestion: "Did you receive adequate training and resources during your first 30 days?",
    inputType: "options",
    options: ["Yes, fully", "Partially", "No, not at all"],
    metricLabel: "Enablement Rate",
    metricVal: "87%",
    color: "#3b82f6"
  },
  {
    id: "pulse",
    label: "Pulse Surveys",
    templatesCount: 14,
    title: "Quick, event-based checks",
    desc: "Lightweight, single-topic check-ins to track team workload, sentiment during changes, or immediate project retrospectives.",
    sampleQuestion: "How manageable has your team's workload been over the past two weeks?",
    inputType: "emojis",
    metricLabel: "Wellbeing Index",
    metricVal: "82%",
    color: "#ef4444"
  },
  {
    id: "dei",
    label: "DEI & Inclusion",
    templatesCount: 6,
    title: "Demographics & psychological safety",
    desc: "Track psychological safety, sense of belonging, and equity using scientist-backed filters to build an inclusive organization.",
    sampleQuestion: "I feel comfortable sharing a dissenting opinion with my immediate team members.",
    inputType: "scale",
    metricLabel: "Belonging Index",
    metricVal: "89%",
    color: "#10b981"
  }
];

const PERSONAS = [
  {
    id: "hr",
    label: "HR Teams",
    title: "Predict turnover & lead with confidence",
    desc: "Equip HR departments with continuous feedback signals to map risk patterns and justify strategic policy recommendations.",
    badge: "Risk Diagnostics",
    list: [
      "Real-time retention risk heatmap indicators.",
      "Anonymized comment category groupings.",
      "Instant HRIS directory synchronizations."
    ],
    color: "#7e53ff"
  },
  {
    id: "leader",
    label: "Leaders",
    title: "Track macro sentiment trends",
    desc: "Build a strong, evidence-based business case for cultural shifts and track progress against global industry benchmarks.",
    badge: "Executive Dashboard",
    list: [
      "Industry comparison benchmark charts.",
      "Cross-department score variance views.",
      "Macro alignment tracking metrics."
    ],
    color: "#3b82f6"
  },
  {
    id: "manager",
    label: "Managers",
    title: "Take preventative actions",
    desc: "Help team managers support their people with localized insights, guided playbooks, and structured meeting check-ins.",
    badge: "Coaching Playbooks",
    list: [
      "Automatic workload alerts and notifications.",
      "Suggested 1-on-1 meeting templates.",
      "Team-level action tracking logs."
    ],
    color: "#10b981"
  }
];

const TESTIMONIALS = [
  {
    quote: "Having access to a holistic, analytical approach allowed us to make decisions that have had the greatest impact over the past three years.",
    author: "Sahra Kaboli-Nejad",
    role: "Head of DEI and Social Impact at On",
    avatarText: "SK",
    avatarBg: "#e0f2fe",
    avatarColor: "#0369a1"
  },
  {
    quote: "Working with VibeOS has enabled us to achieve our aim of elevating our employee listening. We now have a continuous listening and action loop. This has allowed us to empower our managers with data and show a tangible, quick response to what our people have told us is important.",
    author: "Christian Gisy",
    role: "CEO",
    avatarText: "CG",
    avatarBg: "#f0fdf4",
    avatarColor: "#15803d"
  },
  {
    quote: "Data is vital when we're pushing for policy changes. The insights we gathered through VibeOS have been key in shaping our decisions and actions.",
    author: "John Ferguson",
    role: "Chief Human Resources Officer",
    avatarText: "JF",
    avatarBg: "#fef3c7",
    avatarColor: "#b45309"
  }
];

export default function ReadyToUse() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Interactive States
  const [activeShowcase, setActiveShowcase] = useState("engagement");
  const [activePersona, setActivePersona] = useState("hr");
  const [activeQuote, setActiveQuote] = useState(0);

  // Interaction logs (to halt auto rotation)
  const [userShowcaseInteracted, setUserShowcaseInteracted] = useState(false);
  const [userPersonaInteracted, setUserPersonaInteracted] = useState(false);
  const [userQuoteInteracted, setUserQuoteInteracted] = useState(false);

  // Scale state for showcase questions
  const [selectedScale, setSelectedScale] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);

  // Hero Sandbox Simulator states
  const [sandboxCategory, setSandboxCategory] = useState<"engagement" | "lifecycle" | "pulse">("engagement");
  const [sandboxScore, setSandboxScore] = useState<number | null>(null);
  const [simulatedData, setSimulatedData] = useState([2, 5, 12, 38, 43]); // Percentages for score 1-5

  // Bento timeline interactive state
  const [activeMilestone, setActiveMilestone] = useState("onboarding");

  // Bento AI Interactive tag state
  const [activeAiTag, setActiveAiTag] = useState("Motivated");
  const [aiSummaryText, setAiSummaryText] = useState("Employees show high alignment with strategic initiatives, driving high task completion rates.");

  // Form states
  const [emailInput, setEmailInput] = useState("");
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle");

  // Scroll reveal refs
  const [heroRef, heroRevealed] = useScrollReveal();
  const [pillarsRef, pillarsRevealed] = useScrollReveal();
  const [showcaseRef, showcaseRevealed] = useScrollReveal();
  const [statsRef, statsRevealed] = useScrollReveal();
  const [personaRef, personaRevealed] = useScrollReveal();
  const [testimonialRef, testimonialRevealed] = useScrollReveal();
  const [faqRef, faqRevealed] = useScrollReveal();
  const [ctaRef, ctaRevealed] = useScrollReveal();

  // Counters
  const countParticipation = useCounter(90, statsRevealed, 2000, "%");
  const countHoursSaved = useCounter(20, statsRevealed, 2000, "+ hrs");
  const countCustomerNps = useCounter(48, statsRevealed, 2000, "%");

  // Reset showcase inputs on tab change
  useEffect(() => {
    setSelectedScale(null);
    setSelectedOption(null);
    setSelectedEmoji(null);
  }, [activeShowcase]);

  // Handle Hero Sandbox click
  const handleSandboxScoreClick = (score: number) => {
    setSandboxScore(score);
    // Dynamically adjust bar graph distribution based on user select
    const newData = [3, 4, 10, 25, 58];
    if (score === 1) {
      newData[0] = 55; newData[4] = 10;
    } else if (score === 2) {
      newData[1] = 48; newData[4] = 15;
    } else if (score === 3) {
      newData[2] = 45;
    } else if (score === 4) {
      newData[3] = 52;
    } else {
      newData[4] = 68;
    }
    setSimulatedData(newData);
  };

  // Reset Sandbox data on category change
  useEffect(() => {
    setSandboxScore(null);
    if (sandboxCategory === "engagement") {
      setSimulatedData([2, 5, 12, 38, 43]);
    } else if (sandboxCategory === "lifecycle") {
      setSimulatedData([5, 15, 20, 40, 20]);
    } else {
      setSimulatedData([10, 8, 22, 30, 30]);
    }
  }, [sandboxCategory]);

  // Handle bento tag select
  const handleAiTagSelect = (tag: string) => {
    setActiveAiTag(tag);
    if (tag === "Motivated") {
      setAiSummaryText("Employees show high alignment with strategic initiatives, driving high task completion rates.");
    } else if (tag === "Unclear Goals") {
      setAiSummaryText("Sentiment tags suggest uncertainty around team priorities. Suggested action: Goal planning templates.");
    } else if (tag === "Overworked") {
      setAiSummaryText("Pulse reviews indicate spikes in workload pressure. AI recommendation: Schedule project cooldown sessions.");
    } else {
      setAiSummaryText("Belonging markers have risen by 8% following recent psychological safety workshops.");
    }
  };

  // Auto-rotating Showcase
  useEffect(() => {
    if (userShowcaseInteracted) return;
    const interval = setInterval(() => {
      setActiveShowcase((prev) => {
        const idx = TEMPLATE_TYPES.findIndex((t) => t.id === prev);
        const next = (idx + 1) % TEMPLATE_TYPES.length;
        return TEMPLATE_TYPES[next].id;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [userShowcaseInteracted]);

  // Auto-rotating Persona
  useEffect(() => {
    if (userPersonaInteracted) return;
    const interval = setInterval(() => {
      setActivePersona((prev) => {
        const idx = PERSONAS.findIndex((p) => p.id === prev);
        const next = (idx + 1) % PERSONAS.length;
        return PERSONAS[next].id;
      });
    }, 5500);
    return () => clearInterval(interval);
  }, [userPersonaInteracted]);

  // Auto-rotating Testimonials
  useEffect(() => {
    if (userQuoteInteracted) return;
    const interval = setInterval(() => {
      setActiveQuote((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
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

  const getSentimentScores = (tag: string) => {
    switch (tag) {
      case "Motivated":
        return { positive: 88, neutral: 10, negative: 2 };
      case "Unclear Goals":
        return { positive: 15, neutral: 35, negative: 50 };
      case "Overworked":
        return { positive: 10, neutral: 30, negative: 60 };
      case "Inclusion":
        return { positive: 75, neutral: 20, negative: 5 };
      default:
        return { positive: 50, neutral: 30, negative: 20 };
    }
  };

  const currentShowcase = TEMPLATE_TYPES.find((t) => t.id === activeShowcase) || TEMPLATE_TYPES[0];
  const currentPersona = PERSONAS.find((p) => p.id === activePersona) || PERSONAS[0];

  const faqs = [
    {
      q: "What types of employee surveys can we create?",
      a: "You can create engagement surveys, pulse surveys, onboarding surveys, exit surveys, 360-degree feedback, manager effectiveness surveys, DEI surveys, and fully custom surveys with our drag-and-drop builder."
    },
    {
      q: "Can survey templates be customized?",
      a: "Absolutely. Every template is fully customizable — modify questions, add logic branching, change scales, adjust branding, and tailor content to match your organization's specific needs."
    },
    {
      q: "How is employee anonymity protected?",
      a: "We use enterprise-grade anonymization with minimum response thresholds, data aggregation, and encrypted identifiers. Employees can provide honest feedback knowing their identity is fully protected."
    },
    {
      q: "How often should surveys be conducted?",
      a: "We recommend quarterly comprehensive surveys combined with monthly pulse checks. Our platform provides scheduling tools and best-practice recommendations for optimal survey cadence."
    },
    {
      q: "Can managers access team-level insights?",
      a: "Yes. Managers get dedicated dashboards with team-level analytics, trend reports, and AI-generated action recommendations — while maintaining individual anonymity standards."
    },
    {
      q: "Does the platform integrate with HR systems?",
      a: "We integrate with all major HRIS platforms including Workday, BambooHR, SAP SuccessFactors, ADP, and more. We also support SSO, Slack, and Microsoft Teams notifications."
    }
  ];

  return (
    <div className="rtu-page">
      {/* 1. COSMIC SANDBOX HERO SECTION */}
      <section className="rtu-hero" ref={heroRef}>
        <div className="rtu-hero__bg-shapes">
          <div className="shape shape--1" />
          <div className="shape shape--2" />
        </div>

        <div className="rtu-hero__container">
          <div className={`rtu-hero__content ${heroRevealed ? "reveal-active" : ""}`}>
            <span className="rtu-hero__badge">
              <Sparkles size={12} />
              VibeOS Survey Platform
            </span>

            <h1 className="rtu-hero__title">
              Survey Intelligence: <span>Built for modern teams</span>
            </h1>
            <h2>Understand what matters most to your workforce with research-backed diagnostics</h2>

            <p className="rtu-hero__desc">
              Deploy science-backed survey templates covering engagement, lifecycle milestones, pulses, and psychological safety. Custom-designed for teams that lead with culture.
            </p>

            <div className="rtu-hero__cta-group">
              <a href="#demo" className="rtu-btn rtu-btn--primary">
                Book a Demo
                <ArrowRight size={16} />
              </a>
              <a href="#sandbox" className="rtu-btn rtu-btn--secondary">
                <Play size={14} />
                Try Sandbox Simulator
              </a>
            </div>

            <div className="rtu-hero__trust">
              <span className="trust-label">TRUSTED BY 6,000+ HIGH-PERFORMING COMPANIES</span>
              <div className="trust-row">
                {["Miro", "Steve Madden", "ZS Associates", "LendingTree", "Canva"].map((name) => (
                  <span key={name} className="trust-logo">{name}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Hero Survey Builder Sandbox */}
          <div id="sandbox" className={`rtu-hero__visual ${heroRevealed ? "reveal-active" : ""}`}>
            <div className="hero-survey-card">
              <div className="card-top">
                <ClipboardList size={18} className="text-purple" />
                <div className="sandbox-tab-selectors">
                  <button
                    className={`sandbox-tab-pill ${sandboxCategory === "engagement" ? "active" : ""}`}
                    onClick={() => setSandboxCategory("engagement")}
                  >
                    Engagement
                  </button>
                  <button
                    className={`sandbox-tab-pill ${sandboxCategory === "lifecycle" ? "active" : ""}`}
                    onClick={() => setSandboxCategory("lifecycle")}
                  >
                    Lifecycle
                  </button>
                  <button
                    className={`sandbox-tab-pill ${sandboxCategory === "pulse" ? "active" : ""}`}
                    onClick={() => setSandboxCategory("pulse")}
                  >
                    Pulse
                  </button>
                </div>
                <span className="pulse-tag">SANDBOX</span>
              </div>

              <div className="card-question">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={sandboxCategory}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {sandboxCategory === "engagement" && (
                      <h4>I feel empowered to execute on our team goals.</h4>
                    )}
                    {sandboxCategory === "lifecycle" && (
                      <h4>My onboarding experience made me feel welcome and equipped.</h4>
                    )}
                    {sandboxCategory === "pulse" && (
                      <h4>My team's workload has been manageable this sprint.</h4>
                    )}
                  </motion.div>
                </AnimatePresence>

                <div className="question-scale">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      className={`scale-btn ${sandboxScore === n ? "selected" : ""}`}
                      onClick={() => handleSandboxScoreClick(n)}
                    >
                      {n}
                    </button>
                  ))}
                </div>
                <div className="scale-labels">
                  <span>Strongly Disagree</span>
                  <span>Strongly Agree</span>
                </div>
              </div>

              {/* Dynamic simulated data visualization feedback */}
              <div className="card-stats">
                <div className="sandbox-stat-header">
                  <span>Simulated Sentiment Trend</span>
                  <strong>{sandboxScore ? `Your Input: ${sandboxScore}/5` : "Click scale to test"}</strong>
                </div>
                <div className="simulated-bar-chart">
                  {simulatedData.map((val, idx) => (
                    <div key={idx} className="chart-bar-column">
                      <div className="bar-track">
                        <motion.div
                          className="bar-fill"
                          initial={{ height: 0 }}
                          animate={{ height: `${val}%` }}
                          transition={{ type: "spring", stiffness: 100 }}
                          style={{
                            backgroundColor: idx === 4 ? "#10b981" : idx === 3 ? "#7e53ff" : idx === 2 ? "#3b82f6" : "#ef4444"
                          }}
                        />
                      </div>
                      <span className="bar-label">{idx + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="floating-bubble bubble-1">
              <Activity size={14} className="text-blue" />
              <span>40+ Science Templates</span>
            </div>
            <div className="floating-bubble bubble-2">
              <CheckCircle size={14} className="text-emerald" />
              <span>90% Participation</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE BENTO GRID MATRIX */}
      <section className="rtu-pillars" id="templates" ref={pillarsRef}>
        <div className="container">
          <div className={`rtu-section-header text-center ${pillarsRevealed ? "reveal-active" : ""}`}>
            <h2>Explore our Survey Capability Bento Matrix</h2>
            <p>
              Get deeper insights into the employee experience with customizable survey tools covering timelines, integrations, and predictive analytics.
            </p>
          </div>

          <div className="rtu-bento-grid">
            {/* Card 1: AI Sentiment Engine */}
            <div className={`bento-card bento-card--large ${pillarsRevealed ? "reveal-active" : ""}`}>
              <div className="bento-card__content">
                <div className="pillar-icon icon-purple">
                  <Brain size={20} />
                </div>
                <h3>Predictive Sentiment Engine</h3>
                <p>Categorize open comments automatically with semantic indexing to extract immediate action plans.</p>

                {/* Interactive Sentiment simulator */}
                <div className="interactive-comment-tags">
                  {["Motivated", "Unclear Goals", "Overworked", "Inclusion"].map((tag) => (
                    <button
                      key={tag}
                      className={`comment-tag-pill ${activeAiTag === tag ? "active" : ""}`}
                      onClick={() => handleAiTagSelect(tag)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
                <div className="ai-sentiment-summary-box">
                  <span className="badge">AI ANALYSIS SUMMARY</span>
                  <p>{aiSummaryText}</p>
                </div>

                <div className="ai-sentiment-visualization">
                  <div className="vis-header">
                    <span>Sentiment Breakdown</span>
                    <span className="live-badge">LIVE INSIGHTS</span>
                  </div>
                  <div className="vis-bars">
                    {/* Positive Row */}
                    <div className="vis-row">
                      <div className="vis-info">
                        <span className="label">Positive Sentiment</span>
                        <span className="percent text-emerald">{getSentimentScores(activeAiTag).positive}%</span>
                      </div>
                      <div className="vis-bar-track">
                        <motion.div
                          className="vis-bar-fill fill-emerald"
                          initial={{ width: 0 }}
                          animate={{ width: `${getSentimentScores(activeAiTag).positive}%` }}
                          transition={{ type: "spring", stiffness: 80 }}
                        />
                      </div>
                    </div>
                    {/* Neutral Row */}
                    <div className="vis-row">
                      <div className="vis-info">
                        <span className="label">Neutral Sentiment</span>
                        <span className="percent text-amber">{getSentimentScores(activeAiTag).neutral}%</span>
                      </div>
                      <div className="vis-bar-track">
                        <motion.div
                          className="vis-bar-fill fill-amber"
                          initial={{ width: 0 }}
                          animate={{ width: `${getSentimentScores(activeAiTag).neutral}%` }}
                          transition={{ type: "spring", stiffness: 80 }}
                        />
                      </div>
                    </div>
                    {/* Negative Row */}
                    <div className="vis-row">
                      <div className="vis-info">
                        <span className="label">Negative Sentiment</span>
                        <span className="percent text-red">{getSentimentScores(activeAiTag).negative}%</span>
                      </div>
                      <div className="vis-bar-track">
                        <motion.div
                          className="vis-bar-fill fill-red"
                          initial={{ width: 0 }}
                          animate={{ width: `${getSentimentScores(activeAiTag).negative}%` }}
                          transition={{ type: "spring", stiffness: 80 }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Milestone Timeline */}
            <div className={`bento-card bento-card--medium ${pillarsRevealed ? "reveal-active" : ""}`}>
              <div className="bento-card__content">
                <div className="pillar-icon icon-blue">
                  <Clock size={20} />
                </div>
                <h3>Lifecycle Touchpoint Timeline</h3>
                <p>Collect feedback during critical career milestones to track onboarding success and exit signals.</p>

                {/* Interactive timeline clicks */}
                <div className="interactive-timeline-flow">
                  {["onboarding", "day30", "exit"].map((stage) => (
                    <button
                      key={stage}
                      className={`timeline-node ${activeMilestone === stage ? "active" : ""}`}
                      onClick={() => setActiveMilestone(stage)}
                    >
                      <span className="node-ring" />
                      <span className="node-lbl">{stage === "onboarding" ? "Hire" : stage === "day30" ? "Day 30" : "Exit"}</span>
                    </button>
                  ))}
                </div>
                <div className="timeline-stage-narrative">
                  {activeMilestone === "onboarding" && (
                    <span><strong>Day 1 Diagnostic:</strong> Identifies administrative blocks and cultural alignment metrics.</span>
                  )}
                  {activeMilestone === "day30" && (
                    <span><strong>Day 30 Alignment check:</strong> Measures team training progress and manager enablement scores.</span>
                  )}
                  {activeMilestone === "exit" && (
                    <span><strong>Exit Diagnostic:</strong> Analyzes push/pull reasons to map strategic retention signals.</span>
                  )}
                </div>
              </div>
            </div>

            {/* Card 3: Privacy Shield */}
            <div className={`bento-card bento-card--small ${pillarsRevealed ? "reveal-active" : ""}`}>
              <div className="bento-card__content text-center flex-center">
                <div className="pillar-icon icon-emerald margin-center">
                  <Shield size={20} />
                </div>
                <h3>Enterprise Anonymity Shield</h3>
                <p>Encrypted identifiers and minimum threshold configurations protect employee privacy.</p>
                <div className="anonymity-visual-shield">
                  <Lock className="shield-lock-icon" size={24} />
                  <span className="threshold-indicator">MIN THRESHOLD: 5</span>
                </div>
              </div>
            </div>

            {/* Card 4: HRIS Auto-Sync */}
            <div className={`bento-card bento-card--small ${pillarsRevealed ? "reveal-active" : ""}`}>
              <div className="bento-card__content text-center flex-center">
                <div className="pillar-icon icon-purple margin-center">
                  <RefreshCw size={20} />
                </div>
                <h3>HRIS & Communication Sync</h3>
                <p>Sync directories and distribute surveys via Workday, Slack, BambooHR, or Microsoft Teams.</p>
                <div className="hris-sync-logos">
                  <div className="sync-logo">W</div>
                  <div className="sync-logo">S</div>
                  <div className="sync-logo">T</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE SURVEY STUDIO */}
      <section className="rtu-showcase" ref={showcaseRef}>
        <div className="container">
          <div className={`rtu-section-header text-center ${showcaseRevealed ? "reveal-active" : ""}`}>
            <h2>Explore our survey templates workspace</h2>
            <p>
              Click through the tabs below to test-drive sample templates and preview the diagnostics and questions.
            </p>
          </div>

          <div className="showcase-workspace">
            {/* Left selector */}
            <div className="showcase-tabs">
              {TEMPLATE_TYPES.map((t) => (
                <button
                  key={t.id}
                  className={`showcase-tab-btn showcase-tab-btn--${t.id} ${activeShowcase === t.id ? "active" : ""}`}
                  onClick={() => {
                    setActiveShowcase(t.id);
                    setUserShowcaseInteracted(true);
                  }}
                >
                  <span className="dot" style={{ backgroundColor: activeShowcase === t.id ? t.color : "transparent" }} />
                  <span className="label">{t.label}</span>
                  <span className="count-badge">{t.templatesCount} templates</span>
                </button>
              ))}
            </div>

            {/* Right Simulator Viewport */}
            <div className={`showcase-viewport ${showcaseRevealed ? "reveal-active" : ""}`}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeShowcase}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className={`workspace-panel workspace-panel--${activeShowcase}`}
                >
                  <div className="panel-header">
                    <div className="panel-info">
                      <span className="kicker" style={{ color: currentShowcase.color }}>{currentShowcase.title}</span>
                      <p className="desc">{currentShowcase.desc}</p>
                    </div>
                  </div>

                  <div className="panel-simulator">
                    <div className="simulator-card">
                      <div className="sim-header">
                        <span className="sim-badge" style={{ borderColor: currentShowcase.color, color: currentShowcase.color }}>
                          SIMULATOR
                        </span>
                        <span className="sim-title">Live Preview</span>
                      </div>

                      <div className="sim-body">
                        <h4>{currentShowcase.sampleQuestion}</h4>

                        {/* Interactive Scales */}
                        {currentShowcase.inputType === "scale" && (
                          <div className="scale-wrap">
                            <div className="scale-row">
                              {[1, 2, 3, 4, 5].map((n) => (
                                <button
                                  key={n}
                                  className={`scale-num ${selectedScale === n ? "active" : ""}`}
                                  onClick={() => setSelectedScale(n)}
                                >
                                  {n}
                                </button>
                              ))}
                            </div>
                            <div className="scale-labels">
                              <span>Strongly Disagree</span>
                              <span>Strongly Agree</span>
                            </div>
                          </div>
                        )}

                        {/* Interactive Options */}
                        {currentShowcase.inputType === "options" && (
                          <div className="options-wrap">
                            {currentShowcase.options?.map((opt) => (
                              <button
                                key={opt}
                                className={`option-btn ${selectedOption === opt ? "active" : ""}`}
                                onClick={() => setSelectedOption(opt)}
                              >
                                <span className="radio" />
                                <span>{opt}</span>
                              </button>
                            ))}
                          </div>
                        )}

                        {/* Interactive Emojis */}
                        {currentShowcase.inputType === "emojis" && (
                          <div className="emojis-wrap">
                            {[
                              { emoji: "😫", text: "Overwhelmed" },
                              { emoji: "😐", text: "Manageable" },
                              { emoji: "😊", text: "Just Right" },
                              { emoji: "🥱", text: "Too Light" }
                            ].map((item) => (
                              <button
                                key={item.text}
                                className={`emoji-btn ${selectedEmoji === item.emoji ? "active" : ""}`}
                                onClick={() => setSelectedEmoji(item.emoji)}
                              >
                                <span className="icon">{item.emoji}</span>
                                <span className="lbl">{item.text}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="sim-footer">
                        <div className="metric-box">
                          <span className="lbl">Target Outcome</span>
                          <div className="metric-value-wrap">
                            <strong style={{ color: currentShowcase.color }}>{currentShowcase.metricVal}</strong>
                            <span>{currentShowcase.metricLabel}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* 4. STATISTICS / IMPACT SECTION */}
      <section className="rtu-stats" ref={statsRef}>
        <div className="container">
          <div className={`rtu-section-header text-center ${statsRevealed ? "reveal-active" : ""}`}>
            <h2>The impact of VibeOS’s employee survey tools</h2>
            <p>Organizations deploying our diagnostic surveys drive significant, measurable improvements in culture and performance.</p>
          </div>

          <div className="rtu-stats-grid">
            {/* Stat Card 1 */}
            <div className={`stat-card stat-card--purple ${statsRevealed ? "reveal-active" : ""}`}>
              <div className="card-visual">
                <svg className="mini-radial-chart" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" className="radial-bg" />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="radial-fill"
                    strokeDasharray="251.2"
                    style={{ strokeDashoffset: statsRevealed ? 251.2 - (251.2 * 90) / 100 : 251.2 }}
                  />
                </svg>
              </div>
              <div className="stat-number">{countParticipation}</div>
              <h3>Participation Rate</h3>
              <p>Initial employee engagement survey participation rate average across departments.</p>
            </div>

            {/* Stat Card 2 */}
            <div className={`stat-card stat-card--blue ${statsRevealed ? "reveal-active" : ""}`}>
              <div className="card-visual">
                <div className="time-savings-widget">
                  <Clock className="clock-icon animate-pulse" />
                  <div className="savings-hours">20+ hrs</div>
                </div>
              </div>
              <div className="stat-number">{countHoursSaved}</div>
              <h3>Hours Saved per Month</h3>
              <p>Saved on survey distribution, directory synching, and automated executive reporting.</p>
            </div>

            {/* Stat Card 3 */}
            <div className={`stat-card stat-card--emerald ${statsRevealed ? "reveal-active" : ""}`}>
              <div className="card-visual">
                <svg className="mini-line-chart" viewBox="0 0 140 60">
                  <path d="M 0,50 Q 35,45 70,25 T 140,5" fill="none" stroke="#10b981" strokeWidth="3" className="stat-line" />
                  <circle cx="140" cy="5" r="4" fill="#10b981" className="stat-point" />
                </svg>
              </div>
              <div className="stat-number">+{countCustomerNps}</div>
              <h3>Higher Customer NPS</h3>
              <p>Strong correlation between high employee alignment surveys and end-customer NPS satisfaction.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ORGANIZATIONAL PERSONAS SWITCHER */}
      <section className="rtu-personas" ref={personaRef}>
        <div className="container">
          <div className={`rtu-section-header text-center ${personaRevealed ? "reveal-active" : ""}`}>
            <h2>Employee retention software that works across your entire organization</h2>
            <p>VibeOS delivers targeted diagnostics and playbooks customized for every leadership layer.</p>
          </div>

          <div className="personas-workspace">
            {/* Left control panel */}
            <div className={`persona-tabs ${personaRevealed ? "reveal-active" : ""}`}>
              {PERSONAS.map((p) => (
                <button
                  key={p.id}
                  className={`persona-tab-btn persona-tab-btn--${p.id} ${activePersona === p.id ? "active" : ""}`}
                  onClick={() => {
                    setActivePersona(p.id);
                    setUserPersonaInteracted(true);
                  }}
                >
                  <h4>{p.label}</h4>
                  <p>{p.title}</p>
                </button>
              ))}
            </div>

            {/* Right Dashboard Mockup Viewport */}
            <div className={`persona-viewport ${personaRevealed ? "reveal-active" : ""}`}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePersona}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className={`persona-panel persona-panel--${activePersona}`}
                >
                  <div className="panel-header">
                    <span className="panel-badge" style={{ backgroundColor: `${currentPersona.color}15`, color: currentPersona.color }}>
                      {currentPersona.badge}
                    </span>
                    <h3>{currentPersona.title}</h3>
                    <p>{currentPersona.desc}</p>
                  </div>

                  <div className="panel-mockup">
                    <div className="mock-window">
                      <div className="mock-header">
                        <div className="dots"><span /><span /><span /></div>
                        <span className="address">vibeos.com/platform/analytics</span>
                      </div>
                      <div className="mock-body">
                        {/* Custom visual lists according to role */}
                        {currentPersona.id === "hr" && (
                          <div className="hr-list-view">
                            <div className="mock-stat-bar">
                              <span className="lbl">Turnover Risk Detection Rate</span>
                              <strong className="text-purple">94%</strong>
                            </div>
                            <ul className="mock-checks">
                              {currentPersona.list.map((item, i) => (
                                <li key={i} className="check-item">
                                  <Check className="text-purple" size={14} />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {currentPersona.id === "leader" && (
                          <div className="leader-list-view">
                            <div className="mock-stat-bar">
                              <span className="lbl">Benchmark Comparators</span>
                              <strong className="text-blue">Tech Industry Top 10%</strong>
                            </div>
                            <ul className="mock-checks">
                              {currentPersona.list.map((item, i) => (
                                <li key={i} className="check-item">
                                  <Check className="text-blue" size={14} />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {currentPersona.id === "manager" && (
                          <div className="manager-list-view">
                            <div className="mock-stat-bar">
                              <span className="lbl">Action Playbook Completion</span>
                              <strong className="text-emerald">88%</strong>
                            </div>
                            <ul className="mock-checks">
                              {currentPersona.list.map((item, i) => (
                                <li key={i} className="check-item">
                                  <Check className="text-emerald" size={14} />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CLIENT TESTIMONIALS SLIDER */}
      <section className="rtu-testimonials" ref={testimonialRef}>
        <div className="container">
          <div className="testimonial-wrapper">
            <div className="carousel-control">
              <button
                className="carousel-arrow"
                onClick={() => {
                  setActiveQuote((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
                  setUserQuoteInteracted(true);
                }}
              >
                <ChevronLeft size={20} />
              </button>
              <button
                className="carousel-arrow"
                onClick={() => {
                  setActiveQuote((prev) => (prev + 1) % TESTIMONIALS.length);
                  setUserQuoteInteracted(true);
                }}
              >
                <ChevronRight size={20} />
              </button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeQuote}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="testimonial-panel"
              >
                <div className="quote-mark">“</div>
                <p className="quote-text">{TESTIMONIALS[activeQuote].quote}</p>
                <div className="quote-meta">
                  <div
                    className="quote-avatar"
                    style={{
                      backgroundColor: TESTIMONIALS[activeQuote].avatarBg,
                      color: TESTIMONIALS[activeQuote].avatarColor
                    }}
                  >
                    {TESTIMONIALS[activeQuote].avatarText}
                  </div>
                  <div className="quote-author-info">
                    <strong>{TESTIMONIALS[activeQuote].author}</strong>
                    <span>{TESTIMONIALS[activeQuote].role}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 7. PLATFORM ECOSYSTEM SECTION */}
      <section className="rtu-ecosystem">
        <div className="container">
          <div className="rtu-section-header text-center">
            <h2>Explore our full platform</h2>
            <p>Seamlessly link diagnostic findings to actionable talent management, goal alignment, and growth modules.</p>
          </div>

          <div className="ecosystem-grid">
            <div className="eco-card eco-card--engage">
              <div className="eco-icon"><Activity size={18} /></div>
              <h3>Engage</h3>
              <p>Gain real-time employee engagement diagnostics to reduce risk and retain your top talent.</p>
              <a href="/platform/vibe-index-matrix" className="eco-link">Learn about Engage →</a>
            </div>

            <div className="eco-card eco-card--perform">
              <div className="eco-icon"><Target size={18} /></div>
              <h3>Perform</h3>
              <p>Empower team leaders and managers with guided goals and performance alignment logs.</p>
              <a href="/platform/vibe-index-matrix" className="eco-link">Learn about Perform →</a>
            </div>

            <div className="eco-card eco-card--develop">
              <div className="eco-icon"><Award size={18} /></div>
              <h3>Develop</h3>
              <p>Promote cross-functional growth pathways backed by organization performance insights.</p>
              <a href="/platform/vibe-index-matrix" className="eco-link">Learn about Develop →</a>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQ SECTION */}
      <section className="rtu-faq" ref={faqRef}>
        <div className="container">
          <div className={`rtu-faq__header text-center ${faqRevealed ? "reveal-active" : ""}`}>
            <h2>Frequently Asked Questions</h2>
          </div>

          <div className={`rtu-faq__list ${faqRevealed ? "reveal-active" : ""}`}>
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className={`faq-item ${isOpen ? "active" : ""}`}
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                >
                  <div className="faq-question">
                    <span>{faq.q}</span>
                    <ChevronDown size={18} className="faq-chevron" />
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

      {/* 9. FINAL CTA SECTION */}
      <section className="rtu-cta" ref={ctaRef}>
        <div className="rtu-cta__mesh" />
        <div className="rtu-cta__orb orb-1" />
        <div className="rtu-cta__orb orb-2" />

        <div className={`rtu-cta__container ${ctaRevealed ? "reveal-active" : ""}`} id="demo">
          <h2 className="rtu-cta__title">
            Invest in your people and create impact
          </h2>
          <p className="rtu-cta__desc">
            Use scientist-backed surveys, customizable templates, and real-time insights to build a workplace where employees thrive.
          </p>

          <form className="rtu-cta__form" onSubmit={handleCtaSubmit}>
            <div className="input-group">
              <Mail className="input-icon" />
              <input
                type="email"
                placeholder="Enter corporate email..."
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="cta-input"
                required
              />
              <button type="submit" className="cta-submit-btn">
                Book A Demo
              </button>
            </div>

            <AnimatePresence>
              {formStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="form-message msg-success"
                >
                  <CheckCircle size={14} /> Demo request registered. Our representative will contact you shortly.
                </motion.div>
              )}
              {formStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="form-message msg-error"
                >
                  <Shield size={14} /> Please enter a valid corporate email.
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </section>
    </div>
  );
}
