import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllResumeData } from "@/Services/resumeAPI";
import AddResume from "./components/AddResume";
import ResumeCard from "./components/ResumeCard";
import { FaRocket, FaCrown, FaMagic } from "react-icons/fa";
import { motion } from "framer-motion";

function Dashboard() {
  const user = useSelector((state) => state.editUser.userData);
  const [resumeList, setResumeList] = useState([]);
  const [isPro, setIsPro] = useState(false); // For SaaS tier management 

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
      // Check for Pro status from user metadata as per SaaS roadmap 
      setIsPro(user.subscriptionStatus === "pro");
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-slate-50 p-8 md:px-20 lg:px-32">
      {/* SaaS Welcome Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4"
      >
        <div>
          <h2 className="font-black text-3xl text-slate-900 flex items-center gap-2">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-purple-600">Forge</span> Projects
          </h2>
          <p className="text-slate-500 font-medium">
            Architecting ATS-Proof resumes with Squadron Omega AI [cite: 4, 71]
          </p>
        </div>

        {/* SaaS Tier Badge  */}
        <div className={`flex items-center gap-2 px-4 py-2 rounded-full border shadow-sm ${
          isPro ? "bg-purple-50 border-purple-200 text-purple-700" : "bg-white border-slate-200 text-slate-600"
        }`}>
          {isPro ? <FaCrown /> : <FaRocket className="text-green-500" />}
          <span className="text-sm font-bold uppercase tracking-wider">
            {isPro ? "Pro Member" : "Free Plan"}
          </span>
        </div>
      </motion.div>

      {/* Actionable Intelligence Stats Section  */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-slate-400 text-sm font-bold uppercase mb-1">Total Resumes</div>
          <div className="text-3xl font-black text-slate-900">{resumeList.length}</div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-slate-400 text-sm font-bold uppercase mb-1">AI Credits</div>
          <div className="text-3xl font-black text-green-500">{isPro ? "Unlimited" : "3 Left"}</div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-slate-400 text-sm font-bold uppercase mb-1">Status</div>
            <div className="text-xl font-bold text-slate-900">System Ready</div>
          </div>
          <FaMagic className="text-purple-500 text-2xl animate-pulse" />
        </div>
      </div>

      {/* Resume Grid - The Project Management Dashboard  */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* SaaS Tier Gating Note [cite: 77, 84] */}
      {!isPro && resumeList.length >= 1 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-12 p-6 bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl text-white flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div>
            <h4 className="font-bold text-lg">Unlock CarrierForge Pro [cite: 68]</h4>
            <p className="text-slate-400 text-sm">Get unlimited AI rewrites, premium templates, and ATS keyword extraction.</p>
          </div>
          <button className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded-xl font-bold transition-all transform active:scale-95">
            Upgrade Now
          </button>
        </motion.div>
      )}
    </div>
  );
}

export default Dashboard;