"use client";

import React, { useState, useEffect } from "react";
import { ResumeData } from "@/types/resume";
import { initialResumeData } from "@/utils/mockData";
import { generateDocx } from "@/utils/docxGenerator";
import { optimizeText, scanResumeData } from "@/utils/gemini";
import ResumeForm from "@/components/ResumeForm";
import ResumePreview from "@/components/ResumePreview";

export default function Home() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [activeTab, setActiveTab] = useState<string>("personal");
  const [isClient, setIsClient] = useState<boolean>(false);
  const [view, setView] = useState<"landing" | "editor">("landing");
  const [hasDraft, setHasDraft] = useState<boolean>(false);
  const [workspaceView, setWorkspaceView] = useState<"edit" | "preview">("edit");

  // AI Assistant States
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);

  // ATS Scanner States
  const [isScannerOpen, setIsScannerOpen] = useState<boolean>(false);
  const [scannerResult, setScannerResult] = useState<{
    score: number;
    feedback: string[];
    keywords: string[];
  } | null>(null);

  // Custom Toast state
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);

  // Custom Confirm modal state
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  } | null>(null);

  const showToast = (message: string, type: "success" | "error" | "info" = "info") => {
    setToast({ message, type });
  };

  // Auto-hide toast notifications
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Load state client-side
  useEffect(() => {
    setIsClient(true);
    
    // Load resume data
    const savedData = localStorage.getItem("ats-resume-data");
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        // Force replace real data with dummy data if it matches the user's real name or email
        if (
          parsed.personalInfo?.fullName === "ABHIJITH M K" || 
          parsed.personalInfo?.email === "abhijithj331@gmail.com"
        ) {
          setResumeData(initialResumeData);
          localStorage.setItem("ats-resume-data", JSON.stringify(initialResumeData));
          setHasDraft(false);
        } else {
          // Keep certifications empty to match reference CV
          if (parsed.certifications && parsed.certifications.length > 0) {
            parsed.certifications = [];
          }
          if (!parsed.others) {
            parsed.others = [];
          }
          setResumeData(parsed);
          setHasDraft(true);
        }
      } catch (e) {
        console.error("Failed to load saved resume data", e);
      }
    }

    // Register Service Worker for PWA (Skip/Unregister on localhost to prevent Next.js HMR loops)
    if ('serviceWorker' in navigator) {
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        navigator.serviceWorker.getRegistrations().then((registrations) => {
          for (let registration of registrations) {
            registration.unregister().then((success) => {
              if (success) console.log('Successfully unregistered local service worker to prevent reload loop.');
            });
          }
        });
      } else {
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('/sw.js')
            .then((reg) => console.log('Service Worker registered successfully:', reg.scope))
            .catch((err) => console.error('Service Worker registration failed:', err));
        });
      }
    }
  }, []);

  const handleDataChange = (newData: ResumeData) => {
    setResumeData(newData);
    setHasDraft(true);
    localStorage.setItem("ats-resume-data", JSON.stringify(newData));
  };

  const handleDownloadPdf = () => {
    window.print();
  };

  const handleDownloadDocx = async () => {
    try {
      await generateDocx(resumeData);
      showToast("Word document download started successfully!", "success");
    } catch (error) {
      console.error("Error generating DOCX document:", error);
      showToast("An error occurred while generating the Word document. Please try again.", "error");
    }
  };

  const handleResetToSample = () => {
    setConfirmModal({
      isOpen: true,
      title: "Restore Default Template",
      message: "Are you sure you want to restore the default professional template? Any custom modifications will be lost.",
      onConfirm: () => {
        handleDataChange(initialResumeData);
        setConfirmModal(null);
        showToast("Template restored successfully!", "success");
      }
    });
  };

  const handleClearAll = () => {
    setConfirmModal({
      isOpen: true,
      title: "Clear All Fields",
      message: "Are you sure you want to clear all fields? This cannot be undone.",
      onConfirm: () => {
        const emptyData: ResumeData = {
          personalInfo: {
            fullName: "",
            title: "",
            email: "",
            phone: "",
            location: "",
            website: "",
            linkedin: "",
            github: "",
            summary: "",
          },
          workExperience: [],
          education: [],
          skills: [],
          projects: [],
          certifications: [],
          others: [],
        };
        handleDataChange(emptyData);
        setActiveTab("personal");
        setConfirmModal(null);
        showToast("All fields cleared.", "info");
      }
    });
  };



  // Triggered when clicking AI Optimize on a form field
  const handleOptimizeField = async (fieldPath: string, currentValue: string, context: string) => {
    if (!currentValue || currentValue.trim() === "") {
      showToast("Please enter some description or content in this field first before running AI optimization.", "info");
      return;
    }

    setIsAiLoading(true);
    try {
      const isSummary = fieldPath === "personalInfo.summary";
      const optimized = await optimizeText("", currentValue, context, isSummary);
      
      const dataCopy = JSON.parse(JSON.stringify(resumeData));
      
      if (fieldPath === "personalInfo.summary") {
        dataCopy.personalInfo.summary = optimized;
      } else if (fieldPath.startsWith("workExperience.")) {
        const id = fieldPath.split(".")[1];
        dataCopy.workExperience = dataCopy.workExperience.map((exp: any) =>
          exp.id === id ? { ...exp, description: optimized } : exp
        );
      } else if (fieldPath.startsWith("projects.")) {
        const id = fieldPath.split(".")[1];
        dataCopy.projects = dataCopy.projects.map((proj: any) =>
          proj.id === id ? { ...proj, description: optimized } : proj
        );
      }
      
      handleDataChange(dataCopy);
      showToast("Text optimized successfully!", "success");
    } catch (e: any) {
      console.error(e);
      showToast("Failed to run AI optimization. Please check your internet connection.", "error");
    } finally {
      setIsAiLoading(false);
    }
  };

  // Scan Resume for ATS Score
  const handleScanResume = async () => {
    setIsAiLoading(true);
    try {
      const result = await scanResumeData("", resumeData);
      setScannerResult(result);
      setIsScannerOpen(true);
      showToast("ATS Scan completed successfully!", "success");
    } catch (e) {
      console.error(e);
      showToast("Failed to perform AI ATS Scan. Please try again.", "error");
    } finally {
      setIsAiLoading(false);
    }
  };

  if (!isClient) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", backgroundColor: "#f8fafc", color: "#0f172a" }}>
        <div style={{ fontSize: "1.25rem", fontFamily: "sans-serif", fontWeight: 600 }}>Loading Cvolt Resume Builder...</div>
      </div>
    );
  }

  // Render Landing Page View
  if (view === "landing") {
    return (
      <div className="landing-container">
        <div className="landing-header">
          <div className="brand">
            <div className="brand-logo-container">
              <img src="/favicon.png" alt="Cvolt Logo" className="brand-logo-img" />
            </div>
            <h1 className="brand-title">Cvolt Resume Builder</h1>
          </div>
        </div>

        <div className="landing-hero">
          <div className="landing-badge">
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Free AI Power Enabled
          </div>
          <h1 className="landing-title">
            Build an ATS-Scannable CV <span>That Lands Interviews</span>
          </h1>
          <p className="landing-subtitle">
            Generate professional resumes with AI-optimized content, real-time PDF layouts, and clean DOCX exports. 100% free with zero configuration.
          </p>
        </div>

        <div className="landing-cards" style={{ display: "flex", justifyContent: "center" }}>
          {/* Card 1: Click & Build CV */}
          <div className="landing-card" style={{ maxWidth: "480px", width: "100%" }}>
            <div className="card-icon-box">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h2>Click & Build CV</h2>
            <p>
              Pre-populate the workspace with your professional profile template and customize it instantly in the builder.
            </p>
            <button
              className="btn btn-primary"
              style={{ width: "100%", justifyContent: "center", marginTop: "auto" }}
              onClick={() => {
                handleDataChange(initialResumeData);
                setView("editor");
              }}
            >
              Start Building Now
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div className="landing-section">
          <h2 className="section-heading">Why Choose <span>Cvolt?</span></h2>
          <p className="section-subheading">Power features to build an outstanding, recruiter-ready resume in minutes.</p>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon bg-indigo">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3>AI-Powered Rewrite</h3>
              <p>Optimize your descriptions and professional summaries with Gemini AI for maximum ATS scannability.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon bg-purple">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3>ATS Scannability Check</h3>
              <p>Real-time checks verify content length, format compliance, and missing elements to bypass automated filters.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon bg-blue">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
              </div>
              <h3>Multi-format Exports</h3>
              <p>Download clean, high-resolution PDFs optimized for printing, or export editable Word (.docx) files.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon bg-green">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.636-5.636a9 9 0 11-12.728 0M12 3v9" />
                </svg>
              </div>
              <h3>Privacy & Offline Drafts</h3>
              <p>No account required. All data is saved directly in your browser's local storage. Your credentials remain safe and private.</p>
            </div>
          </div>
        </div>

        {/* Steps Section */}
        <div className="landing-section bg-light-gradient">
          <h2 className="section-heading">How <span>It Works</span></h2>
          <p className="section-subheading">A straightforward 4-step workflow to land your next corporate interview.</p>
          
          <div className="steps-container">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3>Load Template</h3>
              <p>Populate the workspace with a pre-formatted structure to save setup time.</p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <h3>Input Profile</h3>
              <p>Fill out your experience, projects, education, and optional custom sections.</p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <h3>Refine with AI</h3>
              <p>Improve summary blocks into unified paragraphs and write bulleted job items.</p>
            </div>
            <div className="step-card">
              <div className="step-number">4</div>
              <h3>Export Resume</h3>
              <p>Validate formatting against the built-in score card and download as PDF or DOCX.</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="landing-footer">
          <div className="brand" style={{ justifyContent: "center", marginBottom: "0.5rem" }}>
            <div className="brand-logo-container" style={{ width: "2rem", height: "2rem" }}>
              <img src="/favicon.png" alt="Cvolt Logo" className="brand-logo-img" />
            </div>
            <span className="brand-title" style={{ fontSize: "1.1rem" }}>Cvolt Resume Builder</span>
          </div>
          <p>© {new Date().getFullYear()} Cvolt. Premium ATS Resume Builder. All rights reserved.</p>
        </footer>
      </div>
    );
  }

  // Render Editor Dashboard View
  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="brand" onClick={() => setView("landing")} style={{ cursor: "pointer" }} title="Back to Home Page">
          <div className="brand-logo-container">
            <img src="/favicon.png" alt="Cvolt Logo" className="brand-logo-img" />
          </div>
          <h1 className="brand-title">Cvolt Resume Builder</h1>
        </div>

        <div className="action-buttons">
          <button className="btn btn-secondary" style={{ border: "1px solid rgba(99, 102, 241, 0.3)", color: "var(--primary)" }} onClick={handleScanResume} title="Scan CV for ATS score and suggestions">
            {/* Sparkles Icon */}
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            <span>Scan CV</span>
          </button>

          <button className="btn btn-secondary" onClick={handleResetToSample} title="Reset form to default template">
            {/* Undo/Refresh Icon */}
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89M9 11l3-3 3 3" />
            </svg>
            <span>Reset Sample</span>
          </button>
          
          <button className="btn btn-secondary btn-danger" onClick={handleClearAll} title="Clear all data">
            {/* Trash Icon */}
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span>Clear Form</span>
          </button>
          
          <button className="btn btn-secondary" onClick={handleDownloadDocx} title="Export as Microsoft Word Document (.docx)">
            <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
              <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/>
              <path d="M5.485 6.879l.942 2.871.954-2.871H9.23l-1.742 4.417H6.12L4.382 6.879H5.49z"/>
            </svg>
            <span>Download Word</span>
          </button>
          
          <button className="btn btn-primary" onClick={handleDownloadPdf} title="Save / Print PDF">
            <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
              <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
            </svg>
            <span>Download PDF</span>
          </button>
        </div>
      </header>

      {/* Mobile view toggle (only visible on mobile screens) */}
      <div className="mobile-view-toggle">
        <button 
          className={`toggle-btn ${workspaceView === "edit" ? "active" : ""}`} 
          onClick={() => setWorkspaceView("edit")}
        >
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          <span>Edit Details</span>
        </button>
        <button 
          className={`toggle-btn ${workspaceView === "preview" ? "active" : ""}`} 
          onClick={() => setWorkspaceView("preview")}
        >
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <span>Preview CV</span>
        </button>
      </div>

      {/* Main Grid */}
      <main className="workspace-grid">
        <div className={`workspace-panel-wrapper ${workspaceView === "edit" ? "mobile-show" : "mobile-hide"}`}>
          <ResumeForm
            data={resumeData}
            onChange={handleDataChange}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onOptimizeField={handleOptimizeField}
          />
        </div>
        <div className={`workspace-panel-wrapper ${workspaceView === "preview" ? "mobile-show" : "mobile-hide"}`}>
          <ResumePreview data={resumeData} />
        </div>
      </main>

      {/* FLOATING SCANNER PANEL */}
      {isScannerOpen && scannerResult && (
        <div className="ai-scanner-panel">
          <div className="ai-scanner-header">
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span style={{ fontWeight: 700 }}>ATS Scanned Report</span>
            </div>
            <button
              onClick={() => setIsScannerOpen(false)}
              style={{ background: "transparent", border: "none", color: "white", cursor: "pointer", fontSize: "1.25rem" }}
            >
              &times;
            </button>
          </div>

          <div className="ai-scanner-content">
            <div className="ai-score-ring">
              {scannerResult.score}%
            </div>
            <div style={{ textAlign: "center", fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "-0.5rem" }}>
              Overall ATS Scannability
            </div>

            <div className="ai-feedback-section">
              <div className="ai-feedback-title">Key Action Points</div>
              <ul className="ai-feedback-list" style={{ paddingLeft: "1.15rem" }}>
                {(scannerResult.feedback || []).map((item, idx) => (
                  <li key={idx} style={{ marginBottom: "0.25rem" }}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="ai-feedback-section">
              <div className="ai-feedback-title">Recommended Keywords</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "0.3rem" }}>
                {(scannerResult.keywords || []).map((word, idx) => (
                  <span
                    key={idx}
                    style={{ background: "rgba(99, 102, 241, 0.08)", border: "1px solid rgba(99, 102, 241, 0.15)", color: "var(--primary)", padding: "0.25rem 0.5rem", borderRadius: "4px", fontSize: "0.75rem", fontWeight: 500 }}
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FULL PAGE LOADER DURING AI PROCESSING */}
      {isAiLoading && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(2px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 999
        }}>
          {/* Spinner */}
          <div style={{
            width: "45px",
            height: "45px",
            border: "4px solid rgba(99, 102, 241, 0.1)",
            borderTopColor: "var(--primary)",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
            marginBottom: "1rem"
          }}></div>
          <div style={{ color: "var(--primary)", fontWeight: 600, fontSize: "1.05rem" }}>AI assistant is processing...</div>
        </div>
      )}

      {/* CUSTOM TOAST NOTIFICATION CONTAINER */}
      {toast && (
        <div className="toast-container">
          <div className={`custom-toast toast-${toast.type}`}>
            <div className="toast-content">{toast.message}</div>
            <button className="toast-close-btn" onClick={() => setToast(null)}>&times;</button>
          </div>
        </div>
      )}

      {/* CUSTOM CONFIRMATION MODAL OVERLAY */}
      {confirmModal?.isOpen && (
        <div className="custom-confirm-overlay" onClick={() => setConfirmModal(null)}>
          <div className="custom-confirm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="confirm-title">{confirmModal.title}</div>
            <div className="confirm-message">{confirmModal.message}</div>
            <div className="confirm-actions">
              <button className="btn btn-secondary" onClick={() => setConfirmModal(null)}>Cancel</button>
              <button 
                className="btn btn-primary" 
                style={{ background: confirmModal.title.includes("Clear") ? "var(--danger)" : "var(--primary)" }} 
                onClick={confirmModal.onConfirm}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
