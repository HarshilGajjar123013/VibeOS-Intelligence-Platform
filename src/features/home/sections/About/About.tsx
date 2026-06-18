"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  Target, 
  ShieldCheck, 
  Cpu, 
  Heart,
  ArrowRight, 
  Sparkles,
  Calendar,
  Layers,
  Smile,
  Zap,
  Lock
} from "lucide-react";
import "./About.scss";

// --- Framer Motion Animation Variants ---
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } 
  }
};

type TeamMember = {
  id: number;
  name: string;
  role: string;
  avatar: string;
  focusMetric: string;
  metricLabel: string;
  quote: string;
  color: string;
};

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Co-Founder & CEO",
    avatar: "SM",
    focusMetric: "92%",
    metricLabel: "Average Customer Retention",
    quote: "We're building VibeOS to empower every manager to be a great culture leader and drive real alignment.",
    color: "purple"
  },
  {
    id: 2,
    name: "Dr. Liam Vance",
    role: "Chief People Scientist",
    avatar: "LV",
    focusMetric: "100+",
    metricLabel: "Research-Backed Questions",
    quote: "Designing surveys that capture honest, high-integrity employee sentiment while ensuring psychological safety.",
    color: "blue"
  },
  {
    id: 3,
    name: "Hiroshi Tanaka",
    role: "Staff AI Architect",
    avatar: "HT",
    focusMetric: "1.2s",
    metricLabel: "Average Comment Analysis Speed",
    quote: "Applying advanced, privacy-first NLP models to instantly cluster and summarize open-text workforce feedback.",
    color: "indigo"
  },
  {
    id: 4,
    name: "Chloe Dubois",
    role: "Head of Product Design",
    avatar: "CD",
    focusMetric: "87%",
    metricLabel: "Active Survey Participation Rate",
    quote: "Crafting beautiful, accessible HR tools that make continuous listening feel like an engaging conversation.",
    color: "rose"
  }
];

const CORE_VALUES = [
  {
    icon: <Heart size={20} />,
    title: "Empathy-First Listening",
    desc: "We design tools that respect employee privacy and prioritize psychological safety. Anonymity is never compromised."
  },
  {
    icon: <Cpu size={20} />,
    title: "Action-Oriented AI",
    desc: "We don't just dump charts on HR leaders. We transform open-text comments and pulse data into actionable, guided manager playbooks."
  },
  {
    icon: <ShieldCheck size={20} />,
    title: "Enterprise-Grade Security",
    desc: "All employee metadata, comments, and results are encrypted in transit and at rest. We adhere to the highest SOC2 and GDPR controls."
  },
  {
    icon: <Target size={20} />,
    title: "Continuous Co-creation",
    desc: "We believe company culture is built together. We help leaders iterate and take targeted action rather than reacting after-the-fact."
  }
];

const MILESTONES = [
  {
    year: "2023",
    title: "The Vision & Founding",
    desc: "VibeOS is founded in San Francisco with a single mission: replace long, outdated annual employee surveys with real-time sentiment loops."
  },
  {
    year: "2024",
    title: "Launching the Pulse Engine",
    desc: "We released our lightweight survey framework. Companies achieved 85%+ participation rates by listening directly where teams work (Slack, Teams)."
  },
  {
    year: "2025",
    title: "Vibe AI: Sentiment Synthesis",
    desc: "We introduced advanced NLP clustering, enabling HR teams to analyze thousands of open-text comments and get summarized recommendations in seconds."
  },
  {
    year: "2026",
    title: "EXOS: The Employee Experience OS",
    desc: "Now scaling internationally, VibeOS has evolved into the central Employee Experience Operating System, powering high-performing teams."
  }
];

