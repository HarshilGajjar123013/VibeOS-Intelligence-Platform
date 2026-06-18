import React, { useState } from "react";
import {
  Search,
  Bell,
  Sun,
  Moon,
  ChevronDown,
  Sparkles,
  Menu,
  Globe,
  Settings,
  HelpCircle,
  LogOut,
  User
} from "lucide-react";

interface TopNavProps {
  activeTab: string;
  isDarkTheme: boolean;
  setIsDarkTheme: (d: boolean) => void;
  setMobileOpen: (o: boolean) => void;
  triggerSearch: () => void;
  triggerAiPanel: () => void;
  role: string;
}

export default function TopNav({
  activeTab,
  isDarkTheme,
  setIsDarkTheme,
  setMobileOpen,
  triggerSearch,
  triggerAiPanel,
  role
}: TopNavProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const getBreadcrumbTitle = () => {
    switch (activeTab) {
      case "dashboard": return "Dashboard";
      case "surveys": return "Surveys & Questionnaires";
      case "feedback": return "Anonymous Feedback";
      case "analytics": return "Deep People Analytics";
      case "recognition": return "Social Recognition Feed";
      case "brand": return "Employer Branding Toolkit";
      case "reports": return "Reports Library";
      case "notifications": return "System Notifications";
      case "integrations": return "Work Integration Center";
      case "settings": return "Platform Settings";
      case "help": return "Knowledge Base & Help";
      default: return "VibeOS";
    }
  };

  const notifications = [
    { id: 1, title: "New Pulse survey launched", time: "10 mins ago", type: "survey" },
    { id: 2, title: "Alex Chen recognized by Jessica", time: "2 hours ago", type: "kudos" },
    { id: 3, title: "Workload risk alert in Product", time: "4 hours ago", type: "alert" },
    { id: 4, title: "Monthly analytics report ready", time: "Yesterday", type: "report" }
  ];

  return (
    <header className="bm-top-nav">
      <div className="bm-top-nav__left">
        <button 
          className="bm-top-nav__mobile-toggle"
          onClick={() => setMobileOpen(true)}
          aria-label="Open sidebar menu"
        >
          <Menu size={18} />
        </button>

        <div className="bm-top-nav__breadcrumbs">
          <span className="separator">Platform</span>
          <span className="separator">/</span>
          <span className="active">{getBreadcrumbTitle()}</span>
        </div>
      </div>

      <div className="bm-top-nav__right">
        {/* Global Search Bar Trigger */}
        <button className="bm-top-nav__search-btn" onClick={triggerSearch}>
          <Search size={14} />
          <span>Search resources...</span>
          <kbd>Ctrl+K</kbd>
        </button>

        {/* Workspace selector */}
        <button className="bm-top-nav__workspace-select">
          <Globe size={14} className="text-indigo-500" />
          <span>Acme Corp Global</span>
          <ChevronDown size={12} className="text-muted" />
        </button>

        {/* Floating AI Panel toggle */}
        <button 
          className="bm-top-nav__action-icon"
          onClick={triggerAiPanel}
          title="Ask VibeAI"
          aria-label="Open AI Assistant"
        >
          <Sparkles size={16} className="text-indigo-500 fill-indigo-500/10" />
        </button>

        {/* Theme Toggle */}
        <button 
          className="bm-top-nav__action-icon" 
          onClick={() => setIsDarkTheme(!isDarkTheme)}
          title={isDarkTheme ? "Switch to Light Mode" : "Switch to Dark Mode"}
          aria-label="Toggle visual theme"
        >
          {isDarkTheme ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* Notification center */}
        <div style={{ position: "relative" }}>
          <button 
            className="bm-top-nav__action-icon" 
            onClick={() => setShowNotifications(!showNotifications)}
            title="Notifications"
            aria-label="Open Notifications list"
          >
            <Bell size={16} />
            <span className="badge" />
          </button>
          
          {showNotifications && (
            <div className="proto-controller__panel" style={{ left: "auto", right: 0, width: "280px", bottom: "auto", top: "45px" }}>
              <div className="proto-controller__title" style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "8px", marginBottom: "8px" }}>
                <span>Unread Alerts</span>
                <span className="status-badge" style={{ backgroundColor: "var(--color-rose-glow)", color: "var(--color-rose)" }}>4 new</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {notifications.map((notif) => (
                  <div key={notif.id} style={{ display: "flex", flexDirection: "column", gap: "2px", borderBottom: "1px solid var(--border-color)", paddingBottom: "6px" }}>
                    <div style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-primary)" }}>{notif.title}</div>
                    <div style={{ fontSize: "9px", color: "var(--text-muted)", fontWeight: 600 }}>{notif.time}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div style={{ position: "relative" }}>
          <button 
            className="bm-top-nav__action-icon" 
            style={{ borderRadius: "50%", overflow: "hidden", padding: 0 }}
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            aria-label="Open user profile menu"
          >
            {role === "employee" ? (
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80" alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <User size={16} />
            )}
          </button>

          {showProfileMenu && (
            <div className="proto-controller__panel" style={{ left: "auto", right: 0, width: "180px", bottom: "auto", top: "45px", padding: "12px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <button className="bm-sidebar__item" style={{ fontSize: "12px", padding: "6px 12px" }}>
                  <User size={14} /> Profile Settings
                </button>
                <button className="bm-sidebar__item" style={{ fontSize: "12px", padding: "6px 12px" }}>
                  <Settings size={14} /> Preferences
                </button>
                <button className="bm-sidebar__item" style={{ fontSize: "12px", padding: "6px 12px" }}>
                  <HelpCircle size={14} /> Help Desk
                </button>
                <button className="bm-sidebar__item" style={{ fontSize: "12px", padding: "6px 12px", color: "var(--color-rose)" }}>
                  <LogOut size={14} /> Log Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
