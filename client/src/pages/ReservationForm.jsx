import React, { useState } from "react";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=Outfit:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ink:   #1A1A2E;
    --paper: #F0F0F0;
    --warm:  #F07120;
    --stone: #7A828F;
    --moss:  #2C3E50;
    --blush: #E4E8EC;
    --err:   #C0392B;
    --border: rgba(26,26,46,0.14);
  }

  body { background: var(--paper); font-family: 'Outfit', sans-serif; color: var(--ink); min-height: 100vh; }

  /* PAGE WRAPPER */
  .rf-page {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  /* LEFT PANEL */
  .rf-left {
    background: var(--moss);
    padding: 5rem 4rem;
    display: flex; flex-direction: column; justify-content: space-between;
    position: relative; overflow: hidden;
  }
  .rf-left::before {
    content: 'BOOK';
    position: absolute; bottom: -2rem; left: -1rem;
    font-family: 'Cormorant Garamond', serif;
    font-size: 16rem; font-weight: 700;
    color: rgba(255,255,255,0.03); line-height: 1;
    pointer-events: none; white-space: nowrap;
  }
  .rf-logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.6rem; font-weight: 700; color: #FFFFFF;
    letter-spacing: -0.02em;
  }
  .rf-logo span { color: var(--warm); }

  .rf-left-body { flex: 1; display: flex; flex-direction: column; justify-content: center; padding: 3rem 0; }
  .rf-left-tag {
    font-size: 0.7rem; letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--warm); display: flex; align-items: center; gap: 0.6rem; margin-bottom: 2rem;
  }
  .rf-left-tag::before { content: ''; width: 28px; height: 1px; background: var(--warm); }
  .rf-left-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2.5rem, 4vw, 3.8rem);
    font-weight: 700; color: #FFFFFF; line-height: 1.05;
    letter-spacing: -0.02em; margin-bottom: 1.5rem;
  }
  .rf-left-title em { font-style: italic; color: var(--warm); }
  .rf-left-desc {
    font-size: 0.95rem; line-height: 1.8;
    color: rgba(255,255,255,0.55); font-weight: 300; max-width: 340px;
  }

  .rf-rooms-preview { display: flex; flex-direction: column; gap: 0.75rem; margin-top: 3rem; }
  .rf-room-pill {
    display: flex; align-items: center; gap: 1rem;
    padding: 0.9rem 1.25rem;
    border: 1px solid rgba(212,169,106,0.2);
    border-radius: 3px;
    transition: border-color 0.25s, background 0.25s;
    cursor: default;
  }
  .rf-room-pill:hover { border-color: var(--warm); background: rgba(212,169,106,0.06); }
  .rf-room-pill-icon { font-size: 1.1rem; }
  .rf-room-pill-name { font-size: 0.85rem; color: rgba(255,255,255,0.7); flex: 1; }
  .rf-room-pill-price { font-family: 'Cormorant Garamond', serif; font-size: 1rem; color: var(--warm); }

  .rf-left-footer { font-size: 0.72rem; color: rgba(255,255,255,0.25); letter-spacing: 0.06em; }

  /* RIGHT PANEL — FORM */
  .rf-right {
    background: var(--paper);
    padding: 5rem 4.5rem;
    display: flex; flex-direction: column; justify-content: center;
    overflow-y: auto;
  }
  .rf-form-header { margin-bottom: 2.75rem; }
  .rf-form-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem; font-weight: 700; color: var(--ink);
    letter-spacing: -0.02em; margin-bottom: 0.5rem;
  }
  .rf-form-sub { font-size: 0.875rem; color: var(--stone); font-weight: 300; }

  /* STEPS INDICATOR */
  .rf-steps {
    display: flex; align-items: center; gap: 0; margin-bottom: 3rem;
  }
  .rf-step {
    display: flex; align-items: center; gap: 0.5rem;
    font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--stone); transition: color 0.3s;
  }
  .rf-step.active { color: var(--ink); }
  .rf-step.done { color: var(--moss); }
  .rf-step-dot {
    width: 24px; height: 24px; border-radius: 50%;
    border: 1.5px solid currentColor;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.65rem; font-weight: 500; flex-shrink: 0;
    transition: all 0.3s;
  }
  .rf-step.active .rf-step-dot { background: var(--warm); color: #FFFFFF; border-color: var(--warm); }
  .rf-step.done .rf-step-dot { background: var(--moss); color: #FFFFFF; border-color: var(--moss); }
  .rf-step-line { flex: 1; height: 1px; background: var(--border); margin: 0 0.5rem; }

  /* FIELD */
  .rf-field { margin-bottom: 1.5rem; position: relative; }
  .rf-label {
    display: block; font-size: 0.7rem; letter-spacing: 0.12em;
    text-transform: uppercase; color: var(--stone);
    margin-bottom: 0.55rem; font-weight: 500;
  }
  .rf-input, .rf-select {
    width: 100%; padding: 0.9rem 1rem;
    background: white; color: var(--ink);
    border: 1.5px solid var(--border);
    border-radius: 3px; outline: none;
    font-family: 'Outfit', sans-serif;
    font-size: 0.95rem; font-weight: 400;
    transition: border-color 0.2s, box-shadow 0.2s;
    appearance: none;
  }
  .rf-input::placeholder { color: rgba(20,18,14,0.3); }
  .rf-input:focus, .rf-select:focus {
    border-color: var(--warm);
    box-shadow: 0 0 0 3px rgba(212,169,106,0.12);
  }
  .rf-input.error { border-color: var(--err); }
  .rf-error-msg {
    font-size: 0.72rem; color: var(--err);
    margin-top: 0.4rem; display: flex; align-items: center; gap: 0.3rem;
  }

  /* SELECT WRAPPER */
  .rf-select-wrap { position: relative; }
  .rf-select-wrap::after {
    content: '↓'; position: absolute; right: 1rem; top: 50%;
    transform: translateY(-50%); pointer-events: none;
    color: var(--stone); font-size: 0.8rem;
  }

  /* ROOM CARDS */
  .rf-room-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; }
  .rf-room-card {
    padding: 1.1rem 0.9rem; border: 1.5px solid var(--border);
    border-radius: 3px; cursor: pointer;
    transition: all 0.2s; background: white; text-align: center;
  }
  .rf-room-card:hover { border-color: rgba(212,169,106,0.5); background: var(--blush); }
  .rf-room-card.selected { border-color: var(--warm); background: rgba(212,169,106,0.08); }
  .rf-room-card-icon { font-size: 1.5rem; margin-bottom: 0.4rem; }
  .rf-room-card-name { font-size: 0.78rem; font-weight: 500; color: var(--ink); }
  .rf-room-card-price { font-size: 0.7rem; color: var(--stone); margin-top: 0.2rem; }

  /* TWO COLUMNS */
  .rf-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }

  /* DURATION */
  .rf-duration-btns { display: flex; gap: 0.6rem; }
  .rf-dur-btn {
    flex: 1; padding: 0.75rem 0.5rem; border: 1.5px solid var(--border);
    border-radius: 3px; background: white; cursor: pointer;
    font-family: 'Outfit', sans-serif; font-size: 0.8rem; color: var(--stone);
    transition: all 0.2s; text-align: center;
  }
  .rf-dur-btn:hover { border-color: rgba(212,169,106,0.5); }
  .rf-dur-btn.selected { border-color: var(--warm); background: rgba(212,169,106,0.08); color: var(--ink); font-weight: 500; }

  /* DIVIDER */
  .rf-divider { height: 1px; background: var(--border); margin: 1.75rem 0; }

  /* SUBMIT */
  .rf-submit {
    width: 100%; padding: 1.05rem;
    background: var(--warm); color: #FFFFFF;
    border: none; border-radius: 3px; cursor: pointer;
    font-family: 'Outfit', sans-serif;
    font-size: 0.85rem; font-weight: 500; letter-spacing: 0.1em;
    text-transform: uppercase; transition: all 0.25s;
    position: relative; overflow: hidden;
  }
  .rf-submit:hover:not(:disabled) { background: #e06010; transform: translateY(-2px); box-shadow: 0 10px 30px rgba(240,113,32,0.3); }
  .rf-submit:disabled { opacity: 0.5; cursor: not-allowed; }
  .rf-submit-note { text-align: center; font-size: 0.72rem; color: var(--stone); margin-top: 1rem; }

  /* SUCCESS */
  .rf-success {
    display: flex; flex-direction: column; align-items: center;
    justify-content: center; text-align: center; height: 100%;
    padding: 2rem; animation: fadeIn 0.4s ease;
  }
  .rf-success-icon {
    width: 72px; height: 72px; border-radius: 50%;
    background: var(--warm); color: white;
    display: flex; align-items: center; justify-content: center;
    font-size: 2rem; margin-bottom: 2rem;
  }
  .rf-success-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.2rem; font-weight: 700; color: var(--ink); margin-bottom: 1rem;
  }
  .rf-success-desc { font-size: 0.95rem; color: var(--stone); line-height: 1.7; max-width: 320px; }
  .rf-success-detail {
    margin: 2rem 0; padding: 1.5rem 2rem;
    background: var(--blush); border-radius: 4px;
    font-size: 0.85rem; line-height: 1.9; color: var(--ink); text-align: left; width: 100%; max-width: 340px;
  }
  .rf-success-detail strong { color: var(--warm); }
  .rf-reset-btn {
    margin-top: 1rem; padding: 0.75rem 2rem;
    background: transparent; border: 1.5px solid var(--border);
    border-radius: 3px; font-family: 'Outfit', sans-serif;
    font-size: 0.8rem; color: var(--stone); cursor: pointer;
    transition: all 0.2s;
  }
  .rf-reset-btn:hover { border-color: var(--ink); color: var(--ink); }

  @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

  @media (max-width: 860px) {
    .rf-page { grid-template-columns: 1fr; }
    .rf-left { display: none; }
    .rf-right { padding: 3rem 1.75rem; }
    .rf-room-cards { grid-template-columns: 1fr; }
    .rf-row { grid-template-columns: 1fr; }
  }