export default function About() {
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);

  return (
    <section className="vibe-about-section">
      {/* Background Ambient Glows */}
      <div className="glow-orb glow-orb--1" />
      <div className="glow-orb glow-orb--2" />

      <div className="vibe-about-container">
        
        {/* ==========================================
            1. HERO SECTION
            ========================================== */}
        <div className="about-hero">
          <motion.div 
            className="about-hero__content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="about-badge">
              <Sparkles size={12} />
              <span>Our Mission</span>
            </span>
            <h1 className="about-title">
              We're on a mission to build <span>workplaces people love</span>
            </h1>
            <p className="about-subtitle">
              We build technology that helps organizations continuously listen to their people, understand team dynamics, and take targeted action to reduce burnout and improve retention.
            </p>
          </motion.div>
        </div>

        {/* ==========================================
            2. INTERACTIVE STORY JOURNEY (TIMELINE)
            ========================================== */}
        <div className="about-journey-section">
          <div className="about-section-header">
            <span className="section-kicker">Our Journey</span>
            <h2 className="section-title">The Evolution of <span>Continuous Listening</span></h2>
            <p className="section-desc">
              How we went from a simple idea to building the industry's leading Employee Experience Operating System.
            </p>
          </div>

          <div className="journey-timeline">
            {/* Center Line vector */}
            <div className="timeline-center-line" />

            <div className="timeline-items">
              {MILESTONES.map((stone, idx) => (
                <motion.div 
                  key={stone.year}
                  className={`timeline-item ${idx % 2 === 0 ? "left" : "right"}`}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                >
                  <div className="timeline-node">
                    <Calendar size={14} />
                  </div>
                  <div className="timeline-card">
                    <span className="timeline-year">{stone.year}</span>
                    <h3 className="timeline-card-title">{stone.title}</h3>
                    <p className="timeline-card-desc">{stone.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ==========================================
            3. CORE VALUES SECTION
            ========================================== */}
        <div className="about-values-section">
          <div className="about-section-header">
            <span className="section-kicker">Core Values</span>
            <h2 className="section-title">Empathy and Data, <span>Combined</span></h2>
            <p className="section-desc">
              Our core operating principles that guide how we design our software and partner with HR leaders.
            </p>
          </div>

          <motion.div 
            className="values-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {CORE_VALUES.map((val, idx) => (
              <motion.div 
                key={idx} 
                className="value-card"
                variants={fadeUp}
              >
                <div className="value-card__icon">
                  {val.icon}
                </div>
                <h3 className="value-card__title">{val.title}</h3>
                <p className="value-card__desc">{val.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ==========================================
            4. MEET THE TEAM / LEADERSHIP GRID
            ========================================== */}
        <div className="about-team-section">
          <div className="about-section-header">
            <span className="section-kicker">Leadership</span>
            <h2 className="section-title">Meet the team <span>behind VibeOS</span></h2>
            <p className="section-desc">
              We are a team of people scientists, AI developers, and product designers dedicated to workplace experience.
            </p>
          </div>

          <div className="team-grid">
            {TEAM_MEMBERS.map((member) => (
              <div 
                key={member.id} 
                className={`team-card team-card--${member.color} ${hoveredMember === member.id ? "hovered" : ""}`}
                onMouseEnter={() => setHoveredMember(member.id)}
                onMouseLeave={() => setHoveredMember(null)}
              >
                <div className="team-card__top">
                  <div className="team-card__avatar-box">
                    <div className="avatar-circle">{member.avatar}</div>
                  </div>
                  <div className="team-card__metrics">
                    <span className="metric-val">{member.focusMetric}</span>
                    <span className="metric-lbl">{member.metricLabel}</span>
                  </div>
                </div>

                <div className="team-card__info">
                  <h3 className="member-name">{member.name}</h3>
                  <p className="member-role">{member.role}</p>
                  <p className="member-quote">&ldquo;{member.quote}&rdquo;</p>
                </div>

                {/* Focus Overlay Card */}
                <div className="team-card__focus-overlay">
                  <div className="overlay-content">
                    <Sparkles size={16} className="overlay-icon" />
                    <h4>Focus Area</h4>
                    <p>{member.metricLabel}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ==========================================
            5. INVESTORS & BACKING BOARD
            ========================================== */}
        <div className="about-investors-section">
          <span className="investors-title">BACKED BY WORLD-CLASS INVESTORS & PEOPLE EXPERTS</span>
          <div className="investors-logos">
            <div className="logo-box"><span>Y COMBINATOR</span></div>
            <div className="logo-box"><span>SEQUOIA CAPITAL</span></div>
            <div className="logo-box"><span>INDEX VENTURES</span></div>
            <div className="logo-box"><span>FOUNDERS FUND</span></div>
          </div>
        </div>

        {/* ==========================================
            6. CTA SECTION
            ========================================== */}
        <div className="about-cta-section">
          <div className="cta-card">
            <div className="cta-card__content">
              <h2 className="cta-title">Ready to transform your workplace?</h2>
              <p className="cta-desc">
                Join hundreds of organizations using VibeOS to improve employee retention and measure real-time sentiment.
              </p>
              <div className="cta-actions">
                <a href="/contact" className="cta-btn cta-btn--primary">
                  <span>Book a Free Demo</span>
                  <ArrowRight size={16} />
                </a>
                <a href="/dashboard" className="cta-btn cta-btn--secondary">
                  <span>Launch Live Sandbox</span>
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
