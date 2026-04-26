import React, { useEffect, useState } from "react";
import ResumeForm from "../components/ResumeForm";
import PreviewPage from "../components/PreviewPage";
import { useParams } from "react-router-dom";
import { getResumeData } from "@/Services/resumeAPI";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { motion } from "framer-motion";
import { Wand2, Sparkles } from "lucide-react";

/**
 * EditResume: The Orchestrator Layer
 * As per PRD Section 3 & 4, this component manages the split-screen 
 * Live Preview and the AI-MERN logical processing flow. [cite: 17, 84]
 */
export function EditResume() {
  const { resume_id } = useParams();
  const dispatch = useDispatch();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    // Initializing Data + AI Memory (MongoDB Atlas Vector Search) [cite: 17, 36]
    getResumeData(resume_id)
      .then((data) => {
        dispatch(addResumeData(data.data));
      })
      .finally(() => setIsInitializing(false));
  }, [resume_id, dispatch]);

  if (isInitializing) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-slate-50">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        >
          <Sparkles className="text-green-500 w-10 h-10" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* AI Mandate Header: Guidance for the CareerForge Pro user [cite: 68] */}
      <div className="px-10 py-4 bg-white border-b border-slate-200 flex justify-between items-center">
        <div>
          <h2 className="font-black text-xl text-slate-900 flex items-center gap-2">
            <Wand2 className="text-purple-500 w-5 h-5" />
            AI Architect Suite
          </h2>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Squadron Omega // Cognitive Architecture v1.5 [cite: 4, 29]
          </p>
        </div>
        
        <div className="flex gap-4">
          <button className="text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors">
            ATS Score Analysis [cite: 76]
          </button>
        </div>
      </div>

      {/* The Mandatory Split-Screen Live Preview  */}
      <div className="grid grid-cols-1 md:grid-cols-2 p-6 lg:p-10 gap-6 lg:gap-10">
        {/* Step 1 & 2: The Builder Core (Data Entry)  */}
        <div className="h-[calc(100vh-160px)] overflow-y-auto pr-2 custom-scrollbar">
          <ResumeForm />
        </div>

        {/* The Interface (UX): Instantaneous streaming response preview [cite: 39, 84] */}
        <div className="h-[calc(100vh-160px)] overflow-y-auto sticky top-24 rounded-2xl shadow-2xl border border-slate-200 bg-white">
          <PreviewPage />
        </div>
      </div>
    </div>
  );
}

export default EditResume;