"use client";

import React, { useState } from "react";
import Link from "next/link";
import AdSense from "@/components/AdSense";

export default function BlogIndex() {
  const articles = [
    {
      slug: "how-to-make-an-ats-friendly-resume",
      title: "How to Make an ATS-Friendly Resume in 2026",
      desc: "Learn the secrets of Applicant Tracking Systems (ATS) and write a high-scoring resume that bypasses automated filters to land interviews.",
      tag: "ATS Guidance",
      readTime: "6 min read",
      date: "June 25, 2026"
    },
    {
      slug: "top-10-resume-layout-mistakes",
      title: "Top 10 Resume Layout Mistakes that Cost You Jobs",
      desc: "Avoid formatting disasters! Why columns, graphs, and custom icons can break ATS parsers and cause direct rejections from recruiters.",
      tag: "Layout Design",
      readTime: "4 min read",
      date: "May 18, 2026"
    },
    {
      slug: "writing-a-tech-resume-ultimate-guide",
      title: "Writing a Tech Resume: The Ultimate Guide",
      desc: "How to highlight languages, frameworks, cloud tools, and project bullet points with active verb styles and metrics for senior roles.",
      tag: "Career Advice",
      readTime: "8 min read",
      date: "April 12, 2026"
    }
  ];

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <header className="app-header" style={{ padding: "1.25rem 2rem", background: "rgba(255, 255, 255, 0.8)", backdropFilter: "blur(8px)", borderBottom: "1px solid var(--border-color)", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <div className="brand-logo-container" style={{ width: "2.25rem", height: "2.25rem" }}>
                <img src="/favicon.png" alt="Cvolt Logo" className="brand-logo-img" />
              </div>
              <h1 className="brand-title" style={{ fontSize: "1.25rem", margin: 0, color: "var(--text-main)" }}>Cvolt Resume Builder</h1>
            </Link>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "1.25rem" }}>
            <Link href="/?view=editor" style={{ color: "var(--primary)", textDecoration: "none", fontWeight: 600, fontSize: "0.9rem", display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Go to Resume Builder
            </Link>
          </div>
        </div>
      </header>

      {/* Main Blog Pane */}
      <main className="blog-container">
        {/* Banner Ad at Top */}
        <AdSense slot="1122334455" layout="banner" style={{ margin: "0 0 1.5rem 0" }} />

        {/* Blog Header Intro */}
        <div className="blog-header">
          <div className="landing-badge" style={{ marginBottom: "0.25rem" }}>
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Cvolt Career Guides
          </div>
          <h1 className="blog-title">
            The Cvolt <span>Career & Resume Blog</span>
          </h1>
          <p className="blog-subtitle">
            Get expert guidance on writing an ATS friendly resume builder project, downloading clean resume templates, using AI to optimize CV keywords, and bypassing HR tracking systems.
          </p>
        </div>

        {/* Featured Post Card */}
        <div 
          style={{
            background: "linear-gradient(135deg, rgba(99, 102, 241, 0.03), rgba(139, 92, 246, 0.03))",
            border: "1.5px solid rgba(99, 102, 241, 0.2)",
            borderRadius: "20px",
            padding: "2rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem",
            alignItems: "center",
            boxShadow: "0 10px 30px -15px rgba(99, 102, 241, 0.15)",
            animation: "fadeIn 0.6s ease-out"
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", fontSize: "0.8rem" }}>
              <span className="blog-tag" style={{ background: "rgba(99, 102, 241, 0.12)" }}>★ Featured Article</span>
              <span style={{ color: "var(--text-muted)" }}>{articles[0].readTime}</span>
            </div>
            <h2 style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--text-main)", margin: 0, lineHeight: 1.25 }}>
              {articles[0].title}
            </h2>
            <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", margin: 0, lineHeight: 1.5 }}>
              {articles[0].desc}
            </p>
            <div style={{ marginTop: "0.5rem" }}>
              <Link 
                href={`/blog/${articles[0].slug}`}
                className="btn btn-primary"
                style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", padding: "0.6rem 1.25rem" }}
              >
                Read Full Guide
                <svg style={{ marginLeft: "0.4rem" }} width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
          
          {/* Custom Visual Representation instead of standard image */}
          <div 
            style={{ 
              height: "220px", 
              background: "linear-gradient(135deg, #4f46e5, #8b5cf6)", 
              borderRadius: "12px", 
              position: "relative", 
              overflow: "hidden",
              boxShadow: "0 10px 20px -5px rgba(79, 70, 229, 0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {/* Visual CV mockup */}
            <div 
              style={{ 
                width: "140px", 
                height: "180px", 
                background: "white", 
                borderRadius: "4px", 
                padding: "1rem", 
                display: "flex", 
                flexDirection: "column", 
                gap: "0.5rem",
                boxShadow: "0 15px 25px rgba(0,0,0,0.15)",
                transform: "rotate(-5deg) translateY(10px)"
              }}
            >
              <div style={{ width: "40px", height: "6px", background: "#4f46e5", borderRadius: "2px" }} />
              <div style={{ width: "80px", height: "4px", background: "#94a3b8", borderRadius: "1px" }} />
              <div style={{ borderBottom: "1px solid #e2e8f0", margin: "2px 0" }} />
              <div style={{ width: "100%", height: "4px", background: "#cbd5e1", borderRadius: "1px" }} />
              <div style={{ width: "90%", height: "4px", background: "#cbd5e1", borderRadius: "1px" }} />
              <div style={{ width: "95%", height: "4px", background: "#cbd5e1", borderRadius: "1px" }} />
              <div style={{ width: "50px", height: "5px", background: "#8b5cf6", borderRadius: "2px", marginTop: "4px" }} />
              <div style={{ width: "100%", height: "4px", background: "#e2e8f0", borderRadius: "1px" }} />
              <div style={{ width: "85%", height: "4px", background: "#e2e8f0", borderRadius: "1px" }} />
            </div>

            {/* Checkmark overlay badge */}
            <div 
              style={{
                position: "absolute",
                top: "30px",
                right: "30px",
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background: "#10b981",
                border: "3px solid white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                transform: "rotate(10deg)"
              }}
            >
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Regular Article Grid */}
        <div style={{ marginTop: "2rem" }}>
          <h3 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-main)", marginBottom: "1.5rem" }}>
            More Career Articles & Guides
          </h3>
          
          <div className="blog-grid">
            {articles.slice(1).map((art, idx) => (
              <article key={idx} className="blog-card">
                <div className="blog-card-content">
                  <div className="blog-card-meta">
                    <span className="blog-tag">{art.tag}</span>
                    <span>•</span>
                    <span>{art.readTime}</span>
                  </div>
                  <h4 className="blog-card-title">{art.title}</h4>
                  <p className="blog-card-description">{art.desc}</p>
                  <Link 
                    href={`/blog/${art.slug}`} 
                    className="blog-card-link"
                  >
                    Read Guide
                    <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid var(--border-color)", padding: "3rem 1.5rem", marginTop: "auto", background: "white", width: "100%" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center", display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center" }}>
          <div className="brand" style={{ justifyContent: "center", marginBottom: "0.5rem" }}>
            <div className="brand-logo-container" style={{ width: "2rem", height: "2rem" }}>
              <img src="/favicon.png" alt="Cvolt Logo" className="brand-logo-img" />
            </div>
            <span className="brand-title" style={{ fontSize: "1.1rem" }}>Cvolt Resume Builder</span>
          </div>
          <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-muted)" }}>
            © {new Date().getFullYear()} Cvolt. Build CV Online Free. All rights reserved.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", fontSize: "0.85rem" }}>
            <Link href="/" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Home Builder</Link>
            <Link href="/blog/how-to-make-an-ats-friendly-resume" style={{ color: "var(--text-muted)", textDecoration: "none" }}>ATS CV Guide</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
