import React, { useState } from "react";
import {
  Users,
  TrendingUp,
  Clock,
  Compass,
  CheckSquare,
  Sparkles,
  BookOpen
} from "lucide-react";
import { mockRoleMetrics } from "../utils/mockData";

export default function ManagerDashboard() {
  const metrics = mockRoleMetrics.manager;
  
  const [tasks, setTasks] = useState([
    { id: 1, label: "Schedule Q2 reflection one-on-ones with design unit", completed: false, priority: "high" },
    { id: 2, label: "Audit engineering workload spikes on focus hours", completed: true, priority: "medium" },
    { id: 3, label: "Review Compensation adjustment feedback", completed: false, priority: "low" }
  ]);

  const handleToggle = (id: number) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div className="manager-dashboard v-animate-slide-up">
      <div className="executive-dashboard__header">
        <div>
          <h2 className="executive-dashboard__title" style={{ fontSize: "24px", fontWeight: 800 }}>Team Sentiment Operations</h2>
          <p className="executive-dashboard__subtitle" style={{ color: "var(--text-secondary)" }}>Track team health, configure local 1-on-1 agendas, and manage checklists.</p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="executive-dashboard__grid-metrics" style={{ marginTop: "24px" }}>
        {[
          { label: "Team Engagement Index", value: `${metrics.teamEngagement}/10`, icon: <TrendingUp size={16} />, desc: "Average sentiment ratings" },
          { label: "Survey Completion Rate", value: `${metrics.participation}%`, icon: <Users size={16} />, desc: "Active responses logged" },
          { label: "Scheduled 1-on-1s", value: metrics.weeklyOneOnOnes, icon: <Clock size={16} />, desc: "Scheduled for this cycle" },
          { label: "Pending Team Actions", value: tasks.filter(t => !t.completed).length, icon: <CheckSquare size={16} />, desc: "Tasks requiring review" }
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
            </div>
            <span className="dashboard-metric-card__desc" style={{ fontSize: "12px", color: "var(--text-muted)" }}>{m.desc}</span>
          </div>
        ))}
      </div>

      <div className="v-grid-2-1" style={{ marginTop: "24px" }}>
        {/* Actions Checklist */}
        <div className="dashboard-card" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-lg)", padding: "24px" }}>
          <div className="dashboard-card__header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h3 className="dashboard-card__title" style={{ fontSize: "16px", fontWeight: 700, display: "flex", alignItems: "center", gap: "8px" }}>
              <CheckSquare size={16} className="text-indigo-500" />
              Manager Checklist Tasks
            </h3>
            <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-muted)" }}>{completedCount}/{tasks.length} Done</span>
          </div>
          <div className="dashboard-card__body">
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {tasks.map(t => (
                <label
                  key={t.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "14px",
                    border: "1px solid var(--border-color)",
                    borderRadius: "var(--radius-sm)",
                    cursor: "pointer",
                    backgroundColor: t.completed ? "var(--bg-main)" : "transparent",
                    transition: "var(--v-transition)",
                    opacity: t.completed ? 0.7 : 1
                  }}
                >
                  <input
                    type="checkbox"
                    checked={t.completed}
                    onChange={() => handleToggle(t.id)}
                    style={{ accentColor: "var(--v-primary)", width: "16px", height: "16px", cursor: "pointer" }}
                  />
                  <span style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    textDecoration: t.completed ? "line-through" : "none",
                    color: t.completed ? "var(--v-text-muted)" : "var(--v-text-main)"
                  }}>
                    {t.label}
                  </span>
                  <span style={{
                    marginLeft: "auto", fontSize: "9px", fontWeight: 800, padding: "2px 6px", borderRadius: "10px",
                    backgroundColor: t.priority === "high" ? "var(--v-danger-light)" : t.priority === "medium" ? "var(--v-warning-light)" : "var(--v-primary-light)",
                    color: t.priority === "high" ? "var(--v-danger)" : t.priority === "medium" ? "var(--v-warning)" : "var(--v-primary)"
                  }}>
                    {t.priority.toUpperCase()}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* 1-on-1 Prompts */}
        <div className="dashboard-card" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-lg)", padding: "24px" }}>
          <div className="dashboard-card__header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h3 className="dashboard-card__title" style={{ fontSize: "16px", fontWeight: 700, display: "flex", alignItems: "center", gap: "8px" }}>
              <Compass size={16} className="text-indigo-500" />
              1-on-1 Dialogue Coaching
            </h3>
          </div>
          <div className="dashboard-card__body" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              { topic: "Role Clarity & Workload", text: '"If we had to postpone one priority deliverable this week to support focus blocks, what would it be?"' },
              { topic: "Team Alignment", text: '"Do you feel like leadership decisions are transparent? What can I help clarify?"' }
            ].map((p, i) => (
              <div key={i} style={{ padding: "14px", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)", backgroundColor: "var(--bg-main)" }}>
                <span style={{ fontSize: "10px", fontWeight: 800, color: "var(--v-primary)", textTransform: "uppercase" }}>{p.topic}</span>
                <p style={{ fontSize: "13px", fontStyle: "italic", margin: "6px 0 0 0", color: "var(--text-secondary)", lineHeight: 1.4 }}>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommended guides */}
      <div className="dashboard-card" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "var(--radius-lg)", padding: "24px", marginTop: "24px" }}>
        <h3 style={{ fontSize: "16px", fontWeight: 700, display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
          <BookOpen size={16} className="text-indigo-500" />
          Recommended Manager Growth Guides
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
          {[
            { title: "Mitigating Fatigue & Meeting Overload", desc: "Audit workflow bottlenecks and rebalance sprint targets.", duration: "6 min read" },
            { title: "Building Trust in Hybrid Teams", desc: "Coaching patterns to foster alignment across timezones.", duration: "4 min read" }
          ].map((g, i) => (
            <div key={i} style={{ padding: "16px", border: "1px solid var(--border-color)", borderRadius: "var(--radius-md)", backgroundColor: "var(--bg-main)", transition: "var(--v-transition)", cursor: "pointer" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "6px" }}>
                <h4 style={{ fontSize: "14px", fontWeight: 700, margin: 0, color: "var(--color-indigo)" }}>{g.title}</h4>
                <span style={{ fontSize: "10px", color: "var(--text-muted)", whiteSpace: "nowrap" }}>{g.duration}</span>
              </div>
              <p style={{ fontSize: "12px", color: "var(--text-secondary)", margin: 0, lineHeight: 1.4 }}>{g.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
