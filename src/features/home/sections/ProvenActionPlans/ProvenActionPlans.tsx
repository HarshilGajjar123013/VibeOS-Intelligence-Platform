"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  Play,
  Check,
  ChevronDown,
  Users,
  MessageSquare,
  BarChart3,
  TrendingUp,
  Shield,
  EyeOff,
  Target,
  Brain,
  Sparkles,
  Heart,
  ClipboardList,
  Activity,
  FileText,
  Clock,
  CheckCircle,
  UserCheck,
  ListChecks,
  Gauge,
  HandshakeIcon,
  RefreshCcw,
  Search,
  ChevronRight,
} from "lucide-react";
import "./ProvenActionPlans.scss";
import { useProtoStore } from "@/src/store/useProtoStore";

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
      if (start >= target) { setCount(target); clearInterval(timer); }
      else { setCount(Math.floor(start)); }
    }, 16);
    return () => clearInterval(timer);
  }, [revealed, target, duration]);
  return count + suffix;
}

/* ──────────────────────────────────────────────
   MAIN COMPONENT
   ────────────────────────────────────────────── */
export default function ProvenActionPlans() {
  const setDemoModalOpen = useProtoStore((state) => state.setDemoModalOpen);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeFeature, setActiveFeature] = useState(0);

  // Scroll reveals
  const [heroRef, heroRevealed] = useScrollReveal();
  const [problemRef, problemRevealed] = useScrollReveal();
  const [howRef, howRevealed] = useScrollReveal();
  const [outcomeRef, outcomeRevealed] = useScrollReveal();
  const [showcaseRef, showcaseRevealed] = useScrollReveal();
  const [faqRef, faqRevealed] = useScrollReveal();
  const [ctaRef, ctaRevealed] = useScrollReveal();

  // Auto-cycle showcase
  useEffect(() => {
    const t = setInterval(() => setActiveFeature((p) => (p + 1) % 6), 4500);
    return () => clearInterval(t);
  }, []);

  const toggleFaq = (i: number) => setActiveFaq(activeFaq === i ? null : i);

  // Counters
  const c1 = useCounter(78, outcomeRevealed, 2000, "%");
  const c2 = useCounter(3, outcomeRevealed, 1200, "x");
  const c3 = useCounter(65, outcomeRevealed, 2000, "%");
  const c4 = useCounter(41, outcomeRevealed, 2000, "%");
  const c5 = useCounter(92, outcomeRevealed, 2000, "%");
  const c6 = useCounter(4, outcomeRevealed, 1200, "x");

  const faqs = [
    { q: "How do action plans improve employee engagement?", a: "Action plans convert employee feedback into structured initiatives with clear ownership, timelines, and measurable goals. This creates a visible loop of listening and acting, which significantly boosts engagement and trust." },
    { q: "Can managers customize action plans?", a: "Absolutely. Every action plan template is fully customizable. Managers can modify objectives, timelines, milestones, and assign responsibilities based on their team's specific needs." },
    { q: "How are priorities selected?", a: "Our AI engine analyzes survey data and identifies the areas with the highest impact potential. It surfaces priority recommendations based on engagement drivers, risk areas, and benchmarking data." },
    { q: "Can progress be tracked over time?", a: "Yes. Every action plan includes real-time progress tracking with milestone completion, status updates, and automated reminders. Executives can view organization-wide dashboards." },
    { q: "Do action plans work for remote teams?", a: "Completely. Our platform is designed for distributed workforces with async collaboration, digital check-ins, and virtual team engagement activities built into the action plans." },
    { q: "Can executives monitor organization-wide progress?", a: "Yes. Executive dashboards provide a bird's-eye view of all active action plans, completion rates, engagement trends, and department-level comparisons across the organization." },
    { q: "How long does implementation take?", a: "Most organizations launch their first action plans within 48 hours. Our onboarding process includes template selection, team configuration, and manager training in a single session." },
    { q: "What integrations are available?", a: "We integrate with Slack, Microsoft Teams, Workday, BambooHR, SAP SuccessFactors, ADP, and more. We also support SSO, HRIS sync, and custom webhook integrations." },
  ];

  const features = [
    { icon: <FileText size={18} />, label: "Action Library", title: "Proven Improvement Templates" },
    { icon: <BarChart3 size={18} />, label: "Manager Dashboard", title: "Team Priorities & Goals" },
    { icon: <Activity size={18} />, label: "Progress Tracking", title: "Milestone Completion" },
    { icon: <Users size={18} />, label: "Team Insights", title: "Engagement Analysis" },
    { icon: <Brain size={18} />, label: "AI Recommendations", title: "Smart Suggestions" },
    { icon: <Target size={18} />, label: "Accountability", title: "Ownership Tracking" },
  ];

  return (
    <div className="pap-page">

      {/* ================================================================
         1. HERO SECTION
         ================================================================ */}
      <section className="pap-hero" ref={heroRef}>
        <div className="pap-hero__bg">
          <div className="orb orb--1" />
          <div className="orb orb--2" />
          <div className="orb orb--3" />
        </div>

        <div className="pap-hero__container">
          {/* Content */}
          <div className={`pap-hero__content ${heroRevealed ? "reveal-active" : ""}`}>
            <span className="pap-hero__badge">
              <Sparkles size={12} />
              Action Planning Platform
            </span>

            <h1 className="pap-hero__title">
              Turn Employee Feedback Into <span>Meaningful Action</span>
            </h1>

            <p className="pap-hero__desc">
              Stop collecting feedback that sits in reports. Create structured action plans that help
              managers improve engagement, strengthen teams, and drive measurable workplace outcomes.
            </p>

            <div className="pap-hero__ctas">
              <a href="#get-started" className="pap-btn pap-btn--primary">
                Get Started <ArrowRight size={16} />
              </a>
              <a href="#showcase" className="pap-btn pap-btn--secondary">
                <Play size={14} /> See Action Plans
              </a>
            </div>

            <div className="pap-hero__trust">
              <div className="trust-metric">
                <strong>500K+</strong><span>Actions Completed</span>
              </div>
              <div className="trust-sep" />
              <div className="trust-metric">
                <strong>4.8/5</strong><span>Manager Rating</span>
              </div>
              <div className="trust-sep" />
              <div className="trust-metric">
                <strong>SOC2</strong><span>Certified</span>
              </div>
            </div>
          </div>

          {/* Visual – Dashboard Mock */}
          <div className={`pap-hero__visual ${heroRevealed ? "reveal-active" : ""}`}>
            <div className="hero-mock">
              <div className="mock-titlebar">
                <div className="mock-dots"><span /><span /><span /></div>
                <span className="mock-url">app.vibeos.com/action-plans</span>
              </div>
              <div className="mock-body">
                {/* Stats row */}
                <div className="mock-stats">
                  <div className="ms-card ms-card--emerald">
                    <span className="ms-label">Active Plans</span>
                    <div className="ms-val">24</div>
                    <div className="ms-bar"><div className="ms-fill" style={{ width: "72%" }} /></div>
                  </div>
                  <div className="ms-card ms-card--violet">
                    <span className="ms-label">Completion Rate</span>
                    <div className="ms-val">87%</div>
                    <div className="ms-bar"><div className="ms-fill" style={{ width: "87%" }} /></div>
                  </div>
                  <div className="ms-card ms-card--sky">
                    <span className="ms-label">Engagement Lift</span>
                    <div className="ms-val">+32%</div>
                    <div className="ms-bar"><div className="ms-fill" style={{ width: "64%" }} /></div>
                  </div>
                </div>

                {/* Action Items */}
                <div className="mock-actions">
                  <div className="ma-header">
                    <span className="ma-title">Priority Actions</span>
                    <span className="ma-badge">AI Recommended</span>
                  </div>
                  <div className="ma-list">
                    <div className="ma-item">
                      <div className="ma-check done"><Check size={10} /></div>
                      <div className="ma-text">
                        <strong>Implement flexible work hours</strong>
                        <span>Engineering · Completed</span>
                      </div>
                      <span className="ma-impact green">+18% satisfaction</span>
                    </div>
                    <div className="ma-item">
                      <div className="ma-check progress"><Activity size={10} /></div>
                      <div className="ma-text">
                        <strong>Launch manager coaching program</strong>
                        <span>Company-wide · In Progress</span>
                      </div>
                      <span className="ma-impact purple">Projected +25%</span>
                    </div>
                    <div className="ma-item">
                      <div className="ma-check pending"><Clock size={10} /></div>
                      <div className="ma-text">
                        <strong>Reduce meeting overload</strong>
                        <span>All Teams · Planned</span>
                      </div>
                      <span className="ma-impact amber">Projected +15%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Widgets */}
            <div className="pap-float pap-float--1">
              <div className="pf-pulse" />
              <div className="pf-info"><strong>Plan Created</strong><span>Manager Coaching – 12 goals</span></div>
            </div>
            <div className="pap-float pap-float--2">
              <CheckCircle size={14} className="pf-icon" />
              <div className="pf-info"><strong>3 Actions Done</strong><span>Engineering team this week</span></div>
            </div>
          </div>
        </div>

        {/* Logo Strip */}
        <div className="pap-hero__logos">
          <span className="logos-label">Trusted by forward-thinking organizations</span>
          <div className="logos-row">
            {["Stripe", "Notion", "Figma", "Linear", "Vercel", "Loom"].map((n) => (
              <span key={n} className="logo-name">{n}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
         2. PROBLEM SECTION
         ================================================================ */}
      <section className="pap-problem" ref={problemRef}>
        <div className="pap-problem__glow" />
        <div className="pap-problem__container">
          <div className={`pap-problem__header ${problemRevealed ? "reveal-active" : ""}`}>
            <span className="pap-problem__badge">The Challenge</span>
            <h2 className="pap-problem__title">Feedback Without Action Creates Frustration</h2>
            <p className="pap-problem__desc">
              Organizations often gather employee feedback but struggle to convert insights into meaningful workplace improvements.
            </p>
          </div>

          <div className={`pap-problem__grid ${problemRevealed ? "reveal-active" : ""}`}>
            <div className={`prob-card ${problemRevealed ? "reveal-active" : ""}`}>
              <div className="prob-icon icon-red"><MessageSquare size={22} /></div>
              <h3>Feedback Gets Ignored</h3>
              <p>Survey results are reviewed but rarely transformed into concrete actions.</p>
              <div className="prob-viz">
                <div className="bar-cluster">
                  <div className="b" style={{ height: "80%" }} /><div className="b fade" style={{ height: "55%" }} /><div className="b fade" style={{ height: "30%" }} /><div className="b fade" style={{ height: "12%" }} />
                </div>
                <span className="viz-label">Action rate declining</span>
              </div>
            </div>

            <div className={`prob-card ${problemRevealed ? "reveal-active" : ""}`}>
              <div className="prob-icon icon-amber"><EyeOff size={22} /></div>
              <h3>Managers Lack Direction</h3>
              <p>Leaders understand issues exist but don&apos;t know what steps to take next.</p>
              <div className="prob-viz">
                <div className="scatter-dots">
                  {[...Array(9)].map((_, i) => <div key={i} className="sd" />)}
                </div>
                <span className="viz-label">Unclear next steps</span>
              </div>
            </div>

            <div className={`prob-card ${problemRevealed ? "reveal-active" : ""}`}>
              <div className="prob-icon icon-purple"><UserCheck size={22} /></div>
              <h3>No Accountability</h3>
              <p>Improvement initiatives lose momentum without clear ownership and tracking.</p>
              <div className="prob-viz">
                <div className="acc-bars">
                  <div className="ab"><div className="ab-fill" style={{ width: "90%" }} /><span>Assigned</span></div>
                  <div className="ab"><div className="ab-fill stale" style={{ width: "35%" }} /><span>Tracked</span></div>
                </div>
                <span className="viz-label">Ownership gap</span>
              </div>
            </div>

            <div className={`prob-card ${problemRevealed ? "reveal-active" : ""}`}>
              <div className="prob-icon icon-blue"><Shield size={22} /></div>
              <h3>Employees Lose Trust</h3>
              <p>People stop sharing feedback when they don&apos;t see meaningful change.</p>
              <div className="prob-viz">
                <div className="trust-gauge">
                  <div className="tg-fill" style={{ width: "28%" }} />
                  <div className="tg-marker" style={{ left: "28%" }} />
                </div>
                <span className="viz-label">Trust level: Low</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
         3. HOW IT WORKS
         ================================================================ */}
      <section className="pap-how" ref={howRef}>
        <div className="pap-how__container">
          <div className={`pap-how__header ${howRevealed ? "reveal-active" : ""}`}>
            <span className="pap-how__badge">Framework</span>
            <h2 className="pap-how__title">A Proven Framework For Workplace Improvement</h2>
          </div>

          <div className={`pap-how__timeline ${howRevealed ? "reveal-active" : ""}`}>
            <div className="tl-line"><div className="tl-progress" /></div>

            <div className="tl-grid">
              {/* Step 1 */}
              <div className={`tl-card ${howRevealed ? "reveal-active" : ""}`}>
                <div className="tl-num">1</div>
                <div className="tl-icon-wrap"><Search size={24} /></div>
                <h3>Identify Priorities</h3>
                <p>Analyze employee feedback and identify the most impactful areas for improvement.</p>
                <div className="tl-viz">
                  <div className="tv-insight">
                    <div className="tv-row"><span className="tv-dot high" /><span>Work-life balance</span><span className="tv-score">9.2</span></div>
                    <div className="tv-row"><span className="tv-dot mid" /><span>Career growth</span><span className="tv-score">6.8</span></div>
                    <div className="tv-row"><span className="tv-dot low" /><span>Meeting culture</span><span className="tv-score">4.3</span></div>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className={`tl-card ${howRevealed ? "reveal-active" : ""}`}>
                <div className="tl-num">2</div>
                <div className="tl-icon-wrap"><ListChecks size={24} /></div>
                <h3>Select Action Plans</h3>
                <p>Choose from proven action templates designed for engagement, leadership, and team effectiveness.</p>
                <div className="tl-viz">
                  <div className="tv-library">
                    <div className="tv-plan"><ClipboardList size={12} /><span>Flex Work Policy</span></div>
                    <div className="tv-plan active"><ClipboardList size={12} /><span>Manager Training</span></div>
                    <div className="tv-plan"><ClipboardList size={12} /><span>Team Rituals</span></div>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className={`tl-card ${howRevealed ? "reveal-active" : ""}`}>
                <div className="tl-num">3</div>
                <div className="tl-icon-wrap"><UserCheck size={24} /></div>
                <h3>Assign Ownership</h3>
                <p>Managers and leaders receive clear responsibilities and measurable goals.</p>
                <div className="tl-viz">
                  <div className="tv-assign">
                    <div className="tv-owner"><div className="tv-avatar">SM</div><span>Sarah M.</span><span className="tv-role">Engineering</span></div>
                    <div className="tv-owner"><div className="tv-avatar">JC</div><span>James C.</span><span className="tv-role">Marketing</span></div>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className={`tl-card ${howRevealed ? "reveal-active" : ""}`}>
                <div className="tl-num">4</div>
                <div className="tl-icon-wrap"><Gauge size={24} /></div>
                <h3>Track Progress</h3>
                <p>Monitor implementation, progress, and workplace improvements over time.</p>
                <div className="tl-viz">
                  <div className="tv-progress">
                    <div className="tv-pbar"><div className="tv-pfill" style={{ width: "85%" }} /><span>85%</span></div>
                    <div className="tv-milestones">
                      <div className="tv-ms done"><Check size={8} /></div>
                      <div className="tv-ms done"><Check size={8} /></div>
                      <div className="tv-ms done"><Check size={8} /></div>
                      <div className="tv-ms current"><Activity size={8} /></div>
                      <div className="tv-ms" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
         4. OUTCOME SECTION
         ================================================================ */}
      <section className="pap-outcome" ref={outcomeRef}>
        <div className="pap-outcome__container">
          <div className={`pap-outcome__header ${outcomeRevealed ? "reveal-active" : ""}`}>
            <span className="pap-outcome__badge">Impact</span>
            <h2 className="pap-outcome__title">Deliver Results Employees Can Feel</h2>
          </div>

          <div className={`pap-outcome__grid ${outcomeRevealed ? "reveal-active" : ""}`}>
            <div className="oc-card oc-card--green">
              <div className="oc-head"><div className="oc-val">{c1}</div><TrendingUp size={18} className="oc-ic" /></div>
              <h3>Higher Employee Engagement</h3>
              <p>Teams with active action plans report 78% higher engagement scores.</p>
              <div className="oc-bars"><div className="ob" style={{ height: "35%" }} /><div className="ob" style={{ height: "50%" }} /><div className="ob" style={{ height: "65%" }} /><div className="ob" style={{ height: "82%" }} /><div className="ob hl" style={{ height: "95%" }} /></div>
            </div>

            <div className="oc-card oc-card--purple">
              <div className="oc-head"><div className="oc-val">{c2}</div><Sparkles size={18} className="oc-ic" /></div>
              <h3>Stronger Manager Effectiveness</h3>
              <p>Managers using guided action plans are 3x more effective at team improvements.</p>
              <div className="oc-ring">
                <svg viewBox="0 0 36 36"><path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(126,83,255,0.1)" strokeWidth="3" /><path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#7e53ff" strokeWidth="3" strokeDasharray="75, 100" strokeLinecap="round" /></svg>
                <span className="ring-v">3x</span>
              </div>
            </div>

            <div className="oc-card oc-card--blue">
              <div className="oc-head"><div className="oc-val">{c3}</div><Users size={18} className="oc-ic" /></div>
              <h3>Better Team Collaboration</h3>
              <p>Cross-functional collaboration improves by 65% with structured team actions.</p>
              <div className="oc-line">
                <svg viewBox="0 0 120 40"><path d="M 0,35 C 20,30 40,22 60,18 S 90,8 120,3" fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" /></svg>
              </div>
            </div>

            <div className="oc-card oc-card--emerald">
              <div className="oc-head"><div className="oc-val">{c4}</div><Heart size={18} className="oc-ic" /></div>
              <h3>Improved Employee Retention</h3>
              <p>Organizations reduce voluntary turnover by 41% within the first year.</p>
              <div className="oc-track"><div className="ot-fill" style={{ width: "82%" }} /></div>
            </div>

            <div className="oc-card oc-card--amber">
              <div className="oc-head"><div className="oc-val">{c5}</div><HandshakeIcon size={18} className="oc-ic" /></div>
              <h3>Greater Organizational Trust</h3>
              <p>92% of employees report higher trust when feedback drives visible action.</p>
              <div className="oc-bars"><div className="ob" style={{ height: "60%" }} /><div className="ob" style={{ height: "70%" }} /><div className="ob" style={{ height: "80%" }} /><div className="ob hl" style={{ height: "92%" }} /></div>
            </div>

            <div className="oc-card oc-card--cyan">
              <div className="oc-head"><div className="oc-val">{c6}</div><RefreshCcw size={18} className="oc-ic" /></div>
              <h3>Faster Improvement Cycles</h3>
              <p>Structured action plans accelerate improvement cycles by 4x on average.</p>
              <div className="oc-track"><div className="ot-fill cyan" style={{ width: "88%" }} /></div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
         5. VISUAL SHOWCASE (DARK)
         ================================================================ */}
      <section className="pap-showcase" id="showcase" ref={showcaseRef}>
        <div className="pap-showcase__glow1" />
        <div className="pap-showcase__glow2" />

        <div className="pap-showcase__container">
          <div className={`pap-showcase__header ${showcaseRevealed ? "reveal-active" : ""}`}>
            <span className="pap-showcase__badge">Platform</span>
            <h2 className="pap-showcase__title">Explore the Action Planning Experience</h2>
          </div>

          <div className={`pap-showcase__tabs ${showcaseRevealed ? "reveal-active" : ""}`}>
            {features.map((f, i) => (
              <button key={i} className={`stab ${activeFeature === i ? "active" : ""}`} onClick={() => setActiveFeature(i)}>
                {f.icon}<span>{f.label}</span>
              </button>
            ))}
          </div>

          <div className={`pap-showcase__display ${showcaseRevealed ? "reveal-active" : ""}`}>

            {/* Action Library */}
            {activeFeature === 0 && (
              <div className="sp-panel anim-in" key="lib">
                <div className="sp-win"><div className="sp-hd"><span className="sp-t">Action Plan Library</span><span className="sp-c">48 Templates</span></div>
                  <div className="sp-bd">
                    <div className="lib-grid">
                      {["Flexible Work Policy", "Manager 1:1 Cadence", "Team Retrospectives", "Career Path Mapping", "DEI Action Framework", "Wellbeing Initiatives"].map((t, i) => (
                        <div key={i} className={`lib-card ${i === 1 ? "featured" : ""}`}>
                          <ClipboardList size={16} className="lib-ic" />
                          <span className="lib-name">{t}</span>
                          <span className="lib-meta">{5 + i * 2} actions · {2 + i} weeks</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Manager Dashboard */}
            {activeFeature === 1 && (
              <div className="sp-panel anim-in" key="mgr">
                <div className="sp-win"><div className="sp-hd"><span className="sp-t">Manager Dashboard</span><span className="sp-s">Sarah M. · Engineering</span></div>
                  <div className="sp-bd">
                    <div className="mgr-layout">
                      <div className="mgr-scores">
                        <div className="mgr-sc"><span className="mgr-lbl">Team Engagement</span><div className="mgr-big">8.6<span>/10</span></div></div>
                        <div className="mgr-sc"><span className="mgr-lbl">Actions Completed</span><div className="mgr-big">14<span>/18</span></div></div>
                      </div>
                      <div className="mgr-priorities">
                        <span className="mgr-plbl">Top Priorities</span>
                        <div className="mgr-pitem"><span className="mgr-dot high" />Reduce overtime hours<ChevronRight size={12} className="mgr-arrow" /></div>
                        <div className="mgr-pitem"><span className="mgr-dot mid" />Improve async communication<ChevronRight size={12} className="mgr-arrow" /></div>
                        <div className="mgr-pitem"><span className="mgr-dot low" />Team building activities<ChevronRight size={12} className="mgr-arrow" /></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Progress Tracking */}
            {activeFeature === 2 && (
              <div className="sp-panel anim-in" key="prog">
                <div className="sp-win"><div className="sp-hd"><span className="sp-t">Progress Tracking</span><span className="sp-live">● Live</span></div>
                  <div className="sp-bd">
                    <div className="prog-layout">
                      <div className="prog-overall">
                        <span className="prog-lbl">Overall Completion</span>
                        <div className="prog-ring">
                          <svg viewBox="0 0 36 36"><path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" /><path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#10b981" strokeWidth="3" strokeDasharray="78, 100" strokeLinecap="round" /></svg>
                          <span className="pr-val">78%</span>
                        </div>
                      </div>
                      <div className="prog-milestones">
                        <span className="prog-mlbl">Milestones</span>
                        <div className="prog-mrow done"><Check size={12} /><span>Policy drafted</span></div>
                        <div className="prog-mrow done"><Check size={12} /><span>Leadership approved</span></div>
                        <div className="prog-mrow done"><Check size={12} /><span>Pilot launched</span></div>
                        <div className="prog-mrow current"><Activity size={12} /><span>Full rollout</span></div>
                        <div className="prog-mrow"><Clock size={12} /><span>Impact review</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Team Insights */}
            {activeFeature === 3 && (
              <div className="sp-panel anim-in" key="team">
                <div className="sp-win"><div className="sp-hd"><span className="sp-t">Team Insights</span><span className="sp-c">Q2 2026</span></div>
                  <div className="sp-bd">
                    <div className="team-layout">
                      <div className="team-chart">
                        <svg viewBox="0 0 200 60" className="team-svg">
                          <path d="M 0,50 C 25,48 40,35 60,28 S 90,15 130,18 S 160,10 200,6" fill="none" stroke="#7e53ff" strokeWidth="2.5" strokeLinecap="round" />
                          <path d="M 0,52 C 25,50 40,45 60,42 S 90,38 130,35 S 160,30 200,26" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 4" strokeLinecap="round" />
                        </svg>
                        <div className="team-legend"><span><i className="td purple" /> Engagement</span><span><i className="td blue" /> Industry Avg</span></div>
                      </div>
                      <div className="team-focus">
                        <span className="tf-lbl">Focus Areas</span>
                        <div className="tf-tags">
                          <span className="tf-tag positive">Work-life balance</span>
                          <span className="tf-tag positive">Team recognition</span>
                          <span className="tf-tag neutral">Career growth</span>
                          <span className="tf-tag negative">Meeting culture</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* AI Recommendations */}
            {activeFeature === 4 && (
              <div className="sp-panel anim-in" key="ai">
                <div className="sp-win"><div className="sp-hd"><span className="sp-t">AI Recommendations</span><span className="sp-ai">✦ AI Powered</span></div>
                  <div className="sp-bd">
                    <div className="ai-layout">
                      <div className="ai-card">
                        <div className="ai-top"><span className="ai-badge">High Impact</span><span className="ai-conf">94% confidence</span></div>
                        <h4>Implement async-first meeting policy</h4>
                        <p>Based on feedback analysis, 72% of employees report meeting overload as a top concern.</p>
                        <button className="ai-action">Create Action Plan <ArrowRight size={12} /></button>
                      </div>
                      <div className="ai-card secondary">
                        <div className="ai-top"><span className="ai-badge">Medium Impact</span><span className="ai-conf">87% confidence</span></div>
                        <h4>Launch quarterly team retrospectives</h4>
                        <p>Teams with regular retros show 45% higher collaboration scores.</p>
                        <button className="ai-action">Create Action Plan <ArrowRight size={12} /></button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Accountability */}
            {activeFeature === 5 && (
              <div className="sp-panel anim-in" key="acc">
                <div className="sp-win"><div className="sp-hd"><span className="sp-t">Accountability Workspace</span><span className="sp-c">6 Active Owners</span></div>
                  <div className="sp-bd">
                    <div className="acc-layout">
                      <div className="acc-row"><div className="acc-av">SM</div><div className="acc-info"><strong>Sarah Mitchell</strong><span>Engineering · 5 actions</span></div><div className="acc-prog"><div className="acc-pbar"><div className="acc-pfill" style={{ width: "90%" }} /></div><span>90%</span></div></div>
                      <div className="acc-row"><div className="acc-av">JC</div><div className="acc-info"><strong>James Chen</strong><span>Marketing · 4 actions</span></div><div className="acc-prog"><div className="acc-pbar"><div className="acc-pfill" style={{ width: "75%" }} /></div><span>75%</span></div></div>
                      <div className="acc-row"><div className="acc-av">LK</div><div className="acc-info"><strong>Laura Kim</strong><span>Sales · 3 actions</span></div><div className="acc-prog"><div className="acc-pbar"><div className="acc-pfill" style={{ width: "60%" }} /></div><span>60%</span></div></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* ================================================================
         6. FAQ SECTION
         ================================================================ */}
      <section className="pap-faq" ref={faqRef}>
        <div className="pap-faq__container">
          <div className={`pap-faq__header ${faqRevealed ? "reveal-active" : ""}`}>
            <span className="pap-faq__badge">Support</span>
            <h2 className="pap-faq__title">Frequently Asked Questions</h2>
          </div>

          <div className={`pap-faq__list ${faqRevealed ? "reveal-active" : ""}`}>
            {faqs.map((faq, idx) => (
              <div key={idx} className={`faq-item ${activeFaq === idx ? "active" : ""}`} onClick={() => toggleFaq(idx)}>
                <div className="faq-q"><span>{faq.q}</span><ChevronDown size={18} className="faq-chev" /></div>
                <div className="faq-a"><p>{faq.a}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
         7. CTA SECTION
         ================================================================ */}
      <section className="pap-cta" ref={ctaRef}>
        <div className="pap-cta__mesh" />
        <div className="pap-cta__orb orb-a" />
        <div className="pap-cta__orb orb-b" />

        <div className={`pap-cta__container ${ctaRevealed ? "reveal-active" : ""}`}>
          <h2 className="pap-cta__title">Make Employee Feedback Matter</h2>
          <p className="pap-cta__desc">
            Transform survey insights into real workplace improvements with proven action plans, clear accountability, and measurable progress.
          </p>
          <div className="pap-cta__buttons">
            <a href="#start" className="pap-btn pap-btn--white">Start Improving Today <ArrowRight size={16} /></a>
            <button onClick={() => setDemoModalOpen(true)} className="pap-btn pap-btn--outline">Book a Demo</button>
          </div>
          <div className="pap-cta__testimonial">
            <p>&quot;Action plans changed everything. Our engagement scores jumped 40 points in 6 months.&quot;</p>
            <div className="cta-author"><strong>Rachel Torres</strong><span>VP People, Notion</span></div>
          </div>
          <div className="pap-cta__badges">
            <span className="cb">🏆 G2 Leader 2026</span>
            <span className="cb">⭐ 4.8/5 Rating</span>
            <span className="cb">🔒 SOC2 Certified</span>
            <span className="cb">🛡️ GDPR Compliant</span>
          </div>
        </div>
      </section>

    </div>
  );
}
