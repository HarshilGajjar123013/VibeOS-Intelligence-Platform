"use client";

import React, { useState } from "react";
import { X, CheckCircle2, ChevronDown, Globe } from "lucide-react";
import { useProtoStore } from "@/src/store/useProtoStore";
import "./RequestDemo.scss";

export default function RequestDemo() {
  const { isDemoModalOpen, setDemoModalOpen } = useProtoStore();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    countryCode: "+91",
    phone: "",
    email: "",
    company: "",
    jobTitle: "",
    employees: "",
    marketingConsent: false,
  });

  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isDemoModalOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((item) => item !== interest)
        : [...prev, interest]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleClose = () => {
    setDemoModalOpen(false);
    setIsSubmitted(false); // Reset state for next open
    setSelectedInterests([]);
    setFormData({
      firstName: "",
      lastName: "",
      countryCode: "+91",
      phone: "",
      email: "",
      company: "",
      jobTitle: "",
      employees: "",
      marketingConsent: false,
    });
  };

  return (
    <div className="demo-modal-overlay">
      {/* Modal Card */}
      <div className="demo-modal-card">
        {/* Rivets at 4 corners */}
        <span className="rivet top-left" />
        <span className="rivet top-right" />
        <span className="rivet bottom-left" />
        <span className="rivet bottom-right" />

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="demo-modal-close"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {isSubmitted ? (
          <div className="demo-success-view">
            <CheckCircle2 className="success-icon" size={64} />
            <h1 className="success-heading">Request Submitted!</h1>
            <p className="success-text">
              Thank you, <strong>{formData.firstName}</strong>. Our workplace analytics expert will contact you at <strong>{formData.email}</strong> shortly to customize your VibeOS experience.
            </p>
            <button onClick={handleClose} className="success-btn">
              Done
            </button>
          </div>
        ) : (
          <div className="demo-form-view">
            <div className="demo-header">
              <div className="demo-brand-logo">
                <img
                  src="/assets/images/logo2.png"
                  alt="VibeOS"
                  className="demo-logo-img"
                />
              </div>
              <h1 className="demo-title">Get a demo of VibeOS</h1>
              <p className="demo-subtitle">
                Simply fill out the form and our representative will be in touch soon.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="demo-form">
              <div className="form-grid-2">
                <div className="form-group">
                  <label htmlFor="firstName">First Name*</label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name*</label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label htmlFor="countryCode">Country Code*</label>
                  <div className="select-wrapper">
                    <Globe className="input-icon" size={16} />
                    <select
                      id="countryCode"
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleInputChange}
                    >
                      <option value="+91">India (+91)</option>
                      <option value="+1">United States (+1)</option>
                      <option value="+44">United Kingdom (+44)</option>
                      <option value="+61">Australia (+61)</option>
                      <option value="+971">UAE (+971)</option>
                      <option value="+65">Singapore (+65)</option>
                    </select>
                    <ChevronDown className="select-caret" size={14} />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number*</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label htmlFor="email">Work Email*</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="email@company.com"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="company">Company Name*</label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    required
                    placeholder="Company name"
                    value={formData.company}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label htmlFor="jobTitle">Job Title*</label>
                  <input
                    id="jobTitle"
                    name="jobTitle"
                    type="text"
                    required
                    placeholder="Your job title"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="employees">Employees*</label>
                  <div className="select-wrapper">
                    <select
                      id="employees"
                      name="employees"
                      required
                      value={formData.employees}
                      onChange={handleInputChange}
                    >
                      <option value="" disabled>Please Select</option>
                      <option value="1-99">1 - 99 employees</option>
                      <option value="100-499">100 - 499 employees</option>
                      <option value="500-1999">500 - 1,999 employees</option>
                      <option value="2000+">2,000+ employees</option>
                    </select>
                    <ChevronDown className="select-caret" size={14} />
                  </div>
                </div>
              </div>

              {/* Help Topics */}
              <div className="form-section-group">
                <span className="section-label">How can we help?</span>
                <div className="interests-grid">
                  {[
                    { id: "surveys", text: "Employee engagement & surveys" },
                    { id: "performance", text: "Diagnostic tools to build peak performance" },
                    { id: "leadership", text: "Leadership effectiveness & coaching" },
                    { id: "productivity", text: "Employee performance & productivity management" },
                    { id: "aicoach", text: "Personalized, science-backed performance guidance from AI Coach" },
                  ].map((interest) => {
                    const active = selectedInterests.includes(interest.id);
                    return (
                      <button
                        key={interest.id}
                        type="button"
                        className={`interest-btn ${active ? "active" : ""}`}
                        onClick={() => toggleInterest(interest.id)}
                      >
                        <span className="checkbox-dot" />
                        <span>{interest.text}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Marketing Consent */}
              <div className="marketing-consent">
                <label className="checkbox-wrapper">
                  <input
                    type="checkbox"
                    name="marketingConsent"
                    checked={formData.marketingConsent}
                    onChange={handleCheckboxChange}
                  />
                  <span className="custom-checkbox" />
                  <span className="label-text">
                    I agree to receive marketing electronic communications from VibeOS
                  </span>
                </label>
              </div>

              {/* Submit */}
              <button type="submit" className="demo-submit-btn">
                Submit
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
