import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ResumeForm() {
  // Form state

  const [formData, setFormData] = useState({
    company: "",
    duration: "",
    bulletPoints: "",
    skills: "",
  });

  const navigate = useNavigate();
    //Score function
    const calculateScore = () => {
  let score = 0;

  if (formData.skills.toLowerCase().includes("react")) score += 30;
  if (formData.skills.toLowerCase().includes("api")) score += 30;
  if (formData.skills.toLowerCase().includes("javascript")) score += 40;

  return score;
};

  // Load data if editing
  useEffect(() => {
    const storedResume = localStorage.getItem("editResume");
    if (storedResume) {
      setFormData(JSON.parse(storedResume));
    }
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      experience: {
        company: formData.company,
        duration: formData.duration,
        bulletPoints: formData.bulletPoints
          .split(",")
          .map((b) => b.trim())
          .filter(Boolean),
      },
      skills: formData.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };
  

    try {
      const storedResume = localStorage.getItem("editResume");

      if (storedResume) {
        const resume = JSON.parse(storedResume);
        await axios.put(`http://localhost:5000/api/resumes/${resume._id}`, payload);
        localStorage.removeItem("editResume");
        toast.success("Resume updated successfully!");

      } else {
        await axios.post("http://localhost:5000/api/resumes", payload);
        alert("Resume saved successfully!");
      }

     navigate("/resume-list");
    } catch (error) {
      toast.error(error);
      alert("Error saving resume.");
    }
  };
return (
  <div className="min-h-screen bg-gray-950 text-white flex">

    {/* LEFT - FORM */}
    <div className="w-1/2 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-6 rounded shadow-md w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold mb-4">
          {localStorage.getItem("editResume") ? "Edit Resume" : "Add Resume"}
        </h2>

        <input
          type="text"
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 text-white"
        />

        <input
          type="text"
          name="duration"
          placeholder="Duration"
          value={formData.duration}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 text-white"
        />

        <input
          type="text"
          name="bulletPoints"
          placeholder="Bullet Points (comma separated)"
          value={formData.bulletPoints}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 text-white"
        />

        <input
          type="text"
          name="skills"
          placeholder="Skills (comma separated)"
          value={formData.skills}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 text-white"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          {localStorage.getItem("editResume") ? "Update Resume" : "Save Resume"}
        </button>
      </form>
    </div>

    {/* RIGHT - LIVE PREVIEW 🔥 */}
   <div className="w-1/2 bg-white text-black p-8 shadow-xl">
  <h1 className="text-3xl font-bold border-b pb-2 mb-4">
    {formData.company || "Your Name"}
  </h1>

  <p className="text-gray-600 mb-4">
    {formData.duration || "Duration"}
  </p>

  <h2 className="text-xl font-semibold mt-4">Experience</h2>
  <ul className="list-disc ml-6">
    {formData.bulletPoints &&
      formData.bulletPoints.split(",").map((b, i) => (
        <li key={i}>{b}</li>
      ))}
  </ul>

  <h2 className="text-xl font-semibold mt-4">Skills</h2>
  <p>
    {formData.skills || "Your skills will appear here"}
  </p>
  <p className="mt-4 text-green-600">
  ATS Score: {calculateScore()}%
</p>
</div>

  </div>
);
}