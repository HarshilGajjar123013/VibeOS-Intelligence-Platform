"use client";

import React, { useState } from "react";
import { 
  Check, 
  Shield, 
  Users, 
  Target, 
  Star, 
  Heart, 
  TrendingUp, 
  Sparkles
} from "lucide-react";
import "./Benefit.scss";

interface Dimension {
  id: string;
  name: string;
  score: number;
  icon: React.ComponentType<{ size: number; className?: string }>;
  color: string;
  bgColor: string;
  borderColor: string;
  insight: string;
}

const DIMENSIONS: Dimension[] = [
  {
    id: "trust",
    name: "Trust",
    score: 80,
    icon: Shield,
    color: "#6366f1", // Indigo
    bgColor: "rgba(99, 102, 241, 0.06)",
    borderColor: "rgba(99, 102, 241, 0.2)",
    insight: "Trust is strong at 80/100, indicating high psychological safety, solid transparent communication channels, and strong leadership credibility."
  },
  {
    id: "alignment",
    name: "Alignment",
    score: 72,
    icon: Target,
    color: "#3b82f6", // Blue
    bgColor: "rgba(59, 130, 246, 0.06)",
    borderColor: "rgba(59, 130, 246, 0.2)",
    insight: "Alignment scores stand at 72/100. Core goals are understood, but cross-functional initiatives require better roadmap visibility."
  },
  {
    id: "wellbeing",
    name: "Wellbeing",
    score: 62,
    icon: Heart,
    color: "#ef4444", // Red
    bgColor: "rgba(239, 68, 68, 0.06)",
    borderColor: "rgba(239, 68, 68, 0.2)",
    insight: "Wellbeing scores are lower compared to other areas. Workload and recovery time may be impacting your team's energy."
  },
  {
    id: "growth",
    name: "Growth",
    score: 78,
    icon: TrendingUp,
    color: "#10b981", // Emerald
    bgColor: "rgba(16, 185, 129, 0.06)",
    borderColor: "rgba(16, 185, 129, 0.2)",
    insight: "Growth is solid at 78/100. Employees feel positive about career development tracks and training resource availability."
  },
  {
    id: "recognition",
    name: "Recognition",
    score: 74,
    icon: Star,
    color: "#f59e0b", // Amber
    bgColor: "rgba(245, 158, 11, 0.06)",
    borderColor: "rgba(245, 158, 11, 0.2)",
    insight: "Recognition is healthy at 74/100. Peer kudos are highly active, though celebrating milestone events can be structured better."
  },
  {
    id: "belonging",
    name: "Belonging",
    score: 70,
    icon: Users,
    color: "#06b6d4", // Cyan
    bgColor: "rgba(6, 182, 212, 0.06)",
    borderColor: "rgba(6, 182, 212, 0.2)",
    insight: "Belonging is rated at 70/100. Workplaces show inclusive day-to-day interactions, though remote employee connection is a focus area."
  }
];

