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
  Database,
  Eye,
  TrendingDown,
  LineChart,
  UserCheck,
  Zap,
  Play,
  Mail,
  RefreshCw,
  MessageSquare
} from "lucide-react";
import "./RetentionSoftwareInsights.scss";
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
   getSentimentScores Helper
   ────────────────────────────────────────────── */
const getSentimentScores = (theme: string) => {
  switch (theme) {
    case "growth":
      return { positive: 24, neutral: 14, negative: 62 };
    case "comp":
      return { positive: 38, neutral: 38, negative: 24 };
    case "burnout":
      return { positive: 14, neutral: 24, negative: 62 };
    case "culture":
      return { positive: 74, neutral: 16, negative: 10 };
    default:
      return { positive: 50, neutral: 30, negative: 20 };
  }
};

export default function RetentionSoftwareInsights() {
  const setDemoModalOpen = useProtoStore((state) => state.setDemoModalOpen);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeHeroTab, setActiveHeroTab] = useState<"metrics" | "warnings">("metrics");
  const [activeBentoTag, setActiveBentoTag] = useState<"growth" | "comp" | "burnout" | "culture">("growth");
  const [privacyStrict, setPrivacyStrict] = useState(true);
  
  // Showcase tab state
  const [activePersona, setActivePersona] = useState<"hr" | "leader" | "manager">("hr");
  const [userPersonaInteracted, setUserPersonaInteracted] = useState(false);

  // Scroll Reveal Refs
  const [heroRef, heroRevealed] = useScrollReveal();
  const [capabilitiesRef, capabilitiesRevealed] = useScrollReveal();
  const [statsRef, statsRevealed] = useScrollReveal();
  const [personaRef, personaRevealed] = useScrollReveal();
  const [faqRef, faqRevealed] = useScrollReveal();
  const [ctaRef, ctaRevealed] = useScrollReveal();

  // Auto-rotating Persona Switcher
  useEffect(() => {
    if (userPersonaInteracted) return;
    const interval = setInterval(() => {
      setActivePersona((prev) => {
        if (prev === "hr") return "leader";
        if (prev === "leader") return "manager";
        return "hr";
      });
    }, 6000);
    return () => clearInterval(interval);
  }, [userPersonaInteracted]);

  // CTA form states
  const [emailInput, setEmailInput] = useState("");
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle");

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

  const getBentoSummary = (tag: string) => {
    switch (tag) {
      case "growth":
        return "AI analysis shows lack of clear promotion paths drives 62% of tenure departures. Suggested stay playbook: Map career milestones.";
      case "comp":
        return "Compensation benchmark checks suggest salary gap averages 24% in critical tech areas. Suggested stay playbook: Align compensation adjustments.";
      case "burnout":
        return "Workload metrics flagged 62% negative sentiment around task overloading. Suggested stay playbook: Deploy rest schedules.";
      case "culture":
        return "Team vibe audits recorded 74% positive sentiment following recent workflow redesigns. Suggested stay playbook: Maintain weekly alignment retros.";
      default:
        return "";
    }
  };

  // Stats Counters
  const countParticipation = useCounter(90, statsRevealed, 2000, "%");
  const countHoursSaved = useCounter(20, statsRevealed, 2000, "+ hrs");
  const countCustomerNps = useCounter(48, statsRevealed, 2000, "%");

  const faqs = [
    {
      q: "How does retention prediction work?",
      a: "Our platform uses machine learning to analyze historical exit patterns alongside active workforce signals—such as survey scores, integration indicators, HRIS logs, and tenure milestones. By identifying correlations, it forecasts risk indexes across departments without targeting specific individuals."
    },
    {
      q: "What data sources can be connected?",
      a: "We integrate seamlessly with major HRIS platforms (Workday, BambooHR, Rippling), communication channels (Slack, Microsoft Teams), performance evaluation software, and feedback systems to compile a centralized retention timeline."
    },
    {
      q: "Can managers identify retention risks in their teams?",
      a: "Yes. Managers have access to aggregate dashboard views showing cohort-level risk summaries and actionable feedback recommendations, provided the team size meets our privacy aggregation threshold (e.g., 5+ members)."
    },
    {
      q: "How accurate are turnover predictions?",
      a: "Our predictive algorithms achieve up to 88% accuracy in forecasting department-level retention declines and turnover trends, verified by post-deployment historical tracking across 1.2M+ corporate records."
    },
    {
      q: "How is employee privacy protected?",
      a: "We enforce strict security models, anonymizing and aggregating qualitative text and engagement data. We maintain compliance with GDPR, HIPAA, and SOC2 guidelines, ensuring individuals are never personally targeted."
    },
    {
      q: "Can HR teams customize retention metrics?",
      a: "Absolutely. You can define custom high-performer thresholds, select specific survey question weights, configure custom department metrics, and adjust automated playbook triggers inside our settings workspace."
    }
  ];

  return (
    <div className="rsi-page">
      {/* ==========================================
          1. HERO COCKPIT SECTION
          ========================================== */}
      <section className="rsi-hero" ref={heroRef}>
        <div className="rsi-hero__bg">
          <div className="rsi-hero__glow rsi-hero__glow--1" />
          <div className="rsi-hero__glow rsi-hero__glow--2" />
        </div>

        <div className="rsi-hero__container">
          <motion.div 
            className="rsi-hero__content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="rsi-hero__badge">
              <Sparkles size={12} className="mr-1.5 text-purple-400 animate-pulse" />
              VibeOS Retention Insights
            </span>
            <h1 className="rsi-hero__title">
              Employee retention tool: <br />
              <span>Stop turnover before it’s too late</span>
            </h1>
            <p className="rsi-hero__desc">
              With the earliest turnover warning signals for all groups, Retention Insights helps you predict who’s at risk of leaving and why – and understand what you have to do to stop it.
            </p>
            <div className="rsi-hero__ctas">
              <button onClick={() => setDemoModalOpen(true)} className="rsi-btn rsi-btn--primary">
                Book a Demo
                <ArrowRight size={16} className="ml-1.5" />
              </button>
              <a href="#capabilities" className="rsi-btn rsi-btn--secondary">
                See How It Works
              </a>
            </div>

            <div className="rsi-hero__trust">
              <div className="trust-col">
                <strong>88%</strong>
                <span>Prediction Accuracy</span>
              </div>
              <div className="trust-sep" />
              <div className="trust-col">
                <strong>1B+</strong>
                <span>Experience Points</span>
              </div>
              <div className="trust-sep" />
              <div className="trust-col">
                <strong>SOC2</strong>
                <span>Data Protection</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="rsi-hero__visual"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="hero-widget">
              <div className="hero-widget__header">
                <div className="hero-widget__dots"><span /><span /><span /></div>
                <div className="hero-widget__tabs">
                  <button 
                    className={`tab-btn ${activeHeroTab === "metrics" ? "active" : ""}`}
                    onClick={() => setActiveHeroTab("metrics")}
                  >
                    Retention Metrics
                  </button>
                  <button 
                    className={`tab-btn ${activeHeroTab === "warnings" ? "active" : ""}`}
                    onClick={() => setActiveHeroTab("warnings")}
                  >
                    AI Flight Warnings
                  </button>
                </div>
              </div>

              <div className="hero-widget__body">
                <AnimatePresence mode="wait">
                  {activeHeroTab === "metrics" ? (
                    <motion.div 
                      key="metrics"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="tab-content"
                    >
                      <div className="stat-cards">
                        <div className="s-card green">
                          <span className="s-lbl">Retention Index</span>
                          <span className="s-val">94.2%</span>
                          <span className="s-trend text-emerald-400">▲ +2.4% vs last Q</span>
                        </div>
                        <div className="s-card purple">
                          <span className="s-lbl">Active Risk Alerts</span>
                          <span className="s-val">3 Cohorts</span>
                          <div className="s-progress"><div className="s-fill" style={{ width: "60%" }} /></div>
                        </div>
                      </div>

                      <div className="feed-list">
                        <span className="feed-title">High Risk Retention Feeds</span>
                        <div className="feed-item active">
                          <div className="f-indicator alert"><div className="f-inner animate-ping" /></div>
                          <div className="f-info">
                            <strong>Sales Tenure cohort (6-12m)</strong>
                            <span>High exit driver overlap · 14 at risk</span>
                          </div>
                          <span className="f-score text-rose-500">84% Risk</span>
                        </div>
                        <div className="feed-item">
                          <div className="f-indicator healthy"><Check size={8} /></div>
                          <div className="f-info">
                            <strong>Product Engineering</strong>
                            <span>Retention drivers stable · 40 members</span>
                          </div>
                          <span className="f-score text-emerald-400">Stable</span>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="warnings"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="tab-content"
                    >
                      <div className="stat-cards">
                        <div className="s-card rose">
                          <span className="s-lbl">Predicted Churn Rate</span>
                          <span className="s-val">1.2%</span>
                          <span className="s-trend text-rose-400">▼ Voluntary probability alert</span>
                        </div>
                        <div className="s-card amber">
                          <span className="s-lbl">Core Vulnerability Factor</span>
                          <span className="s-val">Career Path</span>
                          <span className="s-trend text-amber-400">62% frequency</span>
                        </div>
                      </div>

                      <div className="exit-drivers">
                        <span className="feed-title">Predicted Churn Catalysts</span>
                        <div className="driver-bar">
                          <div className="db-text"><span>Lack of Career Growth</span><span>62%</span></div>
                          <div className="db-track"><div className="db-fill purple" style={{ width: "62%" }} /></div>
                        </div>
                        <div className="driver-bar">
                          <div className="db-text"><span>Compensation Discrepancy</span><span>24%</span></div>
                          <div className="db-track"><div className="db-fill blue" style={{ width: "24%" }} /></div>
                        </div>
                        <div className="driver-bar">
                          <div className="db-text"><span>Workload Burnout</span><span>14%</span></div>
                          <div className="db-track"><div className="db-fill rose" style={{ width: "14%" }} /></div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Floating Analytics Badges */}
            <div className="floater-badge floater-badge--1">
              <div className="fb-avatar">AI</div>
              <div className="fb-text">
                <strong>Flight Risk Warning</strong>
                <span>Sales cohort (6-12m) · 84% prob</span>
              </div>
            </div>
            <div className="floater-badge floater-badge--2">
              <div className="fb-icon"><Shield size={12} className="text-emerald-400" /></div>
              <div className="fb-text">
                <strong>Privacy Anonymizer</strong>
                <span>GDPR aggregation active</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Enterprise Logos Bar */}
        <div className="rsi-logos">
          <div className="rsi-logos__container">
            <span className="logos-title">trusted by over 6,000+ forward-thinking organizations</span>
            <div className="logos-wrapper">
              {["Stripe", "Figma", "Notion", "Linear", "Vercel", "Brex", "Webflow"].map((logo) => (
                <span key={logo} className="logo-item">{logo}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          2. INTERACTIVE BENTO MATRIX (CAPABILITIES)
          ========================================== */}
      <section className="rsi-bento" id="capabilities" ref={capabilitiesRef}>
        <div className="container">
          <div className={`rsi-section-header ${capabilitiesRevealed ? "reveal-active" : ""}`}>
            <span className="section-kicker">Core Capabilities</span>
            <h2 className="section-title">Stop Turnover with <span>Retention Insights</span></h2>
            <p className="section-desc">
              Get the earliest turnover warning signals for all cohorts. Predict who is at risk of leaving, identify why, and take immediate, guided action.
            </p>
          </div>

          <div className="bento-layout-grid">
            {/* Bento Card 1: Connected Data */}
            <div className={`bento-card bento-card--connected ${capabilitiesRevealed ? "reveal-active" : ""}`}>
              <div className="bento-card__content">
                <div className="pillar-icon icon-blue">
                  <Database size={20} />
                </div>
                <h3>Make retention easy with seamlessly connected data</h3>
                <p>Retention Insights automatically connects your HRIS and employee survey data to help you pinpoint where turnover is likely to happen and why – all in one intuitive dashboard that updates daily.</p>
                
                <div className="mini-sync-pipeline">
                  <div className="pipeline-node node-hris">
                    <Database size={14} className="text-blue-400 mr-1 shrink-0" />
                    <span>Workday</span>
                  </div>
                  <div className="pipeline-flow">
                    <span className="flow-dot animate-flow" />
                  </div>
                  <div className="pipeline-node node-vibe">
                    <Sparkles size={14} className="text-purple-400 mr-1 shrink-0" />
                    <span>VibeOS</span>
                  </div>
                </div>
                
                <div className="sync-status-indicator">
                  <span className="dot pulse-emerald" />
                  <span>Daily synchronization completed 5m ago</span>
                </div>
              </div>
            </div>

            {/* Bento Card 2: Predict & Motivate (Large Bento) */}
            <div className={`bento-card bento-card--predictive ${capabilitiesRevealed ? "reveal-active" : ""}`}>
              <div className="bento-card__content">
                <div className="pillar-icon icon-purple">
                  <Brain size={20} />
                </div>
                <h3>Predict who might leave, and what might motivate them to stay</h3>
                <p>Proactively retain your most valued employees with early turnover warning signals, and guide leaders and managers with data-driven insight into what will motivate them to stay.</p>
                
                {/* Interactive Theme Selectors */}
                <div className="theme-tag-selectors">
                  {[
                    { id: "growth", label: "Career Growth" },
                    { id: "comp", label: "Compensation" },
                    { id: "burnout", label: "Workload Burnout" },
                    { id: "culture", label: "Team Culture" }
                  ].map((tag) => (
                    <button
                      key={tag.id}
                      className={`theme-tag-pill ${activeBentoTag === tag.id ? "active" : ""}`}
                      onClick={() => setActiveBentoTag(tag.id as any)}
                    >
                      {tag.label}
                    </button>
                  ))}
                </div>

                <div className="ai-summary-terminal">
                  <span className="terminal-badge">AI TURNOVER FORECAST</span>
                  <p>{getBentoSummary(activeBentoTag)}</p>
                </div>

                {/* Sentiment Bar Indicators */}
                <div className="sentiment-bar-vis">
                  <div className="vis-header">
                    <span>NLP Sentiment Breakdown</span>
                    <span className="live-pill">LIVE DATA</span>
                  </div>
                  
                  {/* Positive */}
                  <div className="sentiment-row">
                    <div className="sentiment-info">
                      <span>Positive Sentiment</span>
                      <span className="pct text-emerald-400">{getSentimentScores(activeBentoTag).positive}%</span>
                    </div>
                    <div className="sentiment-track">
                      <motion.div 
                        className="sentiment-fill bg-emerald-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${getSentimentScores(activeBentoTag).positive}%` }}
                        transition={{ type: "spring", stiffness: 80 }}
                      />
                    </div>
                  </div>

                  {/* Neutral */}
                  <div className="sentiment-row">
                    <div className="sentiment-info">
                      <span>Neutral Sentiment</span>
                      <span className="pct text-amber-400">{getSentimentScores(activeBentoTag).neutral}%</span>
                    </div>
                    <div className="sentiment-track">
                      <motion.div 
                        className="sentiment-fill bg-amber-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${getSentimentScores(activeBentoTag).neutral}%` }}
                        transition={{ type: "spring", stiffness: 80 }}
                      />
                    </div>
                  </div>

                  {/* Negative */}
                  <div className="sentiment-row">
                    <div className="sentiment-info">
                      <span>Negative Sentiment (Risk)</span>
                      <span className="pct text-rose-400">{getSentimentScores(activeBentoTag).negative}%</span>
                    </div>
                    <div className="sentiment-track">
                      <motion.div 
                        className="sentiment-fill bg-rose-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${getSentimentScores(activeBentoTag).negative}%` }}
                        transition={{ type: "spring", stiffness: 80 }}
                      />
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Bento Card 3: Trusted Recommendations */}
            <div className={`bento-card bento-card--recommendations ${capabilitiesRevealed ? "reveal-active" : ""}`}>
              <div className="bento-card__content">
                <div className="pillar-icon icon-emerald">
                  <Shield size={20} />
                </div>
                <h3>Make your retention recommendations with confidence</h3>
                <p>Backed by over 1 billion employee experience data points and Culture Amp’s market-leading expertise, Retention Insights provides trusted insights into what drives retention and turnover across your business.</p>
                
                <div className="anonymity-control-shield" onClick={() => setPrivacyStrict(!privacyStrict)}>
                  <Lock className={`lock-ic ${privacyStrict ? "text-emerald" : "text-amber"}`} size={24} />
                  <span className="privacy-threshold-lbl">
                    {privacyStrict ? "AGGREGATE THRESHOLD: 5+ MEMBERS" : "AGGREGATE THRESHOLD: 3+ MEMBERS"}
                  </span>
                </div>

                <div className="compliance-row">
                  <span className="compliance-badge">🔒 SOC2 Certified</span>
                  <span className="compliance-badge">🇪🇺 GDPR Compliant</span>
                  <span className="compliance-badge">🛡️ HIPAA Secured</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==========================================
          3. SURVEY IMPACT STATISTICS SECTION
          ========================================== */}
      <section className="rsi-stats" ref={statsRef}>
        <div className="container">
          <div className="rsi-section-header text-center">
            <span className="section-kicker">Business Impact</span>
            <h2 className="section-title">Proven Engagement & Retention Results</h2>
          </div>

          <div className="stats-layout-grid">
            {/* Metric 1: Participation */}
            <div className="metric-box box-purple">
              <div className="metric-header">
                <span className="num">{countParticipation}</span>
                <TrendingUp size={20} className="ic" />
              </div>
              <h4>initial employee engagement survey participation rate</h4>
              <p>Achieve high participation rates using optimized Slack/Teams delivery triggers.</p>
              
              <div className="metric-box__visual">
                <svg viewBox="0 0 36 36" className="radial-wheel">
                  <path
                    className="bg"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <motion.path
                    className="fill fill-purple"
                    strokeDasharray="90, 100"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="center-text">90%</span>
              </div>
            </div>

            {/* Metric 2: Hours Saved */}
            <div className="metric-box box-blue">
              <div className="metric-header">
                <span className="num">{countHoursSaved}</span>
                <Clock size={20} className="ic" />
              </div>
              <h4>saved per month on survey distribution and reporting</h4>
              <p>Eliminate manual survey pipelines and generate ready-to-share board reports in one click.</p>
              
              <div className="metric-box__visual">
                <div className="time-saved-bar-vis">
                  <div className="bar"><div className="fill fill-blue animate-pulse" style={{ width: "80%" }} /></div>
                  <span className="label">Manual Process: 24 hrs/mo</span>
                  <div className="bar"><div className="fill fill-purple" style={{ width: "15%" }} /></div>
                  <span className="label">VibeOS: 4 hrs/mo</span>
                </div>
              </div>
            </div>

            {/* Metric 3: NPS Lift */}
            <div className="metric-box box-emerald">
              <div className="metric-header">
                <span className="num">{countCustomerNps}</span>
                <Sparkles size={20} className="ic" />
              </div>
              <h4>higher customer Net Promoter Score (NPS)</h4>
              <p>Traceable improvements in internal work culture translate directly into higher client satisfaction.</p>
              
              <div className="metric-box__visual">
                <svg viewBox="0 0 100 30" className="sparkline-chart">
                  <motion.path
                    d="M0,28 Q20,20 40,8 T70,14 T90,2 T100,2"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={statsRevealed ? { pathLength: 1 } : {}}
                    transition={{ duration: 1.5 }}
                  />
                </svg>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==========================================
          4. AUDIENCE WORKSPACE SELECTOR (PERSONAS)
          ========================================== */}
      <section className="rsi-personas" ref={personaRef}>
        <div className="container">
          <div className="rsi-section-header text-center">
            <span className="section-kicker">Works Across Your Entire Organization</span>
            <h2 className="section-title">Employee retention software that works across your entire organization</h2>
          </div>

          <div className="personas-workspace">
            {/* Left selector buttons */}
            <div className="personas-tabs">
              {[
                { id: "hr", label: "HR Teams", title: "Predict turnover & justify action with confidence" },
                { id: "leader", label: "Leaders", title: "Build data-driven strategies & case for change" },
                { id: "manager", label: "Managers", title: "Take targeted team-level preventative actions" }
              ].map((p) => (
                <button
                  key={p.id}
                  className={`persona-tab-btn persona-tab-btn--${p.id} ${activePersona === p.id ? "active" : ""}`}
                  onClick={() => {
                    setActivePersona(p.id as any);
                    setUserPersonaInteracted(true);
                  }}
                >
                  <h4>{p.label}</h4>
                  <p>{p.title}</p>
                </button>
              ))}
            </div>

            {/* Right side interactive dashboard preview */}
            <div className="personas-viewport">
              <AnimatePresence mode="wait">
                {activePersona === "hr" && (
                  <motion.div
                    key="hr"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                    className="persona-panel panel-hr"
                  >
                    <div className="panel-info">
                      <span className="badge">HR TEAMS PORTAL</span>
                      <h3>Predict Turnover with Confidence</h3>
                      <p>Give HR teams the data and insights to predict turnover and make your most important retention recommendations with confidence.</p>
                      <ul className="bullets">
                        <li><CheckCircle2 size={14} className="text-purple-400 mr-2" /> Real-time turnover risk heatmap indicators</li>
                        <li><CheckCircle2 size={14} className="text-purple-400 mr-2" /> Aggregated demographic flight alerts</li>
                        <li><CheckCircle2 size={14} className="text-purple-400 mr-2" /> Daily automated HRIS active directory syncs</li>
                      </ul>
                    </div>

                    <div className="panel-mockup">
                      <div className="mock-window">
                        <div className="mock-header">
                          <div className="dots"><span /><span /><span /></div>
                          <span className="address">vibeos.com/platform/hr-dashboard</span>
                        </div>
                        <div className="mock-body">
                          <span className="tbl-lbl">Talent Cohort Risk Assessment</span>
                          <div className="mock-risk-table">
                            <div className="row"><span>Sales (6-12m tenure)</span><span className="risk high">84% Alert</span></div>
                            <div className="row"><span>Marketing (1-2y tenure)</span><span className="risk mid">42% Warning</span></div>
                            <div className="row"><span>Product (2y+ tenure)</span><span className="risk low">12% Healthy</span></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activePersona === "leader" && (
                  <motion.div
                    key="leader"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                    className="persona-panel panel-leader"
                  >
                    <div className="panel-info">
                      <span className="badge">LEADERS BOARD</span>
                      <h3>Build a Data-Driven Case for Change</h3>
                      <p>With the earliest turnover warning signals, you can build a data-driven case for change and guide leaders towards targeted strategies that will retain critical employees.</p>
                      <ul className="bullets">
                        <li><CheckCircle2 size={14} className="text-blue-400 mr-2" /> Macro organizational retention score trends</li>
                        <li><CheckCircle2 size={14} className="text-blue-400 mr-2" /> Global industry benchmarks & comparison metrics</li>
                        <li><CheckCircle2 size={14} className="text-blue-400 mr-2" /> Business impact cost-of-turnover calculations</li>
                      </ul>
                    </div>

                    <div className="panel-mockup">
                      <div className="mock-window">
                        <div className="mock-header">
                          <div className="dots"><span /><span /><span /></div>
                          <span className="address">vibeos.com/platform/executive-board</span>
                        </div>
                        <div className="mock-body">
                          <span className="tbl-lbl">Macro Retention Benchmarking</span>
                          <div className="mock-benchmark-graph">
                            <div className="bar-compare">
                              <span className="lbl">VibeOS Platform</span>
                              <div className="track"><div className="fill bg-blue-500" style={{ width: "94%" }} /></div>
                              <span className="val">94%</span>
                            </div>
                            <div className="bar-compare">
                              <span className="lbl">Industry Avg</span>
                              <div className="track"><div className="fill bg-slate-600" style={{ width: "82%" }} /></div>
                              <span className="val">82%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activePersona === "manager" && (
                  <motion.div
                    key="manager"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                    className="persona-panel panel-manager"
                  >
                    <div className="panel-info">
                      <span className="badge">MANAGERS PLAYBOOK</span>
                      <h3>Guide Managers Towards Action</h3>
                      <p>Guide managers towards preventative actions that will keep their most valued people, based on unique insights into what’s driving retention and turnover on their teams.</p>
                      <ul className="bullets">
                        <li><CheckCircle2 size={14} className="text-emerald-400 mr-2" /> Team-level flight alerts with private filters</li>
                        <li><CheckCircle2 size={14} className="text-emerald-400 mr-2" /> Tailored stay-interview checklists & scripts</li>
                        <li><CheckCircle2 size={14} className="text-emerald-400 mr-2" /> Action resolution status tracking logs</li>
                      </ul>
                    </div>

                    <div className="panel-mockup">
                      <div className="mock-window">
                        <div className="mock-header">
                          <div className="dots"><span /><span /><span /></div>
                          <span className="address">vibeos.com/platform/manager-playbook</span>
                        </div>
                        <div className="mock-body">
                          <span className="tbl-lbl">Team Prevention Checklists</span>
                          <div className="mock-checklist">
                            <div className="chk-row completed"><Check size={12} className="text-emerald-500 mr-2 shrink-0" /><span>Complete 1-on-1 stay-interview</span></div>
                            <div className="chk-row active"><Clock size={12} className="text-amber-500 mr-2 shrink-0" /><span>Review workload balancing plan</span></div>
                            <div className="chk-row active"><Clock size={12} className="text-amber-500 mr-2 shrink-0" /><span>Parity compensation review request</span></div>
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
      </section>

      {/* ==========================================
          5. PLATFORM ECOSYSTEM SECTION
          ========================================== */}
      <section className="rsi-ecosystem">
        <div className="container">
          <div className="rsi-section-header text-center">
            <span className="section-kicker">Explore Our Full Platform</span>
            <h2 className="section-title">Seamlessly Connected Feedback & Performance</h2>
          </div>

          <div className="ecosystem-layout-grid">
            {/* Engage */}
            <div className="ecosystem-card">
              <span className="card-badge badge-purple">ENGAGE</span>
              <h3>Boost employee engagement</h3>
              <p>Gain real-time insights to boost engagement, improve retention, and support your people.</p>
              <div className="spacer" />
              <button className="card-link">
                Learn More <ArrowRight size={14} className="ml-1 shrink-0" />
              </button>
            </div>

            {/* Perform */}
            <div className="ecosystem-card">
              <span className="card-badge badge-blue">PERFORM</span>
              <h3>Unlock high performance</h3>
              <p>Empower teams with tools to improve effectiveness and drive continuous performance.</p>
              <div className="spacer" />
              <button className="card-link">
                Learn More <ArrowRight size={14} className="ml-1 shrink-0" />
              </button>
            </div>

            {/* Develop */}
            <div className="ecosystem-card">
              <span className="card-badge badge-emerald">DEVELOP</span>
              <h3>Drive continuous growth</h3>
              <p>Align personal goals with company objectives to foster growth and development.</p>
              <div className="spacer" />
              <button className="card-link">
                Learn More <ArrowRight size={14} className="ml-1 shrink-0" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          6. FAQ SECTION
          ========================================== */}
      <section className="rsi-faq" ref={faqRef}>
        <div className="rsi-faq__container">
          <div className="rsi-section-header">
            <span className="section-kicker">FAQ</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>

          <div className="rsi-faq__list">
            {faqs.map((faq, idx) => {
              const isOpen = idx === activeFaq;
              return (
                <div 
                  key={idx} 
                  className={`faq-card ${isOpen ? "open" : ""}`}
                >
                  <button 
                    className="faq-card__trigger" 
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown size={18} className="chev" />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                          open: { opacity: 1, height: "auto" },
                          collapsed: { opacity: 0, height: 0 }
                        }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="faq-card__content"
                      >
                        <p>{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==========================================
          7. FINAL CTA SECTION
          ========================================== */}
      <section className="rsi-cta" ref={ctaRef}>
        <div className="rsi-cta__bg">
          <div className="orb orb-1" />
          <div className="orb orb-2" />
        </div>

        <div className="rsi-cta__container">
          <div className="rsi-cta__box">
            <h2 className="rsi-cta__title">
              Invest in your people and <span>create impact</span>
            </h2>
            <p className="rsi-cta__desc">
              Move beyond reactive strategies. Build a predictive retention pipeline that connects employee feedback with automated stay checklists to prevent turnover.
            </p>
            
            <form className="rsi-cta__form" onSubmit={handleCtaSubmit}>
              <div className="form-group flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your corporate email..."
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="cta-input"
                  required
                />
                <button type="submit" className="cta-submit-btn">
                  Book a Demo
                </button>
              </div>

              <AnimatePresence>
                {formStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="form-message msg-success text-xs mt-2 text-emerald-400 font-bold"
                  >
                    <CheckCircle2 size={14} className="inline mr-1" /> Demo request registered. Our representative will contact you shortly.
                  </motion.div>
                )}
                {formStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="form-message msg-error text-xs mt-2 text-rose-500 font-bold"
                  >
                    <Shield size={14} className="inline mr-1" /> Please enter a valid corporate email.
                  </motion.div>
                )}
              </AnimatePresence>
            </form>

            <div className="rsi-cta__testimonial mt-8 text-center border-t border-white/5 pt-6 max-w-lg mx-auto">
              <p className="quote text-white/80 font-heading italic text-xs leading-relaxed">
                &quot;VibeOS transformed our talent strategy. We predicted and prevented flight risks in our engineering team, improving retention stability by 32% inside 6 months.&quot;
              </p>
              <div className="author text-[11px] mt-3 flex flex-col text-slate-400">
                <strong className="text-white">Clara Reynolds</strong>
                <span>VP of Employee Experience, Vercel</span>
              </div>
            </div>

            <div className="rsi-cta__badges mt-6 flex flex-wrap justify-center gap-4 text-[10px] font-bold text-white/40">
              <span className="badge">⭐ 4.9 G2 Rating</span>
              <span className="badge">🔒 SOC2 Certified</span>
              <span className="badge">🇪🇺 GDPR Compliant</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
