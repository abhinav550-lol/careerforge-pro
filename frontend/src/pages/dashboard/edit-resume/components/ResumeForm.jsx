import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"; // Added useDispatch
import PersonalDetails from "./form-components/PersonalDetails";
import Summary from "./form-components/Summary";
import Experience from "./form-components/Experience";
import Education from "./form-components/Education";
import Skills from "./form-components/Skills";
import Project from "./form-components/Project";
import { ArrowLeft, ArrowRight, HomeIcon, Sparkles, LoaderCircle, BrainCircuit, LayoutGrid, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import ThemeColor from "./ThemeColor";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import TemplatePicker from "@/components/custom/TemplatePicker";
// Import your action to update resume data
// import { setResumeInfo } from "@/features/resume/resumeSlice"; 

function ResumeForm() {
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [enanbledNext, setEnabledNext] = useState(true);
  const [enanbledPrev, setEnabledPrev] = useState(true);
  const resumeInfo = useSelector((state) => state.editResume.resumeData);

  // AI States
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isRewriting, setIsRewriting] = useState(false);
  const [showJdInput, setShowJdInput] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [analysisData, setAnalysisData] = useState(null);

  useEffect(() => {
    setEnabledPrev(currentIndex > 0);
    if (currentIndex === 5) setEnabledNext(false);
  }, [currentIndex]);

  const components = [
    { title: "Personal", component: <PersonalDetails resumeInfo={resumeInfo} enanbledNext={setEnabledNext} /> },
    { title: "Summary", component: <Summary resumeInfo={resumeInfo} enanbledNext={setEnabledNext} enanbledPrev={setEnabledPrev} /> },
    { title: "Experience", component: <Experience resumeInfo={resumeInfo} enanbledNext={setEnabledNext} enanbledPrev={setEnabledPrev} /> },
    { title: "Projects", component: <Project resumeInfo={resumeInfo} setEnabledNext={setEnabledNext} setEnabledPrev={setEnabledPrev} /> },
    { title: "Education", component: <Education resumeInfo={resumeInfo} enanbledNext={setEnabledNext} /> },
    { title: "Skills", component: <Skills resumeInfo={resumeInfo} enanbledNext={setEnabledNext} /> }
  ];

  // Logic to get clean Base URL
  const getBaseUrl = () => {
    const rawBaseUrl = import.meta.env.VITE_APP_URL || "http://localhost:5001";
    return rawBaseUrl.endsWith('/') ? rawBaseUrl.slice(0, -1) : rawBaseUrl;
  };

  // ACTION 1: Analyze Gap
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

  // ACTION 2: One-Click Forge (The Rewrite Logic)
  const transformResumeWithAI = async () => {
    if (!jobDescription) return toast.error("Provide a JD to forge a version.");
    setIsRewriting(true);
    try {
      const response = await axios.post(`${getBaseUrl()}/api/ai/transform-resume`, {
        resumeData: resumeInfo,
        jobDescription: jobDescription
      });

      if (response.data?.transformedData) {
        // Update Redux state with the new forged data
        // dispatch(setResumeInfo(response.data.transformedData));
        
        toast.success("Resume Forged! Content updated to match JD.");
        setAnalysisData(null); // Reset analysis as it's now updated
        setShowJdInput(false); // Close panel to show changes
      }
    } catch (error) {
      toast.error("The Forge failed to rewrite your content.");
    } finally { setIsRewriting(false); }
  };

  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 premium-shadow">
      
      {/* 1. TOP NAVIGATION & AI TOGGLE */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
        <div className="flex flex-wrap gap-3 items-center justify-center">
          <Link to="/dashboard">
            <Button variant="outline" size="icon" className="rounded-2xl border-slate-100 h-11 w-11 shadow-sm">
              <HomeIcon className="w-4 h-4 text-slate-600" />
            </Button>
          </Link>
          <div className="h-6 w-[1px] bg-slate-100 mx-1 hidden md:block" />
          <TemplatePicker />
          <ThemeColor resumeInfo={resumeInfo} />
          
          <Button
            variant="outline"
            onClick={() => setShowJdInput(!showJdInput)}
            className={`rounded-2xl border-purple-100 text-purple-600 flex gap-2 font-bold h-11 px-6 transition-all ${
              showJdInput ? 'bg-purple-600 text-white border-transparent shadow-lg shadow-purple-100' : 'hover:bg-purple-50'
            }`}
          >
            <Zap className={`w-4 h-4 ${showJdInput ? 'animate-pulse' : ''}`} />
            <span className="hidden sm:inline">
              {analysisData ? `Match: ${analysisData.matchPercentage}%` : "AI Forge Panel"}
            </span>
          </Button>
        </div>

        <div className="flex items-center gap-2 bg-slate-50 p-2 px-4 rounded-full border border-slate-100">
          {components.map((_, i) => (
            <div key={i} className={`h-2 rounded-full transition-all duration-300 ${i === currentIndex ? "bg-purple-600 w-6" : "bg-slate-200 w-2"}`} />
          ))}
        </div>
      </div>

      {/* 2. THE AI FORGE PANEL */}
      <AnimatePresence>
        {showJdInput && (
          <motion.div
            initial={{ height: 0, opacity: 0, scale: 0.95 }}
            animate={{ height: "auto", opacity: 1, scale: 1 }}
            exit={{ height: 0, opacity: 0, scale: 0.95 }}
            className="overflow-hidden mb-10"
          >
            <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/20 blur-[80px] rounded-full -mr-20 -mt-20" />
               
               <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/10 rounded-xl"><BrainCircuit className="w-5 h-5 text-purple-400" /></div>
                  <h3 className="text-sm font-black uppercase tracking-widest">ATS Forge Infrastructure</h3>
                </div>
                
                <Textarea
                  placeholder="Paste Job Description here..."
                  className="bg-white/5 border-white/10 min-h-[140px] rounded-[1.5rem] focus:ring-purple-400/20 text-white placeholder:text-slate-500"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />

                <div className="flex flex-col md:flex-row gap-4">
                  <Button
                    disabled={isAnalyzing || !jobDescription}
                    onClick={runAnalysis}
                    className="bg-purple-600 hover:bg-purple-500 text-white rounded-2xl h-14 px-8 font-bold flex gap-2"
                  >
                    {isAnalyzing ? <LoaderCircle className="animate-spin" /> : "Analyze Compatibility"}
                  </Button>

                  <Button
                    disabled={isRewriting || !jobDescription}
                    onClick={transformResumeWithAI}
                    className="bg-white text-slate-900 hover:bg-slate-100 rounded-2xl h-14 px-8 font-black uppercase text-[10px] tracking-widest shadow-xl flex gap-2 active:scale-95"
                  >
                    {isRewriting ? <LoaderCircle className="animate-spin w-4 h-4" /> : <>Forge ATS Resume <Sparkles className="w-4 h-4 text-purple-600" /></>}
                  </Button>
                </div>

                {analysisData?.missingSkills?.length > 0 && (
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-[9px] font-black uppercase text-slate-400 mb-2">Missing Skills Detected:</p>
                    <div className="flex flex-wrap gap-2">
                      {analysisData.missingSkills.map((s, i) => (
                        <span key={i} className="text-[10px] font-bold bg-white/10 text-purple-200 px-3 py-1 rounded-lg">{s}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. FORM CONTENT AREA */}
      <div className="relative min-h-[450px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="pb-24"
          >
            <div className="flex items-center gap-2 mb-8">
               <LayoutGrid className="w-4 h-4 text-slate-400" />
               <h2 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Step {currentIndex + 1}: {components[currentIndex].title}</h2>
            </div>
            
            <div className="bg-slate-50/50 p-8 rounded-[2.5rem] border border-slate-100 shadow-inner transition-all">
              {components[currentIndex].component}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* 4. FLOATING ACTION NAV */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center p-4 bg-white/70 backdrop-blur-xl rounded-[2rem] border border-slate-100 shadow-2xl">
          <Button
            variant="ghost"
            className="rounded-xl font-bold h-12 px-6"
            disabled={!enanbledPrev}
            onClick={() => setCurrentIndex(currentIndex - 1)}
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>

          <Button
            className="bg-slate-900 text-white rounded-xl h-12 px-10 font-bold transition-all active:scale-95 flex gap-2 shadow-xl shadow-slate-200"
            disabled={!enanbledNext && currentIndex < 5}
            onClick={() => {
              if (currentIndex < 5) setCurrentIndex(currentIndex + 1);
              else toast.success("Deployment Ready!");
            }}
          >
            {currentIndex === 5 ? "Deploy Architecture" : "Proceed"} 
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ResumeForm;