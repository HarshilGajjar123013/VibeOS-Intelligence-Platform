import React from "react";
import {
  BarChart3,
  FileText,
  MessageSquare,
  Award,
  Settings,
  HelpCircle,
  Activity,
  Bell,
  Layers,
  Globe,
  Users,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from "lucide-react";

interface SidebarProps {
  role: "executive" | "hr" | "manager" | "employee";
  activeTab: string;
  setActiveTab: (tab: any) => void;
  collapsed: boolean;
  setCollapsed: (c: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (o: boolean) => void;
}

export default function Sidebar({
  role,
  activeTab,
  setActiveTab,
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen
}: SidebarProps) {
  // Navigation mapping by role
  const getNavItems = () => {
    const common = [
      { id: "dashboard", label: "Dashboard", icon: <Layers size={18} /> },
      { id: "surveys", label: "Surveys", icon: <FileText size={18} />, badge: role === "employee" ? 2 : undefined },
      { id: "feedback", label: "Feedback", icon: <MessageSquare size={18} /> },
      { id: "analytics", label: "Analytics", icon: <BarChart3 size={18} /> }
    ];

    if (role === "employee") {
      return [
        { id: "dashboard", label: "Wellbeing Check-in", icon: <Activity size={18} /> },
        { id: "surveys", label: "My Surveys", icon: <FileText size={18} />, badge: 3 },
        { id: "feedback", label: "Share Feedback", icon: <MessageSquare size={18} /> },
        { id: "recognition", label: "Kudos Wall", icon: <Award size={18} /> },
        { id: "settings", label: "Settings", icon: <Settings size={18} /> },
        { id: "help", label: "Help Center", icon: <HelpCircle size={18} /> }
      ];
    }

    const adminItems = [
      ...common,
      { id: "recognition", label: "Recognition", icon: <Award size={18} /> },
      { id: "brand", label: "Employer Brand", icon: <Globe size={18} /> },
      { id: "reports", label: "Reports", icon: <Activity size={18} /> }
    ];

    if (role === "manager") {
      return [
        ...common,
        { id: "recognition", label: "Team Recognition", icon: <Award size={18} /> },
        { id: "reports", label: "Team Reports", icon: <Activity size={18} /> },
        { id: "settings", label: "Settings", icon: <Settings size={18} /> },
        { id: "help", label: "Help Center", icon: <HelpCircle size={18} /> }
      ];
    }

    // Executive and HR Leader
    return [
      ...adminItems,
      { id: "notifications", label: "Notifications", icon: <Bell size={18} />, badge: 4 },
      { id: "integrations", label: "Integrations", icon: <Layers size={18} /> },
      { id: "settings", label: "Settings", icon: <Settings size={18} /> },
      { id: "help", label: "Help Center", icon: <HelpCircle size={18} /> }
    ];
  };

  const menuItems = getNavItems();

  const handleItemClick = (id: any) => {
    setActiveTab(id);
    setMobileOpen(false);
  };

  const getRoleName = () => {
    switch (role) {
      case "executive": return "Executive / Admin";
      case "hr": return "HR Director";
      case "manager": return "Dept Manager";
      case "employee": return "Alex Chen (Product)";
    }
  };

  const getInitials = () => {
    switch (role) {
      case "executive": return "AD";
      case "hr": return "HR";
      case "manager": return "M";
      case "employee": return "AC";
    }
  };

  return (
    <>
      <div 
        className={`sidebar-backdrop ${mobileOpen ? "mobile-open" : ""}`}
        onClick={() => setMobileOpen(false)}
      />
      <aside className={`bm-sidebar ${mobileOpen ? "mobile-open" : ""}`}>
        <div className="bm-sidebar__brand">
          {!collapsed && (
            <div className="bm-sidebar__logo">
              <Sparkles size={22} className="text-indigo-500 fill-indigo-500/20" />
              <span>VibeOS</span>
            </div>
          )}
          <button 
            className="bm-sidebar__collapse-btn" 
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        <nav className="bm-sidebar__nav">
          <div className="bm-sidebar__menu-group">
            {!collapsed && <span className="bm-sidebar__menu-title">Workspace</span>}
            {menuItems.map((item) => (
              <button
                key={item.id}
                className={`bm-sidebar__item ${activeTab === item.id ? "active" : ""}`}
                onClick={() => handleItemClick(item.id)}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge && <span className="bm-sidebar__badge">{item.badge}</span>}
              </button>
            ))}
          </div>
        </nav>

        <div className="bm-sidebar__footer">
          <div className="bm-sidebar__avatar">
            {role === "employee" ? (
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80" alt="Avatar" />
            ) : (
              <span>{getInitials()}</span>
            )}
          </div>
          {!collapsed && (
            <div className="bm-sidebar__user-info">
              <div className="bm-sidebar__user-name">
                {role === "employee" ? "Alex Chen" : role === "hr" ? "Sarah Mitchell" : role === "manager" ? "Marcus Vance" : "Admin User"}
              </div>
              <div className="bm-sidebar__user-role">{getRoleName()}</div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
