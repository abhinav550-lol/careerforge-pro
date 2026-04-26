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
      You are an expert Career Coach and ATS Analyst. 
      Compare this Resume with the Job Description.
      
      Resume Data: ${JSON.stringify(resumeData)}
      Job Description: ${jobDescription}

      Return ONLY a JSON object (no markdown, no backticks) with:
      {
        "matchPercentage": number,
        "missingSkills": ["skill1", "skill2"],
        "analysis": "string",
        "suggestions": ["improvement1", "improvement2"]
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