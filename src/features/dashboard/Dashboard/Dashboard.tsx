"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Search,
  Sliders,
  Bell,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  X,
  Send,
  Layers,
  ArrowRight,
  RefreshCw
} from "lucide-react";

// Shell Components
import DashboardLayout from "./components/Layout/DashboardLayout";
import Sidebar from "./components/Layout/Sidebar";
import TopNav from "./components/Layout/TopNav";
import { useProtoStore } from "@/src/store/useProtoStore";

// Screen Modules
import ExecutiveDashboard from "./screens/ExecutiveDashboard";
import HRDashboard from "./screens/HRDashboard";
import ManagerDashboard from "./screens/ManagerDashboard";
import EmployeeDashboard from "./screens/EmployeeDashboard";
import AnalyticsModule from "./screens/AnalyticsModule";
import SurveyModule from "./screens/SurveyModule";
import FeedbackModule from "./screens/FeedbackModule";
import RecognitionModule from "./screens/RecognitionModule";
import EmployerBrandModule from "./screens/EmployerBrandModule";
import ReportsModule from "./screens/ReportsModule";
import SettingsModule from "./screens/SettingsModule";

import "./Dashboard.scss";

export default function Dashboard() {
  const router = useRouter();

  // 1. GLOBAL DASHBOARD STATE FROM ZUSTAND STORE
  const {
    role,
    setRole,
    dashboardState,
    setDashboardState,
    toasts,
    addToast
  } = useProtoStore();

  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

  // Layout states
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  // Shell panel toggles
  const [showAiPanel, setShowAiPanel] = useState<boolean>(false);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [showProtoPanel, setShowProtoPanel] = useState<boolean>(false);

  // 2. SEARCH & COMMAND PALETTE
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Action options inside Command Palette
  const searchOptions = [
    { label: "Switch to Executive Persona", category: "Role Switching", action: () => { setRole("executive"); setActiveTab("dashboard"); } },
    { label: "Switch to HR Leader Persona", category: "Role Switching", action: () => { setRole("hr"); setActiveTab("dashboard"); } },
    { label: "Switch to Department Manager", category: "Role Switching", action: () => { setRole("manager"); setActiveTab("dashboard"); } },
    { label: "Switch to Employee Persona", category: "Role Switching", action: () => { setRole("employee"); setActiveTab("dashboard"); } },
    { label: "Open Deep People Analytics", category: "Navigation", action: () => setActiveTab("analytics") },
    { label: "Launch New Pulse Survey Builder", category: "Surveys", action: () => setActiveTab("surveys") },
    { label: "Open Anonymous Feedback Center", category: "Feedback", action: () => setActiveTab("feedback") },
    { label: "Approve WFH Workload Campaign", category: "Actions", action: () => { addToast("success", "WFH Workload campaign approved!"); } },
    { label: "Clear Notifications Center", category: "System", action: () => addToast("info", "All notifications cleared.") },
    { label: "Toggle Dark Interface Theme", category: "Preferences", action: () => setIsDarkTheme(!isDarkTheme) }
  ];

  const filteredOptions = queryOptions(searchQuery, searchOptions);

  function queryOptions(query: string, options: typeof searchOptions) {
    if (!query) return options;
    return options.filter(opt => 
      opt.label.toLowerCase().includes(query.toLowerCase()) || 
      opt.category.toLowerCase().includes(query.toLowerCase())
    );
  }

  // Keyboard Shortcuts (Ctrl+K/Cmd+K) listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setShowSearch(prev => !prev);
      }
      if (e.key === "Escape") {
        setShowSearch(false);
        setShowProtoPanel(false);
        setShowAiPanel(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Autofocus input when Command Palette opens
  useEffect(() => {
    if (showSearch) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [showSearch]);

  // 4. FLOATING AI ASSISTANT CHAT ENGINE
  const [chatLog, setChatLog] = useState<any[]>([
    { source: "ai", text: "Hello! I am VibeAI, your workplace analytics assistant. How can I help you today?" }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isAiTyping, setIsAiTyping] = useState(false);

  const triggerAiResponse = (userPrompt: string) => {
    if (isAiTyping) return;
    
    // Add user message to log
    const nextLog = [...chatLog, { source: "user", text: userPrompt }];
    setChatLog(nextLog);
    setIsAiTyping(true);

    // AI thinking simulator
    setTimeout(() => {
      let aiResponse = "";
      if (userPrompt.toLowerCase().includes("burnout")) {
        aiResponse = "Based on monthly pulses, Engineering burnout risks rose by 14%. The primary stress indices highlight workload and staffing. I recommend reviewing the 'Engineering Rebalance Plan' in your Action Center.";
      } else if (userPrompt.toLowerCase().includes("survey")) {
        aiResponse = "You have 3 active survey loops running. The 'Q2 Core Engagement Survey' is at a 92% participation completion rate. Recommend sending a Slack nudge to the remaining 8% cohorts.";
      } else if (userPrompt.toLowerCase().includes("kudos") || userPrompt.toLowerCase().includes("recognition")) {
        aiResponse = "Peer recognition activity increased by 12% MoM. Teamwork badges are currently the most shared culture points, showing solid alignment.";
      } else {
        aiResponse = "Excellent question! Let me check the sentiment logs. Overall culture health score sits at 84 (Healthy), outperforming industry baselines by 6 percentile ranks.";
      }

      setChatLog(prev => [...prev, { source: "ai", text: aiResponse }]);
      setIsAiTyping(false);
    }, 1200);
  };

  const submitChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const prompt = chatInput;
    setChatInput("");
    triggerAiResponse(prompt);
  };

  // 5. VIEW PORT CONDITIONAL RENDERING BASED ON ACTIVE TAB
  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        switch (role) {
          case "executive": return <ExecutiveDashboard />;
          case "hr": return <HRDashboard />;
          case "manager": return <ManagerDashboard />;
          case "employee": return <EmployeeDashboard />;
        }
      case "surveys":
        return <SurveyModule />;
      case "feedback":
        return <FeedbackModule />;
      case "analytics":
        return <AnalyticsModule />;
      case "recognition":
        return <RecognitionModule />;
      case "brand":
        return <EmployerBrandModule />;
      case "reports":
        return <ReportsModule />;
      case "settings":
        return <SettingsModule />;
      case "notifications":
        return (
          <div className="dashboard-card">
            <div className="dashboard-card__header">
              <h3 className="dashboard-card__title">System Alerts</h3>
            </div>
            <div className="dashboard-card__body">
              <p style={{ fontSize: "13px", color: "var(--text-secondary)" }}>No unread critical system notifications.</p>
            </div>
          </div>
        );
      case "integrations":
        return (
          <div className="dashboard-card">
            <div className="dashboard-card__header">
              <h3 className="dashboard-card__title">Work Integration Hub</h3>
            </div>
            <div className="dashboard-card__body">
              <p style={{ fontSize: "13px", color: "var(--text-secondary)" }}>Connect Slack, Google Suite, and Teams bots in your settings panel.</p>
            </div>
          </div>
        );
      default:
        return <HelpCircle size={32} />;
    }
  };

  return (
    <div className={`vibe-dashboard theme-${isDarkTheme ? "dark" : "light"}`}>
      {/* Main Grid Shell */}
      <DashboardLayout
        sidebarCollapsed={sidebarCollapsed}
        sidebar={
          <Sidebar
            role={role}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            collapsed={sidebarCollapsed}
            setCollapsed={setSidebarCollapsed}
            mobileOpen={mobileOpen}
            setMobileOpen={setMobileOpen}
          />
        }
        topNav={
          <TopNav
            activeTab={activeTab}
            isDarkTheme={isDarkTheme}
            setIsDarkTheme={setIsDarkTheme}
            setMobileOpen={setMobileOpen}
            triggerSearch={() => setShowSearch(true)}
            triggerAiPanel={() => setShowAiPanel(prev => !prev)}
            role={role}
          />
        }
      >
        {/* Conditional states rendering */}
        {dashboardState === "loading" && (
          <div className="skeleton-loader">
            <div className="skeleton-loader__header">
              <div className="skeleton-loader__text-lg" />
              <div className="skeleton-loader__text-lg" style={{ width: "120px" }} />
            </div>
            <div className="skeleton-loader__text-sm" />
            <div className="skeleton-loader__grid">
              <div className="skeleton-loader__card" />
              <div className="skeleton-loader__card" />
              <div className="skeleton-loader__card" />
              <div className="skeleton-loader__card" />
            </div>
            <div className="skeleton-loader__main" />
          </div>
        )}

        {dashboardState === "empty" && (
          <div className="empty-state">
            <div className="empty-state__icon">📂</div>
            <h3>Workspace Folder is Empty</h3>
            <p>We could not retrieve any active survey metrics or employee logs for this segment. Build a new template pulse to get started.</p>
            <button className="empty-state__btn" onClick={() => { setDashboardState("success"); setActiveTab("surveys"); }}>
              Go to Surveys
            </button>
          </div>
        )}

        {dashboardState === "error" && (
          <div className="error-state">
            <div className="error-state__icon"><AlertTriangle size={32} /></div>
            <h3>Platform Connection Timeout</h3>
            <p>We encountered an error contacting the central analytics processor. Please verify your VPN settings and try again.</p>
            <button className="error-state__btn" style={{ display: "flex", alignItems: "center", gap: "6px" }} onClick={() => setDashboardState("success")}>
              <RefreshCw size={12} /> Retry Handshake
            </button>
          </div>
        )}

        {dashboardState === "success" && renderTabContent()}
      </DashboardLayout>

      {/* Floating AI Assistant Chat panel */}
      {showAiPanel && (
        <div className="ai-assistant-panel">
          <div className="ai-assistant-panel__header">
            <div className="title">
              <Sparkles size={16} className="text-indigo-500 fill-indigo-500/10" />
              <span>VibeAI Workspace Assistant</span>
            </div>
            <button className="close-btn" onClick={() => setShowAiPanel(false)} aria-label="Close chat panel">
              <X size={16} />
            </button>
          </div>
          <div className="ai-assistant-panel__chat">
            {chatLog.map((msg, index) => (
              <div key={index} className={`ai-assistant-panel__msg ${msg.source}`}>
                {msg.text}
              </div>
            ))}
            {isAiTyping && (
              <div className="ai-assistant-panel__msg ai" style={{ display: "flex", gap: "4px" }}>
                <span className="skeleton-pulse" style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--text-muted)" }} />
                <span className="skeleton-pulse" style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--text-muted)", animationDelay: "0.2s" }} />
                <span className="skeleton-pulse" style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--text-muted)", animationDelay: "0.4s" }} />
              </div>
            )}
          </div>
          
          <div className="ai-assistant-panel__suggestions">
            <button className="ai-assistant-panel__suggest-btn" onClick={() => triggerAiResponse("Analyze Engineering burnout risk trends")}>
              🔍 Analyze Engineering burnout risk
            </button>
            <button className="ai-assistant-panel__suggest-btn" onClick={() => triggerAiResponse("Suggest active survey completion remedies")}>
              📣 Completion improvement guidelines
            </button>
          </div>

          <form className="ai-assistant-panel__input-row" onSubmit={submitChat}>
            <input 
              type="text" 
              placeholder="Ask about culture stats, surveys, kudos..." 
              value={chatInput} 
              onChange={(e) => setChatInput(e.target.value)} 
            />
            <button type="submit" aria-label="Send message">
              <Send size={14} />
            </button>
          </form>
        </div>
      )}

      {/* Floating AI launcher trigger */}
      {!showAiPanel && (
        <button 
          className="ai-launcher-btn" 
          onClick={() => setShowAiPanel(true)}
          title="Ask VibeAI"
          aria-label="Open AI helper"
        >
          <Sparkles size={20} />
        </button>
      )}

      {/* Command Palette Keyboard Shortcut Modal */}
      {showSearch && (
        <div className="command-palette" onClick={() => setShowSearch(false)}>
          <div className="command-palette__box" onClick={(e) => e.stopPropagation()}>
            <div className="command-palette__search-row">
              <Search size={18} className="text-muted" />
              <input 
                ref={searchInputRef}
                type="text" 
                placeholder="Search commands (e.g. switch roles, open analytics)..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <kbd style={{ fontSize: "9px", background: "var(--bg-input)", border: "1px solid var(--border-color)", padding: "2px 6px", borderRadius: "4px" }}>ESC</kbd>
            </div>
            <div className="command-palette__list">
              {filteredOptions.length === 0 ? (
                <div style={{ padding: "16px", textAlign: "center", fontSize: "12px", color: "var(--text-muted)" }}>
                  No matching shortcuts found.
                </div>
              ) : (
                filteredOptions.map((opt, idx) => (
                  <button 
                    key={idx} 
                    className="command-palette__item"
                    onClick={() => {
                      opt.action();
                      setShowSearch(false);
                    }}
                  >
                    <span>{opt.label}</span>
                    <span className="shortcut">{opt.category}</span>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
