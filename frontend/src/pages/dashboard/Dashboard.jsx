import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"; 
import { getAllResumeData } from "@/Services/resumeAPI";
import AddResume from "./components/AddResume";
import ResumeCard from "./components/ResumeCard";
import OptimizeModal from "./components/OptimizeModel";
import PricingTable from "./components/PricingTable"; 
import { 
  Crown, LayoutGrid, ShieldCheck, 
  Box, Sparkles, FileText, Rocket, FileUp
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";

function Dashboard() {
  const user = useSelector((state) => state.editUser.userData);
  const [resumeList, setResumeList] = useState([]);
  const [showOptimizeModal, setShowOptimizeModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const rawUrl = import.meta.env.VITE_APP_URL || "http://localhost:5001";
  const baseUrl = rawUrl.replace(/\/+$/, "");

  const fetchAllResumeData = async () => {
    try {
      setIsLoading(true);
      const response = await getAllResumeData();
      const extractedData = response?.data || [];
      setResumeList(Array.isArray(extractedData) ? extractedData : []);
    } catch (error) {
      toast.error("Failed to sync your repository.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchAllResumeData();
  }, [user]);

  const isPro = user?.subscriptionStatus === "pro";
  const aiCredits = user?.aiCredits ?? 0;

  const avgAtsScore = useMemo(() => {
    if (!resumeList.length) return "0%";
    const total = resumeList.reduce((acc, curr) => acc + (curr.atsScore || 0), 0);
    return `${Math.round(total / resumeList.length)}%`;
  }, [resumeList]);

  const handleUpgrade = async () => {
    try {
      const response = await axios.post(`${baseUrl}/api/payments/create-checkout`, {}, { withCredentials: true });
      if (response.data?.data?.url) {
        window.location.href = response.data.data.url;
      }
    } catch (error) {
      toast.error("Billing portal is temporarily unavailable.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 md:p-12 lg:px-32 selection:bg-purple-100/30 text-slate-900">
      
      {/* 1. HEADER SECTION */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
        <div className="space-y-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="px-4 py-2 bg-slate-900 rounded-full flex items-center gap-2.5 shadow-xl shadow-slate-200">
               <div className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
               <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white"> Active</span>
            </div>
          </div>
          <h2 className="font-black text-5xl md:text-6xl text-slate-900 tracking-tighter uppercase leading-[0.8] mb-4">
            Success <span className="text-purple-600">Hub</span>
          </h2>
        </div>

        <motion.div 
          whileHover={{ y: -2 }}
          onClick={!isPro ? handleUpgrade : null}
          className={`group flex items-center gap-4 px-6 py-4 rounded-[2.5rem] border-2 transition-all cursor-pointer ${
            isPro ? "bg-slate-900 border-slate-800 text-white shadow-2xl" : "bg-white border-slate-100 text-slate-600 shadow-sm hover:border-purple-200"
          }`}
        >
          <div className={`p-3 rounded-2xl ${isPro ? "bg-purple-600" : "bg-slate-50"}`}>
            {isPro ? <Crown className="w-5 h-5 text-white" /> : <Rocket className="w-5 h-5 text-purple-600" />}
          </div>
          <div className="flex flex-col min-w-[120px]">
            <span className="text-[9px] font-black uppercase tracking-widest opacity-50 mb-0.5">
              {isPro ? "Executive Tier" : "Limited Access"}
            </span>
            <span className="text-xs font-black uppercase tracking-[0.1em]">
              {isPro ? "Pro Member" : `${aiCredits} Credits`}
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* 2. ANALYTICS BENTO GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {[
          { label: "Active Profiles", value: isLoading ? "..." : resumeList.length, icon: <LayoutGrid />, color: "text-blue-600" },
          { label: "AI Smart Credits", value: isPro ? "∞" : aiCredits, icon: <Sparkles />, color: "text-purple-600" },
          { label: "Average Readiness", value: isLoading ? "..." : avgAtsScore, icon: <ShieldCheck />, color: "text-emerald-600" }
        ].map((stat, i) => (
          <motion.div key={i} className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm group hover:border-purple-600/20 transition-all">
            <div className="flex justify-between items-start">
              <div className="space-y-4">
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 group-hover:text-purple-500 transition-colors">{stat.label}</p>
                <h3 className={`text-5xl font-black tracking-tighter ${stat.color} leading-none`}>{stat.value}</h3>
              </div>
              <div className="p-5 bg-slate-50 rounded-2xl text-slate-400 group-hover:text-purple-600 transition-all">{stat.icon}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 3. PRIMARY ACTION ROW (PERFECT ALIGNMENT) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 items-stretch">
        <AddResume /> 

        {/* Optimize Existing Button */}
        <Button 
          onClick={() => setShowOptimizeModal(true)}
          className="h-20 sm:h-28 px-6 sm:px-8 rounded-2xl bg-slate-900 text-white hover:bg-purple-600 font-black uppercase text-[10px] tracking-widest flex gap-3 transition-all shadow-xl shadow-slate-200 group active:scale-95"
        >
          <FileUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-300" />
          Optimize Existing
        </Button>

        {/* Forge Cover Letter Button (SAME AS ABOVE) */}
        <Link to="/dashboard/cover-letter" className="flex-1">
          <Button 
            className="w-full h-20 sm:h-28 px-6 sm:px-8 rounded-2xl bg-slate-900 text-white hover:bg-purple-600 font-black uppercase text-[10px] tracking-widest flex gap-3 transition-all shadow-xl shadow-slate-200 group active:scale-95"
          >
            <FileText className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            Forge Cover Letter
          </Button>
        </Link>
      </div>

      {/* 4. REPOSITORY & PRICING */}
      <div className="relative">
        <div className="flex items-center gap-4 mb-12">
           <Box className="w-5 h-5 text-slate-300" />
           <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400">Your Forge Repository</h3>
           <div className="flex-1 h-[1px] bg-slate-100" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {resumeList.map((resume) => (
            <ResumeCard key={resume._id} resume={resume} refreshData={fetchAllResumeData} />
          ))}
        </div>
      </div>

      {!isPro && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-24">
          <PricingTable user={user} />
        </motion.div>
      )}

      <OptimizeModal open={showOptimizeModal} setOpen={setShowOptimizeModal} />
    </div>
  );
}

export default Dashboard;