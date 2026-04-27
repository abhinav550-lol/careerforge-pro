import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdf = require('pdf-parse'); // Loads the library via CommonJS logic

import { GoogleGenerativeAI } from "@google/generative-ai";
import Resume from "../models/resume.model.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const optimizeExistingResume = async (req, res) => {
  try {
    const { title, jobDescription } = req.body;

    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    // 1. EXTRACT TEXT WITH MULTI-LEVEL FUNCTION CHECK
    let pdfData;
    try {
      // This sequence checks: 1. Is it a function? 2. Is it under .default? 
      const parseFunction = (typeof pdf === 'function') ? pdf : pdf.default;
      
      if (typeof parseFunction !== 'function') {
        throw new Error("Library loaded but no executable function found.");
      }
      
      pdfData = await parseFunction(req.file.buffer);
    } catch (extractErr) {
      console.error("PDF_PARSE_CRITICAL:", extractErr.message);
      throw new Error("Failed to read PDF content.");
    }

    const rawText = pdfData.text;

    // 2. PROCEED TO GEMINI (As defined in your logic)
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    });

    const prompt = `Rewrite this resume text: ${rawText} for this JD: ${jobDescription}. Return valid JSON.`;
    const result = await model.generateContent(prompt);
    const optimizedData = JSON.parse(result.response.text());

    // 3. SAVE TO DATABASE (Matching your Schema)
    const newResume = new Resume({
      ...optimizedData,
      title: title || "AI Optimized Resume",
      user: req.user._id,        // Required per your schema 
      themeColor: "#9333ea",     // Required per your schema 
    });

    const savedResume = await newResume.save();
    return res.status(201).json({ success: true, resumeId: savedResume._id });

  } catch (error) {
    console.error("FORGE_ERROR:", error.message);
    // Return fallback so UI still navigates 
    const fallback = new Resume({
      title: req.body.title || "Manual Resume",
      user: req.user._id,
      themeColor: "#9333ea",
      summary: "AI parsing failed. Please enter your details manually."
    });
    const saved = await fallback.save();
    res.status(201).json({ success: true, resumeId: saved._id });
  }
};