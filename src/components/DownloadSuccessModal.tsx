"use client";

import React from "react";
import Link from "next/link";
import AdSense from "./AdSense";

interface DownloadSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DownloadSuccessModal({ isOpen, onClose }: DownloadSuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="custom-confirm-overlay" 
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(15, 23, 42, 0.6)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "1rem"
      }}
    >
      <div 
        className="download-success-modal"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "var(--bg-card)",
          border: "1px solid var(--border-color)",
          borderRadius: "16px",
          width: "100%",
          maxWidth: "600px",
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          position: "relative",
          animation: "scaleUp 0.3s ease-out"
        }}
      >
        {/* Close button */}
        <button 
          onClick={onClose}
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            background: "none",
            border: "none",
            fontSize: "1.5rem",
            color: "var(--text-dim)",
            cursor: "pointer",
            padding: "0.25rem",
            display: "inline-flex",
            lineHeight: 1
          }}
        >
          &times;
        </button>

        {/* Header Icon + Title */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "0.5rem" }}>
          <div 
            style={{ 
              width: "56px", 
              height: "56px", 
              borderRadius: "50%", 
              background: "rgba(16, 185, 129, 0.1)", 
              border: "2px solid var(--success)",
              color: "var(--success)",
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              marginBottom: "0.5rem"
            }}
          >
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text-main)", margin: 0 }}>
            Your Resume is Ready! 🎉
          </h2>
          <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", margin: 0, maxWidth: "420px", lineHeight: 1.5 }}>
            Your professional ATS-optimized CV has been downloaded. Follow these next steps to stand out in your applications.
          </p>
        </div>

        {/* High Attention Ad placement */}
        <div style={{ background: "rgba(148, 163, 184, 0.03)", borderRadius: "8px", padding: "0.5rem 0" }}>
          <AdSense 
            slot="5678901234" 
            layout="banner" 
            style={{ margin: 0 }} 
          />
        </div>

        {/* Final checklist and next actions */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1rem" }}>
          <div 
            style={{ 
              background: "rgba(99, 102, 241, 0.03)", 
              border: "1px solid rgba(99, 102, 241, 0.1)", 
              borderRadius: "8px", 
              padding: "1rem" 
            }}
          >
            <h4 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--primary)", margin: "0 0 0.5rem 0" }}>
              💡 CV Checklist Before Applying
            </h4>
            <ul style={{ paddingLeft: "1.2rem", fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.6, display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              <li><strong>Tailor:</strong> Match the CV keywords to the specific job listing description.</li>
              <li><strong>Spellcheck:</strong> Proofread carefully; recruiter filters flag simple typos.</li>
              <li><strong>ATS Proof:</strong> Keep a clean format without visual tables, graphics, or text columns.</li>
              <li><strong>Convert:</strong> Submit as a PDF (unless the application explicitly asks for Word).</li>
            </ul>
          </div>
        </div>

        {/* Traffic Driving Section */}
        <div style={{ textAlign: "center", borderTop: "1px solid var(--border-color)", paddingTop: "1.25rem" }}>
          <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "0.75rem" }}>
            Want to maximize your chances? Read our expert guides:
          </div>
          <Link 
            href="/blog/how-to-make-an-ats-friendly-resume" 
            onClick={onClose}
            style={{ 
              display: "inline-flex", 
              alignItems: "center", 
              gap: "0.35rem", 
              color: "var(--primary)", 
              fontSize: "0.9rem", 
              fontWeight: 600, 
              textDecoration: "underline" 
            }}
          >
            How to Pass the ATS Screening in 2026 (Detailed Guide)
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

        {/* Action Button */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button 
            className="btn btn-primary" 
            onClick={onClose}
            style={{ width: "100%", padding: "0.75rem", justifyContent: "center" }}
          >
            Back to Resume Builder
          </button>
        </div>
      </div>
    </div>
  );
}
