"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Sliders,
  Bell,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  XCircle,
  Info,
  Home,
  LayoutDashboard,
  Briefcase,
  Heart,
  Users,
  User,
  Loader2,
  Inbox,
  AlertCircle
} from "lucide-react";
import { useProtoStore } from "@/src/store/useProtoStore";

const RANDOM_ALERTS: { msg: string; type: "success" | "info" | "warning" | "error" }[] = [
  { msg: "New anonymous feedback submitted by Support team member!", type: "info" },
  { msg: "AI analysis: Turnover risk in Sales has escalated to High!", type: "error" },
  { msg: "Alexander Wright recognized Helena Vance on the Wall!", type: "success" },
  { msg: "Workspace settings synchronized with Slack hook!", type: "warning" },
  { msg: "Quarterly engagement pulse response rate hit 94%!", type: "success" },
  { msg: "Manager effectiveness score dropped below threshold in Engineering.", type: "error" },
  { msg: "New 360° review cycle launched for Q3 2026.", type: "info" },
  { msg: "Employee NPS increased by 12 points this quarter!", type: "success" },
];

export default function PrototypeController() {
  const router = useRouter();
  const pathname = usePathname();

  const [showPanel, setShowPanel] = useState(false);

  const {
    role,
    dashboardState,
    toasts,
    setRole,
    setDashboardState,
    addToast,
    isDemoModalOpen,
  } = useProtoStore();

  const isDashboard = pathname?.startsWith("/dashboard");
  const isAuthPage = pathname === "/signin" || pathname === "/signup" || pathname === "/demo";

  const handleTriggerToast = () => {
    const picked = RANDOM_ALERTS[Math.floor(Math.random() * RANDOM_ALERTS.length)];
    addToast(picked.type, picked.msg);
  };

  if (isAuthPage || isDemoModalOpen) {
    return null;
  }

  return (
    <>
      {/* Global Toast Stack */}
      <div className="toast-stack">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast-item ${toast.type}`}>
            {toast.type === "success" && <CheckCircle2 size={14} />}
            {toast.type === "warning" && <AlertTriangle size={14} />}
            {toast.type === "info" && <Info size={14} />}
            {toast.type === "error" && <XCircle size={14} />}
            <span>{toast.message}</span>
          </div>
        ))}
      </div>

      {/* Controller Floating Panel */}
      <div className={`proto-controller ${isAuthPage ? "proto-controller--auth" : ""}`}>
        <button
          className="proto-controller__btn"
          onClick={() => setShowPanel(!showPanel)}
          aria-label="Toggle Prototype Controller"
        >
          <Sliders size={14} className="control-icon" />
          <span>Prototype Controller</span>
          <span className="pulse-dot" />
        </button>

        {showPanel && (
          <div className="proto-controller__panel">
            <div className="proto-controller__header">
              <div className="proto-controller__title">
                <Sparkles size={16} className="sparkle-icon" />
                <span>Simulator Tools</span>
              </div>
              <span className="status-badge">ACTIVE</span>
            </div>

            {/* Quick View Navigator */}
            <div className="proto-controller__group">
              <span className="group-label">Quick View Navigator</span>
              <div className="btn-grid-2">
                <button
                  className={`btn-sim ${!isDashboard ? "active-sim" : ""}`}
                  onClick={() => {
                    router.push("/");
                    setShowPanel(false);
                  }}
                >
                  <Home size={13} />
                  <span>Landing</span>
                </button>
                <button
                  className={`btn-sim ${isDashboard ? "active-sim" : ""}`}
                  onClick={() => {
                    router.push("/dashboard");
                    setShowPanel(false);
                  }}
                >
                  <LayoutDashboard size={13} />
                  <span>Dashboard</span>
                </button>
              </div>
            </div>

            {/* Persona Role Switcher */}
            <div className="proto-controller__group">
              <span className="group-label">Persona Role Switcher</span>
              <div className="btn-grid-2">
                <button
                  className={`btn-sim ${role === "executive" ? "active-sim" : ""}`}
                  onClick={() => setRole("executive")}
                >
                  <Briefcase size={13} />
                  <span>Executive</span>
                </button>
                <button
                  className={`btn-sim ${role === "hr" ? "active-sim" : ""}`}
                  onClick={() => setRole("hr")}
                >
                  <Heart size={13} />
                  <span>HR Manager</span>
                </button>
                <button
                  className={`btn-sim ${role === "manager" ? "active-sim" : ""}`}
                  onClick={() => setRole("manager")}
                >
                  <Users size={13} />
                  <span>Dept Manager</span>
                </button>
                <button
                  className={`btn-sim ${role === "employee" ? "active-sim" : ""}`}
                  onClick={() => setRole("employee")}
                >
                  <User size={13} />
                  <span>Employee</span>
                </button>
              </div>
            </div>

            {/* App State Sim */}
            <div className="proto-controller__group">
              <span className="group-label">App State Sim</span>
              <div className="btn-grid-2">
                <button
                  className={`btn-sim ${dashboardState === "success" ? "active-sim" : ""}`}
                  onClick={() => setDashboardState("success")}
                >
                  <CheckCircle2 size={13} />
                  <span>Success</span>
                </button>
                <button
                  className={`btn-sim ${dashboardState === "loading" ? "active-sim" : ""}`}
                  onClick={() => {
                    setDashboardState("loading");
                    setTimeout(() => setDashboardState("success"), 1500);
                  }}
                >
                  <Loader2 size={13} className="animate-spin" />
                  <span>Loading</span>
                </button>
                <button
                  className={`btn-sim ${dashboardState === "empty" ? "active-sim" : ""}`}
                  onClick={() => setDashboardState("empty")}
                >
                  <Inbox size={13} />
                  <span>Empty</span>
                </button>
                <button
                  className={`btn-sim ${dashboardState === "error" ? "active-sim" : ""}`}
                  onClick={() => setDashboardState("error")}
                >
                  <AlertCircle size={13} />
                  <span>Error</span>
                </button>
              </div>
            </div>

            {/* Alert Dispatcher Card */}
            <div className="alert-dispatcher-card">
              <div className="dispatcher-info">
                <strong>Generate alert notifications</strong>
                <p>Simulate anonymous pulses, updates, and HR escalations.</p>
              </div>
              <button
                className="dispatch-btn"
                onClick={handleTriggerToast}
                title="Send Random Notification"
              >
                <Bell size={14} className="bell-icon" />
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", lineHeight: "1.1" }}>
                  <span>Send</span>
                  <span>Toast</span>
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
