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
import { generatePdf } from "../controller/pdfcontroller.js";
import { analyzeJobDescription, generateAIContent } from "../controller/ai.controller.js";

const router = Router();

router.get("/", start);
router.post("/createResume", isUserAvailable, createResume);
router.get("/getAllResume", isUserAvailable, getALLResume);
router.get("/getResume", isUserAvailable, getResume);
router.put("/updateResume", isUserAvailable, updateResume);
router.delete("/removeResume", isUserAvailable, removeResume);
router.get('download/:resume_id', generatePdf);
router.post('/ai/analyze-jd', analyzeJobDescription);
router.post('/ai/generate-content', generateAIContent);

export default router;
