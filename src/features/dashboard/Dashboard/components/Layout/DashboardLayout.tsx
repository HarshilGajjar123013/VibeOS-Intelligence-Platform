import React from "react";

interface DashboardLayoutProps {
  sidebar: React.ReactNode;
  topNav: React.ReactNode;
  sidebarCollapsed: boolean;
  children: React.ReactNode;
}

export default function DashboardLayout({
  sidebar,
  topNav,
  sidebarCollapsed,
  children
}: DashboardLayoutProps) {
  return (
    <div className={`bm-layout ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}>
      {sidebar}
      <div className="bm-viewport">
        {topNav}
        <div className="bm-page-container">
          {children}
        </div>
      </div>
    </div>
  );
}