`;

const ROOMS = [
  { id: "open", icon: "🌿", name: "Open Space", price: "25€/day" },
  { id: "private", icon: "🏛️", name: "Private Office", price: "450€/mo" },
  { id: "meeting", icon: "🤝", name: "Meeting Room", price: "150€/half" },
];

const DURATIONS = ["Half Day", "Full Day", "Week", "Month"];

const getStep = (form) => {
  if (!form.room) return 1;
  if (!form.name || !form.email) return 2;
  return 3;
};

export default function ReservationForm() {
  const [form, setForm] = useState({ name: "", email: "", date: "", room: "", duration: "Full Day" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Valid email required";
    if (!form.date) e.date = "Please select a date";
    if (!form.room) e.room = "Please select a space";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) setSubmitted(true);
  };

  const step = getStep(form);

  return (
    <>
      <style>{css}</style>
      <div className="rf-page">

        {/* LEFT */}
        <div className="rf-left">
          <div className="rf-logo">CO<span>WORKING</span></div>
          <div className="rf-left-body">
            <div className="rf-left-tag">Workspace Booking</div>
            <h2 className="rf-left-title">Reserve your<br /><em>perfect</em><br />workspace</h2>
            <p className="rf-left-desc">Choose from our curated spaces. Flexible plans, same-day confirmation.</p>
            <div className="rf-rooms-preview">
              {ROOMS.map(r => (
                <div className="rf-room-pill" key={r.id}>
                  <span className="rf-room-pill-icon">{r.icon}</span>
                  <span className="rf-room-pill-name">{r.name}</span>
                  <span className="rf-room-pill-price">{r.price}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rf-left-footer">Coworking · Paris 11e · hello@coworking.com</div>
        </div>

        {/* RIGHT */}
        <div className="rf-right">
          {submitted ? (
            <div className="rf-success">
              <div className="rf-success-icon">✓</div>
              <div className="rf-success-title">You're all set!</div>
              <p className="rf-success-desc">Your workspace has been reserved. A confirmation email is on its way.</p>
              <div className="rf-success-detail">
                <div><strong>Name</strong> — {form.name}</div>
                <div><strong>Space</strong> — {ROOMS.find(r => r.id === form.room)?.name}</div>
                <div><strong>Date</strong> — {form.date}</div>
                <div><strong>Duration</strong> — {form.duration}</div>
              </div>
              <button className="rf-reset-btn" onClick={() => { setForm({ name: "", email: "", date: "", room: "", duration: "Full Day" }); setSubmitted(false); }}>
                Make another reservation
              </button>
            </div>
          ) : (
            <>
              <div className="rf-form-header">
                <div className="rf-form-title">Book a Space</div>
                <div className="rf-form-sub">Takes less than 2 minutes · Free cancellation 24h before</div>
              </div>

              {/* STEPS */}
              <div className="rf-steps">
                {["Choose Space", "Your Details", "Date & Time"].map((s, i) => (
                  <React.Fragment key={s}>
                    <div className={`rf-step ${step > i + 1 ? "done" : step === i + 1 ? "active" : ""}`}>
                      <div className="rf-step-dot">{step > i + 1 ? "✓" : i + 1}</div>
                      {s}
                    </div>
                    {i < 2 && <div className="rf-step-line" />}
                  </React.Fragment>
                ))}
              </div>

              <form onSubmit={handleSubmit} noValidate>

                {/* ROOM SELECTION */}
                <div className="rf-field">
                  <label className="rf-label">Select a Space *</label>
                  <div className="rf-room-cards">
                    {ROOMS.map(r => (
                      <div
                        key={r.id}
                        className={`rf-room-card ${form.room === r.id ? "selected" : ""}`}
                        onClick={() => set("room", r.id)}
                      >
                        <div className="rf-room-card-icon">{r.icon}</div>
                        <div className="rf-room-card-name">{r.name}</div>
                        <div className="rf-room-card-price">{r.price}</div>
                      </div>
                    ))}
                  </div>
                  {errors.room && <div className="rf-error-msg">⚠ {errors.room}</div>}
                </div>

                <div className="rf-divider" />

                {/* NAME + EMAIL */}
                <div className="rf-row">
                  <div className="rf-field">
                    <label className="rf-label">Full Name *</label>
                    <input
                      className={`rf-input ${errors.name ? "error" : ""}`}
                      type="text" placeholder="Léa Fontaine"
                      value={form.name} onChange={e => set("name", e.target.value)}
                    />
                    {errors.name && <div className="rf-error-msg">⚠ {errors.name}</div>}
                  </div>
                  <div className="rf-field">
                    <label className="rf-label">Email Address *</label>
                    <input
                      className={`rf-input ${errors.email ? "error" : ""}`}
                      type="email" placeholder="lea@studio.com"
                      value={form.email} onChange={e => set("email", e.target.value)}
                    />
                    {errors.email && <div className="rf-error-msg">⚠ {errors.email}</div>}
                  </div>
                </div>

                {/* DATE */}
                <div className="rf-field">
                  <label className="rf-label">Date *</label>
                  <input
                    className={`rf-input ${errors.date ? "error" : ""}`}
                    type="date"
                    value={form.date} onChange={e => set("date", e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                  />
                  {errors.date && <div className="rf-error-msg">⚠ {errors.date}</div>}
                </div>

                {/* DURATION */}
                <div className="rf-field">
                  <label className="rf-label">Duration</label>
                  <div className="rf-duration-btns">
                    {DURATIONS.map(d => (
                      <button
                        key={d} type="button"
                        className={`rf-dur-btn ${form.duration === d ? "selected" : ""}`}
                        onClick={() => set("duration", d)}
                      >{d}</button>
                    ))}
                  </div>
                </div>

                <div className="rf-divider" />

                <button className="rf-submit" type="submit">
                  Confirm Reservation →
                </button>
                <p className="rf-submit-note">🔒 Secure booking · Free cancellation · Instant confirmation</p>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}