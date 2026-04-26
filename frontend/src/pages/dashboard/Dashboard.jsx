import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllResumeData } from "@/Services/resumeAPI";
import AddResume from "./components/AddResume";
import ResumeCard from "./components/ResumeCard";
import { 
  Rocket, 
  Crown, 
  Wand2, 
  Sparkles,
  Zap,
  LayoutGrid,
  ShieldCheck
} from "lucide-react";
import { motion } from "framer-motion";

function Dashboard() {
  const user = useSelector((state) => state.editUser.userData);
  const [resumeList, setResumeList] = useState([]);
  const [isPro, setIsPro] = useState(false); 

  const fetchAllResumeData = async () => {
    try {
      const resumes = await getAllResumeData();
      setResumeList(resumes.data || []);
    } catch (error) {
      console.error("Dashboard error:", error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchAllResumeData();
      setIsPro(user.subscriptionStatus === "pro");
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8 md:px-20 lg:px-32 selection:bg-purple-100">
      
      {/* 1. PREMIUM HEADER SECTION */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="h-2 w-2 rounded-full bg-purple-600 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">System Online</span>
          </div>
          <h2 className="font-black text-4xl text-slate-900 tracking-tighter uppercase">
            My <span className="text-purple-600">Forge</span> Architectures
          </h2>
          <p className="text-slate-500 font-medium mt-1">
            Managing {resumeList.length} AI-optimized resume structures.
          </p>
        </div>

        {/* Pro Tier Badge */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className={`flex items-center gap-3 px-5 py-2.5 rounded-2xl border-2 transition-all ${
            isPro 
            ? "bg-purple-600 border-purple-400 text-white shadow-lg shadow-purple-200" 
            : "bg-white border-slate-200 text-slate-600 shadow-sm"
          }`}
        >
          {isPro ? <Crown className="w-4 h-4" /> : <Rocket className="w-4 h-4 text-purple-600" />}
          <span className="text-xs font-black uppercase tracking-widest">
            {isPro ? "Executive Tier" : "Standard Engine"}
          </span>
        </motion.div>
      </motion.div>

      {/* 2. BENTO STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="bg-white p-7 rounded-[2rem] border border-slate-100 premium-shadow group hover:border-purple-100 transition-all">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Total Deployments</p>
              <h3 className="text-4xl font-black text-slate-900 leading-none">{resumeList.length}</h3>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl text-slate-400 group-hover:text-purple-600 group-hover:bg-purple-50 transition-all">
              <LayoutGrid className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="bg-white p-7 rounded-[2rem] border border-slate-100 premium-shadow group hover:border-purple-100 transition-all">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">AI Credits</p>
              <h3 className={`text-4xl font-black leading-none ${isPro ? "text-purple-600" : "text-slate-900"}`}>
                {isPro ? "∞" : "03"}
              </h3>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl text-slate-400 group-hover:text-purple-600 group-hover:bg-purple-50 transition-all">
              <Zap className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="bg-white p-7 rounded-[2rem] border border-slate-100 premium-shadow group hover:border-purple-100 transition-all">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">ATS Readiness</p>
              <h3 className="text-4xl font-black text-slate-900 leading-none">98%</h3>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl text-slate-400 group-hover:text-purple-600 group-hover:bg-purple-50 transition-all">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* 3. RESUME GRID AREA */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <AddResume />
        {resumeList.length > 0 &&
          resumeList.map((resume) => (
            <ResumeCard
              key={resume._id}
              resume={resume}
              refreshData={fetchAllResumeData}
            />
          ))}
      </div>

      {/* 4. PRO UPGRADE CALLOUT */}
      {!isPro && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-20 p-10 bg-slate-900 rounded-[3rem] text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/20 blur-[100px] rounded-full" />
          <div className="relative z-10">
            <h4 className="font-black text-2xl uppercase tracking-tighter">Forge Without Limits</h4>
            <p className="text-slate-400 text-sm mt-2 max-w-md font-medium">
              Upgrade to the Executive Tier for unlimited AI generations, premium PDF templates, and deep JD analysis.
            </p>
          </div>
          <button className="relative z-10 bg-white text-slate-900 px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-purple-50 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-white/5">
            Upgrade to Pro
          </button>
        </motion.div>
      )}
    </div>
  );
}

export default Dashboard;