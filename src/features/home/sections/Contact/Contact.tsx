"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Lock, 
  Globe, 
  Send,
  Loader2,
  CheckCircle2,
  Sparkles
} from "lucide-react";
import { useProtoStore } from "@/src/store/useProtoStore";
import "./Contact.scss";

// --- Framer Motion Animation Variants ---
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } 
  }
};

export default function Contact() {
  const { addToast } = useProtoStore();

  const [form, setForm] = useState({
    name: "",
    email: "",
    companySize: "100-500",
    department: "HR / People Ops",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      addToast("warning", "Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);

    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      addToast("success", "Demo request received! Our team will contact you shortly.");
      
      // Reset form
      setForm({
        name: "",
        email: "",
        companySize: "100-500",
        department: "HR / People Ops",
        message: ""
      });

      // Clear success state after 4 seconds
      setTimeout(() => setSubmitted(false), 4000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <section className="vibe-contact-section">
      {/* Background Ambient Glows */}
      <div className="glow-orb glow-orb--1" />
      <div className="glow-orb glow-orb--2" />

      <div className="vibe-contact-container">
        <motion.div 
          className="vibe-contact-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Left Column: Details and Trust */}
          <motion.div className="contact-details-col" variants={fadeUp}>
            <span className="contact-badge">
              <Sparkles size={12} className="text-indigo-400" />
              <span>Get in Touch</span>
            </span>
            <h1 className="contact-title">Let's build a workplace people love</h1>
            <p className="contact-subtitle">
              Talk to an Employee Experience expert. See how VibeOS can help you predict turnover, summarize comments, and measure real-time sentiment.
            </p>

            {/* Testimonial Spotlight */}
            <div className="contact-testimonial">
              <p className="testimonial-text">
                "VibeOS completely transformed our feedback loops. We went from annual surveys with 40% participation to monthly pulses with 92% completion, saving our HR team weeks of manual work."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">SM</div>
                <div>
                  <h4 className="author-name">Sarah Mitchell</h4>
                  <p className="author-title">VP of People Ops, Acme Corp</p>
                </div>
              </div>
            </div>

            {/* Direct Contact Points */}
            <div className="contact-info-list">
              <a href="mailto:hello@vibeos.com" className="info-card">
                <div className="info-card__icon"><Mail size={16} /></div>
                <div className="info-card__content">
                  <h4>Email Us</h4>
                  <p>hello@vibeos.com</p>
                </div>
              </a>

              <div className="info-card">
                <div className="info-card__icon"><Phone size={16} /></div>
                <div className="info-card__content">
                  <h4>Call Us</h4>
                  <p>+1 (800) 555-VIBE</p>
                </div>
              </div>

              <div className="info-card">
                <div className="info-card__icon"><MapPin size={16} /></div>
                <div className="info-card__content">
                  <h4>Headquarters</h4>
                  <p>100 Pine Street, San Francisco, CA 94111</p>
                </div>
              </div>
            </div>

            {/* Trust Certifications */}
            <div className="security-section">
              <h4 className="security-title">Enterprise Security Standards</h4>
              <div className="security-badges">
                <div className="security-badge" title="SOC2 Type II Certified">
                  <ShieldCheck size={14} className="text-emerald-400" />
                  <span>SOC2 Type II</span>
                </div>
                <div className="security-badge" title="ISO 27001 Certified">
                  <Lock size={14} className="text-emerald-400" />
                  <span>ISO 27001</span>
                </div>
                <div className="security-badge" title="GDPR & Privacy Compliant">
                  <Globe size={14} className="text-emerald-400" />
                  <span>GDPR Compliant</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div className="contact-form-col" variants={fadeUp}>
            <div className="contact-glass-card">
              <h3 className="card-title">Request a Custom Demo</h3>
              <p className="card-desc">Fill out the details below and an experience strategist will contact you within 24 hours.</p>

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name <span className="required">*</span></label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      placeholder="Sarah Mitchell" 
                      required 
                      value={form.name} 
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email">Work Email <span className="required">*</span></label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    placeholder="sarah.m@company.com" 
                    required 
                    value={form.email} 
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group-row">
                  <div className="form-group">
                    <label htmlFor="companySize">Company Size</label>
                    <select 
                      id="companySize" 
                      name="companySize" 
                      value={form.companySize} 
                      onChange={handleChange}
                    >
                      <option value="1-50">1 - 50 employees</option>
                      <option value="50-100">50 - 100 employees</option>
                      <option value="100-500">100 - 500 employees</option>
                      <option value="500-2000">500 - 2,000 employees</option>
                      <option value="2000+">2,000+ employees</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="department">Department</label>
                    <select 
                      id="department" 
                      name="department" 
                      value={form.department} 
                      onChange={handleChange}
                    >
                      <option value="HR / People Ops">HR / People Ops</option>
                      <option value="Executive / Leadership">Executive / Leadership</option>
                      <option value="Department Manager">Department Manager</option>
                      <option value="Finance / Operations">Finance / Operations</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">How can VibeOS help you?</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows={4} 
                    placeholder="Tell us about your team size, current feedback blockers, or retention priority goals..."
                    value={form.message} 
                    onChange={handleChange}
                  />
                </div>

                <button 
                  type="submit" 
                  className={`submit-btn ${submitted ? "success" : ""}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="spinner" size={16} />
                      <span>Sending Request...</span>
                    </>
                  ) : submitted ? (
                    <>
                      <CheckCircle2 size={16} />
                      <span>Request Sent!</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Book a Free Demo</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
