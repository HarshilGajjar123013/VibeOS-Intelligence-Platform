"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiAward,
  FiBookOpen,
  FiCompass,
  FiBriefcase,
  FiUsers,
  FiTrendingUp,
  FiActivity,
  FiArrowRight,
  FiCheckCircle,
  FiDollarSign,
  FiMail,
  FiMessageSquare,
  FiSliders,
  FiShield,
  FiGrid,
  FiZap,
  FiCheck,
  FiAlertTriangle,
  FiX
} from "react-icons/fi";
import "./PeopleScience.scss";

// Mock data for the interactive modules
const MILESTONES = [
  {
    year: "Phase 1",
    title: "Foundational IO Psychology",
    desc: "Classical psychometric evaluation. Legacy methods that laid the groundwork for modern workplace sociology but suffered from long manual cycles and low participation.",
    stat: "1980s-2000s",
    label: "Legacy Frameworks",
    color: "#6366f1"
  },
  {
    year: "Phase 2",
    title: "Digital Survey Revolution",
    desc: "Surveys moved online, dramatically increasing response rates. However, data remained isolated in siloes, leaving HR leaders with numbers but no actionable narrative.",
    stat: "2010-2018",
    label: "Cloud Transition",
    color: "#3b82f6"
  },
  {
    year: "Phase 3",
    title: "Multi-Source Analytics",
    desc: "Aggregating 1.6B+ responses. Cross-referencing engagement metrics with performance logs, attrition trends, and onboarding signals to uncover macro drivers of behavior.",
    stat: "2019-2024",
    label: "1.6B+ Data Points",
    color: "#10b981"
  },
  {
    year: "Phase 4",
    title: "VibeOS Predictive Culture",
    desc: "Generative People Science. Leveraging real-time sentiment analysis, autonomous manager coaching, and predictive burnout warnings to guide managers before issues manifest.",
    stat: "Present Day",
    label: "Real-time AI OS",
    color: "#a855f7"
  }
];

const QUADRANTS = [
  {
    id: "top-right",
    title: "Peak Performance",
    desc: "High Engagement & High Performance Confidence",
    behavior: "Employees are energized, aligned with company mission, and confident in execution. Growth is organic and attrition is negligible.",
    strategy: "Focus on long-term leadership tracks, cross-departmental innovation projects, and healthy work-life integration to sustain momentum without burnout.",
    icon: FiZap,
    metrics: { engagement: "92%", confidence: "89%", risk: "Negligible" },
    action: "Provide growth routes & prevent fatigue",
    color: "rgba(16, 185, 129, 0.15)",
    textColor: "#10b981",
    position: "Top Right"
  },
  {
    id: "top-left",
    title: "Under-aligned Potential",
    desc: "Low Engagement & High Performance Confidence",
    behavior: "High outputs but low connection. Employees are skilled and getting work done, but feel isolated, unrecognized, or disconnected from purpose.",
    strategy: "Conduct focus groups on manager relations, introduce peer recognition loops, and run DEI initiatives. Re-align leadership transparency to rebuild trust.",
    icon: FiAlertTriangle,
    metrics: { engagement: "48%", confidence: "86%", risk: "High Attrition" },
    action: "Foster voice, trust & recognition",
    color: "rgba(245, 158, 11, 0.15)",
    textColor: "#f59e0b",
    position: "Top Left"
  },
  {
    id: "bottom-right",
    title: "Engaged Support",
    desc: "High Engagement & Low Performance Confidence",
    behavior: "High loyalty and great cultural alignment, but execution is blocked. Employees feel supported but lack clarity, tools, training, or clear direction.",
    strategy: "Implement clear performance management tracks, align goals (OKRs), and run skills coach modules. Optimize workflow tools and clarify roles.",
    icon: FiCompass,
    metrics: { engagement: "85%", confidence: "41%", risk: "Stagnation" },
    action: "Clarify expectations & train managers",
    color: "rgba(59, 130, 246, 0.15)",
    textColor: "#3b82f6",
    position: "Bottom Right"
  },
  {
    id: "bottom-left",
    title: "Critical Risk",
    desc: "Low Engagement & Low Performance Confidence",
    behavior: "Burnout, confusion, and low morale. Employees are struggling to perform and have lost connection to the organization's goals.",
    strategy: "Immediate diagnostic pulse surveys, targeted manager-level intervention, role re-scoping, and personalized coaching tracks. Re-establish basic psychological safety.",
    icon: FiActivity,
    metrics: { engagement: "38%", confidence: "34%", risk: "Immediate Action" },
    action: "Diagnostics & rebuild safety",
    color: "rgba(239, 68, 68, 0.15)",
    textColor: "#ef4444",
    position: "Bottom Left"
  }
];

