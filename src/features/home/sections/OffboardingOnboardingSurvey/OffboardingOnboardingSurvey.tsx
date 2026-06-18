"use client";

import React, { useState, useEffect } from "react";
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
    Lock
} from "lucide-react";
import "./OffboardingOnboardingSurvey.scss";
import { useProtoStore } from "@/src/store/useProtoStore";

// --- Framer Motion Animation Variants ---
const fadeUp = {
    hidden: { opacity: 0, y: 30 },
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

export default function OffboardingOnboardingSurvey() {
    const setDemoModalOpen = useProtoStore((state) => state.setDemoModalOpen);
    const [activeFaq, setActiveFaq] = useState<number | null>(null);
    const [activeStep, setActiveStep] = useState(0);
    const [activeShowcase, setActiveShowcase] = useState(0);
    const [activeHeroTab, setActiveHeroTab] = useState<"onboarding" | "offboarding">("onboarding");

    // Auto-cycle showcase features
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveShowcase((prev) => (prev + 1) % 6);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    const toggleFaq = (idx: number) => {
        setActiveFaq(activeFaq === idx ? null : idx);
    };

    const problemCards = [
        {
            title: "Poor Onboarding Experience",
            desc: "New hires struggle to adapt due to unclear expectations, sparse resources, and inconsistent onboarding processes.",
            icon: <Users size={22} />,
            color: "violet"
        },
        {
            title: "Slow Time-To-Productivity",
            desc: "Organizations lack clear visibility into the specific bottlenecks and learning obstacles that prevent new hires from contributing quickly.",
            icon: <Activity size={22} />,
            color: "blue"
        },
        {
            title: "Hidden Turnover Causes",
            desc: "Companies lose valuable talent and suffer high recruitment costs without fully understanding the underlying reasons why employees depart.",
            icon: <AlertCircle size={22} />,
            color: "rose"
        },
        {
            title: "Missed Improvement Opportunities",
            desc: "Critical employee feedback is collected too late, siloed across systems, or not analyzed effectively to drive process reform.",
            icon: <Brain size={22} />,
            color: "emerald"
        }
    ];

    const steps = [
        {
            step: "01",
            title: "Launch Lifecycle Surveys",
            desc: "Automatically trigger onboarding, milestone, and offboarding surveys at key employee journey stages via HRIS integrations.",
            badge: "Automated Setup",
            visual: "scheduling"
        },
        {
            step: "02",
            title: "Collect Honest Feedback",
            desc: "Gather employee experiences through highly engaging, mobile-optimized surveys designed with scientific methodology.",
            badge: "Pulse Interfaces",
            visual: "response"
        },
        {
            step: "03",
            title: "Analyze Employee Experiences",
            desc: "Use advanced sentiment analysis and category mapping to uncover organizational trends, strengths, and risks.",
            badge: "Real-time Analytics",
            visual: "sentiment"
        },
        {
            step: "04",
            title: "Improve Employee Programs",
            desc: "Turn feedback data into concrete actions. Enable manager notifications and automated plays to resolve operational issues.",
            badge: "Action Loop",
            visual: "action"
        }
    ];

    const kpiCards = [
        { label: "Faster New Hire Productivity", value: 40, suffix: "%", desc: "Average acceleration in onboarding alignment.", color: "blue" },
        { label: "Improved Employee Retention", value: 92, suffix: "%", desc: "Of surveyed companies report lower first-year churn.", color: "purple" },
        { label: "Better Onboarding Satisfaction", value: 4.8, suffix: "/5", decimals: 1, desc: "Average satisfaction score post-platform rollout.", color: "emerald" },
        { label: "Reduced Voluntary Turnover", value: 35, suffix: "%", desc: "Decrease in unexpected employee resignations.", color: "rose" },
        { label: "Stronger Employer Brand", value: 28, suffix: "%", desc: "Increase in Glassdoor and public sentiment scores.", color: "amber" },
        { label: "More Actionable Insights", value: 10, suffix: "x", desc: "Increase in total volume of feedback gathered.", color: "cyan" }
    ];

    const showcaseModules = [
        {
            id: 0,
            label: "Onboarding Surveys",
            title: "Accelerate New Hire Alignment",
            desc: "Deploy surveys throughout the critical initial stages of the employee journey to ensure they feel welcome, supported, and productive.",
            bullets: [
                "First-day registration & system verification check-in",
                "First-week manager, resource, and alignment checks",
                "30, 60, and 90-day milestone reviews to gauge career direction"
            ],
            icon: <Users size={18} />
        },
        {
            id: 1,
            label: "Offboarding Surveys",
            title: "Gather Constructive Exit Insights",
            desc: "Obtain candid, structured exit feedback that reveals why employees choose to depart, and benchmark reason distributions across teams.",
            bullets: [
                "Automated exit survey scheduling upon notice registration",
                "Structured checklists analyzing career growth, compensation, and leadership",
                "Departure sentiment tracking to preserve positive relations"
            ],
            icon: <FileText size={18} />
        },
        {
            id: 2,
            label: "Employee Journey Analytics",
            title: "Visualize the Lifecycle Experience",
            desc: "Track sentiment trends over the entire employment tenure. Identify where engagement dips and map correlations to external events.",
            bullets: [
                "Continuous lifecycle experience and sentiment mapping",
                "Comparative trends by manager, department, and location",
                "Predictive churn alert scorecards based on feedback signals"
            ],
            icon: <TrendingUp size={18} />
        },
        {
            id: 3,
            label: "Survey Automation",
            title: "Effortless, Automated Deliveries",
            desc: "Eliminate administrative overhead. Automatically distribute surveys based on employee join dates or HRIS-recorded changes.",
            bullets: [
                "Direct integrations with Workday, BambooHR, ADP, and more",
                "Multi-channel distribution (Email, Slack, Microsoft Teams)",
                "Smart reminder cadences with quiet-hour preservation"
            ],
            icon: <Settings size={18} />
        },
        {
            id: 4,
            label: "Reporting Dashboard",
            title: "Actionable Organization-wide Insights",
            desc: "Empower executives and department heads with clean data visualizations and segmented reports that surface immediate action items.",
            bullets: [
                "Granular department-level and cohort segmentation filters",
                "AI-summarized open-text themes from transition interviews",
                "Secure export functionality for executive leadership reports"
            ],
            icon: <BarChart3 size={18} />
        },
        {
            id: 5,
            label: "Action Planning",
            title: "Translate Feedback Into Direct Results",
            desc: "Close the loop. Give managers guided improvement recommendations and tracking boards to resolve the problems identified in surveys.",
            bullets: [
                "AI-suggested action templates tailored to specific feedback topics",
                "Assigned task tracking with progression milestones",
                "Follow-up surveys to verify implementation effectiveness"
            ],
            icon: <Target size={18} />
        }
    ];

    const faqs = [
        {
            q: "How do onboarding surveys improve employee experiences?",
            a: "Onboarding surveys give new hires a dedicated, structured channel to voice concerns about alignment, tooling, or support early in their tenure. This allows HR and managers to address obstacles before they impact morale, leading to a smoother onboarding path and higher first-year retention."
        },
        {
            q: "What types of offboarding surveys are included?",
            a: "We provide comprehensive offboarding options, including automated digital exit questionnaires, structured check-ins during the notice period, and detailed template dashboards for HR exit interviews. All metrics are mapped back to departure categories to help identify patterns."
        },
        {
            q: "Can surveys be automated?",
            a: "Yes. By linking VibeOS to your HRIS (such as Workday, BambooHR, or Rippling), surveys are automatically triggered based on milestones like hire dates, tenure milestones, or separation status updates, removing any manual administration."
        },
        {
            q: "How is employee anonymity protected?",
            a: "Anonymity settings can be customized based on your preferences. We offer full anonymity mode, where metadata (like name or email) is stripped and responses are only viewable in aggregate. We also maintain clear labels to ensure trust."
        },
        {
            q: "Can managers access team-level insights?",
            a: "Yes, managers can access dashboard views containing team scores, engagement metrics, and anonymous action recommendations, provided their team meets the minimum size threshold (e.g. 4+ members) to preserve privacy."
        },
        {
            q: "How often should lifecycle surveys be conducted?",
            a: "We recommend surveys at day 1, day 7, day 30, day 60, and day 90 for new hires. For offboarding, one exit survey is triggered upon separation notice. Regular check-ins are kept concise to prevent survey fatigue."
        },
        {
            q: "Can survey templates be customized?",
            a: "Absolutely. We provide scientific templates as a foundation, but you can add custom questions, adjust rating scales, modify delivery methods, or rewrite prompts using our simple custom questionnaire builder."
        },
        {
            q: "What HR systems can be integrated?",
            a: "We support integrations with major HRIS applications, including Workday, BambooHR, SAP SuccessFactors, ADP, and HiBob. We also provide direct Slack and MS Teams delivery systems and open developer APIs."
        }
    ];

    return (
        <div className="oos-page">
            {/* ==========================================
          1. HERO SECTION
          ========================================== */}
            <section className="oos-hero">
                <div className="oos-hero__bg">
                    <div className="oos-hero__glow oos-hero__glow--1" />
                    <div className="oos-hero__glow oos-hero__glow--2" />
                </div>

                <div className="oos-hero__container">
                    <motion.div
                        className="oos-hero__content"
                        initial="hidden"
                        animate="visible"
                        variants={fadeUp}
                    >
                        <span className="oos-hero__badge">
                            <Sparkles size={12} className="mr-1.5" />
                            Employee Lifecycle Platform
                        </span>
                        <h1 className="oos-hero__title">
                            Understand Every Employee Journey <span>From Start to Finish</span>
                        </h1>
                        <p className="oos-hero__desc">
                            Capture meaningful insights during onboarding and offboarding to improve employee experiences, reduce turnover, accelerate productivity, and build a stronger workplace culture.
                        </p>
                        <div className="oos-hero__ctas">
                            <button className="oos-btn oos-btn--primary">
                                Get Started
                                <ArrowRight size={16} className="ml-1.5" />
                            </button>
                            <button className="oos-btn oos-btn--secondary">
                                View Survey Templates
                            </button>
                        </div>

                        <div className="oos-hero__trust">
                            <div className="trust-col">
                                <strong>1.2M+</strong>
                                <span>Employees Surveyed</span>
                            </div>
                            <div className="trust-sep" />
                            <div className="trust-col">
                                <strong>98.6%</strong>
                                <span>Satisfaction Rating</span>
                            </div>
                            <div className="trust-sep" />
                            <div className="trust-col">
                                <strong>SOC2</strong>
                                <span>Secure & Compliant</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="oos-hero__visual"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="hero-widget">
                            <div className="hero-widget__header">
                                <div className="hero-widget__dots"><span /><span /><span /></div>
                                <div className="hero-widget__tabs">
                                    <button
                                        className={`tab-btn ${activeHeroTab === "onboarding" ? "active" : ""}`}
                                        onClick={() => setActiveHeroTab("onboarding")}
                                    >
                                        Onboarding Feed
                                    </button>
                                    <button
                                        className={`tab-btn ${activeHeroTab === "offboarding" ? "active" : ""}`}
                                        onClick={() => setActiveHeroTab("offboarding")}
                                    >
                                        Exit Analysis
                                    </button>
                                </div>
                            </div>

                            <div className="hero-widget__body">
                                <AnimatePresence mode="wait">
                                    {activeHeroTab === "onboarding" ? (
                                        <motion.div
                                            key="onb"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.3 }}
                                            className="tab-content"
                                        >
                                            {/* Metric widgets row */}
                                            <div className="stat-cards">
                                                <div className="s-card green">
                                                    <span className="s-lbl">Onboarding Score</span>
                                                    <span className="s-val">8.8/10</span>
                                                    <span className="s-trend text-green-500">▲ +4.2% this Q</span>
                                                </div>
                                                <div className="s-card purple">
                                                    <span className="s-lbl">Completion Rate</span>
                                                    <span className="s-val">94.3%</span>
                                                    <div className="s-progress"><div className="s-fill" style={{ width: "94%" }} /></div>
                                                </div>
                                            </div>

                                            {/* Timeline Feed */}
                                            <div className="feed-list">
                                                <span className="feed-title">Milestone Checklist Status</span>
                                                <div className="feed-item active">
                                                    <div className="f-indicator"><div className="f-inner" /></div>
                                                    <div className="f-info">
                                                        <strong>Day 30 Review Completed</strong>
                                                        <span>Engineering cohort · 8 responses</span>
                                                    </div>
                                                    <span className="f-score">8.5</span>
                                                </div>
                                                <div className="feed-item">
                                                    <div className="f-indicator done"><Check size={8} /></div>
                                                    <div className="f-info">
                                                        <strong>Day 7 Setup Check</strong>
                                                        <span>Marketing cohort · 12 responses</span>
                                                    </div>
                                                    <span className="f-score">9.2</span>
                                                </div>
                                                <div className="feed-item pending">
                                                    <div className="f-indicator pending"><Clock size={8} /></div>
                                                    <div className="f-info">
                                                        <strong>Day 60 Review Scheduled</strong>
                                                        <span>Sales cohort · Automated trigger</span>
                                                    </div>
                                                    <span className="f-score">--</span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="offb"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.3 }}
                                            className="tab-content"
                                        >
                                            <div className="stat-cards">
                                                <div className="s-card rose">
                                                    <span className="s-lbl">Separations Surveyed</span>
                                                    <span className="s-val">42</span>
                                                    <span className="s-trend text-red-500">▼ Exit feedback captured</span>
                                                </div>
                                                <div className="s-card amber">
                                                    <span className="s-lbl">Key Driver: Churn Risk</span>
                                                    <span className="s-val">Career Path</span>
                                                    <span className="s-trend text-amber-500">54% of exits</span>
                                                </div>
                                            </div>

                                            <div className="exit-drivers">
                                                <span className="feed-title">Primary Separation Reasons</span>
                                                <div className="driver-bar">
                                                    <div className="db-text"><span>Career Growth & Opportunity</span><span>42%</span></div>
                                                    <div className="db-track"><div className="db-fill purple" style={{ width: "42%" }} /></div>
                                                </div>
                                                <div className="driver-bar">
                                                    <div className="db-text"><span>Compensation & Benefits</span><span>28%</span></div>
                                                    <div className="db-track"><div className="db-fill blue" style={{ width: "28%" }} /></div>
                                                </div>
                                                <div className="driver-bar">
                                                    <div className="db-text"><span>Management Alignment</span><span>18%</span></div>
                                                    <div className="db-track"><div className="db-fill rose" style={{ width: "18%" }} /></div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Floating Analytics Badges */}
                        <div className="floater-badge floater-badge--1">
                            <div className="fb-avatar">JS</div>
                            <div className="fb-text">
                                <strong>Survey Submitted</strong>
                                <span>John S. (Product) · Day 30</span>
                            </div>
                        </div>
                        <div className="floater-badge floater-badge--2">
                            <div className="fb-icon"><Shield size={12} /></div>
                            <div className="fb-text">
                                <strong>Anonymity Safeguard</strong>
                                <span>Aggregation threshold met</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Enterprise Logos Bar */}
                <div className="oos-logos">
                    <div className="oos-logos__container">
                        <span className="logos-title">Empowering employee experience teams globally</span>
                        <div className="logos-wrapper">
                            {["Stripe", "Figma", "Notion", "Linear", "Vercel", "Brex", "Webflow"].map((logo) => (
                                <span key={logo} className="logo-item">{logo}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ==========================================
          2. PROBLEM SECTION
          ========================================== */}
            <section className="oos-problem">
                <div className="oos-problem__container">
                    <div className="oos-section-header text-center max-w-2xl mx-auto mb-16">
                        <span className="section-kicker">The Challenge</span>
                        <h2 className="section-title">Most Companies Miss Critical Employee Insights</h2>
                        <p className="section-desc">
                            Organizations often focus exclusively on annual engagement checks while completely overlooking the high-fidelity feedback generated during onboarding and offboarding.
                        </p>
                    </div>

                    <motion.div
                        className="oos-problem__grid"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        {problemCards.map((card, idx) => (
                            <motion.div
                                key={idx}
                                className={`prob-card prob-card--${card.color}`}
                                variants={fadeUp}
                            >
                                <div className="prob-card__icon-wrap">
                                    {card.icon}
                                </div>
                                <h3 className="prob-card__title">{card.title}</h3>
                                <p className="prob-card__desc">{card.desc}</p>
                                <div className="prob-card__glow" />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ==========================================
          3. HOW IT WORKS SECTION
          ========================================== */}
            <section className="oos-how">
                <div className="oos-how__container">
                    <div className="oos-section-header text-center max-w-2xl mx-auto mb-20">
                        <span className="section-kicker">Framework</span>
                        <h2 className="section-title">Capture Insights Across the Employee Lifecycle</h2>
                    </div>

                    <div className="oos-how__layout">
                        {/* Timeline Column */}
                        <div className="oos-how__timeline">
                            <div className="steps-list">
                                {steps.map((st, idx) => (
                                    <div
                                        key={idx}
                                        className={`step-item ${idx === activeStep ? "active" : ""} ${idx < activeStep ? "passed" : ""}`}
                                        onClick={() => setActiveStep(idx)}
                                    >
                                        <div className="step-num-bubble">
                                            <span>{st.step}</span>
                                        </div>
                                        <div className="step-info">
                                            <span className="step-badge">{st.badge}</span>
                                            <h3 className="step-title">{st.title}</h3>
                                            <p className="step-desc">{st.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Visual Preview Column */}
                        <div className="oos-how__visual">
                            <div className="visual-outer">
                                <div className="visual-inner">
                                    <AnimatePresence mode="wait">
                                        {activeStep === 0 && (
                                            <motion.div
                                                key="v-0"
                                                initial={{ opacity: 0, scale: 0.96 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.96 }}
                                                className="v-widget"
                                            >
                                                <div className="v-widget__title">Lifecycle Automations</div>

                                                {/* Integrated flowchart */}
                                                <div className="step-mini-visual step-mini-visual--automations mb-4">
                                                    <div className="integration-flow">
                                                        <div className="integration-node hris-logo">
                                                            <Users size={12} className="text-emerald-500 mr-1 shrink-0" />
                                                            <span>BambooHR</span>
                                                        </div>
                                                        <div className="integration-line">
                                                            <span className="pulse-dot" />
                                                        </div>
                                                        <div className="integration-node vibe-logo">
                                                            <Sparkles size={12} className="text-purple-500 mr-1 shrink-0" />
                                                            <span>VibeOS</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="v-widget__triggers">
                                                    <div className="trigger-row">
                                                        <span className="tr-title">Onboarding Day 1 Check</span>
                                                        <span className="tr-status active">Active</span>
                                                    </div>
                                                    <div className="trigger-row">
                                                        <span className="tr-title">Milestone Day 30 Review</span>
                                                        <span className="tr-status active">Active</span>
                                                    </div>
                                                    <div className="trigger-row">
                                                        <span className="tr-title">Milestone Day 90 Alignment</span>
                                                        <span className="tr-status active">Active</span>
                                                    </div>
                                                    <div className="trigger-row">
                                                        <span className="tr-title">Exit Interview Survey</span>
                                                        <span className="tr-status active">Active</span>
                                                    </div>
                                                </div>
                                                <div className="v-widget__bottom mt-4">
                                                    <span>Connected to BambooHR • 124 triggers today</span>
                                                </div>
                                            </motion.div>
                                        )}

                                        {activeStep === 1 && (
                                            <motion.div
                                                key="v-1"
                                                initial={{ opacity: 0, scale: 0.96 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.96 }}
                                                className="v-widget"
                                            >
                                                <div className="survey-frame">
                                                    <div className="sf-header">
                                                        <span className="sf-subtitle">Milestone Survey • Day 30</span>
                                                        <span className="sf-title">How is your alignment on team goals?</span>
                                                    </div>
                                                    <div className="sf-options">
                                                        <button className="sf-opt">🤩 Extremely Clear</button>
                                                        <button className="sf-opt active">😊 Mostly Clear</button>
                                                        <button className="sf-opt">😐 Somewhat Unclear</button>
                                                        <button className="sf-opt">😟 Not Clear at All</button>
                                                    </div>
                                                    <div className="sf-anonymity">
                                                        <Lock size={10} className="mr-1 shrink-0 text-slate-400" />
                                                        <span>Your feedback is anonymous & secure</span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}

                                        {activeStep === 2 && (
                                            <motion.div
                                                key="v-2"
                                                initial={{ opacity: 0, scale: 0.96 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.96 }}
                                                className="v-widget"
                                            >
                                                <div className="v-widget__title">Sentiment Trends</div>
                                                <div className="step-mini-visual step-mini-visual--analytics">
                                                    <div className="analytics-chart my-4">
                                                        <svg viewBox="0 0 200 80" className="w-full h-24">
                                                            <defs>
                                                                <linearGradient id="chart-grad-large" x1="0" y1="0" x2="0" y2="1">
                                                                    <stop offset="0%" stopColor="#7e53ff" stopOpacity="0.3" />
                                                                    <stop offset="100%" stopColor="#7e53ff" stopOpacity="0" />
                                                                </linearGradient>
                                                            </defs>
                                                            <path d="M 0 70 Q 50 50 100 60 T 200 20 L 200 80 L 0 80 Z" fill="url(#chart-grad-large)" />
                                                            <path d="M 0 70 Q 50 50 100 60 T 200 20" fill="none" stroke="#7e53ff" strokeWidth="2.5" strokeLinecap="round" />
                                                            <circle cx="200" cy="20" r="4" fill="#7e53ff" />
                                                            <circle cx="200" cy="20" r="8" fill="#7e53ff" fillOpacity="0.3" className="pulse-ring-glow" />
                                                        </svg>
                                                    </div>
                                                    <div className="sentiment-kpi text-center mt-2">
                                                        <span className="kpi-lbl">Current Positive Index</span>
                                                        <span className="kpi-val text-green-500">82.4%</span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}

                                        {activeStep === 3 && (
                                            <motion.div
                                                key="v-3"
                                                initial={{ opacity: 0, scale: 0.96 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.96 }}
                                                className="v-widget"
                                            >
                                                <div className="v-widget__title">Action Plan Builder</div>
                                                <div className="step-mini-visual step-mini-visual--action">
                                                    <div className="action-tasks mb-4">
                                                        <div className="task-item completed flex items-center text-slate-400 line-through text-xs mb-2">
                                                            <CheckCircle2 size={12} className="text-emerald-500 mr-2 shrink-0" />
                                                            <span>Verify department system access</span>
                                                        </div>
                                                        <div className="task-item active flex items-center text-slate-700 text-xs mb-2">
                                                            <Clock size={12} className="text-amber-500 mr-2 shrink-0" />
                                                            <span>Schedule Day 30 manager check-in</span>
                                                        </div>
                                                        <div className="task-item active flex items-center text-slate-700 text-xs">
                                                            <Clock size={12} className="text-amber-500 mr-2 shrink-0" />
                                                            <span>Launch weekly cohort meetings</span>
                                                        </div>
                                                    </div>
                                                    <div className="action-progress mb-4">
                                                        <div className="progress-bar w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-1">
                                                            <span className="block h-full bg-purple-500" style={{ width: "75%" }} />
                                                        </div>
                                                        <span className="progress-lbl text-[10px] font-bold text-slate-500">3/4 Actions Done</span>
                                                    </div>
                                                </div>
                                                <div className="v-widget__bottom">
                                                    <span>3 goals assigned to engineering managers</span>
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
          4. OUTCOME SECTION
          ========================================== */}
            <section className="oos-outcome">
                <div className="oos-outcome__container">
                    <div className="oos-section-header text-center max-w-2xl mx-auto mb-16">
                        <span className="section-kicker">Impact</span>
                        <h2 className="section-title">Improve Employee Experience At Every Stage</h2>
                        <p className="section-desc">
                            Data-driven organizations see massive performance and culture gains by responding directly to transition feedback.
                        </p>
                    </div>

                    <motion.div
                        className="oos-outcome__grid"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        {kpiCards.map((kpi, idx) => (
                            <motion.div
                                key={idx}
                                className={`kpi-card kpi-card--${kpi.color}`}
                                variants={fadeUp}
                            >
                                <div className="kpi-card__top">
                                    <div className="kpi-card__value">
                                        <Counter target={kpi.value} suffix={kpi.suffix} decimals={kpi.decimals} />
                                    </div>
                                    <div className="kpi-card__trend-icon">
                                        <TrendingUp size={16} />
                                    </div>
                                </div>
                                <h3 className="kpi-card__label">{kpi.label}</h3>
                                <p className="kpi-card__desc">{kpi.desc}</p>
                                {/* Custom visual mockup under description */}
                                {idx === 0 && (
                                    <div className="kpi-card__chart-bars">
                                        <span style={{ height: "30%" }} />
                                        <span style={{ height: "50%" }} />
                                        <span style={{ height: "65%" }} />
                                        <span style={{ height: "80%" }} />
                                        <span className="active" style={{ height: "95%" }} />
                                    </div>
                                )}
                                {idx === 1 && (
                                    <div className="kpi-card__circle-progress">
                                        <svg viewBox="0 0 36 36" className="w-12 h-12 shrink-0">
                                            <path
                                                className="bg"
                                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                fill="none"
                                                stroke="rgba(126, 83, 255, 0.08)"
                                                strokeWidth="3.5"
                                            />
                                            <path
                                                className="fill"
                                                strokeDasharray="92, 100"
                                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                fill="none"
                                                stroke="#7e53ff"
                                                strokeWidth="3.5"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                        <span className="val-text">92%</span>
                                    </div>
                                )}
                                {idx === 2 && (
                                    <div className="kpi-card__sparkline">
                                        <svg viewBox="0 0 100 30" className="w-full h-8">
                                            <path
                                                d="M0,25 Q15,10 30,22 T60,5 T90,2 T100,2"
                                                fill="none"
                                                stroke="#10b981"
                                                strokeWidth="2.5"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                    </div>
                                )}
                                {idx === 3 && (
                                    <div className="kpi-card__sparkline">
                                        <svg viewBox="0 0 100 30" className="w-full h-8">
                                            <path
                                                d="M0,5 Q20,8 40,20 T70,12 T90,28 T100,28"
                                                fill="none"
                                                stroke="#f43f5e"
                                                strokeWidth="2.5"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                    </div>
                                )}
                                {idx === 4 && (
                                    <div className="kpi-card__brand-metric">
                                        <div className="brand-bar"><div className="fill" style={{ width: "28%" }} /></div>
                                        <span className="lbl">+28% YoY Growth</span>
                                    </div>
                                )}
                                {idx === 5 && (
                                    <div className="kpi-card__chart-bars kpi-card__chart-bars--cyan">
                                        <span style={{ height: "10%" }} />
                                        <span style={{ height: "25%" }} />
                                        <span style={{ height: "45%" }} />
                                        <span style={{ height: "70%" }} />
                                        <span className="active" style={{ height: "95%" }} />
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ==========================================
          5. VISUAL SHOWCASE SECTION
          ========================================== */}
            <section className="oos-showcase">
                <div className="oos-showcase__bg">
                    <div className="showcase-glow" />
                </div>

                <div className="oos-showcase__container">
                    <div className="oos-section-header text-center max-w-2xl mx-auto mb-16">
                        <span className="section-kicker">Product Tour</span>
                        <h2 className="section-title">Everything You Need To Understand Employee Experiences</h2>
                    </div>

                    {/* Interactive Navigation Tabs */}
                    <div className="oos-showcase__tabs">
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
                    <div className="oos-showcase__display">
                        <AnimatePresence mode="wait">
                            {showcaseModules.map((mod, idx) => {
                                if (idx !== activeShowcase) return null;

                                return (
                                    <motion.div
                                        key={mod.id}
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -15 }}
                                        transition={{ duration: 0.4 }}
                                        className="showcase-panel"
                                    >
                                        <div className="showcase-panel__info">
                                            <span className="panel-badge">Module Highlight</span>
                                            <h3 className="panel-title">{mod.title}</h3>
                                            <p className="panel-desc">{mod.desc}</p>
                                            <ul className="panel-bullets">
                                                {mod.bullets.map((bullet, bIdx) => (
                                                    <li key={bIdx}>
                                                        <CheckCircle2 size={16} className="text-purple-500 mr-2 shrink-0" />
                                                        <span>{bullet}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                            <button className="oos-btn oos-btn--primary mt-6">
                                                Explore Feature
                                                <ArrowRight size={14} className="ml-1.5" />
                                            </button>
                                        </div>

                                        <div className="showcase-panel__visual">
                                            <div className="window-mock">
                                                <div className="window-mock__header">
                                                    <div className="dots"><span /><span /><span /></div>
                                                    <span className="url">vibeos.com/analytics/{mod.label.toLowerCase().replace(" ", "-")}</span>
                                                </div>
                                                <div className="window-mock__body">
                                                    {/* Render custom CSS visualizations based on active tab */}
                                                    {idx === 0 && (
                                                        <div className="onb-viz">
                                                            <span className="viz-section-lbl">Cohort Funnel Retention</span>
                                                            <div className="funnel-chart">
                                                                <div className="f-bar level-1"><span>Onboarded (100%)</span></div>
                                                                <div className="f-bar level-2"><span>Day 30 (92%)</span></div>
                                                                <div className="f-bar level-3"><span>Day 90 (87%)</span></div>
                                                            </div>
                                                            <div className="viz-stats">
                                                                <div className="v-stat"><span>Avg Time-to-prod</span><strong>14 Days</strong></div>
                                                                <div className="v-stat"><span>Feedback Volume</span><strong>96%</strong></div>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {idx === 1 && (
                                                        <div className="offb-viz">
                                                            <span className="viz-section-lbl">Exit Reason Analysis</span>
                                                            <div className="reason-grid">
                                                                <div className="reason-card">
                                                                    <span>Career Progression</span>
                                                                    <strong>58%</strong>
                                                                </div>
                                                                <div className="reason-card">
                                                                    <span>Comp & Perks</span>
                                                                    <strong>24%</strong>
                                                                </div>
                                                                <div className="reason-card">
                                                                    <span>Team Culture</span>
                                                                    <strong>12%</strong>
                                                                </div>
                                                                <div className="reason-card">
                                                                    <span>Other</span>
                                                                    <strong>6%</strong>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {idx === 2 && (
                                                        <div className="journey-viz">
                                                            <span className="viz-section-lbl">Continuous Sentiment Map</span>
                                                            <div className="graph-mock">
                                                                <svg viewBox="0 0 300 120" className="w-full h-full">
                                                                    <path d="M 0 100 Q 50 40 100 80 T 200 30 T 300 10" fill="none" stroke="#a78bfa" strokeWidth="3" />
                                                                    <path d="M 0 100 Q 50 40 100 80 T 200 30 T 300 10 L 300 120 L 0 120 Z" fill="url(#grad)" opacity="0.1" />
                                                                    <defs>
                                                                        <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                                                                            <stop offset="0%" stopColor="#a78bfa" />
                                                                            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
                                                                        </linearGradient>
                                                                    </defs>
                                                                </svg>
                                                                <div className="graph-dots">
                                                                    <div className="dot" style={{ left: "15%", top: "45%" }} />
                                                                    <div className="dot" style={{ left: "50%", top: "65%" }} />
                                                                    <div className="dot active" style={{ left: "80%", top: "25%" }} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {idx === 3 && (
                                                        <div className="automation-viz">
                                                            <span className="viz-section-lbl">Active Integrations & Sync</span>
                                                            <div className="sync-map">
                                                                <div className="node hr"><span>HRIS (Workday)</span></div>
                                                                <div className="connector">
                                                                    <div className="pulse" />
                                                                </div>
                                                                <div className="node app"><span>VibeOS</span></div>
                                                                <div className="connector">
                                                                    <div className="pulse delay" />
                                                                </div>
                                                                <div className="node slack"><span>Slack Delivery</span></div>
                                                            </div>
                                                            <span className="sync-lbl">Auto-triggered on status changes</span>
                                                        </div>
                                                    )}

                                                    {idx === 4 && (
                                                        <div className="reporting-viz">
                                                            <span className="viz-section-lbl">Organization Cohorts</span>
                                                            <div className="metric-table">
                                                                <div className="table-row head">
                                                                    <span>Cohort</span><span>Participation</span><span>Score</span>
                                                                </div>
                                                                <div className="table-row">
                                                                    <span>Engineering</span><span>94%</span><span>8.6</span>
                                                                </div>
                                                                <div className="table-row">
                                                                    <span>Product Management</span><span>100%</span><span>8.9</span>
                                                                </div>
                                                                <div className="table-row">
                                                                    <span>Global Sales</span><span>88%</span><span>7.4</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {idx === 5 && (
                                                        <div className="planning-viz">
                                                            <span className="viz-section-lbl">Manager Recommended Actions</span>
                                                            <div className="action-cards-deck">
                                                                <div className="a-deck-card">
                                                                    <div className="a-badge high">High Priority</div>
                                                                    <h4>Address Engineering Day 30 Support</h4>
                                                                    <p>AI detected a drop in tooling satisfaction scores.</p>
                                                                </div>
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
            <section className="oos-faq">
                <div className="oos-faq__container">
                    <div className="oos-section-header text-center max-w-2xl mx-auto mb-16">
                        <span className="section-kicker">FAQ</span>
                        <h2 className="section-title">Frequently Asked Questions</h2>
                    </div>

                    <div className="oos-faq__list max-w-3xl mx-auto">
                        {faqs.map((faq, idx) => {
                            const isOpen = idx === activeFaq;
                            return (
                                <div
                                    key={idx}
                                    className={`faq-card ${isOpen ? "open" : ""}`}
                                >
                                    <button
                                        className="faq-card__trigger"
                                        onClick={() => toggleFaq(idx)}
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
            <section className="oos-cta">
                <div className="oos-cta__bg">
                    <div className="orb orb-1" />
                    <div className="orb orb-2" />
                </div>

                <div className="oos-cta__container">
                    <div className="oos-cta__box">
                        <h2 className="oos-cta__title">
                            Create Better Employee Experiences <span>From Day One To Day Last</span>
                        </h2>
                        <p className="oos-cta__desc">
                            Use onboarding and offboarding surveys to understand employee needs, improve retention, and continuously strengthen your workplace culture.
                        </p>
                        <div className="oos-cta__ctas">
                            <button className="oos-btn oos-btn--white">
                                Get Started Today
                                <ArrowRight size={16} className="ml-1.5" />
                            </button>
                            <button onClick={() => setDemoModalOpen(true)} className="oos-btn oos-btn--outline">
                                Book a Demo
                            </button>
                        </div>

                        <div className="oos-cta__testimonial">
                            <p className="quote">
                                &quot;VibeOS transformed our transition tracking. We reduced our first-year voluntary turnover by 35% in less than 9 months.&quot;
                            </p>
                            <div className="author">
                                <strong>Clara Reynolds</strong>
                                <span>VP of Employee Experience, Vercel</span>
                            </div>
                        </div>

                        <div className="oos-cta__badges">
                            <span className="badge">⭐ 4.9 Rating</span>
                            <span className="badge">🔒 SOC2 Certified</span>
                            <span className="badge">🇪🇺 GDPR Compliant</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
