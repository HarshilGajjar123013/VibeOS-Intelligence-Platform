import React, { useState } from "react";
import {
  Globe,
  Download,
  Share2,
  FileText,
  Sparkles,
  Users,
  Plus,
  Send,
  CheckCircle,
  Linkedin,
  Twitter,
  ExternalLink,
  ChevronRight
} from "lucide-react";

export default function EmployerBrandModule() {
  const [assets, setAssets] = useState([
    { id: 1, name: "CoreShift Logo Brand Kit", format: "ZIP (SVG, PNG)", size: "12.4 MB", downloading: false },
    { id: 2, name: "Culture Guidelines Deck", format: "PDF", size: "4.8 MB", downloading: false },
    { id: 3, name: "Workspace Photography Pack", format: "ZIP (High-res)", size: "45.0 MB", downloading: false }
  ]);

  const [stories, setStories] = useState([
    { id: 1, title: "Building in Public: Engineering Culture", status: "Published", reach: "1.2k views", category: "Engineering" },
    { id: 2, title: "Why remote teams thrive at Acme", status: "Drafting", reach: "--", category: "Remote Work" }
  ]);

  const [showStoryForm, setShowStoryForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Workplace");
  
  // Share modal states
  const [shareStory, setShareStory] = useState<any>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleDownload = (id: number, name: string) => {
    setAssets(prev => prev.map(a => a.id === id ? { ...a, downloading: true } : a));
    setTimeout(() => {
      setAssets(prev => prev.map(a => a.id === id ? { ...a, downloading: false } : a));
      showToast(`Downloaded brand asset kit: ${name}`);
    }, 1200);
  };

  const handleCreateStory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newStory = {
      id: Date.now(),
      title: newTitle,
      status: "Published",
      reach: "0 views",
      category: newCategory
    };

    setStories(prev => [newStory, ...prev]);
    setNewTitle("");
    setShowStoryForm(false);
    showToast("Culture story published on organizational public feeds!");
  };

  const handleShareSimulate = (platform: string) => {
    showToast(`Shared "${shareStory.title}" successfully to ${platform}!`);
    setShareStory(null);
  };

  return (
    <div className="employer-brand-module v-animate-slide-up" style={{ position: "relative" }}>
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

      {/* Share Modal Dialog */}
      {shareStory && (
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
              maxWidth: "400px",
              padding: "24px",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              animation: "scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
            }}
          >
            <div style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "12px", marginBottom: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h4 style={{ margin: 0, fontSize: "14px", fontWeight: 800 }}>Share Culture Spotlight</h4>
              <button 
                onClick={() => setShareStory(null)}
                style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--text-secondary)", fontSize: "14px", fontWeight: 800 }}
              >
                ✕
              </button>
            </div>
            
            <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "16px", lineHeight: 1.4 }}>
              Choose a platform to cross-publish the story <strong>"{shareStory.title}"</strong>:
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <button 
                onClick={() => handleShareSimulate("LinkedIn")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "12px",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--border-color)",
                  background: "var(--bg-main)",
                  color: "var(--text-primary)",
                  fontSize: "13px",
                  fontWeight: 700,
                  cursor: "pointer",
                  textAlign: "left"
                }}
              >
                <Linkedin size={16} className="text-sky-600" /> Publish on LinkedIn
              </button>
              
              <button 
                onClick={() => handleShareSimulate("Twitter/X")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "12px",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--border-color)",
                  background: "var(--bg-main)",
                  color: "var(--text-primary)",
                  fontSize: "13px",
                  fontWeight: 700,
                  cursor: "pointer",
                  textAlign: "left"
                }}
              >
                <Twitter size={16} className="text-slate-800" /> Publish on Twitter / X
              </button>

              <button 
                onClick={() => handleShareSimulate("Company Careers Portal")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "12px",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--border-color)",
                  background: "var(--bg-main)",
                  color: "var(--text-primary)",
                  fontSize: "13px",
                  fontWeight: 700,
                  cursor: "pointer",
                  textAlign: "left"
                }}
              >
                <Globe size={16} className="text-emerald-500" /> Push to Careers Blog
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="executive-dashboard__header" style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "16px", marginBottom: "20px" }}>
        <div>
          <h2 className="executive-dashboard__title" style={{ fontSize: "24px", fontWeight: 800 }}>Employer Branding Workspace</h2>
          <p className="executive-dashboard__subtitle" style={{ color: "var(--text-secondary)" }}>Broadcast your internal culture highlights to public talent platforms and download marketing assets.</p>
        </div>
        <button 
          className="executive-dashboard__action-btn"
          onClick={() => setShowStoryForm(!showStoryForm)}
          style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}
        >
          {showStoryForm ? "Cancel" : <><Plus size={16} /> Publish New Story</>}
        </button>
      </div>

      <div className="analytics-module__grid-cols" style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "24px" }}>
        {/* Culture Stories List */}
        <div className="dashboard-card" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", padding: "24px", borderRadius: "var(--radius-lg)" }}>
          <div className="dashboard-card__header" style={{ marginBottom: "20px" }}>
            <h3 className="dashboard-card__title" style={{ fontSize: "16px", fontWeight: 700, display: "flex", alignItems: "center", gap: "8px" }}>
              <Globe size={16} className="text-indigo-500" />
              Culture Stories & Spotlights
            </h3>
          </div>
          
          <div className="dashboard-card__body" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* Create Story Form */}
            {showStoryForm && (
              <form 
                onSubmit={handleCreateStory} 
                className="v-animate-slide-up"
                style={{
                  padding: "16px",
                  border: "1px solid var(--color-indigo-glow)",
                  borderRadius: "var(--radius-md)",
                  backgroundColor: "var(--bg-main)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px"
                }}
              >
                <div style={{ display: "grid", gridTemplateColumns: "1.3fr 0.7fr", gap: "12px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <label style={{ fontSize: "10px", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase" }}>Story Title</label>
                    <input 
                      type="text" 
                      placeholder="e.g. A Day in the Life of a remote engineer..."
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      style={{ padding: "8px 12px", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)", background: "var(--bg-card)", color: "var(--text-primary)", fontSize: "13px" }}
                      required
                    />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <label style={{ fontSize: "10px", fontWeight: 800, color: "var(--text-muted)", textTransform: "uppercase" }}>Category</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      style={{ padding: "8px 12px", border: "1px solid var(--border-color)", borderRadius: "var(--radius-sm)", background: "var(--bg-card)", color: "var(--text-primary)", fontSize: "13px" }}
                    >
                      <option value="Engineering">Engineering</option>
                      <option value="Remote Work">Remote Work</option>
                      <option value="Culture">Company Culture</option>
                      <option value="Benefits">Workspace Perks</option>
                    </select>
                  </div>
                </div>
                <button 
                  type="submit"
                  style={{
                    alignSelf: "flex-end",
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
                    cursor: "pointer"
                  }}
                >
                  <Send size={12} /> Post Spotlight
                </button>
              </form>
            )}

            {/* List of Stories */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {stories.map((story) => (
                <div 
                  key={story.id} 
                  className="survey-item-card" 
                  style={{ 
                    padding: "16px", 
                    border: "1px solid var(--border-color)", 
                    borderRadius: "var(--radius-md)", 
                    backgroundColor: "var(--bg-main)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <div className="survey-item-card__details">
                    <span style={{ fontSize: "10px", fontWeight: 800, color: "var(--color-indigo)", textTransform: "uppercase" }}>{story.category}</span>
                    <h4 style={{ margin: "4px 0 0 0", fontSize: "14px", fontWeight: 700, color: "var(--text-primary)" }}>{story.title}</h4>
                    <p style={{ margin: "4px 0 0 0", fontSize: "11px", color: "var(--text-muted)" }}>
                      Status: <strong style={{ color: story.status === "Published" ? "var(--color-emerald)" : "var(--color-amber)" }}>{story.status}</strong> • {story.reach}
                    </p>
                  </div>
                  <button 
                    onClick={() => setShareStory(story)}
                    className="survey-item-card__btn" 
                    style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer", border: "1px solid var(--border-color)", padding: "6px 12px", borderRadius: "4px", background: "transparent", color: "var(--text-primary)", fontSize: "12px", fontWeight: 700 }}
                  >
                    <Share2 size={12} /> Share
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Brand Toolkit downloads */}
        <div className="dashboard-card" style={{ background: "var(--bg-card)", border: "1px solid var(--border-color)", padding: "24px", borderRadius: "var(--radius-lg)" }}>
          <div className="dashboard-card__header" style={{ marginBottom: "20px" }}>
            <h3 className="dashboard-card__title" style={{ fontSize: "16px", fontWeight: 700, display: "flex", alignItems: "center", gap: "8px" }}>
              <Download size={16} className="text-indigo-500" />
              Corporate Brand Kit
            </h3>
          </div>
          <div className="dashboard-card__body">
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {assets.map((asset) => (
                <div 
                  key={asset.id} 
                  style={{ 
                    display: "flex", 
                    justifyContent: "space-between", 
                    alignItems: "center", 
                    borderBottom: "1px solid var(--border-color)", 
                    paddingBottom: "12px", 
                    fontSize: "12px" 
                  }}
                >
                  <div>
                    <div style={{ fontWeight: "700", color: "var(--text-primary)", fontSize: "13px" }}>{asset.name}</div>
                    <div style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: "600", marginTop: "2px" }}>{asset.format} • {asset.size}</div>
                  </div>
                  <button 
                    onClick={() => handleDownload(asset.id, asset.name)}
                    disabled={asset.downloading}
                    className="bm-top-nav__workspace-select" 
                    style={{ padding: "6px 10px", cursor: asset.downloading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", gap: "4px" }}
                  >
                    {asset.downloading ? "..." : <Download size={13} />}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
