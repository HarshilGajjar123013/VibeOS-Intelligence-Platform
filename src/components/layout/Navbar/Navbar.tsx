"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useProtoStore } from "@/src/store/useProtoStore";
import "./Navbar.scss";

type PlatformLink = {
  label: string;
  href: string;
  description: string;
  badge: string | null;
};

type ResourceLink = {
  label: string;
  href: string;
  description: string;
};

const PLATFORM_LINKS: PlatformLink[] = [
  {
    label: "Vibe Index Matrix",
    href: "/platform/vibe-index-matrix",
    description: "Measure impact across engagement and performance",
    badge: "New",
  },
  {
    label: "Retention Insights",
    href: "/platform/retention-insights",
    description: "Identify patterns that help you keep great people",
    badge: null,
  },
  {
    label: "Ready-to-use Surveys",
    href: "/platform/ready-to-use-surveys",
    description: "Launch proven survey templates faster",
    badge: null,
  },
  {
    label: "AI Comment Summaries",
    href: "/platform/ai-comment-summaries",
    description: "Turn open-text feedback into concise themes",
    badge: null,
  },
  {
    label: "Proven Action Plans",
    href: "/platform/proven-action-plans",
    description: "Recommend next steps with confidence",
    badge: null,
  },
  {
    label: "Pulse Surveys",
    href: "/platform/pulse-surveys",
    description: "Check in frequently with lightweight surveys",
    badge: null,
  },
  {
    label: "Onboarding/Offboarding Survey",
    href: "/platform/onboarding-offboarding-survey",
    description: "Learn from critical employee transitions",
    badge: null,
  },
  {
    label: "Benchmarking",
    href: "/platform/benchmarking",
    description: "Compare results against relevant norms",
    badge: null,
  },
];

const RESOURCE_LINKS: ResourceLink[] = [
  {
    label: "People Science",
    href: "/insights/people-science",
    description:
      "Expert guidance and proven strategies to build thriving workplaces.",
  },
  {
    label: "Benchmarks",
    href: "/insights/benchmarks",
    description:
      "Compare your employee experience against relevant industry standards.",
  },
  {
    label: "ROI Calculator",
    href: "/insights/roi-calculator",
    description:
      "Quantify the value of investing in culture and employee engagement.",
  },
];

export default function Navbar() {
  const { setDemoModalOpen } = useProtoStore();

  const handleRequestDemo = () => {
    if (typeof setDemoModalOpen === "function") {
      setDemoModalOpen(true);
    } else {
      window.location.reload();
    }
  };

  return (
    <header className="navbar">
      <div className="navbar__container">
        {/* Logo */}
        <Link
          href="/"
          className="navbar__logo"
        >
          <img
            src="/assets/images/logo2.png"
            alt="VibeOS"
            className="navbar__logo-img"
          />
        </Link>

        {/* Navigation */}
        <nav
          className="navbar__nav"
          aria-label="Primary Navigation"
        >
          {/* {Home} */}
            <Link
            href="/"
            className="navbar__link"
          >
            Home
          </Link>

          {/* Platform */}
          <div className="navbar__dropdown">
            <button
              type="button"
              className="navbar__link navbar__link--trigger"
            >
              Platform

              <span
                className="navbar__caret"
                aria-hidden="true"
              />
            </button>

            <div className="navbar__dropdown-panel navbar__dropdown-panel--platform">
              <div className="navbar__platform-intro">
                <Link href="/platform" className="navbar__platform-heading">
                  Platform
                </Link>

                <p className="navbar__platform-text">
                  Everything you need to listen to employees,
                  understand your culture, and take action
                  at scale.
                </p>

                <Link href="/platform" className="navbar__platform-cta">
                  Explore Platform
                  <ArrowRight size={13} />
                </Link>
              </div>

              <div className="navbar__platform-grid">
                {PLATFORM_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="navbar__platform-item"
                  >
                    <div className="navbar__platform-item-head">
                      <span className="navbar__platform-item-title">
                        {link.label}
                      </span>

                      {link.badge && (
                        <span className="navbar__platform-badge">
                          {link.badge}
                        </span>
                      )}
                    </div>

                    <p className="navbar__platform-item-description">
                      {link.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>

            {/* Insights */}
          <div className="navbar__dropdown">
            <button
              type="button"
              className="navbar__link navbar__link--trigger"
            >
              Insights

              <span
                className="navbar__caret"
                aria-hidden="true"
              />
            </button>

            <div className="navbar__dropdown-panel navbar__dropdown-panel--resources">
              <div className="navbar__resources-intro">
                <p className="navbar__resources-kicker">
                  Insights
                </p>

                <h3 className="navbar__resources-heading">
                  Explore practical guides,
                  and tools to build
                  high-performing teams.
                </h3>
              </div>

              <div className="navbar__resources-list">
                {RESOURCE_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="navbar__resource-item"
                  >
                    <span className="navbar__resource-title">
                      {link.label}
                    </span>

                    <p className="navbar__resource-description">
                      {link.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* About */}
          <Link
            href="/about"
            className="navbar__link"
          >
            About
          </Link>

          {/* Contact */}
          <Link
            href="/contact"
            className="navbar__link"
          >
            Contact
          </Link>

         
        </nav>

        {/* Actions */}
        <div className="navbar__actions">
          <Link
            href="/signin"
            className="navbar__button navbar__button--secondary"
          >
            Sign in
          </Link>

          <button
            onClick={handleRequestDemo}
            className="navbar__button navbar__button--primary"
          >
            Request a Demo
          </button>
        </div>

        {/* Mobile */}
        <button
          type="button"
          className="navbar__menu"
          aria-label="Open menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}

