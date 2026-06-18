import React, { useState } from "react";
import {
  Award,
  Users,
  Smile,
  Heart,
  Plus,
  Send,
  Gift,
  Coffee,
  Sparkles,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { mockRecognitions, Recognition } from "../utils/mockData";

export default function RecognitionModule() {
  const [recognitions, setRecognitions] = useState<Recognition[]>(mockRecognitions);
  const [newKudos, setNewKudos] = useState("");
  const [selectedBadge, setSelectedBadge] = useState<"teamwork" | "innovation" | "leadership" | "customer-first" | "grit">("teamwork");
  const [recipientName, setRecipientName] = useState("Alex Chen");
  const [userPoints, setUserPoints] = useState(350);

  const [toast, setToast] = useState<{ message: string; type: "success" | "info" | "error" } | null>(null);

  const triggerToast = (message: string, type: "success" | "info" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const submitKudos = () => {
    if (!newKudos.trim()) {
      triggerToast("Please enter an appreciation message.", "error");
      return;
    }
    const item: Recognition = {
      id: `rec-${Date.now()}`,
      from: "Sarah Mitchell",
      fromAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      to: recipientName,
      toAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      badge: selectedBadge,
      message: newKudos,
      date: "Just now",
      reactions: [{ type: "❤️", count: 1 }],
      commentsCount: 0
    };
    
    setRecognitions(prev => [item, ...prev]);
    setUserPoints(prev => prev + 25);
    setNewKudos("");
    triggerToast(`Kudos posted for ${recipientName}! +25 culture points.`, "success");
  };

  const addReaction = (id: string, symbol: string) => {
    setRecognitions(prev =>
      prev.map(rec => {
        if (rec.id === id) {
          const hasReact = rec.reactions.find((r: any) => r.type === symbol);
          let nextReacts;
          if (hasReact) {
            nextReacts = rec.reactions.map((r: any) => r.type === symbol ? { ...r, count: r.count + 1 } : r);
          } else {
            nextReacts = [...rec.reactions, { type: symbol, count: 1 }];
          }
          return { ...rec, reactions: nextReacts };
        }
        return rec;
      })
    );
  };

  const redeemReward = (cost: number, name: string) => {
    if (userPoints < cost) {
      triggerToast(`Insufficient points. You need ${cost - userPoints} more points for the ${name}.`, "error");
      return;
    }
    setUserPoints(prev => prev - cost);
    triggerToast(`Redeemed! Claim code for your ${name} sent to email.`, "success");
  };

  const badges = ["teamwork", "innovation", "leadership", "customer-first", "grit"];

  const leaderboard = [
    { rank: 1, name: "Emily Rose", score: 48, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", badge: "🥇" },
    { rank: 2, name: "David Kim", score: 42, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", badge: "🥈" },
    { rank: 3, name: "Alex Chen", score: 38, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", badge: "🥉" },
    { rank: 4, name: "Jessica Low", score: 35, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    { rank: 5, name: "Marcus Vance", score: 30, avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" }
  ];

  return (
    <div className="recognition-module v-animate-slide-up" style={{ position: "relative" }}>
      {/* Toast popup */}
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
            border: `1px solid ${toast.type === "error" ? "var(--color-rose)" : "var(--color-indigo)"}`,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            zIndex: 1000
          }}
        >
          {toast.type === "error" ? <AlertCircle size={16} className="text-rose-500" /> : <Sparkles size={16} className="text-amber-400" />}
          <span style={{ fontSize: "13px", fontWeight: 600 }}>{toast.message}</span>
        </div>
      )}

      <div className="executive-dashboard__header" style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "16px", marginBottom: "24px" }}>
        <div>
          <h2 className="executive-dashboard__title" style={{ fontSize: "24px", fontWeight: 800 }}>Teammate Appreciation & Kudos</h2>
          <p className="executive-dashboard__subtitle" style={{ color: "var(--text-secondary)" }}>Celebrate cultural drivers, reward excellence, and redeem reward vouchers.</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", backgroundColor: "var(--bg-card)", padding: "10px 16px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)" }}>
          <Sparkles size={16} className="text-amber-500" />
          <span style={{ fontSize: "13px", fontWeight: 700 }}>My Wallet: <strong style={{ color: "var(--color-indigo)" }}>{userPoints} pts</strong></span>
        </div>
      </div>

      <div className="recognition-module__grid-cols" style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "24px" }}>
        {/* Left Col: Kudos Composer & Wall */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Kudos Composer */}
          <div 
            className="recognition-module__composer"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-color)",
              padding: "24px",
              borderRadius: "var(--radius-lg)",
              display: "flex",
              flexDirection: "column",
              gap: "16px"
            }}
          >
            <h3 style={{ margin: 0, fontSize: "15px", fontWeight: "800", display: "flex", alignItems: "center", gap: "8px" }}>
              <Smile size={16} className="text-indigo-500" /> Share Appreciation Kudos
            </h3>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>Recipient Teammate</label>
                <select 
                  value={recipientName} 
                  onChange={(e) => setRecipientName(e.target.value)} 
                  style={{ padding: "10px", fontSize: "13px", border: "1px solid var(--border-color)", backgroundColor: "var(--bg-main)", color: "var(--text-primary)", borderRadius: "var(--radius-sm)" }}
                >
                  <option value="Alex Chen">Alex Chen (Product)</option>
                  <option value="Emily Rose">Emily Rose (Design)</option>
                  <option value="David Kim">David Kim (Engineering)</option>
                  <option value="Marcus Vance">Marcus Vance (Marketing)</option>
                  <option value="Helena Vance">Helena Vance (Engineering)</option>
                </select>
              </div>

              <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>Core Value Badge</label>
                <select 
                  value={selectedBadge} 
                  onChange={(e) => setSelectedBadge(e.target.value as any)} 
                  style={{ padding: "10px", fontSize: "13px", border: "1px solid var(--border-color)", backgroundColor: "var(--bg-main)", color: "var(--text-primary)", borderRadius: "var(--radius-sm)", textTransform: "capitalize" }}
                >
                  {badges.map(b => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>Message</label>
              <textarea 
                placeholder="What did they do? Highlight specific contributions to help team priorities..."
                value={newKudos}
                onChange={(e) => setNewKudos(e.target.value)}
                rows={3}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--border-color)",
                  backgroundColor: "var(--bg-main)",
                  color: "var(--text-primary)",
                  fontSize: "13px",
                  resize: "none",
                  lineHeight: 1.5
                }}
              />
            </div>

            <button 
              className="executive-dashboard__action-btn"
              style={{ alignSelf: "flex-end", display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}
              onClick={submitKudos}
            >
              <Send size={14} /> Share Appreciation (+25 pts)
            </button>
          </div>

          {/* Kudos Wall */}
          <div className="recognition-module__wall" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {recognitions.map((rec) => (
              <div 
                key={rec.id} 
                className="recognition-module__item"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-color)",
                  padding: "20px",
                  borderRadius: "var(--radius-lg)",
                  display: "flex",
                  gap: "16px",
                  boxShadow: "var(--shadow-sm)",
                  transition: "var(--v-transition)"
                }}
              >
                <div className="avatar-col" style={{ flexShrink: 0 }}>
                  <div className="bm-sidebar__avatar" style={{ width: "40px", height: "40px", borderRadius: "50%", overflow: "hidden", border: "2px solid var(--border-color)" }}>
                    {rec.fromAvatar ? (
                      <img src={rec.fromAvatar} alt="Avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--color-indigo)", color: "#fff", fontWeight: "800" }}>{rec.from.charAt(0)}</div>
                    )}
                  </div>
                </div>
                <div className="content-col" style={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: "10px" }}>
                  <div className="kudos-meta" style={{ fontSize: "12px", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "4px" }}>
                    <strong style={{ color: "var(--text-primary)" }}>{rec.from}</strong>
                    <span className="connector" style={{ color: "var(--text-muted)" }}>recognized</span>
                    <strong style={{ color: "var(--text-primary)" }}>{rec.to}</strong>
                    <span style={{ marginLeft: "auto", fontSize: "10.5px", color: "var(--text-muted)" }}>{rec.date}</span>
                  </div>
                  <div className="message-text" style={{ fontSize: "13.5px", color: "var(--text-primary)", lineHeight: 1.5 }}>
                    "{rec.message}"
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border-color)", paddingTop: "12px", marginTop: "4px" }}>
                    <div className="reactions-row" style={{ display: "flex", gap: "6px" }}>
                      {rec.reactions.map((react: any, idx: number) => (
                        <button 
                          key={idx} 
                          className="reaction-pill" 
                          onClick={() => addReaction(rec.id, react.type)}
                          style={{
                            padding: "4px 8px",
                            borderRadius: "12px",
                            border: "1px solid var(--border-color)",
                            background: "var(--bg-main)",
                            color: "var(--text-primary)",
                            fontSize: "11px",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            transition: "all 0.15s ease"
                          }}
                        >
                          <span>{react.type}</span>
                          <span style={{ fontWeight: 800 }}>{react.count}</span>
                        </button>
                      ))}
                      <button 
                        className="reaction-pill" 
                        style={{
                          padding: "4px 8px",
                          borderRadius: "12px",
                          border: "1px dashed var(--border-color)",
                          background: "transparent",
                          color: "var(--text-muted)",
                          fontSize: "11px",
                          cursor: "pointer"
                        }} 
                        onClick={() => addReaction(rec.id, "🙌")}
                      >
                        + 🙌
                      </button>
                    </div>
                    <span className="badge" style={{ backgroundColor: "rgba(99, 102, 241, 0.1)", color: "var(--color-indigo)", fontSize: "10px", fontWeight: 700, padding: "2px 8px", borderRadius: "10px", textTransform: "uppercase" }}>
                      {rec.badge}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Leaderboard & Rewards Catalog */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Leaderboard Card */}
          <div className="dashboard-card" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", padding: "24px", borderRadius: "var(--radius-lg)" }}>
            <div className="dashboard-card__header" style={{ marginBottom: "16px" }}>
              <h3 className="dashboard-card__title" style={{ fontSize: "16px", fontWeight: 700, display: "flex", alignItems: "center", gap: "8px" }}>
                <Award size={16} className="text-indigo-500" />
                Kudos Leaderboard (Q2)
              </h3>
            </div>
            <div className="dashboard-card__body">
              <div className="leaderboard-list" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {leaderboard.map((item) => (
                  <div 
                    key={item.rank} 
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "10px 14px",
                      borderRadius: "var(--radius-md)",
                      background: "var(--bg-main)",
                      border: "1px solid var(--border-color)"
                    }}
                  >
                    <span style={{ fontSize: "14px", fontWeight: 800, width: "24px", color: "var(--text-muted)" }}>
                      {item.badge ? item.badge : `#${item.rank}`}
                    </span>
                    <div style={{ width: "28px", height: "28px", borderRadius: "50%", overflow: "hidden" }}>
                      <img src={item.avatar} alt="Avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--text-primary)", flexGrow: 1 }}>{item.name}</span>
                    <span style={{ fontSize: "12px", fontWeight: 800, color: "var(--color-indigo)", backgroundColor: "var(--color-indigo-glow)", padding: "2px 8px", borderRadius: "10px" }}>
                      {item.score} kudos
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Rewards Shop Card */}
          <div className="dashboard-card" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", padding: "24px", borderRadius: "var(--radius-lg)" }}>
            <div className="dashboard-card__header" style={{ marginBottom: "16px" }}>
              <h3 className="dashboard-card__title" style={{ fontSize: "16px", fontWeight: 700, display: "flex", alignItems: "center", gap: "8px" }}>
                <Gift size={16} className="text-indigo-500" />
                Redeem Rewards
              </h3>
            </div>
            <div className="dashboard-card__body" style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div 
                style={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "center", 
                  borderBottom: "1px solid var(--border-color)", 
                  paddingBottom: "14px" 
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "13px" }}>
                  <div style={{ backgroundColor: "var(--bg-main)", color: "var(--text-primary)", padding: "8px", borderRadius: "var(--radius-sm)" }}><Coffee size={16} className="text-amber-500" /></div>
                  <div>
                    <div style={{ fontWeight: "700" }}>$15 Starbucks Coupon</div>
                    <div style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: "600", marginTop: "2px" }}>Costs 150 points</div>
                  </div>
                </div>
                <button
                  onClick={() => redeemReward(150, "$15 Starbucks Coupon")}
                  style={{
                    border: "none",
                    background: "var(--color-indigo)",
                    color: "#fff",
                    padding: "6px 12px",
                    borderRadius: "var(--radius-sm)",
                    fontSize: "11px",
                    fontWeight: 700,
                    cursor: "pointer"
                  }}
                >
                  Redeem
                </button>
              </div>

              <div 
                style={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "center" 
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "13px" }}>
                  <div style={{ backgroundColor: "var(--bg-main)", color: "var(--text-primary)", padding: "8px", borderRadius: "var(--radius-sm)" }}><Gift size={16} className="text-rose-500" /></div>
                  <div>
                    <div style={{ fontWeight: "700" }}>Custom VibeOS Hoodie</div>
                    <div style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: "600", marginTop: "2px" }}>Costs 500 points</div>
                  </div>
                </div>
                <button
                  onClick={() => redeemReward(500, "Custom VibeOS Hoodie")}
                  style={{
                    border: "none",
                    background: "var(--color-indigo)",
                    color: "#fff",
                    padding: "6px 12px",
                    borderRadius: "var(--radius-sm)",
                    fontSize: "11px",
                    fontWeight: 700,
                    cursor: "pointer"
                  }}
                >
                  Redeem
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