export default function Benefit() {
  const [hoveredDim, setHoveredDim] = useState<string | null>(null);

  // Default to wellbeing insight if none hovered (matching the user image state)
  const activeDim = DIMENSIONS.find(d => d.id === hoveredDim) || DIMENSIONS.find(d => d.id === "wellbeing")!;

  // Coordinates helper for hexagon radar chart
  // cx = 150, cy = 150, maxR = 85
  const cx = 150;
  const cy = 150;
  const maxR = 85;

  // Calculate polygon points
  const getRadarPoints = () => {
    return DIMENSIONS.map((dim, idx) => {
      const angle = (idx * 60 - 90) * (Math.PI / 180);
      const r = (dim.score / 100) * maxR;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      return `${x},${y}`;
    }).join(" ");
  };

  const getGridPoints = (scale: number) => {
    return DIMENSIONS.map((_, idx) => {
      const angle = (idx * 60 - 90) * (Math.PI / 180);
      const r = scale * maxR;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      return `${x},${y}`;
    }).join(" ");
  };

  return (
    <section className="benefit">
      <div className="benefit__container">
        
        {/* Left Side: Copy & Benefits list */}
        <div className="benefit__left">
          <span className="benefit__badge">Benefits</span>
          
          <h2 className="benefit__title">
            The health of your organization shouldn&apos;t be a guessing game.
          </h2>
          
          <div className="benefit__description">
            <p>
              Founders can track revenue, runway, hiring, and product metrics in real time.
            </p>
            <p className="benefit__highlight-text">
              Yet the factor that influences all of them—culture—often remains invisible.
            </p>
            <p>
              VibeOS makes organizational health measurable, giving leaders the clarity to build stronger teams, better managers, and companies that endure.
            </p>
          </div>

          <ul className="benefit__list">
            <li className="benefit__list-item">
              <div className="benefit__check-icon">
                <Check size={16} strokeWidth={3} />
              </div>
              <span className="benefit__list-text">Reveal what traditional metrics miss</span>
            </li>
            <li className="benefit__list-item">
              <div className="benefit__check-icon">
                <Check size={16} strokeWidth={3} />
              </div>
              <span className="benefit__list-text">Spot risks before they affect growth</span>
            </li>
            <li className="benefit__list-item">
              <div className="benefit__check-icon">
                <Check size={16} strokeWidth={3} />
              </div>
              <span className="benefit__list-text">Strengthen alignment at every level</span>
            </li>
            <li className="benefit__list-item">
              <div className="benefit__check-icon">
                <Check size={16} strokeWidth={3} />
              </div>
              <span className="benefit__list-text">Build a culture that compounds over time</span>
            </li>
          </ul>
        </div>

        {/* Right Side: Interactive Dashboard Mockup */}
        <div className="benefit__right">
          <div className="dashboard-frame">
            <div className="dashboard-container">
              
              {/* Header */}
              <div className="dashboard-header">
                <h3 className="dashboard-title">CULTURE HEALTH</h3>
                <div className="dashboard-score-badge">
                  <span className="label">OVERALL SCORE</span>
                  <span className="value">76/100</span>
                </div>
              </div>

              {/* Radar Chart Center Block */}
              <div className="radar-block">
                
                {/* SVG Radar Chart */}
                <div className="radar-svg-wrapper">
                  <svg viewBox="0 0 300 300" className="radar-svg">
                    {/* Concentric grid lines (hexagons) */}
                    {[0.2, 0.4, 0.6, 0.8, 1.0].map((scale) => (
                      <polygon
                        key={`grid-${scale}`}
                        points={getGridPoints(scale)}
                        className="radar-grid-poly"
                      />
                    ))}

                    {/* Axis lines from center */}
                    {DIMENSIONS.map((_, idx) => {
                      const angle = (idx * 60 - 90) * (Math.PI / 180);
                      const x = cx + maxR * Math.cos(angle);
                      const y = cy + maxR * Math.sin(angle);
                      return (
                        <line
                          key={`axis-${idx}`}
                          x1={cx}
                          y1={cy}
                          x2={x}
                          y2={y}
                          className="radar-axis-line"
                        />
                      );
                    })}

                    {/* Filled score polygon */}
                    <polygon
                      points={getRadarPoints()}
                      className="radar-score-poly"
                    />

                    {/* Glowing outer trace of score polygon */}
                    <polygon
                      points={getRadarPoints()}
                      className="radar-score-trace"
                    />

                    {/* Dimension points/dots */}
                    {DIMENSIONS.map((dim, idx) => {
                      const angle = (idx * 60 - 90) * (Math.PI / 180);
                      const r = (dim.score / 100) * maxR;
                      const x = cx + r * Math.cos(angle);
                      const y = cy + r * Math.sin(angle);
                      const isHovered = hoveredDim === dim.id;

                      return (
                        <circle
                          key={`dot-${dim.id}`}
                          cx={x}
                          cy={y}
                          r={isHovered ? 5.5 : 3.5}
                          fill={dim.color}
                          className={`radar-dot ${isHovered ? "active" : ""}`}
                          style={{
                            transition: "all 0.3s cubic-bezier(0.25, 1, 0.5, 1)"
                          }}
                        />
                      );
                    })}
                  </svg>
                </div>

                {/* Surrounding Dimension Cards */}
                <div className="radar-block-cards">
                  {DIMENSIONS.map((dim, idx) => {
                    const Icon = dim.icon;
                    const isHovered = hoveredDim === dim.id;
                    const isDimmed = hoveredDim !== null && !isHovered;

                    // Positions mapping clockwise: Trust (top), Alignment (top-right), Wellbeing (bottom-right),
                    // Growth (bottom), Recognition (bottom-left), Belonging (top-left)
                    const positionClasses = [
                      "pos-top",
                      "pos-top-right",
                      "pos-bottom-right",
                      "pos-bottom",
                      "pos-bottom-left",
                      "pos-top-left"
                    ];

                    return (
                      <div
                        key={dim.id}
                        className={`dim-card ${positionClasses[idx]} ${isHovered ? "active" : ""} ${isDimmed ? "dimmed" : ""}`}
                        style={{
                          "--dim-color": dim.color,
                          "--dim-bg": dim.bgColor,
                          "--dim-border": dim.borderColor
                        } as React.CSSProperties}
                        onMouseEnter={() => setHoveredDim(dim.id)}
                        onMouseLeave={() => setHoveredDim(null)}
                      >
                        <div className="dim-card__icon-wrapper">
                          <Icon size={14} />
                        </div>
                        <div className="dim-card__content">
                          <span className="dim-card__name">{dim.name}</span>
                          <span className="dim-card__score">{dim.score}/100</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>

              {/* AI Insight Box */}
              <div 
                className="ai-insight-box"
                style={{
                  borderColor: activeDim.borderColor,
                  boxShadow: `0 8px 24px ${activeDim.bgColor}`
                }}
              >
                <div className="ai-insight-box__left">
                  <div 
                    className="sparkle-badge"
                    style={{
                      background: activeDim.bgColor,
                      color: activeDim.color
                    }}
                  >
                    <Sparkles size={16} />
                  </div>
                </div>
                <div className="ai-insight-box__right">
                  <h4 
                    className="insight-title"
                    style={{ color: activeDim.color }}
                  >
                    AI INSIGHT
                  </h4>
                  <p className="insight-text">
                    {activeDim.insight}
                  </p>
                  <button 
                    className="insight-action-btn"
                    style={{
                      borderColor: activeDim.borderColor,
                      background: activeDim.bgColor,
                      color: activeDim.color
                    }}
                  >
                    ✦ View Recommended Actions
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
