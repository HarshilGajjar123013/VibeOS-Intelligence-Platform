"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Search,
  ChevronDown,
  Globe,
  SlidersHorizontal,
  X,
  TrendingUp,
  Award,
  ArrowRight,
  Database,
  Users,
  Layers,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  HelpCircle,
  Lightbulb
} from "lucide-react";
import db from "./benchmarks_data.json";
import "./SciBenchmarks.scss";
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
      staggerChildren: 0.05
    }
  }
};

// --- Custom Animated Counter ---
const Counter: React.FC<{ target: number; suffix?: string; duration?: number; decimals?: number }> = ({ 
  target, 
  suffix = "", 
  duration = 2.0,
  decimals = 0
}) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(elementRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

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
  }, [target, duration, isInView]);

  return <span ref={elementRef}>{count.toFixed(decimals)}{suffix}</span>;
};

// --- Animated Bar Row Component ---
const BarRow: React.FC<{ factor: string; value: number; colorClass: string }> = ({ factor, value, colorClass }) => {
  const barRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(barRef, { once: true, margin: "-50px" });
  
  // Calculate percentage width (12 is the maximum value in our dataset)
  const percentWidth = (value / 12) * 100;

  return (
    <div ref={barRef} className="chart-row">
      <div className="factor-name">{factor}</div>
      <div className="bar-container">
        <div className="bar-track">
          <div 
            className={`bar-fill ${colorClass}`}
            style={{ 
              width: isInView ? `${percentWidth}%` : "0%",
              // Pass custom property for positioning the value label dynamically
              "--bar-width": `${percentWidth}%`
            } as React.CSSProperties}
          />
        </div>
        <div 
          className="bar-val"
          style={{ 
            left: isInView ? `calc(${percentWidth}% + 12px)` : "12px",
            transition: "left 1s cubic-bezier(0.16, 1, 0.3, 1)"
          }}
        >
          +{value}
        </div>
      </div>
    </div>
  );
};

