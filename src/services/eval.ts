import { VertexAI } from "@google-cloud/vertexai";

const vertex_ai = new VertexAI({
  project: process.env.GCP_PROJECT_ID!,
  location: "us-central1", 
});

const model = "gemini-2.5-flash-lite"; 

export const evaluateAnswers = async (
  candidateName: string,
  position: string,
  jdText: string,
  answers: Record<string, string>
): Promise<string> => {

  const formattedAnswers = Object.entries(answers)
    .map(([q, a]) => `Q: ${q}\nA: ${a}`)
    .join("\n\n");

  const prompt = `
You are an expert hiring manager providing a final evaluation for a candidate.

**Candidate Name:** ${candidateName}
**Applying for Position:** ${position}

**Job Description:**
---
${jdText}
---

**Candidate's Interview Transcript:**
---
${formattedAnswers}
---

**Task:**
Based on the job description and the candidate's answers, provide a comprehensive evaluation.
Structure your feedback with the following sections, using markdown for formatting:
- **Overall Summary:** A brief, two-sentence summary of the candidate's performance.
- **Strengths:** 2-3 bullet points highlighting where the candidate performed well, referencing their specific answers.
- **Areas for Improvement:** 2-3 bullet points on where the candidate could improve, with constructive feedback.
- **Fit for Role:** A final assessment of their suitability for the role based on the provided information.
`;

  const generativeModel = vertex_ai.getGenerativeModel({
    model,
  });

  const resp = await generativeModel.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
  });

  return resp.response?.candidates?.[0]?.content?.parts?.[0]?.text || "No evaluation generated";
};
