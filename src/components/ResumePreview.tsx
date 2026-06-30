import React from "react";
import { ResumeData } from "@/types/resume";

interface ResumePreviewProps {
  data: ResumeData;
  templateStyle?: "classic" | "modern" | "executive" | "storyteller" | "slate" | "writer";
}

export default function ResumePreview({ data, templateStyle = "classic" }: ResumePreviewProps) {
  const { personalInfo, workExperience, education, skills, projects, certifications, others } = data;

  // Helper to render bullet points
  const renderBullets = (description: string) => {
    if (!description) return null;
    const lines = description.split("\n").map((l) => l.trim()).filter(Boolean);
    
    return (
      <ul className="resume-item-bullets">
        {lines.map((line, idx) => {
          // Remove leading bullet-like characters (•, *, -)
          const cleanLine = line.replace(/^[•\-\*\s]+/, "").trim();
          return <li key={idx}>{cleanLine}</li>;
        })}
      </ul>
    );
  };

  // Helper to format URLs to a shorter version
  const formatUrlForDisplay = (url: string) => {
    if (!url) return "";
    return url.replace(/^(https?:\/\/)?(www\.)?/, "");
  };

  return (
    <div className="preview-pane">
      <div className={`resume-document theme-${templateStyle}`} id="resume-print-area">
        <table className="print-layout-table">
          <thead>
            <tr>
              <td>
                <div className="print-header-spacer"></div>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="print-content-area">
                  {/* 1. Header Section */}
                  <header className="resume-header">
          <h1 className="resume-name">{personalInfo.fullName || "Your Full Name"}</h1>
          {personalInfo.title && <div className="resume-title">{personalInfo.title}</div>}
          
          <div className="resume-contact">
            {personalInfo.phone && <span className="resume-contact-item">{personalInfo.phone}</span>}
            {personalInfo.email && (
              <span className="resume-contact-item">
                <a href={`mailto:${personalInfo.email}`} style={{ color: "inherit", textDecoration: "none" }}>
                  {personalInfo.email}
                </a>
              </span>
            )}
            {personalInfo.location && <span className="resume-contact-item">{personalInfo.location}</span>}
            {personalInfo.website && (
              <span className="resume-contact-item">
                <a href={personalInfo.website} target="_blank" rel="noreferrer" style={{ color: "inherit", textDecoration: "none" }}>
                  Portfolio
                </a>
              </span>
            )}
            {personalInfo.linkedin && (
              <span className="resume-contact-item">
                <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" style={{ color: "inherit", textDecoration: "none" }}>
                  LinkedIn
                </a>
              </span>
            )}
            {personalInfo.github && (
              <span className="resume-contact-item">
                <a href={personalInfo.github} target="_blank" rel="noreferrer" style={{ color: "inherit", textDecoration: "none" }}>
                  GitHub
                </a>
              </span>
            )}
          </div>
        </header>

        {/* 2. Professional Summary */}
        {personalInfo.summary && (
          <section className="resume-section">
            <h2 className="resume-section-title">Professional Summary</h2>
            <p style={{ fontSize: "10pt", lineHeight: "1.4", margin: "0" }}>
              {personalInfo.summary}
            </p>
          </section>
        )}

        {/* 3. Work Experience */}
        {workExperience && workExperience.length > 0 && (
          <section className="resume-section">
            <h2 className="resume-section-title">Work Experience</h2>
            {workExperience.map((exp) => (
              <div key={exp.id} className="resume-item">
                <div className="resume-item-header">
                  <span>{exp.company || "Company Name"}</span>
                  <span style={{ fontWeight: "normal", fontSize: "10pt" }}>{exp.location}</span>
                </div>
                <div className="resume-item-subheader">
                  <span className="resume-item-title">{exp.position || "Job Title"}</span>
                  <span className="resume-item-date">
                    {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                  </span>
                </div>
                {exp.description && renderBullets(exp.description)}
              </div>
            ))}
          </section>
        )}

        {/* 4. Projects */}
        {projects && projects.length > 0 && (
          <section className="resume-section">
            <h2 className="resume-section-title">Projects</h2>
            {projects.map((proj) => (
              <div key={proj.id} className="resume-item">
                <div className="resume-item-header">
                  <span>
                    {proj.name || "Project Name"}
                    {proj.role && <span style={{ fontWeight: "normal", fontStyle: "italic", fontSize: "9.5pt" }}> ({proj.role})</span>}
                  </span>
                  {proj.url && (
                    <span style={{ fontWeight: "normal", fontSize: "9.5pt" }}>
                      <a href={proj.url} target="_blank" rel="noreferrer" style={{ color: "#1a365d", textDecoration: "underline" }}>
                        {proj.url.toLowerCase().includes("github")
                          ? "GitHub"
                          : proj.url.toLowerCase().includes("gitlab")
                            ? "GitLab"
                            : "Project"}
                      </a>
                    </span>
                  )}
                </div>
                {proj.technologies && (
                  <div style={{ fontSize: "9.5pt", color: "var(--resume-text-secondary)", marginBottom: "0.25rem" }}>
                    <strong>Technologies:</strong> {proj.technologies}
                  </div>
                )}
                {proj.description && (
                  proj.description.includes("\n") ? (
                    renderBullets(proj.description)
                  ) : (
                    <p style={{ fontSize: "9.5pt", lineHeight: "1.45", margin: "0.25rem 0 0 0", color: "var(--resume-text-primary)" }}>
                      {proj.description}
                    </p>
                  )
                )}
              </div>
            ))}
          </section>
        )}

        {/* 5. Skills */}
        {skills && skills.length > 0 && (
          <section className="resume-section">
            <h2 className="resume-section-title">Skills</h2>
            <div className="resume-skills-list">
              {skills.map((skill) => (
                <div key={skill.id} className="resume-skill-row">
                  {skill.category && <span className="resume-skill-cat">{skill.category}: </span>}
                  <span>{skill.skills}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 6. Education */}
        {education && education.length > 0 && (
          <section className="resume-section">
            <h2 className="resume-section-title">Education</h2>
            {education.map((edu) => (
              <div key={edu.id} className="resume-item">
                <div className="resume-item-header">
                  <span>{edu.institution || "Institution Name"}</span>
                  <span style={{ fontWeight: "normal", fontSize: "10pt" }}>{edu.location}</span>
                </div>
                <div className="resume-item-subheader">
                  <span>
                    {edu.degree}
                    {edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ""}
                  </span>
                  <span className="resume-item-date">
                    Graduated: {edu.graduationDate}
                    {edu.gpa && ` (GPA: ${edu.gpa})`}
                  </span>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* 7. Others / Custom Sections (Optional) */}
        {others && others.length > 0 && others.map((item) => (
          item.title && item.description && (
            <section key={item.id} className="resume-section">
              <h2 className="resume-section-title">{item.title}</h2>
              {item.description.includes("\n") ? (
                renderBullets(item.description)
              ) : (
                <p style={{ fontSize: "10pt", lineHeight: "1.4", margin: "0" }}>
                  {item.description}
                </p>
              )}
            </section>
          )
        ))}
                </div>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td>
                <div className="print-footer-spacer"></div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
