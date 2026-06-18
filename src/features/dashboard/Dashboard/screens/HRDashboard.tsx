import React, { useState } from "react";
import {
  Heart,
  TrendingUp,
  Award,
  Users,
  Sparkles,
  AlertCircle
} from "lucide-react";
import { mockRoleMetrics, MOCK_FEEDBACK, mockSurveys } from "../utils/mockData";

export default function HRDashboard() {
  const metrics = mockRoleMetrics.hr;
  const [feedbackList, setFeedbackList] = useState<any[]>(MOCK_FEEDBACK);

  const getHeatColor = (score: number) => {
    if (score >= 8.5) return "rgba(16, 185, 129, 0.9)"; // Emerald
    if (score >= 8.0) return "rgba(99, 102, 241, 0.9)"; // Indigo
    if (score >= 7.5) return "rgba(59, 130, 246, 0.8)"; // Blue
    if (score >= 7.0) return "rgba(245, 158, 11, 0.8)";  // Amber
    return "rgba(239, 68, 68, 0.9)";                    // Rose
  };

  const handleModerate = (id: string, action: "resolved" | "rejected") => {
    setFeedbackList(prev => prev.map(f => f.id === id ? { ...f, status: action } : f));
  };

  const drivers = ["Trust", "Alignment", "Recognition", "Well-being", "Growth"];
  const depts = ["Engineering", "Product", "Design", "Sales", "Support"];
  const scores: Record<string, Record<string, number>> = {
    'Engineering': { 'Trust': 8.6, 'Alignment': 8.0, 'Recognition': 7.8, 'Well-being': 8.8, 'Growth': 8.5 },
    'Product': { 'Trust': 8.8, 'Alignment': 8.5, 'Recognition': 8.2, 'Well-being': 8.0, 'Growth': 8.8 },
    'Design': { 'Trust': 9.0, 'Alignment': 8.2, 'Recognition': 7.2, 'Well-being': 8.6, 'Growth': 8.4 },
    'Sales': { 'Trust': 7.6, 'Alignment': 7.8, 'Recognition': 8.0, 'Well-being': 6.5, 'Growth': 7.8 },
    'Support': { 'Trust': 8.2, 'Alignment': 7.4, 'Recognition': 7.8, 'Well-being': 7.0, 'Growth': 7.5 }
  };

  return (
    <div className="hr-dashboard v-animate-slide-up">
      <div className="executive-dashboard__header">
        <div>
          <h2 className="executive-dashboard__title" style={{ fontSize: "24px", fontWeight: 800 }}>Culture Operations</h2>
          <p className="executive-dashboard__subtitle" style={{ color: "var(--text-secondary)" }}>Manage pulse campaigns, monitor completion metrics, and moderate feedback feeds.</p>
        </div>
        <button className="executive-dashboard__action-btn" style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
          🌱 Launch Culture Initiative
        </button>
      </div>

      {/* Metrics Row */}
      <div className="executive-dashboard__grid-metrics" style={{ marginTop: "24px" }}>
        {[
          { label: "Survey Health Index", value: `${metrics.surveyHealth}%`, icon: <Heart size={16} />, trend: `▲ ${metrics.surveyHealthTrend}`, desc: "Reliability & validity rating" },
          { label: "Feedback Inbox Volume", value: metrics.feedbackVolume, icon: <TrendingUp size={16} />, trend: `▲ ${metrics.feedbackVolumeTrend}`, desc: "Comments received in 30 days" },
          { label: "Kudos Activity Count", value: metrics.recognitionActivity, icon: <Award size={16} />, trend: `▲ ${metrics.recognitionActivityTrend}`, desc: "Social peer recognitions sent" },
          { label: "Active Culture Goals", value: `${metrics.goalsCompleted}/${metrics.activeGoals}`, icon: <Users size={16} />, trend: "▲ 66% Done", desc: "Objectives scheduled for Q2" }
        ].map((m, idx) => (
          <div
            key={idx}
            className="dashboard-metric-card"
            style={{
              background: "var(--bg-card)",
              borderRadius: "var(--radius-lg)",
              padding: "24px",
              border: "1px solid var(--border-color)",
              boxShadow: "var(--shadow-sm)"
            }}
          >
            <div className="dashboard-metric-card__header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span className="dashboard-metric-card__label" style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", color: "var(--text-muted)", letterSpacing: "0.05em" }}>{m.label}</span>
              <div className="dashboard-metric-card__icon" style={{ display: "flex", padding: "6px", backgroundColor: "var(--bg-input)", borderRadius: "var(--radius-sm)", color: "var(--color-indigo)" }}>{m.icon}</div>
            </div>
            <div className="dashboard-metric-card__row" style={{ display: "flex", alignItems: "baseline", gap: "8px", margin: "12px 0 6px 0" }}>
              <span className="dashboard-metric-card__value" style={{ fontSize: "28px", fontWeight: 800, color: "var(--text-primary)" }}>{m.value}</span>
              <span className="dashboard-metric-card__trend trend-up" style={{ fontSize: "11px", fontWeight: 700, padding: "2px 8px", borderRadius: "12px", backgroundColor: "var(--v-success-light)", color: "var(--v-success)" }}>{m.trend}</span>
            </div>
            <span className="dashboard-metric-card__desc" style={{ fontSize: "12px", color: "var(--text-muted)" }}>{m.desc}</span>
          </div>
        ))}
      </div>

      <div className="hr-dashboard__grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px", marginTop: "24px" }}>
        {/* Sentiment Heatmap */}
        <div className="dashboard-card" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-lg)", padding: "24px" }}>
          <div className="dashboard-card__header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h3 className="dashboard-card__title" style={{ fontSize: "16px", fontWeight: 700, display: "flex", alignItems: "center", gap: "8px" }}>
              <Sparkles size={16} className="text-indigo-500" />
              Department Sentiment Breakdown
            </h3>
          </div>
          <div className="dashboard-card__body">
            <div style={{ overflowX: "auto", width: "100%" }}>
              <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "8px", minWidth: "500px" }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: "left", fontSize: "12px", color: "var(--text-muted)", padding: "6px" }}>Department</th>
                    {drivers.map(d => (
                      <th key={d} style={{ fontSize: "12px", color: "var(--text-muted)", textAlign: "center", padding: "6px" }}>{d}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {depts.map(dept => (
                    <tr key={dept}>
                      <td style={{ fontWeight: 700, fontSize: "13px", padding: "10px 6px" }}>{dept}</td>
                      {drivers.map(driver => {
                        const score = scores[dept][driver];
                        return (
                          <td
                            key={driver}
                            style={{
                              backgroundColor: getHeatColor(score),
                              color: "#ffffff",
                              textAlign: "center",
                              fontWeight: 800,
                              fontSize: "14px",
                              padding: "12px 6px",
                              borderRadius: "6px",
                              boxShadow: "inset 0 1px 1px rgba(255,255,255,0.1)",
                              cursor: "pointer"
                            }}
                            title={`${dept} scored ${score} in ${driver}`}
                          >
                            {score}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Culture Goals Progress */}
        <div className="dashboard-card" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-lg)", padding: "24px" }}>
          <div className="dashboard-card__header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h3 className="dashboard-card__title" style={{ fontSize: "16px", fontWeight: 700, display: "flex", alignItems: "center", gap: "8px" }}>
              <Sparkles size={16} className="text-indigo-500" />
              Active Culture Goals
            </h3>
          </div>
          <div className="dashboard-card__body" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {[
              { label: "Increase Sales Engagement", percent: 78, color: "var(--color-amber)" },
              { label: "Launch WFH Resource Hub", percent: 100, color: "var(--color-emerald)" },
              { label: "Onboarding Satisfaction Rate", percent: 92, color: "var(--color-indigo)" }
            ].map((g, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", fontWeight: 600 }}>
                  <span>{g.label}</span>
                  <span>{g.percent}%</span>
                </div>
                <div style={{ width: "100%", height: "6px", backgroundColor: "var(--bg-input)", borderRadius: "3px", overflow: "hidden" }}>
                  <div style={{ width: `${g.percent}%`, height: "100%", backgroundColor: g.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Moderation inbox */}
      <div className="dashboard-card" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-lg)", padding: "24px", marginTop: "24px" }}>
        <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "20px" }}>Anonymous Feedback Inbox Moderation</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {feedbackList.map(f => (
            <div key={f.id} style={{ display: "flex", justifyContent: "space-between", gap: "20px", padding: "20px", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)", backgroundColor: "var(--bg-main)" }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <span style={{
                    padding: "3px 8px", borderRadius: "12px", fontSize: "11px", fontWeight: 700, textTransform: "uppercase",
                    backgroundColor: f.mood === "positive" ? "var(--color-emerald-glow)" : f.mood === "neutral" ? "var(--color-amber-glow)" : "var(--color-rose-glow)",
                    color: f.mood === "positive" ? "var(--color-emerald)" : f.mood === "neutral" ? "var(--color-amber)" : "var(--color-rose)"
                  }}>
                    {f.mood}
                  </span>
                  <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 600 }}>{f.category} • {f.date}</span>
                </div>
                <p style={{ fontSize: "14px", lineHeight: 1.5, margin: "6px 0 0 0" }}>"{f.content}"</p>
                <div style={{ display: "flex", gap: "12px", marginTop: "12px", fontSize: "12px", color: "var(--text-muted)" }}>
                  <span>Upvotes: {f.upvotes}</span>
                  <span>Replies: {f.replies}</span>
                  <span>Status: <strong style={{ textTransform: "capitalize" }}>{f.status}</strong></span>
                </div>
              </div>

              <div style={{ display: "flex", gap: "8px", alignSelf: "center" }}>
                {f.status !== "resolved" && (
                  <button
                    onClick={() => handleModerate(f.id, "resolved")}
                    style={{
                      padding: "8px 14px", backgroundColor: "var(--color-emerald-glow)", color: "var(--color-emerald)",
                      border: "none", borderRadius: "6px", fontWeight: 700, fontSize: "12px", cursor: "pointer"
                    }}
                  >
                    Approve
                  </button>
                )}
                {f.status !== "rejected" && (
                  <button
                    onClick={() => handleModerate(f.id, "rejected")}
                    style={{
                      padding: "8px 14px", backgroundColor: "var(--color-rose-glow)", color: "var(--color-rose)",
                      border: "none", borderRadius: "6px", fontWeight: 700, fontSize: "12px", cursor: "pointer"
                    }}
                  >
                    Reject
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
