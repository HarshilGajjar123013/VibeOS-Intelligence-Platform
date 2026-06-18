import React, { useState } from "react";
import {
  User,
  Settings,
  Shield,
  Bell,
  Layers,
  HelpCircle,
  Lock,
  Globe,
  CreditCard,
  Link2,
  Building2,
  ChevronRight,
  CheckCircle2,
  ExternalLink,
  Search,
  Sparkles,
  X
} from "lucide-react";
import { useProtoStore } from "@/src/store/useProtoStore";

export default function SettingsModule() {
  const [activeTab, setActiveTab] = useState("profile");
  const { addToast } = useProtoStore();

  // Profile Form States
  const [profileName, setProfileName] = useState("Alexander Wright");
  const [profileEmail, setProfileEmail] = useState("alexander@vibetech.com");
  const [profileTitle, setProfileTitle] = useState("Chief Executive Officer");
  const [profileDept, setProfileDept] = useState("Executive Leadership");

  // Org Form States
  const [orgName, setOrgName] = useState("VibeTech Inc.");
  const [orgSubdomain, setOrgSubdomain] = useState("vibetech");
  const [orgWhitelist, setOrgWhitelist] = useState("vibetech.com, vibetech.io");
  const [orgLocation, setOrgLocation] = useState("San Francisco, CA");

  // Plan State
  const [currentPlan, setCurrentPlan] = useState<"starter" | "growth" | "enterprise">("growth");
  const [showPlanModal, setShowPlanModal] = useState(false);

  // FAQ Search
  const [faqSearch, setFaqSearch] = useState("");

  const [toggles, setToggles] = useState({
    twoFactor: true,
    slackSync: true,
    weeklyDigest: false,
    anonymousSurveys: true
  });

  const handleToggle = (key: keyof typeof toggles) => {
    setToggles(prev => {
      const nextVal = !prev[key];
      addToast("success", `${key.replace(/([A-Z])/g, " $1")} updated.`);
      return { ...prev, [key]: nextVal };
    });
  };

  const [integrations, setIntegrations] = useState([
    { id: "slack", name: "Slack Integration", desc: "Sync employee groups and dispatch surveys directly in channels.", icon: "💬", connected: true },
    { id: "teams", name: "Microsoft Teams", desc: "Send direct message pulse links to workers via Teams bot.", icon: "👥", connected: false },
    { id: "bamboo", name: "BambooHR", desc: "Auto-sync user database rosters on a daily cadence.", icon: "🌿", connected: false },
    { id: "google", name: "Google Workspace", desc: "Directory sync and calendar integration for scheduling surveys.", icon: "📧", connected: true },
    { id: "workday", name: "Workday HCM", desc: "Bi-directional HRIS data sync for employee lifecycle events.", icon: "🔄", connected: false },
    { id: "linear", name: "Linear (Project Tracking)", desc: "Link engagement data with team velocity and sprint health.", icon: "📐", connected: false }
  ]);

  const toggleIntegration = (id: string) => {
    const target = integrations.find(i => i.id === id);
    const newState = !target?.connected;
    setIntegrations(prev =>
      prev.map(item =>
        item.id === id ? { ...item, connected: !item.connected } : item
      )
    );
    addToast(
      newState ? "success" : "info",
      newState ? `${target?.name} connected successfully!` : `${target?.name} disconnected.`
    );
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: <User size={14} /> },
    { id: "organization", label: "Organization", icon: <Building2 size={14} /> },
    { id: "security", label: "Security & 2FA", icon: <Shield size={14} /> },
    { id: "integrations", label: "Integrations", icon: <Link2 size={14} /> },
    { id: "billing", label: "Billing & Plans", icon: <CreditCard size={14} /> },
    { id: "help", label: "Help Center", icon: <HelpCircle size={14} /> }
  ];

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    addToast("success", "Profile configuration saved successfully!");
  };

  const handleOrgSave = (e: React.FormEvent) => {
    e.preventDefault();
    addToast("success", "Organization workspace controls updated!");
  };

  const handleUpgradePlan = (plan: "starter" | "growth" | "enterprise") => {
    setCurrentPlan(plan);
    setShowPlanModal(false);
    addToast("success", `Workspace subscription updated to ${plan.toUpperCase()} Tier.`);
  };

  // FAQ List
  const faqs = [
    {
      q: "How does the AI sentiment scoring filter individual identifiers?",
      a: "Our sentiment processor parses responses through an aggregation layer, stripping away pronouns and proper names while retaining the emotional metrics. Data is pooled in groups of five or more before reports are compiled."
    },
    {
      q: "Can managers inspect individual survey submissions?",
      a: "No. Submissions are pooled in aggregates of five or more. Individual ratings or texts are never exposed to managers, securing complete cryptographic anonymity."
    },
    {
      q: "How is the burnout risk category calculated?",
      a: "Burnout risk is tracked across metrics for workload capacity, overtime reports, recognition rates, and self-checked stress ratings over a rolling 30-day window."
    },
    {
      q: "How are engagement and culture scores calculated?",
      a: "Our Culture Health Index aggregates metrics across six key drivers: Trust, Alignment, Recognition, Connection, Well-being, and Growth. These are calibrated against industry-specific benchmarks."
    },
    {
      q: "Can we export reports for board meetings?",
      a: "Yes. Our Reports Center allows you to compile Executive Summaries, Department Heatmaps, or Sentiment Trends. Export instantly into vector PDF, Excel spreadsheets, or editable PowerPoint slides."
    }
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.q.toLowerCase().includes(faqSearch.toLowerCase()) || 
    faq.a.toLowerCase().includes(faqSearch.toLowerCase())
  );

  return (
    <div className="settings-module v-animate-slide-up" style={{ position: "relative" }}>
      {/* Plan Upgrade Modal */}
      {showPlanModal && (
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
              maxWidth: "500px",
              padding: "24px",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              animation: "scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
            }}
          >
            <div style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "12px", marginBottom: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h4 style={{ margin: 0, fontSize: "15px", fontWeight: 800 }}>Manage Subscription Level</h4>
              <button 
                onClick={() => setShowPlanModal(false)}
                style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--text-secondary)", fontSize: "14px", fontWeight: 800 }}
              >
                ✕
              </button>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { tier: "starter" as const, name: "Starter Tier", price: "$4/employee/mo", desc: "Basic pulse surveys, core feedback feeds, 50 seats." },
                { tier: "growth" as const, name: "Growth Tier", price: "$8/employee/mo", desc: "AI insights theme builder, department breakdowns, 500 seats." },
                { tier: "enterprise" as const, name: "Enterprise Tier", price: "$12/employee/mo", desc: "Bi-directional HRIS integration, custom SLA support, unlimited seats." }
              ].map(plan => (
                <div 
                  key={plan.tier}
                  style={{
                    padding: "16px",
                    borderRadius: "var(--radius-sm)",
                    border: `2px solid ${currentPlan === plan.tier ? "var(--color-indigo)" : "var(--border-color)"}`,
                    background: currentPlan === plan.tier ? "var(--color-indigo-glow)" : "var(--bg-main)",
                    cursor: "pointer",
                    transition: "all 0.15s ease"
                  }}
                  onClick={() => handleUpgradePlan(plan.tier)}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "4px" }}>
                    <strong style={{ fontSize: "14px", color: "var(--text-primary)" }}>{plan.name}</strong>
                    <span style={{ fontSize: "13px", fontWeight: 850, color: "var(--color-indigo)" }}>{plan.price}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: "11px", color: "var(--text-secondary)", lineHeight: 1.4 }}>{plan.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="executive-dashboard__header" style={{ marginBottom: "20px" }}>
        <div>
          <h2 className="executive-dashboard__title" style={{ fontSize: "24px", fontWeight: 800 }}>Workspace Settings</h2>
          <p className="executive-dashboard__subtitle" style={{ color: "var(--text-secondary)" }}>Manage connected platforms, adjust security protocols, or upgrade subscription levels.</p>
        </div>
      </div>

      <div className="settings-module__grid" style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: "24px" }}>
        {/* Left Tabs */}
        <div 
          className="settings-module__tabs"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "6px"
          }}
        >
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`settings-module__tab-btn ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "12px 16px",
                borderRadius: "var(--radius-sm)",
                border: "none",
                textAlign: "left",
                fontSize: "13px",
                fontWeight: 700,
                cursor: "pointer",
                background: activeTab === tab.id ? "var(--color-indigo-glow)" : "transparent",
                color: activeTab === tab.id ? "var(--color-indigo)" : "var(--text-secondary)",
                transition: "all 0.15s ease"
              }}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Right Panel */}
        <div 
          className="settings-module__panel"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-color)",
            padding: "24px",
            borderRadius: "var(--radius-lg)"
          }}
        >
          {/* ===================== PROFILE ===================== */}
          {activeTab === "profile" && (
            <form onSubmit={handleProfileSave} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "800" }}>Profile Configuration</h3>

              {/* Avatar area */}
              <div style={{ display: "flex", alignItems: "center", gap: "16px", paddingBottom: "16px", borderBottom: "1px solid var(--border-color)" }}>
                <div style={{
                  width: "56px", height: "56px", borderRadius: "50%", overflow: "hidden",
                  border: "2px solid var(--color-indigo)", flexShrink: 0
                }}>
                  <img
                    src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="Profile"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div>
                  <div style={{ fontWeight: "800", fontSize: "15px" }}>{profileName}</div>
                  <div style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: "600" }}>CEO & Co-founder • Executive Role</div>
                </div>
                <button 
                  type="button" 
                  className="settings-btn" 
                  style={{ marginLeft: "auto", fontSize: "11px", padding: "6px 12px" }}
                  onClick={() => addToast("info", "Photo upload simulation triggered.")}
                >
                  Change Photo
                </button>
              </div>

              <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <label style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>Full Name</label>
                <input 
                  type="text" 
                  value={profileName} 
                  onChange={(e) => setProfileName(e.target.value)} 
                  style={{ padding: "8px 12px", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)", background: "var(--bg-main)", color: "var(--text-primary)", fontSize: "13px" }}
                />
              </div>
              
              <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <label style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>Email Address</label>
                <input 
                  type="email" 
                  value={profileEmail} 
                  onChange={(e) => setProfileEmail(e.target.value)} 
                  style={{ padding: "8px 12px", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)", background: "var(--bg-main)", color: "var(--text-primary)", fontSize: "13px" }}
                />
              </div>

              <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <label style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>Job Title</label>
                <input 
                  type="text" 
                  value={profileTitle} 
                  onChange={(e) => setProfileTitle(e.target.value)} 
                  style={{ padding: "8px 12px", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)", background: "var(--bg-main)", color: "var(--text-primary)", fontSize: "13px" }}
                />
              </div>

              <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <label style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>Department</label>
                <input 
                  type="text" 
                  value={profileDept} 
                  onChange={(e) => setProfileDept(e.target.value)} 
                  style={{ padding: "8px 12px", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)", background: "var(--bg-main)", color: "var(--text-primary)", fontSize: "13px" }}
                />
              </div>

              <button 
                type="submit" 
                className="settings-btn"
                style={{
                  alignSelf: "flex-start",
                  border: "none",
                  background: "var(--color-indigo)",
                  color: "#fff",
                  padding: "8px 16px",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "12px",
                  fontWeight: 700,
                  cursor: "pointer"
                }}
              >
                Save Profile Configuration
              </button>
            </form>
          )}

          {/* ===================== ORGANIZATION ===================== */}
          {activeTab === "organization" && (
            <form onSubmit={handleOrgSave} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "800" }}>Workspace Controls</h3>

              {/* Company summary card */}
              <div style={{
                padding: "16px", borderRadius: "12px",
                background: "linear-gradient(135deg, rgba(79, 70, 229, 0.06) 0%, rgba(59, 130, 246, 0.06) 100%)",
                border: "1px solid rgba(79, 70, 229, 0.12)",
                display: "flex", justifyContent: "space-between", alignItems: "center"
              }}>
                <div>
                  <div style={{ fontSize: "11px", fontWeight: "700", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Active Workspace</div>
                  <div style={{ fontSize: "18px", fontWeight: "850", color: "var(--color-indigo)", marginTop: "2px" }}>{orgName}</div>
                </div>
                <span style={{ fontSize: "10px", fontWeight: 700, color: "var(--color-emerald)", background: "rgba(16, 185, 129, 0.1)", padding: "2px 8px", borderRadius: "10px" }}>350 Employees</span>
              </div>

              <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <label style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>Organization Workspace Name</label>
                <input 
                  type="text" 
                  value={orgName} 
                  onChange={(e) => setOrgName(e.target.value)} 
                  style={{ padding: "8px 12px", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)", background: "var(--bg-main)", color: "var(--text-primary)", fontSize: "13px" }}
                />
              </div>

              <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <label style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>Company Subdomain</label>
                <input 
                  type="text" 
                  value={orgSubdomain} 
                  onChange={(e) => setOrgSubdomain(e.target.value)} 
                  style={{ padding: "8px 12px", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)", background: "var(--bg-main)", color: "var(--text-primary)", fontSize: "13px" }}
                />
              </div>

              <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <label style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>Authorized Domain Whitelist</label>
                <input 
                  type="text" 
                  value={orgWhitelist} 
                  onChange={(e) => setOrgWhitelist(e.target.value)} 
                  style={{ padding: "8px 12px", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)", background: "var(--bg-main)", color: "var(--text-primary)", fontSize: "13px" }}
                />
              </div>

              <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <label style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>Headquarters Location</label>
                <input 
                  type="text" 
                  value={orgLocation} 
                  onChange={(e) => setOrgLocation(e.target.value)} 
                  style={{ padding: "8px 12px", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)", background: "var(--bg-main)", color: "var(--text-primary)", fontSize: "13px" }}
                />
              </div>

              <button 
                type="submit" 
                className="settings-btn"
                style={{
                  alignSelf: "flex-start",
                  border: "none",
                  background: "var(--color-indigo)",
                  color: "#fff",
                  padding: "8px 16px",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "12px",
                  fontWeight: 700,
                  cursor: "pointer"
                }}
              >
                Save Workspace Info
              </button>
            </form>
          )}

          {/* ===================== SECURITY ===================== */}
          {activeTab === "security" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "800" }}>Security & Privacy Controls</h3>

              {[
                { key: "twoFactor" as const, title: "Two-Factor Authentication (2FA)", desc: "Require a security code when logging in from new devices.", icon: <Lock size={16} style={{ color: "var(--color-indigo)" }} /> },
                { key: "anonymousSurveys" as const, title: "Enforce Anonymous Survey Protocols", desc: "Strip identification hashes from raw sentiment pulse submissions.", icon: <Shield size={16} style={{ color: "#10b981" }} /> },
                { key: "slackSync" as const, title: "Auto-Sync Slack Channels", desc: "Automatically map new Slack channels to department groups.", icon: <Globe size={16} style={{ color: "#3b82f6" }} /> },
                { key: "weeklyDigest" as const, title: "Weekly Engagement Digest Email", desc: "Send automated weekly culture health summary to admins.", icon: <Bell size={16} style={{ color: "#f59e0b" }} /> }
              ].map(item => (
                <div key={item.key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border-color)", paddingBottom: "14px" }}>
                  <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <div style={{ marginTop: "2px" }}>{item.icon}</div>
                    <div>
                      <div style={{ fontWeight: "700", fontSize: "13px" }}>{item.title}</div>
                      <div style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: "600", marginTop: "2px" }}>{item.desc}</div>
                    </div>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" checked={toggles[item.key]} onChange={() => handleToggle(item.key)} />
                    <span className="toggle-slider" />
                  </label>
                </div>
              ))}

              {/* Session info */}
              <div style={{ padding: "14px", borderRadius: "10px", background: "var(--bg-main)", border: "1px solid var(--border-color)" }}>
                <div style={{ fontSize: "12px", fontWeight: "700", marginBottom: "8px" }}>Active Sessions</div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "var(--text-muted)" }}>
                  <span>Chrome • Windows — San Francisco, CA</span>
                  <span style={{ fontSize: "10px", fontWeight: 700, color: "var(--color-emerald)", background: "rgba(16, 185, 129, 0.1)", padding: "2px 8px", borderRadius: "10px" }}>Current</span>
                </div>
              </div>
            </div>
          )}

          {/* ===================== INTEGRATIONS ===================== */}
          {activeTab === "integrations" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "800" }}>Roster & Chat Integrations</h3>
                <span style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: "700" }}>
                  {integrations.filter(i => i.connected).length} of {integrations.length} connected
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {integrations.map(integ => (
                  <div key={integ.id} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "14px", borderRadius: "12px",
                    border: `1px solid ${integ.connected ? "rgba(16, 185, 129, 0.2)" : "var(--border-color)"}`,
                    background: integ.connected ? "rgba(16, 185, 129, 0.03)" : "transparent",
                    transition: "all 200ms"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <span style={{ fontSize: "22px" }}>{integ.icon}</span>
                      <div>
                        <div style={{ fontWeight: "700", fontSize: "13px", display: "flex", alignItems: "center", gap: "6px" }}>
                          {integ.name}
                          {integ.connected && <CheckCircle2 size={12} style={{ color: "#10b981" }} />}
                        </div>
                        <div style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: "600", marginTop: "1px" }}>{integ.desc}</div>
                      </div>
                    </div>
                    <button
                      className={`settings-btn ${integ.connected ? "settings-btn--disconnect" : ""}`}
                      style={{
                        fontSize: "11px",
                        padding: "6px 14px",
                        border: "1px solid var(--border-color)",
                        borderRadius: "var(--radius-sm)",
                        background: integ.connected ? "rgba(239, 68, 68, 0.1)" : "transparent",
                        color: integ.connected ? "var(--color-rose)" : "var(--text-primary)",
                        cursor: "pointer"
                      }}
                      onClick={() => toggleIntegration(integ.id)}
                    >
                      {integ.connected ? "Disconnect" : "Connect"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===================== BILLING ===================== */}
          {activeTab === "billing" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "800" }}>Plan & Billing</h3>
                <span style={{ fontSize: "10px", fontWeight: 700, color: "var(--color-emerald)", background: "rgba(16, 185, 129, 0.1)", padding: "2px 8px", borderRadius: "10px" }}>Active Plan</span>
              </div>

              {/* Current plan card */}
              <div style={{
                padding: "20px", borderRadius: "14px",
                background: "linear-gradient(135deg, rgba(79, 70, 229, 0.08) 0%, rgba(59, 130, 246, 0.06) 100%)",
                border: "1px solid rgba(79, 70, 229, 0.15)",
                display: "flex", justifyContent: "space-between", alignItems: "center"
              }}>
                <div>
                  <div style={{ fontSize: "20px", fontWeight: "850", color: "var(--color-indigo)", textTransform: "capitalize" }}>{currentPlan} Tier</div>
                  <div style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "4px", fontWeight: "600" }}>
                    {currentPlan === "starter" ? "$4" : currentPlan === "growth" ? "$8" : "$12"} / employee / month • {currentPlan === "starter" ? "50" : currentPlan === "growth" ? "350" : "Unlimited"} seats active
                  </div>
                  <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "2px" }}>Next billing date: July 1, 2026</div>
                </div>
                <button 
                  className="settings-btn" 
                  onClick={() => setShowPlanModal(true)}
                  style={{
                    border: "none",
                    background: "var(--color-indigo)",
                    color: "#fff",
                    padding: "8px 16px",
                    borderRadius: "var(--radius-sm)",
                    fontSize: "12px",
                    fontWeight: 700,
                    cursor: "pointer"
                  }}
                >
                  Manage Plan
                </button>
              </div>

              {/* Usage summary */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
                {[
                  { label: "Active Seats", value: currentPlan === "starter" ? "50/50" : currentPlan === "growth" ? "350/500" : "350/∞", sub: "seat usage" },
                  { label: "Surveys Sent", value: "1,247", sub: "this billing cycle" },
                  { label: "Storage Used", value: "24.6 GB", sub: "of 50 GB" }
                ].map((item, idx) => (
                  <div key={idx} style={{
                    padding: "14px", borderRadius: "10px",
                    border: "1px solid var(--border-color)", textAlign: "center",
                    background: "var(--bg-main)"
                  }}>
                    <div style={{ fontSize: "11px", fontWeight: "700", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{item.label}</div>
                    <div style={{ fontSize: "20px", fontWeight: "850", marginTop: "4px", color: "var(--text-primary)" }}>{item.value}</div>
                    <div style={{ fontSize: "10px", color: "var(--text-muted)" }}>{item.sub}</div>
                  </div>
                ))}
              </div>

              {/* Payment method */}
              <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "16px" }}>
                <div style={{ fontSize: "13px", fontWeight: "700", marginBottom: "10px" }}>Payment Method</div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "13px" }}>
                  <CreditCard size={18} style={{ color: "var(--color-indigo)" }} />
                  <span style={{ fontWeight: "600" }}>•••• •••• •••• 4242</span>
                  <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>Expires 12/28</span>
                  <button 
                    className="settings-btn" 
                    style={{ marginLeft: "auto", fontSize: "11px", padding: "6px 12px", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)", cursor: "pointer", background: "transparent" }}
                    onClick={() => addToast("info", "Payment updates simulated.")}
                  >
                    Update Card
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ===================== HELP CENTER ===================== */}
          {activeTab === "help" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "800" }}>Knowledge Base & Support</h3>
              <p style={{ fontSize: "13px", color: "var(--text-muted)", margin: 0, fontWeight: "600" }}>
                Browse guides and learn about anonymous metrics, AI insights, and engagement calculations.
              </p>

              {/* FAQ Search Bar */}
              <div style={{ position: "relative" }}>
                <Search size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                <input 
                  type="text" 
                  placeholder="Search frequently asked questions..." 
                  value={faqSearch}
                  onChange={(e) => setFaqSearch(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 14px 10px 36px",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--border-color)",
                    backgroundColor: "var(--bg-main)",
                    color: "var(--text-primary)",
                    fontSize: "13px"
                  }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {filteredFaqs.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "20px", color: "var(--text-muted)", fontSize: "12px" }}>
                    No matching guides found. Try searching for "anonymity" or "burnout".
                  </div>
                ) : (
                  filteredFaqs.map((guide, idx) => (
                    <details key={idx} style={{
                      padding: "14px 16px", borderRadius: "10px",
                      border: "1px solid var(--border-color)",
                      cursor: "pointer",
                      background: "var(--bg-main)"
                    }}>
                      <summary style={{ fontWeight: "700", fontSize: "13px", lineHeight: "1.4", listStyle: "none", display: "flex", alignItems: "center", gap: "8px" }}>
                        <ChevronRight size={14} style={{ color: "var(--color-indigo)", flexShrink: 0 }} />
                        {guide.q}
                      </summary>
                      <p style={{ fontSize: "12.5px", lineHeight: 1.6, color: "var(--text-secondary)", marginTop: "10px", paddingLeft: "22px", fontWeight: "500" }}>
                        {guide.a}
                      </p>
                    </details>
                  ))
                )}
              </div>

              <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "16px", textAlign: "center" }}>
                <p style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "10px" }}>Need direct technical assistance?</p>
                <button 
                  className="settings-btn" 
                  style={{ display: "inline-flex", alignItems: "center", gap: "6px", border: "1px solid var(--border-color)", padding: "8px 16px", borderRadius: "var(--radius-sm)", cursor: "pointer", background: "transparent" }}
                  onClick={() => addToast("info", "Opening support ticket portal...")}
                >
                  <ExternalLink size={14} /> Contact Support Team
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
