import { ResumeData } from "@/types/resume";

export const optimizeText = async (apiKey: string, currentText: string, context: string, isSummary?: boolean): Promise<string> => {
  const response = await fetch("/api/optimize", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ currentText, context, isSummary }),
  });

  if (!response.ok) {
    throw new Error("AI rewrite failed");
  }

  const data = await response.json();
  if (data.error) {
    throw new Error(data.error);
  }
  return data.optimizedText;
};

export const scanResumeData = async (
  apiKey: string,
  data: ResumeData
): Promise<{ score: number; feedback: string[]; keywords: string[] }> => {
  const response = await fetch("/api/scan", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data }),
  });

  if (!response.ok) {
    throw new Error("AI scan failed");
  }

  const result = await response.json();
  if (result.error) {
    throw new Error(result.error);
  }
  return result;
};