const BENTO_AREAS = [
  {
    id: "engage",
    title: "Rigorous Surveys",
    subtitle: "In Engage",
    desc: "Designed by Ph.D. People Scientists and validated for psychometric accuracy. Pinpoint specific cultural drivers, not generic summaries.",
    icon: FiActivity,
    theme: "purple",
    details: {
      metrics: ["99% Survey Validation", "DEI & Sentiment Modules", "Pulse & Attrition Predictor"],
      surveys: ["Onboarding & Offboarding Tracker", "Annual Engagement Diagnostic", "Workplace Inclusion Pulse"],
      quote: "Our surveys pinpoint drivers unique to our team, enabling us to act with precision."
    }
  },
  {
    id: "perform",
    title: "Fair Performance",
    subtitle: "In Perform",
    desc: "Improve execution, reduce evaluation bias, and fuel career growth. Integrates continuous 360 feedback and calibration protocols.",
    icon: FiSliders,
    theme: "blue",
    details: {
      metrics: ["30% Reduction in Bias", "Continuous 360 Feedback", "Calibrated Talent Metrics"],
      surveys: ["Manager Effectiveness Assessment", "Peer & Self Calibration Review", "Goal Alignment (OKRs) Synchronizer"],
      quote: "Perform shifts reviews from retrospective metrics to continuous professional growth."
    }
  },
  {
    id: "coach",
    title: "AI Action Coach",
    subtitle: "In AI Coach",
    desc: "Personalized, contextual micro-coaching delivered to managers, grounding feedback into daily Slack or Teams workflows.",
    icon: FiZap,
    theme: "amber",
    details: {
      metrics: ["84% Retention Uplift", "Interactive Workspace Integration", "Sentiment-guided Actions"],
      surveys: ["Weekly Leadership Micro-Lessons", "Real-Time Contextual Recommendations", "Conversational AI Coach Interface"],
      quote: "Having automated coaching cards in our team workspace keeps managers active and accountable."
    }
  }
];

const INDUSTRY_INSIGHTS = {
  All: [10, 25, 45, 60, 78, 92],
  Tech: [12, 30, 52, 70, 85, 96],
  Finance: [8, 22, 38, 55, 74, 88],
  Healthcare: [6, 18, 35, 48, 68, 82]
};

const EXPERTS = [
  {
    name: "Dr. Sarah Lin",
    role: "Chief People Scientist",
    bio: "Dr. Lin holds a Ph.D. in Industrial-Organizational Psychology from Stanford. She has spent 15 years research-modeling organizational behavior, focusing on the interplay between employee sentiment and financial performance.",
    expertise: "Behavioral Analytics",
    publications: "Journal of Management Studies, Harvard Business Review",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300&h=300"
  },
  {
    name: "Marcus Vance",
    role: "Director of Research",
    bio: "Marcus leads the data lake initiative, studying macro workforce patterns across 1.6 billion survey responses. He specializes in predictive analytics for attrition, structural burnout, and culture transformation.",
    expertise: "Predictive Modeling",
    publications: "Workforce Dynamics Monthly, ACM Data Science Review",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300&h=300"
  },
  {
    name: "Elena Rostova",
    role: "Principal AI Research Scientist",
    bio: "Elena oversees the algorithm engineering behind AI Coach and comment summarization. Her research combines natural language processing with workplace psychology to deliver fair, privacy-first manager guidance.",
    expertise: "NLP & Workplace Ethics",
    publications: "IEEE Transactions on Affective Computing, NeurIPS Workshops",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300&h=300"
  }
];

const TESTIMONIALS = [
  {
    quote: "We couldn't have done it without Culture Amp's leadership. They're not just giving you the information and saying, 'Good luck. Figure it out.' You're getting a real People Scientist – an IO psychologist who is trained in this.",
    author: "Lyndsey Benson",
    title: "SVP of Human Resources at Steve Madden",
    tag: "Enterprise SaaS"
  },
  {
    quote: "The People Scientists have changed the way we look at the process as a whole. It's not just about data, it's about human psychology and what makes people tick. Culture Amp has helped us rethink our approach and change our internal Engagement practice.",
    author: "Carly Anderson",
    title: "Human Resources Specialist at ZS Associates",
    tag: "Consulting Operations"
  },
  {
    quote: "Having a dedicated People Scientist has been a game changer for us. Our People Scientist was able to come in & immediately establish credibility with our CHRO based on the unique insights shared. The value has been an unbiased point of view, a dedicated resource, and telling of a data story.",
    author: "Tess Ausman",
    title: "Director of Organizational Development, LendingTree",
    tag: "Financial Platform"
  }
];

