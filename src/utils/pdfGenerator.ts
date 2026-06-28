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

  // Apply page-break-inside avoidance rules to headings, items and lists
  const avoidBreakElements = element.querySelectorAll(".resume-section, .resume-item, .resume-header, h3, h4, .resume-contact, .skills-grid");
  avoidBreakElements.forEach((el) => {
    (el as HTMLElement).style.setProperty("break-inside", "avoid", "important");
    (el as HTMLElement).style.setProperty("page-break-inside", "avoid", "important");
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
      pagebreak:    { mode: ["avoid-all" as const, "css" as const, "legacy" as const] }
    };

    // Run the pdf generation and save automatically
    await html2pdf().from(element).set(opt).save();
  } finally {
    // Restore original wrapper display and element styles
    if (wrapper) {
      wrapper.style.display = originalWrapperDisplay;
    }
    element.style.boxShadow = originalBoxShadow;
    element.style.borderRadius = originalBorderRadius;
    element.style.width = originalWidth;
    element.style.maxWidth = originalMaxWidth;
    element.style.padding = originalPadding;

    // Clean up break avoidance inline styles
    avoidBreakElements.forEach((el) => {
      (el as HTMLElement).style.removeProperty("break-inside");
      (el as HTMLElement).style.removeProperty("page-break-inside");
    });
  }
}
