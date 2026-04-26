import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PersonalDetails from "./form-components/PersonalDetails";
import Summary from "./form-components/Summary";
import Experience from "./form-components/Experience";
import Education from "./form-components/Education";
import Skills from "./form-components/Skills";
import Project from "./form-components/Project";
import { ArrowLeft, ArrowRight, HomeIcon, Sparkles, LoaderCircle, BrainCircuit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"; // Ensure this is imported
import { Link } from "react-router-dom";
import ThemeColor from "./ThemeColor";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios"; // Added axios
import { toast } from "sonner"; // Added toast
import TemplatePicker from "@/components/custom/TemplatePicker";

function ResumeForm() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [enanbledNext, setEnabledNext] = useState(true);
  const [enanbledPrev, setEnabledPrev] = useState(true);
  const resumeInfo = useSelector((state) => state.editResume.resumeData);

  // AI Analysis States
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showJdInput, setShowJdInput] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [analysisData, setAnalysisData] = useState(null);

  useEffect(() => {
    setEnabledPrev(currentIndex > 0);
    if (currentIndex === 5) {
      setEnabledNext(false);
    }
  }, [currentIndex]);

  const components = [
    { title: "Personal", component: <PersonalDetails resumeInfo={resumeInfo} enanbledNext={setEnabledNext} /> },
    { title: "Summary", component: <Summary resumeInfo={resumeInfo} enanbledNext={setEnabledNext} enanbledPrev={setEnabledPrev} /> },
    { title: "Experience", component: <Experience resumeInfo={resumeInfo} enanbledNext={setEnabledNext} enanbledPrev={setEnabledPrev} /> },
    { title: "Projects", component: <Project resumeInfo={resumeInfo} setEnabledNext={setEnabledNext} setEnabledPrev={setEnabledPrev} /> },
    { title: "Education", component: <Education resumeInfo={resumeInfo} enanbledNext={setEnabledNext} /> },
    { title: "Skills", component: <Skills resumeInfo={resumeInfo} enanbledNext={setEnabledNext} /> }
  ];

  const runAnalysis = async () => {
    if (!jobDescription) return toast.error("Please paste a Job Description first.");
    setIsAnalyzing(true);
   try {
    // 1. Clean the base URL (remove trailing slash if present)
    const rawBaseUrl = import.meta.env.VITE_APP_URL || "http://localhost:5001";
    const baseUrl = rawBaseUrl.endsWith('/') ? rawBaseUrl.slice(0, -1) : rawBaseUrl;
    
    // 2. Call the backend
    const response = await axios.post(`${baseUrl}/api/ai/analyze-jd`, {
      resumeData: resumeInfo,
      jobDescription: jobDescription
    });
    setAnalysisData(response.data);
    toast.success("ATS Analysis Complete!");
  }
     catch (error) {
      toast.error("AI Architect failed to analyze the JD.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="bg-white p-5 shadow-xl rounded-2xl border border-slate-100">
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2 items-center">
          <Link to="/dashboard">
            <Button variant="outline" size="icon" className="rounded-xl border-slate-200">
              <HomeIcon className="w-4 h-4" />
            </Button>
          </Link>
          <TemplatePicker />
          <ThemeColor resumeInfo={resumeInfo} />
          
          {/* Smart Match Toggle Button */}
          <Button
            variant="outline"
            onClick={() => setShowJdInput(!showJdInput)}
            className={`rounded-xl border-purple-200 text-purple-600 flex gap-2 font-bold transition-all ${showJdInput ? 'bg-purple-50 ring-2 ring-purple-100' : 'hover:bg-purple-50'}`}
          >
            <Sparkles className="w-4 h-4" />
            {analysisData ? "Match Score: " + analysisData.matchPercentage + "%" : "Smart Match"}
          </Button>
        </div>

        <div className="hidden md:flex items-center gap-1">
          {components.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 w-8 rounded-full transition-all duration-300 ${i === currentIndex ? "bg-green-500 w-12" : "bg-slate-100"}`}
            />
          ))}
        </div>

        <div className="flex items-center gap-3">
          {currentIndex > 0 && (
            <Button
              variant="outline"
              size="sm"
              className="rounded-xl border-slate-200 gap-2 font-bold"
              disabled={!enanbledPrev}
              onClick={() => setCurrentIndex(currentIndex - 1)}
            >
              <ArrowLeft className="w-4 h-4" /> Prev
            </Button>
          )}

          <Button
            size="sm"
            className="rounded-xl bg-slate-900 text-white hover:bg-slate-800 gap-2 font-bold shadow-lg shadow-slate-200"
            disabled={!enanbledNext && currentIndex < 5}
            onClick={() => {
              if (currentIndex < 5) setCurrentIndex(currentIndex + 1);
            }}
          >
            {currentIndex === 5 ? "Finish" : "Next"}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* JD ANALYSIS PANEL: The missing block */}
      <AnimatePresence>
        {showJdInput && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-6"
          >
            <div className="p-6 bg-purple-50/50 rounded-2xl border border-purple-100 space-y-4">
              <div className="flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-purple-600" />
                <h3 className="text-xs font-black uppercase tracking-widest text-purple-700">AI Gap Analysis</h3>
              </div>
              
              <Textarea
                placeholder="Paste the Job Description (JD) here... Our AI will compare your resume skills and experience against these requirements."
                className="bg-white border-purple-200 min-h-[150px] rounded-xl focus:ring-purple-400/20"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />

              <div className="flex justify-between items-center">
                <Button
                  disabled={isAnalyzing || !jobDescription}
                  onClick={runAnalysis}
                  className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl px-8 font-bold shadow-lg shadow-purple-100"
                >
                  {isAnalyzing ? <LoaderCircle className="animate-spin" /> : "Analyze Compatibility"}
                </Button>

                {analysisData && (
                  <div className="flex gap-4 items-center bg-white p-3 px-5 rounded-xl border border-purple-100 shadow-sm">
                    <div className="text-right">
                      <p className="text-[10px] font-black uppercase text-slate-400 leading-none">Match Score</p>
                      <p className="text-xl font-black text-purple-600 leading-none">{analysisData.matchPercentage}%</p>
                    </div>
                  </div>
                )}
              </div>
              
              {analysisData?.missingSkills?.length > 0 && (
                <div className="pt-2 border-t border-purple-100">
                  <p className="text-[10px] font-black uppercase text-purple-400 mb-2">Missing Key Competencies:</p>
                  <div className="flex flex-wrap gap-2">
                    {analysisData.missingSkills.map((skill, i) => (
                      <span key={i} className="text-[10px] font-bold bg-white text-slate-600 px-3 py-1 rounded-full border border-slate-100">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="mb-4">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-500 bg-purple-50 px-3 py-1 rounded-full border border-purple-100 inline-flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Step {currentIndex + 1}: {components[currentIndex].title}
              </span>
            </div>
            {components[currentIndex].component}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default ResumeForm;