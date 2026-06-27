import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  BorderStyle,
  ExternalHyperlink
} from "docx";
import { ResumeData } from "@/types/resume";

export const generateDocx = async (resumeData: ResumeData): Promise<void> => {
  const { personalInfo, workExperience, education, skills, projects, certifications } = resumeData;

  // Helper to parse description text (lines) into bulleted paragraphs
  const createBulletPoints = (description: string): Paragraph[] => {
    if (!description) return [];
    const lines = description.split("\n").map(l => l.trim()).filter(Boolean);
    
    return lines.map(line => {
      // Remove any pre-existing bullet characters (like •, -, *)
      const cleanLine = line.replace(/^[•\-\*\s]+/, "").trim();
      return new Paragraph({
        bullet: {
          level: 0
        },
        spacing: { after: 80 }, // 4pt space after each bullet
        children: [
          new TextRun({
            text: cleanLine,
            font: "Arial",
            size: 21, // 10.5pt
          })
        ]
      });
    });
  };

  // Helper for Section Headings with a bottom border line
  const createSectionHeading = (title: string): Paragraph => {
    return new Paragraph({
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 240, after: 120 }, // 12pt before, 6pt after
      keepNext: true,
      border: {
        bottom: {
          color: "666666",
          space: 4,
          style: BorderStyle.SINGLE,
          size: 12 // 1.5 pt
        }
      },
      children: [
        new TextRun({
          text: title.toUpperCase(),
          font: "Arial",
          bold: true,
          size: 24, // 12pt
          color: "222222"
        })
      ]
    });
  };

  const docChildren: Paragraph[] = [];

  // 1. Personal Header
  // Full Name
  docChildren.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 60 },
      children: [
        new TextRun({
          text: personalInfo.fullName,
          font: "Arial",
          bold: true,
          size: 40, // 20pt
          color: "111111"
        })
      ]
    })
  );

  // Professional Title
  if (personalInfo.title) {
    docChildren.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 120 },
        children: [
          new TextRun({
            text: personalInfo.title,
            font: "Arial",
            bold: true,
            size: 24, // 12pt
            color: "555555"
          })
        ]
      })
    );
  }

  // Contact Info Row
  const contactChildren: any[] = [];

  if (personalInfo.phone) {
    contactChildren.push(new TextRun({ text: personalInfo.phone, font: "Arial", size: 20, color: "444444" }));
  }

  if (personalInfo.email) {
    if (contactChildren.length > 0) {
      contactChildren.push(new TextRun({ text: "  |  ", font: "Arial", size: 20, color: "444444" }));
    }
    contactChildren.push(new TextRun({ text: personalInfo.email, font: "Arial", size: 20, color: "444444" }));
  }

  if (personalInfo.location) {
    if (contactChildren.length > 0) {
      contactChildren.push(new TextRun({ text: "  |  ", font: "Arial", size: 20, color: "444444" }));
    }
    contactChildren.push(new TextRun({ text: personalInfo.location, font: "Arial", size: 20, color: "444444" }));
  }

  if (personalInfo.website) {
    if (contactChildren.length > 0) {
      contactChildren.push(new TextRun({ text: "  |  ", font: "Arial", size: 20, color: "444444" }));
    }
    contactChildren.push(
      new ExternalHyperlink({
        children: [
          new TextRun({
            text: "Portfolio",
            font: "Arial",
            size: 20,
            color: "0563c1",
            underline: {},
          }),
        ],
        link: personalInfo.website,
      })
    );
  }

  if (personalInfo.linkedin) {
    if (contactChildren.length > 0) {
      contactChildren.push(new TextRun({ text: "  |  ", font: "Arial", size: 20, color: "444444" }));
    }
    contactChildren.push(
      new ExternalHyperlink({
        children: [
          new TextRun({
            text: "LinkedIn",
            font: "Arial",
            size: 20,
            color: "0563c1",
            underline: {},
          }),
        ],
        link: personalInfo.linkedin,
      })
    );
  }

  if (personalInfo.github) {
    if (contactChildren.length > 0) {
      contactChildren.push(new TextRun({ text: "  |  ", font: "Arial", size: 20, color: "444444" }));
    }
    contactChildren.push(
      new ExternalHyperlink({
        children: [
          new TextRun({
            text: "GitHub",
            font: "Arial",
            size: 20,
            color: "0563c1",
            underline: {},
          }),
        ],
        link: personalInfo.github,
      })
    );
  }

  docChildren.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 240 },
      children: contactChildren,
    })
  );

  // 2. Professional Summary
  if (personalInfo.summary) {
    docChildren.push(createSectionHeading("Professional Summary"));
    docChildren.push(
      new Paragraph({
        spacing: { after: 160 },
        children: [
          new TextRun({
            text: personalInfo.summary,
            font: "Arial",
            size: 22, // 11pt
          })
        ]
      })
    );
  }

  // 3. Work Experience
  if (workExperience && workExperience.length > 0) {
    docChildren.push(createSectionHeading("Work Experience"));
    workExperience.forEach(exp => {
      // Company and Location
      docChildren.push(
        new Paragraph({
          keepNext: true,
          spacing: { before: 80, after: 40 },
          children: [
            new TextRun({
              text: exp.company,
              font: "Arial",
              bold: true,
              size: 22, // 11pt
            }),
            new TextRun({
              text: ` — ${exp.location}`,
              font: "Arial",
              size: 22,
            })
          ]
        })
      );

      // Title and Dates
      docChildren.push(
        new Paragraph({
          keepNext: true,
          spacing: { before: 0, after: 80 },
          children: [
            new TextRun({
              text: exp.position,
              font: "Arial",
              italics: true,
              size: 21, // 10.5pt
              color: "333333"
            }),
            new TextRun({
              text: `  |  ${exp.startDate} – ${exp.endDate}`,
              font: "Arial",
              size: 21,
              color: "555555"
            })
          ]
        })
      );

      // Bullet points
      const bullets = createBulletPoints(exp.description);
      docChildren.push(...bullets);
    });
  }

  // 4. Projects
  if (projects && projects.length > 0) {
    docChildren.push(createSectionHeading("Projects"));
    projects.forEach(proj => {
      // Project name, URL and Role
      const headerRuns = [
        new TextRun({
          text: proj.name,
          font: "Arial",
          bold: true,
          size: 22, // 11pt
        })
      ];

      if (proj.role) {
        headerRuns.push(
          new TextRun({
            text: ` (${proj.role})`,
            font: "Arial",
            italics: true,
            size: 21,
            color: "333333"
          })
        );
      }

      if (proj.url) {
        headerRuns.push(
          new TextRun({
            text: ` — ${proj.url}`,
            font: "Arial",
            size: 20,
            color: "555555"
          })
        );
      }

      docChildren.push(
        new Paragraph({
          keepNext: true,
          spacing: { before: 80, after: 40 },
          children: headerRuns
        })
      );

      if (proj.technologies) {
        docChildren.push(
          new Paragraph({
            keepNext: true,
            spacing: { before: 0, after: 80 },
            children: [
              new TextRun({
                text: `Technologies: `,
                font: "Arial",
                bold: true,
                size: 20, // 10pt
                color: "444444"
              }),
              new TextRun({
                text: proj.technologies,
                font: "Arial",
                size: 20,
                color: "555555"
              })
            ]
          })
        );
      }

      // Bullet points
      const bullets = createBulletPoints(proj.description);
      docChildren.push(...bullets);
    });
  }

  // 5. Skills
  if (skills && skills.length > 0) {
    docChildren.push(createSectionHeading("Skills"));
    skills.forEach(skill => {
      docChildren.push(
        new Paragraph({
          spacing: { after: 80 }, // 4pt space after each row
          children: [
            new TextRun({
              text: `${skill.category}: `,
              font: "Arial",
              bold: true,
              size: 21, // 10.5pt
            }),
            new TextRun({
              text: skill.skills,
              font: "Arial",
              size: 21,
            })
          ]
        })
      );
    });
  }

  // 6. Education
  if (education && education.length > 0) {
    docChildren.push(createSectionHeading("Education"));
    education.forEach(edu => {
      // Institution and Location
      docChildren.push(
        new Paragraph({
          keepNext: true,
          spacing: { before: 80, after: 40 },
          children: [
            new TextRun({
              text: edu.institution,
              font: "Arial",
              bold: true,
              size: 22, // 11pt
            }),
            new TextRun({
              text: ` — ${edu.location}`,
              font: "Arial",
              size: 22,
            })
          ]
        })
      );

      // Degree, Major, Date, and GPA
      const degreeText = edu.fieldOfStudy ? `${edu.degree} in ${edu.fieldOfStudy}` : edu.degree;
      const subtitleRuns = [
        new TextRun({
          text: degreeText,
          font: "Arial",
          italics: true,
          size: 21,
          color: "333333"
        }),
        new TextRun({
          text: `  |  Graduated: ${edu.graduationDate}`,
          font: "Arial",
          size: 21,
          color: "555555"
        })
      ];

      if (edu.gpa) {
        subtitleRuns.push(
          new TextRun({
            text: ` (GPA: ${edu.gpa})`,
            font: "Arial",
            size: 21,
            color: "555555"
          })
        );
      }

      docChildren.push(
        new Paragraph({
          spacing: { before: 0, after: 120 },
          children: subtitleRuns
        })
      );
    });
  }

  // Create the Word Document
  const doc = new Document({
    styles: {
      default: {
        document: {
          run: {
            font: "Arial",
            size: 22, // default 11pt
            color: "000000"
          }
        }
      }
    },
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1440, // 1 inch
              bottom: 1440,
              left: 1440,
              right: 1440
            }
          }
        },
        children: docChildren
      }
    ]
  });

  // Pack the document and download it in browser
  const blob = await Packer.toBlob(doc);
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement("a");
  link.href = url;
  
  // Format filename from full name
  const nameSlug = personalInfo.fullName
    ? personalInfo.fullName.toLowerCase().replace(/[^a-z0-9]+/g, "-")
    : "resume";
  link.download = `${nameSlug}-ats-resume.docx`;
  
  document.body.appendChild(link);
  link.click();
  
  // Clean up
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
