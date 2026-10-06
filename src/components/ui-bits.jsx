import React from "react";

export function SectionTitle({ eyebrow, title, subtitle, center }) {
  return (
    <div className={`${center ? "text-center mx-auto" : ""} max-w-2xl mb-8`}>
      {eyebrow && <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/50 text-earth text-xs font-bold mb-3">{eyebrow}</div>}
      <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-foreground text-balance">{title}</h2>
      {subtitle && <p className="mt-3 text-muted-foreground leading-relaxed">{subtitle}</p>}
    </div>
  );
}

export function StatCard({ icon, label, value, suffix, tone = "primary" }) {
  const tones = {
    primary: "bg-primary/10 text-primary",
    earth: "bg-earth/10 text-earth",
    olive: "bg-olive/10 text-olive",
    amber: "bg-amber-100 text-amber-700"
  };
  return (
    <div className="bg-card rounded-2xl p-5 border border-border shadow-card">
      <div className={`w-11 h-11 rounded-xl grid place-items-center mb-3 ${tones[tone]}`}>{icon}</div>
      <div className="text-2xl font-heading font-extrabold text-foreground">{value}<span className="text-sm font-medium text-muted-foreground"> {suffix}</span></div>
      <div className="text-sm text-muted-foreground mt-0.5">{label}</div>
    </div>
  );
}

export function Pill({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-3.5 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
        active ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground/70 hover:bg-accent"
      }`}
    >
      {children}
    </button>
  );
}