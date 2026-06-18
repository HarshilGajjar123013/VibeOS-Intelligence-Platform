"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { HiCheck, HiOutlineLightBulb } from "react-icons/hi";
import { SlEnergy } from "react-icons/sl";
import { FiEye } from "react-icons/fi";
import { IoBalloonOutline } from "react-icons/io5";

import { useProtoStore } from "@/src/store/useProtoStore";
import "./Hero.scss";

type AvatarCard = {
  id: string;
  className: string;
  src: string;
  alt: string;
  title: string;
  role: string;
  description: string;
  color: string;
  tooltipPosition: "top" | "bottom" | "left" | "right";
};

type IconCard = {
  id: string;
  className: string;
  icon: React.ReactNode;
  tone: string;
  title: string;
  role: string;
  description: string;
  color: string;
  tooltipPosition: "top" | "bottom" | "left" | "right";
};

type FloatingCard = AvatarCard | IconCard;

const floatingCards: readonly FloatingCard[] = [
  {
    id: "avatar-left",
    className: "hero__card--avatar-left",
    src: "/images/person-1.svg",
    alt: "Team member portrait",
    title: "Aarav Sharma",
    role: "Tech Lead",
    description: "Collaborates across departments and registers team vibe checks in real-time.",
    color: "#a78bfa",
    tooltipPosition: "right",
  },
  {
    id: "idea",
    className: "hero__card--idea",
    icon: <HiOutlineLightBulb />,
    tone: "hero__card--yellow",
    title: "Smart Feedback",
    role: "CoreShift Suggest",
    description: "AI-powered feedback boxes to capture employee recommendations instantly.",
    color: "#ffe86c",
    tooltipPosition: "bottom",
  },
  {
    id: "team",
    className: "hero__card--team",
    icon: <IoBalloonOutline />,
    tone: "hero__card--blue",
    title: "Vibe & Alignment",
    role: "CoreShift Engage",
    description: "Daily mood indicators, rewards, and milestone recognition cards.",
    color: "#49c4ff",
    tooltipPosition: "top",
  },
  {
    id: "security",
    className: "hero__card--security",
    icon: <SlEnergy />,
    tone: "hero__card--orange",
    title: "Automated Flows",
    role: "CoreShift Automate",
    description: "Instant onboarding check-ins, payroll systems, and security gates.",
    color: "#ff6037",
    tooltipPosition: "bottom",
  },
  {
    id: "avatar-right",
    className: "hero__card--avatar-right",
    src: "/images/person-2.svg",
    alt: "Team member portrait",
    title: "Elena Rostova",
    role: "HR Director",
    description: "Deploys pulse surveys and reviews organization metrics securely.",
    color: "#ff8b6c",
    tooltipPosition: "top",
  },
  {
    id: "eye",
    className: "hero__card--eye",
    icon: <FiEye />,
    tone: "hero__card--white",
    title: "Live Directories",
    role: "CoreShift View",
    description: "Complete database auditing, directory visibility, and access control.",
    color: "#a3a3a3",
    tooltipPosition: "left",
  },
] as const;

