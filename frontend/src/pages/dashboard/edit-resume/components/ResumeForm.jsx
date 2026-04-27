import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import PersonalDetails from "./form-components/PersonalDetails";
import Summary from "./form-components/Summary";
import Experience from "./form-components/Experience";
import Education from "./form-components/Education";
import Skills from "./form-components/Skills";
import Project from "./form-components/Project";
import { ArrowLeft, ArrowRight, HomeIcon, Sparkles, LoaderCircle, BrainCircuit, LayoutGrid, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ThemeColor from "./ThemeColor";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import TemplatePicker from "@/components/custom/TemplatePicker";
import { addResumeData } from "@/features/resume/resumeFeatures";

function ResumeForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { resume_id } = useParams();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [enanbledNext, setEnabledNext] = useState(true);
  const [enanbledPrev, setEnabledPrev] = useState(true);
  const resumeInfo = useSelector((state) => state.editResume.resumeData);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isRewriting, setIsRewriting] = useState(false);
  const [showJdInput, setShowJdInput] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [analysisData, setAnalysisData] = useState(null);

  useEffect(() => {
    setEnabledPrev(currentIndex > 0);
  }, [currentIndex]);

  const components = [
    { title: "Personal", component: <PersonalDetails resumeInfo={resumeInfo} enanbledNext={setEnabledNext} /> },
    { title: "Summary", component: <Summary resumeInfo={resumeInfo} enanbledNext={setEnabledNext} enanbledPrev={setEnabledPrev} /> },
    { title: "Experience", component: <Experience resumeInfo={resumeInfo} enanbledNext={setEnabledNext} enanbledPrev={setEnabledPrev} /> },
    { title: "Projects", component: <Project resumeInfo={resumeInfo} setEnabledNext={setEnabledNext} setEnabledPrev={setEnabledPrev} /> },
    { title: "Education", component: <Education resumeInfo={resumeInfo} enanbledNext={setEnabledNext} /> },
    { title: "Skills", component: <Skills resumeInfo={resumeInfo} enanbledNext={setEnabledNext} /> }
  ];

  const getBaseUrl = () => {
    const rawBaseUrl = import.meta.env.VITE_APP_URL || "http://localhost:5001";
    return rawBaseUrl.replace(/\/+$/, "");
  };

  const runAnalysis = async () => {
    if (!jobDescription) return toast.error("Please paste a Job Description first.");
    setIsAnalyzing(true);
    try {
      const response = await axios.post(`${getBaseUrl()}/api/ai/analyze-jd`, {
        resumeData: resumeInfo,
        jobDescription: jobDescription
      });
      setAnalysisData(response.data);
      toast.success("ATS Analysis Complete!");
    } catch (error) {
      toast.error("AI Architect failed to analyze the JD.");
    } finally { setIsAnalyzing(false); }
  };

  const transformResumeWithAI = async () => {
    if (!jobDescription) return toast.error("Provide a JD to forge a version.");
    setIsRewriting(true);
    try {
      const response = await axios.post(`${getBaseUrl()}/api/ai/transform-resume`, {
        resumeData: resumeInfo,
        jobDescription: jobDescription
      });

      if (response.data?.transformedData) {
        dispatch(addResumeData(response.data.transformedData));
        toast.success("Resume Forged! Content updated to match JD.");
        setAnalysisData(null);
        setShowJdInput(false);
      }
    } catch (error) {
      toast.error("The Forge failed to rewrite your content.");
    } finally { setIsRewriting(false); }
  };

  const handleNextNavigation = () => {
    if (currentIndex < components.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      toast.success("Architect Suite: Deployment Initiated");
      navigate(`/dashboard/view-resume/${resume_id}/`);
    }
  };

  return (
    <div className="bg-white p-4 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 shadow-2xl">
      
     {/* 1. TOP NAVIGATION & AI TOOLS */}
<div className="flex flex-col gap-6 mb-10">
  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
    
    {/* LEFT COLUMN: Tool Stack */}
    <div className="flex flex-col gap-4 w-full md:w-full">
      
      {/* Level 1: Basic Utility Row */}
      <div className="flex items-center justify-beetween gap-11 w-full px-1">
        <Link to="/dashboard">
          <Button variant="outline" size="icon" className="rounded-xl md:rounded-2xl border-slate-100 h-10 w-10 md:h-11 md:w-11 shadow-sm shrink-0">
            <HomeIcon className="w-4 h-4 text-slate-600" />
          </Button>
        </Link>
        <TemplatePicker />
        <ThemeColor resumeInfo={resumeInfo} />
      </div>

      {/* Level 2: Wide AI Forge Button (Now Below the tools) */}
      <div className="w-full">
        <Button
          variant="outline"
          onClick={() => setShowJdInput(!showJdInput)}
          className={`
            relative overflow-hidden rounded-2xl w-full h-12 px-10 transition-all duration-500 font-black uppercase text-[10px] tracking-[0.2em] flex gap-3 items-center justify-center
            ${showJdInput 
              ? 'bg-slate-900 text-white border-transparent scale-[1.02]' 
              : 'bg-gradient-to-r from-purple-600 via-fuchsia-500 to-purple-600 bg-[length:200%_auto] hover:bg-[right_center] text-white border-transparent animate-forge-glow shadow-xl shadow-purple-500/20'
            }
          `}
        >
          {/* Glass Shine Effect */}
          <span className="absolute inset-0 bg-white/20 w-full h-full -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          
          <Zap className={`w-4 h-4 shrink-0 ${showJdInput ? 'animate-bounce text-purple-400' : 'text-white'}`} />
          
          <span className="relative z-10 truncate">
            {analysisData ? `Architect Grade: ${analysisData.matchPercentage}%` : "Forge ATS Version"}
          </span>

          {!showJdInput && (
            <Sparkles className="w-3 h-3 text-purple-200 animate-pulse shrink-0" />
          )}
        </Button>
      </div>
    </div>
  </div>

      </div>

      {/* 2. THE AI FORGE PANEL */}
      <AnimatePresence>
        {showJdInput && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-10"
          >
            <div className="p-6 md:p-8 bg-slate-900 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden border border-purple-500/20">
               <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 blur-[80px] rounded-full -mr-20 -mt-20" />
               <div className="relative z-10 space-y-6">
                <Textarea
                  placeholder="Paste Job Description for ATS Forge..."
                  className="bg-white/5 border-white/10 min-h-[120px] rounded-2xl focus:ring-purple-400/20 text-sm placeholder:text-slate-500"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button disabled={isAnalyzing || !jobDescription} onClick={runAnalysis} className="bg-purple-600 hover:bg-purple-500 rounded-xl h-12 flex-1 font-bold text-xs">
                    {isAnalyzing ? <LoaderCircle className="animate-spin" /> : "Check Match"}
                  </Button>
                  <Button disabled={isRewriting || !jobDescription} onClick={transformResumeWithAI} className="bg-white text-slate-900 hover:bg-slate-100 rounded-xl h-12 flex-1 font-black uppercase text-[10px] tracking-widest">
                    {isRewriting ? <LoaderCircle className="animate-spin w-4 h-4" /> : "Forge Version"}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. FORM CONTENT AREA */}
      <div className="relative min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="pb-28 md:pb-24"
          >
            <div className="flex flex-row justify-between items-center mb-8 px-2">
              <div className="flex items-center gap-2">
                <LayoutGrid className="w-4 h-4 text-purple-600/40" />
                <h2 className="text-sm md:text-xl font-black text-slate-900 uppercase tracking-tighter">
                  Step {currentIndex + 1}: {components[currentIndex].title}
                </h2>
              </div>

              <div className="flex items-center gap-1.5 md:gap-2 bg-slate-50 p-1.5 px-3 md:p-2 md:px-4 rounded-full border border-slate-100 shadow-sm">
                {components.map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-1.5 md:h-2 rounded-full transition-all duration-500 ${
                      i === currentIndex ? "bg-purple-600 w-4 md:w-6 shadow-[0_0_8px_rgba(147,51,234,0.4)]" : "bg-slate-200 w-1.5 md:w-2"
                    }`} 
                  />
                ))}
              </div>
            </div>
            
            <div className="bg-slate-50/50 p-6 md:p-8 rounded-[2.5rem] border border-slate-100 shadow-inner">
              {components[currentIndex].component}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* 4. FLOATING ACTION NAV */}
        <div className="fixed md:absolute bottom-6 md:bottom-0 left-4 right-4 md:left-0 md:right-0 flex justify-between items-center p-3 md:p-4 bg-white/80 backdrop-blur-2xl rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-2xl z-50">
          <Button
            variant="ghost"
            className="rounded-xl font-bold h-10 md:h-12 px-4 md:px-6 text-xs"
            disabled={!enanbledPrev}
            onClick={() => setCurrentIndex(currentIndex - 1)}
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>

          <Button
            className="bg-slate-900 text-white rounded-xl h-10 md:h-12 px-6 md:px-10 font-bold transition-all active:scale-95 flex gap-2 shadow-xl shadow-slate-200 text-xs"
            disabled={!enanbledNext && currentIndex < components.length - 1}
            onClick={handleNextNavigation}
          >
            {currentIndex === components.length - 1 ? "Deploy Studio" : "Proceed"} 
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ResumeForm;