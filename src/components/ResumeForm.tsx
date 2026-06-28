"use client";

import React, { useState } from "react";
import { ResumeData, WorkExperience, Education, SkillCategory, Project, Certification, PersonalInfo, CustomSectionItem } from "@/types/resume";
import AdSense from "./AdSense";
import TemplatePicker from "./TemplatePicker";

interface ResumeFormProps {
  data: ResumeData;
  onChange: (newData: ResumeData) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOptimizeField: (fieldPath: string, currentValue: string, context: string) => void;
  templateStyle: "classic" | "modern" | "executive";
  onStyleChange: (style: "classic" | "modern" | "executive") => void;
}

export default function ResumeForm({ data, onChange, activeTab, setActiveTab, onOptimizeField, templateStyle, onStyleChange }: ResumeFormProps) {
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  } | null>(null);
  // Personal Info Update
  const handlePersonalInfoChange = (field: keyof PersonalInfo, value: string) => {
    onChange({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        [field]: value,
      },
    });
  };

  // Experience Actions
  const addExperience = () => {
    const newItem: WorkExperience = {
      id: `exp-${Date.now()}`,
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    };
    onChange({
      ...data,
      workExperience: [...data.workExperience, newItem],
    });
  };

  const removeExperience = (id: string) => {
    setConfirmModal({
      isOpen: true,
      title: "Delete Work Experience",
      message: "Are you sure you want to delete this work experience entry? This action cannot be undone.",
      onConfirm: () => {
        onChange({
          ...data,
          workExperience: data.workExperience.filter((item) => item.id !== id),
        });
        setConfirmModal(null);
      }
    });
  };

  const handleExperienceChange = (id: string, field: keyof WorkExperience, value: any) => {
    const updated = data.workExperience.map((item) => {
      if (item.id === id) {
        const newItem = { ...item, [field]: value };
        // If current is checked, end date should reflect that
        if (field === "current" && value === true) {
          newItem.endDate = "Present";
        }
        return newItem;
      }
      return item;
    });
    onChange({ ...data, workExperience: updated });
  };

  // Education Actions
  const addEducation = () => {
    const newItem: Education = {
      id: `edu-${Date.now()}`,
      institution: "",
      degree: "",
      fieldOfStudy: "",
      location: "",
      graduationDate: "",
      gpa: "",
    };
    onChange({
      ...data,
      education: [...data.education, newItem],
    });
  };

  const removeEducation = (id: string) => {
    setConfirmModal({
      isOpen: true,
      title: "Delete Education",
      message: "Are you sure you want to delete this education entry? This action cannot be undone.",
      onConfirm: () => {
        onChange({
          ...data,
          education: data.education.filter((item) => item.id !== id),
        });
        setConfirmModal(null);
      }
    });
  };

  const handleEducationChange = (id: string, field: keyof Education, value: string) => {
    const updated = data.education.map((item) => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    });
    onChange({ ...data, education: updated });
  };

  // Skills Actions
  const addSkillCategory = () => {
    const newItem: SkillCategory = {
      id: `skill-${Date.now()}`,
      category: "",
      skills: "",
    };
    onChange({
      ...data,
      skills: [...data.skills, newItem],
    });
  };

  const removeSkillCategory = (id: string) => {
    setConfirmModal({
      isOpen: true,
      title: "Delete Skill Category",
      message: "Are you sure you want to delete this skill category? This action cannot be undone.",
      onConfirm: () => {
        onChange({
          ...data,
          skills: data.skills.filter((item) => item.id !== id),
        });
        setConfirmModal(null);
      }
    });
  };

  const handleSkillCategoryChange = (id: string, field: keyof SkillCategory, value: string) => {
    const updated = data.skills.map((item) => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    });
    onChange({ ...data, skills: updated });
  };

  // Projects Actions
  const addProject = () => {
    const newItem: Project = {
      id: `proj-${Date.now()}`,
      name: "",
      role: "",
      url: "",
      technologies: "",
      description: "",
    };
    onChange({
      ...data,
      projects: [...data.projects, newItem],
    });
  };

  const removeProject = (id: string) => {
    setConfirmModal({
      isOpen: true,
      title: "Delete Project",
      message: "Are you sure you want to delete this project entry? This action cannot be undone.",
      onConfirm: () => {
        onChange({
          ...data,
          projects: data.projects.filter((item) => item.id !== id),
        });
        setConfirmModal(null);
      }
    });
  };

  const handleProjectChange = (id: string, field: keyof Project, value: string) => {
    const updated = data.projects.map((item) => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    });
    onChange({ ...data, projects: updated });
  };

  // Certifications Actions
  const addCertification = () => {
    const newItem: Certification = {
      id: `cert-${Date.now()}`,
      name: "",
      issuer: "",
      date: "",
    };
    onChange({
      ...data,
      certifications: [...data.certifications, newItem],
    });
  };

  const removeCertification = (id: string) => {
    setConfirmModal({
      isOpen: true,
      title: "Delete Certification",
      message: "Are you sure you want to delete this certification? This action cannot be undone.",
      onConfirm: () => {
        onChange({
          ...data,
          certifications: data.certifications.filter((item) => item.id !== id),
        });
        setConfirmModal(null);
      }
    });
  };

  const handleCertificationChange = (id: string, field: keyof Certification, value: string) => {
    const updated = data.certifications.map((item) => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    });
    onChange({ ...data, certifications: updated });
  };

  // Others / Custom Sections Actions
  const addOtherItem = () => {
    const newItem: CustomSectionItem = {
      id: `other-${Date.now()}`,
      title: "",
      description: "",
    };
    onChange({
      ...data,
      others: [...(data.others || []), newItem],
    });
  };

  const removeOtherItem = (id: string) => {
    setConfirmModal({
      isOpen: true,
      title: "Delete Custom Section",
      message: "Are you sure you want to delete this custom section entry? This action cannot be undone.",
      onConfirm: () => {
        onChange({
          ...data,
          others: (data.others || []).filter((item) => item.id !== id),
        });
        setConfirmModal(null);
      }
    });
  };

  const handleOtherItemChange = (id: string, field: keyof CustomSectionItem, value: string) => {
    const updated = (data.others || []).map((item) => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    });
    onChange({ ...data, others: updated });
  };

  // Sidebar Tabs Config
  const tabs = [
    { id: "templates", label: "Template Styles" },
    { id: "personal", label: "Contact Info" },
    { id: "summary", label: "Summary" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "education", label: "Education" },
    { id: "others", label: "Others (Optional)" },
  ];

  return (
    <div className="editor-pane">
      {/* Tabs Sidebar */}
      <div className="editor-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {/* Simple SVGs for icons */}
            {tab.id === "templates" && (
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
            )}
            {tab.id === "personal" && (
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            )}
            {tab.id === "summary" && (
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            )}
            {tab.id === "experience" && (
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            )}
            {tab.id === "projects" && (
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            )}
            {tab.id === "skills" && (
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            )}
            {tab.id === "education" && (
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
              </svg>
            )}
            {tab.id === "others" && (
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            {tab.id === "certifications" && (
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            )}
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Form Editor Window */}
      <div className="form-content">
        {/* Template Styles Preset selection */}
        {activeTab === "templates" && (
          <div className="form-section">
            <TemplatePicker selectedStyle={templateStyle} onStyleChange={onStyleChange} onContinue={() => setActiveTab("personal")} />
          </div>
        )}

        {/* Personal Details */}
        {activeTab === "personal" && (
          <div className="form-section">
            <h3 className="section-title">Personal Information</h3>
            <div className="form-grid">
              <div className="form-field">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="John Doe"
                  value={data.personalInfo.fullName}
                  onChange={(e) => handlePersonalInfoChange("fullName", e.target.value)}
                />
              </div>
              <div className="form-field">
                <label className="form-label">Professional Title</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Software Engineer"
                  value={data.personalInfo.title}
                  onChange={(e) => handlePersonalInfoChange("title", e.target.value)}
                />
              </div>
              <div className="form-field">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="john.doe@example.com"
                  value={data.personalInfo.email}
                  onChange={(e) => handlePersonalInfoChange("email", e.target.value)}
                />
              </div>
              <div className="form-field">
                <label className="form-label">Phone Number</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="(123) 456-7890"
                  value={data.personalInfo.phone}
                  onChange={(e) => handlePersonalInfoChange("phone", e.target.value)}
                />
              </div>
              <div className="form-field">
                <label className="form-label">Location (City, State)</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="New York, NY"
                  value={data.personalInfo.location}
                  onChange={(e) => handlePersonalInfoChange("location", e.target.value)}
                />
              </div>
              <div className="form-field">
                <label className="form-label">Personal Website</label>
                <input
                  type="url"
                  className="form-input"
                  placeholder="https://johndoe.com"
                  value={data.personalInfo.website}
                  onChange={(e) => handlePersonalInfoChange("website", e.target.value)}
                />
              </div>
              <div className="form-field">
                <label className="form-label">LinkedIn URL</label>
                <input
                  type="url"
                  className="form-input"
                  placeholder="https://linkedin.com/in/johndoe"
                  value={data.personalInfo.linkedin}
                  onChange={(e) => handlePersonalInfoChange("linkedin", e.target.value)}
                />
              </div>
              <div className="form-field">
                <label className="form-label">GitHub URL</label>
                <input
                  type="url"
                  className="form-input"
                  placeholder="https://github.com/johndoe"
                  value={data.personalInfo.github}
                  onChange={(e) => handlePersonalInfoChange("github", e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Summary Details */}
        {activeTab === "summary" && (
          <div className="form-section">
            <h3 className="section-title">
              <span>Professional Summary</span>
              <span className="ai-badge">AI Ready</span>
            </h3>
            <div className="form-field form-field-full">
              <div style={{ position: "relative", marginBottom: "0.25rem" }}>
                <label className="form-label">Write a brief summary of your professional background</label>
                <button
                  type="button"
                  className="ai-optimize-btn"
                  onClick={() => onOptimizeField("personalInfo.summary", data.personalInfo.summary, data.personalInfo.title)}
                >
                  <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  AI Rewrite
                </button>
              </div>
              <textarea
                className="form-input form-textarea"
                placeholder="Experienced software developer specializing in building scalable web systems..."
                value={data.personalInfo.summary}
                onChange={(e) => handlePersonalInfoChange("summary", e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Work Experience */}
        {activeTab === "experience" && (
          <div className="form-section">
            <div className="section-title">
              <span>Work Experience</span>
              <span className="ai-badge">AI Ready</span>
            </div>
            
            {data.workExperience.map((exp) => (
              <div key={exp.id} className="dynamic-item-card">
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => removeExperience(exp.id)}
                  title="Remove Job"
                >
                  &times;
                </button>
                <div className="form-grid">
                  <div className="form-field">
                    <label className="form-label">Company Name</label>
                    <input
                      type="text"
                      className="form-input"
                      value={exp.company}
                      onChange={(e) => handleExperienceChange(exp.id, "company", e.target.value)}
                      placeholder="Google"
                    />
                  </div>
                  <div className="form-field">
                    <label className="form-label">Job Title</label>
                    <input
                      type="text"
                      className="form-input"
                      value={exp.position}
                      onChange={(e) => handleExperienceChange(exp.id, "position", e.target.value)}
                      placeholder="Software Engineer"
                    />
                  </div>
                  <div className="form-field form-field-full">
                    <label className="form-label">Location (City, State)</label>
                    <input
                      type="text"
                      className="form-input"
                      value={exp.location}
                      onChange={(e) => handleExperienceChange(exp.id, "location", e.target.value)}
                      placeholder="Mountain View, CA"
                    />
                  </div>
                  <div className="form-field">
                    <label className="form-label">Start Date</label>
                    <input
                      type="text"
                      className="form-input"
                      value={exp.startDate}
                      onChange={(e) => handleExperienceChange(exp.id, "startDate", e.target.value)}
                      placeholder="Jan 2022"
                    />
                  </div>
                  <div className="form-field">
                    <label className="form-label">End Date</label>
                    <input
                      type="text"
                      className="form-input"
                      value={exp.endDate}
                      disabled={exp.current}
                      onChange={(e) => handleExperienceChange(exp.id, "endDate", e.target.value)}
                      placeholder="Present"
                    />
                  </div>
                  <div className="form-field form-field-full" style={{ flexDirection: "row", alignItems: "center", gap: "0.5rem" }}>
                    <input
                      type="checkbox"
                      id={`curr-${exp.id}`}
                      checked={exp.current}
                      onChange={(e) => handleExperienceChange(exp.id, "current", e.target.checked)}
                      style={{ cursor: "pointer", width: "16px", height: "16px" }}
                    />
                    <label htmlFor={`curr-${exp.id}`} style={{ cursor: "pointer", fontSize: "0.85rem", color: "var(--text-main)" }}>
                      I currently work here
                    </label>
                  </div>
                  <div className="form-field form-field-full">
                    <div style={{ position: "relative", marginBottom: "0.25rem" }}>
                      <label className="form-label">Job Description (One bullet per line)</label>
                      <button
                        type="button"
                        className="ai-optimize-btn"
                        onClick={() => onOptimizeField(`workExperience.${exp.id}.description`, exp.description, `${exp.position} at ${exp.company}`)}
                      >
                        <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        AI Optimize
                      </button>
                    </div>
                    <textarea
                      className="form-input form-textarea"
                      value={exp.description}
                      onChange={(e) => handleExperienceChange(exp.id, "description", e.target.value)}
                      placeholder="• Led developer team to scale database throughput by 40%&#10;• Designed APIs and documentation for client integration"
                    />
                  </div>
                </div>
              </div>
            ))}

            <button type="button" className="add-btn" onClick={addExperience}>
              + Add Experience
            </button>
          </div>
        )}

        {/* Projects */}
        {activeTab === "projects" && (
          <div className="form-section">
            <div className="section-title">
              <span>Projects</span>
              <span className="ai-badge">AI Ready</span>
            </div>

            {data.projects.map((proj) => (
              <div key={proj.id} className="dynamic-item-card">
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => removeProject(proj.id)}
                  title="Remove Project"
                >
                  &times;
                </button>
                <div className="form-grid">
                  <div className="form-field">
                    <label className="form-label">Project Name</label>
                    <input
                      type="text"
                      className="form-input"
                      value={proj.name}
                      onChange={(e) => handleProjectChange(proj.id, "name", e.target.value)}
                      placeholder="Online Portfolio"
                    />
                  </div>
                  <div className="form-field">
                    <label className="form-label">Role</label>
                    <input
                      type="text"
                      className="form-input"
                      value={proj.role}
                      onChange={(e) => handleProjectChange(proj.id, "role", e.target.value)}
                      placeholder="Lead Developer"
                    />
                  </div>
                  <div className="form-field">
                    <label className="form-label">Project URL / GitHub</label>
                    <input
                      type="url"
                      className="form-input"
                      value={proj.url}
                      onChange={(e) => handleProjectChange(proj.id, "url", e.target.value)}
                      placeholder="https://github.com/..."
                    />
                  </div>
                  <div className="form-field">
                    <label className="form-label">Technologies Used</label>
                    <input
                      type="text"
                      className="form-input"
                      value={proj.technologies}
                      onChange={(e) => handleProjectChange(proj.id, "technologies", e.target.value)}
                      placeholder="React, Next.js, Node.js"
                    />
                  </div>
                  <div className="form-field form-field-full">
                    <div style={{ position: "relative", marginBottom: "0.25rem" }}>
                      <label className="form-label">Project Description (One bullet per line)</label>
                      <button
                        type="button"
                        className="ai-optimize-btn"
                        onClick={() => onOptimizeField(`projects.${proj.id}.description`, proj.description, `${proj.role} for ${proj.name}`)}
                      >
                        <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        AI Optimize
                      </button>
                    </div>
                    <textarea
                      className="form-input form-textarea"
                      value={proj.description}
                      onChange={(e) => handleProjectChange(proj.id, "description", e.target.value)}
                      placeholder="• Built responsive interface using React hooks&#10;• Configured automatic deployment with Vercel"
                    />
                  </div>
                </div>
              </div>
            ))}

            <button type="button" className="add-btn" onClick={addProject}>
              + Add Project
            </button>
          </div>
        )}

        {/* Skills */}
        {activeTab === "skills" && (
          <div className="form-section">
            <div className="section-title">
              <span>Skills Category</span>
            </div>

            {data.skills.map((skill) => (
              <div key={skill.id} className="dynamic-item-card">
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => removeSkillCategory(skill.id)}
                  title="Remove Category"
                >
                  &times;
                </button>
                <div className="form-grid">
                  <div className="form-field">
                    <label className="form-label">Category Name</label>
                    <input
                      type="text"
                      className="form-input"
                      value={skill.category}
                      onChange={(e) => handleSkillCategoryChange(skill.id, "category", e.target.value)}
                      placeholder="Languages / Libraries / Developer Tools"
                    />
                  </div>
                  <div className="form-field form-field-full">
                    <label className="form-label">Skills (Comma-separated)</label>
                    <input
                      type="text"
                      className="form-input"
                      value={skill.skills}
                      onChange={(e) => handleSkillCategoryChange(skill.id, "skills", e.target.value)}
                      placeholder="JavaScript, TypeScript, Python, C++"
                    />
                  </div>
                </div>
              </div>
            ))}

            <button type="button" className="add-btn" onClick={addSkillCategory}>
              + Add Skill Category
            </button>
          </div>
        )}

        {/* Education */}
        {activeTab === "education" && (
          <div className="form-section">
            <div className="section-title">
              <span>Education</span>
            </div>

            {data.education.map((edu) => (
              <div key={edu.id} className="dynamic-item-card">
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => removeEducation(edu.id)}
                  title="Remove Education"
                >
                  &times;
                </button>
                <div className="form-grid">
                  <div className="form-field">
                    <label className="form-label">Institution Name</label>
                    <input
                      type="text"
                      className="form-input"
                      value={edu.institution}
                      onChange={(e) => handleEducationChange(edu.id, "institution", e.target.value)}
                      placeholder="Stanford University"
                    />
                  </div>
                  <div className="form-field">
                    <label className="form-label">Degree (e.g. B.S., M.S.)</label>
                    <input
                      type="text"
                      className="form-input"
                      value={edu.degree}
                      onChange={(e) => handleEducationChange(edu.id, "degree", e.target.value)}
                      placeholder="Bachelor of Science"
                    />
                  </div>
                  <div className="form-field">
                    <label className="form-label">Field of Study</label>
                    <input
                      type="text"
                      className="form-input"
                      value={edu.fieldOfStudy}
                      onChange={(e) => handleEducationChange(edu.id, "fieldOfStudy", e.target.value)}
                      placeholder="Computer Science"
                    />
                  </div>
                  <div className="form-field">
                    <label className="form-label">Location (City, State)</label>
                    <input
                      type="text"
                      className="form-input"
                      value={edu.location}
                      onChange={(e) => handleEducationChange(edu.id, "location", e.target.value)}
                      placeholder="Stanford, CA"
                    />
                  </div>
                  <div className="form-field">
                    <label className="form-label">Graduation Date</label>
                    <input
                      type="text"
                      className="form-input"
                      value={edu.graduationDate}
                      onChange={(e) => handleEducationChange(edu.id, "graduationDate", e.target.value)}
                      placeholder="May 2022"
                    />
                  </div>
                  <div className="form-field">
                    <label className="form-label">GPA (Optional)</label>
                    <input
                      type="text"
                      className="form-input"
                      value={edu.gpa}
                      onChange={(e) => handleEducationChange(edu.id, "gpa", e.target.value)}
                      placeholder="3.8 / 4.0"
                    />
                  </div>
                </div>
              </div>
            ))}

            <button type="button" className="add-btn" onClick={addEducation}>
              + Add Education
            </button>
          </div>
        )}

        {/* Others / Custom Sections */}
        {activeTab === "others" && (
          <div className="form-section">
            <div className="section-title">
              <span>Others / Custom Sections (Optional)</span>
            </div>

            {(data.others || []).map((item) => (
              <div key={item.id} className="dynamic-item-card">
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => removeOtherItem(item.id)}
                  title="Remove Section"
                >
                  &times;
                </button>
                <div className="form-grid">
                  <div className="form-field form-field-full">
                    <label className="form-label">Section Title</label>
                    <input
                      type="text"
                      className="form-input"
                      value={item.title}
                      onChange={(e) => handleOtherItemChange(item.id, "title", e.target.value)}
                      placeholder="e.g. Certifications, Languages, Key Achievements"
                    />
                  </div>
                  <div className="form-field form-field-full">
                    <label className="form-label">Description / Details (separate points with new lines)</label>
                    <textarea
                      className="form-textarea"
                      rows={3}
                      value={item.description}
                      onChange={(e) => handleOtherItemChange(item.id, "description", e.target.value)}
                      placeholder="e.g. AWS Certified Solutions Architect (2024)&#10;Bilingual in English and Spanish"
                    />
                  </div>
                </div>
              </div>
            ))}

            <button type="button" className="add-btn" onClick={addOtherItem}>
              + Add Custom Section
            </button>
          </div>
        )}

      </div>

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
                style={{ background: "var(--danger)" }} 
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
