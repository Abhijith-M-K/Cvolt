import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { currentText, context, isSummary } = await req.json();

    const prompt = `
      You are an expert ATS (Applicant Tracking System) optimizer and professional resume writer.
      Your task is to rewrite the following resume content to be highly ATS-friendly, professional, and impact-driven.
      
      Context/Role: ${context}
      Original Content:
      ${currentText}
      
      Guidelines:
      1. Maintain the truth and core facts of the original text.
      2. Start sentences or bullet points with strong, varied action verbs (e.g., "Spearheaded", "Implemented", "Architected", "Automated").
      3. Quantify results where possible (if no numbers are present, phrase it to sound highly impact-driven and result-oriented).
      4. Remove any filler words, buzzwords, or weak phrases.
      ${isSummary 
        ? '5. Format the output as a single, cohesive, professional paragraph (around 3-4 sentences). Do NOT use bullet points or list formatting.' 
        : '5. Format the output with clear bullet points starting with "• " (one bullet per line).'
      }
      
      Return ONLY the optimized text, without any introductory, explanatory, or concluding remarks.
    `;

    const aiResponse = await fetch("https://text.pollinations.ai/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [{ role: "user", content: prompt }],
        model: "openai",
      }),
    });

    if (!aiResponse.ok) {
      throw new Error("Failed to fetch optimization response from AI");
    }

    const text = await aiResponse.text();
    return NextResponse.json({ optimizedText: text.trim() });
  } catch (error: any) {
    console.error("Optimize route error:", error);
    return NextResponse.json({ error: error.message || "Failed to optimize text" }, { status: 500 });
  }
}