export default function Hero() {
  const { setDemoModalOpen } = useProtoStore();

  const handleRequestDemo = () => {
    if (typeof setDemoModalOpen === "function") {
      setDemoModalOpen(true);
    } else {
      window.location.reload();
    }
  };
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 0);
    
    // Global click handler to dismiss active tooltips when clicking outside
    const handleGlobalClick = () => {
      setActiveCardId(null);
    };
    window.addEventListener("click", handleGlobalClick);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("click", handleGlobalClick);
    };
  }, []);

  const highlightedCardId = hoveredCardId || activeCardId;

  return (
    <section className="hero">
      <div className="hero__container">
        <div className={`hero__network ${isMounted ? "hero__network--mounted" : ""}`}>
          
          {/* Central Active Node */}
          <button 
            className={`hero__center ${highlightedCardId === "center" ? "hero__center--active" : ""} ${activeCardId === "center" ? "hero__center--click-active" : ""}`}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActiveCardId(activeCardId === "center" ? null : "center");
            }}
            onMouseEnter={() => setHoveredCardId("center")}
            onMouseLeave={() => setHoveredCardId(null)}
            aria-label="CoreShift HR Platform Core"
          >
            <div className="hero__center-icon">
              <HiCheck />
            </div>
            
            {/* Center Tooltip */}
            <div className={`hero__tooltip hero__tooltip--bottom ${highlightedCardId === "center" ? "hero__tooltip--visible" : ""}`}>
              <div className="hero__tooltip-header">
                <span className="hero__tooltip-dot" style={{ backgroundColor: "#7e53ff" }}></span>
                <span className="hero__tooltip-role">CoreShift Engine</span>
              </div>
              <h4 className="hero__tooltip-title">Central HR Hub</h4>
              <p className="hero__tooltip-desc">Connecting directory databases, automated flows, culture, and analytics in one ecosystem.</p>
            </div>
          </button>

          {/* Floating Cards */}
          {floatingCards.map((card) => {
            const isHighlighted = highlightedCardId === card.id;
            
            return (
              <button
                key={card.id}
                className={`hero__card ${card.className} ${"tone" in card ? card.tone : "hero__card--avatar"} ${isHighlighted ? "hero__card--active" : ""} ${activeCardId === card.id ? "hero__card--click-active" : ""}`}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveCardId(activeCardId === card.id ? null : card.id);
                }}
                onMouseEnter={() => setHoveredCardId(card.id)}
                onMouseLeave={() => setHoveredCardId(null)}
                aria-label={`View details for ${card.title}`}
              >
                {"src" in card ? (
                  <div className="hero__avatar-wrapper">
                    <Image
                      src={card.src}
                      alt={card.alt}
                      fill
                      className="hero__avatar"
                      sizes="96px"
                      priority={false}
                    />
                  </div>
                ) : (
                  <div className="hero__icon-wrapper">{card.icon}</div>
                )}

                {/* Glassmorphic Feature Tooltip */}
                <div className={`hero__tooltip hero__tooltip--${card.tooltipPosition} ${isHighlighted ? "hero__tooltip--visible" : ""}`}>
                  <div className="hero__tooltip-header">
                    <span className="hero__tooltip-dot" style={{ backgroundColor: card.color }}></span>
                    <span className="hero__tooltip-role">{card.role}</span>
                  </div>
                  <h4 className="hero__tooltip-title">{card.title}</h4>
                  <p className="hero__tooltip-desc">{card.description}</p>
                </div>
              </button>
            );
          })}

          {/* SVG Line Connections */}
          <svg className="hero__svg-lines" viewBox="0 0 1000 300" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            {/* Base grey connection lines */}
            <path d="M 370 150 L 260 120 L 110 120" stroke="#E2E8F0" strokeWidth="1.5" />
            <path d="M 260 120 L 235 60" stroke="#E2E8F0" strokeWidth="1.5" />
            <path d="M 260 120 L 250 205" stroke="#E2E8F0" strokeWidth="1.5" />
            
            <path d="M 470 150 L 580 110 L 870 110" stroke="#E2E8F0" strokeWidth="1.5" />
            <path d="M 580 110 L 645 55" stroke="#E2E8F0" strokeWidth="1.5" />
            <path d="M 580 110 L 665 190" stroke="#E2E8F0" strokeWidth="1.5" />
            
            {/* Active Highlight Connection Lines */}
            <path 
              d="M 370 150 L 260 120 L 110 120" 
              className={`hero__svg-glow ${highlightedCardId === "avatar-left" ? "hero__svg-glow--active" : ""}`}
              stroke="#a78bfa"
              strokeWidth="2.5"
            />
            <path 
              d="M 370 150 L 260 120 L 235 60" 
              className={`hero__svg-glow ${highlightedCardId === "idea" ? "hero__svg-glow--active" : ""}`}
              stroke="#ffe86c"
              strokeWidth="2.5"
            />
            <path 
              d="M 370 150 L 260 120 L 250 205" 
              className={`hero__svg-glow ${highlightedCardId === "team" ? "hero__svg-glow--active" : ""}`}
              stroke="#49c4ff"
              strokeWidth="2.5"
            />
            <path 
              d="M 470 150 L 580 110 L 870 110" 
              className={`hero__svg-glow ${highlightedCardId === "eye" ? "hero__svg-glow--active" : ""}`}
              stroke="#cbd5e1"
              strokeWidth="2.5"
            />
            <path 
              d="M 470 150 L 580 110 L 645 55" 
              className={`hero__svg-glow ${highlightedCardId === "security" ? "hero__svg-glow--active" : ""}`}
              stroke="#ff6037"
              strokeWidth="2.5"
            />
            <path 
              d="M 470 150 L 580 110 L 665 190" 
              className={`hero__svg-glow ${highlightedCardId === "avatar-right" ? "hero__svg-glow--active" : ""}`}
              stroke="#ff8b6c"
              strokeWidth="2.5"
            />

            {/* Glowing signal pulses */}
            <path 
              d="M 370 150 L 260 120 L 110 120" 
              className={`hero__svg-pulse ${highlightedCardId === "avatar-left" ? "hero__svg-pulse--active" : ""}`}
              stroke="#a78bfa"
              strokeWidth="2.5"
            />
            <path 
              d="M 370 150 L 260 120 L 235 60" 
              className={`hero__svg-pulse ${highlightedCardId === "idea" ? "hero__svg-pulse--active" : ""}`}
              stroke="#ffe86c"
              strokeWidth="2.5"
            />
            <path 
              d="M 370 150 L 260 120 L 250 205" 
              className={`hero__svg-pulse ${highlightedCardId === "team" ? "hero__svg-pulse--active" : ""}`}
              stroke="#49c4ff"
              strokeWidth="2.5"
            />
            <path 
              d="M 470 150 L 580 110 L 870 110" 
              className={`hero__svg-pulse ${highlightedCardId === "eye" ? "hero__svg-pulse--active" : ""}`}
              stroke="#cbd5e1"
              strokeWidth="2.5"
            />
            <path 
              d="M 470 150 L 580 110 L 645 55" 
              className={`hero__svg-pulse ${highlightedCardId === "security" ? "hero__svg-pulse--active" : ""}`}
              stroke="#ff6037"
              strokeWidth="2.5"
            />
            <path 
              d="M 470 150 L 580 110 L 665 190" 
              className={`hero__svg-pulse ${highlightedCardId === "avatar-right" ? "hero__svg-pulse--active" : ""}`}
              stroke="#ff8b6c"
              strokeWidth="2.5"
            />
            
            {/* Junction Points */}
            <circle cx="260" cy="120" r="3.5" fill="#a78bfa" className="hero__svg-junction" />
            <circle cx="580" cy="110" r="3.5" fill="#a78bfa" className="hero__svg-junction" />
          </svg>
        </div>

        <div className="hero__content">
          <h1 className="hero__title">
            The Intelligence Layer Behind Great Cultures
          </h1>

          <p className="hero__description">
            VibeOS transforms everyday workplace interactions into cultural intelligence—revealing the patterns, behaviors, and signals that shape performance, retention, and growth.
          </p>

          <div className="hero__cta-group">
            <button 
              className="hero__button" 
              type="button"
              onClick={handleRequestDemo}
            >
              Request a Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}