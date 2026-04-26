import React, { useEffect, useState } from "react";
import ResumeForm from "../components/ResumeForm";
import PreviewPage from "../components/PreviewPage";
import { useParams, Link } from "react-router-dom";
import { getResumeData } from "@/Services/resumeAPI";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { motion } from "framer-motion";
import { Sparkles, ChevronLeft, Layout, ShieldCheck, Zap, Briefcase } from "lucide-react";

export function EditResume() {
  const { resume_id } = useParams();
  const dispatch = useDispatch();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    getResumeData(resume_id)
      .then((data) => {
        dispatch(addResumeData(data.data));
      })
      .finally(() => setIsInitializing(false));
  }, [resume_id, dispatch]);

  if (isInitializing) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-[#F8FAFC]">
        <motion.div 
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
          className="relative"
        >
          <div className="absolute inset-0 bg-purple-400/20 blur-2xl rounded-full" />
          <div className="bg-white p-6 rounded-[2rem] shadow-xl relative z-10 border border-slate-50">
            <Sparkles className="text-purple-600 w-12 h-12" />
          </div>
        </motion.div>
        <p className="mt-8 text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 animate-pulse">
          Synchronizing Your Profile...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#F8FAFC] min-h-screen selection:bg-purple-100">
      
      {/* 1. PREMIUM STUDIO HEADER */}
      <header className="sticky top-0 z-[100] px-8 py-4 bg-white/80 backdrop-blur-xl border-b border-slate-100 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <Link to="/dashboard">
            <motion.button 
              whileHover={{ x: -4 }}
              className="p-2.5 hover:bg-slate-50 rounded-2xl transition-all group border border-transparent hover:border-slate-100"
            >
              <ChevronLeft className="w-5 h-5 text-slate-400 group-hover:text-slate-900" />
            </motion.button>
          </Link>
          <div className="h-8 w-[1px] bg-slate-100" />
          <div>
            <h2 className="font-black text-lg text-slate-900 flex items-center gap-2.5 leading-none uppercase tracking-tighter">
              <div className="p-1.5 bg-purple-600 rounded-lg shadow-lg shadow-purple-100">
                <Briefcase className="text-white w-3.5 h-3.5" />
              </div>
              Success <span className="text-purple-600">Studio</span>
            </h2>
            <div className="flex items-center gap-2 mt-1.5 ml-0.5">
              <div className="h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                AI Optimization Active // Ready for Deployment
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2.5 px-5 py-2.5 bg-white rounded-2xl border border-slate-100 shadow-sm">
             <ShieldCheck className="w-4 h-4 text-purple-600" />
             <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Professional Grade Verified</span>
          </div>
          <motion.button 
            whileTap={{ scale: 0.95 }}
            className="p-3 bg-slate-900 text-white rounded-2xl shadow-xl shadow-slate-200 hover:bg-purple-600 transition-all flex items-center gap-2"
          >
            <Zap className="w-4 h-4" />
            <span className="hidden lg:inline text-[10px] font-black uppercase tracking-widest mr-1">Optimize Now</span>
          </motion.button>
        </div>
      </header>

      {/* 2. DUAL-PANE WORKSPACE */}
      <main className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden">
        
        {/* LEFT: Builder Core */}
        <section className="h-[calc(100vh-81px)] overflow-y-auto bg-white lg:border-r border-slate-100 scroll-smooth custom-scrollbar">
          <div className="max-w-3xl mx-auto p-10 lg:p-16">
            <ResumeForm />
          </div>
        </section>

        {/* RIGHT: Live Preview Canvas */}
        <section className="hidden lg:block h-[calc(100vh-81px)] overflow-y-auto bg-slate-50/50 p-12 scroll-smooth custom-scrollbar">
          <div className="sticky top-0">
            <div className="flex items-center gap-3 mb-8 ml-2">
                <Layout className="w-4 h-4 text-purple-600/60" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Live Success Preview</span>
                <div className="flex-1 h-[1px] bg-slate-200/50" />
            </div>
            
            {/* Floating A4 Document Frame */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border border-slate-200/50 overflow-hidden bg-white mx-auto scale-[0.98] hover:scale-100 transition-transform duration-700"
            >
              <div className="overflow-auto bg-white">
                <PreviewPage />
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default EditResume;