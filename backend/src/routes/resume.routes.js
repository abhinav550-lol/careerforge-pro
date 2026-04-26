import { Router } from "express";
import {
  start,
  createResume,
  getALLResume,
  getResume,
  updateResume,
  removeResume,
} from "../controller/resume.controller.js";

// 1. Ensure these are correctly imported
import { isUserAvailable } from "../middleware/auth.js";
import { verifyToken } from "../middleware/verifyToken.js"; // ADD THIS IMPORT
import { generatePdf } from "../controller/pdfcontroller.js";
import { 
  analyzeJobDescription, 
  generateAIContent, 
  transformResume // Matches your controller import
} from "../controller/ai.controller.js";

const router = Router();

// --- Basic Routes ---
router.get("/", start);
router.post("/createResume", isUserAvailable, createResume);
router.get("/getAllResume", isUserAvailable, getALLResume);
router.get("/getResume", isUserAvailable, getResume);
router.put("/updateResume", isUserAvailable, updateResume);
router.delete("/removeResume", isUserAvailable, removeResume);

// --- PDF Routes ---
router.get('/download/:resume_id', generatePdf);

// --- AI Architect Routes ---
// Consistency check: use verifyToken for AI calls to protect your API credits
router.post('/ai/analyze-jd', isUserAvailable, analyzeJobDescription);
router.post('/ai/generate-content', isUserAvailable, generateAIContent);

// This is the new "One-Click Forge" route
// Changed transformResumeData -> transformResume to match your import above
router.post('/ai/transform-resume', isUserAvailable, transformResume);

export default router;