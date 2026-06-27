import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { data } = await req.json();

    const prompt = `
      You are an expert resume parser and ATS recruiting scanner.
      Analyze the following resume JSON and evaluate its ATS compatibility, layout structure, formatting strength, and keyword optimization.
      
      Resume JSON:
      ${JSON.stringify(data, null, 2)}
      
      Evaluate and return a JSON object with the following keys:
      - "score": A number from 0 to 100 representing the ATS score.
      - "feedback": An array of strings representing specific, actionable suggestions for improvement (e.g., "Add more quantifiable metrics to experience", "Specify developer tools under skills").
      - "keywords": An array of high-priority industry keywords that are either present or strongly recommended to add based on the profile title.
      
      IMPORTANT: Return ONLY the raw JSON object. Do not include markdown code block formatting (like \`\`\`json) or any conversational text.
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
      throw new Error("Failed to fetch scan response from AI");
    }

    const text = await aiResponse.text();
    const cleanJsonText = text.replace(/^```json/, "").replace(/```$/, "").trim();

    try {
      const parsed = JSON.parse(cleanJsonText);
      return NextResponse.json({
        score: typeof parsed.score === "number" ? parsed.score : 75,
        feedback: Array.isArray(parsed.feedback) ? parsed.feedback : ["Review CV layout for ATS standard"],
        keywords: Array.isArray(parsed.keywords) ? parsed.keywords : (Array.isArray(parsed.key_words) ? parsed.key_words : ["Software Development", "TypeScript", "React"])
      });
    } catch (e) {
      console.error("Failed to parse AI response as JSON", text);
      const scoreMatch = text.match(/"score"\s*:\s*(\d+)/);
      const score = scoreMatch ? parseInt(scoreMatch[1]) : 75;
      return NextResponse.json({
        score,
        feedback: ["Include strong action-verbs for each job bullet", "Refine the technical skills list matching target job roles"],
        keywords: ["React", "TypeScript", "Node.js", "ATS Optimization"]
      });
    }
  } catch (error: any) {
    console.error("Scan route error:", error);
    return NextResponse.json({ error: error.message || "Failed to scan resume" }, { status: 500 });
  }
}
