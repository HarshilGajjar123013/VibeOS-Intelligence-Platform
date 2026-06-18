"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiZap,
  FiArrowRight,
  FiCheckCircle,
  FiAlertTriangle,
  FiCompass,
  FiAward,
  FiBookOpen,
  FiSliders,
  FiUsers,
  FiActivity,
  FiMail,
  FiMessageSquare,
  FiTrendingUp,
  FiCheck,
  FiX,
  FiShield,
  FiSmile,
  FiLayers,
  FiFileText
} from "react-icons/fi";
import "./VibeIndexMatrix.scss";

// Static details of the 4 quadrants based on Culture Amp research
const QUADRANT_DETAILS = [
  {
    id: "peak",
    title: "Peak Performance",
    subtitle: "High Engagement & High Performance Confidence",
    desc: "Peak cultures have high belief in the vision and strategy and are energetic in their intent to help achieve it.",
    outcome: "Organizations are stacked with 21% more high-performers, showing exceptional execution metrics and an 88% retention rate.",
    color: "#10b981",
    bgColor: "rgba(16, 185, 129, 0.08)",
    metrics: { engagement: "91%", confidence: "88%", retention: "88%" }
  },
  {
    id: "skepticism",
    title: "Engaged Skepticism",
    subtitle: "High Engagement & Low Performance Confidence",
    desc: "Engaged skepticism cultures are dedicated and energized, but they are skeptical about the organization's capacity to succeed.",
    outcome: "Teams care deeply about the culture and mission, but execution is blocked due to lack of tool clarity, alignment, or resources.",
    color: "#3b82f6",
    bgColor: "rgba(59, 130, 246, 0.08)",
    metrics: { engagement: "84%", confidence: "42%", retention: "76%" }
  },
  {
    id: "strained",
    title: "Strained",
    subtitle: "Low Engagement & High Performance Confidence",
    desc: "Strained cultures lack energy for the work it takes to achieve and sustain high performance, but remain confident the company will succeed.",
    outcome: "High short-term output, but severe burnout risk. Attrition rates tend to increase as employees feel disconnected from recognition and purpose.",
    color: "#f59e0b",
    bgColor: "rgba(245, 158, 11, 0.08)",
    metrics: { engagement: "49%", confidence: "82%", retention: "68%" }
  },
  {
    id: "disconnected",
    title: "Disconnected",
    subtitle: "Low Engagement & Low Performance Confidence",
    desc: "Disconnected cultures don’t feel set up for success and don’t believe the company is headed toward success.",
    outcome: "Low morale and high fatigue. Immediate diagnostic surveys and customized manager coaching intervention tracks are recommended.",
    color: "#ef4444",
    bgColor: "rgba(239, 68, 68, 0.08)",
    metrics: { engagement: "38%", confidence: "31%", retention: "52%" }
  }
];

const CAPABILITIES = [
  {
    id: "survey",
    label: "Diagnostic Survey",
    kicker: "Diagnostic survey",
    title: "Diagnose your performance culture",
    desc: "The Performance Culture Diagnostic™ survey connects how your people feel about company strategy with their readiness to execute on it.",
    list: ["Psychometrically validated questions", "Lightweight, pulse-ready structure", "Anonymity-safe parameters"],
    visual: "survey"
  },
  {
    id: "quadrant",
    label: "Quadrants Mapping",
    kicker: "Quadrants",
    title: "Contextualize your culture type",
    desc: "The Performance Culture Quadrant™ maps your diagnostic results into an intuitive visual map of your company’s culture type. Drill deeper with demographic filters, AI comment summaries, and comparisons.",
    list: ["Interactive department mapping", "Granular demographic filters", "Executive-level summaries"],
    visual: "quadrant"
  },
  {
    id: "coach",
    label: "AI Recommendation Engine",
    kicker: "AI Coach",
    title: "Targeted actions and recommendations",
    desc: "AI Coach is your always-on People Science partner that interprets your quadrant position in plain language, revealing how your culture is either powering or hindering performance to reveal key focus areas.",
    list: ["Slack & Teams notifications", "Validated leadership lessons", "Frontline manager playbooks"],
    visual: "coach"
  },
  {
    id: "roadmap",
    label: "Actionable Roadmap",
    kicker: "Actionable roadmap",
    title: "Your path to Peak Performance",
    desc: "Translate insights into behavior change by creating smarter goals, development plans, performance feedback, and 1-on-1s with tools that drive Peak Performance.",
    list: ["Goal management (OKRs)", "Continuous feedback loops", "Skills reinforcement tracking"],
    visual: "roadmap"
  }
];