export default function SciBenchmarks() {
  const setDemoModalOpen = useProtoStore((state) => state.setDemoModalOpen);
  // --- Filtering & Searching State ---
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("all");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 24;

  // --- Reset filters ---
  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedIndustry("all");
    setSelectedRegion("all");
    setCurrentPage(1);
  };

  // --- Filter Logic ---
  const filteredBenchmarks = useMemo(() => {
    let result = db.benchmarks;

    // Filter by Industry
    if (selectedIndustry !== "all") {
      result = result.filter(b => b.industries.includes(selectedIndustry));
    }

    // Filter by Region
    if (selectedRegion !== "all") {
      result = result.filter(b => b.regions.includes(selectedRegion));
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(b => b.name.toLowerCase().includes(q));
    }

    return result;
  }, [selectedIndustry, selectedRegion, searchQuery]);

  // --- Pagination Logic ---
  const totalPages = Math.ceil(filteredBenchmarks.length / itemsPerPage) || 1;
  const paginatedBenchmarks = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredBenchmarks.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredBenchmarks, currentPage]);

  // Reset page to 1 when filters or query change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedIndustry, selectedRegion, searchQuery]);

  // --- Factors Data for High Performers Chart ---
  const factorsData = [
    { factor: "Company Performance", value: 12, color: "purple" },
    { factor: "Leadership", value: 12, color: "purple" },
    { factor: "Engagement", value: 11, color: "purple" },
    { factor: "Service & Quality Focus", value: 10, color: "purple" },
    { factor: "Innovation", value: 10, color: "purple" },
    { factor: "Social Connection", value: 9, color: "blue" },
    { factor: "Collaboration & Communication", value: 8, color: "blue" },
    { factor: "Feedback & Recognition", value: 8, color: "blue" },
    { factor: "Learning & Development", value: 7, color: "blue" },
    { factor: "Action", value: 6, color: "blue" },
    { factor: "Decision Making", value: 6, color: "blue" }
  ];

  return (
    <div className="sb-page">
      {/* ==========================================
          1. HERO SECTION
          ========================================== */}
      <section className="sb-hero">
        <div className="sb-hero__bg-shapes">
          <div className="shape shape--1" />
          <div className="shape shape--2" />
        </div>

        <div className="container sb-hero__grid">
          {/* Left Column: Copy & Animated Stats */}
          <motion.div 
            className="sb-hero__content"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <div className="sb-hero__badge">
              <Globe size={12} />
              <span>Scientific Benchmarks</span>
            </div>
            
            <h1 className="sb-hero__title">
              Insights into the cultures of the <span>best-performing organizations</span>
            </h1>
            
            <p className="sb-hero__desc">
              VibeOS collects millions of responses worldwide to help understand organizational culture and performance. We publish insights across industry and region, benchmarking how companies are engaging their people.
            </p>
            
            <p className="sb-hero__desc" style={{ marginTop: "-16px", marginBottom: "40px" }}>
              We identify the features of the best-performing organizations, and feed that back into our understanding of how to build better work cultures. Insights are aggregated from statistically-valid groupings contributing to the world’s largest employee-survey data lake.
            </p>

            {/* Statistics */}
            <div className="sb-hero__stats">
              <div className="stat-item">
                <strong>
                  <Counter target={1.61} decimals={2} suffix="" />B
                </strong>
                <span className="label">Questions answered</span>
              </div>
              
              <div className="stat-item">
                <strong>
                  <Counter target={74.15} decimals={2} suffix="" />M
                </strong>
                <span className="label">Surveys completed</span>
              </div>
              
              <div className="stat-item">
                <strong>
                  <Counter target={8900} decimals={0} suffix="+" />
                </strong>
                <span className="label">Organizations surveyed</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Premium Visual Card */}
          <motion.div 
            className="sb-hero__visual"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="hero-interactive-card">
              <div className="card-header">
                <span>VibeOS Insights Index</span>
                <span className="verified-tag">Global Database</span>
              </div>
              
              <div className="card-body">
                <div className="pulse-item">
                  <div className="icon-wrap orange">
                    <Database size={16} />
                  </div>
                  <div className="info">
                    <span className="title">821 Regional Indexes</span>
                    <span className="meta">Continuous tracking</span>
                  </div>
                  <div className="value">Active</div>
                </div>

                <div className="pulse-item">
                  <div className="icon-wrap purple">
                    <Users size={16} />
                  </div>
                  <div className="info">
                    <span className="title">1,119 Industry Cohorts</span>
                    <span className="meta">Headcount & sector split</span>
                  </div>
                  <div className="value">Active</div>
                </div>

                <div className="pulse-item">
                  <div className="icon-wrap blue">
                    <Layers size={16} />
                  </div>
                  <div className="info">
                    <span className="title">Engaging Growth Group</span>
                    <span className="meta">High growth benchmark</span>
                  </div>
                  <div className="value">+12 Avg</div>
                </div>
              </div>
            </div>

            {/* Ambient Floating Badges */}
            <div className="floating-dec dec-1">
              <TrendingUp size={14} className="text-orange-500" />
              <span>Real-time Deltas</span>
            </div>
            <div className="floating-dec dec-2">
              <Award size={14} className="text-purple-500" />
              <span>100% Normalized</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==========================================
          2. BENCHMARK EXPLORER SECTION
          ========================================== */}
      <section className="sb-explorer">
        <div className="container">
          <div className="sb-section-header">
            <span className="sb-kicker">Benchmark Search</span>
            <h2>Find the insights most relevant to you</h2>
            <p>VibeOS publishes hundreds of benchmarks across industry, geography, and size.</p>
          </div>

          {/* Filters Panel */}
          <div className="sb-explorer__filter-panel">
            {/* Search Input */}
            <div className="filter-group">
              <label>Search Benchmarks</label>
              <div className="search-wrapper">
                <Search size={18} className="search-icon" />
                <input
                  type="text"
                  placeholder="e.g. Finance, Tech, Europe..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button className="clear-btn" onClick={() => setSearchQuery("")}>
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Industry Filter */}
            <div className="filter-group">
              <label>Filter by Industry</label>
              <div className="select-wrapper">
                <select
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                >
                  <option value="all">All Industries</option>
                  {db.industries.map(ind => (
                    <option key={ind.slug} value={ind.slug}>
                      {ind.name}
                    </option>
                  ))}
                </select>
                <ChevronDown size={16} className="select-arrow" />
              </div>
            </div>

            {/* Region Filter */}
            <div className="filter-group">
              <label>Filter by Region</label>
              <div className="select-wrapper">
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                >
                  <option value="all">All Regions / Countries</option>
                  {db.regions.map(reg => (
                    <option key={reg.slug} value={reg.slug}>
                      {reg.name}
                    </option>
                  ))}
                </select>
                <ChevronDown size={16} className="select-arrow" />
              </div>
            </div>
          </div>

          {/* Results Summary Info */}
          <div className="sb-explorer__info">
            <span className="count">
              Showing {filteredBenchmarks.length} {filteredBenchmarks.length === 1 ? "benchmark" : "benchmarks"}
            </span>
            {(searchQuery || selectedIndustry !== "all" || selectedRegion !== "all") && (
              <button className="reset-link" onClick={handleResetFilters}>
                <SlidersHorizontal size={14} />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          {/* Live Benchmarks Cards Grid */}
          <motion.div 
            className="sb-explorer__grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <AnimatePresence mode="popLayout">
              {paginatedBenchmarks.length > 0 ? (
                paginatedBenchmarks.map((bench) => (
                  <motion.div 
                    key={bench.slug}
                    layout
                    variants={fadeUp}
                    className="sb-card"
                  >
                    <div className="sb-card__header">
                      <span className="badge-tag type">{bench.type}</span>
                      <span className="badge-tag region">{bench.regions[0]}</span>
                    </div>
                    
                    <h4>{bench.name}</h4>
                    
                    <div className="sb-card__metrics">
                      <div className="metric">
                        <span className="lbl">Companies</span>
                        <span className="val">{bench.companies}</span>
                      </div>
                      <div className="metric">
                        <span className="lbl">Responses</span>
                        <span className="val">{bench.questions}</span>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full flex flex-col items-center justify-center py-12 text-slate-400 gap-3"
                  style={{ gridColumn: "1 / -1", height: "240px" }}
                >
                  <HelpCircle size={40} className="text-slate-300" />
                  <p className="text-14 font-medium">No benchmarks match your current filter criteria.</p>
                  <button className="reset-link" onClick={handleResetFilters}>
                    Clear all filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="sb-explorer__pagination">
              <button 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              >
                <ChevronLeft size={18} />
              </button>
              
              <span>Page {currentPage} of {totalPages}</span>
              
              <button 
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ==========================================
          3. WHAT CAN BENCHMARKS TELL US? (DYNAMIC BAR CHART)
          ========================================== */}
      <section className="sb-chart-section">
        <div className="container sb-chart-section__grid">
          {/* Left Column: Info Copy */}
          <div className="sb-chart-section__content">
            <span className="sb-eyebrow">Data lake insights</span>
            <h3>Consistent features of high performers</h3>
            
            <p>
              Our Engaging Growth benchmark tracks companies with the rare combination of fast growth and strong employee engagement. These high-performing organizations are hiring consistently while keeping their people motivated and committed.
            </p>
            
            <p>
              Those organisations come from a range of industries—but they consistently outperform their competition on a range of survey factors. Their scores in Company Performance, Engagement, Leadership, Service & Quality Focus, and Innovation are 10 points or higher above the average factor scores.
            </p>
          </div>

          {/* Right Column: Visualized Bar Chart */}
          <div className="sb-chart-card">
            <div className="chart-title">
              Difference between Engaging Growth benchmark and worldwide average, selected factors
            </div>

            <div className="chart-bars-list">
              {factorsData.map((row, idx) => (
                <BarRow
                  key={idx}
                  factor={row.factor}
                  value={row.value}
                  colorClass={row.color}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          4. VARIATION SECTION
          ========================================== */}
      <section className="sb-variation">
        <div className="container">
          <div className="sb-variation__card">
            <span className="sb-eyebrow">Understanding difference</span>
            <h3>Variation across groups</h3>
            
            <div className="sb-variation__content">
              <p>
                Culture Amp survey questions are grouped into factors, clusters representing specific parts of the employee experience. Demographic, industry, and regional differences influence responses and result in notable response variation across factors.
              </p>
              <p>
                Given these differences, selecting a benchmark that closely matches your region and/or industry is key to providing useful and reliable context for team reviews.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          5. CTA BANNER
          ========================================== */}
      <section className="sb-cta">
        <div className="sb-cta__glow glow-1" />
        <div className="sb-cta__glow glow-2" />

        <div className="sb-cta__container">
          <h2>Invest in your people and create <span>impact</span></h2>
          <p>
            Understand your culture, align priorities, and improve workforce experiences with the world’s leading employee experience platform.
          </p>
          
          <div className="sb-cta__buttons">
            <button onClick={() => setDemoModalOpen(true)} className="btn primary">
              Book a demo
            </button>
            <a href="/platform" className="btn secondary">
              See how it works
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
