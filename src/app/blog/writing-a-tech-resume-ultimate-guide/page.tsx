"use client";

import React from "react";
import Link from "next/link";
import AdSense from "@/components/AdSense";

export default function TechResumeGuideArticle() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": "Writing a Tech Resume: The Ultimate Guide in 2026",
    "image": [
      "https://cvolt-resume-builder.vercel.app/icon.png"
    ],
    "datePublished": "2026-04-12T08:00:00+08:00",
    "dateModified": "2026-06-28T09:00:00+08:00",
    "author": [{
      "@type": "Person",
      "name": "Cvolt Career Experts",
      "url": "https://cvolt-resume-builder.vercel.app/blog"
    }]
  };

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
            <Link href="/blog" style={{ color: "var(--text-muted)", textDecoration: "none", fontWeight: 600, fontSize: "0.9rem" }}>
              ← All Articles
            </Link>
            <Link href="/?view=editor" className="btn btn-primary" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", padding: "0.5rem 1rem", fontSize: "0.85rem" }}>
              Build CV Now
            </Link>
          </div>
        </div>
      </header>

      {/* Main content pane */}
      <main className="article-container">
        {/* Article Header */}
        <header className="article-header">
          <div className="article-meta">
            <span className="blog-tag">Career Advice</span>
            <span>•</span>
            <span>April 12, 2026</span>
            <span>•</span>
            <span>8 min read</span>
          </div>
          <h1 className="article-title">Writing a Tech Resume: The Ultimate Guide</h1>
        </header>

        {/* Top banner ad */}
        <AdSense slot="3344556677" layout="banner" style={{ margin: "1rem 0" }} />

        {/* Content body */}
        <article className="article-content">
          <p>
            The technology sector is one of the most competitive fields in the job market today. When applying for roles as a developer, cloud architect, product owner, or data scientist, your resume needs to demonstrate hands-on experience and technical depth in a layout that automated scrapers can digest.
          </p>
          <p>
            In this guide, we outline the exact formula for writing a top-tier tech resume that will capture recruiter attention and pass automated ATS checks.
          </p>

          <h2>1. Place Your Skills Section First (Or High Up)</h2>
          <p>
            In technical roles, recruiters want to know immediately what languages, frameworks, and cloud tools you have worked with. Place a clean, categorized "Skills" section right after your contact info or professional summary.
          </p>
          <blockquote>
            "Create categorizations for your technical skills: e.g. Languages (TypeScript, SQL), Frameworks (React, Node.js), Databases (PostgreSQL, MongoDB), and Cloud/Tools (AWS S3, Docker, Git)."
          </blockquote>

          <h2>2. The Google X-Y-Z Action Formula</h2>
          <p>
            Do not just list your daily tasks in your experience bullets (e.g., "Responsible for maintaining code"). Recruiters want to see concrete accomplishments and quantitative results.
          </p>
          <p>
            Use Google's formula: <strong>"Accomplished [X] as measured by [Y], by doing [Z]"</strong>.
          </p>
          <ul>
            <li><strong>Bad:</strong> Optimized relational databases.</li>
            <li><strong>Good:</strong> Optimized database indexes and query plans (Z), reducing search response latency by 35% (Y), as measured by core application performance metrics (X).</li>
          </ul>

          {/* Inline Ad */}
          <AdSense slot="8899001122" layout="banner" style={{ margin: "1.5rem 0" }} />

          <h2>3. Create an Independent Projects Section</h2>
          <p>
            If you are junior, self-taught, or transitioning, open-source work and side projects are crucial. Include a dedicated "Projects" section detailing:
          </p>
          <ul>
            <li><strong>Project Name & Live URL:</strong> Link to the public GitHub repository or a hosted version (like Netlify or Vercel).</li>
            <li><strong>Technologies Used:</strong> List the languages and libraries explicitly.</li>
            <li><strong>Key Challenge Solved:</strong> Write bullet points explaining how you handled state management, resolved async loading conflicts, or automated compilation.</li>
          </ul>

          <h2>4. Keep it Chronological and Simple</h2>
          <p>
            Stick to a standard chronological layout. Start with your most recent tech role and work backward. Ensure headings follow clear font hierarchies, using clean sans-serif layouts (like Inter) or high-readability serifs (like Georgia) for premium readability.
          </p>

          {/* Premium Call to Action box */}
          <div className="article-cta-box">
            <h3 className="article-cta-title">Write Your Tech Resume Online Free</h3>
            <p className="article-cta-desc">
              Get started instantly. Cvolt's interactive resume editor lets you write your professional history, optimize skills categorization, and export a clean, single-column, recruiter-ready resume in seconds.
            </p>
            <Link 
              href="/?view=editor" 
              className="btn btn-primary"
              style={{ textDecoration: "none", padding: "0.75rem 1.75rem", fontSize: "0.95rem", fontWeight: 700 }}
            >
              Build Tech Resume
            </Link>
          </div>
        </article>
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
            <Link href="/blog" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Career Blog</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
