import Resume from "../models/Resume.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { successResponse, errorResponse } from "../helpers/responseHandler.js";

// Create a new resume
export const createResume = asyncHandler(async (req, res) => {
  const resume = await Resume.create(req.body);
  successResponse(res, resume, "Resume created successfully");
});



// Get all resumes
export const getResumes = asyncHandler(async (req, res) => {
  const resumes = await Resume.find({ user: req.user.id });
  successResponse(res, resumes);
});

// Get a single resume by ID
export const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) {
      return res.status(404).json({ success: false, message: "Resume not found" });
    }
    res.status(200).json({ success: true, data: resume });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a resume
export const updateResume = async (req, res) => {
  try {
    const updatedResume = await Resume.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedResume) {
      return res.status(404).json({ success: false, message: "Resume not found" });
    }
    res.status(200).json({ success: true, data: updatedResume });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete a resume
export const deleteResume = async (req, res) => {
  try {
    const deletedResume = await Resume.findByIdAndDelete(req.params.id);
    if (!deletedResume) {
      return res.status(404).json({ success: false, message: "Resume not found" });
    }
    res.status(200).json({ success: true, message: "Resume deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Search resumes by skill or company
export const searchResumes = async (req, res) => {
  try {
    const { skill, company, name } = req.query;
    const query = {};

    if (skill) query.skills = { $regex: skill, $options: "i" };
    if (company) query["experience.company"] = { $regex: company, $options: "i" };
    if (name) query["personalInfo.name"] = { $regex: name, $options: "i" };

    const results = await Resume.find(query);
    res.status(200).json({ success: true, data: results });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};