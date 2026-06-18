import React from "react";
import {
  TrendingUp,
  AlertTriangle,
  Smile,
  Users,
  Activity,
  Calendar,
  Sparkles,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { mockRoleMetrics, mockTrends } from "../utils/mockData";

export default function ExecutiveDashboard() {
  const metrics = mockRoleMetrics.executive;

  const totalBurnout = metrics.burnoutRisk.low + metrics.burnoutRisk.medium + metrics.burnoutRisk.high;
  const highPercent = Math.round((metrics.burnoutRisk.high / totalBurnout) * 100);
  const medPercent = Math.round((metrics.burnoutRisk.medium / totalBurnout) * 100);
  const lowPercent = Math.round((metrics.burnoutRisk.low / totalBurnout) * 100);

  // SVG Chart Trajectory Coordinates
  const chartW = 500;
  const chartH = 200;
  const padding = 30;

  const getX = (index: number) => padding + (index / (mockTrends.length - 1)) * (chartW - padding * 2);
  const getY = (val: number) => chartH - padding - ((val - 50) / 50) * (chartH - padding * 2);

  const engPoints = mockTrends.map((t, i) => `${getX(i)},${getY(t.engagement)}`).join(" ");
  const partPoints = mockTrends.map((t, i) => `${getX(i)},${getY(t.participation)}`).join(" ");
  const burnPoints = mockTrends.map((t, i) => `${getX(i)},${getY(t.burnoutRisk * 5)}`).join(" "); // scaled for visibility

  const engArea = `${getX(0)},${chartH - padding} ${engPoints} ${getX(mockTrends.length - 1)},${chartH - padding}`;

  return (
    <div className="executive-dashboard v-animate-slide-up">
      <div className="executive-dashboard__header">
        <div>
          <h2 className="executive-dashboard__title" style={{ fontSize: "24px", fontWeight: 800 }}>Executive Intelligence</h2>
          <p className="executive-dashboard__subtitle" style={{ color: "var(--text-secondary)" }}>Organization-wide employee sentiment, benchmarks, and burnout forecasting.</p>
        </div>
        <button className="executive-dashboard__action-btn" style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
          📊 Export Board Report
        </button>
      </div>

      {/* Stats Cards Row */}
      <div className="executive-dashboard__grid-metrics">
        {[
          { label: "Culture Health Index", value: metrics.cultureHealthIndex, icon: <Activity size={16} />, trend: `▲ ${metrics.cultureHealthTrend}`, desc: "vs. industry average (78)", primary: true },
          { label: "Engagement Score", value: `${metrics.engagementScore}/10`, icon: <Smile size={16} />, trend: `▲ ${metrics.engagementTrend}`, desc: "Based on monthly pulse cycle" },
          { label: "Participation Rate", value: `${metrics.participationRate}%`, icon: <Users size={16} />, trend: `▲ ${metrics.participationTrend}`, desc: "Completion of 2,140 total headcounts" },
          { label: "Burnout Alert Rate", value: `${highPercent}%`, icon: <AlertTriangle size={16} className="text-amber-500" />, trend: "▼ -2%", desc: "Designated as \"High Risk\" cohorts", warning: true }
        ].map((c, idx) => (
          <div
            key={idx}
            className={`dashboard-metric-card ${c.primary ? "dashboard-card--interactive" : ""}`}
            style={{
              background: "var(--bg-card)",
              borderRadius: "var(--radius-lg)",
              padding: "24px",
              border: c.primary ? "1px solid var(--color-indigo)" : "1px solid var(--border-color)",
              boxShadow: "var(--shadow-sm)",
              position: "relative",
              overflow: "hidden"
            }}
          >
            {c.primary && (
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", backgroundColor: "var(--color-indigo)" }} />
            )}
            <div className="dashboard-metric-card__header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span className="dashboard-metric-card__label" style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", color: "var(--text-muted)", letterSpacing: "0.05em" }}>{c.label}</span>
              <div className="dashboard-metric-card__icon" style={{ display: "flex", padding: "6px", backgroundColor: "var(--bg-input)", borderRadius: "var(--radius-sm)", color: "var(--color-indigo)" }}>{c.icon}</div>
            </div>
            <div className="dashboard-metric-card__row" style={{ display: "flex", alignItems: "baseline", gap: "8px", margin: "12px 0 6px 0" }}>
              <span className="dashboard-metric-card__value" style={{ fontSize: "28px", fontWeight: 800, color: "var(--text-primary)" }}>{c.value}</span>
              <span className={`dashboard-metric-card__trend ${c.warning ? "trend-down" : "trend-up"}`} style={{ fontSize: "11px", fontWeight: 700, padding: "2px 8px", borderRadius: "12px", backgroundColor: c.warning ? "var(--color-rose-glow)" : "var(--color-emerald-glow)", color: c.warning ? "var(--color-rose)" : "var(--color-emerald)" }}>{c.trend}</span>
            </div>
            <span className="dashboard-metric-card__desc" style={{ fontSize: "12px", color: "var(--text-muted)" }}>{c.desc}</span>
          </div>
        ))}
      </div>

      {/* Main Grid: Visual Analytics & Details */}
      <div className="executive-dashboard__grid-cols" style={{ marginTop: "24px" }}>
        {/* Left Col: Engagement & Participation Trend */}
        <div className="dashboard-card" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-lg)", padding: "24px" }}>
          <div className="dashboard-card__header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h3 className="dashboard-card__title" style={{ fontSize: "16px", fontWeight: 700, display: "flex", alignItems: "center", gap: "8px" }}>
              <TrendingUp size={16} className="text-indigo-500" />
              Workforce Sentiment Trajectory
            </h3>
            <div style={{ display: "flex", gap: "16px", fontSize: "11px", fontWeight: "700" }}>
              <span style={{ color: "var(--color-indigo)" }}>● Engagement</span>
              <span style={{ color: "var(--color-emerald)" }}>● Participation</span>
              <span style={{ color: "var(--color-rose)" }}>● Burnout Risk (x5)</span>
            </div>
          </div>
          <div className="dashboard-card__body">
            <div style={{ height: "220px", width: "100%" }}>
              <svg viewBox={`0 0 ${chartW} ${chartH}`} style={{ width: "100%", height: "100%", overflow: "visible" }}>
                <defs>
                  <linearGradient id="engGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-indigo)" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="var(--color-indigo)" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Grid Lines */}
                {[50, 60, 70, 80, 90, 100].map(v => (
                  <g key={v}>
                    <line x1={padding} y1={getY(v)} x2={chartW - padding} y2={getY(v)} stroke="var(--border-color)" strokeWidth="0.5" strokeDasharray="4, 4" />
                    <text x={padding - 8} y={getY(v) + 4} fontSize="9" fill="var(--text-muted)" textAnchor="end">{v}%</text>
                  </g>
                ))}

                {/* Engagement Shaded Area */}
                <polygon points={engArea} fill="url(#engGlow)" />

                {/* Engagement Line */}
                <polyline fill="none" stroke="var(--color-indigo)" strokeWidth="3" points={engPoints} strokeLinecap="round" strokeLinejoin="round" />

                {/* Participation Line */}
                <polyline fill="none" stroke="var(--color-emerald)" strokeWidth="2.5" strokeDasharray="5, 5" points={partPoints} strokeLinecap="round" strokeLinejoin="round" />

                {/* Burnout Risk Line */}
                <polyline fill="none" stroke="var(--color-rose)" strokeWidth="2" points={burnPoints} strokeLinecap="round" strokeLinejoin="round" />

                {/* Data Points */}
                {mockTrends.map((t, i) => (
                  <g key={i}>
                    <circle cx={getX(i)} cy={getY(t.engagement)} r="4" fill="var(--bg-card)" stroke="var(--color-indigo)" strokeWidth="2" />
                    <circle cx={getX(i)} cy={getY(t.participation)} r="3" fill="var(--bg-card)" stroke="var(--color-emerald)" strokeWidth="2" />
                  </g>
                ))}
              </svg>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 10px 0 10px", fontSize: "11px", color: "var(--text-muted)", fontWeight: "600" }}>
              {mockTrends.map((t, idx) => (
                <span key={idx}>{t.period}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Burnout Donut */}
        <div className="dashboard-card" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-lg)", padding: "24px" }}>
          <div className="dashboard-card__header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h3 className="dashboard-card__title" style={{ fontSize: "16px", fontWeight: 700, display: "flex", alignItems: "center", gap: "8px" }}>
              <AlertTriangle size={16} className="text-amber-500" />
              Burnout Risk Allocation
            </h3>
          </div>
          <div className="dashboard-card__body">
            <div className="burnout-risk-widget" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div className="burnout-risk-widget__chart" style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "relative", height: "140px" }}>
                <svg viewBox="0 0 36 36" style={{ width: "110px", height: "110px" }}>
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="var(--border-color)" strokeWidth="4" />
                  <circle
                    cx="18" cy="18" r="15.915" fill="none"
                    stroke="var(--color-emerald)" strokeWidth="4.5"
                    strokeDasharray={`${lowPercent} ${100 - lowPercent}`}
                    strokeDashoffset="25"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="18" cy="18" r="15.915" fill="none"
                    stroke="var(--color-amber)" strokeWidth="4.5"
                    strokeDasharray={`${medPercent} ${100 - medPercent}`}
                    strokeDashoffset={25 - lowPercent}
                    strokeLinecap="round"
                  />
                  <circle
                    cx="18" cy="18" r="15.915" fill="none"
                    stroke="var(--color-rose)" strokeWidth="4.5"
                    strokeDasharray={`${highPercent} ${100 - highPercent}`}
                    strokeDashoffset={25 - lowPercent - medPercent}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="burnout-risk-widget__middle" style={{ position: "absolute", display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <span className="num" style={{ fontSize: "22px", fontWeight: 800 }}>{highPercent}%</span>
                  <span className="lbl" style={{ fontSize: "10px", fontWeight: 700, color: "var(--text-muted)" }}>Severe</span>
                </div>
              </div>
              <div className="burnout-risk-widget__grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
                <div className="burnout-risk-widget__item risk-low" style={{ padding: "8px", borderRadius: "var(--radius-sm)", backgroundColor: "var(--bg-input)", textAlign: "center" }}>
                  <strong style={{ display: "block", fontSize: "16px", color: "var(--color-emerald)" }}>{metrics.burnoutRisk.low}%</strong>
                  <span style={{ fontSize: "10px", color: "var(--text-muted)", fontWeight: 600 }}>Low Risk</span>
                </div>
                <div className="burnout-risk-widget__item risk-med" style={{ padding: "8px", borderRadius: "var(--radius-sm)", backgroundColor: "var(--bg-input)", textAlign: "center" }}>
                  <strong style={{ display: "block", fontSize: "16px", color: "var(--color-amber)" }}>{metrics.burnoutRisk.medium}%</strong>
                  <span style={{ fontSize: "10px", color: "var(--text-muted)", fontWeight: 600 }}>Elevated</span>
                </div>
                <div className="burnout-risk-widget__item risk-high" style={{ padding: "8px", borderRadius: "var(--radius-sm)", backgroundColor: "var(--bg-input)", textAlign: "center" }}>
                  <strong style={{ display: "block", fontSize: "16px", color: "var(--color-rose)" }}>{metrics.burnoutRisk.high}%</strong>
                  <span style={{ fontSize: "10px", color: "var(--text-muted)", fontWeight: 600 }}>Severe</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lower Row: Action Center & Pulse Activities */}
      <div className="executive-dashboard__grid-cols" style={{ marginTop: "24px" }}>
        {/* Action Center */}
        <div className="dashboard-card" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-lg)", padding: "24px" }}>
          <div className="dashboard-card__header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h3 className="dashboard-card__title" style={{ fontSize: "16px", fontWeight: 700, display: "flex", alignItems: "center", gap: "8px" }}>
              <CheckCircle2 size={16} className="text-indigo-500" />
              Workforce Action Center
            </h3>
          </div>
          <div className="dashboard-card__body">
            <div className="actions-list" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div className="action-item high-priority" style={{ display: "flex", alignItems: "center", gap: "16px", padding: "16px", backgroundColor: "var(--bg-input)", borderRadius: "var(--radius-md)", borderLeft: "4px solid var(--color-rose)" }}>
                <div style={{ padding: "6px", backgroundColor: "var(--color-rose-glow)", borderRadius: "50%", color: "var(--color-rose)" }}><AlertTriangle size={14} /></div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: "14px", fontWeight: 700, margin: 0 }}>Engineering Workload Rebalancing</h4>
                  <p style={{ fontSize: "12px", color: "var(--text-secondary)", margin: "4px 0 0 0" }}>Burnout indices in Engineering rose by 14% this month. Urgent plan approval required.</p>
                </div>
                <button style={{ padding: "6px 12px", backgroundColor: "var(--color-rose)", color: "white", border: "none", borderRadius: "6px", fontSize: "11px", fontWeight: 700, cursor: "pointer" }}>
                  Review
                </button>
              </div>
              <div className="action-item medium-priority" style={{ display: "flex", alignItems: "center", gap: "16px", padding: "16px", backgroundColor: "var(--bg-input)", borderRadius: "var(--radius-md)", borderLeft: "4px solid var(--color-amber)" }}>
                <div style={{ padding: "6px", backgroundColor: "var(--color-amber-glow)", borderRadius: "50%", color: "var(--color-amber)" }}><Sparkles size={14} /></div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: "14px", fontWeight: 700, margin: 0 }}>Q4 Leadership Connection Pulse</h4>
                  <p style={{ fontSize: "12px", color: "var(--text-secondary)", margin: "4px 0 0 0" }}>Pulse template draft is waiting for audit approval before publication.</p>
                </div>
                <button style={{ padding: "6px 12px", backgroundColor: "var(--color-indigo)", color: "white", border: "none", borderRadius: "6px", fontSize: "11px", fontWeight: 700, cursor: "pointer" }}>
                  Approve
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Pulse Activities Calendar */}
        <div className="dashboard-card" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-lg)", padding: "24px" }}>
          <div className="dashboard-card__header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h3 className="dashboard-card__title" style={{ fontSize: "16px", fontWeight: 700, display: "flex", alignItems: "center", gap: "8px" }}>
              <Calendar size={16} className="text-indigo-500" />
              Pulse Activities
            </h3>
          </div>
          <div className="dashboard-card__body" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {[
              { date: "JUN 25", title: "Workspace Tools Pulse", desc: "Targeting all active channels", bg: "var(--color-indigo-glow)", text: "var(--color-indigo)" },
              { date: "JUN 30", title: "Q2 Engagement Cycle Ends", desc: "Current response count: 1,420", bg: "var(--color-blue-glow)", text: "var(--color-blue)" }
            ].map((act, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "14px", paddingBottom: i === 0 ? "12px" : "0", borderBottom: i === 0 ? "1px solid var(--border-color)" : "none" }}>
                <div style={{ backgroundColor: act.bg, color: act.text, fontWeight: "800", padding: "8px", borderRadius: "10px", fontSize: "10px", width: "56px", textAlign: "center" }}>{act.date}</div>
                <div>
                  <div style={{ fontWeight: "700", fontSize: "13px" }}>{act.title}</div>
                  <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>{act.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
