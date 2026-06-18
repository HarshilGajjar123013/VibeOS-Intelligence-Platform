"use client";

import React, { useState, useEffect } from "react";
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
  Globe,
  Award,
  Layers,
  MapPin,
  HelpCircle,
  TrendingDown,
  Quote,
  Share2
} from "lucide-react";
import "./Benchmarking.scss";
import { useProtoStore } from "@/src/store/useProtoStore";

// --- Framer Motion Animation Variants ---
const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// --- Custom Animated Counter ---
const Counter: React.FC<{ target: number; suffix?: string; duration?: number; decimals?: number }> = ({ 
  target, 
  suffix = "", 
  duration = 1.5,
  decimals = 0
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const currentValue = progress * target;
      setCount(currentValue);
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };
    requestAnimationFrame(animate);
  }, [target, duration]);

  return <span>{count.toFixed(decimals)}{suffix}</span>;
};

export default function Benchmarking() {
  const setDemoModalOpen = useProtoStore((state) => state.setDemoModalOpen);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [activeShowcase, setActiveShowcase] = useState(0);
  const [outcomeTab, setOutcomeTab] = useState<"raw" | "benchmark">("benchmark");

  // Auto-cycle showcase features
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveShowcase((prev) => (prev + 1) % 6);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  const problemCards = [
    {
      title: "No Industry Context",
      desc: "Leaders cannot determine if team engagement scores represent strengths, weaknesses, or general sector standards.",
      icon: <Globe size={22} />,
      color: "purple"
    },
    {
      title: "Hidden Performance Gaps",
      desc: "Critical workforce friction points remain completely unnoticed without external benchmarking norms.",
      icon: <Eye size={22} />,
      color: "blue"
    },
    {
      title: "Difficult Prioritization",
      desc: "HR teams struggle to identify which culture gaps require immediate capital and management resources.",
      icon: <Layers size={22} />,
      color: "rose"
    },
    {
      title: "Reactive Decision Making",
      desc: "Organizations act on internal assumptions and lag indicators instead of proactive industry metrics.",
      icon: <AlertCircle size={22} />,
      color: "amber"
    }
  ];

  const steps = [
    {
      step: "01",
      title: "Collect Employee Data",
      desc: "Gather workforce engagement, lifecycle, and sentiment signals securely through surveys and demographic parameters.",
      badge: "Ingestion System",
      visual: "collect"
    },
    {
      step: "02",
      title: "Compare Against Benchmarks",
      desc: "Match team scores instantly against peer groups segmented by sector, company size, geography, and location.",
      badge: "Target Filter",
      visual: "compare"
    },
    {
      step: "03",
      title: "Identify Gaps & Deltas",
      desc: "Trace exactly where your organization outperforms competitors and where targeted culture corrections are needed.",
      badge: "Offset Analytics",
      visual: "identify"
    },
    {
      step: "04",
      title: "Take Strategic Action",
      desc: "Deploy AI priority playbooks, schedule checks, and verify improvement offsets in quarterly pulse loops.",
      badge: "Interventions",
      visual: "action"
    }
  ];

  const kpis = [
    { label: "Higher Employee Engagement", value: 14, suffix: "%", desc: "Average increase in active survey score percentiles.", color: "purple" },
    { label: "Better Workforce Retention", value: 22, suffix: "%", desc: "Voluntary turnover reduction by addressing workload gaps early.", color: "blue" },
    { label: "Stronger Leadership Decisions", value: 90, suffix: "%", desc: "Of managers report higher confidence in talent priority plans.", color: "emerald" },
    { label: "Improved Team Performance", value: 18, suffix: "%", desc: "Increase in project execution speeds due to cultural alignment.", color: "rose" },
    { label: "More Effective HR Strategies", value: 3, suffix: " wks", desc: "Saved per survey loop in research and report assembly labor.", color: "amber" },
    { label: "Data-Driven Org Growth", value: 94, suffix: "%", desc: "Of executives report higher alignment on cultural budgets.", color: "cyan" }
  ];

  const showcaseModules = [
    {
      id: 0,
      label: "Industry Benchmarks",
      title: "Global Peer Cohort Comparison",
      desc: "Compare your culture scores against industry averages. Understand how your company stacks up against tech, healthcare, finance, or retail standards.",
      bullets: [
        "Interactive percentile ranking trackers",
        "Benchmark filters by company size and funding stage",
        "Monthly updates reflecting active feedback streams"
      ],
      icon: <Globe size={18} />
    },
    {
      id: 1,
      label: "Regional Benchmarks",
      title: "Geographic Workforce Comparison",
      desc: "Isolate sentiment trends by region. Learn if communication fatigue is an isolated EMEA issue or a global pattern.",
      bullets: [
        "Interactive regional comparison heatmaps",
        "Geographic filter panels (APAC, EMEA, AMER)",
        "Compliance checks matching localized workspace cultures"
      ],
      icon: <MapPin size={18} />
    },
    {
      id: 2,
      label: "Team Comparison Analytics",
      title: "Internal Department Benchmarking",
      desc: "Compare team performance indexes internally. Benchmark engineering against sales, product, or customer operations.",
      bullets: [
        "Internal team offset dashboards",
        "Cross-department sentiment correlation charts",
        "Manager performance benchmarks against organizational norms"
      ],
      icon: <Layers size={18} />
    },
    {
      id: 3,
      label: "Engagement Benchmarking",
      title: "Historical Percentile Trend lines",
      desc: "Track how your engagement score percentiles change over time. Measure your progression against industry competitors.",
      bullets: [
        "Quarterly percentile trend graphs",
        "Historical delta tracking dashboards",
        "Predictive curves mapping future benchmark changes"
      ],
      icon: <TrendingUp size={18} />
    },
    {
      id: 4,
      label: "Workforce Insights Dashboard",
      title: "Comprehensive Organizational Health Index",
      desc: "Consolidate all benchmarks into one high-level view. Review psychological safety, compensation, and tools averages simultaneously.",
      bullets: [
        "Organizational health dashboard meters",
        "Key dimension summaries comparing peers",
        "Weakness detection highlights flagged automatically"
      ],
      icon: <BarChart3 size={18} />
    },
    {
      id: 5,
      label: "Strategic Recommendations",
      title: "AI-Powered Priority Action Playbooks",
      desc: "Close the gaps identified by benchmarks. VibeOS automatically recommends research-backed playbook templates for managers.",
      bullets: [
        "Priority recommendations based on negative benchmark offsets",
        "Tailored manager checklist tools",
        "Check-in reminders and calendar sync targets"
      ],
      icon: <Target size={18} />
    }
  ];

  const faqs = [
    {
      q: "What are employee benchmarks?",
      a: "Employee benchmarks are comparative datasets compiled from millions of feedback responses. They allow organizations to compare their engagement, culture, and workload scores against industry, regional, and company size norms."
    },
    {
      q: "How are benchmark scores calculated?",
      a: "Our system normalizes feedback scores into general indexes, which are then mapped against our database of peer cohorts to calculate percentile rankings (e.g. 82nd percentile means you outperform 82% of similar companies)."
    },
    {
      q: "Can we compare against our industry?",
      a: "Yes. VibeOS includes comprehensive datasets covering major sectors including Tech, Finance, Healthcare, Professional Services, Retail, and Manufacturing."
    },
    {
      q: "Can benchmarks be filtered by company size?",
      a: "Absolutely. You can filter comparative datasets by headcount bands (e.g., 50-100, 100-500, 1000+ employees) to ensure comparisons represent realistic organizational structures."
    },
    {
      q: "How often are benchmark datasets updated?",
      a: "We update our global and industry benchmark datasets monthly, ensuring that comparative metrics always reflect current workforce climate shifts."
    },
    {
      q: "Can managers compare team performance internally?",
      a: "Yes. Our internal comparisons tab allows administrators to benchmark department scores against the organization-wide average, while preserving anonymity thresholds."
    },
    {
      q: "How do benchmarks improve decision making?",
      a: "They remove guesswork. Instead of arguing about whether a 7.2/10 communication score is good or bad, benchmarks show if that score is in the top 10% or bottom 20% of your industry, identifying exactly where to prioritize HR budgets."
    },
    {
      q: "Is employee data secure and anonymous?",
      a: "Yes. VibeOS is SOC2 Type II certified. Individual responses are anonymized and aggregated. Benchmarking comparison datasets are stripped of all metadata, ensuring no corporate or employee identity is ever exposed."
    }
  ];

  return (
    <div className="bm-page">
      {/* Ambient background glows */}
      <div className="bm-ambient-glow" />

      {/* ==========================================
          1. HERO SECTION
          ========================================== */}
      <section className="bm-hero">
        <div className="bm-hero__container">
          <div className="bm-hero__grid">
            
            {/* Left Content Column */}
            <motion.div 
              className="bm-hero__content"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="bm-hero__badge">
                <Sparkles size={12} />
                <span>Workforce Comparison Platform</span>
              </div>
              <h1 className="bm-hero__title">
                Know How Your <span>Organization Compares</span>
              </h1>
              <p className="bm-hero__desc">
                Put employee engagement, culture, and workforce experience data into context with industry-leading benchmarks that reveal where you excel and where improvement opportunities exist.
              </p>
              
              <div className="bm-hero__cta">
                <button onClick={() => setDemoModalOpen(true)} className="bm-btn bm-btn--primary">
                  <span>Book a Demo</span>
                  <ArrowRight size={16} />
                </button>
                <a href="#visual" className="bm-btn bm-btn--secondary">
                  <span>Explore Benchmarks</span>
                </a>
              </div>

              {/* Statistics/Trust Badges */}
              <div className="bm-hero__compliance">
                <div className="badge-item">
                  <strong>2,500+</strong>
                  <span>Companies Benchmarked</span>
                </div>
                <div className="badge-item">
                  <strong>50M+</strong>
                  <span>Responses Analyzed</span>
                </div>
                <div className="badge-item">
                  <strong>SOC2</strong>
                  <span>Certified Security</span>
                </div>
              </div>
            </motion.div>

            {/* Right Dashboard Mockup Column */}
            <motion.div 
              className="bm-hero__visual"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="dashboard-mock">
                {/* Address bar */}
                <div className="dashboard-mock__header">
                  <div className="dots"><span /><span /><span /></div>
                  <div className="address">vibeos.com/benchmarking</div>
                </div>

                <div className="dashboard-mock__body">
                  
                  {/* Row 1: Percentile & Sector Avg */}
                  <div className="mock-grid-row">
                    <div className="mock-widget mock-widget--percentile">
                      <span className="widget-label">Global Percentile</span>
                      <div className="percentile-bar-progress">
                        <svg viewBox="0 0 36 36" className="score-ring">
                          <circle cx="18" cy="18" r="15.915" className="bg" />
                          <circle cx="18" cy="18" r="15.915" className="fill fill-82" />
                        </svg>
                        <div className="score-text">82nd</div>
                      </div>
                      <span className="widget-trend text-emerald-500">Top 18% of Tech Sector</span>
                    </div>

                    <div className="mock-widget mock-widget--heatmap">
                      <span className="widget-label">Dimension comparison</span>
                      <div className="dimension-heatmap">
                        <div className="heat-row">
                          <span className="name">Trust</span>
                          <span className="tag pos">▲ 1.2 offset</span>
                        </div>
                        <div className="heat-row">
                          <span className="name">Wellbeing</span>
                          <span className="tag neg">▼ 0.8 offset</span>
                        </div>
                        <div className="heat-row">
                          <span className="name">Growth</span>
                          <span className="tag pos">▲ 0.4 offset</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Heatmap comparisons grid */}
                  <div className="mock-widget mock-widget--details">
                    <div className="details-header flex justify-between items-center mb-3">
                      <span className="title">Department vs Industry Benchmarks</span>
                      <span className="btn-filter text-[9px] font-black bg-purple-50 px-2 py-0.5 text-purple-600 rounded">Filter: Company size</span>
                    </div>

                    <div className="details-table flex flex-col gap-2">
                      <div className="table-row flex justify-between items-center text-xs text-slate-300">
                        <span className="font-bold text-slate-700">Engineering team</span>
                        <div className="progress-bar-track flex-1 mx-4 h-2 bg-slate-100 rounded overflow-hidden">
                          <span className="block h-full bg-purple-500" style={{ width: "88%" }} />
                        </div>
                        <span className="val font-black text-purple-600">88th %</span>
                      </div>
                      <div className="table-row flex justify-between items-center text-xs text-slate-300">
                        <span className="font-bold text-slate-700">Customer Operations</span>
                        <div className="progress-bar-track flex-1 mx-4 h-2 bg-slate-100 rounded overflow-hidden">
                          <span className="block h-full bg-blue-500" style={{ width: "62%" }} />
                        </div>
                        <span className="val font-black text-blue-600">62nd %</span>
                      </div>
                    </div>
                  </div>

                  {/* Floating widgets */}
                  <div className="floating-widget font-sans">
                    <div className="widget-bubble">
                      <strong>Region comparison</strong>
                      <div className="region-grid grid grid-cols-3 gap-2 mt-2">
                        <div className="item"><span className="lbl block text-[8px] text-slate-400">AMER</span><strong>80%</strong></div>
                        <div className="item"><span className="lbl block text-[8px] text-slate-400">EMEA</span><strong>84%</strong></div>
                        <div className="item"><span className="lbl block text-[8px] text-slate-400">APAC</span><strong>78%</strong></div>
                      </div>
                    </div>
                  </div>

                  <div className="floating-alert">
                    <div className="pulse-alert" />
                    <div className="alert-info">
                      <strong>AI Benchmark Alert</strong>
                      <span>Engineering workload: ▼ 18% peer average</span>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Customer Logo Trust Strip */}
        <div className="bm-hero__logos">
          <div className="container">
            <span className="logos-title">TRUSTED BY WORLD-CLASS TEAMS BENCHMARKING CULTURE</span>
            <div className="logos-grid">
              <div className="logo-item"><span>BOLT</span></div>
              <div className="logo-item"><span>STRIPE</span></div>
              <div className="logo-item"><span>VERCEL</span></div>
              <div className="logo-item"><span>AIRBNB</span></div>
              <div className="logo-item"><span>SLACK</span></div>
              <div className="logo-item"><span>ATTENTIVE</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          2. PROBLEM SECTION
          ========================================== */}
      <section className="bm-problem">
        <div className="bm-problem__container">
          <div className="bm-section-header">
            <span className="section-kicker">The context</span>
            <h2 className="section-title">Raw Employee Feedback <span>Lacks Context</span></h2>
            <p className="section-desc">
              Organizations collect employee feedback and engagement data, but without benchmarks, it becomes difficult to determine whether results represent strengths, weaknesses, or industry norms.
            </p>
          </div>

          <motion.div 
            className="bm-problem__grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {problemCards.map((card, idx) => (
              <motion.div 
                key={idx} 
                className={`problem-card problem-card--${card.color}`}
                variants={fadeUp}
              >
                <div className="problem-card__icon">
                  {card.icon}
                </div>
                <h3 className="problem-card__title">{card.title}</h3>
                <p className="problem-card__desc">{card.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==========================================
          3. HOW IT WORKS SECTION
          ========================================== */}
      <section className="bm-how">
        <div className="bm-how__container">
          <div className="bm-section-header">
            <span className="section-kicker">Process</span>
            <h2 className="section-title">Benchmark Smarter, <span>Improve Faster</span></h2>
          </div>

          <div className="bm-how__timeline-wrapper">
            {/* Timeline connection bar */}
            <div className="bm-how__timeline-line">
              <div className="progress-bar" />
            </div>

            <div className="bm-how__steps">
              {steps.map((step, idx) => (
                <div 
                  key={idx} 
                  className={`how-step ${idx === activeStep ? "active" : ""}`}
                  onMouseEnter={() => setActiveStep(idx)}
                >
                  <div className="how-step__content">
                    <div className="step-num">{step.step}</div>
                    <span className="step-badge">{step.badge}</span>
                    <h3 className="step-title">{step.title}</h3>
                    <p className="step-desc">{step.desc}</p>
                  </div>

                  {/* Step visuals mapping on hover */}
                  <div className="how-step__visual">
                    <div className="visual-panel">
                      {idx === 0 && (
                        <div className="visual-collect flex flex-col gap-2 p-4">
                          <div className="bg-white p-3 rounded-lg border border-slate-100 shadow-sm flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-800">Engagement pulse</span>
                            <span className="text-[10px] text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full font-bold">Collect</span>
                          </div>
                        </div>
                      )}

                      {idx === 1 && (
                        <div className="visual-compare p-4 flex flex-col gap-2">
                          <div className="bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                            <span className="text-xs font-bold block text-slate-800 mb-1">Target filter matching</span>
                            <div className="flex gap-2">
                              <span className="text-[9px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded">Tech sector</span>
                              <span className="text-[9px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded">50-100 size</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {idx === 2 && (
                        <div className="visual-identify p-4">
                          <div className="gap-card bg-purple-50/50 border border-purple-100 rounded-xl p-3 flex flex-col gap-2">
                            <span className="text-xs font-black text-purple-950 flex items-center gap-1">
                              <Sparkles size={12} className="text-purple-600" /> Delta detected
                            </span>
                            <span className="text-[10px] text-rose-600 font-bold bg-rose-50 border border-rose-100 px-2 py-0.5 rounded align-self-start">
                              Wellbeing: -12% delta vs sector average
                            </span>
                          </div>
                        </div>
                      )}

                      {idx === 3 && (
                        <div className="visual-action p-4 flex flex-col gap-2">
                          <div className="task-row flex items-center gap-2 text-xs font-bold text-slate-700">
                            <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                            <span>Action playbooks assigned to Managers</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          4. OUTCOME SECTION
          ========================================== */}
      <section className="bm-outcome">
        <div className="bm-outcome__container">
          <div className="bm-section-header">
            <span className="section-kicker">Impact</span>
            <h2 className="section-title">Turn Benchmark Data Into <span>Better Business Decisions</span></h2>
            <p className="section-desc">
              Organizations using benchmark-driven engagement strategies gain valuable context for prioritizing improvements and understanding workforce performance.
            </p>
          </div>

          <div className="bm-outcome__dashboard">
            <div className="dashboard-sidebar">
              <span className="sidebar-lbl">Approach comparison</span>
              <button 
                className={`sidebar-btn ${outcomeTab === "raw" ? "active" : ""}`}
                onClick={() => setOutcomeTab("raw")}
              >
                Raw Data Alone (Before)
              </button>
              <button 
                className={`sidebar-btn ${outcomeTab === "benchmark" ? "active" : ""}`}
                onClick={() => setOutcomeTab("benchmark")}
              >
                VibeOS Benchmark (After)
              </button>
            </div>

            <div className="dashboard-content">
              <AnimatePresence mode="wait">
                {outcomeTab === "raw" ? (
                  <motion.div 
                    key="raw"
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 15 }}
                    className="outcome-tab-panel raw-panel"
                  >
                    <h3 className="panel-title text-rose-500">Raw Feedback Surveys</h3>
                    <div className="metric-row-grid">
                      <div className="val-card">
                        <strong className="text-rose-600">Subjective</strong>
                        <span>Evaluation Process</span>
                      </div>
                      <div className="val-card">
                        <strong className="text-rose-600">Unknown</strong>
                        <span>Industry Placement</span>
                      </div>
                    </div>
                    <p className="panel-desc">
                      Without benchmark comparison points, HR and executives have no way of knowing if a score of 7.2/10 represent a workforce advantage or a warning sign.
                    </p>
                    <div className="red-warning-box">
                      <AlertCircle size={14} className="text-rose-500" />
                      <span>Leaves HR priority investments up to assumptions rather than data.</span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="benchmark"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    className="outcome-tab-panel benchmark-panel"
                  >
                    <h3 className="panel-title text-purple-600">VibeOS Benchmark Synthesis</h3>
                    <div className="metric-row-grid">
                      <div className="val-card">
                        <strong className="text-purple-600">Percentiles</strong>
                        <span>Relative comparison</span>
                      </div>
                      <div className="val-card">
                        <strong className="text-purple-600">Instant</strong>
                        <span>Offset Analysis</span>
                      </div>
                    </div>
                    <p className="panel-desc">
                      Instantly map your pulse scores to 2,500+ global companies. See exactly where your team excels, prove talent advantages to candidates, and align culture investments accurately.
                    </p>
                    <div className="green-success-box">
                      <CheckCircle2 size={14} className="text-emerald-500" />
                      <span>Saves over 3 weeks of research and manual report building labor.</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Outcome KPI Grid */}
          <motion.div 
            className="bm-outcome__grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {kpis.map((kpi, idx) => (
              <motion.div 
                key={idx} 
                className={`kpi-card kpi-card--${kpi.color}`}
                variants={fadeUp}
              >
                <div className="kpi-card__top">
                  <div className="kpi-card__value">
                    <Counter target={kpi.value} suffix={kpi.suffix} />
                  </div>
                  <div className="kpi-card__icon">
                    <TrendingUp size={16} />
                  </div>
                </div>
                <h3 className="kpi-card__label">{kpi.label}</h3>
                <p className="kpi-card__desc">{kpi.desc}</p>
                
                {/* Charts inside outcome cards */}
                {idx === 0 && (
                  <div className="kpi-chart-bars">
                    <span style={{ height: "30%" }} />
                    <span style={{ height: "45%" }} />
                    <span style={{ height: "65%" }} />
                    <span style={{ height: "80%" }} />
                    <span className="active" style={{ height: "95%" }} />
                  </div>
                )}
                {idx === 1 && (
                  <div className="kpi-chart-circle">
                    <svg viewBox="0 0 36 36" className="circle-svg">
                      <path className="bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3" />
                      <path className="fill" strokeDasharray="22, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                    <span className="center-val">-22%</span>
                  </div>
                )}
                {idx === 2 && (
                  <div className="kpi-chart-line">
                    <svg viewBox="0 0 100 25" className="sparkline-svg">
                      <path d="M0,20 Q15,5 30,18 T60,2 T90,12 T100,5" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                  </div>
                )}
                {idx === 3 && (
                  <div className="kpi-chart-line">
                    <svg viewBox="0 0 100 25" className="sparkline-svg">
                      <path d="M0,22 Q20,12 40,4 T70,18 T90,2 T100,2" fill="none" stroke="#f43f5e" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                  </div>
                )}
                {idx === 4 && (
                  <div className="kpi-progress-bar">
                    <div className="bar"><span style={{ width: "90%" }} /></div>
                    <span className="lbl text-[9px] font-bold text-slate-400">90% faster reporting speeds</span>
                  </div>
                )}
                {idx === 5 && (
                  <div className="kpi-chart-bars kpi-chart-bars--cyan">
                    <span style={{ height: "20%" }} />
                    <span style={{ height: "40%" }} />
                    <span style={{ height: "60%" }} />
                    <span style={{ height: "80%" }} />
                    <span className="active" style={{ height: "94%" }} />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==========================================
          5. VISUAL SHOWCASE SECTION (DARK THEME)
          ========================================== */}
      <section className="bm-showcase" id="visual">
        <div className="bm-showcase__bg">
          <div className="showcase-glow" />
        </div>

        <div className="bm-showcase__container">
          <div className="bm-section-header">
            <span className="section-kicker">Platform Tour</span>
            <h2 className="section-title">Everything You Need To <span>Benchmark Employee Experience</span></h2>
          </div>

          {/* Single-line non-scrolling tabs navigation (Only icons on mobile) */}
          <div className="bm-showcase__tabs">
            {showcaseModules.map((mod, idx) => (
              <button
                key={idx}
                className={`showcase-tab ${idx === activeShowcase ? "active" : ""}`}
                onClick={() => setActiveShowcase(idx)}
              >
                {mod.icon}
                <span>{mod.label}</span>
              </button>
            ))}
          </div>

          {/* Display Showcase Content */}
          <div className="bm-showcase__display">
            <AnimatePresence mode="wait">
              {showcaseModules.map((mod, idx) => {
                if (idx !== activeShowcase) return null;
                return (
                  <motion.div 
                    key={idx}
                    className="showcase-panel"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {/* Left Panel Information */}
                    <div className="showcase-panel__info">
                      <span className="panel-badge">Module {idx + 1}</span>
                      <h3 className="panel-title">{mod.title}</h3>
                      <p className="panel-desc">{mod.desc}</p>
                      
                      <ul className="panel-bullets">
                        {mod.bullets.map((bullet, bulletIdx) => (
                          <li key={bulletIdx}>
                            <CheckCircle2 size={16} />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Right Panel Mock visual */}
                    <div className="showcase-panel__visual">
                      <div className="visual-window">
                        <div className="window-head">
                          <div className="window-dots"><span /><span /><span /></div>
                          <span className="window-title">{mod.label} Preview</span>
                        </div>

                        <div className="window-body">
                          {idx === 0 && (
                            <div className="visual-panel-content visual-panel-content--industry">
                              <div className="industry-card bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col gap-3">
                                <span className="text-xs font-bold text-white">Compare Peer Sectors</span>
                                <div className="peer-item bg-purple-950/20 border border-purple-800/40 p-3 rounded-lg flex items-center justify-between">
                                  <div className="info">
                                    <h5 className="text-xs font-bold text-white">Technology Index</h5>
                                    <span className="text-[9px] text-slate-400">82nd Percentile</span>
                                  </div>
                                  <span className="text-[10px] text-purple-400 font-bold bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">Selected</span>
                                </div>
                              </div>
                            </div>
                          )}

                          {idx === 1 && (
                            <div className="visual-panel-content visual-panel-content--regional">
                              <div className="regional-card bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col gap-3">
                                <span className="text-xs font-bold text-white">Regional Sentiment Scores</span>
                                <div className="flex flex-col gap-2">
                                  <div className="region-row flex items-center justify-between text-xs text-slate-300">
                                    <span>APAC Team</span>
                                    <div className="bar-wrapper flex-1 mx-4 h-2 bg-slate-800 rounded overflow-hidden">
                                      <span className="block h-full bg-purple-500" style={{ width: "78%" }} />
                                    </div>
                                    <span>78%</span>
                                  </div>
                                  <div className="region-row flex items-center justify-between text-xs text-slate-300">
                                    <span>EMEA Team</span>
                                    <div className="bar-wrapper flex-1 mx-4 h-2 bg-slate-800 rounded overflow-hidden">
                                      <span className="block h-full bg-blue-500" style={{ width: "84%" }} />
                                    </div>
                                    <span>84%</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {idx === 2 && (
                            <div className="visual-panel-content visual-panel-content--team">
                              <div className="team-compare bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col gap-2">
                                <span className="text-xs font-bold text-white">Internal Department Offsets</span>
                                <div className="comparison-grid grid grid-cols-2 gap-3 mt-2">
                                  <div className="compare-box text-center p-2 bg-slate-950 border border-slate-800 rounded">
                                    <span className="lbl block text-[8px] text-slate-400">Product</span>
                                    <strong className="block text-emerald-400 text-sm">▲ 1.4 delta</strong>
                                  </div>
                                  <div className="compare-box text-center p-2 bg-slate-950 border border-slate-800 rounded">
                                    <span className="lbl block text-[8px] text-slate-400">Marketing</span>
                                    <strong className="block text-rose-400 text-sm">▼ 0.8 delta</strong>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {idx === 3 && (
                            <div className="visual-panel-content visual-panel-content--engagement">
                              <div className="engagement-card bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col gap-2">
                                <span className="text-xs font-bold text-white text-purple-400 flex items-center gap-1.5">
                                  <Award size={12} className="text-purple-400" /> Historic Percentiles
                                </span>
                                <div className="percentile-timeline mt-2">
                                  <svg viewBox="0 0 150 40" className="w-full h-10">
                                    <path d="M 0,35 Q 30,10 60,20 T 120,5 T 150,2" fill="none" stroke="#7e53ff" strokeWidth="2" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          )}

                          {idx === 4 && (
                            <div className="visual-panel-content visual-panel-content--insights">
                              <div className="insights-card bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col gap-3">
                                <span className="text-xs font-bold text-white">Workforce Health Index</span>
                                <div className="metrics-health-row flex gap-2">
                                  <div className="health-bar flex-1 h-12 bg-purple-500/10 border border-purple-500/20 rounded flex flex-col items-center justify-center">
                                    <span className="lbl text-[8px] text-slate-400">Trust</span>
                                    <span className="text-xs font-black text-purple-400">8.4</span>
                                  </div>
                                  <div className="health-bar flex-1 h-12 bg-rose-500/10 border border-rose-500/20 rounded flex flex-col items-center justify-center">
                                    <span className="lbl text-[8px] text-slate-400">Wellbeing</span>
                                    <span className="text-xs font-black text-rose-400">5.8</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {idx === 5 && (
                            <div className="visual-panel-content visual-panel-content--recommendations">
                              <div className="recommend-card bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col gap-2">
                                <span className="text-xs font-bold text-white">AI Playbook Recommendations</span>
                                <ul className="text-[10px] text-slate-300 list-disc pl-4 flex flex-col gap-1.5">
                                  <li>Evaluate meeting policies for teams with low wellbeing indexes.</li>
                                  <li>Sync onboarding guidelines with regional manager templates.</li>
                                </ul>
                              </div>
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
          6. FAQ SECTION
          ========================================== */}
      <section className="bm-faq">
        <div className="bm-faq__container">
          <div className="bm-section-header">
            <span className="section-kicker">FAQ</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>

          <div className="bm-faq__list">
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
          7. FINAL CTA SECTION
          ========================================== */}
      <section className="bm-cta">
        <div className="bm-cta__mesh" />
        <div className="bm-cta__circle circle-1" />
        <div className="bm-cta__circle circle-2" />

        <div className="bm-cta__container">
          <h2 className="bm-cta__title">See How Your Organization Stacks Up</h2>
          <p className="bm-cta__desc">
            Move beyond raw employee data and gain the context needed to make confident workforce decisions. Use benchmarking to identify strengths, uncover gaps, and accelerate organizational success.
          </p>

          <div className="bm-cta__buttons">
            <button onClick={() => setDemoModalOpen(true)} className="bm-btn bm-btn--white">Start Benchmarking Today</button>
            <button onClick={() => setDemoModalOpen(true)} className="bm-btn bm-btn--outline">Book a Demo</button>
          </div>

          {/* Testimonial Box */}
          <div className="bm-cta__testimonial">
            <Quote size={18} className="quote-icon text-purple-400" />
            <p className="quote-text">
              &quot;VibeOS benchmarks completely changed how we evaluate engagement. We were struggling to prove why engineering workload budgets were needed, but seeing our scores in the bottom 15% of the tech sector provided the exact context needed to align leadership.&quot;
            </p>
            <div className="author">
              <strong>Marcus Vance</strong>
              <span>VP of People Experience, Attentive</span>
            </div>
          </div>

          {/* Success badges */}
          <div className="bm-cta__badges">
            <span className="badge-item">🏆 Leader Summer 2026</span>
            <span className="badge-item">⭐ 4.9/5 on G2</span>
            <span className="badge-item">🔒 SOC2 Certified</span>
          </div>
        </div>
      </section>
    </div>
  );
}
