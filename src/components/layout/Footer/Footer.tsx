"use client";

import Link from "next/link";
import React from "react";
import { FiTwitter, FiLinkedin, FiGithub } from "react-icons/fi";
import { usePathname } from "next/navigation";
import "./Footer.scss";

export default function Footer() {
  const pathname = usePathname();
  const year = new Date().getFullYear();

  if (
    pathname?.startsWith("/dashboard") ||
    pathname === "/signin" ||
    pathname === "/signup" ||
    pathname === "/demo"
  ) {
    return null;
  }

  return (
    <footer className="footer">
      <div className="footer__container">

        <div className="footer__brand">
          <Link href="/" className="footer__logo">
            <img
              src="/assets/images/logo2.png"
              alt="VibeOS"
              className="footer__logo-img"
            />
          </Link>
          <p className="footer__desc">The Intelligence Layer Behind Great Cultures — trusted by teams worldwide.</p>
        </div>

        <div className="footer__navcols">
          <div className="footer__col">
            <h4>Product</h4>
            <Link href="/product" className="footer__link">Overview</Link>
            <Link href="/features" className="footer__link">Features</Link>
            <Link href="/pricing" className="footer__link">Pricing</Link>
          </div>

          <div className="footer__col">
            <h4>Company</h4>
            <Link href="/about" className="footer__link">About</Link>
            <Link href="/careers" className="footer__link">Careers</Link>
            <Link href="/blog" className="footer__link">Blog</Link>
          </div>

          <div className="footer__col">
            <h4>Resources</h4>
            <Link href="/docs" className="footer__link">Docs</Link>
            <Link href="/support" className="footer__link">Support</Link>
            <Link href="/contact" className="footer__link">Contact</Link>
          </div>
        </div>

        <div className="footer__right">
          <div className="footer__social" aria-hidden>
              <a href="https://twitter.com/" className="footer__social-link" aria-label="Twitter" target="_blank" rel="noreferrer">
                <FiTwitter />
              </a>
              <a href="https://www.linkedin.com/" className="footer__social-link" aria-label="LinkedIn" target="_blank" rel="noreferrer">
                <FiLinkedin />
              </a>
              <a href="https://github.com/" className="footer__social-link" aria-label="GitHub" target="_blank" rel="noreferrer">
                <FiGithub />
              </a>
          </div>

          <div className="footer__copy">© {year} CoreShift — All rights reserved.</div>
        </div>

      </div>
    </footer>
  );
}

