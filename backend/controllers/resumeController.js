import Resume from "../models/Resume.js";

// Create a new resume
export const createResume = async (req, res) => {
  try {
    const resume = new Resume(req.body);
    await resume.save();
    res.status(201).json({ success: true, data: resume });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all resumes
export const getResumes = async (req, res) => {
  try {
    const { page = 1, limit = 10, sortBy = "createdAt", order = "desc" } = req.query;

    const resumes = await Resume.find()
      .sort({ [sortBy]: order === "desc" ? -1 : 1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Resume.countDocuments();

    res.status(200).json({
      success: true,
      data: resumes,
      total,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
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