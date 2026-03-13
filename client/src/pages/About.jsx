import React, { useEffect, useRef, useState } from "react";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Outfit:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ink:    #1A1A2E;
    --paper:  #F0F0F0;
    --warm:   #F07120;
    --stone:  #7A828F;
    --moss:   #2C3E50;
    --blush:  #E4E8EC;
    --border: rgba(240,113,32,0.2);
  }

  body { background: var(--paper); color: var(--ink); font-family: 'Outfit', sans-serif; }

  /* ── HERO ── */
  .ab-hero {
    position: relative; min-height: 80vh;
    display: grid; grid-template-columns: 1fr 1fr;
    overflow: hidden;
  }
  .ab-hero-left {
    background: var(--moss);
    display: flex; flex-direction: column; justify-content: flex-end;
    padding: 5rem 4rem 5rem 5rem;
    position: relative; overflow: hidden; z-index: 1;
  }
  .ab-hero-left::before {
    content: 'ABOUT';
    position: absolute; bottom: -1rem; left: -0.5rem;
    font-family: 'Cormorant Garamond', serif;
    font-size: 14rem; font-weight: 700;
    color: rgba(255,255,255,0.035);
    line-height: 1; pointer-events: none; white-space: nowrap;
  }
  .ab-tag {
    display: inline-flex; align-items: center; gap: 0.6rem;
    font-size: 0.7rem; letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--warm); margin-bottom: 2rem;
  }
  .ab-tag::before { content: ''; display: block; width: 32px; height: 1px; background: var(--warm); }
  .ab-hero-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2.8rem, 5vw, 5rem);
    font-weight: 600; line-height: 1.05;
    color: #FFFFFF; letter-spacing: -0.02em; margin-bottom: 2rem;
  }
  .ab-hero-title em { font-style: italic; color: var(--warm); }
  .ab-hero-lead {
    font-size: 1rem; line-height: 1.8; color: rgba(255,255,255,0.6);
    max-width: 400px; font-weight: 300;
  }

  .ab-hero-right { position: relative; overflow: hidden; }
  .ab-hero-img {
    width: 100%; height: 100%;
    object-fit: cover; display: block;
    filter: saturate(0.8) contrast(1.05);
    transition: transform 8s ease;
  }
  .ab-hero-right:hover .ab-hero-img { transform: scale(1.04); }
  .ab-hero-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to right, rgba(20,18,14,0.15), transparent);
    pointer-events: none;
  }
  .ab-year-badge {
    position: absolute; top: 2.5rem; right: 2.5rem;
    width: 80px; height: 80px; border-radius: 50%;
    background: var(--warm); display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    box-shadow: 0 8px 32px rgba(0,0,0,0.2);
  }
  .ab-year-num { font-family: 'Cormorant Garamond', serif; font-size: 1.3rem; font-weight: 700; color: var(--ink); line-height: 1; }
  .ab-year-text { font-size: 0.55rem; letter-spacing: 0.1em; color: rgba(20,18,14,0.6); text-transform: uppercase; }

  /* ── MISSION ── */
  .ab-mission {
    display: grid; grid-template-columns: 1fr 2fr;
    gap: 0; border-bottom: 1px solid var(--border);
  }
  .ab-mission-sidebar {
    background: var(--blush);
    padding: 5rem 3rem;
    display: flex; flex-direction: column; justify-content: center;
    border-right: 1px solid var(--border);
  }
  .ab-mission-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 6rem; font-weight: 700; line-height: 1;
    color: var(--warm); opacity: 0.4;
  }
  .ab-mission-label {
    font-size: 0.7rem; letter-spacing: 0.15em; text-transform: uppercase;
    color: var(--stone); margin-top: 1rem;
  }
  .ab-mission-body {
    padding: 5rem 6rem 5rem 5rem;
    display: flex; flex-direction: column; justify-content: center;
  }
  .ab-mission-heading {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.8rem, 3vw, 2.8rem);
    font-weight: 600; color: var(--ink); margin-bottom: 2rem;
    line-height: 1.2; letter-spacing: -0.02em;
  }
  .ab-mission-heading em { font-style: italic; color: var(--moss); }
  .ab-mission-text {
    font-size: 1rem; line-height: 1.85; color: var(--ink);
    opacity: 0.65; font-weight: 300; max-width: 560px;
  }
  .ab-mission-text + .ab-mission-text { margin-top: 1.25rem; }

  /* ── STATS ROW ── */
  .ab-stats {
    display: grid; grid-template-columns: repeat(4, 1fr);
    border-bottom: 1px solid var(--border);
  }
  .ab-stat {
    padding: 3.5rem 2.5rem;
    border-right: 1px solid var(--border);
    position: relative; overflow: hidden;
    transition: background 0.3s;
  }
  .ab-stat:last-child { border-right: none; }
  .ab-stat:hover { background: var(--blush); }
  .ab-stat-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 3.5rem; font-weight: 700; color: var(--ink);
    line-height: 1; letter-spacing: -0.03em;
  }
  .ab-stat-unit { color: var(--warm); }
  .ab-stat-label {
    font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--stone); margin-top: 0.6rem;
  }

  /* ── WHY CHOOSE ── */
  .ab-why { padding: 7rem 5rem; }
  .ab-section-header { display: flex; align-items: flex-start; gap: 6rem; margin-bottom: 5rem; }
  .ab-section-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2rem, 3.5vw, 3.2rem);
    font-weight: 600; color: var(--ink); line-height: 1.1;
    letter-spacing: -0.02em; flex: 1;
  }
  .ab-section-title em { font-style: italic; color: var(--warm); }
  .ab-section-intro { flex: 1; font-size: 0.95rem; line-height: 1.8; color: var(--ink); opacity: 0.6; font-weight: 300; padding-top: 0.5rem; }

  .ab-features-grid {
    display: grid; grid-template-columns: repeat(3, 1fr);
    gap: 2px; background: var(--border);
    border: 1px solid var(--border);
  }
  .ab-feature {
    background: var(--paper);
    padding: 3rem 2.5rem;
    position: relative; overflow: hidden;
    transition: background 0.3s;
  }
  .ab-feature:hover { background: var(--moss); }
  .ab-feature:hover .ab-feature-icon { background: var(--warm); color: #FFFFFF; }
  .ab-feature:hover .ab-feature-name { color: #FFFFFF; }
  .ab-feature:hover .ab-feature-desc { color: rgba(255,255,255,0.55); }
  .ab-feature:hover .ab-feature-num { color: rgba(255,255,255,0.06); }
  .ab-feature-num {
    position: absolute; top: 1.5rem; right: 2rem;
    font-family: 'Cormorant Garamond', serif;
    font-size: 4rem; font-weight: 700; color: rgba(20,18,14,0.05);
    line-height: 1; transition: color 0.3s;
  }
  .ab-feature-icon {
    width: 48px; height: 48px;
    background: var(--blush); border-radius: 4px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.4rem; margin-bottom: 1.75rem;
    transition: all 0.3s;
  }
  .ab-feature-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.35rem; font-weight: 600;
    color: var(--ink); margin-bottom: 0.75rem;
    transition: color 0.3s;
  }
  .ab-feature-desc {
    font-size: 0.875rem; line-height: 1.7;
    color: var(--ink); opacity: 0.6; font-weight: 300;
    transition: color 0.3s;
  }

  /* ── TEAM BANNER ── */
  .ab-team-banner {
    background: var(--moss);
    padding: 6rem 5rem;
    display: grid; grid-template-columns: 1.2fr 1fr;
    gap: 6rem; align-items: center;
  }
  .ab-team-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2rem, 3.5vw, 3.2rem);
    font-weight: 600; color: #FFFFFF;
    line-height: 1.15; letter-spacing: -0.02em;
  }
  .ab-team-title em { font-style: italic; color: var(--warm); }
  .ab-team-desc { font-size: 0.95rem; line-height: 1.8; color: rgba(255,255,255,0.6); font-weight: 300; }
  .ab-team-cta {
    display: inline-flex; align-items: center; gap: 0.75rem;
    margin-top: 2.5rem; padding: 0.9rem 2rem;
    background: var(--warm); color: #FFFFFF;
    font-family: 'Outfit', sans-serif;
    font-size: 0.8rem; font-weight: 500; letter-spacing: 0.08em;
    text-transform: uppercase; border: none; border-radius: 2px;
    cursor: pointer; transition: all 0.25s;
  }
  .ab-team-cta:hover { background: #e06010; transform: translateY(-2px); }

  /* ── VALUES ── */
  .ab-values {
    padding: 7rem 5rem;
    border-top: 1px solid var(--border);
  }
  .ab-values-list {
    display: flex; flex-direction: column;
    border-top: 1px solid var(--border);
    margin-top: 4rem;
  }
  .ab-value-row {
    display: grid; grid-template-columns: 80px 1fr 1fr;
    gap: 3rem; align-items: center;
    padding: 2.5rem 0;
    border-bottom: 1px solid var(--border);
    transition: background 0.2s;
    cursor: default;
  }
  .ab-value-row:hover { background: var(--blush); padding-left: 1rem; padding-right: 1rem; margin: 0 -1rem; }
  .ab-value-idx {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.5rem; color: var(--warm); font-weight: 600;
  }
  .ab-value-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.5rem; font-weight: 600; color: var(--ink);
  }
  .ab-value-desc { font-size: 0.875rem; line-height: 1.7; color: var(--stone); font-weight: 300; }

  /* RESPONSIVE */
  @media (max-width: 900px) {
    .ab-hero { grid-template-columns: 1fr; }
    .ab-hero-right { height: 55vw; }
    .ab-hero-left { padding: 4rem 2rem; }
    .ab-mission { grid-template-columns: 1fr; }
    .ab-mission-sidebar { padding: 3rem 2rem; flex-direction: row; align-items: center; gap: 2rem; border-right: none; border-bottom: 1px solid var(--border); }
    .ab-mission-num { font-size: 4rem; }
    .ab-mission-body { padding: 3rem 2rem; }
    .ab-stats { grid-template-columns: repeat(2, 1fr); }
    .ab-why, .ab-values { padding: 4rem 2rem; }
    .ab-section-header { flex-direction: column; gap: 1.5rem; }
    .ab-features-grid { grid-template-columns: 1fr; }
    .ab-team-banner { grid-template-columns: 1fr; gap: 2rem; padding: 4rem 2rem; }
    .ab-value-row { grid-template-columns: 40px 1fr; }
    .ab-value-desc { display: none; }
  }
