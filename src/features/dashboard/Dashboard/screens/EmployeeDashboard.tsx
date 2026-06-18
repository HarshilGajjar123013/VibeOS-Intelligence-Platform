import React, { useState } from "react";
import {
  FileText,
  Award,
  Activity,
  Heart,
  BookOpen,
  Send,
  Sparkles,
  ChevronRight,
  ThumbsUp,
  User,
  CheckCircle,
  Plus
} from "lucide-react";
import { mockRoleMetrics, mockSurveys, mockRecognitions, Recognition } from "@/src/features/dashboard/Dashboard/utils/mockData";

export default function EmployeeDashboard() {
  const metrics = mockRoleMetrics.employee;

  // State for wellbeing feedback
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  
  // State for dynamic points and completed count
  const [myPoints, setMyPoints] = useState(metrics.myPoints);
  const [surveysCompletedCount, setSurveysCompletedCount] = useState(metrics.surveysCompleted);
  
  // State for survey lists
  const [activeSurveys, setActiveSurveys] = useState(
    mockSurveys.filter((s) => s.status === "active").map(s => ({ ...s, completed: false }))
  );
  const [takingSurveyId, setTakingSurveyId] = useState<string | null>(null);
  const [surveyAnswer, setSurveyAnswer] = useState<number | null>(null);

  // State for Kudos list
  const [kudosList, setKudosList] = useState<Recognition[]>(mockRecognitions);
  
  // State for Kudos form
  const [kudosTo, setKudosTo] = useState("");
  const [kudosMsg, setKudosMsg] = useState("");
  const [kudosBadge, setKudosBadge] = useState<"teamwork" | "innovation" | "leadership" | "customer-first" | "grit">("teamwork");
  const [showKudosForm, setShowKudosForm] = useState(false);

  // State for toast alerts
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" } | null>(null);

  const triggerToast = (message: string, type: "success" | "info" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    setMyPoints(prev => prev + 10);
    triggerToast("Wellbeing check-in saved! +10 culture points earned.");
  };

  const handleLikeKudos = (id: string) => {
    setKudosList(prev =>
      prev.map(item => {
        if (item.id === id) {
          const hasLiked = (item as any).likedByUser;
          const updatedReactions = [...item.reactions];
          // Look for heart or like reactions
          let heartReaction = updatedReactions.find(r => r.type === "❤️" || r.type === "🙌");
          if (heartReaction) {
            heartReaction.count = hasLiked ? heartReaction.count - 1 : heartReaction.count + 1;
          } else {
            updatedReactions.push({ type: "❤️", count: 1 });
          }
          return {
            ...item,
            reactions: updatedReactions,
            likedByUser: !hasLiked
          } as any;
        }
        return item;
      })
    );
  };

  const startSurvey = (id: string) => {
    setTakingSurveyId(id);
    setSurveyAnswer(null);
  };

  const submitSurvey = (id: string) => {
    setActiveSurveys(prev =>
      prev.map(s => s.id === id ? { ...s, completed: true } : s)
    );
    setTakingSurveyId(null);
    setSurveysCompletedCount(prev => prev + 1);
    setMyPoints(prev => prev + 50);
    triggerToast("Survey submitted successfully! +50 culture points added.", "success");
  };

  const handleSendKudos = (e: React.FormEvent) => {
    e.preventDefault();
    if (!kudosTo.trim() || !kudosMsg.trim()) {
      triggerToast("Please fill out both recipient and message fields.", "info");
      return;
    }

    const newKudos: Recognition = {
      id: `kudos-${Date.now()}`,
      from: "Alex (You)",
      fromAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      to: kudosTo,
      toAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      badge: kudosBadge,
      message: kudosMsg,
      date: "Just now",
      reactions: [
        { type: "❤️", count: 1 }
      ],
      commentsCount: 0
    };

    setKudosList(prev => [newKudos, ...prev]);
    setMyPoints(prev => prev + 25);
    setKudosTo("");
    setKudosMsg("");
    setShowKudosForm(false);
    triggerToast(`Kudos shared with ${kudosTo}! +25 culture points.`, "success");
  };

  const currentPendingCount = activeSurveys.filter(s => !s.completed).length;

  return (
    <div className="employee-dashboard v-animate-slide-up" style={{ position: "relative" }}>
      {/* Toast Notification */}
      {toast && (
        <div 
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            background: "rgba(15, 23, 42, 0.95)",
            color: "#fff",
            padding: "12px 20px",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--color-indigo)",
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            zIndex: 1000,
            animation: "pulse 2s infinite"
          }}
        >
          <Sparkles size={16} className="text-amber-400" />
          <span style={{ fontSize: "13px", fontWeight: 600 }}>{toast.message}</span>
        </div>
      )}

      {/* Hero Welcome Banner */}
      <div 
        className="executive-dashboard__header"
        style={{
          background: "linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.05) 100%)",
          borderRadius: "var(--radius-lg)",
          padding: "28px",
          border: "1px solid rgba(99, 102, 241, 0.2)",
          marginBottom: "24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px"
        }}
      >
        <div>
          <h2 className="executive-dashboard__title" style={{ fontSize: "24px", fontWeight: 800, margin: 0 }}>
            Welcome back, Alex! 👋
          </h2>
          <p className="executive-dashboard__subtitle" style={{ margin: "6px 0 0 0", color: "var(--text-secondary)", fontSize: "14px" }}>
            Here is your workspace hub for survey inputs, peer appreciation, and growth learning.
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", backgroundColor: "var(--bg-card)", padding: "10px 16px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)" }}>
          <Sparkles size={16} className="text-amber-500" />
          <span style={{ fontSize: "13px", fontWeight: 700 }}>Level 4 Collaborator</span>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="executive-dashboard__grid-metrics" style={{ marginBottom: "24px" }}>
        <div className="dashboard-metric-card" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", padding: "20px", borderRadius: "var(--radius-lg)" }}>
          <div className="dashboard-metric-card__header" style={{ display: "flex", justifyContent: "space-between" }}>
            <span className="dashboard-metric-card__label" style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>Active Surveys</span>
            <div className="dashboard-metric-card__icon" style={{ color: "var(--color-indigo)" }}><FileText size={16} /></div>
          </div>
          <div className="dashboard-metric-card__row" style={{ margin: "10px 0", display: "flex", alignItems: "baseline", gap: "8px" }}>
            <span className="dashboard-metric-card__value" style={{ fontSize: "28px", fontWeight: 800 }}>{currentPendingCount}</span>
            <span className={`dashboard-metric-card__trend ${currentPendingCount > 0 ? "trend-warning" : "trend-success"}`} style={{ fontSize: "11px", fontWeight: 700 }}>
              {currentPendingCount > 0 ? "Action Needed" : "All Caught Up"}
            </span>
          </div>
          <span className="dashboard-metric-card__desc" style={{ fontSize: "12px", color: "var(--text-muted)" }}>
            {surveysCompletedCount} of {metrics.surveysTotal} completed this quarter
          </span>
        </div>

        <div className="dashboard-metric-card" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", padding: "20px", borderRadius: "var(--radius-lg)" }}>
          <div className="dashboard-metric-card__header" style={{ display: "flex", justifyContent: "space-between" }}>
            <span className="dashboard-metric-card__label" style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>Kudos Received</span>
            <div className="dashboard-metric-card__icon" style={{ color: "var(--color-teal)" }}><Award size={16} /></div>
          </div>
          <div className="dashboard-metric-card__row" style={{ margin: "10px 0", display: "flex", alignItems: "baseline", gap: "8px" }}>
            <span className="dashboard-metric-card__value" style={{ fontSize: "28px", fontWeight: 800 }}>{metrics.recognitionReceived}</span>
            <span className="dashboard-metric-card__trend trend-up" style={{ fontSize: "11px", fontWeight: 700 }}>▲ +2 this week</span>
          </div>
          <span className="dashboard-metric-card__desc" style={{ fontSize: "12px", color: "var(--text-muted)" }}>Accrued from peers & leaders</span>
        </div>

        <div className="dashboard-metric-card" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", padding: "20px", borderRadius: "var(--radius-lg)" }}>
          <div className="dashboard-metric-card__header" style={{ display: "flex", justifyContent: "space-between" }}>
            <span className="dashboard-metric-card__label" style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>My Culture Points</span>
            <div className="dashboard-metric-card__icon" style={{ color: "var(--color-amber)" }}><Sparkles size={16} /></div>
          </div>
          <div className="dashboard-metric-card__row" style={{ margin: "10px 0", display: "flex", alignItems: "baseline", gap: "8px" }}>
            <span className="dashboard-metric-card__value" style={{ fontSize: "28px", fontWeight: 800 }}>{myPoints}</span>
            <span className="dashboard-metric-card__trend trend-up" style={{ fontSize: "11px", fontWeight: 700, color: "var(--color-amber)" }}>Redeemable</span>
          </div>
          <span className="dashboard-metric-card__desc" style={{ fontSize: "12px", color: "var(--text-muted)" }}>Earned through dashboard activity</span>
        </div>

        <div className="dashboard-metric-card" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", padding: "20px", borderRadius: "var(--radius-lg)" }}>
          <div className="dashboard-metric-card__header" style={{ display: "flex", justifyContent: "space-between" }}>
            <span className="dashboard-metric-card__label" style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>Wellbeing Index</span>
            <div className="dashboard-metric-card__icon" style={{ color: "var(--color-rose)" }}><Heart size={16} /></div>
          </div>
          <div className="dashboard-metric-card__row" style={{ margin: "10px 0", display: "flex", alignItems: "baseline", gap: "8px" }}>
            <span className="dashboard-metric-card__value" style={{ fontSize: "28px", fontWeight: 800 }}>
              {selectedMood ? "Logged" : metrics.wellbeingScore}
            </span>
            <span className="dashboard-metric-card__trend trend-up" style={{ fontSize: "11px", fontWeight: 700 }}>
              {selectedMood ? "Updated" : "Healthy"}
            </span>
          </div>
          <span className="dashboard-metric-card__desc" style={{ fontSize: "12px", color: "var(--text-muted)" }}>
            {selectedMood ? `Mood: ${selectedMood}` : "Based on daily check-ins"}
          </span>
        </div>
      </div>

      <div className="employee-dashboard__grid" style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "24px", marginBottom: "24px" }}>
        {/* Active surveys list */}
        <div className="dashboard-card" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", padding: "24px", borderRadius: "var(--radius-lg)" }}>
          <div className="dashboard-card__header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h3 className="dashboard-card__title" style={{ fontSize: "16px", fontWeight: 700, display: "flex", alignItems: "center", gap: "8px" }}>
              <FileText size={16} className="text-indigo-500" />
              Surveys Waiting For Input
            </h3>
            <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-muted)" }}>
              {activeSurveys.filter(s => !s.completed).length} pending
            </span>
          </div>
          
          <div className="dashboard-card__body" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {activeSurveys.map((survey) => (
              <div 
                key={survey.id} 
                className="survey-item-card" 
                style={{
                  padding: "16px",
                  border: "1px solid var(--border-color)",
                  borderRadius: "var(--radius-md)",
                  backgroundColor: survey.completed ? "rgba(16, 185, 129, 0.04)" : "var(--bg-main)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  transition: "var(--v-transition)"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <h4 style={{ margin: 0, fontSize: "14px", fontWeight: 700, color: "var(--text-primary)" }}>{survey.title}</h4>
                    <p style={{ margin: "4px 0 0 0", fontSize: "12px", color: "var(--text-muted)" }}>
                      Due: {survey.dueDate} • {survey.questionsCount} questions • Category: <strong style={{ color: "var(--color-indigo)" }}>{survey.category}</strong>
                    </p>
                  </div>
                  {survey.completed ? (
                    <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", fontWeight: 700, color: "var(--color-teal)" }}>
                      <CheckCircle size={14} /> Completed
                    </span>
                  ) : takingSurveyId === survey.id ? (
                    <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--color-indigo)", animation: "pulse 2s infinite" }}>Answering...</span>
                  ) : (
                    <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--color-amber)", backgroundColor: "rgba(245, 158, 11, 0.1)", padding: "2px 8px", borderRadius: "10px" }}>Active</span>
                  )}
                </div>

                {/* Survey Interactive Section */}
                {takingSurveyId === survey.id && !survey.completed && (
                  <div style={{ padding: "12px", background: "var(--bg-card)", borderRadius: "var(--radius-sm)", border: "1px solid var(--color-indigo-glow)" }}>
                    <p style={{ margin: "0 0 10px 0", fontSize: "13px", fontWeight: 600 }}>
                      Rate your level of satisfaction with current workload and tools:
                    </p>
                    <div style={{ display: "flex", gap: "8px", justifyContent: "space-between", marginBottom: "12px" }}>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(val => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setSurveyAnswer(val)}
                          style={{
                            flex: 1,
                            padding: "8px 0",
                            borderRadius: "var(--radius-sm)",
                            border: `1px solid ${surveyAnswer === val ? "var(--color-indigo)" : "var(--border-color)"}`,
                            backgroundColor: surveyAnswer === val ? "var(--color-indigo-glow)" : "transparent",
                            color: surveyAnswer === val ? "var(--color-indigo)" : "var(--text-primary)",
                            fontSize: "12px",
                            fontWeight: 700,
                            cursor: "pointer",
                            transition: "all 0.15s ease"
                          }}
                        >
                          {val}
                        </button>
                      ))}
                    </div>
                    <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                      <button 
                        onClick={() => setTakingSurveyId(null)}
                        style={{ padding: "6px 12px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)", background: "transparent", fontSize: "12px", cursor: "pointer" }}
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={() => submitSurvey(survey.id)}
                        disabled={surveyAnswer === null}
                        style={{
                          padding: "6px 14px",
                          borderRadius: "var(--radius-sm)",
                          border: "none",
                          background: "var(--color-indigo)",
                          color: "#fff",
                          fontSize: "12px",
                          fontWeight: 700,
                          cursor: surveyAnswer === null ? "not-allowed" : "pointer",
                          opacity: surveyAnswer === null ? 0.5 : 1
                        }}
                      >
                        Submit Answer
                      </button>
                    </div>
                  </div>
                )}

                {!survey.completed && takingSurveyId !== survey.id && (
                  <button 
                    onClick={() => startSurvey(survey.id)}
                    className="survey-item-card__btn"
                    style={{
                      alignSelf: "flex-start",
                      padding: "8px 16px",
                      borderRadius: "var(--radius-sm)",
                      border: "none",
                      backgroundColor: "var(--color-indigo)",
                      color: "#fff",
                      fontSize: "12px",
                      fontWeight: 700,
                      cursor: "pointer",
                      transition: "var(--v-transition)"
                    }}
                  >
                    Take Survey
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Daily wellbeing mood checkin */}
        <div className="dashboard-card" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", padding: "24px", borderRadius: "var(--radius-lg)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div className="dashboard-card__header" style={{ marginBottom: "16px" }}>
            <h3 className="dashboard-card__title" style={{ fontSize: "16px", fontWeight: 700, display: "flex", alignItems: "center", gap: "8px" }}>
              <Heart size={16} className="text-rose-500" />
              How are you feeling today?
            </h3>
          </div>
          <div className="dashboard-card__body" style={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            {selectedMood ? (
              <div 
                style={{
                  textAlign: "center",
                  padding: "20px",
                  borderRadius: "var(--radius-md)",
                  background: "rgba(16, 185, 129, 0.05)",
                  border: "1px solid rgba(16, 185, 129, 0.2)",
                  animation: "scaleIn 0.3s ease-out"
                }}
              >
                <span style={{ fontSize: "40px", display: "block", marginBottom: "10px" }}>
                  {selectedMood === "Great" && "🤩"}
                  {selectedMood === "Good" && "😊"}
                  {selectedMood === "Okay" && "😐"}
                  {selectedMood === "Stressed" && "😟"}
                  {selectedMood === "Overwhelmed" && "🥵"}
                </span>
                <h4 style={{ margin: "0 0 6px 0", color: "var(--color-teal)", fontSize: "14px", fontWeight: 700 }}>Response Logged!</h4>
                <p style={{ margin: 0, fontSize: "12px", color: "var(--text-secondary)", lineHeight: 1.4 }}>
                  You logged that you are feeling <strong>{selectedMood.toLowerCase()}</strong> today. Thank you for contributing to your team's pulse!
                </p>
                <button
                  onClick={() => setSelectedMood(null)}
                  style={{
                    marginTop: "12px",
                    background: "none",
                    border: "none",
                    color: "var(--color-indigo)",
                    fontSize: "11px",
                    fontWeight: 700,
                    textDecoration: "underline",
                    cursor: "pointer"
                  }}
                >
                  Change mood entry
                </button>
              </div>
            ) : (
              <div className="wellbeing-panel" style={{ display: "flex", justifyContent: "space-between", gap: "8px" }}>
                {[
                  { mood: "Great", emoji: "🤩" },
                  { mood: "Good", emoji: "😊" },
                  { mood: "Okay", emoji: "😐" },
                  { mood: "Stressed", emoji: "😟" },
                  { mood: "Overwhelmed", emoji: "🥵" }
                ].map((m) => (
                  <button 
                    key={m.mood}
                    onClick={() => handleMoodSelect(m.mood)}
                    className="wellbeing-panel__btn"
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "6px",
                      padding: "12px 6px",
                      border: "1px solid var(--border-color)",
                      borderRadius: "var(--radius-md)",
                      backgroundColor: "var(--bg-main)",
                      cursor: "pointer",
                      transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
                    }}
                  >
                    <span className="emoji" style={{ fontSize: "22px", transition: "transform 0.2s" }}>{m.emoji}</span>
                    <span className="lbl" style={{ fontSize: "11px", fontWeight: 600, color: "var(--text-secondary)" }}>{m.mood}</span>
                  </button>
                ))}
              </div>
            )}
            <p style={{ marginTop: "16px", fontSize: "11px", color: "var(--text-muted)", textAlign: "center", fontWeight: "600", lineHeight: 1.4 }}>
              Your response is anonymized and used only for aggregated team indices.
            </p>
          </div>
        </div>
      </div>

      <div className="employee-dashboard__grid" style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "24px" }}>
        {/* Recent Kudos Wall */}
        <div className="dashboard-card" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", padding: "24px", borderRadius: "var(--radius-lg)" }}>
          <div className="dashboard-card__header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h3 className="dashboard-card__title" style={{ fontSize: "16px", fontWeight: 700, display: "flex", alignItems: "center", gap: "8px" }}>
              <Award size={16} className="text-indigo-500" />
              Kudos Shared With Me & Peers
            </h3>
            <button 
              onClick={() => setShowKudosForm(!showKudosForm)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                background: showKudosForm ? "var(--bg-main)" : "var(--color-indigo)",
                color: showKudosForm ? "var(--text-primary)" : "#fff",
                border: showKudosForm ? "1px solid var(--border-color)" : "none",
                padding: "6px 12px",
                borderRadius: "var(--radius-sm)",
                fontSize: "12px",
                fontWeight: 700,
                cursor: "pointer",
                transition: "var(--v-transition)"
              }}
            >
              {showKudosForm ? "Cancel" : <><Plus size={14} /> Send Kudos</>}
            </button>
          </div>

          <div className="dashboard-card__body">
            {/* Share Kudos Form */}
            {showKudosForm && (
              <form 
                onSubmit={handleSendKudos} 
                className="v-animate-slide-up"
                style={{
                  padding: "16px",
                  border: "1px solid var(--color-indigo-glow)",
                  borderRadius: "var(--radius-md)",
                  backgroundColor: "rgba(99, 102, 241, 0.02)",
                  marginBottom: "20px"
                }}
              >
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "4px" }}>To Colleague</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Marcus Sterling" 
                      value={kudosTo}
                      onChange={(e) => setKudosTo(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        border: "1px solid var(--border-color)",
                        borderRadius: "var(--radius-sm)",
                        background: "var(--bg-main)",
                        color: "var(--text-primary)",
                        fontSize: "13px"
                      }}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "4px" }}>Award Badge</label>
                    <select 
                      value={kudosBadge}
                      onChange={(e) => setKudosBadge(e.target.value as any)}
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        border: "1px solid var(--border-color)",
                        borderRadius: "var(--radius-sm)",
                        background: "var(--bg-main)",
                        color: "var(--text-primary)",
                        fontSize: "13px"
                      }}
                    >
                      <option value="teamwork">🤝 Teamwork</option>
                      <option value="innovation">🚀 Innovation</option>
                      <option value="leadership">👑 Leadership</option>
                      <option value="customer-first">💎 Customer-First</option>
                      <option value="grit">🔥 Grit & Drive</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: "12px" }}>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "4px" }}>Appreciation Message</label>
                  <textarea 
                    placeholder="Write a specific, encouraging note about what they did..."
                    rows={3}
                    value={kudosMsg}
                    onChange={(e) => setKudosMsg(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      border: "1px solid var(--border-color)",
                      borderRadius: "var(--radius-sm)",
                      background: "var(--bg-main)",
                      color: "var(--text-primary)",
                      fontSize: "13px",
                      resize: "none"
                    }}
                    required
                  />
                </div>

                <button 
                  type="submit" 
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    border: "none",
                    background: "var(--color-indigo)",
                    color: "#fff",
                    padding: "8px 16px",
                    borderRadius: "var(--radius-sm)",
                    fontSize: "12px",
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "var(--v-transition)"
                  }}
                >
                  <Send size={14} /> Post Appreciation (+25 pts)
                </button>
              </form>
            )}

            {/* Kudos List Feed */}
            <div className="recognition-module__wall" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {kudosList.map((rec: Recognition) => {
                const isLiked = (rec as any).likedByUser;
                return (
                  <div 
                    key={rec.id} 
                    className="recognition-module__item" 
                    style={{ 
                      padding: "16px", 
                      borderRadius: "var(--radius-md)", 
                      border: "1px solid var(--border-color)", 
                      background: "var(--bg-main)",
                      display: "flex",
                      gap: "12px",
                      transition: "transform 0.2s"
                    }}
                  >
                    <div className="avatar-col" style={{ flexShrink: 0 }}>
                      <div className="bm-sidebar__avatar" style={{ width: "40px", height: "40px", borderRadius: "50%", overflow: "hidden", border: "2px solid var(--border-color)" }}>
                        <img src={rec.fromAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"} alt="Avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                    </div>
                    <div className="content-col" style={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
                      <div className="kudos-meta" style={{ fontSize: "12px", color: "var(--text-secondary)", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "4px" }}>
                        <strong style={{ color: "var(--text-primary)" }}>{rec.from}</strong>
                        <span className="connector" style={{ color: "var(--text-muted)" }}>recognized</span>
                        <strong style={{ color: "var(--text-primary)" }}>{rec.to}</strong>
                        <span style={{ marginLeft: "auto", fontSize: "10px", color: "var(--text-muted)" }}>{rec.date}</span>
                      </div>
                      <div className="message-text" style={{ fontSize: "13px", color: "var(--text-primary)", lineHeight: 1.5 }}>
                        {rec.message}
                      </div>
                      <div className="reactions-row" style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                        <span className="badge" style={{ backgroundColor: "rgba(99, 102, 241, 0.1)", color: "var(--color-indigo)", fontSize: "10px", fontWeight: 700, padding: "2px 8px", borderRadius: "10px", textTransform: "uppercase" }}>
                          {rec.badge}
                        </span>
                        
                        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "10px" }}>
                          {rec.reactions && rec.reactions.map((r, idx) => (
                            <span key={idx} style={{ fontSize: "12px", cursor: "default" }}>
                              {r.type} <span style={{ fontWeight: 600, color: "var(--text-secondary)" }}>{r.count}</span>
                            </span>
                          ))}
                          <button
                            onClick={() => handleLikeKudos(rec.id)}
                            style={{
                              border: "1px solid var(--border-color)",
                              background: isLiked ? "rgba(239, 68, 68, 0.1)" : "transparent",
                              color: isLiked ? "var(--color-rose)" : "var(--text-secondary)",
                              padding: "4px 8px",
                              borderRadius: "4px",
                              fontSize: "11px",
                              fontWeight: 600,
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                              transition: "all 0.15s ease"
                            }}
                          >
                            <ThumbsUp size={12} />
                            {isLiked ? "Liked" : "Like"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Growth Recommendations */}
        <div className="dashboard-card" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", padding: "24px", borderRadius: "var(--radius-lg)", display: "flex", flexDirection: "column" }}>
          <div className="dashboard-card__header" style={{ marginBottom: "20px" }}>
            <h3 className="dashboard-card__title" style={{ fontSize: "16px", fontWeight: 700, display: "flex", alignItems: "center", gap: "8px" }}>
              <BookOpen size={16} className="text-indigo-500" />
              Growth & Learning Hub
            </h3>
          </div>
          <div className="dashboard-card__body" style={{ display: "flex", flexDirection: "column", gap: "16px", flexGrow: 1 }}>
            {[
              { title: "Stress Management in Fast Paced Teams", duration: "15-min reading module", level: "Beginner", points: "50 pts" },
              { title: "Collaborative Decision Making", duration: "30-min interactive course", level: "Intermediate", points: "100 pts" },
              { title: "Giving Constructive Feedback Upward", duration: "10-min read", level: "Advanced", points: "30 pts" }
            ].map((course, idx) => (
              <div 
                key={idx}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "14px",
                  border: "1px solid var(--border-color)",
                  borderRadius: "var(--radius-md)",
                  backgroundColor: "var(--bg-main)",
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
                className="dashboard-metric-card"
              >
                <div>
                  <div style={{ fontWeight: "700", fontSize: "13px", color: "var(--text-primary)" }}>{course.title}</div>
                  <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "4px", display: "flex", gap: "8px" }}>
                    <span>{course.duration}</span>
                    <span>•</span>
                    <span>{course.level}</span>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--color-indigo)", backgroundColor: "rgba(99, 102, 241, 0.08)", padding: "2px 6px", borderRadius: "4px" }}>
                    {course.points}
                  </span>
                  <ChevronRight size={16} className="text-muted" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
