import express from "express";
import {
  createResume,
  getResumes,
  updateResume,
  deleteResume,
} from "../controllers/resumeController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validateResume } from "../middleware/validateResume.js";

const router = express.Router();

router.post("/", protect, validateResume, createResume);


router.route("/")
  .get(protect, getResumes)
  .post(protect, createResume);

router.route("/:id")
  .put(protect, updateResume)
  .delete(protect, deleteResume);

export default router;