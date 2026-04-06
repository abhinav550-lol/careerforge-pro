import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    personalInfo: {
      name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
      },
      email: {
        type: String,
        required: [true, "Email is required"],
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
      },
      phone: {
        type: String,
        required: [true, "Phone number is required"],
        match: [/^[0-9]{10}$/, "Phone number must be 10 digits"],
      },
      linkedin: {
        type: String,
        trim: true,
      },
      github: {
        type: String,
        trim: true,
      },
    },

    education: [
      {
        degree: {
          type: String,
          required: [true, "Degree is required"],
        },
        institution: {
          type: String,
          required: [true, "Institution name is required"],
        },
        year: {
          type: String,
          required: [true, "Year of completion is required"],
        },
      },
    ],

    experience: [
      {
        role: {
          type: String,
          required: [true, "Role is required"],
        },
        company: {
          type: String,
          required: [true, "Company name is required"],
        },
        duration: {
          type: String,
          required: [true, "Duration is required"],
        },
        bulletPoints: {
          type: [String],
          default: [],
        },
      },
    ],

    skills: {
      type: [String],
      required: [true, "At least one skill is required"],
      validate: {
        validator: (arr) => arr.length > 0,
        message: "Skills array cannot be empty",
      },
    },
  },
  { timestamps: true }
);

const Resume = mongoose.model("Resume", resumeSchema);
export default Resume;