"use client";

import React from "react";
import Link from "next/link";
import AdSense from "@/components/AdSense";

export default function LayoutMistakesArticle() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": "Top 10 Resume Layout Mistakes That Cost You Jobs in 2026",
    "image": [
      "https://cvolt-resume-builder.vercel.app/icon.png"
    ],
    "datePublished": "2026-05-18T08:00:00+08:00",
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
            <span className="blog-tag">Layout Design</span>
            <span>•</span>
            <span>May 18, 2026</span>
            <span>•</span>
            <span>4 min read</span>
          </div>
          <h1 className="article-title">Top 10 Resume Layout Mistakes That Cost You Jobs</h1>
        </header>

        {/* Top banner ad */}
        <AdSense slot="2233445566" layout="banner" style={{ margin: "1rem 0" }} />

        {/* Content body */}
        <article className="article-content">
          <p>
            When writing a resume, layout matters just as much as wording. In fact, standard corporate hiring software can reject an application in under three seconds if the document structure is unreadable.
          </p>
          <p>
            Here are the top 10 resume layout mistakes that job seekers make in 2026, and how to fix them to bypass automated filters.
          </p>

          <h2>1. Multi-Column Layouts</h2>
          <p>
            Splitting your resume into columns (e.g., a left sidebar for skills and contact info, and a right column for experience) makes it very hard for Applicant Tracking Systems (ATS) to read. The parser reads lines of text horizontally, which leads to merging your skills directly with job descriptions, making your profile look corrupted.
          </p>

          <h2>2. Putting Text Inside Tables & Text Boxes</h2>
          <p>
            Tables and text boxes are frequently ignored by automated scrapers. Important details (like your graduation date or location) placed inside tables can disappear completely, leading the system to believe you are unqualified.
          </p>

          <h2>3. Visual Progress Bars for Skills</h2>
          <p>
            Never use charts, graphic stars, or percentage progress bars (e.g., "Python: 80%") to display your skill levels. Computers cannot index graphics, and human recruiters find arbitrary self-ratings meaningless. Instead, write skills out in simple list tags.
          </p>

          {/* Inline Ad */}
          <AdSense slot="7788990011" layout="banner" style={{ margin: "1.5rem 0" }} />

          <h2>4. Placing Contact Details in Headers & Footers</h2>
          <p>
            To save vertical space, many job applicants place their phone number, email, and address inside the header or footer fields of MS Word or Google Docs. Most ATS scanners ignore header and footer blocks entirely, which means your contact information is lost.
          </p>

          <h2>5. Non-Standard Section Titles</h2>
          <p>
            Stick to traditional headers. Keep it simple: "Work Experience", "Education", "Skills", and "Projects". Renaming a section to "Where I've Been" or "My Capabilities" confuses indexing programs that categorize text sections.
          </p>

          <h2>6. Custom Icon Elements</h2>
          <p>
            Replacing words like "Email" or "Phone" with envelope and phone icon symbols might look pretty, but text parser tools cannot index icons, which can corrupt the reading of adjacent email strings.
          </p>

          <h2>7. Colored or Dark Backgrounds</h2>
          <p>
            A high-contrast white text on a dark blue background looks modern but prints poorly, cannot be parsed easily by simple optical character readers (OCR), and causes visual strain. Stick to dark charcoal text on a pure white background.
          </p>

          <h2>8. Photo Uploads</h2>
          <p>
            Unless explicitly requested in creative agencies or certain international countries, do not put your photo on your resume. It increases file sizes and can trigger bias flags in automated software.
          </p>

          <h2>9. Tiny Font Sizes & Margins</h2>
          <p>
            Squeezing your resume onto one page by reducing font sizes below 9pt or margins below 0.5 inches makes it illegible. Maintain 10pt–12pt body sizes and 0.75-inch to 1-inch margins.
          </p>

          <h2>10. Uploading Image Formats (.png / .jpg)</h2>
          <p>
            Never upload your resume as an image file. Always export your resume as a text-convertible PDF or a Word (.docx) file. If a parser cannot highlight and select the text on the document, it cannot index your qualifications.
          </p>

          {/* Premium Call to Action box */}
          <div className="article-cta-box">
            <h3 className="article-cta-title">Create an ATS-Safe Resume Layout Now</h3>
            <p className="article-cta-desc">
              Don't let formatting mistakes hold you back. Use Cvolt to build a clean, single-column, ATS-friendly resume online for free. Convert your details directly to high-quality PDF or Word (.docx) files.
            </p>
            <Link 
              href="/?view=editor" 
              className="btn btn-primary"
              style={{ textDecoration: "none", padding: "0.75rem 1.75rem", fontSize: "0.95rem", fontWeight: 700 }}
            >
              Build Resume Now
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
