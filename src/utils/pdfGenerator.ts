// @ts-ignore
import html2pdf from "html2pdf.js";

export async function downloadPdf(elementId: string, fileName: string = "resume.pdf") {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element with ID "${elementId}" not found`);
  }

  // Find parent workspace wrapper which might have display: none on mobile
  const wrapper = element.closest(".workspace-panel-wrapper") as HTMLElement;
  const originalWrapperDisplay = wrapper ? wrapper.style.display : "";
  
  // Save original styles of the resume element
  const originalBoxShadow = element.style.boxShadow;
  const originalBorderRadius = element.style.borderRadius;
  const originalWidth = element.style.width;
  const originalMaxWidth = element.style.maxWidth;
  const originalPadding = element.style.padding;

  // Temporarily force wrapper visibility
  if (wrapper) {
    wrapper.style.setProperty("display", "block", "important");
  }

  // Override styles to fit perfectly inside html2pdf margin dimensions
  // Letter page width is 215.9mm. With 15mm margins on both sides, available width is 185.9mm.
  // 185.9mm corresponds to exactly ~702px at standard 96 DPI screen scaling.
  element.style.boxShadow = "none";
  element.style.borderRadius = "0";
  element.style.width = "702px";
  element.style.maxWidth = "702px";
  element.style.setProperty("padding", "0", "important"); // reset padding to avoid double-margins

  // 1. Force table elements to display as block to avoid html2pdf page-break bugs inside tables
  const tableElements = element.querySelectorAll(".print-layout-table, .print-layout-table tbody, .print-layout-table tr, .print-layout-table td");
  const originalTableDisplays: string[] = [];
  tableElements.forEach((el, index) => {
    originalTableDisplays[index] = (el as HTMLElement).style.display;
    (el as HTMLElement).style.setProperty("display", "block", "important");
  });

  // 2. Apply page-break-inside avoidance rules to headings, items and lists
  const avoidBreakElements = element.querySelectorAll(".resume-item, .resume-header, h3, h4, .resume-contact, .skills-grid, .resume-skills-list, .resume-skill-row, .resume-cert-item");
  avoidBreakElements.forEach((el) => {
    (el as HTMLElement).style.setProperty("break-inside", "avoid", "important");
    (el as HTMLElement).style.setProperty("page-break-inside", "avoid", "important");
  });

  // 3. Prevent headings from being orphaned at the bottom of a page by wrapping them with their first content item
  const sections = element.querySelectorAll(".resume-section");
  sections.forEach((section) => {
    const title = section.querySelector(".resume-section-title");
    if (!title) return;
    
    const nextSibling = title.nextElementSibling;
    if (!nextSibling) return;
    
    // Check if the next sibling is a list/paragraph style that can be wrapped directly
    const isDirectWrapperTarget = 
      nextSibling.classList.contains("resume-skills-list") ||
      nextSibling.classList.contains("resume-item-bullets") ||
      nextSibling.tagName.toLowerCase() === "p" ||
      nextSibling.classList.contains("resume-cert-item");

    if (isDirectWrapperTarget) {
      const wrapperDiv = document.createElement("div");
      wrapperDiv.className = "pdf-header-wrapper";
      wrapperDiv.style.setProperty("break-inside", "avoid", "important");
      wrapperDiv.style.setProperty("page-break-inside", "avoid", "important");
      
      section.insertBefore(wrapperDiv, title);
      wrapperDiv.appendChild(title);
      wrapperDiv.appendChild(nextSibling);
    } else {
      // Find the first nested item (e.g. .resume-item)
      const firstItem = section.querySelector(".resume-item");
      if (firstItem && firstItem.parentNode === section) {
        const wrapperDiv = document.createElement("div");
        wrapperDiv.className = "pdf-header-wrapper";
        wrapperDiv.style.setProperty("break-inside", "avoid", "important");
        wrapperDiv.style.setProperty("page-break-inside", "avoid", "important");
        
        section.insertBefore(wrapperDiv, title);
        wrapperDiv.appendChild(title);
        wrapperDiv.appendChild(firstItem);
      }
    }
  });

  try {
    const opt = {
      margin:       15, // 15mm margins on all pages to ensure beautiful top/bottom padding
      filename:     fileName,
      image:        { type: "jpeg" as const, quality: 1.0 },
      html2canvas:  { 
        scale: 2.5, // High resolution for sharp print-grade text
        useCORS: true, 
        logging: false,
        backgroundColor: "#ffffff",
        windowWidth: 702
      },
      jsPDF:        { unit: "mm" as const, format: "letter" as const, orientation: "portrait" as const },
      pagebreak:    { mode: ["css" as const, "legacy" as const] }
    };

    // Run the pdf generation and save automatically
    await html2pdf().from(element).set(opt).save();
  } finally {
    // Restore parent wrapper display
    if (wrapper) {
      wrapper.style.display = originalWrapperDisplay;
    }

    // Restore original styles of the resume element
    element.style.boxShadow = originalBoxShadow;
    element.style.borderRadius = originalBorderRadius;
    element.style.width = originalWidth;
    element.style.maxWidth = originalMaxWidth;
    element.style.padding = originalPadding;

    // Restore table display styles
    tableElements.forEach((el, index) => {
      if (originalTableDisplays[index]) {
        (el as HTMLElement).style.display = originalTableDisplays[index];
      } else {
        (el as HTMLElement).style.removeProperty("display");
      }
    });

    // Clean up break avoidance inline styles
    avoidBreakElements.forEach((el) => {
      (el as HTMLElement).style.removeProperty("break-inside");
      (el as HTMLElement).style.removeProperty("page-break-inside");
    });

    // Clean up wrappers and restore original DOM structure
    const wrappers = element.querySelectorAll(".pdf-header-wrapper");
    wrappers.forEach((wrapper) => {
      const parent = wrapper.parentNode;
      if (parent) {
        while (wrapper.firstChild) {
          parent.insertBefore(wrapper.firstChild, wrapper);
        }
        parent.removeChild(wrapper);
      }
    });
  }
}
