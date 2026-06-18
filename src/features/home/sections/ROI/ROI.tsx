"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Briefcase, 
  ArrowRight, 
  ChevronDown, 
  Info, 
  SlidersHorizontal,
  ChevronRight,
  HelpCircle,
  Sparkles,
  Building,
  Target,
  FileText,
  BarChart3,
  Calendar,
  Smile,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";
import "./ROI.scss";

// --- Framer Motion Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

// --- Currency Configs ---
const CURRENCIES = [
  { value: "USD", symbol: "$", rate: 1.0 },
  { value: "EUR", symbol: "€", rate: 0.92 },
  { value: "GBP", symbol: "£", rate: 0.79 },
  { value: "AUD", symbol: "A$", rate: 1.51 },
  { value: "INR", symbol: "₹", rate: 83.5 }
];

export default function ROI() {
  // --- State Variables ---
  const [selectedCurrency, setSelectedCurrency] = useState(CURRENCIES[0]);
  const [employees, setEmployees] = useState(1000);
  const [turnoverRate, setTurnoverRate] = useState(15);
  const [avgSalary, setAvgSalary] = useState(80000);
  
  // Advanced settings state
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [managersCount, setManagersCount] = useState(100);
  const [avgManagerSalary, setAvgManagerSalary] = useState(100000);
  const [hrCount, setHrCount] = useState(10);
  const [avgHrSalary, setAvgHrSalary] = useState(90000);
  const [netProfit, setNetProfit] = useState(5000000);

  // Sync manager and HR counts to headcount defaults if not customized
  useEffect(() => {
    // If manager count is close to default, keep it at ~10% of headcount
    if (!showAdvanced) {
      setManagersCount(Math.max(5, Math.round(employees * 0.1)));
      setHrCount(Math.max(1, Math.round(employees * 0.01)));
    }
  }, [employees, showAdvanced]);

  // --- Dynamic ROI Calculations ---
  // 1. Attrition Reduction (Culture Amp standard: 5% relative reduction, replacement cost 20% of salary)
  const savedDepartures = Math.round(employees * (turnoverRate / 100) * 0.0533);
  const replacementCostPerEmp = avgSalary * 0.20;
  const attritionBenefit = savedDepartures * replacementCostPerEmp;
  
  // 2. Manager Productivity Benefit (20% productivity gain with a 10% capture rate)
  const managerPayroll = managersCount * avgManagerSalary;
  const managerBenefit = managerPayroll * 0.20 * 0.10;

  // 3. HR Productivity Benefit (20% productivity gain with a 50% capture rate)
  const hrPayroll = hrCount * avgHrSalary;
  const hrBenefit = hrPayroll * 0.20 * 0.50;

  // 4. Enhanced Profitability Benefit (0.5% net profit margin increase)
  const profitBenefit = netProfit * 0.005;

  // Totals
  const totalAnnualBenefits = attritionBenefit + managerBenefit + hrBenefit + profitBenefit;
  
  // VibeOS Cost ($6/user/month for Enterprise tier)
  const vibeOsCost = employees * 6 * 12;
  const netSavings = totalAnnualBenefits - vibeOsCost;
  const roiPercentage = vibeOsCost > 0 ? Math.round((netSavings / vibeOsCost) * 100) : 0;

  // Convert numbers based on currency
  const formatCurrency = (val: number) => {
    const converted = val * selectedCurrency.rate;
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: selectedCurrency.value,
      maximumFractionDigits: 0,
    }).format(converted);
  };

  // --- Accordion FAQ State ---
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  // --- Interactive Scenario Modeling Tabs ---
  const [activeTab, setActiveTab] = useState<"retention" | "managers" | "hr" | "profitability">("retention");

  return (
    <main className="vibe-roi-section">
      {/* Background Ambient Gradients */}
      <div className="roi-glow-orb roi-glow-orb--1" />
      <div className="roi-glow-orb roi-glow-orb--2" />
      <div className="roi-glow-orb roi-glow-orb--3" />

      <div className="vibe-roi-container">
        
        {/* ==========================================
            1. HERO & CALCULATOR PANEL
            ========================================== */}
        <section className="roi-hero">
          <motion.div 
            className="roi-hero__header"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="roi-badge">
              <Sparkles size={12} />
              <span>Business Case Builder</span>
            </span>
            <h1 className="roi-hero-title">
              Quantify the Business Impact of <span>Employee Experience</span>
            </h1>
            <p className="roi-hero-subtitle">
              Calculate your organization's potential returns in employee retention, managerial productivity, and HR efficiency with VibeOS.
            </p>
          </motion.div>

          {/* Interactive Calculator Dashboard */}
          <div className="calculator-dashboard" id="calculator">
            
            {/* Left Panel: Inputs */}
            <div className="calculator-inputs">
              <div className="inputs-header">
                <div className="title-box">
                  <SlidersHorizontal size={18} />
                  <h2>Calculator Inputs</h2>
                </div>
                <div className="currency-selector">
                  <label htmlFor="currency">Currency</label>
                  <select 
                    id="currency"
                    value={selectedCurrency.value} 
                    onChange={(e) => {
                      const found = CURRENCIES.find(c => c.value === e.target.value);
                      if (found) setSelectedCurrency(found);
                    }}
                  >
                    {CURRENCIES.map(c => (
                      <option key={c.value} value={c.value}>{c.value} ({c.symbol})</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Standard Inputs */}
              <div className="inputs-group">
                {/* Employees Slider */}
                <div className="slider-container">
                  <div className="slider-labels">
                    <span className="slider-title">
                      <Users size={16} /> Number of Employees
                    </span>
                    <span className="slider-value">{employees.toLocaleString()}</span>
                  </div>
                  <input 
                    type="range" 
                    min="50" 
                    max="10000" 
                    step="50"
                    value={employees} 
                    onChange={(e) => setEmployees(Number(e.target.value))}
                    className="vibe-range-slider"
                  />
                  <div className="slider-limits">
                    <span>50</span>
                    <span>10,000+</span>
                  </div>
                </div>

                {/* Turnover Rate Slider */}
                <div className="slider-container">
                  <div className="slider-labels">
                    <span className="slider-title">
                      <TrendingDown size={16} /> Current Voluntary Turnover
                    </span>
                    <span className="slider-value">{turnoverRate}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="5" 
                    max="45" 
                    step="0.5"
                    value={turnoverRate} 
                    onChange={(e) => setTurnoverRate(Number(e.target.value))}
                    className="vibe-range-slider"
                  />
                  <div className="slider-limits">
                    <span>5%</span>
                    <span>45%</span>
                  </div>
                </div>

                {/* Average Employee Salary */}
                <div className="slider-container">
                  <div className="slider-labels">
                    <span className="slider-title">
                      <DollarSign size={16} /> Avg. Annual Employee Salary
                    </span>
                    <span className="slider-value">{formatCurrency(avgSalary)}</span>
                  </div>
                  <input 
                    type="range" 
                    min="30000" 
                    max="220000" 
                    step="5000"
                    value={avgSalary} 
                    onChange={(e) => setAvgSalary(Number(e.target.value))}
                    className="vibe-range-slider"
                  />
                  <div className="slider-limits">
                    <span>{formatCurrency(30000)}</span>
                    <span>{formatCurrency(220000)}</span>
                  </div>
                </div>
              </div>

              {/* Advanced Settings Toggle */}
              <div className="advanced-toggle">
                <button 
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className={`toggle-btn ${showAdvanced ? "active" : ""}`}
                >
                  <span>Advanced Settings (Manager, HR, and Profit metrics)</span>
                  <ChevronDown size={16} className={`chevron-icon ${showAdvanced ? "rotated" : ""}`} />
                </button>
              </div>

              {/* Advanced Inputs */}
              <AnimatePresence>
                {showAdvanced && (
                  <motion.div 
                    className="advanced-inputs-panel"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="inputs-group advanced">
                      
                      {/* Managers Count */}
                      <div className="slider-container">
                        <div className="slider-labels">
                          <span className="slider-title">Number of Managers</span>
                          <span className="slider-value">{managersCount}</span>
                        </div>
                        <input 
                          type="range" 
                          min="5" 
                          max="1500" 
                          step="5"
                          value={managersCount} 
                          onChange={(e) => setManagersCount(Number(e.target.value))}
                          className="vibe-range-slider"
                        />
                      </div>

                      {/* Average Manager Salary */}
                      <div className="slider-container">
                        <div className="slider-labels">
                          <span className="slider-title">Avg. Annual Manager Salary</span>
                          <span className="slider-value">{formatCurrency(avgManagerSalary)}</span>
                        </div>
                        <input 
                          type="range" 
                          min="40000" 
                          max="250000" 
                          step="5000"
                          value={avgManagerSalary} 
                          onChange={(e) => setAvgManagerSalary(Number(e.target.value))}
                          className="vibe-range-slider"
                        />
                      </div>

                      {/* HR Team Size */}
                      <div className="slider-container">
                        <div className="slider-labels">
                          <span className="slider-title">HR/People Ops Team Size</span>
                          <span className="slider-value">{hrCount}</span>
                        </div>
                        <input 
                          type="range" 
                          min="1" 
                          max="150" 
                          step="1"
                          value={hrCount} 
                          onChange={(e) => setHrCount(Number(e.target.value))}
                          className="vibe-range-slider"
                        />
                      </div>

                      {/* Average HR Salary */}
                      <div className="slider-container">
                        <div className="slider-labels">
                          <span className="slider-title">Avg. Annual HR/People Ops Salary</span>
                          <span className="slider-value">{formatCurrency(avgHrSalary)}</span>
                        </div>
                        <input 
                          type="range" 
                          min="30000" 
                          max="180000" 
                          step="5000"
                          value={avgHrSalary} 
                          onChange={(e) => setAvgHrSalary(Number(e.target.value))}
                          className="vibe-range-slider"
                        />
                      </div>

                      {/* Company Net Profit */}
                      <div className="slider-container">
                        <div className="slider-labels">
                          <span className="slider-title">Company Annual Net Profit</span>
                          <span className="slider-value">{formatCurrency(netProfit)}</span>
                        </div>
                        <input 
                          type="range" 
                          min="100000" 
                          max="30000000" 
                          step="200000"
                          value={netProfit} 
                          onChange={(e) => setNetProfit(Number(e.target.value))}
                          className="vibe-range-slider"
                        />
                      </div>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Panel: Results Dashboard */}
            <div className="calculator-results">
              <div className="results-badge">EXECUTIVE SUMMARY</div>

              <div className="results-summary-card">
                <span className="summary-lbl">Total Estimated Benefits</span>
                <div className="summary-val">{formatCurrency(totalAnnualBenefits)}</div>
                <p className="summary-desc">
                  Based on a 12-month deployment with verified organizational efficiency gains.
                </p>
              </div>

              {/* Financial Metrics Split */}
              <div className="financial-metrics-split">
                <div className="f-metric-card">
                  <span className="f-metric-lbl">VibeOS License Cost</span>
                  <span className="f-metric-val">{formatCurrency(vibeOsCost)}</span>
                </div>
                <div className="f-metric-card highlight">
                  <span className="f-metric-lbl">Net Annual Savings</span>
                  <span className="f-metric-val">{formatCurrency(Math.max(0, netSavings))}</span>
                </div>
              </div>

              {/* ROI Badge Block */}
              <div className="roi-badge-block">
                <div className="roi-percentage-circle">
                  <div className="percentage-display">
                    <span className="num">{roiPercentage > 0 ? `${roiPercentage}%` : "—"}</span>
                    <span className="lbl">ROI</span>
                  </div>
                </div>
                <div className="roi-narrative">
                  <h4>Return on Investment</h4>
                  <p>
                    Every {selectedCurrency.symbol}1 invested in VibeOS yields an estimated <strong>{formatCurrency(Math.round(totalAnnualBenefits / Math.max(1, vibeOsCost)))}</strong> in organizational savings.
                  </p>
                </div>
              </div>

              {/* Benefits Breakdown List */}
              <div className="results-breakdown-list">
                <h3>Benefit Breakdown</h3>

                {/* Lever 1: Attrition */}
                <div className="breakdown-item">
                  <div className="breakdown-info">
                    <span className="lever-title">Attrition Reduction</span>
                    <span className="lever-detail">Save {savedDepartures} employees from leaving</span>
                  </div>
                  <span className="breakdown-price">{formatCurrency(attritionBenefit)}</span>
                </div>

                {/* Lever 2: Managers */}
                <div className="breakdown-item">
                  <div className="breakdown-info">
                    <span className="lever-title">Managerial Productivity</span>
                    <span className="lever-detail">20% efficiency gain with 10% capture</span>
                  </div>
                  <span className="breakdown-price">{formatCurrency(managerBenefit)}</span>
                </div>

                {/* Lever 3: HR */}
                <div className="breakdown-item">
                  <div className="breakdown-info">
                    <span className="lever-title">HR Productivity</span>
                    <span className="lever-detail">20% efficiency gain with 50% capture</span>
                  </div>
                  <span className="breakdown-price">{formatCurrency(hrBenefit)}</span>
                </div>

                {/* Lever 4: Profitability */}
                <div className="breakdown-item">
                  <div className="breakdown-info">
                    <span className="lever-title">Profit Margin Uplift</span>
                    <span className="lever-detail">0.5% boost in net profitability</span>
                  </div>
                  <span className="breakdown-price">{formatCurrency(profitBenefit)}</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ==========================================
            2. PROBLEM SECTION
            ========================================== */}
        <section className="roi-problem-section">
          <div className="section-header">
            <span className="kicker">The Cost of Inaction</span>
            <h2 className="title">Why Traditional Engagement Methods Fail</h2>
            <p className="desc">
              Annual engagement surveys hide massive operational leaks. Failing to continuously support culture, burnout, and manager alignment has tangible financial consequences.
            </p>
          </div>

          <div className="problem-grid">
            <div className="problem-card">
              <div className="icon-box red"><TrendingDown size={20} /></div>
              <h3>Sinking Retention Rates</h3>
              <p>
                Replacing an employee costs at least 20% of their annual salary. High attrition drains domain expertise and impacts remaining team morale.
              </p>
            </div>
            <div className="problem-card">
              <div className="icon-box orange"><Clock size={20} /></div>
              <h3>Administrative Survey Bloat</h3>
              <p>
                HR teams waste hundreds of hours manually compiling questions, distributing surveys, and analyzing comments in messy spreadsheets.
              </p>
            </div>
            <div className="problem-card">
              <div className="icon-box blue"><Users size={20} /></div>
              <h3>Disengaged Frontline Managers</h3>
              <p>
                Managers account for 70% of variance in employee engagement. Without real-time action alerts, management becomes reactive rather than supportive.
              </p>
            </div>
            <div className="problem-card">
              <div className="icon-box purple"><DollarSign size={20} /></div>
              <h3>Isolated Financial Metrics</h3>
              <p>
                Board members view engagement surveys as a "nice-to-have" expense because HR lacks the tools to connect sentiment to EBITDA.
              </p>
            </div>
          </div>
        </section>

        {/* ==========================================
            3. HOW IT WORKS SECTION
            ========================================== */}
        <section className="roi-how-it-works-section">
          <div className="section-header">
            <span className="kicker">Methodology</span>
            <h2 className="title">How VibeOS Drives Returns</h2>
            <p className="desc">
              We replace outdated annual surveys with a lightweight, continuous feedback loop that automatically helps managers drive organizational health.
            </p>
          </div>

          <div className="timeline-steps">
            <div className="timeline-connector-line" />

            <div className="timeline-step">
              <div className="step-number"><span>1</span></div>
              <div className="step-content">
                <h3>Lightweight Sentiment Surveys</h3>
                <p>
                  Deploy high-participation, quick sentiment pulse checks directly via Slack, Microsoft Teams, or web. VibeOS achieves 85%+ participation.
                </p>
              </div>
            </div>

            <div className="timeline-step">
              <div className="step-number"><span>2</span></div>
              <div className="step-content">
                <h3>Vibe AI Comment Synthesizer</h3>
                <p>
                  Our NLP layer clusters open-text feedback, identifying root causes of burnout, tool issues, or alignment gaps in seconds instead of weeks.
                </p>
              </div>
            </div>

            <div className="timeline-step">
              <div className="step-number"><span>3</span></div>
              <div className="step-content">
                <h3>Action-Oriented Playbooks</h3>
                <p>
                  Instead of dumping complex dashboard charts, we send customized 1-click action playbooks directly to frontline managers to fix issues.
                </p>
              </div>
            </div>

            <div className="timeline-step">
              <div className="step-number"><span>4</span></div>
              <div className="step-content">
                <h3>Quantifiable EBITDA Support</h3>
                <p>
                  Direct reductions in attrition and recaptured manager administration time translate immediately to your bottom line.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
            4. OUTCOME & VISUAL SCENARIO SECTION
            ========================================== */}
        <section className="roi-outcome-section">
          <div className="section-header">
            <span className="kicker">Scenario Modeling</span>
            <h2 className="title">Interactive Business Cases</h2>
            <p className="desc">
              Select an outcome lever below to explore a detailed visual comparison of your current operations versus a VibeOS optimized workspace.
            </p>
          </div>

          {/* Scenario Tabs */}
          <div className="scenario-tabs-container">
            <div className="tabs-header">
              <button 
                onClick={() => setActiveTab("retention")}
                className={`tab-trigger ${activeTab === "retention" ? "active" : ""}`}
              >
                <span>Retention Impact</span>
              </button>
              <button 
                onClick={() => setActiveTab("managers")}
                className={`tab-trigger ${activeTab === "managers" ? "active" : ""}`}
              >
                <span>Manager Efficiency</span>
              </button>
              <button 
                onClick={() => setActiveTab("hr")}
                className={`tab-trigger ${activeTab === "hr" ? "active" : ""}`}
              >
                <span>HR Automation</span>
              </button>
              <button 
                onClick={() => setActiveTab("profitability")}
                className={`tab-trigger ${activeTab === "profitability" ? "active" : ""}`}
              >
                <span>Profitability Gains</span>
              </button>
            </div>

            {/* Tab content area */}
            <div className="tab-viewport">
              {activeTab === "retention" && (
                <div className="scenario-layout">
                  <div className="scenario-description">
                    <div className="panel-badge green">RETENTION INSIGHTS</div>
                    <h3>Keeping Top Talent Inside Your Organization</h3>
                    <p>
                      Voluntary attrition is highly disruptive. When an employee leaves, your company loses output, speed, and spends an average of <strong>{formatCurrency(replacementCostPerEmp)}</strong> to source, screen, and onboard their replacement.
                    </p>
                    <div className="outcome-callout-grid">
                      <div className="c-card">
                        <span className="c-val">{savedDepartures}</span>
                        <span className="c-lbl">Avoided Departures</span>
                      </div>
                      <div className="c-card">
                        <span className="c-val">{formatCurrency(attritionBenefit)}</span>
                        <span className="c-lbl">Attrition Savings</span>
                      </div>
                    </div>
                    <p className="caveat">
                      *Industry research shows that continuous pulse listening and fast action loops reduce turnover rate by a minimum of 5% relatively.
                    </p>
                  </div>
                  
                  {/* Visual SVG Chart */}
                  <div className="scenario-visualization">
                    <h4>Turnover Costs Comparison</h4>
                    <div className="svg-chart-container">
                      <svg viewBox="0 0 400 240" className="dynamic-svg-chart">
                        {/* Grids */}
                        <line x1="50" y1="40" x2="350" y2="40" stroke="rgba(200,200,200,0.15)" strokeDasharray="4" />
                        <line x1="50" y1="110" x2="350" y2="110" stroke="rgba(200,200,200,0.15)" strokeDasharray="4" />
                        <line x1="50" y1="180" x2="350" y2="180" stroke="rgba(200,200,200,0.15)" strokeDasharray="4" />
                        
                        {/* Current Cost Bar */}
                        <rect 
                          x="90" 
                          y="60" 
                          width="60" 
                          height="120" 
                          rx="4" 
                          fill="url(#redGradient)" 
                        />
                        <text x="120" y="195" textAnchor="middle" fill="currentColor" className="chart-label-x">Current State</text>
                        <text x="120" y="50" textAnchor="middle" fill="#ef4444" fontWeight="600" className="chart-val">
                          {formatCurrency(employees * (turnoverRate / 100) * replacementCostPerEmp)}
                        </text>
                        
                        {/* Optimized Cost Bar */}
                        <rect 
                          x="230" 
                          y={60 + (120 * 0.0533)} 
                          width="60" 
                          height={120 - (120 * 0.0533)} 
                          rx="4" 
                          fill="url(#greenGradient)" 
                        />
                        <text x="260" y="195" textAnchor="middle" fill="currentColor" className="chart-label-x">VibeOS</text>
                        <text x="260" y={50 + (120 * 0.0533)} textAnchor="middle" fill="#22c55e" fontWeight="600" className="chart-val">
                          {formatCurrency((employees * (turnoverRate / 100) - savedDepartures) * replacementCostPerEmp)}
                        </text>

                        {/* Baseline */}
                        <line x1="50" y1="180" x2="350" y2="180" stroke="currentColor" strokeWidth="1.5" />

                        {/* Gradients */}
                        <defs>
                          <linearGradient id="redGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#ef4444" />
                            <stop offset="100%" stopColor="#b91c1c" />
                          </linearGradient>
                          <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#15803d" stopOpacity="0.8" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                    <div className="chart-legend">
                      <span className="badge red">Current Turnover Cost</span>
                      <span className="badge green">Turnover Cost with VibeOS</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "managers" && (
                <div className="scenario-layout">
                  <div className="scenario-description">
                    <div className="panel-badge purple">MANAGER EFFICIENCY</div>
                    <h3>Empowering Frontline Managers to Work Smarter</h3>
                    <p>
                      Managers spend hours navigating culture issues, answering questions, and scheduling check-ins. VibeOS automates feedback aggregation and offers 1-click playbooks, increasing overall manager productivity by <strong>20%</strong>.
                    </p>
                    <div className="outcome-callout-grid">
                      <div className="c-card">
                        <span className="c-val">{managersCount}</span>
                        <span className="c-lbl">Active Managers</span>
                      </div>
                      <div className="c-card">
                        <span className="c-val">{formatCurrency(managerBenefit)}</span>
                        <span className="c-lbl">Recaptured Productivity</span>
                      </div>
                    </div>
                    <p className="caveat">
                      *Assumes a conservative 10% organization-wide capture rate of time saved to direct business activities.
                    </p>
                  </div>

                  {/* Visual SVG Chart */}
                  <div className="scenario-visualization">
                    <h4>Admin Hours Spent per Manager / Year</h4>
                    <div className="svg-chart-container">
                      <svg viewBox="0 0 400 240" className="dynamic-svg-chart">
                        <line x1="50" y1="40" x2="350" y2="40" stroke="rgba(200,200,200,0.15)" strokeDasharray="4" />
                        <line x1="50" y1="110" x2="350" y2="110" stroke="rgba(200,200,200,0.15)" strokeDasharray="4" />
                        
                        {/* Current Hours Bar */}
                        <rect x="90" y="50" width="60" height="130" rx="4" fill="url(#purpleGradient)" />
                        <text x="120" y="195" textAnchor="middle" fill="currentColor" className="chart-label-x">Without VibeOS</text>
                        <text x="120" y="40" textAnchor="middle" fill="#a855f7" fontWeight="600" className="chart-val">120 Hours</text>

                        {/* Optimized Hours Bar */}
                        <rect x="230" y="76" width="60" height="104" rx="4" fill="url(#blueGradient)" />
                        <text x="260" y="195" textAnchor="middle" fill="currentColor" className="chart-label-x">With VibeOS</text>
                        <text x="260" y="66" textAnchor="middle" fill="#3b82f6" fontWeight="600" className="chart-val">96 Hours</text>

                        <line x1="50" y1="180" x2="350" y2="180" stroke="currentColor" strokeWidth="1.5" />

                        <defs>
                          <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#a855f7" />
                            <stop offset="100%" stopColor="#7e22ce" />
                          </linearGradient>
                          <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#3b82f6" />
                            <stop offset="100%" stopColor="#1d4ed8" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                    <div className="chart-legend">
                      <span className="badge purple">Admin Overheads</span>
                      <span className="badge blue">Time Saved (24h/Manager)</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "hr" && (
                <div className="scenario-layout">
                  <div className="scenario-description">
                    <div className="panel-badge blue">PEOPLE OPERATIONS</div>
                    <h3>Automating Manual HR Overhead</h3>
                    <p>
                      HR professionals spend days designing surveys, building feedback lists, and sorting comments. VibeOS reduces manual analysis tasks, delivering a <strong>20%</strong> efficiency boost with a <strong>50%</strong> capture rate.
                    </p>
                    <div className="outcome-callout-grid">
                      <div className="c-card">
                        <span className="c-val">{hrCount} Team Size</span>
                        <span className="c-lbl">HR Cohort</span>
                      </div>
                      <div className="c-card">
                        <span className="c-val">{formatCurrency(hrBenefit)}</span>
                        <span className="c-lbl">Recaptured HR Cost</span>
                      </div>
                    </div>
                  </div>

                  {/* Visual SVG Chart */}
                  <div className="scenario-visualization">
                    <h4>HR Survey Maintenance Costs</h4>
                    <div className="svg-chart-container">
                      <svg viewBox="0 0 400 240" className="dynamic-svg-chart">
                        <line x1="50" y1="40" x2="350" y2="40" stroke="rgba(200,200,200,0.15)" strokeDasharray="4" />
                        <line x1="50" y1="110" x2="350" y2="110" stroke="rgba(200,200,200,0.15)" strokeDasharray="4" />

                        {/* Current Hours Bar */}
                        <rect x="90" y="60" width="60" height="120" rx="4" fill="url(#orangeGradient)" />
                        <text x="120" y="195" textAnchor="middle" fill="currentColor" className="chart-label-x">Manual Surveys</text>
                        <text x="120" y="50" textAnchor="middle" fill="#f97316" fontWeight="600" className="chart-val">{formatCurrency(hrPayroll * 0.2)}</text>

                        {/* Optimized Hours Bar */}
                        <rect x="230" y="120" width="60" height="60" rx="4" fill="url(#greenGradient)" />
                        <text x="260" y="195" textAnchor="middle" fill="currentColor" className="chart-label-x">VibeOS</text>
                        <text x="260" y="110" textAnchor="middle" fill="#22c55e" fontWeight="600" className="chart-val">{formatCurrency(hrPayroll * 0.1)}</text>

                        <line x1="50" y1="180" x2="350" y2="180" stroke="currentColor" strokeWidth="1.5" />

                        <defs>
                          <linearGradient id="orangeGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#f97316" />
                            <stop offset="100%" stopColor="#c2410c" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                    <div className="chart-legend">
                      <span className="badge orange">Admin Cost</span>
                      <span className="badge green">Admin Cost with VibeOS</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "profitability" && (
                <div className="scenario-layout">
                  <div className="scenario-description">
                    <div className="panel-badge gold">EBITDA GROWTH</div>
                    <h3>Linking Culture to Customer Value</h3>
                    <p>
                      Engaged employees take better care of clients, make fewer mistakes, and stay aligned on product quality. Research confirms that engaged organizations enjoy a **0.5%** overall boost in net profitability.
                    </p>
                    <div className="outcome-callout-grid">
                      <div className="c-card">
                        <span className="c-val">{formatCurrency(netProfit)}</span>
                        <span className="c-lbl">Base Net Profit</span>
                      </div>
                      <div className="c-card">
                        <span className="c-val">{formatCurrency(profitBenefit)}</span>
                        <span className="c-lbl">Net Profit Boost</span>
                      </div>
                    </div>
                  </div>

                  {/* Visual SVG Chart */}
                  <div className="scenario-visualization">
                    <h4>Company Net Profit Growth</h4>
                    <div className="svg-chart-container">
                      <svg viewBox="0 0 400 240" className="dynamic-svg-chart">
                        <line x1="50" y1="40" x2="350" y2="40" stroke="rgba(200,200,200,0.15)" strokeDasharray="4" />
                        <line x1="50" y1="110" x2="350" y2="110" stroke="rgba(200,200,200,0.15)" strokeDasharray="4" />

                        {/* Current Hours Bar */}
                        <rect x="90" y="65" width="60" height="115" rx="4" fill="url(#slateGradient)" />
                        <text x="120" y="195" textAnchor="middle" fill="currentColor" className="chart-label-x">Current Profit</text>
                        <text x="120" y="55" textAnchor="middle" fill="#64748b" fontWeight="600" className="chart-val">{formatCurrency(netProfit)}</text>

                        {/* Optimized Hours Bar */}
                        <rect x="230" y="60" width="60" height="120" rx="4" fill="url(#goldGradient)" />
                        <text x="260" y="195" textAnchor="middle" fill="currentColor" className="chart-label-x">Future Profit</text>
                        <text x="260" y="50" textAnchor="middle" fill="#d97706" fontWeight="600" className="chart-val">{formatCurrency(netProfit + profitBenefit)}</text>

                        <line x1="50" y1="180" x2="350" y2="180" stroke="currentColor" strokeWidth="1.5" />

                        <defs>
                          <linearGradient id="slateGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#94a3b8" />
                            <stop offset="100%" stopColor="#475569" />
                          </linearGradient>
                          <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#fbbf24" />
                            <stop offset="100%" stopColor="#d97706" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                    <div className="chart-legend">
                      <span className="badge slate">Standard Profit</span>
                      <span className="badge gold">Engagement-Boosted (+0.5%)</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ==========================================
            5. FAQS SECTION
            ========================================== */}
        <section className="roi-faq-section">
          <div className="section-header">
            <span className="kicker">Frequently Asked Questions</span>
            <h2 className="title">Calculation Methodology & Benchmarks</h2>
            <p className="desc">
              Understand the science, formulas, and verified industry research behind the VibeOS calculator projections.
            </p>
          </div>

          <div className="faq-accordion-list">
            
            {/* FAQ 1 */}
            <div className={`faq-accordion-item ${faqOpen === 0 ? "active" : ""}`}>
              <button onClick={() => setFaqOpen(faqOpen === 0 ? null : 0)} className="accordion-trigger">
                <span>Where does the Attrition replacement cost multiplier of 20% come from?</span>
                <ChevronDown size={18} className="chevron" />
              </button>
              <div className="accordion-content">
                <p>
                  Culture Amp and industry standard publications (including the Society for Human Resource Management - SHRM) show that replacing a standard employee costs approximately 20% to 50% of their annual salary. This includes recruitment fees, interviewer time, agency fees, onboarding training, and initial lost productivity. We utilize a highly conservative baseline of 20% to represent direct financial losses.
                </p>
              </div>
            </div>

            {/* FAQ 2 */}
            <div className={`faq-accordion-item ${faqOpen === 1 ? "active" : ""}`}>
              <button onClick={() => setFaqOpen(faqOpen === 1 ? null : 1)} className="accordion-trigger">
                <span>How is the 5% attrition reduction calculated?</span>
                <ChevronDown size={18} className="chevron" />
              </button>
              <div className="accordion-content">
                <p>
                  VibeOS projects a 5.33% relative reduction in voluntary departures. For instance, if your baseline turnover is 15% in a 1,000-employee company (150 departures), VibeOS aims to save 8 departures, resulting in an active future attrition rate of 14.2%. This is achieved through real-time sentiment alerts that flag team disengagement before employees make the decision to resign.
                </p>
              </div>
            </div>

            {/* FAQ 3 */}
            <div className={`faq-accordion-item ${faqOpen === 2 ? "active" : ""}`}>
              <button onClick={() => setFaqOpen(faqOpen === 2 ? null : 2)} className="accordion-trigger">
                <span>What is the source of the manager and HR productivity assumptions?</span>
                <ChevronDown size={18} className="chevron" />
              </button>
              <div className="accordion-content">
                <p>
                  Our efficiency gains are modeled after the Forrester Total Economic Impact™ (TEI) framework. Continuous feedback tools reduce manual survey cycles by 20% for HR. For managers, automated dashboard playbooks reduce weekly conflict management and team sync preparation, yielding a 20% time savings. To maintain conservative models, we capture only 10% of this time for managers and 50% for HR.
                </p>
              </div>
            </div>

            {/* FAQ 4 */}
            <div className={`faq-accordion-item ${faqOpen === 3 ? "active" : ""}`}>
              <button onClick={() => setFaqOpen(faqOpen === 3 ? null : 3)} className="accordion-trigger">
                <span>How is the VibeOS licensing cost factored into the ROI?</span>
                <ChevronDown size={18} className="chevron" />
              </button>
              <div className="accordion-content">
                <p>
                  VibeOS license costs are modeled based on a standard corporate licensing structure of $6 per employee per month (billed annually). The ROI percentage compares your net savings (total benefits minus VibeOS license costs) directly to this cost of investment: ROI % = (Net Savings / VibeOS Cost) * 100.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* ==========================================
            6. CTA SECTION
            ========================================== */}
        <section className="roi-cta-section">
          <div className="cta-box">
            <div className="cta-box__content">
              <h2 className="title">Ready to build your custom business case?</h2>
              <p className="desc">
                Receive a detailed PDF report of these calculations customized for your industry sector and regional benchmarks.
              </p>
              <div className="cta-actions">
                <a href="/contact" className="btn btn-primary">
                  <span>Schedule Executive Briefing</span>
                  <ArrowRight size={16} />
                </a>
                <a href="/contact" className="btn btn-secondary">
                  <span>Export Calculation Summary</span>
                </a>
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
