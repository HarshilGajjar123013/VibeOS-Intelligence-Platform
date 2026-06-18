import React, { useState } from "react";
import {
  FileText,
  Plus,
  Play,
  Settings,
  Trash2,
  Phone,
  Layers,
  Award,
  Sparkles,
  Save,
  Clock,
  ArrowUp,
  ArrowDown,
  Copy,
  FolderPlus,
  Eye,
  Smartphone
} from "lucide-react";
import { mockSurveys, surveyTemplates } from "../utils/mockData";

interface SurveyItem {
  id: string;
  title: string;
  category: string;
  status: "active" | "scheduled" | "closed";
  participationRate: number;
  responses: number;
  dueDate: string;
}

export default function SurveyModule() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "templates" | "builder">("dashboard");
  const [surveys, setSurveys] = useState<SurveyItem[]>(mockSurveys as any);
  
  // Builder Questions list state
  const [questions, setQuestions] = useState<any[]>([
    { id: 1, type: "rating", text: "How would you rate your workload balance this week?" },
    { id: 2, type: "nps", text: "How likely are you to recommend our company as a great place to work?" },
    { id: 3, type: "text", text: "What is the biggest blocker preventing your team from executing faster?" }
  ]);

  // Live simulator interactives
  const [simRatings, setSimRatings] = useState<Record<number, number>>({});
  const [simTexts, setSimTexts] = useState<Record<number, string>>({});
  const [simEmojis, setSimEmojis] = useState<Record<number, string>>({});

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const addQuestion = (type: string) => {
    const texts: Record<string, string> = {
      rating: "On a scale of 1-10, how aligned are you with team priorities?",
      nps: "How likely are you to recommend our workspace to peers? (0-10)",
      text: "Share suggestions for cultural improvement...",
      emoji: "How is your mental well-being rating today?"
    };

    const newQ = {
      id: Date.now(),
      type,
      text: texts[type] || "New custom question prompt..."
    };
    setQuestions(prev => [...prev, newQ]);
    showToast(`Added new ${type.toUpperCase()} question.`);
  };

  const removeQuestion = (id: number) => {
    setQuestions(prev => prev.filter(q => q.id !== id));
  };

  const updateQuestionText = (id: number, text: string) => {
    setQuestions(prev => prev.map(q => q.id === id ? { ...q, text } : q));
  };

  const moveQuestion = (index: number, direction: "up" | "down") => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === questions.length - 1) return;
    
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    const updated = [...questions];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    setQuestions(updated);
  };

  // Launch a new survey from current Builder configuration
  const handleLaunchSurvey = () => {
    if (questions.length === 0) {
      showToast("Cannot launch an empty survey.");
      return;
    }
    const newSurvey: SurveyItem = {
      id: `s-${Date.now()}`,
      title: "Custom Pulse Assessment",
      category: "Ad-hoc Pulse",
      status: "active",
      participationRate: 0,
      responses: 0,
      dueDate: "July 15, 2026"
    };
    setSurveys(prev => [newSurvey, ...prev]);
    setActiveTab("dashboard");
    showToast("Survey campaign launched successfully!");
  };

  // Close Survey campaign
  const handleCloseSurvey = (id: string) => {
    setSurveys(prev => prev.map(s => s.id === id ? { ...s, status: "closed" } : s));
    showToast("Survey campaign marked as closed.");
  };

  // Duplicate survey campaign
  const handleDuplicateSurvey = (survey: SurveyItem) => {
    const duplicated: SurveyItem = {
      ...survey,
      id: `s-dup-${Date.now()}`,
      title: `${survey.title} (Copy)`,
      participationRate: 0,
      responses: 0,
      status: "scheduled"
    };
    setSurveys(prev => [duplicated, ...prev]);
    showToast(`Duplicated: ${survey.title}`);
  };

  // Load a template directly into the builder
  const handleLoadTemplate = (template: typeof surveyTemplates[0]) => {
    const templateQuestions = [
      { id: 101, type: "rating", text: `On a scale of 1-10, how do you rate our core value of "${template.category}"?` },
      { id: 102, type: "text", text: `What is your primary feedback regarding: ${template.title}?` },
      { id: 103, type: "emoji", text: "How do you feel about our current team development cadence?" }
    ];
    setQuestions(templateQuestions);
    setActiveTab("builder");
    showToast(`Loaded "${template.title}" template.`);
  };

  return (
    <div className="survey-module v-animate-slide-up" style={{ position: "relative" }}>
      {/* Toast Alert Banner */}
      {toastMessage && (
        <div 
          style={{
            position: "fixed",
            top: "24px",
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

      <div className="executive-dashboard__header" style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "16px", marginBottom: "20px" }}>
        <div>
          <h2 className="executive-dashboard__title" style={{ fontSize: "24px", fontWeight: 800 }}>Pulse Campaigns & Creator</h2>
          <p className="executive-dashboard__subtitle" style={{ color: "var(--text-secondary)" }}>Design research-grade questionnaires, launch polls, and track response indices.</p>
        </div>
        <button 
          className="executive-dashboard__action-btn"
          onClick={() => {
            setQuestions([
              { id: 1, type: "rating", text: "How would you rate your workload balance this week?" },
              { id: 2, type: "nps", text: "How likely are you to recommend our company as a great place to work?" }
            ]);
            setActiveTab("builder");
          }}
          style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}
        >
          <Plus size={16} /> Custom Blank Survey
        </button>
      </div>

      {/* Internal Navigation Tabs */}
      <div className="survey-module__tabs" style={{ display: "flex", gap: "10px", borderBottom: "1px solid var(--border-color)", paddingBottom: "10px", marginBottom: "20px" }}>
        <button 
          className={`survey-module__tab-btn ${activeTab === "dashboard" ? "active" : ""}`}
          onClick={() => setActiveTab("dashboard")}
          style={{
            padding: "8px 16px",
            borderRadius: "var(--radius-sm)",
            border: "none",
            background: activeTab === "dashboard" ? "var(--color-indigo-glow)" : "transparent",
            color: activeTab === "dashboard" ? "var(--color-indigo)" : "var(--text-secondary)",
            fontWeight: 700,
            fontSize: "13px",
            cursor: "pointer"
          }}
        >
          Active Campaigns
        </button>
        <button 
          className={`survey-module__tab-btn ${activeTab === "templates" ? "active" : ""}`}
          onClick={() => setActiveTab("templates")}
          style={{
            padding: "8px 16px",
            borderRadius: "var(--radius-sm)",
            border: "none",
            background: activeTab === "templates" ? "var(--color-indigo-glow)" : "transparent",
            color: activeTab === "templates" ? "var(--color-indigo)" : "var(--text-secondary)",
            fontWeight: 700,
            fontSize: "13px",
            cursor: "pointer"
          }}
        >
          Marketplace Templates
        </button>
        <button 
          className={`survey-module__tab-btn ${activeTab === "builder" ? "active" : ""}`}
          onClick={() => setActiveTab("builder")}
          style={{
            padding: "8px 16px",
            borderRadius: "var(--radius-sm)",
            border: "none",
            background: activeTab === "builder" ? "var(--color-indigo-glow)" : "transparent",
            color: activeTab === "builder" ? "var(--color-indigo)" : "var(--text-secondary)",
            fontWeight: 700,
            fontSize: "13px",
            cursor: "pointer"
          }}
        >
          Visual Survey Builder
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === "dashboard" && (
        <div className="dashboard-card" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", padding: "24px", borderRadius: "var(--radius-lg)" }}>
          <div className="dashboard-card__header" style={{ marginBottom: "20px" }}>
            <h3 className="dashboard-card__title" style={{ fontSize: "16px", fontWeight: 700 }}>Active Surveys</h3>
          </div>
          <div className="dashboard-card__body">
            <div className="data-table-container" style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid var(--border-color)", color: "var(--text-muted)", fontSize: "11px", fontWeight: 800, textTransform: "uppercase" }}>
                    <th style={{ padding: "12px", textAlign: "left" }}>Survey Title</th>
                    <th style={{ padding: "12px", textAlign: "left" }}>Category</th>
                    <th style={{ padding: "12px", textAlign: "left" }}>Participation</th>
                    <th style={{ padding: "12px", textAlign: "left" }}>Responses</th>
                    <th style={{ padding: "12px", textAlign: "left" }}>Closes On</th>
                    <th style={{ padding: "12px", textAlign: "left" }}>Status</th>
                    <th style={{ padding: "12px", textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {surveys.map((survey) => (
                    <tr 
                      key={survey.id} 
                      style={{ borderBottom: "1px solid var(--border-color)", fontSize: "13px" }}
                      className="dashboard-table-row"
                    >
                      <td style={{ padding: "14px 12px", fontWeight: "800", color: "var(--text-primary)" }}>{survey.title}</td>
                      <td style={{ padding: "14px 12px", color: "var(--text-secondary)" }}>{survey.category}</td>
                      <td style={{ padding: "14px 12px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <span style={{ fontWeight: 700 }}>{survey.participationRate}%</span>
                          <div style={{ width: "60px", height: "6px", backgroundColor: "var(--bg-input)", borderRadius: "3px", overflow: "hidden" }}>
                            <div 
                              style={{ 
                                width: `${survey.participationRate}%`, 
                                height: "100%", 
                                backgroundColor: "var(--color-indigo)", 
                                borderRadius: "3px" 
                              }} 
                            />
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: "14px 12px", fontWeight: 600 }}>{survey.responses}</td>
                      <td style={{ padding: "14px 12px", color: "var(--text-muted)" }}>{survey.dueDate}</td>
                      <td style={{ padding: "14px 12px" }}>
                        <span 
                          style={{
                            fontSize: "11px",
                            fontWeight: 700,
                            padding: "3px 8px",
                            borderRadius: "10px",
                            backgroundColor: survey.status === "active" ? "rgba(16, 185, 129, 0.1)" : survey.status === "scheduled" ? "rgba(245, 158, 11, 0.1)" : "rgba(107, 114, 128, 0.1)",
                            color: survey.status === "active" ? "var(--color-emerald)" : survey.status === "scheduled" ? "var(--color-amber)" : "var(--text-secondary)"
                          }}
                        >
                          {survey.status}
                        </span>
                      </td>
                      <td style={{ padding: "14px 12px", textAlign: "right" }}>
                        <div style={{ display: "flex", justifyContent: "flex-end", gap: "6px" }}>
                          <button 
                            onClick={() => handleDuplicateSurvey(survey)}
                            title="Duplicate Survey"
                            style={{ padding: "4px 8px", border: "1px solid var(--border-color)", background: "transparent", borderRadius: "4px", cursor: "pointer", color: "var(--text-secondary)" }}
                          >
                            <Copy size={12} />
                          </button>
                          {survey.status === "active" && (
                            <button 
                              onClick={() => handleCloseSurvey(survey.id)}
                              title="Close Campaign"
                              style={{ padding: "4px 8px", border: "none", background: "var(--color-rose)", color: "#fff", borderRadius: "4px", cursor: "pointer", fontSize: "11px", fontWeight: 700 }}
                            >
                              Close
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === "templates" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
          {surveyTemplates.map((t) => (
            <div 
              key={t.id} 
              className="template-card" 
              onClick={() => handleLoadTemplate(t)}
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-color)",
                padding: "24px",
                borderRadius: "var(--radius-lg)",
                cursor: "pointer",
                transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                position: "relative"
              }}
            >
              <div style={{ fontSize: "28px" }}>{t.icon}</div>
              <h4 style={{ margin: 0, fontSize: "15px", fontWeight: 800, color: "var(--text-primary)" }}>{t.title}</h4>
              <p style={{ margin: 0, fontSize: "12px", color: "var(--text-secondary)", lineHeight: 1.4 }}>{t.desc}</p>
              <div style={{ alignSelf: "flex-start", fontSize: "10px", fontWeight: 700, background: "var(--color-indigo-glow)", color: "var(--color-indigo)", padding: "2px 8px", borderRadius: "10px" }}>{t.category}</div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "builder" && (
        <div className="survey-builder" style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "24px" }}>
          {/* Builder Editor Canvas */}
          <div 
            className="survey-builder__canvas" 
            style={{ 
              background: "var(--bg-card)", 
              border: "1px solid var(--border-color)", 
              padding: "24px", 
              borderRadius: "var(--radius-lg)", 
              display: "flex", 
              flexDirection: "column", 
              gap: "20px" 
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border-color)", paddingBottom: "14px" }}>
              <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "800" }}>Creator Workspace</h3>
              <div style={{ display: "flex", gap: "8px" }}>
                <button 
                  className="bm-top-nav__workspace-select" 
                  style={{ padding: "6px 12px", fontSize: "12px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }} 
                  onClick={() => showToast("Draft saved successfully!")}
                >
                  <Save size={14} /> Save Draft
                </button>
                <button 
                  className="executive-dashboard__action-btn" 
                  style={{ padding: "6px 14px", fontSize: "12px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }} 
                  onClick={handleLaunchSurvey}
                >
                  <Play size={12} /> Launch Assessment
                </button>
              </div>
            </div>

            {/* Questions list */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {questions.map((q, idx) => (
                <div 
                  key={q.id} 
                  className="survey-builder__question-card"
                  style={{
                    padding: "16px",
                    border: "1px solid var(--border-color)",
                    borderRadius: "var(--radius-md)",
                    backgroundColor: "var(--bg-main)",
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "10px", fontWeight: "800", color: "var(--text-muted)", textTransform: "uppercase" }}>
                      Question {idx + 1} • {q.type}
                    </span>
                    <div style={{ display: "flex", gap: "4px" }}>
                      <button 
                        onClick={() => moveQuestion(idx, "up")}
                        disabled={idx === 0}
                        style={{ padding: "2px 4px", background: "transparent", border: "none", cursor: idx === 0 ? "not-allowed" : "pointer", color: "var(--text-muted)" }}
                      >
                        <ArrowUp size={12} />
                      </button>
                      <button 
                        onClick={() => moveQuestion(idx, "down")}
                        disabled={idx === questions.length - 1}
                        style={{ padding: "2px 4px", background: "transparent", border: "none", cursor: idx === questions.length - 1 ? "not-allowed" : "pointer", color: "var(--text-muted)" }}
                      >
                        <ArrowDown size={12} />
                      </button>
                      <button 
                        className="remove-btn" 
                        onClick={() => removeQuestion(q.id)}
                        style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--color-rose)", marginLeft: "8px" }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  
                  <input 
                    type="text" 
                    value={q.text} 
                    onChange={(e) => updateQuestionText(q.id, e.target.value)} 
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--border-color)",
                      background: "var(--bg-card)",
                      color: "var(--text-primary)",
                      fontSize: "13px",
                      fontWeight: 600
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Add question buttons */}
            <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "16px" }}>
              <div style={{ fontSize: "11px", fontWeight: "800", color: "var(--text-muted)", marginBottom: "8px", textTransform: "uppercase" }}>Insert Response Matrix:</div>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                <button 
                  className="survey-module__tab-btn" 
                  style={{ fontSize: "11px", border: "1px solid var(--border-color)", padding: "6px 12px", borderRadius: "8px", cursor: "pointer" }} 
                  onClick={() => addQuestion("rating")}
                >
                  + Scale (1-10)
                </button>
                <button 
                  className="survey-module__tab-btn" 
                  style={{ fontSize: "11px", border: "1px solid var(--border-color)", padding: "6px 12px", borderRadius: "8px", cursor: "pointer" }} 
                  onClick={() => addQuestion("nps")}
                >
                  + NPS (0-10)
                </button>
                <button 
                  className="survey-module__tab-btn" 
                  style={{ fontSize: "11px", border: "1px solid var(--border-color)", padding: "6px 12px", borderRadius: "8px", cursor: "pointer" }} 
                  onClick={() => addQuestion("text")}
                >
                  + Free text comment
                </button>
                <button 
                  className="survey-module__tab-btn" 
                  style={{ fontSize: "11px", border: "1px solid var(--border-color)", padding: "6px 12px", borderRadius: "8px", cursor: "pointer" }} 
                  onClick={() => addQuestion("emoji")}
                >
                  + Emojis reaction
                </button>
              </div>
            </div>
          </div>

          {/* Builder Right Preview Panel */}
          <div 
            className="survey-builder__preview-panel"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-color)",
              padding: "24px",
              borderRadius: "var(--radius-lg)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", width: "100%", marginBottom: "16px" }}>
              <Smartphone size={16} className="text-indigo-500" />
              <h3 style={{ margin: 0, fontSize: "15px", fontWeight: "800" }}>Live App Simulator</h3>
            </div>
            
            {/* Styled Phone Frame */}
            <div 
              style={{
                width: "260px",
                height: "450px",
                border: "10px solid #1e293b",
                borderRadius: "32px",
                backgroundColor: "var(--bg-main)",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.4)",
                position: "relative"
              }}
            >
              {/* Phone Status Bar */}
              <div 
                style={{ 
                  height: "22px", 
                  backgroundColor: "#1e293b", 
                  color: "#94a3b8", 
                  fontSize: "9px", 
                  fontWeight: 700, 
                  display: "flex", 
                  justifyContent: "space-between", 
                  padding: "0 14px", 
                  alignItems: "center" 
                }}
              >
                <span>9:41</span>
                <div style={{ display: "flex", gap: "4px" }}>
                  <span>📶</span>
                  <span>🔋</span>
                </div>
              </div>

              {/* App Content */}
              <div style={{ flex: 1, padding: "14px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "14px" }}>
                <div style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "6px", textAlign: "center" }}>
                  <h4 style={{ margin: 0, fontSize: "11px", fontWeight: 800 }}>Employee Pulse</h4>
                  <span style={{ fontSize: "8px", color: "var(--text-muted)" }}>100% Anonymous</span>
                </div>
                
                {questions.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "40px 0", color: "var(--text-muted)", fontSize: "11px" }}>
                    No questions added yet. Use the editor to insert questions.
                  </div>
                ) : (
                  questions.map((q, idx) => (
                    <div key={q.id} style={{ fontSize: "11px", borderBottom: "1px solid var(--border-color)", paddingBottom: "10px" }}>
                      <div style={{ fontWeight: "700", color: "var(--text-primary)", marginBottom: "6px", lineHeight: 1.3 }}>
                        {idx + 1}. {q.text}
                      </div>
                      
                      {q.type === "rating" && (
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "4px" }}>
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                            <button
                              key={n}
                              onClick={() => setSimRatings(prev => ({ ...prev, [q.id]: n }))}
                              style={{
                                fontSize: "9px",
                                padding: "4px 0",
                                border: "1px solid var(--border-color)",
                                borderRadius: "3px",
                                background: simRatings[q.id] === n ? "var(--color-indigo)" : "var(--bg-card)",
                                color: simRatings[q.id] === n ? "#fff" : "var(--text-primary)",
                                fontWeight: "800",
                                cursor: "pointer"
                              }}
                            >
                              {n}
                            </button>
                          ))}
                        </div>
                      )}

                      {q.type === "nps" && (
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(11, 1fr)", gap: "1px" }}>
                          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                            <button
                              key={n}
                              onClick={() => setSimRatings(prev => ({ ...prev, [q.id]: n }))}
                              style={{
                                fontSize: "8px",
                                padding: "4px 0",
                                border: "1px solid var(--border-color)",
                                background: simRatings[q.id] === n ? "var(--color-indigo)" : "var(--bg-card)",
                                color: simRatings[q.id] === n ? "#fff" : "var(--text-primary)",
                                fontWeight: "800",
                                cursor: "pointer"
                              }}
                            >
                              {n}
                            </button>
                          ))}
                        </div>
                      )}

                      {q.type === "text" && (
                        <input 
                          type="text" 
                          placeholder="Tap to respond..." 
                          value={simTexts[q.id] || ""}
                          onChange={(e) => setSimTexts(prev => ({ ...prev, [q.id]: e.target.value }))}
                          style={{
                            width: "100%",
                            height: "26px",
                            fontSize: "10px",
                            padding: "4px 8px",
                            backgroundColor: "var(--bg-card)",
                            border: "1px solid var(--border-color)",
                            borderRadius: "4px",
                            color: "var(--text-primary)"
                          }} 
                        />
                      )}

                      {q.type === "emoji" && (
                        <div style={{ display: "flex", justifyContent: "space-between", padding: "0 6px" }}>
                          {[
                            { name: "Great", emoji: "🤩" },
                            { name: "Good", emoji: "😊" },
                            { name: "Okay", emoji: "😐" },
                            { name: "Stressed", emoji: "😟" },
                            { name: "Overwhelmed", emoji: "🥵" }
                          ].map((eItem) => (
                            <button
                              key={eItem.name}
                              onClick={() => setSimEmojis(prev => ({ ...prev, [q.id]: eItem.name }))}
                              style={{
                                background: simEmojis[q.id] === eItem.name ? "rgba(99, 102, 241, 0.15)" : "transparent",
                                border: "none",
                                fontSize: "16px",
                                cursor: "pointer",
                                padding: "4px",
                                borderRadius: "4px"
                              }}
                              title={eItem.name}
                            >
                              {eItem.emoji}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                )}

                {questions.length > 0 && (
                  <button
                    onClick={() => {
                      setSimRatings({});
                      setSimTexts({});
                      setSimEmojis({});
                      showToast("Simulator response submitted successfully!");
                    }}
                    style={{
                      width: "100%",
                      padding: "8px 0",
                      background: "var(--color-emerald)",
                      color: "#fff",
                      border: "none",
                      borderRadius: "6px",
                      fontSize: "11px",
                      fontWeight: 800,
                      cursor: "pointer",
                      marginTop: "auto"
                    }}
                  >
                    Submit Response
                  </button>
                )}
              </div>

              {/* Home Indicator */}
              <div 
                style={{ 
                  height: "4px", 
                  width: "100px", 
                  backgroundColor: "#475569", 
                  borderRadius: "2px", 
                  alignSelf: "center", 
                  marginBottom: "8px" 
                }} 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