export const PeopleScience: React.FC = () => {
  // Active states
  const [activeMilestone, setActiveMilestone] = useState(2);
  const [activeQuadrant, setActiveQuadrant] = useState("top-right");
  const [activeBento, setActiveBento] = useState<string | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState<"All" | "Tech" | "Finance" | "Healthcare">("All");
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [beforeAfterVal, setBeforeAfterVal] = useState(50); // 0 (Before) to 100 (After)
  const [emailInput, setEmailInput] = useState("");
  const [demoStatus, setDemoStatus] = useState<"idle" | "success" | "error">("idle");
  const [activeExpert, setActiveExpert] = useState<number | null>(null);

  const [userInteractedMilestone, setUserInteractedMilestone] = useState(false);
  const [userInteractedQuadrant, setUserInteractedQuadrant] = useState(false);
  const [userInteractedTestimonial, setUserInteractedTestimonial] = useState(false);

  // Animated counters
  const [counters, setCounters] = useState({ responses: 0, customers: 0, scientists: 0 });

  // Auto-rotating milestones (Timeline)
  useEffect(() => {
    if (userInteractedMilestone) return;
    const interval = setInterval(() => {
      setActiveMilestone((prev) => (prev + 1) % 4);
    }, 4500);
    return () => clearInterval(interval);
  }, [userInteractedMilestone]);

  // Auto-rotating quadrants
  useEffect(() => {
    if (userInteractedQuadrant) return;
    const quads = ["top-left", "top-right", "bottom-left", "bottom-right"];
    const interval = setInterval(() => {
      setActiveQuadrant((prev) => {
        const nextIndex = (quads.indexOf(prev) + 1) % quads.length;
        return quads[nextIndex];
      });
    }, 5500);
    return () => clearInterval(interval);
  }, [userInteractedQuadrant]);

  // Auto-rotating testimonials
  useEffect(() => {
    if (userInteractedTestimonial) return;
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 3);
    }, 6000);
    return () => clearInterval(interval);
  }, [userInteractedTestimonial]);

  useEffect(() => {
    // Run counters up
    const duration = 2000;
    const steps = 50;
    const interval = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setCounters({
        responses: Math.min(Math.round((1.6 * currentStep) / steps * 10) / 10, 1.6),
        customers: Math.round((6500 * currentStep) / steps),
        scientists: Math.round((200 * currentStep) / steps)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes("@")) {
      setDemoStatus("error");
      setTimeout(() => setDemoStatus("idle"), 4000);
      return;
    }
    setDemoStatus("success");
    setEmailInput("");
    setTimeout(() => setDemoStatus("idle"), 4000);
  };

  // Quadrant coordinate helpers for rendering visual map
  const getQuadrantInfo = (id: string) => QUADRANTS.find((q) => q.id === id)!;
  const currentQuadrantData = getQuadrantInfo(activeQuadrant);

  return (
    <div className="ps-page">
      {/* 1. HERO SECTION */}
      <section className="ps-hero">
        <div className="ps-hero-bg">
          <div className="ps-hero-glow glow-1"></div>
          <div className="ps-hero-glow glow-2"></div>
          <div className="ps-hero-grid"></div>
        </div>

        <div className="ps-hero-container">
          <div className="ps-hero-content">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="ps-hero-badge"
            >
              <FiZap className="icon" />
              <span>Scientific Credibility at Scale</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="ps-hero-title"
            >
              Elevate performance culture with <span>People Science</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="ps-hero-desc"
            >
              Understanding how people operate at work is a science. We've spent years mastering it – and building it into everything we do – so you can create great cultures that achieve great results.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="ps-hero-ctas"
            >
              <a href="#demo" className="ps-btn ps-btn-primary">
                Book a Demonstration <FiArrowRight />
              </a>
              <a href="#methodology" className="ps-btn ps-btn-secondary">
                Explore Frameworks
              </a>
            </motion.div>
          </div>

          <div className="ps-hero-visual">
            {/* Interactive Stats Cards */}
            <div className="ps-stats-grid">
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="ps-stat-card card-purple"
              >
                <div className="card-header">
                  <FiDatabase className="card-icon" />
                  <span className="card-tag">Core Data Lake</span>
                </div>
                <div className="card-val">{counters.responses}B+</div>
                <div className="card-lbl">Survey Responses Mapped</div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="ps-stat-card card-blue"
              >
                <div className="card-header">
                  <FiUsers className="card-icon" />
                  <span className="card-tag">Active Platforms</span>
                </div>
                <div className="card-val">{counters.customers.toLocaleString()}+</div>
                <div className="card-lbl">Companies Powering Culture</div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="ps-stat-card card-teal"
              >
                <div className="card-header">
                  <FiActivity className="card-icon" />
                  <span className="card-tag">Expert Density</span>
                </div>
                <div className="card-val">{counters.scientists}+</div>
                <div className="card-lbl">Ph.D. Experts & Psychologists</div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="ps-stat-card card-amber"
              >
                <div className="card-header">
                  <FiAward className="card-icon" />
                  <span className="card-tag">Validation Index</span>
                </div>
                <div className="card-val">99.2%</div>
                <div className="card-lbl">Predictive Accuracy Rate</div>
              </motion.div>
            </div>

            {/* Float visual indicators */}
            <div className="floating-bubble bubble-1"></div>
            <div className="floating-bubble bubble-2"></div>
          </div>
        </div>
      </section>

      {/* 2. RESEARCH FOUNDATION (3 pillars & timeline) */}
      <section className="ps-foundation" id="foundation">
        <div className="container">
          <div className="ps-section-header">
            <h2 className="ps-section-title">Deeply Embedded People Science</h2>
            <p className="ps-section-subtitle">
              We translate raw organizational data into behavioral models, empowering leaders to make structural changes that scale performance.
            </p>
          </div>

          <div className="ps-pillars-grid">
            <div className="ps-pillar-card">
              <div className="pillar-icon-wrapper purple">
                <FiUsers />
              </div>
              <h3 className="pillar-title">Partnering with customers</h3>
              <p className="pillar-desc">
                With deep knowledge of HR, organizational psychology, and hands-on platform expertise, we partner with you to ensure your Culture Amp data drives real change.
              </p>
            </div>

            <div className="ps-pillar-card">
              <div className="pillar-icon-wrapper blue">
                <FiBookOpen />
              </div>
              <h3 className="pillar-title">Shaping the field with research</h3>
              <p className="pillar-desc">
                We combine our data lake of over 1.6 billion employee survey responses with insights from external datasets to conduct research that advances the field.
              </p>
            </div>

            <div className="ps-pillar-card">
              <div className="pillar-icon-wrapper teal">
                <FiSliders />
              </div>
              <h3 className="pillar-title">Powering the product</h3>
              <p className="pillar-desc">
                We embed our science directly into Culture Amp's AI and products, ultimately bringing human expertise to deliver clear insights and help drive meaningful change.
              </p>
            </div>
          </div>

          {/* Interactive Evolution Timeline */}
          <div className="ps-timeline-wrapper">
            <div className="timeline-title-area">
              <h3>Scientific Evolution Timeline</h3>
              <p>Explore how our methodologies have evolved from standard survey tools to continuous AI systems.</p>
            </div>

            <div className="timeline-slider-nav">
              {MILESTONES.map((m, idx) => (
                <button
                  key={idx}
                  className={`timeline-nav-btn ${idx === activeMilestone ? "active" : ""}`}
                  onClick={() => {
                    setActiveMilestone(idx);
                    setUserInteractedMilestone(true);
                  }}
                  style={{ "--btn-theme": m.color } as React.CSSProperties}
                >
                  <span className="dot"></span>
                  <span className="lbl">{m.year}</span>
                </button>
              ))}
            </div>

            <div className="timeline-content-box">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMilestone}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="timeline-slide"
                >
                  <div className="slide-details">
                    <span className="slide-tag" style={{ backgroundColor: MILESTONES[activeMilestone].color + "20", color: MILESTONES[activeMilestone].color }}>
                      {MILESTONES[activeMilestone].label}
                    </span>
                    <h4 className="slide-title">{MILESTONES[activeMilestone].title}</h4>
                    <p className="slide-desc">{MILESTONES[activeMilestone].desc}</p>
                  </div>
                  <div className="slide-highlight" style={{ borderColor: MILESTONES[activeMilestone].color }}>
                    <span className="highlight-stat">{MILESTONES[activeMilestone].stat}</span>
                    <span className="highlight-lbl">Primary Focus Period</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SCIENTIFIC METHODOLOGY (Interactive PCQ Quadrant) */}
      <section className="ps-methodology" id="methodology">
        <div className="container">
          <div className="ps-section-header">
            <h2 className="ps-section-title">Build a roadmap to Peak Performance</h2>
            <p className="ps-section-subtitle">
              Backed by people science research, the Performance Culture Quadrant (PCQ) visualizes the relationship between workplace engagement and performance confidence.
            </p>
          </div>

          <div className="pcq-grid">
            <div className="pcq-visual-map">
              {/* Axis Labels */}
              <div className="axis-label-y">Performance Confidence →</div>
              <div className="axis-label-x">Employee Engagement →</div>

              {/* The 4 Quadrants Grid */}
              <div className="quadrants-container">
                {/* Top Left */}
                <button
                  onClick={() => {
                    setActiveQuadrant("top-left");
                    setUserInteractedQuadrant(true);
                  }}
                  className={`quadrant-block top-left ${activeQuadrant === "top-left" ? "active" : ""}`}
                >
                  <span className="quadrant-position">Top Left</span>
                  <span className="quadrant-title">Under-aligned Potential</span>
                  <FiAlertTriangle className="quadrant-icon warn" />
                </button>

                {/* Top Right */}
                <button
                  onClick={() => {
                    setActiveQuadrant("top-right");
                    setUserInteractedQuadrant(true);
                  }}
                  className={`quadrant-block top-right ${activeQuadrant === "top-right" ? "active" : ""}`}
                >
                  <span className="quadrant-position">Top Right</span>
                  <span className="quadrant-title">Peak Performance</span>
                  <FiZap className="quadrant-icon success" />
                </button>

                {/* Bottom Left */}
                <button
                  onClick={() => {
                    setActiveQuadrant("bottom-left");
                    setUserInteractedQuadrant(true);
                  }}
                  className={`quadrant-block bottom-left ${activeQuadrant === "bottom-left" ? "active" : ""}`}
                >
                  <span className="quadrant-position">Bottom Left</span>
                  <span className="quadrant-title">Critical Risk</span>
                  <FiActivity className="quadrant-icon danger" />
                </button>

                {/* Bottom Right */}
                <button
                  onClick={() => {
                    setActiveQuadrant("bottom-right");
                    setUserInteractedQuadrant(true);
                  }}
                  className={`quadrant-block bottom-right ${activeQuadrant === "bottom-right" ? "active" : ""}`}
                >
                  <span className="quadrant-position">Bottom Right</span>
                  <span className="quadrant-title">Engaged Support</span>
                  <FiCompass className="quadrant-icon info" />
                </button>
              </div>
            </div>

            <div className="pcq-details-panel">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeQuadrant}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="pcq-details-card"
                  style={{ borderLeftColor: currentQuadrantData.textColor }}
                >
                  <div className="details-header">
                    <span className="details-position">{currentQuadrantData.position} Quadrant</span>
                    <h3 className="details-title" style={{ color: currentQuadrantData.textColor }}>
                      {currentQuadrantData.title}
                    </h3>
                  </div>

                  <p className="details-behavior">
                    <strong>Workplace Behavior: </strong>
                    {currentQuadrantData.behavior}
                  </p>

                  <p className="details-strategy">
                    <strong>Science-backed Strategy: </strong>
                    {currentQuadrantData.strategy}
                  </p>

                  <div className="details-metrics-row">
                    <div className="metric-box">
                      <span className="val">{currentQuadrantData.metrics.engagement}</span>
                      <span className="lbl">Target Engagement</span>
                    </div>
                    <div className="metric-box">
                      <span className="val">{currentQuadrantData.metrics.confidence}</span>
                      <span className="lbl">Performance Index</span>
                    </div>
                    <div className="metric-box">
                      <span className="val">{currentQuadrantData.metrics.risk}</span>
                      <span className="lbl">Attrition Risk</span>
                    </div>
                  </div>

                  <div className="details-action-banner" style={{ backgroundColor: currentQuadrantData.color }}>
                    <FiCheckCircle className="banner-icon" style={{ color: currentQuadrantData.textColor }} />
                    <span className="banner-txt">
                      <strong>Immediate Action Plan: </strong> {currentQuadrantData.action}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CORE RESEARCH AREAS (Bento Grid with Category Drawers) */}
      <section className="ps-bento" id="bento">
        <div className="container">
          <div className="ps-section-header">
            <h2 className="ps-section-title">End-to-End Culture Integration</h2>
            <p className="ps-section-subtitle">
              We integrate People Science across your organization's entire lifecycle. Select a section to preview survey questions, metrics, and templates.
            </p>
          </div>

          <div className="bento-grid">
            {BENTO_AREAS.map((area) => {
              const Icon = area.icon;
              return (
                <div
                  key={area.id}
                  className={`bento-card theme-${area.theme} ${activeBento === area.id ? "expanded" : ""}`}
                  onClick={() => setActiveBento(activeBento === area.id ? null : area.id)}
                >
                  <div className="bento-card-main">
                    <div className="bento-icon-box">
                      <Icon />
                    </div>
                    <div className="bento-card-body">
                      <span className="bento-tag">{area.subtitle}</span>
                      <h3 className="bento-title">{area.title}</h3>
                      <p className="bento-desc">{area.desc}</p>
                    </div>
                    <button className="bento-expand-btn">
                      {activeBento === area.id ? "Collapse Details" : "Explore In-depth"} <FiArrowRight className="arrow" />
                    </button>
                  </div>

                  <AnimatePresence>
                    {activeBento === area.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bento-card-expanded-content"
                      >
                        <div className="expanded-divider"></div>
                        <div className="expanded-body">
                          <div className="expanded-column">
                            <h4>Scientist-Validated Metrics</h4>
                            <ul>
                              {area.details.metrics.map((m, i) => (
                                <li key={i}><FiCheck className="bullet" /> {m}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="expanded-column">
                            <h4>Standard Templates Included</h4>
                            <ul>
                              {area.details.surveys.map((s, i) => (
                                <li key={i}><FiCheck className="bullet" /> {s}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="expanded-quote">
                            <p>"{area.details.quote}"</p>
                            <span>Verified HR Director Review</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. RESEARCH INSIGHTS & FINDINGS (SVG Chart & Filters) */}
      <section className="ps-insights" id="insights">
        <div className="container">
          <div className="ps-section-header">
            <h2 className="ps-section-title">Research Insights & Attrition Trends</h2>
            <p className="ps-section-subtitle">
              Interactive benchmark curves showing how organizations running People Science programs mitigate turnover risk compared to global standards.
            </p>
          </div>

          <div className="insights-chart-container">
            <div className="chart-controls">
              <span className="control-label">Select Industry Benchmark:</span>
              <div className="control-buttons">
                {(["All", "Tech", "Finance", "Healthcare"] as const).map((ind) => (
                  <button
                    key={ind}
                    className={`control-btn ${selectedIndustry === ind ? "active" : ""}`}
                    onClick={() => setSelectedIndustry(ind)}
                  >
                    {ind}
                  </button>
                ))}
              </div>
            </div>

            <div className="chart-viewport">
              <svg className="insights-svg" viewBox="0 0 800 300">
                {/* Grid Lines */}
                <line x1="50" y1="50" x2="750" y2="50" className="grid-line" />
                <line x1="50" y1="125" x2="750" y2="125" className="grid-line" />
                <line x1="50" y1="200" x2="750" y2="200" className="grid-line" />
                <line x1="50" y1="275" x2="750" y2="275" className="grid-line" />

                {/* X Axis Months */}
                <text x="50" y="295" className="axis-text">Month 0</text>
                <text x="190" y="295" className="axis-text">Month 3</text>
                <text x="330" y="295" className="axis-text">Month 6</text>
                <text x="470" y="295" className="axis-text">Month 12</text>
                <text x="610" y="295" className="axis-text">Month 18</text>
                <text x="750" y="295" className="axis-text">Month 24</text>

                {/* Y Axis Metrics */}
                <text x="40" y="55" className="axis-text align-right">100%</text>
                <text x="40" y="130" className="axis-text align-right">50%</text>
                <text x="40" y="205" className="axis-text align-right">25%</text>
                <text x="40" y="280" className="axis-text align-right">0%</text>

                {/* Static Global Average Curve (Dashed red) */}
                <path
                  d="M 50,80 Q 200,120 350,180 T 750,260"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="2"
                  strokeDasharray="4 6"
                  className="benchmark-path"
                />
                <text x="620" y="240" fill="#ef4444" className="path-label">Global Baseline</text>

                {/* Dynamic VibeOS Curve */}
                <motion.path
                  d={`M 50,${275 - INDUSTRY_INSIGHTS[selectedIndustry][0] * 2.2} 
                     C 200,${275 - INDUSTRY_INSIGHTS[selectedIndustry][1] * 2.2} 
                       400,${275 - INDUSTRY_INSIGHTS[selectedIndustry][2] * 2.2} 
                       550,${275 - INDUSTRY_INSIGHTS[selectedIndustry][3] * 2.2} 
                       650,${275 - INDUSTRY_INSIGHTS[selectedIndustry][4] * 2.2} 
                       750,${275 - INDUSTRY_INSIGHTS[selectedIndustry][5] * 2.2}`}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3.5"
                  animate={{ d: `M 50,${275 - INDUSTRY_INSIGHTS[selectedIndustry][0] * 2.2} 
                                 C 200,${275 - INDUSTRY_INSIGHTS[selectedIndustry][1] * 2.2} 
                                   400,${275 - INDUSTRY_INSIGHTS[selectedIndustry][2] * 2.2} 
                                   550,${275 - INDUSTRY_INSIGHTS[selectedIndustry][3] * 2.2} 
                                   650,${275 - INDUSTRY_INSIGHTS[selectedIndustry][4] * 2.2} 
                                   750,${275 - INDUSTRY_INSIGHTS[selectedIndustry][5] * 2.2}` }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
                <text x="600" y="75" fill="#10b981" className="path-label bold">VibeOS Coordinated Program</text>

                {/* Data Points */}
                {INDUSTRY_INSIGHTS[selectedIndustry].map((val, idx) => {
                  const xCoords = [50, 190, 330, 470, 610, 750];
                  return (
                    <g key={idx}>
                      <motion.circle
                        cx={xCoords[idx]}
                        cy={275 - val * 2.2}
                        r="5"
                        fill="#10b981"
                        stroke="#ffffff"
                        strokeWidth="1.5"
                        animate={{ cy: 275 - val * 2.2 }}
                        transition={{ duration: 0.5 }}
                      />
                      <motion.text
                        x={xCoords[idx]}
                        y={275 - val * 2.2 - 12}
                        className="value-label"
                        animate={{ y: 275 - val * 2.2 - 12 }}
                      >
                        {val}%
                      </motion.text>
                    </g>
                  );
                })}
              </svg>
            </div>

            <div className="chart-legend">
              <div className="legend-item">
                <span className="dot global"></span>
                <span>Global Baseline (Average attrition curve over 24 months)</span>
              </div>
              <div className="legend-item">
                <span className="dot vibe"></span>
                <span>VibeOS Program (Average retention metrics across 6,500+ orgs)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. EXPERTS & ADVISORS (Interactive Profile Grid) */}
      <section className="ps-experts" id="experts">
        <div className="container">
          <div className="ps-section-header">
            <h2 className="ps-section-title">Meet Our Academic Board</h2>
            <p className="ps-section-subtitle">
              Our products are guided and validated by world-renowned scientists in organizational sociology, natural language processing, and statistics.
            </p>
          </div>

          <div className="experts-grid">
            {EXPERTS.map((expert, idx) => (
              <div
                key={idx}
                className={`expert-card ${activeExpert === idx ? "active" : ""}`}
                onClick={() => setActiveExpert(activeExpert === idx ? null : idx)}
              >
                <div className="expert-avatar-area">
                  <img src={expert.image} alt={expert.name} className="expert-img" />
                  <span className="expert-tag">{expert.expertise}</span>
                </div>

                <div className="expert-meta">
                  <h3 className="expert-name">{expert.name}</h3>
                  <span className="expert-role">{expert.role}</span>
                </div>

                <button className="expert-read-btn">
                  {activeExpert === idx ? "Collapse Credentials" : "View Research & Bio"}
                </button>

                <AnimatePresence>
                  {activeExpert === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="expert-bio-drawer"
                    >
                      <div className="drawer-divider"></div>
                      <p className="expert-bio-txt">{expert.bio}</p>
                      <div className="expert-pubs">
                        <strong>Selected Publications:</strong>
                        <span>{expert.publications}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. RESEARCH IMPACT (Before/After Transformation Slider) */}
      <section className="ps-impact" id="impact">
        <div className="container">
          <div className="ps-section-header">
            <h2 className="ps-section-title">Measurable Organizational Impact</h2>
            <p className="ps-section-subtitle">
              Adjust the slider below to contrast standard HR environments with companies running validated People Science frameworks.
            </p>
          </div>

          <div className="impact-comparison-box">
            {/* Slider Controls */}
            <div className="comparison-slider-wrapper">
              <span className="slider-label">Traditional Operations</span>
              <input
                type="range"
                min="0"
                max="100"
                value={beforeAfterVal}
                onChange={(e) => setBeforeAfterVal(Number(e.target.value))}
                className="comparison-range"
              />
              <span className="slider-label">People Science Aligned</span>
            </div>

            <div className="comparison-view">
              {/* Left Side: Before (Traditional) */}
              <div
                className="comparison-column before-col"
                style={{ opacity: Math.max(0.15, (100 - beforeAfterVal) / 100) }}
              >
                <div className="column-title">Traditional HR</div>
                <div className="column-stats">
                  <div className="stat-row">
                    <span className="val">54%</span>
                    <span className="lbl">Average Employee Engagement</span>
                  </div>
                  <div className="stat-row">
                    <span className="val warn">22%</span>
                    <span className="lbl">Annual Voluntary Attrition</span>
                  </div>
                  <div className="stat-row">
                    <span className="val">41%</span>
                    <span className="lbl">Manager Confidence Score</span>
                  </div>
                </div>
                <div className="column-badge badge-red">
                  <FiAlertTriangle /> Lagging Indicators & Manual Diagnostics
                </div>
              </div>

              {/* Right Side: After (VibeOS Aligned) */}
              <div
                className="comparison-column after-col"
                style={{ opacity: Math.max(0.15, beforeAfterVal / 100) }}
              >
                <div className="column-title text-green">VibeOS Platform</div>
                <div className="column-stats">
                  <div className="stat-row">
                    <span className="val text-green">87%</span>
                    <span className="lbl">Average Employee Engagement</span>
                  </div>
                  <div className="stat-row">
                    <span className="val text-green">8%</span>
                    <span className="lbl">Annual Voluntary Attrition</span>
                  </div>
                  <div className="stat-row">
                    <span className="val text-green">92%</span>
                    <span className="lbl">Manager Confidence Score</span>
                  </div>
                </div>
                <div className="column-badge badge-green">
                  <FiCheckCircle /> Real-Time Analytics & Contextual Coaching
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial Quote Rotator */}
          <div className="ps-testimonials-wrapper">
            <div className="testimonial-header">
              <span className="eyebrow">Enterprise Case Studies</span>
              <h3>What Leadership Says About Us</h3>
            </div>

            <div className="testimonial-body">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="testimonial-card"
                >
                  <p className="quote-txt">"{TESTIMONIALS[activeTestimonial].quote}"</p>
                  <div className="quote-author-info">
                    <strong>{TESTIMONIALS[activeTestimonial].author}</strong>
                    <span>{TESTIMONIALS[activeTestimonial].title}</span>
                  </div>
                  <span className="quote-tag">{TESTIMONIALS[activeTestimonial].tag}</span>
                </motion.div>
              </AnimatePresence>

              <div className="testimonial-controls">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    className={`testimonial-dot ${i === activeTestimonial ? "active" : ""}`}
                    onClick={() => {
                      setActiveTestimonial(i);
                      setUserInteractedTestimonial(true);
                    }}
                  ></button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. INTERACTIVE VISUAL SHOWCASE (SaaS Mockup Dashboard) */}
      <section className="ps-showcase" id="showcase">
        <div className="container">
          <div className="ps-section-header">
            <h2 className="ps-section-title">The Scientist's Workspace</h2>
            <p className="ps-section-subtitle">
              A glimpse inside the VibeOS administrative dashboard, demonstrating sentiment tracking, driver mapping, and recommendation cards.
            </p>
          </div>

          <div className="showcase-dashboard">
            <div className="dashboard-sidebar">
              <div className="sidebar-logo">VibeOS Science</div>
              <ul className="sidebar-menu">
                <li className="active"><FiGrid /> Dashboard</li>
                <li><FiActivity /> Engagement Map</li>
                <li><FiSliders /> Calibration</li>
                <li><FiZap /> AI Recommendations</li>
              </ul>
            </div>

            <div className="dashboard-main">
              <div className="dashboard-header">
                <h3>Global Engagement Diagnostics</h3>
                <div className="header-status">
                  <span className="dot"></span> Active Research Pool
                </div>
              </div>

              <div className="dashboard-grid">
                <div className="dashboard-card card-large">
                  <h4>Engagement Sentiment Drivers</h4>
                  <div className="mock-chart">
                    {/* Visual columns showing bars */}
                    <div className="bar-wrapper">
                      <span className="bar-lbl">Purpose</span>
                      <div className="bar-track"><div className="bar-fill" style={{ width: "88%" }}></div></div>
                      <span className="bar-pct">88%</span>
                    </div>
                    <div className="bar-wrapper">
                      <span className="bar-lbl">Voice</span>
                      <div className="bar-track"><div className="bar-fill" style={{ width: "74%" }}></div></div>
                      <span className="bar-pct">74%</span>
                    </div>
                    <div className="bar-wrapper">
                      <span className="bar-lbl">Recognition</span>
                      <div className="bar-track"><div className="bar-fill" style={{ width: "42%" }}></div></div>
                      <span className="bar-pct">42%</span>
                    </div>
                    <div className="bar-wrapper">
                      <span className="bar-lbl">Wellbeing</span>
                      <div className="bar-track"><div className="bar-fill" style={{ width: "81%" }}></div></div>
                      <span className="bar-pct">81%</span>
                    </div>
                  </div>
                </div>

                <div className="dashboard-card card-small">
                  <h4>AI Alert Flag</h4>
                  <div className="alert-box">
                    <FiAlertTriangle className="alert-icon" />
                    <div className="alert-body">
                      <h5>High Burnout Signal</h5>
                      <p>Product Engineering Group shows elevated churn indicators. Workload satisfaction decreased by 12%.</p>
                    </div>
                  </div>
                  <div className="alert-action-btn">
                    Launch Pulse Survey <FiArrowRight />
                  </div>
                </div>

                <div className="dashboard-card card-full">
                  <h4>Ph.D. Validated Action Cards</h4>
                  <div className="action-cards-list">
                    <div className="action-item-card">
                      <FiCheckCircle className="chk-icon" />
                      <div className="item-body">
                        <h6>Schedule Career Development Checkpoints</h6>
                        <p>Perform has identified 3 career path bottlenecks in Marketing Teams.</p>
                      </div>
                      <span className="item-tag bg-blue">Perform</span>
                    </div>
                    <div className="action-item-card">
                      <FiCheckCircle className="chk-icon" />
                      <div className="item-body">
                        <h6>Enable Contextual Feedback Prompts</h6>
                        <p>Deliver alignment notifications via Slack during sprint planning cycles.</p>
                      </div>
                      <span className="item-tag bg-purple">AI Coach</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. TRUST & RECOGNITION (Partner Badges & Accreditations) */}
      <section className="ps-trust" id="trust">
        <div className="container">
          <div className="trust-inner">
            <span className="eyebrow">Rigorous Compliance & Standards</span>
            <h3>Enterprise-Grade Trust Architected In</h3>

            <div className="badges-grid">
              <div className="badge-item">
                <FiShield className="badge-icon" />
                <strong>SOC2 Type II</strong>
                <span>Certified Data Security</span>
              </div>
              <div className="badge-item">
                <FiShield className="badge-icon" />
                <strong>GDPR & HIPAA</strong>
                <span>Privacy Standards Compliant</span>
              </div>
              <div className="badge-item">
                <FiShield className="badge-icon" />
                <strong>ISO 27001</strong>
                <span>Information Management</span>
              </div>
              <div className="badge-item">
                <FiShield className="badge-icon" />
                <strong>SOC1 Type I</strong>
                <span>Continuous Compliance</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. FINAL CTA (Gradient Input block with notifications) */}
      <section className="ps-cta" id="demo">
        <div className="ps-cta-glow"></div>
        <div className="container">
          <div className="cta-inner-card">
            <div className="cta-content">
              <h2>Invest in your people and create impact</h2>
              <p>
                Partner with VibeOS and deploy scientist-backed culture transformations. Get in touch with our team of IO Psychologists for a personalized diagnostic demo.
              </p>
            </div>

            <form className="cta-form" onSubmit={handleDemoSubmit}>
              <div className="input-group">
                <FiMail className="input-icon" />
                <input
                  type="email"
                  placeholder="Enter corporate email..."
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="cta-input"
                  required
                />
                <button type="submit" className="cta-submit-btn">
                  Get Started
                </button>
              </div>

              <AnimatePresence>
                {demoStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="form-message msg-success"
                  >
                    <FiCheckCircle /> Corporate diagnostic request submitted. A specialist will follow up shortly.
                  </motion.div>
                )}
                {demoStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="form-message msg-error"
                  >
                    <FiAlertTriangle /> Please enter a valid corporate email.
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

// Also define missing subcomponents for compiling compatibility
const FiDatabase: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    stroke="currentColor"
    fill="none"
    strokeWidth="2"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
    <path d="M3 5V19A9 3 0 0 0 21 19V5"></path>
    <path d="M3 12A9 3 0 0 0 21 12"></path>
  </svg>
);

export default PeopleScience;
