import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllResumeData } from "@/Services/resumeAPI";
import AddResume from "./components/AddResume";
import ResumeCard from "./components/ResumeCard";
import OptimizeModal from "./components/OptimizeModel"; // You will create this next
import { 
  Rocket, 
  Crown, 
  Zap,
  LayoutGrid,
  ShieldCheck,
  Box,
  Sparkles,
  Upload,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

function Dashboard() {
  const user = useSelector((state) => state.editUser.userData);
  const [resumeList, setResumeList] = useState([]);
  const [isPro, setIsPro] = useState(false); 
  const [showOptimizeModal, setShowOptimizeModal] = useState(false);

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
    <div className="min-h-screen bg-[#F8FAFC] p-6 md:p-12 lg:px-32 selection:bg-purple-100/30">
      
      {/* 1. UNIVERSAL HEADER SECTION */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8"
      >
        <div className="space-y-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="px-4 py-2 bg-slate-900 rounded-full flex items-center gap-2.5 shadow-xl shadow-slate-200">
               <div className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
               <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">System Online // v2.0</span>
            </div>
          </div>
          <h2 className="font-black text-5xl md:text-6xl text-slate-900 tracking-tighter uppercase leading-[0.8] mb-4">
            Success <span className="text-purple-600">Hub</span>
          </h2>
          
          {/* PRIMARY ACTION BUTTONS */}
          
        </div>

        {/* Dynamic Tier Badge */}
        <motion.div 
          whileHover={{ y: -2 }}
          className={`group flex items-center gap-4 px-6 py-4 rounded-[2.5rem] border-2 transition-all cursor-default ${
            isPro 
            ? "bg-slate-900 border-slate-800 text-white shadow-2xl" 
            : "bg-white border-slate-100 text-slate-600 shadow-sm"
          }`}
        >
          <div className={`p-3 rounded-2xl ${isPro ? "bg-purple-600" : "bg-slate-50"}`}>
            {isPro ? <Crown className="w-5 h-5 text-white" /> : <Rocket className="w-5 h-5 text-purple-600" />}
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-black uppercase tracking-widest opacity-50 mb-0.5">Account Tier</span>
            <span className="text-xs font-black uppercase tracking-[0.1em]">
              {isPro ? "Executive Suite" : "Standard Engine"}
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* 2. ANALYTICS BENTO GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {[
          { label: "Active Profiles", value: resumeList.length, icon: <LayoutGrid />, color: "text-blue-600" },
          { label: "AI Smart Credits", value: isPro ? "∞" : "03", icon: <Sparkles />, color: "text-purple-600" },
          { label: "ATS Readiness", value: "98%", icon: <ShieldCheck />, color: "text-emerald-600" }
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.03)] group hover:border-purple-600/20 transition-all"
          >
            <div className="flex justify-between items-start">
              <div className="space-y-4">
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 group-hover:text-purple-500 transition-colors">
                  {stat.label}
                </p>
                <h3 className={`text-5xl font-black tracking-tighter ${stat.color} leading-none`}>
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
        <div className="flex items-center gap-4 mb-12">
           <Box className="w-5 h-5 text-slate-300" />
           <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400">Current Builds</h3>
           <div className="flex-1 h-[1px] bg-slate-100" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          <div className="transform hover:scale-105 transition-transform duration-500 flex flex-col justify-evenly">
            <AddResume />
            <Button 
              onClick={() => setShowOptimizeModal(true)}
              variant="outline"
              className="h-28 w-full px-8 rounded-2xl border-slate-200 bg-white hover:bg-purple-50 hover:border-purple-200 text-slate-600 hover:text-purple-600 font-black uppercase text-[10px] tracking-widest flex gap-3 transition-all shadow-sm group"
            >
              <Upload className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
              Optimize Existing Resume
            </Button>
        
          </div>

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

      {/* MODAL INTEGRATION */}
      <OptimizeModal 
        open={showOptimizeModal} 
        setOpen={setShowOptimizeModal} 
      />

      {/* 4. UPGRADE SECTION - Clean and Minimal */}
      {!isPro && (
        <div className="mt-32 p-1 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-emerald-500/20 rounded-[4rem]">
          <div className="p-12 bg-white rounded-[3.8rem] flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-xl text-center lg:text-left">
              <h4 className="font-black text-4xl uppercase tracking-tighter text-slate-900 mb-4">
                Unlock the <span className="text-purple-600">Executive</span> Advantage
              </h4>
              <p className="text-slate-500 font-medium leading-relaxed">
                Get unlimited AI refinements, premium templates, and advanced ATS multi-role matching.
              </p>
            </div>
            <Button className="h-16 px-10 rounded-[2rem] bg-slate-900 text-white font-black uppercase text-[10px] tracking-widest hover:bg-purple-600 transition-all shadow-2xl">
              Access Executive Tier <ChevronRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;