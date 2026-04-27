import { Router } from "express";
import {
  start,
  createResume,
  getALLResume,
  getResume,
  updateResume,
  removeResume,
} from "../controller/resume.controller.js";

import { isUserAvailable } from "../middleware/auth.js";
import { verifyToken } from "../middleware/verifyToken.js"; 
import { generatePdf } from "../controller/pdfcontroller.js";
import { 
  analyzeJobDescription, 
  generateAIContent, 
  transformResume 
} from "../controller/ai.controller.js";

// 1. Multer setup for memory storage
import multer from 'multer';
import { optimizeExistingResume } from "../controller/optimizer.controller.js";
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 } // Optional: 5MB limit for safety
});

const router = Router();

// --- Basic Management ---
router.get("/", start);
router.post("/createResume", isUserAvailable, createResume);
router.get("/getAllResume", isUserAvailable, getALLResume);
router.get("/getResume", isUserAvailable, getResume);
router.put("/updateResume", isUserAvailable, updateResume);
router.delete("/removeResume", isUserAvailable, removeResume);

// --- AI Smart Pivot (PDF to Optimized Resume) ---
// Added isUserAvailable so the optimizer knows which user is creating the resume
// Change the order: upload first, then auth, then controller
router.post('/optimize-existing', upload.single('resume'), isUserAvailable, optimizeExistingResume
);

// --- PDF Generation ---
router.get('/download/:resume_id', generatePdf);

// --- AI Architect Suite ---
router.post('/ai/analyze-jd', isUserAvailable, analyzeJobDescription);
router.post('/ai/generate-content', isUserAvailable, generateAIContent);
router.post('/ai/transform-resume', isUserAvailable, transformResume);

export default router;