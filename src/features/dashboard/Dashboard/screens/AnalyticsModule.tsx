import React, { useState } from "react";
import {
  TrendingUp,
  Download,
  Filter,
  BarChart3,
  Globe,
  Users,
  Activity,
  Smile,
  ArrowUpDown,
  Sparkles
} from "lucide-react";
import { mockDepartmentMetrics, mockTrends, MetricTrend } from "../utils/mockData";

export default function AnalyticsModule() {
  const [deptFilter, setDeptFilter] = useState("all");
  const [timeRange, setTimeRange] = useState("6m");
  const [chartMetric, setChartMetric] = useState<"engagement" | "participation" | "sentiment">("engagement");
  
  // Sort State
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // Filter departments
  const filteredDepts = deptFilter === "all" 
    ? mockDepartmentMetrics 
    : mockDepartmentMetrics.filter(d => d.name.toLowerCase() === deptFilter.toLowerCase());

  // Sort departments
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(prev => prev === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const sortedDepts = [...filteredDepts].sort((a, b) => {
    if (!sortField) return 0;
    
    let aVal: any = (a as any)[sortField];
    let bVal: any = (b as any)[sortField];
    
    if (typeof aVal === "string") {
      return sortDirection === "asc" 
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }
    
    return sortDirection === "asc" 
      ? aVal - bVal 
      : bVal - aVal;
  });

  // Calculate Average Metrics for filtered set
  const avgEngagement = (filteredDepts.reduce((sum, d) => sum + d.engagement, 0) / filteredDepts.length).toFixed(1);
  const avgParticipation = (filteredDepts.reduce((sum, d) => sum + d.participation, 0) / filteredDepts.length).toFixed(0);
  const avgSentiment = (filteredDepts.reduce((sum, d) => sum + d.sentiment, 0) / filteredDepts.length).toFixed(0);

  // Generate SVG path coordinate strings based on chartMetric from mockTrends
  // mockTrends has 6 data points. SVG viewbox is 500x200
  // x-coords: 20, 110, 200, 290, 380, 470
  // y-coords mapping:
  const getChartCoordinates = () => {
    let minVal = 0;
    let maxVal = 100;
    
    if (chartMetric === "engagement") {
      minVal = 60; // Engagement is out of 100 or mapped to 10. Let's treat it as out of 100 (e.g. 74 to 84)
      maxVal = 90;
    } else if (chartMetric === "participation") {
      minVal = 70;
      maxVal = 100;
    } else { // sentiment
      minVal = 50;
      maxVal = 90;
    }

    const points = mockTrends.map((t, idx) => {
      const x = 20 + idx * 90;
      const val = (t as any)[chartMetric];
      // Map to y bounds 20 (top) to 180 (bottom)
      const ratio = (val - minVal) / (maxVal - minVal);
      const y = 180 - ratio * 150;
      return { x, y, value: val };
    });

    // Create cubic bezier curve path
    let linePath = `M ${points[0].x},${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const curr = points[i];
      const next = points[i + 1];
      const cpX1 = curr.x + 45;
      const cpY1 = curr.y;
      const cpX2 = next.x - 45;
      const cpY2 = next.y;
      linePath += ` C ${cpX1},${cpY1} ${cpX2},${cpY2} ${next.x},${next.y}`;
    }

    // Area path closing coordinates
    const areaPath = `${linePath} L ${points[points.length - 1].x},190 L ${points[0].x},190 Z`;
    
    return { linePath, areaPath, points };
  };

  const { linePath, areaPath, points } = getChartCoordinates();

  const handleExport = (type: "csv" | "pdf") => {
    alert(`Generating high-fidelity ${type.toUpperCase()} analytics report for ${deptFilter === "all" ? "All Departments" : deptFilter}...`);
  };

  return (
    <div className="analytics-module v-animate-slide-up">
      <div className="executive-dashboard__header" style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "16px", marginBottom: "24px" }}>
        <div>
          <h2 className="executive-dashboard__title" style={{ fontSize: "24px", fontWeight: 800 }}>Workforce Analytics Workspace</h2>
          <p className="executive-dashboard__subtitle" style={{ color: "var(--text-secondary)" }}>Isolate drivers, trace sentiment timeline, and view departmental breakdowns.</p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button 
            onClick={() => handleExport("csv")} 
            className="bm-top-nav__workspace-select" 
            style={{ height: "40px", display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}
          >
            <Download size={14} /> Export CSV
          </button>
          <button 
            onClick={() => handleExport("pdf")} 
            className="executive-dashboard__action-btn"
            style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}
          >
            📊 Create PDF Summary
          </button>
        </div>
      </div>

      {/* Analytics Filters Grid */}
      <div className="analytics-module__filters" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "24px" }}>
        <div className="analytics-module__filter-item" style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <label style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>Focus Department</label>
          <select 
            value={deptFilter} 
            onChange={(e) => setDeptFilter(e.target.value)}
            style={{ padding: "10px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", background: "var(--bg-card)", color: "var(--text-primary)" }}
          >
            <option value="all">All Departments</option>
            <option value="engineering">Engineering</option>
            <option value="product">Product</option>
            <option value="design">Design</option>
            <option value="marketing">Marketing</option>
            <option value="sales">Sales</option>
          </select>
        </div>

        <div className="analytics-module__filter-item" style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <label style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>Pulse Interval</label>
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            style={{ padding: "10px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", background: "var(--bg-card)", color: "var(--text-primary)" }}
          >
            <option value="30d">Last 30 Days</option>
            <option value="3m">Last 3 Months</option>
            <option value="6m">Last 6 Months</option>
            <option value="1y">Last Year</option>
          </select>
        </div>

        <div className="analytics-module__filter-item" style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <label style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>Location Scope</label>
          <select style={{ padding: "10px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", background: "var(--bg-card)", color: "var(--text-primary)" }}>
            <option>All Global Offices</option>
            <option>San Francisco HQ</option>
            <option>New York Office</option>
            <option>Toronto Hub</option>
            <option>London Tech</option>
            <option>Full Remote</option>
          </select>
        </div>
      </div>

      {/* Main Graph Grid */}
      <div className="analytics-module__grid-cols" style={{ display: "grid", gridTemplateColumns: "1.3fr 0.7fr", gap: "24px", marginBottom: "24px" }}>
        {/* Engagement Area Chart */}
        <div className="dashboard-card" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", padding: "24px", borderRadius: "var(--radius-lg)" }}>
          <div className="dashboard-card__header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h3 className="dashboard-card__title" style={{ fontSize: "16px", fontWeight: 700, display: "flex", alignItems: "center", gap: "8px" }}>
              <Activity size={16} className="text-indigo-500" />
              Timeline Trend Pulse
            </h3>
            <div style={{ display: "flex", gap: "6px" }}>
              {(["engagement", "participation", "sentiment"] as const).map(metric => (
                <button
                  key={metric}
                  onClick={() => setChartMetric(metric)}
                  style={{
                    padding: "4px 10px",
                    borderRadius: "4px",
                    border: chartMetric === metric ? "none" : "1px solid var(--border-color)",
                    background: chartMetric === metric ? "var(--color-indigo)" : "transparent",
                    color: chartMetric === metric ? "#fff" : "var(--text-secondary)",
                    fontSize: "11px",
                    fontWeight: 700,
                    cursor: "pointer",
                    textTransform: "capitalize",
                    transition: "all 0.15s ease"
                  }}
                >
                  {metric === "engagement" ? "Engagement" : metric === "participation" ? "Participation" : "Sentiment"}
                </button>
              ))}
            </div>
          </div>

          <div className="dashboard-card__body">
            <div style={{ position: "relative", height: "220px", width: "100%", padding: "10px 0" }}>
              <svg viewBox="0 0 500 200" style={{ width: "100%", height: "100%", overflow: "visible" }}>
                <defs>
                  <linearGradient id="analytics-area-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-indigo)" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="var(--color-indigo)" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                
                {/* Horizontal Guide Lines */}
                <line x1="20" y1="20" x2="470" y2="20" stroke="var(--border-color)" strokeWidth="0.5" strokeDasharray="4 4" />
                <line x1="20" y1="75" x2="470" y2="75" stroke="var(--border-color)" strokeWidth="0.5" strokeDasharray="4 4" />
                <line x1="20" y1="130" x2="470" y2="130" stroke="var(--border-color)" strokeWidth="0.5" strokeDasharray="4 4" />
                <line x1="20" y1="185" x2="470" y2="185" stroke="var(--border-color)" strokeWidth="1" />

                {/* Shaded Area */}
                <path d={areaPath} fill="url(#analytics-area-grad)" style={{ transition: "d 0.3s ease-out" }} />
                
                {/* Line Path */}
                <path d={linePath} fill="none" stroke="var(--color-indigo)" strokeWidth="3" strokeLinecap="round" style={{ transition: "d 0.3s ease-out" }} />
                
                {/* Interactive Points */}
                {points.map((pt, idx) => (
                  <g key={idx}>
                    <circle 
                      cx={pt.x} 
                      cy={pt.y} 
                      r="5" 
                      fill="var(--bg-card)" 
                      stroke="var(--color-indigo)" 
                      strokeWidth="3.5"
                      style={{ cursor: "pointer", transition: "cy 0.3s ease-out" }} 
                    />
                    <text 
                      x={pt.x} 
                      y={pt.y - 12} 
                      textAnchor="middle" 
                      fontSize="10" 
                      fontWeight="800" 
                      fill="var(--text-primary)"
                      style={{ transition: "y 0.3s ease-out" }}
                    >
                      {chartMetric === "engagement" ? (pt.value / 10).toFixed(1) : `${pt.value}%`}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
            
            <div style={{ display: "flex", justifyContent: "space-between", padding: "0 10px", fontSize: "11px", color: "var(--text-muted)", fontWeight: "700" }}>
              {mockTrends.map((t, i) => (
                <span key={i}>{t.period}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Sentiment Analysis Donut */}
        <div className="dashboard-card" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", padding: "24px", borderRadius: "var(--radius-lg)" }}>
          <div className="dashboard-card__header" style={{ marginBottom: "20px" }}>
            <h3 className="dashboard-card__title" style={{ fontSize: "16px", fontWeight: 700, display: "flex", alignItems: "center", gap: "8px" }}>
              <Smile size={16} className="text-indigo-500" />
              Pulse Sentiment
            </h3>
          </div>
          <div className="dashboard-card__body" style={{ display: "flex", flexDirection: "column", gap: "24px", alignItems: "center", justifyContent: "center" }}>
            <div style={{ position: "relative", width: "130px", height: "130px" }}>
              <svg viewBox="0 0 36 36" style={{ width: "100%", height: "100%" }}>
                {/* Positive: 65% (Emerald) */}
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="var(--color-emerald)" strokeWidth="4.5" strokeDasharray="65 35" strokeDashoffset="0" />
                {/* Neutral: 25% (Amber) */}
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="var(--color-amber)" strokeWidth="4.5" strokeDasharray="25 75" strokeDashoffset="-65" />
                {/* Negative: 10% (Rose) */}
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="var(--color-rose)" strokeWidth="4.5" strokeDasharray="10 90" strokeDashoffset="-90" />
              </svg>
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center" }}>
                <span style={{ fontSize: "20px", fontWeight: 800, color: "var(--text-primary)", display: "block" }}>
                  {deptFilter === "all" ? "65%" : "Positive"}
                </span>
                <span style={{ fontSize: "9px", textTransform: "uppercase", fontWeight: 700, color: "var(--text-muted)", letterSpacing: "0.05em" }}>
                  {deptFilter === "all" ? "Positive" : deptFilter}
                </span>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", width: "100%", gap: "10px" }}>
              {[
                { label: "Positive Sentiment", value: "65%", color: "var(--color-emerald)" },
                { label: "Neutral Sentiment", value: "25%", color: "var(--color-amber)" },
                { label: "Negative Sentiment", value: "10%", color: "var(--color-rose)" }
              ].map((item, idx) => (
                <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "12px", fontWeight: 600 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: item.color }} />
                    <span style={{ color: "var(--text-secondary)" }}>{item.label}</span>
                  </div>
                  <span style={{ fontWeight: 800, color: "var(--text-primary)" }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Drill Down Table */}
      <div className="dashboard-card" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", padding: "24px", borderRadius: "var(--radius-lg)" }}>
        <div className="dashboard-card__header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h3 className="dashboard-card__title" style={{ fontSize: "16px", fontWeight: 700, display: "flex", alignItems: "center", gap: "8px" }}>
            <BarChart3 size={16} className="text-indigo-500" />
            Department Breakdown Analytics
          </h3>
          <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-muted)" }}>
            Showing {sortedDepts.length} records
          </span>
        </div>
        <div className="dashboard-card__body">
          <div className="data-table-container" style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid var(--border-color)", color: "var(--text-muted)", fontSize: "11px", fontWeight: 800, textTransform: "uppercase" }}>
                  <th 
                    onClick={() => handleSort("name")}
                    style={{ padding: "12px 16px", cursor: "pointer", whiteSpace: "nowrap" }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      Department <ArrowUpDown size={12} />
                    </div>
                  </th>
                  <th 
                    onClick={() => handleSort("engagement")}
                    style={{ padding: "12px 16px", cursor: "pointer", whiteSpace: "nowrap" }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      Engagement (10) <ArrowUpDown size={12} />
                    </div>
                  </th>
                  <th 
                    onClick={() => handleSort("participation")}
                    style={{ padding: "12px 16px", cursor: "pointer", whiteSpace: "nowrap" }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      Participation <ArrowUpDown size={12} />
                    </div>
                  </th>
                  <th 
                    onClick={() => handleSort("sentiment")}
                    style={{ padding: "12px 16px", cursor: "pointer", whiteSpace: "nowrap" }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      Positive Sentiment <ArrowUpDown size={12} />
                    </div>
                  </th>
                  <th 
                    onClick={() => handleSort("headcount")}
                    style={{ padding: "12px 16px", cursor: "pointer", whiteSpace: "nowrap" }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      Active Headcount <ArrowUpDown size={12} />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedDepts.map((dept, index) => (
                  <tr 
                    key={index} 
                    style={{ 
                      borderBottom: "1px solid var(--border-color)", 
                      fontSize: "13px",
                      transition: "var(--v-transition)",
                      backgroundColor: index % 2 === 0 ? "transparent" : "var(--bg-main)"
                    }}
                    className="dashboard-table-row"
                  >
                    <td style={{ padding: "14px 16px", fontWeight: "800", color: "var(--text-primary)" }}>{dept.name}</td>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ fontWeight: 700 }}>{dept.engagement}</span>
                        <div style={{ width: "60px", height: "6px", backgroundColor: "var(--bg-input)", borderRadius: "3px", overflow: "hidden" }}>
                          <div 
                            style={{ 
                              width: `${dept.engagement * 10}%`, 
                              height: "100%", 
                              backgroundColor: dept.engagement >= 8 ? "var(--color-emerald)" : dept.engagement >= 7.5 ? "var(--color-indigo)" : "var(--color-amber)",
                              borderRadius: "3px" 
                            }} 
                          />
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "14px 16px", fontWeight: 600 }}>{dept.participation}%</td>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ fontWeight: 600 }}>{dept.sentiment}%</span>
                        <div style={{ width: "60px", height: "6px", backgroundColor: "var(--bg-input)", borderRadius: "3px", overflow: "hidden" }}>
                          <div 
                            style={{ 
                              width: `${dept.sentiment}%`, 
                              height: "100%", 
                              backgroundColor: "var(--color-emerald)", 
                              borderRadius: "3px" 
                            }} 
                          />
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "14px 16px", color: "var(--text-secondary)", fontWeight: 600 }}>{dept.headcount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
