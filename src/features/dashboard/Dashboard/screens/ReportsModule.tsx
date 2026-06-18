import React, { useState } from "react";
import {
  FileText,
  Download,
  Calendar,
  Activity,
  Clock,
  Plus,
  Sparkles,
  CheckCircle,
  FileSpreadsheet,
  Settings,
  Mail
} from "lucide-react";
import { mockReports } from "../utils/mockData";

interface ReportItem {
  id: string;
  title: string;
  type: "weekly" | "monthly" | "quarterly" | "executive" | "survey";
  date: string;
  size: string;
}

export default function ReportsModule() {
  const [reports, setReports] = useState<ReportItem[]>(mockReports);
  
  // Custom compiler states
  const [compileType, setCompileType] = useState<ReportItem["type"]>("weekly");
  const [compileDept, setCompileDept] = useState("all");
  const [compileFormat, setCompileFormat] = useState("pdf");
  const [isCompiling, setIsCompiling] = useState(false);
  const [compileProgress, setCompileProgress] = useState(0);

  // Scheduler states
  const [scheduleEmail, setScheduleEmail] = useState("");
  const [scheduleCadence, setScheduleCadence] = useState("weekly");

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCompile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCompiling(true);
    setCompileProgress(0);

    const interval = setInterval(() => {
      setCompileProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            const newReport: ReportItem = {
              id: `rep-${Date.now()}`,
              title: `${compileDept === "all" ? "Organization-wide" : compileDept} ${compileType.toUpperCase()} Culture Report`,
              type: compileType,
              date: "Just now",
              size: compileFormat === "pdf" ? "1.8 MB" : compileFormat === "xlsx" ? "640 KB" : "4.2 MB"
            };
            setReports(prevList => [newReport, ...prevList]);
            setIsCompiling(false);
            showToast("Report compiled successfully and appended to library.");
          }, 300);
          return 100;
        }
        return prev + 25;
      });
    }, 250);
  };

  const handleDownload = (title: string, format: string) => {
    showToast(`Downloading: ${title} (${format.toUpperCase()})`);
  };

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scheduleEmail.trim()) return;
    showToast(`Scheduled automated delivery to ${scheduleEmail} (${scheduleCadence})`);
    setScheduleEmail("");
  };

  return (
    <div className="reports-module v-animate-slide-up" style={{ position: "relative" }}>
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

      <div className="executive-dashboard__header" style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "16px", marginBottom: "24px" }}>
        <div>
          <h2 className="executive-dashboard__title" style={{ fontSize: "24px", fontWeight: 800 }}>Reports & Executive Summaries</h2>
          <p className="executive-dashboard__subtitle" style={{ color: "var(--text-secondary)" }}>Compile historical survey charts, trigger data downloads, or schedule recurring email briefings.</p>
        </div>
      </div>

      <div className="v-grid-2-1" style={{ display: "grid", gridTemplateColumns: "1.3fr 0.7fr", gap: "24px", marginBottom: "24px" }}>
        {/* Available Reports list */}
        <div className="dashboard-card" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", padding: "24px", borderRadius: "var(--radius-lg)" }}>
          <div className="dashboard-card__header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h3 className="dashboard-card__title" style={{ fontSize: "16px", fontWeight: 700, display: "flex", alignItems: "center", gap: "8px" }}>
              <FileText size={16} className="text-indigo-500" /> Available Reports
            </h3>
            <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-muted)" }}>{reports.length} Reports logged</span>
          </div>

          <div className="dashboard-card__body">
            <div className="data-table-container" style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid var(--border-color)", color: "var(--text-muted)", fontSize: "11px", fontWeight: 800, textTransform: "uppercase" }}>
                    <th style={{ padding: "12px", textAlign: "left" }}>Report Title</th>
                    <th style={{ padding: "12px", textAlign: "left" }}>Classification</th>
                    <th style={{ padding: "12px", textAlign: "left" }}>Published Date</th>
                    <th style={{ padding: "12px", textAlign: "left" }}>File Size</th>
                    <th style={{ padding: "12px", textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map((report) => (
                    <tr 
                      key={report.id} 
                      style={{ borderBottom: "1px solid var(--border-color)", fontSize: "13px" }}
                      className="dashboard-table-row"
                    >
                      <td style={{ padding: "14px 12px", fontWeight: "800", color: "var(--text-primary)" }}>{report.title}</td>
                      <td style={{ padding: "14px 12px" }}>
                        <span 
                          style={{
                            fontSize: "10px",
                            fontWeight: 800,
                            padding: "2px 8px",
                            borderRadius: "10px",
                            textTransform: "uppercase",
                            backgroundColor: report.type === "executive" ? "rgba(99, 102, 241, 0.1)" : report.type === "survey" ? "rgba(16, 185, 129, 0.1)" : "rgba(107, 114, 128, 0.1)",
                            color: report.type === "executive" ? "var(--color-indigo)" : report.type === "survey" ? "var(--color-emerald)" : "var(--text-secondary)"
                          }}
                        >
                          {report.type}
                        </span>
                      </td>
                      <td style={{ padding: "14px 12px", color: "var(--text-secondary)" }}>{report.date}</td>
                      <td style={{ padding: "14px 12px", color: "var(--text-muted)" }}>{report.size}</td>
                      <td style={{ padding: "14px 12px", textAlign: "right" }}>
                        <div style={{ display: "flex", justifyContent: "flex-end", gap: "6px" }}>
                          <button 
                            onClick={() => handleDownload(report.title, "pdf")} 
                            className="bm-top-nav__workspace-select" 
                            style={{ padding: "4px 8px", fontSize: "11px", cursor: "pointer" }}
                          >
                            PDF
                          </button>
                          <button 
                            onClick={() => handleDownload(report.title, "csv")} 
                            className="bm-top-nav__workspace-select" 
                            style={{ padding: "4px 8px", fontSize: "11px", cursor: "pointer" }}
                          >
                            CSV
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Compile Panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Custom compiler card */}
          <div className="dashboard-card" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", padding: "24px", borderRadius: "var(--radius-lg)" }}>
            <h3 style={{ margin: "0 0 16px 0", fontSize: "15px", fontWeight: "800", display: "flex", alignItems: "center", gap: "8px" }}>
              <Plus size={16} className="text-indigo-500" /> Compile Custom Report
            </h3>
            
            <form onSubmit={handleCompile} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <label style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>Report Focus</label>
                <select 
                  value={compileType} 
                  onChange={(e) => setCompileType(e.target.value as any)}
                  style={{ padding: "8px 10px", fontSize: "13px", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)", background: "var(--bg-main)", color: "var(--text-primary)" }}
                >
                  <option value="weekly">Weekly Pulse Summary</option>
                  <option value="monthly">Monthly Retention Risk</option>
                  <option value="quarterly">Quarterly Culture Deck</option>
                  <option value="executive">Executive Board Report</option>
                </select>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <label style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>Target Department</label>
                <select 
                  value={compileDept} 
                  onChange={(e) => setCompileDept(e.target.value)}
                  style={{ padding: "8px 10px", fontSize: "13px", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)", background: "var(--bg-main)", color: "var(--text-primary)" }}
                >
                  <option value="all">All Departments</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Product">Product</option>
                  <option value="Design">Design</option>
                  <option value="Sales">Sales</option>
                </select>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <label style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>Export Format</label>
                <div style={{ display: "flex", gap: "10px" }}>
                  {[
                    { format: "pdf", label: "Vector PDF" },
                    { format: "xlsx", label: "Excel Data" },
                    { format: "pptx", label: "PPTX Slides" }
                  ].map((f) => (
                    <label key={f.format} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${compileFormat === f.format ? "var(--color-indigo)" : "var(--border-color)"}`, background: compileFormat === f.format ? "var(--color-indigo-glow)" : "transparent", padding: "8px 0", borderRadius: "4px", fontSize: "12px", cursor: "pointer", fontWeight: 700 }}>
                      <input 
                        type="radio" 
                        name="format" 
                        value={f.format} 
                        checked={compileFormat === f.format}
                        onChange={() => setCompileFormat(f.format)}
                        style={{ display: "none" }}
                      />
                      {f.label}
                    </label>
                  ))}
                </div>
              </div>

              {isCompiling ? (
                <div style={{ marginTop: "10px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", fontWeight: 700, marginBottom: "4px" }}>
                    <span>Compiling Report...</span>
                    <span>{compileProgress}%</span>
                  </div>
                  <div style={{ width: "100%", height: "6px", backgroundColor: "var(--bg-main)", borderRadius: "3px", overflow: "hidden" }}>
                    <div style={{ width: `${compileProgress}%`, height: "100%", backgroundColor: "var(--color-indigo)", transition: "width 0.2s" }} />
                  </div>
                </div>
              ) : (
                <button 
                  type="submit"
                  className="executive-dashboard__action-btn"
                  style={{ width: "100%", padding: "10px", marginTop: "10px", cursor: "pointer" }}
                >
                  Compile Custom Report
                </button>
              )}
            </form>
          </div>

          {/* Automated scheduler */}
          <div className="dashboard-card" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", padding: "24px", borderRadius: "var(--radius-lg)" }}>
            <h3 style={{ margin: "0 0 16px 0", fontSize: "15px", fontWeight: "800", display: "flex", alignItems: "center", gap: "8px" }}>
              <Clock size={16} className="text-indigo-500" /> Schedule Deliveries
            </h3>
            
            <form onSubmit={handleScheduleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <label style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>Target Email Address</label>
                <input 
                  type="email" 
                  placeholder="e.g. board@acme.com" 
                  value={scheduleEmail}
                  onChange={(e) => setScheduleEmail(e.target.value)}
                  style={{ padding: "8px 10px", fontSize: "13px", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)", background: "var(--bg-main)", color: "var(--text-primary)" }}
                  required
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <label style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>Cadence Schedule</label>
                <select 
                  value={scheduleCadence} 
                  onChange={(e) => setScheduleCadence(e.target.value)}
                  style={{ padding: "8px 10px", fontSize: "13px", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)", background: "var(--bg-main)", color: "var(--text-primary)" }}
                >
                  <option value="daily">Daily Briefing (9:00 AM)</option>
                  <option value="weekly">Weekly Monday Recap</option>
                  <option value="monthly">Monthly Retention Forecast</option>
                </select>
              </div>

              <button 
                type="submit"
                className="bm-top-nav__workspace-select"
                style={{ width: "100%", padding: "10px", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", cursor: "pointer", fontWeight: 700 }}
              >
                <Mail size={14} /> Schedule Automated Email
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
