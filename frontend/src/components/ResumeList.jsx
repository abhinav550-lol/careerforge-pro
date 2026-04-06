import { useEffect, useState } from "react";
import axios from "axios";

export default function ResumeList() {
  // State to store fetched resumes
  const [resumes, setResumes] = useState([]);

  // Fetch resumes when component loads
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/resumes")
      .then((res) => setResumes(res.data)) // Save data to state
      .catch((err) => console.error(err)); // Handle errors
  }, []);
   // Function to handle edit
const handleEdit = (resume) => {
  // Redirect to form page with resume data
  localStorage.setItem("editResume", JSON.stringify(resume));
  window.location.href = "/resume-form";
 };
  // Delete resume by ID
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/resumes/${id}`);
      setResumes(resumes.filter((r) => r._id !== id)); // Update state after deletion
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6 bg-gray-950 min-h-screen text-white">
      <h2 className="text-3xl font-bold mb-6">Saved Resumes</h2>

      {resumes.length === 0 ? (
        <p>No resumes found.</p>
      ) : (
        resumes.map((r, i) => (
          <div key={i} className="mb-6 p-4 border border-gray-700 rounded">
            {/* Display company and duration safely */}
            <h3 className="text-xl font-semibold">
              {r.experience?.company || "No company"}
            </h3>
            <p>{r.experience?.duration || "No duration"}</p>

            {/* Safely render bullet points */}
            <ul className="list-disc ml-6">
              {r.experience?.bulletPoints?.length ? (
                r.experience.bulletPoints.map((b, j) => <li key={j}>{b}</li>)
              ) : (
                <li>No bullet points</li>
              )}
            </ul>

            {/* Safely render skills */}
            <p className="mt-2">
              <strong>Skills:</strong>{" "}
              {r.skills?.length ? r.skills.join(", ") : "No skills"}
            </p>
            <button
              onClick={() => handleEdit(r)}
              className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1             rounded ml-2">Edit
              </button>
            {/* Delete button */}
            <button
              onClick={() => handleDelete(r._id)}
              className="mt-3 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}