import { GoogleGenerativeAI } from "@google/generative-ai";

export const analyzeJobDescription = async (req, res) => {
  const { resumeData, jobDescription } = req.body;

  try {
    // 1. Double check the Key is loaded
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ message: "Gemini API Key missing in backend .env" });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

    const prompt = `
      System: Act as an elite Executive Recruiter and ATS Optimization Expert.
      
      Task: Conduct a high-fidelity audit of the provided Resume against the specific Job Description. 
      Focus on semantic matching, keyword density, and professional impact.

      Data Input:
      - Resume Content: ${JSON.stringify(resumeData)}
      - Target Role: ${jobDescription}

      Analysis Constraints:
      1. matchPercentage: Provide a realistic score (0-100) based on core requirements vs. resume evidence.
      2. missingSkills: Identify the top 5 high-priority technical or soft skills found in the JD but missing from the resume.
      3. analysis: Provide a 2-sentence executive summary of the "Smart Match" compatibility.
      4. suggestions: Provide 3 actionable, high-impact improvements. Focus on adding quantifiable metrics (e.g., "Increased X by Y%") and keyword optimization.

      Output Format:
      Return ONLY a raw JSON object. No markdown formatting, no backticks, no preamble.
      {
        "matchPercentage": number,
        "missingSkills": [],
        "analysis": "string",
        "suggestions": []
      }
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // 2. SMART JSON CLEANING: This handles cases where Gemini adds ```json ... ```
    const cleanJsonString = text.replace(/```json|```/g, "").trim();
    
    try {
      const parsedData = JSON.parse(cleanJsonString);
      res.status(200).json(parsedData);
    } catch (parseError) {
      console.error("JSON Parse Error. Raw Text:", text);
      res.status(500).json({ message: "AI returned invalid format", error: parseError.message });
    }

  } catch (error) {
    console.error("AI Controller Crash:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


// Add this to your existing ai.controller.js exports
export const generateAIContent = async (req, res) => {
  const { prompt, type } = req.body;

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

    // Custom instructions based on what the user is generating
    const systemInstruction = type === 'summary' 
      ? "You are a professional resume writer. Write a concise, powerful summary. No conversational filler, just the summary text."
      : "You are a senior recruiter. Write impactful bullet points for work experience.";

    const result = await model.generateContent(systemInstruction + "\n\n" + prompt);
    const response = await result.response;
    const text = response.text().trim();
    
    res.status(200).json({ content: text });
  } catch (error) {
    console.error("AI Generation Error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

export const transformResume = async (req, res) => {
  const { resumeData, jobDescription } = req.body;

  const prompt = `
    Act as a Senior Technical Recruiter. I will provide a Resume and a Job Description (JD).
    Your task: Rewrite the Resume to be 100% ATS-friendly for this specific JD.
    
    1. SUMMARY: Rewrite to highlight matching keywords.
    2. EXPERIENCE: Rewrite bullet points to focus on impact and metrics related to the JD.
    3. SKILLS: Reorganize and add missing relevant skills found in the JD.
    
    Return ONLY a JSON object matching this structure:
    {
      "transformedData": {
        "summary": "...",
        "experience": [...],
        "skills": [...]
      }
    }

    Resume Data: ${JSON.stringify(resumeData)}
    Job Description: ${jobDescription}
  `;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const cleanText = text.replace(/```json|```/g, "");
    res.json(JSON.parse(cleanText));
  } catch (error) {
    res.status(500).json({ error: "AI Transformation Failed" });
  }
};