export const VibeIndexMatrix: React.FC = () => {
  // States
  const [activeQuad, setActiveQuad] = useState("peak");
  const [activeCap, setActiveCap] = useState("survey");
  const [emailInput, setEmailInput] = useState("");
  const [whitepaperEmail, setWhitepaperEmail] = useState("");
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle");
  const [paperStatus, setPaperStatus] = useState<"idle" | "success" | "error">("idle");

  const [userInteractedCap, setUserInteractedCap] = useState(false);
  const [userInteractedQuad, setUserInteractedQuad] = useState(false);

  // Counter animations
  const [stockAdvantage, setStockAdvantage] = useState(0);
  const [retentionRate, setRetentionRate] = useState(0);
  const [highPerformers, setHighPerformers] = useState(0);

  // Auto-rotating Capabilities tabs
  useEffect(() => {
    if (userInteractedCap) return;
    const caps = ["survey", "quadrant", "coach", "roadmap"];
    const interval = setInterval(() => {
      setActiveCap((prev) => {
        const nextIndex = (caps.indexOf(prev) + 1) % caps.length;
        return caps[nextIndex];
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [userInteractedCap]);

  // Auto-rotating Quadrants
  useEffect(() => {
    if (userInteractedQuad) return;
    const quads = ["skepticism", "peak", "disconnected", "strained"];
    const interval = setInterval(() => {
      setActiveQuad((prev) => {
        const nextIndex = (quads.indexOf(prev) + 1) % quads.length;
        return quads[nextIndex];
      });
    }, 5500);

    return () => clearInterval(interval);
  }, [userInteractedQuad]);

  useEffect(() => {
    // Run up stock price advantage counter
    const stockTimer = setInterval(() => {
      setStockAdvantage((prev) => {
        if (prev >= 47) {
          clearInterval(stockTimer);
          return 47;
        }
        return prev + 1;
      });
    }, 25);

    // Run up retention rate counter
    const retentionTimer = setInterval(() => {
      setRetentionRate((prev) => {
        if (prev >= 88) {
          clearInterval(retentionTimer);
          return 88;
        }
        return prev + 2;
      });
    }, 20);

    // Run up high performers counter
    const performersTimer = setInterval(() => {
      setHighPerformers((prev) => {
        if (prev >= 21) {
          clearInterval(performersTimer);
          return 21;
        }
        return prev + 1;
      });
    }, 30);

    return () => {
      clearInterval(stockTimer);
      clearInterval(retentionTimer);
      clearInterval(performersTimer);
    };
  }, []);

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes("@")) {
      setFormStatus("error");
      setTimeout(() => setFormStatus("idle"), 4000);
      return;
    }
    setFormStatus("success");
    setEmailInput("");
    setTimeout(() => setFormStatus("idle"), 4000);
  };

  const handlePaperSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!whitepaperEmail || !whitepaperEmail.includes("@")) {
      setPaperStatus("error");
      setTimeout(() => setPaperStatus("idle"), 4000);
      return;
    }
    setPaperStatus("success");
    setWhitepaperEmail("");
    setTimeout(() => setPaperStatus("idle"), 4000);
  };

  const currentQuad = QUADRANT_DETAILS.find((q) => q.id === activeQuad)!;
  const currentCap = CAPABILITIES.find((c) => c.id === activeCap)!;

  return (
    <div className="vim-page">
      {/* 1. HERO SECTION */}
      <section className="vim-hero">
        <div className="vim-hero-bg">
          <div className="glow glow-1"></div>
          <div className="glow glow-2"></div>
          <div className="grid-overlay"></div>
        </div>

        <div className="container vim-hero-container">
          <div className="vim-hero-content">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="vim-hero-badge"
            >
              <FiZap className="icon" />
              <span>Cultural Diagnostic Intelligence</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="vim-hero-title"
            >
              Performance Culture <span>Quadrant™</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="vim-hero-desc"
            >
              Connect engagement and performance confidence to diagnose your culture and unlock the path to Peak Performance.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="vim-hero-ctas"
            >
              <a href="#assessment" className="vim-btn vim-btn-primary">
                Assess Your Culture <FiArrowRight />
              </a>
              <a href="#quadrants" className="vim-btn vim-btn-secondary">
                See The 4 Quadrants
              </a>
            </motion.div>
          </div>

          {/* Interactive Plotter visual on the right */}
          <div className="vim-hero-visual">
            <div className="vim-interactive-plotter">
              <div className="plotter-axis-y">Workplace Engagement →</div>
              <div className="plotter-axis-x">Performance Confidence →</div>

              <div className="plotter-grid">
                <div className="plot-line plotter-line-h" />
                <div className="plot-line plotter-line-v" />

                {/* Interactive Quadrants click targets */}
                <button
                  onClick={() => {
                    setActiveQuad("skepticism");
                    setUserInteractedQuad(true);
                  }}
                  className={`mini-quad top-left ${activeQuad === "skepticism" ? "active" : ""}`}
                >
                  <span>Engaged Skepticism</span>
                </button>
                <button
                  onClick={() => {
                    setActiveQuad("peak");
                    setUserInteractedQuad(true);
                  }}
                  className={`mini-quad top-right ${activeQuad === "peak" ? "active" : ""}`}
                >
                  <span>Peak Performance</span>
                </button>
                <button
                  onClick={() => {
                    setActiveQuad("disconnected");
                    setUserInteractedQuad(true);
                  }}
                  className={`mini-quad bottom-left ${activeQuad === "disconnected" ? "active" : ""}`}
                >
                  <span>Disconnected</span>
                </button>
                <button
                  onClick={() => {
                    setActiveQuad("strained");
                    setUserInteractedQuad(true);
                  }}
                  className={`mini-quad bottom-right ${activeQuad === "strained" ? "active" : ""}`}
                >
                  <span>Strained</span>
                </button>

                {/* Animated Node Dots */}
                <div className="plotter-dot eng-dot" style={{ top: "35%", left: "76%" }}>Eng</div>
                <div className="plotter-dot sales-dot" style={{ top: "68%", left: "80%" }}>Sales</div>
                <div className="plotter-dot support-dot" style={{ top: "42%", left: "32%" }}>CS</div>
              </div>

              <div className="plotter-tooltip">
                <span className="lbl">Selected State:</span>
                <strong style={{ color: currentQuad.color }}>{currentQuad.title}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUSTED BY SECTION */}
      <section className="vim-trusted">
        <div className="container text-center">
          <p className="trusted-text">TRUSTED BY 6,000+ HIGH-PERFORMING COMPANIES WORLDWIDE</p>
          <div className="trusted-logos">
            <span className="logo-item">Miro</span>
            <span className="logo-item">Steve Madden</span>
            <span className="logo-item">ZS Associates</span>
            <span className="logo-item">LendingTree</span>
            <span className="logo-item">Canva</span>
          </div>
        </div>
      </section>

      {/* 3. BUSINESS OUTCOMES / STATS SECTION */}
      <section className="vim-outcomes">
        <div className="container">
          <div className="vim-section-header">
            <h2 className="vim-section-title">Peak Performance companies outperform others on business outcomes</h2>
            <p className="vim-section-subtitle">
              Culture is not a qualitative byproduct – it is a core business driver. Our research demonstrates a strong, measurable correlation between quadrant positioning and corporate value.
            </p>
          </div>

          <div className="vim-outcomes-grid">
            {/* Card 1: Stock Price Advantage */}
            <div className="outcome-card outcome-card--stock">
              <div className="card-visual-container">
                <svg className="card-mini-chart" viewBox="0 0 240 100">
                  <defs>
                    <linearGradient id="stockGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#7e53ff" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#7e53ff" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <line x1="0" y1="20" x2="240" y2="20" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="0" y1="50" x2="240" y2="50" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="0" y1="80" x2="240" y2="80" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
                  <path d="M 0,80 Q 60,75 120,72 T 240,68" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 4" />
                  <path d="M 0,80 Q 60,65 120,40 T 240,15" fill="none" stroke="#7e53ff" strokeWidth="3.5" strokeLinecap="round" />
                  <path d="M 0,80 Q 60,65 120,40 T 240,15 L 240,100 L 0,100 Z" fill="url(#stockGrad)" />
                  <circle cx="240" cy="15" r="5" fill="#7e53ff" />
                  <circle cx="240" cy="15" r="10" stroke="#7e53ff" strokeWidth="2" fill="none" opacity="0.4" className="pulse-circle" />
                </svg>
                <div className="chart-badge">
                  <FiTrendingUp />
                  <span>+47% Outperformance</span>
                </div>
              </div>
              <div className="card-content-wrap">
                <div className="outcome-number">{stockAdvantage}%</div>
                <h3>Stock Price Advantage</h3>
                <p>Peak Performance companies achieved a +47% point advantage in stock price change over two years compared with those not in peak.</p>
              </div>
            </div>

            {/* Card 2: Voluntary Retention */}
            <div className="outcome-card outcome-card--retention">
              <div className="card-visual-container">
                <div className="radial-progress-wrap">
                  <svg className="radial-progress" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" className="radial-bg" />
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="40" 
                      className="radial-fill" 
                      style={{ strokeDashoffset: 251.2 - (251.2 * retentionRate) / 100 }} 
                    />
                  </svg>
                  <div className="radial-value">{retentionRate}%</div>
                </div>
                <div className="avatar-preview-row">
                  <div className="avatar">JH</div>
                  <div className="avatar">MR</div>
                  <div className="avatar">SV</div>
                  <div className="avatar">SZ</div>
                  <div className="avatar last-more">+88%</div>
                </div>
              </div>
              <div className="card-content-wrap">
                <div className="outcome-number">{retentionRate}%</div>
                <h3>Voluntary Retention</h3>
                <p>Organizations in Peak Performance maintain an 88% employee retention rate, preserving institutional knowledge and execution capacity.</p>
              </div>
            </div>

            {/* Card 3: High-Performer Density */}
            <div className="outcome-card outcome-card--density">
              <div className="card-visual-container">
                <div className="comparison-bar-chart">
                  <div className="comp-bar-row">
                    <div className="bar-label">Peak Performance</div>
                    <div className="bar-track">
                      <div className="bar-fill peak-fill" style={{ width: "85%" }}>
                        <span className="fill-value">85%</span>
                      </div>
                    </div>
                  </div>
                  <div className="comp-bar-row">
                    <div className="bar-label">Others Avg.</div>
                    <div className="bar-track">
                      <div className="bar-fill other-fill" style={{ width: "64%" }}>
                        <span className="fill-value">64%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="density-badge">
                  <FiAward />
                  <span>+21% Higher Density</span>
                </div>
              </div>
              <div className="card-content-wrap">
                <div className="outcome-number">+{highPerformers}%</div>
                <h3>High-Performer Density</h3>
                <p>Organizations in Peak Performance are stacked with 21% more high-performing employees than organizations in other quadrants.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CAPABILITIES / TABS SECTION */}
      <section className="vim-capabilities" id="capabilities">
        <div className="container">
          <div className="vim-section-header">
            <h2 className="vim-section-title">Finally answer the question:<br />Do we have a high-performing culture?</h2>
            <p className="vim-section-subtitle">
              Equip your leadership with verified tools to measure, map, and recalibrate employee alignment and operational readiness.
            </p>
          </div>

          <div className="caps-layout">
            <div className="caps-tabs">
              {CAPABILITIES.map((cap) => (
                <button
                  key={cap.id}
                  className={`cap-tab-btn ${activeCap === cap.id ? "active" : ""}`}
                  onClick={() => {
                    setActiveCap(cap.id);
                    setUserInteractedCap(true);
                  }}
                >
                  <span className="bullet"></span>
                  <span className="txt">{cap.label}</span>
                </button>
              ))}
            </div>

            <div className="caps-viewport">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCap}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="cap-slide"
                >
                  <div className="cap-details">
                    <span className="cap-kicker">{currentCap.kicker}</span>
                    <h3 className="cap-title">{currentCap.title}</h3>
                    <p className="cap-desc">{currentCap.desc}</p>
                    <ul className="cap-bullets">
                      {currentCap.list.map((item, idx) => (
                        <li key={idx}><FiCheck className="bullet-icon" /> {item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="cap-visual-box">
                    {currentCap.visual === "survey" && (
                      <div className="mockup-survey">
                        <div className="mockup-title">Performance Diagnostic Survey</div>
                        <div className="mockup-item">
                          <p>"I believe leadership has defined a clear execution roadmap."</p>
                          <div className="rating-row">
                            {[1, 2, 3, 4, 5].map((v) => (
                              <span key={v} className={`rating-dot ${v >= 4 ? "active" : ""}`}>{v}</span>
                            ))}
                          </div>
                        </div>
                        <div className="mockup-item">
                          <p>"I look forward to starting my work day at VibeOS."</p>
                          <div className="rating-row">
                            {[1, 2, 3, 4, 5].map((v) => (
                              <span key={v} className={`rating-dot ${v >= 5 ? "active" : ""}`}>{v}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {currentCap.visual === "quadrant" && (
                      <div className="mockup-quadrant">
                        <div className="mockup-title">Quadrant Tracker Map</div>
                        <div className="quadrant-display">
                          <div className="line-h"></div>
                          <div className="line-v"></div>
                          <span className="q-label tr">Peak</span>
                          <span className="q-label bl">Disconnected</span>
                          <motion.div
                            animate={{ scale: [1, 1.15, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="pulse-dot"
                          />
                        </div>
                      </div>
                    )}

                    {currentCap.visual === "coach" && (
                      <div className="mockup-coach">
                        <div className="mockup-title">AI Coach Chat</div>
                        <div className="chat-bubble left">
                          <p>Engineering Team is in Peak Performance. Voluntary turnover is 3%.</p>
                        </div>
                        <div className="chat-bubble right">
                          <p>Sales Team is in Strained. AI Action Recommendation: Deploy Focus Hours checklist via Slack.</p>
                        </div>
                      </div>
                    )}

                    {currentCap.visual === "roadmap" && (
                      <div className="mockup-roadmap">
                        <div className="mockup-title">Improvement Roadmap</div>
                        <div className="roadmap-step">
                          <FiCheckCircle className="step-icon checked" />
                          <div>
                            <strong>Step 1: Survey Complete</strong>
                            <span>84% participation achieved</span>
                          </div>
                        </div>
                        <div className="roadmap-step">
                          <FiActivity className="step-icon in-progress" />
                          <div>
                            <strong>Step 2: Meeting Reduction Pilot</strong>
                            <span>Sales department in calibration</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* 5. THE FOUR QUADRANTS DETAILED STUDY */}
      <section className="vim-quadrants" id="quadrants">
        <div className="container">
          <div className="vim-section-header">
            <h2 className="vim-section-title">The four quadrants</h2>
            <p className="vim-section-subtitle">
              Grounded in 15+ years of research and 1.5 billion survey questions answered, the Performance Culture Quadrant (PCQ) connects Engagement and Performance Confidence to visualize your company’s unique culture type.
            </p>
          </div>

          <div className="quads-matrix-grid">
            <div className="quads-visual-board">
              <div className="axis-label-y">Employee Engagement →</div>
              <div className="axis-label-x">Performance Confidence →</div>

              <div className="quads-board-grid">
                 <button
                  onClick={() => {
                    setActiveQuad("skepticism");
                    setUserInteractedQuad(true);
                  }}
                  className={`board-cell cell-skepticism ${activeQuad === "skepticism" ? "active" : ""}`}
                >
                  <span>Engaged Skepticism</span>
                </button>
                <button
                  onClick={() => {
                    setActiveQuad("peak");
                    setUserInteractedQuad(true);
                  }}
                  className={`board-cell cell-peak ${activeQuad === "peak" ? "active" : ""}`}
                >
                  <span>Peak Performance</span>
                </button>
                <button
                  onClick={() => {
                    setActiveQuad("disconnected");
                    setUserInteractedQuad(true);
                  }}
                  className={`board-cell cell-disconnected ${activeQuad === "disconnected" ? "active" : ""}`}
                >
                  <span>Disconnected</span>
                </button>
                <button
                  onClick={() => {
                    setActiveQuad("strained");
                    setUserInteractedQuad(true);
                  }}
                  className={`board-cell cell-strained ${activeQuad === "strained" ? "active" : ""}`}
                >
                  <span>Strained</span>
                </button>
              </div>
            </div>

            <div className="quads-text-panel">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeQuad}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="quad-details-card"
                  style={{ borderLeftColor: currentQuad.color }}
                >
                  <span className="card-kicker">{currentQuad.subtitle}</span>
                  <h3 className="card-title" style={{ color: currentQuad.color }}>{currentQuad.title}</h3>
                  <p className="card-desc">{currentQuad.desc}</p>
                  <p className="card-outcome"><strong>Outcome Profile:</strong> {currentQuad.outcome}</p>

                  <div className="card-metrics-grid" style={{ backgroundColor: currentQuad.bgColor }}>
                    <div className="metric-box">
                      <strong>{currentQuad.metrics.engagement}</strong>
                      <span>Engagement Index</span>
                    </div>
                    <div className="metric-box">
                      <strong>{currentQuad.metrics.confidence}</strong>
                      <span>Performance Confidence</span>
                    </div>
                    <div className="metric-box">
                      <strong>{currentQuad.metrics.retention}</strong>
                      <span>Retention Rate</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CASE STUDY & TESTIMONIAL (Sam Valentine / Miro) */}
      <section className="vim-testimonial">
        <div className="container">
          <div className="testimonial-card-inner">
            <div className="quote-mark">“</div>
            <p className="testimonial-quote">
              The Performance Culture Quadrant has dramatically accelerated how quickly we’re able to work through these topics and have the right conversations.
            </p>
            <div className="testimonial-meta">
              <strong>Sam Valentine</strong>
              <span>Head of Employee Performance and Experience at Miro</span>
            </div>
            <span className="testimonial-tag">Miro Case Study</span>
          </div>
        </div>
      </section>

      {/* 7. RESEARCH WHITEPAPER DOWNLOAD BLOCK */}
      <section className="vim-whitepaper" id="assessment">
        <div className="container">
          <div className="whitepaper-inner">
            <div className="whitepaper-info">
              <h2>Find your 47% advantage</h2>
              <p>
                Explore the research to learn how HR leaders can connect engagement and performance confidence to achieve Peak Performance and drive measurable business impact.
              </p>
            </div>

            <form className="whitepaper-form" onSubmit={handlePaperSubmit}>
              <div className="input-group">
                <FiMail className="input-icon" />
                <input
                  type="email"
                  placeholder="Enter corporate email..."
                  value={whitepaperEmail}
                  onChange={(e) => setWhitepaperEmail(e.target.value)}
                  className="paper-input"
                  required
                />
                <button type="submit" className="paper-submit-btn">
                  Download Report
                </button>
              </div>

              <AnimatePresence>
                {paperStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="form-message msg-success"
                  >
                    <FiCheckCircle /> Research document sent to your inbox.
                  </motion.div>
                )}
                {paperStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="form-message msg-error"
                  >
                    <FiAlertTriangle /> Please enter a valid corporate email address.
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>
      </section>


      {/* 9. FINAL CTA SECTION */}
      <section className="vim-final-cta">
        <div className="cta-glow"></div>
        <div className="container">
          <div className="cta-box">
            <h2>Invest in your people and create impact</h2>
            <p>
              Deploy scientist-backed performance frameworks, unlock manager productivity, and achieve Peak Performance culture. Request a custom demo setup.
            </p>

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
                    <FiCheckCircle /> Demo request registered. Our representative will contact you shortly.
                  </motion.div>
                )}
                {formStatus === "error" && (
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

export default VibeIndexMatrix;
