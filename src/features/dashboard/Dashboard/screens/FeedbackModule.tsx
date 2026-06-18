import React, { useState } from "react";
import {
  MessageSquare,
  Sparkles,
  Search,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Flag,
  Send,
  X,
  FileBarChart
} from "lucide-react";
import { mockFeedback, Feedback } from "../utils/mockData";

export default function FeedbackModule() {
  const [feedbackItems, setFeedbackItems] = useState<Feedback[]>(mockFeedback);
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  // Reply text states indexed by feedback id
  const [replyText, setReplyText] = useState<Record<string, string>>({});
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  
  // Theme report modal
  const [showThemeReport, setShowThemeReport] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleStatusChange = (id: string, newStatus: Feedback["status"]) => {
    setFeedbackItems(prev =>
      prev.map(item => item.id === id ? { ...item, status: newStatus } : item)
    );
    showToast(`Status updated to ${newStatus.toUpperCase()}`);
  };

  const handleFlagContent = (id: string) => {
    setFeedbackItems(prev => prev.filter(item => item.id !== id));
    showToast("Feedback post escalated to Content Review Audit.");
  };

  const submitReply = (id: string) => {
    const text = replyText[id];
    if (!text || !text.trim()) return;

    setFeedbackItems(prev =>
      prev.map(item => {
        if (item.id === id) {
          return {
            ...item,
            status: "replied" as const,
            aiSummary: `Reply posted: "${text}" | Original AI Summary: ${item.aiSummary}`
          };
        }
        return item;
      })
    );
    setReplyText(prev => ({ ...prev, [id]: "" }));
    setActiveReplyId(null);
    showToast("Reply sent to anonymous feed successfully!");
  };

  const filteredFeedback = feedbackItems.filter((item) => {
    const matchCat = filterCategory === "all" || item.category === filterCategory;
    const matchPrior = filterPriority === "all" || item.priority === filterPriority;
    const matchStatus = filterStatus === "all" 
      || (filterStatus === "resolved" && item.status === "resolved")
      || (filterStatus === "open" && item.status !== "resolved");
    return matchCat && matchPrior && matchStatus;
  });

  return (
    <div className="feedback-module v-animate-slide-up" style={{ position: "relative" }}>
      {/* Toast Alert */}
      {toastMessage && (
        <div 
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            background: "rgba(15, 23, 42, 0.95)",
            color: "#fff",
            padding: "10px 16px",
            borderRadius: "var(--radius-sm)",
            border: "1px solid var(--color-indigo)",
            boxShadow: "var(--shadow-md)",
            zIndex: 1100,
            fontSize: "12px",
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}
        >
          <Sparkles size={14} className="text-amber-400" />
          {toastMessage}
        </div>
      )}

      {/* AI Theme Report Modal */}
      {showThemeReport && (
        <div 
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(15, 23, 42, 0.6)",
            backdropFilter: "blur(8px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1200,
            padding: "20px"
          }}
        >
          <div 
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-color)",
              borderRadius: "var(--radius-lg)",
              width: "100%",
              maxWidth: "550px",
              padding: "24px",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              animation: "scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border-color)", paddingBottom: "12px", marginBottom: "16px" }}>
              <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 800, display: "flex", alignItems: "center", gap: "8px" }}>
                <Sparkles size={16} className="text-indigo-500" />
                VibeAI Theme Synthesis Report
              </h3>
              <button 
                onClick={() => setShowThemeReport(false)}
                style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--text-secondary)" }}
              >
                <X size={18} />
              </button>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.5 }}>
              <div>
                <strong style={{ color: "var(--text-primary)" }}>Theme 1: Engineering Capacity & Burnout (High Risk)</strong>
                <p style={{ margin: "4px 0 0 0" }}>Occurs in 42% of Engineering posts. Key triggers: Q3 commitments, lack of replacement hires, 60+ hour work weeks.</p>
              </div>
              <div>
                <strong style={{ color: "var(--text-primary)" }}>Theme 2: Compensation Transparency (Medium Risk)</strong>
                <p style={{ margin: "4px 0 0 0" }}>Occurs in 28% of Sales & Support posts. Focus: Cost-of-living salary adjustment schedules, market competitiveness.</p>
              </div>
              <div>
                <strong style={{ color: "var(--text-primary)" }}>Theme 3: Peer Recognition Acceptance (High Health)</strong>
                <p style={{ margin: "4px 0 0 0" }}>Occurs in 94% of culture posts. Core feedback indicates high positive sentiment for peer-to-peer slack integration.</p>
              </div>
              <div style={{ background: "var(--bg-main)", padding: "12px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", marginTop: "8px" }}>
                <span style={{ fontSize: "11px", fontWeight: 800, color: "var(--color-indigo)", textTransform: "uppercase" }}>AI Recommendations</span>
                <ul style={{ margin: "6px 0 0 0", paddingLeft: "20px" }}>
                  <li>Initiate workload audit for Engineering department.</li>
                  <li>Schedule a town hall to discuss Q3 compensation brackets.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="executive-dashboard__header" style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "16px", marginBottom: "20px" }}>
        <div>
          <h2 className="executive-dashboard__title" style={{ fontSize: "24px", fontWeight: 800 }}>Anonymous Feedback Center</h2>
          <p className="executive-dashboard__subtitle" style={{ color: "var(--text-secondary)" }}>Moderate incoming suggestion feeds, publish administrative replies, and track resolution indices.</p>
        </div>
        <button 
          className="executive-dashboard__action-btn"
          onClick={() => setShowThemeReport(true)}
          style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}
        >
          <FileBarChart size={14} /> Theme Synthesis Report
        </button>
      </div>

      {/* AI Comment Summaries Aggregator Panel */}
      <div 
        className="feedback-module__ai-summary"
        style={{
          background: "linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(168, 85, 247, 0.02) 100%)",
          border: "1px solid rgba(99, 102, 241, 0.15)",
          borderRadius: "var(--radius-lg)",
          padding: "20px",
          display: "flex",
          gap: "16px",
          marginBottom: "24px"
        }}
      >
        <div style={{ fontSize: "28px" }}>🧠</div>
        <div>
          <h4 style={{ margin: "0 0 4px 0", fontSize: "14px", fontWeight: 800, color: "var(--color-indigo)" }}>VibeAI Culture Synthesis</h4>
          <p style={{ margin: 0, fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.5 }}>
            The primary workforce concerns this cycle relate to <strong>Engineering sprint capacity limitations</strong> and <strong>Sales compensation schedules</strong>. Peer appreciation channels continue to show highly positive sentiment trends (+12% MoM).
          </p>
        </div>
      </div>

      {/* Filters Row */}
      <div className="analytics-module__filters" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "16px", marginBottom: "24px" }}>
        <div className="analytics-module__filter-item" style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <label style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>Category</label>
          <select 
            value={filterCategory} 
            onChange={(e) => setFilterCategory(e.target.value)}
            style={{ padding: "10px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", background: "var(--bg-card)", color: "var(--text-primary)" }}
          >
            <option value="all">All Categories</option>
            <option value="workload">Workload & Burnout</option>
            <option value="culture">Company Culture</option>
            <option value="management">Management Support</option>
            <option value="tools">Workplace Tools</option>
            <option value="compensation">Compensation</option>
          </select>
        </div>

        <div className="analytics-module__filter-item" style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <label style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>Priority</label>
          <select 
            value={filterPriority} 
            onChange={(e) => setFilterPriority(e.target.value)}
            style={{ padding: "10px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", background: "var(--bg-card)", color: "var(--text-primary)" }}
          >
            <option value="all">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
        </div>

        <div className="analytics-module__filter-item" style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <label style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>Status</label>
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{ padding: "10px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", background: "var(--bg-card)", color: "var(--text-primary)" }}
          >
            <option value="all">All Statuses</option>
            <option value="open">Open & Reviewing</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>

      {/* Feedback Feed */}
      <div className="feedback-module__feed" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {filteredFeedback.length === 0 ? (
          <div className="dashboard-card" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", padding: "48px", borderRadius: "var(--radius-lg)", textAlign: "center" }}>
            <span style={{ fontSize: "36px", display: "block", marginBottom: "12px" }}>📭</span>
            <h3 style={{ margin: "0 0 6px 0", fontSize: "16px", fontWeight: 800 }}>No feedback entries matching filters</h3>
            <p style={{ margin: 0, fontSize: "12px", color: "var(--text-muted)" }}>Try clearing or adjusting parameters to inspect other employee comments.</p>
          </div>
        ) : (
          filteredFeedback.map((item) => (
            <div 
              key={item.id} 
              className="feedback-module__item"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-color)",
                borderRadius: "var(--radius-lg)",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                boxShadow: "var(--shadow-sm)",
                transition: "var(--v-transition)"
              }}
            >
              <div className="header-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
                <div className="tags" style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                  <span 
                    style={{
                      fontSize: "10px",
                      fontWeight: 800,
                      padding: "2px 8px",
                      borderRadius: "10px",
                      textTransform: "uppercase",
                      backgroundColor: item.priority === "high" ? "rgba(239, 68, 68, 0.1)" : item.priority === "medium" ? "rgba(245, 158, 11, 0.1)" : "rgba(99, 102, 241, 0.1)",
                      color: item.priority === "high" ? "var(--color-rose)" : item.priority === "medium" ? "var(--color-amber)" : "var(--color-indigo)"
                    }}
                  >
                    {item.priority} priority
                  </span>
                  
                  <span 
                    style={{
                      fontSize: "10px",
                      fontWeight: 800,
                      padding: "2px 8px",
                      borderRadius: "10px",
                      textTransform: "uppercase",
                      backgroundColor: item.sentiment === "positive" ? "rgba(16, 185, 129, 0.1)" : item.sentiment === "negative" ? "rgba(239, 68, 68, 0.1)" : "rgba(107, 114, 128, 0.1)",
                      color: item.sentiment === "positive" ? "var(--color-emerald)" : item.sentiment === "negative" ? "var(--color-rose)" : "var(--text-secondary)"
                    }}
                  >
                    {item.sentiment}
                  </span>
                  
                  <span style={{ fontSize: "10px", fontWeight: 700, padding: "2px 8px", borderRadius: "10px", backgroundColor: "var(--bg-main)", color: "var(--text-secondary)", textTransform: "capitalize" }}>
                    {item.category}
                  </span>

                  <span 
                    style={{
                      fontSize: "10px",
                      fontWeight: 800,
                      padding: "2px 8px",
                      borderRadius: "10px",
                      textTransform: "uppercase",
                      backgroundColor: item.status === "resolved" ? "rgba(16, 185, 129, 0.15)" : item.status === "replied" ? "rgba(99, 102, 241, 0.15)" : "transparent",
                      color: item.status === "resolved" ? "var(--color-emerald)" : item.status === "replied" ? "var(--color-indigo)" : "var(--text-muted)"
                    }}
                  >
                    {item.status}
                  </span>
                </div>
                
                <div style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: "600" }}>
                  {item.date} • {item.department}
                </div>
              </div>

              <div className="content-text" style={{ fontSize: "14px", fontStyle: "italic", color: "var(--text-primary)", lineHeight: 1.5 }}>
                "{item.content}"
              </div>

              {/* AI synthesis summary */}
              <div 
                className="ai-bubble"
                style={{
                  background: "var(--bg-main)",
                  borderLeft: "3px solid var(--color-indigo)",
                  padding: "12px 16px",
                  borderRadius: "0 var(--radius-sm) var(--radius-sm) 0"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: "800", color: "var(--color-indigo)", marginBottom: "4px", fontSize: "11px" }}>
                  <Sparkles size={12} />
                  <span>VibeAI Synthesis & Log</span>
                </div>
                <span style={{ fontSize: "12.5px", color: "var(--text-secondary)", lineHeight: 1.4 }}>{item.aiSummary}</span>
              </div>

              {/* Action Buttons Panel */}
              <div className="actions" style={{ display: "flex", gap: "8px", flexWrap: "wrap", borderTop: "1px solid var(--border-color)", paddingTop: "14px" }}>
                {item.status !== "reviewing" && item.status !== "resolved" && (
                  <button 
                    className="bm-top-nav__workspace-select" 
                    style={{ fontSize: "11.5px", padding: "6px 12px", cursor: "pointer" }} 
                    onClick={() => handleStatusChange(item.id, "reviewing")}
                  >
                    👁️ Review
                  </button>
                )}
                
                <button 
                  className="bm-top-nav__workspace-select" 
                  style={{ fontSize: "11.5px", padding: "6px 12px", cursor: "pointer", background: activeReplyId === item.id ? "var(--bg-input)" : "transparent" }} 
                  onClick={() => setActiveReplyId(prev => prev === item.id ? null : item.id)}
                >
                  💬 Reply
                </button>
                
                <button 
                  className="bm-top-nav__workspace-select" 
                  style={{ fontSize: "11.5px", padding: "6px 12px", cursor: "pointer", color: "var(--color-rose)" }} 
                  onClick={() => handleFlagContent(item.id)}
                >
                  <Flag size={11} style={{ marginRight: "4px" }} /> Flag Content
                </button>
                
                {item.status !== "resolved" && (
                  <button 
                    className="executive-dashboard__action-btn" 
                    style={{ fontSize: "11.5px", padding: "6px 14px", backgroundColor: "var(--color-emerald)", marginLeft: "auto", display: "flex", alignItems: "center", gap: "4px", cursor: "pointer" }} 
                    onClick={() => handleStatusChange(item.id, "resolved")}
                  >
                    <CheckCircle2 size={12} /> Resolve
                  </button>
                )}
              </div>

              {/* Reply Box expansion */}
              {activeReplyId === item.id && (
                <div 
                  className="v-animate-slide-up"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    padding: "12px",
                    border: "1px solid var(--border-color)",
                    borderRadius: "var(--radius-sm)",
                    background: "var(--bg-main)"
                  }}
                >
                  <label style={{ fontSize: "11px", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase" }}>Administrative Reply (Displayed to Feed)</label>
                  <textarea
                    placeholder="Type an encouraging or structural response to this concern..."
                    rows={2}
                    value={replyText[item.id] || ""}
                    onChange={(e) => setReplyText(prev => ({ ...prev, [item.id]: e.target.value }))}
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--border-color)",
                      background: "var(--bg-card)",
                      color: "var(--text-primary)",
                      fontSize: "12.5px",
                      resize: "none"
                    }}
                  />
                  <div style={{ display: "flex", gap: "6px", justifyContent: "flex-end" }}>
                    <button 
                      onClick={() => setActiveReplyId(null)} 
                      style={{ padding: "4px 10px", fontSize: "11px", border: "1px solid var(--border-color)", background: "transparent", cursor: "pointer" }}
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={() => submitReply(item.id)} 
                      style={{
                        padding: "4px 12px",
                        fontSize: "11px",
                        background: "var(--color-indigo)",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px"
                      }}
                    >
                      <Send size={10} /> Send Reply
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
