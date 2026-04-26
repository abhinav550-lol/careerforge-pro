import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllResumeData } from "@/Services/resumeAPI";
import AddResume from "./components/AddResume";
import ResumeCard from "./components/ResumeCard";
import { 
  Rocket, 
  Crown, 
  Zap,
  LayoutGrid,
  ShieldCheck,
  Activity,
  Box,
  Sparkles
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
    <div className="min-h-screen bg-[#F8FAFC] p-8 md:px-20 lg:px-32 selection:bg-purple-100/30">
      
      {/* 1. UNIVERSAL HEADER SECTION */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8"
      >
        <div className="space-y-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="px-3 py-1.5 bg-slate-900 rounded-full flex items-center gap-2 shadow-lg shadow-slate-200">
               <div className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
               <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white">Career Hub Active</span>
            </div>
          </div>
          <h2 className="font-black text-5xl text-slate-900 tracking-tighter uppercase leading-none">
            My <span className="text-purple-600">Profiles</span>
          </h2>
          <p className="text-slate-500 font-medium text-lg mt-2">
            You have {resumeList.length} professional resumes optimized for your next move.
          </p>
        </div>

        {/* Dynamic Tier Badge */}
        <motion.div 
          whileHover={{ y: -2 }}
          className={`group flex items-center gap-4 px-6 py-3 rounded-[2rem] border-2 transition-all cursor-default ${
            isPro 
            ? "bg-slate-900 border-slate-800 text-white shadow-2xl shadow-purple-500/10" 
            : "bg-white border-slate-100 text-slate-600 shadow-sm"
          }`}
        >
          <div className={`p-2.5 rounded-xl ${isPro ? "bg-purple-600 shadow-lg shadow-purple-500/20" : "bg-slate-50"}`}>
            {isPro ? <Crown className="w-4 h-4 text-white" /> : <Rocket className="w-4 h-4 text-purple-600" />}
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-black uppercase tracking-widest opacity-50">Membership Tier</span>
            <span className="text-xs font-black uppercase tracking-widest">
              {isPro ? "Executive Suite" : "Standard Engine"}
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* 2. ANALYTICS BENTO GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {[
          { label: "Active Profiles", value: resumeList.length, icon: <LayoutGrid />, color: "text-blue-600" },
          { label: "Smart Credits", value: isPro ? "UNLIMITED" : "03", icon: <Sparkles />, color: "text-purple-600" },
          { label: "Expert Grade", value: "98%", icon: <ShieldCheck />, color: "text-emerald-600" }
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] group hover:border-purple-600/20 hover:bg-white transition-all cursor-default"
          >
            <div className="flex justify-between items-start">
              <div className="space-y-4">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-purple-500 transition-colors">
                  {stat.label}
                </p>
                <h3 className={`text-4xl font-black tracking-tighter ${stat.color} leading-none`}>
                  {stat.value}
                </h3>
              </div>
              <div className="p-5 bg-slate-50 rounded-2xl text-slate-400 group-hover:text-purple-600 group-hover:bg-purple-50 transition-all shadow-sm">
                {stat.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 3. RESUME GRID AREA */}
      <div className="relative">
        <div className="flex items-center gap-3 mb-10">
           <Box className="w-4 h-4 text-slate-300" />
           <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Archived & Active Builds</h3>
           <div className="flex-1 h-[1px] bg-slate-100" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
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
      </div>

      {/* 4. PROMOTION BANNER */}
      {!isPro && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-24 p-12 bg-slate-900 rounded-[3.5rem] text-white flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden shadow-2xl shadow-slate-200"
        >
          {/* Animated Background Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/20 blur-[120px] rounded-full -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full -ml-20 -mb-20" />
          
          <div className="relative z-10 space-y-4 text-center lg:text-left">
            <div className="flex items-center gap-2 justify-center lg:justify-start">
               <Activity className="w-4 h-4 text-purple-400 animate-pulse" />
               <span className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-400">Performance Upgrade</span>
            </div>
            <h4 className="font-black text-4xl uppercase tracking-tighter leading-none">
              Master the <span className="text-purple-400">Career Forge</span>
            </h4>
            <p className="text-slate-400 text-sm max-w-lg font-medium leading-relaxed">
              Unlock the full power of our AI. Gain access to multi-industry analysis, 
              premium layout architectures, and unlimited professional refinements.
            </p>
          </div>

          <button className="relative z-10 bg-white text-slate-900 px-12 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-purple-50 transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-white/10">
            Access Executive Tier
          </button>
        </motion.div>
      )}
    </div>
  );
}

export default Dashboard;