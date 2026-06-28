"use client";

import React from "react";
import Link from "next/link";
import AdSense from "@/components/AdSense";

export default function AtsResumeArticle() {
  // JSON-LD Article Schema for Google Search SEO optimization
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": "How to Make an ATS-Friendly Resume in 2026: A Complete Guide",
    "image": [
      "https://cvolt-resume-builder.vercel.app/icon.png"
    ],
    "datePublished": "2026-06-25T08:00:00+08:00",
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
            <span className="blog-tag">ATS Guidance</span>
            <span>•</span>
            <span>June 25, 2026</span>
            <span>•</span>
            <span>6 min read</span>
          </div>
          <h1 className="article-title">How to Make an ATS-Friendly Resume in 2026</h1>
        </header>

        {/* Top banner ad right below headline */}
        <AdSense slot="1111222233" layout="banner" style={{ margin: "1rem 0" }} />

        {/* Content body */}
        <article className="article-content">
          <p>
            Landing a job interview in 2026 isn't just about impressing human recruiters—first, you have to bypass the automated gatekeepers known as <strong>Applicant Tracking Systems (ATS)</strong>. Over 98% of Fortune 500 companies use an ATS to screen resumes before a human ever lays eyes on them. 
          </p>
          <p>
            If your resume formatting is incompatible, or if you miss critical job-specific keywords, the system will discard your application automatically. In this guide, we'll cover exactly how to design and write a highly scannable, ATS-friendly resume to secure your spot in recruiter screens.
          </p>

          <h2>What is an Applicant Tracking System (ATS)?</h2>
          <p>
            An ATS is a software tool recruiters use to collect, sort, search, and rank job applications. When you submit your resume online, the ATS parses (reads) the document, extracts key details (your experience, contact details, education, and skills), and stores them in a searchable database.
          </p>
          <blockquote>
            "An ATS does not make the final hiring decision, but it acts as a filter. If the software cannot parse your formatting, it will read your file as blank or corrupted, lowering your overall search relevance rank."
          </blockquote>

          <h2>1. Focus on Clean, Non-Standard Formatting Resets</h2>
          <p>
            The number one reason resumes fail ATS screening is over-designed layouts. While tables, infographics, multi-column grids, and custom visual graphics look nice to the human eye, they confuse ATS parsing engines.
          </p>
          <ul>
            <li><strong>Use Single-Column Layouts:</strong> ATS parsers read from left-to-right, top-to-bottom. Columns often cause the parser to merge text lines out of order, rendering descriptions incoherent.</li>
            <li><strong>Avoid Text Inside Boxes & Tables:</strong> Many systems ignore table cell structures entirely or group text in unpredictable ways. Use simple margins and tabbed spacings instead.</li>
            <li><strong>Keep Headers & Footers Empty:</strong> Parsers often skip header and footer blocks entirely, meaning critical contact details placed there might get lost.</li>
            <li><strong>Standard Headings:</strong> Stick to standard section names like "Work Experience", "Education", "Skills", and "Projects". Do not rename "Work Experience" to "My Professional Journey".</li>
          </ul>

          {/* Inline Ad Placement within article flow */}
          <AdSense slot="4444555566" layout="banner" style={{ margin: "1.5rem 0" }} />

          <h2>2. Natural Keyword Integration</h2>
          <p>
            Recruiters search the ATS database using specific software keywords derived from the job description. If a job calls for a "Senior Software Engineer" skilled in "React", "TypeScript", and "AWS EC2", your resume needs to include those precise phrases.
          </p>
          <p>
            To optimize your CV keywords, make sure you:
          </p>
          <ol>
            <li><strong>Analyze the Job Description:</strong> Note technical skills, project qualifications, and languages mentioned multiple times.</li>
            <li><strong>Use Exact Keywords:</strong> If the posting asks for "Full Stack Developer", don't write "General Programmer". Matches must be literal.</li>
            <li><strong>Sprinkle, Don't Stuff:</strong> Write keywords naturally into experience achievements and projects. Do not list 100 keywords in tiny white text at the bottom—modern parsers flag keyword stuffing as spam.</li>
          </ol>

          <h2>3. Save in the Correct Document Format</h2>
          <p>
            While many job applications say PDFs are fine, some older ATS parsers still struggle to read text embedded in visual PDFs.
          </p>
          <ul>
            <li><strong>Word Documents (.docx):</strong> Word documents are universally accepted and are the easiest for all ATS systems to parse cleanly.</li>
            <li><strong>PDFs (.pdf):</strong> Ideal for modern platforms, but only if generated via raw text conversion. Never submit a scanned image-only PDF, as the ATS cannot read image pixels.</li>
          </ul>

          {/* Premium Call to Action box */}
          <div className="article-cta-box">
            <h3 className="article-cta-title">Build Your ATS-Scannable CV Online</h3>
            <p className="article-cta-desc">
              Ready to write your resume? Use Cvolt's **free resume builder app** to create, format, and export a 100% ATS-compliant resume in both PDF and Word (.docx) formats with zero accounts or sign-ups.
            </p>
            <Link 
              href="/?view=editor" 
              className="btn btn-primary"
              style={{ textDecoration: "none", padding: "0.75rem 1.75rem", fontSize: "0.95rem", fontWeight: 700 }}
            >
              Start Building Now
            </Link>
          </div>

          <h2>Summary Checklist for 2026</h2>
          <p>
            Before you click upload on any job application portal, run this quick check:
          </p>
          <ul>
            <li>Is it a single-column layout without graphics?</li>
            <li>Did you use standard, clean web-safe fonts (Arial, Georgia, Inter)?</li>
            <li>Did you copy-paste the text into a plain text file to see if it remains readable and ordered?</li>
            <li>Does the file name look professional (e.g. <code>John-Doe-Resume-2026.pdf</code>)?</li>
          </ul>
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