`;

const features = [
  { icon: "⚡", name: "High-Speed Fiber", desc: "1 Gbps dedicated connection with enterprise-grade Wi-Fi covering every corner of the space." },
  { icon: "🖥️", name: "Modern Workspace", desc: "Height-adjustable desks, ergonomic chairs, and dual-monitor setups ready for any task." },
  { icon: "🤝", name: "Meeting Rooms", desc: "Six fully equipped rooms with 4K displays, whiteboards, and seamless video conferencing." },
  { icon: "☕", name: "Craft Coffee Bar", desc: "Artisan espresso and pour-over coffee available all day — included in every membership." },
  { icon: "🔒", name: "24/7 Access", desc: "Keycard entry around the clock so you can work on your own schedule, weekends included." },
  { icon: "🧘", name: "Wellness Pods", desc: "Quiet focus pods for deep work, calls, meditation, or just a moment away from the floor." },
];

const values = [
  { name: "Community First", desc: "We believe great work happens through genuine human connection. Every decision puts our members' wellbeing before profit." },
  { name: "Radical Flexibility", desc: "Day pass or dedicated desk, one day or one year — our plans bend to your life, not the other way around." },
  { name: "Intentional Design", desc: "Every piece of furniture, every light source, every plant is chosen to support deep focus and creative energy." },
  { name: "Sustainable Practice", desc: "Carbon-neutral operations, local sourcing, and a strict no single-use plastics policy across all our spaces." },
];

export default function About() {
  const imgRef = useRef(null);
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <>
      <style>{css}</style>

      {/* HERO */}
      <section className="ab-hero">
        <div className="ab-hero-left">
          <div className="ab-tag">Our Story</div>
          <h1 className="ab-hero-title">
            A place where<br />
            <em>work feels</em><br />
            like home
          </h1>
          <p className="ab-hero-lead">
            Founded in 2017 by two architects who were tired of working from cafés, 
            coworking was built to be the workspace they always wished existed.
          </p>
        </div>
        <div className="ab-hero-right">
          <img
            ref={imgRef}
            src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=900&q=80"
            alt="coworking coworking interior"
            className="ab-hero-img"
            onLoad={() => setImgLoaded(true)}
            style={{ opacity: imgLoaded ? 1 : 0, transition: "opacity 0.6s" }}
          />
          <div className="ab-hero-overlay" />
          <div className="ab-year-badge">
            <div className="ab-year-num">Est.</div>
            <div className="ab-year-text">2017</div>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <div className="ab-mission">
        <div className="ab-mission-sidebar">
          <div className="ab-mission-num">01</div>
          <div className="ab-mission-label">Our Mission</div>
        </div>
        <div className="ab-mission-body">
          <h2 className="ab-mission-heading">
            Designed for freelancers,<br />
            entrepreneurs, and <em>remote teams</em>
          </h2>
          <p className="ab-mission-text">
            Our coworking space exists for the people who chose freedom over the traditional office — 
            and refuse to sacrifice quality for it. We provide modern desks, private offices, meeting 
            rooms, and high-speed internet so you can focus on what matters.
          </p>
          <p className="ab-mission-text">
            Whether you need a desk for a day or a dedicated suite for your growing team, 
            our flexible plans adapt to you — not the other way around.
          </p>
        </div>
      </div>

      {/* STATS */}
      <div className="ab-stats">
        {[["240", "+", "Active Members"], ["18", "", "Private Offices"], ["6", "", "Meeting Rooms"], ["98", "%", "Satisfaction"]].map(
          ([n, u, l]) => (
            <div className="ab-stat" key={l}>
              <div className="ab-stat-num">{n}<span className="ab-stat-unit">{u}</span></div>
              <div className="ab-stat-label">{l}</div>
            </div>
          )
        )}
      </div>

      {/* WHY CHOOSE US */}
      <section className="ab-why">
        <div className="ab-section-header">
          <h2 className="ab-section-title">
            Why members<br /><em>choose</em> coworking
          </h2>
          <p className="ab-section-intro">
            We've obsessed over every detail of the member experience — from the chair 
            you sit in to the speed of your connection. Here's what sets us apart.
          </p>
        </div>
        <div className="ab-features-grid">
          {features.map((f, i) => (
            <div className="ab-feature" key={f.name}>
              <div className="ab-feature-num">0{i + 1}</div>
              <div className="ab-feature-icon">{f.icon}</div>
              <div className="ab-feature-name">{f.name}</div>
              <p className="ab-feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM BANNER */}
      <div className="ab-team-banner">
        <div>
          <h2 className="ab-team-title">
            Run by people who<br />
            actually <em>work here</em>
          </h2>
        </div>
        <div>
          <p className="ab-team-desc">
            Our team of 8 is made up of former freelancers, startup founders, and 
            remote workers. We know what you need because we've needed it ourselves. 
            Stop by the front desk — we're always here.
          </p>
          <button className="ab-team-cta">Meet the Team →</button>
        </div>
      </div>

      {/* VALUES */}
      <section className="ab-values">
        <div className="ab-section-header">
          <h2 className="ab-section-title">
            The values we<br /><em>build around</em>
          </h2>
          <p className="ab-section-intro">
            These aren't words on a wall. They're the principles that guide every 
            decision we make — from interior design to membership pricing.
          </p>
        </div>
        <div className="ab-values-list">
          {values.map((v, i) => (
            <div className="ab-value-row" key={v.name}>
              <div className="ab-value-idx">0{i + 1}</div>
              <div className="ab-value-name">{v.name}</div>
              <div className="ab-value-desc">{v.desc}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}