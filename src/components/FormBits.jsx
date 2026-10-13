import React from "react";

export function Field({ label, children, required, hint }) {
  return (
    <div>
      <label className="block text-xs text-muted-foreground mb-1.5 font-medium">
        {label}{required && <span className="text-destructive"> *</span>}
      </label>
      {children}
      {hint && <p className="text-[11px] text-muted-foreground mt-1">{hint}</p>}
    </div>
  );
}

export function TextInput(props) {
  return <input {...props} className={`inp ${props.className || ""}`} />;
}

export function SelectInput({ children, ...props }) {
  return <select {...props} className={`inp ${props.className || ""}`}>{children}</select>;
}

export function TextAreaInput(props) {
  return <textarea {...props} className={`inp min-h-[90px] ${props.className || ""}`} />;
}

export function SectionCard({ title, icon, children }) {
  return (
    <div className="bg-card rounded-2xl border border-border shadow-card p-5 sm:p-6">
      <h3 className="font-heading font-bold text-lg mb-4 flex items-center gap-2">{icon}{title}</h3>
      {children}
    </div>
  );
}