"use client";

import React from "react";
import AdSense from "./AdSense";

interface TemplatePickerProps {
  selectedStyle: "classic" | "modern" | "executive";
  onStyleChange: (style: "classic" | "modern" | "executive") => void;
  onContinue?: () => void;
}

export default function TemplatePicker({ selectedStyle, onStyleChange, onContinue }: TemplatePickerProps) {
  const templates = [
    {
      id: "classic" as const,
      name: "Classic Academic",
      description: "Traditional ATS-compliant layout with standard fonts and high readability. Best for engineering & finance.",
      badge: "Standard",
      features: ["Serif/Sans fonts", "Compact spacing", "Strict ATS layout"],
      previewColor: "#334155"
    },
    {
      id: "modern" as const,
      name: "Modern Minimalist",
      description: "Clean styling with sleek Inter typography, left-aligned layout, and Charcoal accent colors. Best for general tech.",
      badge: "Popular",
      features: ["Inter font", "Balanced line height", "Charcoal headings"],
      previewColor: "#0f172a"
    },
    {
      id: "executive" as const,
      name: "Elegant Executive",
      description: "Formal Georgia typeface, clean divider rules, and deep Royal Navy accents. Best for management & senior roles.",
      badge: "Premium Style",
      features: ["Georgia font", "Deep Navy accents", "Divider accents"],
      previewColor: "#1e3a8a"
    }
  ];

  return (
    <div className="template-picker-container" style={{ marginBottom: "2rem" }}>
      <h3 
        style={{ 
          fontSize: "1.1rem", 
          fontWeight: 700, 
          color: "var(--text-main)", 
          marginBottom: "1rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem"
        }}
      >
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
        Choose Resume Template Preset
      </h3>

      {/* Grid containing first 2 template options */}
      <div 
        style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
          gap: "1.25rem",
          marginBottom: "1rem"
        }}
      >
        {templates.slice(0, 2).map((tpl) => {
          const isSelected = selectedStyle === tpl.id;
          return (
            <div
              key={tpl.id}
              onClick={() => onStyleChange(tpl.id)}
              className={`template-card ${isSelected ? "selected" : ""}`}
              style={{
                border: isSelected ? "2px solid var(--primary)" : "1px solid var(--border-color)",
                borderRadius: "10px",
                padding: "1.25rem",
                background: isSelected ? "rgba(99, 102, 241, 0.03)" : "var(--bg-card)",
                cursor: "pointer",
                transition: "var(--transition-smooth)",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                boxShadow: isSelected ? "0 4px 15px -3px rgba(99, 102, 241, 0.15)" : "none"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span 
                  style={{ 
                    fontSize: "0.75rem", 
                    fontWeight: 600, 
                    color: isSelected ? "var(--primary)" : "var(--text-muted)",
                    background: isSelected ? "rgba(99, 102, 241, 0.08)" : "rgba(148, 163, 184, 0.08)",
                    padding: "0.15rem 0.5rem",
                    borderRadius: "4px"
                  }}
                >
                  {tpl.badge}
                </span>
                
                {/* Visual Circle Indicator */}
                <div 
                  style={{ 
                    width: "14px", 
                    height: "14px", 
                    borderRadius: "50%", 
                    border: isSelected ? "4px solid var(--primary)" : "1.5px solid var(--text-dim)",
                    background: "white"
                  }}
                />
              </div>

              <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-main)", margin: 0 }}>
                {tpl.name}
              </h4>
              <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", margin: 0, flexGrow: 1, lineHeight: 1.45 }}>
                {tpl.description}
              </p>

              {/* Bullet Features */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginTop: "0.25rem" }}>
                {tpl.features.map((f, i) => (
                  <span 
                    key={i} 
                    style={{ 
                      fontSize: "0.7rem", 
                      color: "var(--text-muted)", 
                      background: "rgba(148, 163, 184, 0.05)",
                      padding: "0.1rem 0.35rem",
                      borderRadius: "3px",
                      border: "1px solid rgba(148, 163, 184, 0.1)"
                    }}
                  >
                    ✓ {f}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Ad placement between resume template options as requested */}
      <AdSense 
        slot="3456789012" 
        layout="banner" 
        style={{ margin: "1rem 0" }} 
      />

      {/* Grid containing the remaining template option(s) */}
      <div 
        style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
          gap: "1.25rem",
          marginTop: "1rem"
        }}
      >
        {templates.slice(2).map((tpl) => {
          const isSelected = selectedStyle === tpl.id;
          return (
            <div
              key={tpl.id}
              onClick={() => onStyleChange(tpl.id)}
              className={`template-card ${isSelected ? "selected" : ""}`}
              style={{
                border: isSelected ? "2px solid var(--primary)" : "1px solid var(--border-color)",
                borderRadius: "10px",
                padding: "1.25rem",
                background: isSelected ? "rgba(99, 102, 241, 0.03)" : "var(--bg-card)",
                cursor: "pointer",
                transition: "var(--transition-smooth)",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                boxShadow: isSelected ? "0 4px 15px -3px rgba(99, 102, 241, 0.15)" : "none"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span 
                  style={{ 
                    fontSize: "0.75rem", 
                    fontWeight: 600, 
                    color: isSelected ? "var(--primary)" : "var(--text-muted)",
                    background: isSelected ? "rgba(99, 102, 241, 0.08)" : "rgba(148, 163, 184, 0.08)",
                    padding: "0.15rem 0.5rem",
                    borderRadius: "4px"
                  }}
                >
                  {tpl.badge}
                </span>
                
                <div 
                  style={{ 
                    width: "14px", 
                    height: "14px", 
                    borderRadius: "50%", 
                    border: isSelected ? "4px solid var(--primary)" : "1.5px solid var(--text-dim)",
                    background: "white"
                  }}
                />
              </div>

              <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-main)", margin: 0 }}>
                {tpl.name}
              </h4>
              <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", margin: 0, flexGrow: 1, lineHeight: 1.45 }}>
                {tpl.description}
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginTop: "0.25rem" }}>
                {tpl.features.map((f, i) => (
                  <span 
                    key={i} 
                    style={{ 
                      fontSize: "0.7rem", 
                      color: "var(--text-muted)", 
                      background: "rgba(148, 163, 184, 0.05)",
                      padding: "0.1rem 0.35rem",
                      borderRadius: "3px",
                      border: "1px solid rgba(148, 163, 184, 0.1)"
                    }}
                  >
                    ✓ {f}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Continue CTA button */}
      {onContinue && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
          <button
            onClick={onContinue}
            className="btn btn-primary"
            style={{
              width: "100%",
              maxWidth: "360px",
              padding: "0.85rem",
              fontSize: "0.95rem",
              fontWeight: 700,
              justifyContent: "center",
              boxShadow: "0 4px 15px rgba(99, 102, 241, 0.2)",
              display: "inline-flex",
              alignItems: "center"
            }}
          >
            Use Selected Preset & Fill Details
            <svg style={{ marginLeft: "0.5rem" }} width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
