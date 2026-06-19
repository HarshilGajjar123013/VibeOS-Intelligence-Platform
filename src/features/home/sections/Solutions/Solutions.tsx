"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Shield, 
  Users, 
  Trophy, 
  Target, 
  Heart, 
  MessageSquare, 
  TrendingUp, 
  User, 
  Lightbulb, 
  Compass, 
  Sprout, 
  Zap, 
  Sparkles, 
  ArrowRight 
} from 'lucide-react';
import './Solutions.scss';

interface CardItem {
  id: string;
  title: string;
  desc: string;
  color: string;
  glow: string;
  icon: React.ComponentType<{ size: number; className?: string }>;
}

const stats = [
  { value: '58%', label: 'Employees report burnout' },
  { value: '3×', label: 'Higher returns from culture' },
  { value: '21%', label: 'Higher profitability from engagement' },
  { value: '87%', label: 'Less likely to quit' }
];

export const Solutions: React.FC = () => {
  const router = useRouter();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [statIndex, setStatIndex] = useState(0);
  const parentRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const updateScale = () => {
      if (parentRef.current) {
        const width = parentRef.current.getBoundingClientRect().width;
        const desktop = window.innerWidth >= 1024;
        setIsDesktop(desktop);
        if (desktop) {
          setScale(Math.min(1, width / 1320));
        } else {
          setScale(1);
        }
      }
    };
    updateScale();
    window.addEventListener('resize', updateScale);
    const observer = new ResizeObserver(updateScale);
    if (parentRef.current) {
      observer.observe(parentRef.current);
    }
    return () => {
      window.removeEventListener('resize', updateScale);
      observer.disconnect();
    };
  }, []);

  // 6 columns driving/shaping culture (Left Column)
  const leftCards: CardItem[] = [
    {
      id: 'left-0',
      title: 'Trust',
      desc: 'The foundation of strong relationships.',
      color: '#6366f1', // Indigo
      glow: 'rgba(99, 102, 241, 0.12)',
      icon: Shield
    },
    {
      id: 'left-1',
      title: 'Belonging',
      desc: 'Where everyone feels seen and valued.',
      color: '#3b82f6', // Blue
      glow: 'rgba(59, 130, 246, 0.12)',
      icon: Users
    },
    {
      id: 'left-2',
      title: 'Recognition',
      desc: 'Celebrating moments that drive impact.',
      color: '#10b981', // Emerald
      glow: 'rgba(16, 185, 129, 0.12)',
      icon: Trophy
    },
    {
      id: 'left-3',
      title: 'Purpose',
      desc: 'Connecting work to meaning and mission.',
      color: '#f59e0b', // Amber
      glow: 'rgba(245, 158, 11, 0.12)',
      icon: Target
    },
    {
      id: 'left-4',
      title: 'Wellbeing',
      desc: 'Supporting the whole person at work.',
      color: '#ec4899', // Pink/Rose
      glow: 'rgba(236, 72, 153, 0.12)',
      icon: Heart
    },
    {
      id: 'left-5',
      title: 'Voice',
      desc: 'Every perspective shapes a better culture.',
      color: '#8b5cf6', // Violet
      glow: 'rgba(139, 92, 246, 0.12)',
      icon: MessageSquare
    }
  ];

  // 6 outcomes shaped by culture (Right Column)
  const rightCards: CardItem[] = [
    {
      id: 'right-0',
      title: 'Performance',
      desc: 'Culture influences how teams execute.',
      color: '#7c3aed', // Purple/Violet
      glow: 'rgba(124, 58, 237, 0.12)',
      icon: TrendingUp
    },
    {
      id: 'right-1',
      title: 'Retention',
      desc: 'Healthy cultures keep great talent.',
      color: '#2563eb', // Rich Blue
      glow: 'rgba(37, 99, 235, 0.12)',
      icon: User
    },
    {
      id: 'right-2',
      title: 'Innovation',
      desc: 'Psychological safety sparks new ideas.',
      color: '#0d9488', // Teal
      glow: 'rgba(13, 148, 136, 0.12)',
      icon: Lightbulb
    },
    {
      id: 'right-3',
      title: 'Leadership',
      desc: 'Stronger culture builds better leaders.',
      color: '#d97706', // Dark Amber
      glow: 'rgba(217, 119, 6, 0.12)',
      icon: Compass
    },
    {
      id: 'right-4',
      title: 'Growth',
      desc: 'Aligned teams drive sustainable growth.',
      color: '#e11d48', // Deep Rose
      glow: 'rgba(225, 29, 72, 0.12)',
      icon: Sprout
    },
    {
      id: 'right-5',
      title: 'Momentum',
      desc: 'Positive culture creates lasting impact.',
      color: '#a855f7', // Purple
      glow: 'rgba(168, 85, 247, 0.12)',
      icon: Zap
    }
  ];

  const handleCtaClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/signup');
  };

  // Find the currently active/hovered card details to style the center block
  const activeCard = hoveredCard
    ? [...leftCards, ...rightCards].find(c => c.id === hoveredCard)
    : null;

  // Generate coordinates & paths for left side: Card (x=320) to Center dots (x=530)
  const leftPaths = leftCards.map((card, index) => {
    const y1 = 80 + index * 128; // Equally spaced centers
    const y2 = 375 + index * 10; // Converged spacing at the center
    const pathD = `M 320,${y1} C 420,${y1} 430,${y2} 530,${y2}`;
    return { card, y1, y2, pathD };
  });

  // Generate coordinates & paths for right side: Center dots (x=870) to Card (x=1080)
  const rightPaths = rightCards.map((card, index) => {
    const y1 = 375 + index * 10; // Converged spacing at the center
    const y2 = 80 + index * 128; // Equally spaced centers
    const pathD = `M 870,${y1} C 970,${y1} 980,${y2} 1080,${y2}`;
    return { card, y1, y2, pathD };
  });

  return (
    <section className="solutions-section" ref={parentRef}>
      <div 
        className="solutions-desktop-wrapper"
        style={{
          width: "100%",
          height: isDesktop ? `${800 * scale}px` : "auto",
          display: "flex",
          justifyContent: "center",
          overflow: "hidden",
          position: "relative"
        }}
      >
        <div 
          className="solutions-container"
          style={isDesktop ? {
            width: "1320px",
            height: "800px",
            transform: `scale(${scale})`,
            transformOrigin: "center top",
            flexShrink: 0
          } : undefined}
        >
          
          {/* Absolute SVG overlay drawing the connections */}
          <svg 
            className="solutions-svg-overlay" 
            viewBox="0 0 1400 800" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Concentric ambient background rings in center */}
            <circle cx={700} cy={400} r={150} stroke="rgba(126, 83, 255, 0.03)" strokeWidth="1" fill="none" />
            <circle cx={700} cy={400} r={210} stroke="rgba(126, 83, 255, 0.02)" strokeWidth="1.2" strokeDasharray="5 7" fill="none" />
            <circle cx={700} cy={400} r={290} stroke="rgba(126, 83, 255, 0.015)" strokeWidth="1" fill="none" />

            {/* LEFT PATHS */}
            {leftPaths.map(({ card, y1, y2, pathD }) => {
              const isHovered = hoveredCard === card.id;
              const isDimmed = hoveredCard !== null && !isHovered;
              
              return (
                <g key={`path-${card.id}`}>
                  {/* Background static curve line */}
                  <path
                    d={pathD}
                    className={`solutions-path-bg ${isHovered ? 'active' : ''} ${isDimmed ? 'dimmed' : ''}`}
                    style={{ '--card-color': card.color } as React.CSSProperties}
                  />
                  {/* Glowing flowing pulse */}
                  <path
                    d={pathD}
                    className={`solutions-pulse-line ${isHovered ? 'active' : ''} ${isDimmed ? 'dimmed' : ''}`}
                    style={{ '--card-color': card.color } as React.CSSProperties}
                  />
                  {/* Connection dot at card edge */}
                  <circle
                    cx={320}
                    cy={y1}
                    r={isHovered ? 4.5 : 2.5}
                    className={`solutions-connector-dot ${isHovered ? 'active' : ''}`}
                    style={{ '--card-color': card.color } as React.CSSProperties}
                  />
                  {/* Convergence dot at center container edge */}
                  <circle
                    cx={530}
                    cy={y2}
                    r={isHovered ? 5.5 : 3.2}
                    className={`solutions-connector-dot ${isHovered ? 'active' : ''}`}
                    style={{ '--card-color': card.color } as React.CSSProperties}
                  />
                </g>
              );
            })}

            {/* RIGHT PATHS */}
            {rightPaths.map(({ card, y1, y2, pathD }) => {
              const isHovered = hoveredCard === card.id;
              const isDimmed = hoveredCard !== null && !isHovered;
              
              return (
                <g key={`path-${card.id}`}>
                  {/* Background static curve line */}
                  <path
                    d={pathD}
                    className={`solutions-path-bg ${isHovered ? 'active' : ''} ${isDimmed ? 'dimmed' : ''}`}
                    style={{ '--card-color': card.color } as React.CSSProperties}
                  />
                  {/* Glowing flowing pulse */}
                  <path
                    d={pathD}
                    className={`solutions-pulse-line ${isHovered ? 'active' : ''} ${isDimmed ? 'dimmed' : ''}`}
                    style={{ '--card-color': card.color } as React.CSSProperties}
                  />
                  {/* Convergence dot at center container edge */}
                  <circle
                    cx={870}
                    cy={y1}
                    r={isHovered ? 5.5 : 3.2}
                    className={`solutions-connector-dot ${isHovered ? 'active' : ''}`}
                    style={{ '--card-color': card.color } as React.CSSProperties}
                  />
                  {/* Connection dot at card edge */}
                  <circle
                    cx={1080}
                    cy={y2}
                    r={isHovered ? 4.5 : 2.5}
                    className={`solutions-connector-dot ${isHovered ? 'active' : ''}`}
                    style={{ '--card-color': card.color } as React.CSSProperties}
                  />
                </g>
              );
            })}
          </svg>

          {/* LEFT COLUMN: WHAT SHAPES CULTURE */}
          <div className="solutions-column solutions-column--left">
            <div className="solutions-column-header">What Shapes Culture</div>
            <div className="solutions-column-cards">
              {leftCards.map((card) => {
                const Icon = card.icon;
                const isHovered = hoveredCard === card.id;
                const isDimmed = hoveredCard !== null && !isHovered;

                return (
                  <div
                    key={card.id}
                    className={`solutions-card ${isHovered ? 'active' : ''} ${isDimmed ? 'dimmed' : ''}`}
                    style={{
                      '--card-color': card.color,
                      '--card-glow': card.glow
                    } as React.CSSProperties}
                    onMouseEnter={() => setHoveredCard(card.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div className="solutions-card-icon-wrapper">
                      <Icon size={20} />
                    </div>
                    <div className="solutions-card-body">
                      <h3 className="solutions-card-title">{card.title}</h3>
                      <p className="solutions-card-desc">{card.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CENTER CONTENT BLOCK */}
          <div className="solutions-center-block">
            
            {/* Sparkles Badge */}
            <div 
              className={`solutions-sparkle-ring ${activeCard ? 'active' : ''}`}
              style={{
                borderColor: activeCard ? activeCard.color : 'rgba(226, 232, 240, 0.8)',
                boxShadow: activeCard 
                  ? `0 12px 36px ${activeCard.glow}, 0 0 20px ${activeCard.glow}` 
                  : '0 10px 30px rgba(126, 83, 255, 0.08)',
                color: activeCard ? activeCard.color : '#7e53ff'
              }}
            >
              <Sparkles size={32} className="solutions-sparkle-icon" />
            </div>

            <h2 className="solutions-main-title">
              See what your  <br />
              <span>culture</span> is trying <br />
              to tell you.
            </h2>

            <p className="solutions-main-desc">
              VibeOS transforms human signals into cultural intelligence for modern organizations.
            </p>

            <a 
              href="#signup" 
              className="solutions-cta-btn" 
              onClick={handleCtaClick}
              aria-label="Explore the VibeOS platform"
            >
              Explore Platform
              <ArrowRight size={16} />
            </a>

            {/* Rotating Statistics Carousel */}
            <div className="solutions-stats-carousel">
              <div className="solutions-stats-rotator" key={statIndex}>
                <span className="solutions-stat-value">{stats[statIndex].value}</span>
                <span className="solutions-stat-label">{stats[statIndex].label}</span>
              </div>
              
              {/* Slide dot indicators */}
              <div className="solutions-stats-dots">
                {stats.map((_, idx) => (
                  <button
                    key={idx}
                    className={`solutions-stat-dot ${idx === statIndex ? 'active' : ''}`}
                    onClick={() => setStatIndex(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: WHAT CULTURE SHAPES */}
          <div className="solutions-column solutions-column--right">
            <div className="solutions-column-header">What Culture Shapes</div>
            <div className="solutions-column-cards">
              {rightCards.map((card) => {
                const Icon = card.icon;
                const isHovered = hoveredCard === card.id;
                const isDimmed = hoveredCard !== null && !isHovered;

                return (
                  <div
                    key={card.id}
                    className={`solutions-card ${isHovered ? 'active' : ''} ${isDimmed ? 'dimmed' : ''}`}
                    style={{
                      '--card-color': card.color,
                      '--card-glow': card.glow
                    } as React.CSSProperties}
                    onMouseEnter={() => setHoveredCard(card.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div className="solutions-card-icon-wrapper">
                      <Icon size={20} />
                    </div>
                    <div className="solutions-card-body">
                      <h3 className="solutions-card-title">{card.title}</h3>
                      <p className="solutions-card-desc">{card.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Solutions;
