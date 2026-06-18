"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Check, 
  ChevronDown, 
  Users, 
  LogOut, 
  EyeOff, 
  Target, 
  MessageSquare, 
  Brain, 
  Zap, 
  Sparkles, 
  TrendingUp, 
  Play, 
  Smile, 
  Meh, 
  Frown
} from "lucide-react";
import "./Platform.scss";

// Simple scroll-reveal hook for clean transition effects
function useScrollReveal() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          if (currentRef) observer.unobserve(currentRef);
        }
      },
      { threshold: 0.15 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return [ref, revealed] as const;
}

export default function Platform() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [showcaseTab, setShowcaseTab] = useState<"builder" | "insights" | "heatmap">("builder");

  // Scroll reveal references
  const [heroRef, heroRevealed] = useScrollReveal();
  const [problemRef, problemRevealed] = useScrollReveal();
  const [howRef, howRevealed] = useScrollReveal();
  const [outcomeRef, outcomeRevealed] = useScrollReveal();
  const [showcaseRef, showcaseRevealed] = useScrollReveal();
  const [faqRef, faqRevealed] = useScrollReveal();
  const [ctaRef, ctaRevealed] = useScrollReveal();

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "How does employee engagement software work?",
      a: "VibeOS collects real-time sentiment signals through lightweight surveys, anonymous feedback channels, and transition check-ins. Our AI engine processes these inputs to map cultural patterns, highlight burnout risks, and suggest proven action steps for leadership."
    },
    {
      q: "How often should surveys be conducted?",
      a: "We recommend a hybrid model: quarterly deep-dive surveys for organization-wide metrics, and bi-weekly/monthly pulse surveys (1-2 questions) to track team-level variations and immediate responses to change."
    },
    {
      q: "Can we customize surveys?",
      a: "Yes. VibeOS includes a drag-and-drop survey builder with over 100 scientifically proven question templates, alongside the ability to write custom questions tailored to your organization's specific values and needs."
    },
    {
      q: "Is employee feedback anonymous?",
      a: "Absolutely. Confidentiality is core to VibeOS. Individual survey responses are aggregated to preserve anonymity, while our AI comment analysis groups open-text feedback into general themes without exposing participant identities."
    },
    {
      q: "How long does implementation take?",
      a: "Most organizations are fully set up within 7 to 10 days. We integrate directly with your identity provider (G Suite, Okta, etc.) and HRIS (HR Information System) to automate employee directory synching instantly."
    },
    {
      q: "Does it integrate with existing HR systems?",
      a: "Yes. We support native integrations with major HRIS tools like Workday, BambooHR, and Rippling, as well as communication channels like Slack and Microsoft Teams to deploy surveys where employees already work."
    }
  ];

  return (
    <div className="platform-page">

      {/* ==========================================================================
         1. HERO SECTION
         ========================================================================== */}
      <section className="p-hero" ref={heroRef}>
        <div className="p-hero__container">
          <div className={`p-hero__content ${heroRevealed ? "reveal-active" : ""}`}>
            <span className="p-hero__badge">
              <Sparkles size={12} /> The New Standard in HR
            </span>
            <h1 className="p-hero__title">
              Understand What Your <br />
              <span>Employees Need</span> <br />
              Before It&apos;s Too Late
            </h1>
            <p className="p-hero__desc">
              Turn employee feedback into actionable insights with real-time engagement analytics, 
              AI-powered recommendations, and continuous listening tools.
            </p>
            <div className="p-hero__cta-group">
              <a href="#demo" className="btn btn--primary">Book a Demo</a>
              <a href="#tour" className="btn btn--secondary">
                <Play size={14} fill="currentColor" /> Watch Product Tour
              </a>
            </div>

            {/* Micro Trust badges */}
            <div className="p-hero__trust-metrics">
              <div className="metric-item">
                <strong>10k+</strong>
                <span>Active Users</span>
              </div>
              <div className="metric-divider" />
              <div className="metric-item">
                <strong>4.9/5</strong>
                <span>G2 Rating</span>
              </div>
              <div className="metric-divider" />
              <div className="metric-item">
                <strong>98%</strong>
                <span>Retention Rate</span>
              </div>
            </div>
          </div>

          {/* Interactive Dashboard Mockup Visual */}
          <div className={`p-hero__visual ${heroRevealed ? "reveal-active" : ""}`}>
            <div className="mock-window">
              <div className="mock-window__header">
                <div className="dots"><span /><span /><span /></div>
                <div className="address-bar">vibeos.com/dashboard</div>
              </div>
              
              <div className="mock-window__body">
                {/* Dashboard grid */}
                <div className="mock-grid">
                  
                  {/* Row 1: Overall score ring & sentiment card */}
                  <div className="mock-col span-4">
                    <div className="widget-card glow-purple">
                      <span className="widget-label">Overall Engagement</span>
                      <div className="widget-score-ring">
                        <svg viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="40" className="bg-circle" />
                          <circle cx="50" cy="50" r="40" className="fill-circle fill-82" />
                        </svg>
                        <div className="score-value">82%</div>
                      </div>
                      <span className="widget-subtitle text-green">▲ 4% from last quarter</span>
                    </div>
                  </div>

                  <div className="mock-col span-8">
                    <div className="widget-card">
                      <span className="widget-label">Sentiment Trends</span>
                      <div className="sentiment-bars">
                        <div className="sent-row">
                          <Smile size={16} className="text-green" />
                          <div className="sent-track"><div className="sent-bar bg-green" style={{ width: "65%" }} /></div>
                          <span className="sent-val">65%</span>
                        </div>
                        <div className="sent-row">
                          <Meh size={16} className="text-amber" />
                          <div className="sent-track"><div className="sent-bar bg-amber" style={{ width: "23%" }} /></div>
                          <span className="sent-val">23%</span>
                        </div>
                        <div className="sent-row">
                          <Frown size={16} className="text-red" />
                          <div className="sent-track"><div className="sent-bar bg-red" style={{ width: "12%" }} /></div>
                          <span className="sent-val">12%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Graph */}
                  <div className="mock-col span-12">
                    <div className="widget-card">
                      <div className="widget-header">
                        <span className="widget-label">Participation Rate</span>
                        <div className="badge">Active Surveys</div>
                      </div>
                      
                      {/* CSS Line Chart simulation */}
                      <div className="chart-line-simulation">
                        <div className="chart-grid-line" />
                        <div className="chart-grid-line" />
                        <div className="chart-grid-line" />
                        
                        <svg viewBox="0 0 400 100" className="chart-line-svg">
                          <path d="M 0,90 Q 80,40 160,60 T 320,20 T 400,10" className="line-path" />
                          <path d="M 0,90 Q 80,40 160,60 T 320,20 T 400,10 L 400,100 L 0,100 Z" className="area-path" />
                        </svg>
                        
                        <div className="chart-labels">
                          <span>Jan</span>
                          <span>Feb</span>
                          <span>Mar</span>
                          <span>Apr</span>
                          <span>May</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Floating Widgets */}
            <div className="floating-widget float-1">
              <div className="badge-pulse" />
              <div className="floating-info">
                <strong>Wellbeing Alert</strong>
                <span>Friction in Marketing</span>
              </div>
            </div>

            <div className="floating-widget float-2">
              <span className="emoji">🎉</span>
              <div className="floating-info">
                <strong>Action Complete</strong>
                <span>Kudos Campaign Launched</span>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Logo Trust Strip */}
        <div className="p-hero__logos">
          <div className="logos-title">TRUSTED BY INNOVATIVE HR TEAMS WORLDWIDE</div>
          <div className="logos-track">
            <div className="logo-placeholder"><span>BOLT</span></div>
            <div className="logo-placeholder"><span>STRIPE</span></div>
            <div className="logo-placeholder"><span>VERCEL</span></div>
            <div className="logo-placeholder"><span>AIRBNB</span></div>
            <div className="logo-placeholder"><span>SLACK</span></div>
            <div className="logo-placeholder"><span>ATTENTIVE</span></div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
         2. PROBLEM SECTION
         ========================================================================== */}
      <section className="p-problem" ref={problemRef}>
        <div className="p-problem__bg-glow" />
        <div className="p-problem__container">
          
          <div className={`p-problem__header ${problemRevealed ? "reveal-active" : ""}`}>
            <span className="p-problem__badge">The Challenge</span>
            <h2 className="p-problem__title">
              Most Companies Don&apos;t Know Why Employees Leave
            </h2>
            <p className="p-problem__desc">
              Organizations struggle with low engagement, high turnover, poor communication, 
              and a complete lack of actionable employee feedback.
            </p>
          </div>

          <div className="p-problem__grid">
            
            {/* Card 1 */}
            <div className={`p-problem__card ${problemRevealed ? "reveal-active" : ""}`}>
              <div className="card-icon icon-red">
                <Users size={22} />
              </div>
              <h3 className="card-title">Low Employee Engagement</h3>
              <p className="card-desc">
                Disengaged employees perform at lower levels, impacting overall productivity and business goals.
              </p>
            </div>

            {/* Card 2 */}
            <div className={`p-problem__card ${problemRevealed ? "reveal-active" : ""}`}>
              <div className="card-icon icon-orange">
                <LogOut size={22} />
              </div>
              <h3 className="card-title">High Turnover Rates</h3>
              <p className="card-desc">
                Losing top talent is expensive, disruptive, and damages the remaining team morale.
              </p>
            </div>

            {/* Card 3 */}
            <div className={`p-problem__card ${problemRevealed ? "reveal-active" : ""}`}>
              <div className="card-icon icon-purple">
                <EyeOff size={22} />
              </div>
              <h3 className="card-title">Lack of Visibility</h3>
              <p className="card-desc">
                Managers remain in the dark about team sentiment and burnout until resignation letters arrive.
              </p>
            </div>

            {/* Card 4 */}
            <div className={`p-problem__card ${problemRevealed ? "reveal-active" : ""}`}>
              <div className="card-icon icon-blue">
                <Target size={22} />
              </div>
              <h3 className="card-title">No Clear Action Plan</h3>
              <p className="card-desc">
                Organizations collect data but struggle to turn raw feedback into clear, structured next steps.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ==========================================================================
         3. HOW IT WORKS SECTION
         ========================================================================== */}
      <section className="p-how" ref={howRef}>
        <div className="p-how__container">
          
          <div className={`p-how__header ${howRevealed ? "reveal-active" : ""}`}>
            <span className="p-how__kicker">Process</span>
            <h2 className="p-how__title">From Feedback to Action in Three Simple Steps</h2>
          </div>

          <div className="p-how__timeline-wrapper">
            {/* Horizontal Timeline Connector (Desktop Only) */}
            <div className="p-how__timeline-line">
              <div className="animated-progress-line" />
            </div>

            <div className="p-how__steps-grid">
              
              {/* Step 1 */}
              <div className={`p-how__step-card ${howRevealed ? "reveal-active" : ""}`}>
                <div className="step-num-badge">1</div>
                <div className="step-icon">
                  <MessageSquare size={24} />
                </div>
                <h3 className="step-title">Listen</h3>
                <p className="step-desc">
                  Collect employee feedback through surveys, pulse checks, and lifecycle assessments.
                </p>
              </div>

              {/* Step 2 */}
              <div className={`p-how__step-card ${howRevealed ? "reveal-active" : ""}`}>
                <div className="step-num-badge">2</div>
                <div className="step-icon">
                  <Brain size={24} />
                </div>
                <h3 className="step-title">Analyze</h3>
                <p className="step-desc">
                  AI-powered analytics identify trends, engagement drivers, and risk areas automatically.
                </p>
              </div>

              {/* Step 3 */}
              <div className={`p-how__step-card ${howRevealed ? "reveal-active" : ""}`}>
                <div className="step-num-badge">3</div>
                <div className="step-icon">
                  <Zap size={24} />
                </div>
                <h3 className="step-title">Act</h3>
                <p className="step-desc">
                  Generate actionable recommendations and track team improvement metrics over time.
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ==========================================================================
         4. OUTCOME SECTION
         ========================================================================== */}
      <section className="p-outcome" ref={outcomeRef}>
        <div className="p-outcome__container">
          <div className={`p-outcome__header ${outcomeRevealed ? "reveal-active" : ""}`}>
            <span className="p-outcome__badge">Business Impact</span>
            <h2 className="p-outcome__title">Drive Real Business Results</h2>
          </div>

          <div className={`p-outcome__grid ${outcomeRevealed ? "reveal-active" : ""}`}>
            
            {/* Left Column: KPI Cards */}
            <div className="p-outcome__col-kpi">
              <div className="outcome-card glow-green">
                <div className="card-header">
                  <span className="kpi-tag bg-green-light">+40%</span>
                  <TrendingUp size={20} className="text-green" />
                </div>
                <div className="card-body">
                  <h3>Employee Engagement</h3>
                  <p>Increase participation rates and trust levels across remote and hybrid departments.</p>
                </div>
                <div className="card-visual">
                  {/* Simulated Spark bar growth */}
                  <div className="spark-bars">
                    <div className="spark-bar" style={{ height: "30%" }} />
                    <div className="spark-bar" style={{ height: "45%" }} />
                    <div className="spark-bar" style={{ height: "60%" }} />
                    <div className="spark-bar" style={{ height: "90%" }} />
                  </div>
                </div>
              </div>

              <div className="outcome-card glow-red">
                <div className="card-header">
                  <span className="kpi-tag bg-red-light">-30%</span>
                  <LogOut size={20} className="text-red" />
                </div>
                <div className="card-body">
                  <h3>Employee Turnover</h3>
                  <p>Detect turnover risks early and implement targeted actions to keep key performers.</p>
                </div>
                <div className="card-visual">
                  {/* Simulated descending line */}
                  <svg viewBox="0 0 100 40" className="descending-svg">
                    <path d="M 0,10 L 30,15 L 60,30 L 100,35" fill="none" stroke="#ef4444" strokeWidth="2.5" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Right Column: Other KPI Cards */}
            <div className="p-outcome__col-kpi">
              <div className="outcome-card glow-blue">
                <div className="card-header">
                  <span className="kpi-tag bg-blue-light">2x</span>
                  <Check size={20} className="text-blue" />
                </div>
                <div className="card-body">
                  <h3>Higher Productivity</h3>
                  <p>Aligned teams with high psychological safety score 2x higher in goal completion.</p>
                </div>
                <div className="card-visual">
                  <div className="progress-ring-wrapper">
                    <div className="ring-label">2.4x</div>
                  </div>
                </div>
              </div>

              <div className="outcome-card glow-purple">
                <div className="card-header">
                  <span className="kpi-tag bg-purple-light">85%</span>
                  <Sparkles size={20} className="text-purple" />
                </div>
                <div className="card-body">
                  <h3>Manager Adoption</h3>
                  <p>Managers actively use automated insights to conduct monthly feedback loop sessions.</p>
                </div>
                <div className="card-visual">
                  <div className="horizontal-track">
                    <div className="horizontal-fill" style={{ width: "85%" }} />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==========================================================================
         5. VISUAL SHOWCASE SECTION
         ========================================================================== */}
      <section className="p-showcase" ref={showcaseRef}>
        <div className="p-showcase__bg-overlay" />
        
        <div className="p-showcase__container">
          <div className={`p-showcase__header ${showcaseRevealed ? "reveal-active" : ""}`}>
            <span className="p-showcase__badge">Product Tour</span>
            <h2 className="p-showcase__title">See Employee Experience in Real Time</h2>
            
            {/* Interactive Tabs */}
            <div className="p-showcase__tabs">
              <button 
                className={`tab-btn ${showcaseTab === "builder" ? "active" : ""}`}
                onClick={() => setShowcaseTab("builder")}
              >
                Survey Builder
              </button>
              <button 
                className={`tab-btn ${showcaseTab === "insights" ? "active" : ""}`}
                onClick={() => setShowcaseTab("insights")}
              >
                AI Insights Panel
              </button>
              <button 
                className={`tab-btn ${showcaseTab === "heatmap" ? "active" : ""}`}
                onClick={() => setShowcaseTab("heatmap")}
              >
                Heatmap Reports
              </button>
            </div>
          </div>

          {/* Large showcase visual area */}
          <div className={`p-showcase__display ${showcaseRevealed ? "reveal-active" : ""}`}>
            
            {showcaseTab === "builder" && (
              <div className="showcase-view animate-fade">
                <div className="showcase-window">
                  <div className="window-header">
                    <span className="title">VibeOS Survey Builder</span>
                    <span className="status">Draft Mode</span>
                  </div>
                  <div className="window-body">
                    <div className="builder-layout">
                      <div className="builder-sidebar">
                        <span className="lbl">Question Bank</span>
                        <div className="bank-item"><span className="dot" /> Trust & Safety</div>
                        <div className="bank-item active"><span className="dot" /> Wellbeing & Workload</div>
                        <div className="bank-item"><span className="dot" /> Career Development</div>
                      </div>
                      <div className="builder-canvas">
                        <div className="question-card">
                          <span className="q-badge">Question 1 (Rating Scale)</span>
                          <h4>How satisfied are you with the support provided by your manager?</h4>
                          <div className="slider-mock">
                            <span className="bar" />
                            <span className="handle" style={{ left: "75%" }} />
                          </div>
                          <div className="slider-labels">
                            <span>Strongly Disagree</span>
                            <span>Strongly Agree</span>
                          </div>
                        </div>
                        <button className="add-btn">+ Add New Question</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {showcaseTab === "insights" && (
              <div className="showcase-view animate-fade">
                <div className="showcase-window">
                  <div className="window-header">
                    <span className="title">AI Insights & Action Planner</span>
                    <span className="status text-green">Online</span>
                  </div>
                  <div className="window-body">
                    <div className="insights-layout">
                      <div className="insight-card-main">
                        <div className="card-head">
                          <span className="badge-alert">Risk Area Detected</span>
                          <strong>Engineering Team</strong>
                        </div>
                        <p>Weekly meeting load has increased by 35%. Cohesion is high but burnout risk is escalating.</p>
                        <div className="recommended-action">
                          <div className="action-tag">Recommended Action</div>
                          <h5>Launch &quot;Meeting-Free Wednesdays&quot; policy for Engineering</h5>
                          <button className="action-btn">Deploy Policy</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {showcaseTab === "heatmap" && (
              <div className="showcase-view animate-fade">
                <div className="showcase-window">
                  <div className="window-header">
                    <span className="title">Department Comparison Heatmap</span>
                    <span className="status">Overall: 7.4/10</span>
                  </div>
                  <div className="window-body">
                    <div className="heatmap-layout">
                      <div className="heatmap-row header">
                        <span className="lbl">Department</span>
                        <span>Trust</span>
                        <span>Wellbeing</span>
                        <span>Growth</span>
                        <span>Belonging</span>
                      </div>
                      <div className="heatmap-row">
                        <span className="lbl">Sales</span>
                        <span className="cell bg-green-cell">8.4</span>
                        <span className="cell bg-yellow-cell">6.2</span>
                        <span className="cell bg-green-cell">8.0</span>
                        <span className="cell bg-green-cell">7.8</span>
                      </div>
                      <div className="heatmap-row">
                        <span className="lbl">Marketing</span>
                        <span className="cell bg-green-cell">7.8</span>
                        <span className="cell bg-red-cell">5.1</span>
                        <span className="cell bg-yellow-cell">6.9</span>
                        <span className="cell bg-green-cell">7.2</span>
                      </div>
                      <div className="heatmap-row">
                        <span className="lbl">Engineering</span>
                        <span className="cell bg-green-cell">8.2</span>
                        <span className="cell bg-yellow-cell">6.8</span>
                        <span className="cell bg-green-cell">8.4</span>
                        <span className="cell bg-green-cell">8.1</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* ==========================================================================
         6. FAQ SECTION
         ========================================================================== */}
      <section className="p-faq" ref={faqRef}>
        <div className="p-faq__container">
          
          <div className={`p-faq__header ${faqRevealed ? "reveal-active" : ""}`}>
            <span className="p-faq__badge">Support</span>
            <h2 className="p-faq__title">Frequently Asked Questions</h2>
          </div>

          <div className={`p-faq__list ${faqRevealed ? "reveal-active" : ""}`}>
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx}
                  className={`faq-item ${isOpen ? "active" : ""}`}
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

      {/* ==========================================================================
         7. FINAL CTA SECTION
         ========================================================================== */}
      <section className="p-cta" ref={ctaRef}>
        <div className="p-cta__mesh" />
        <div className="p-cta__circle circle-1" />
        <div className="p-cta__circle circle-2" />

        <div className={`p-cta__container ${ctaRevealed ? "reveal-active" : ""}`}>
          <h2 className="p-cta__title">Build a Workplace People Love</h2>
          <p className="p-cta__desc">
            Start measuring engagement, improving retention, and creating a high-performance culture today.
          </p>
          
          <div className="p-cta__buttons">
            <a href="#demo" className="btn btn--white">Book a Demo</a>
            <a href="#signup" className="btn btn--outline">Get Started Free</a>
          </div>

          {/* Testimonial card */}
          <div className="p-cta__testimonial">
            <p className="quote">
              &quot;VibeOS transformed our culture. Retention is up 24% and teams are aligned.&quot;
            </p>
            <div className="author">
              <strong>Sarah Jenkins</strong>
              <span>VP of People, Attentive</span>
            </div>
          </div>

          {/* Success badges */}
          <div className="p-cta__badges">
            <span className="badge-item">🏆 Leader Spring 2026</span>
            <span className="badge-item">⭐ 4.9/5 on G2</span>
            <span className="badge-item">🔒 SOC2 Certified</span>
          </div>
        </div>
      </section>

    </div>
  );
}
