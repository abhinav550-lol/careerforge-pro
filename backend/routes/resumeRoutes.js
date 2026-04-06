import express from "express";
import {
  createResume,
  getResumes,
  getResumeById,
  updateResume,
  deleteResume,
  searchResumes,
} from "../controllers/resumeController.js";

const router = express.Router();

// Create a new resume
router.post("/", createResume);

// Get all resumes
router.get("/", getResumes);

// Search resumes by skill or company
router.get("/search", searchResumes);

// Get a single resume by ID
router.get("/:id", getResumeById);

// Update a resume by ID
router.put("/:id", updateResume);

// Delete a resume by ID
router.delete("/:id", deleteResume);

export default router;