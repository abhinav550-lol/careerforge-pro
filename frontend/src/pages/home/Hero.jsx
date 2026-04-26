import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
  const [index, setIndex] = useState(0);
  const words = ["Future.", "Career.", "Success.", "Growth."];

  // Typing effect logic
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#F8FAFC]">
      
      {/* 1. ANIMATED BLURRY GRADIENT BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-200/40 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            x: [0, -40, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-[5%] right-[-5%] w-[40%] h-[40%] bg-indigo-200/30 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
          className="absolute top-[20%] right-[15%] w-[25%] h-[25%] bg-blue-100/30 rounded-full blur-[80px]"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        {/* 2. STATUS BADGE */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-md border border-white/50 shadow-sm mb-10"
        >
          <span className="flex h-2 w-2 rounded-full bg-purple-600 animate-pulse" />
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
            Empowered by Advanced Intelligence
          </span>
        </motion.div>

        {/* 3. TYPING EFFECT HEADING */}
        <div className="min-h-[220px] md:min-h-[300px]">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter uppercase"
          >
            Build Your <br />
            <div className="relative inline-block mt-2">
              <AnimatePresence mode="wait">
                <motion.span
                  key={words[index]}
                  initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                  transition={{ duration: 0.5, ease: "circOut" }}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 inline-block"
                >
                  {words[index]}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.h1>
        </div>

        {/* 4. SUBTEXT */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-4 text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed"
        >
          Create expert-grade resumes in seconds. CareerForge uses smart technology to highlight your unique strengths and land your dream role in any industry.
        </motion.p>

        {/* 5. ACTION CONTROLS */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 flex flex-col sm:flex-row gap-5 justify-center items-center"
        >
          <Link to="/auth/sign-in" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto rounded-[1.5rem] bg-slate-900 text-white px-12 h-16 text-xs font-black uppercase tracking-widest shadow-2xl shadow-slate-200 hover:bg-purple-600 hover:scale-105 active:scale-95 transition-all flex gap-3">
              Get Started Now <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          
          <Button variant="outline" className="w-full sm:w-auto rounded-[1.5rem] px-12 h-16 text-xs font-black uppercase tracking-widest border-white bg-white/50 backdrop-blur-md shadow-sm hover:bg-white transition-all flex gap-3">
            <Briefcase className="w-4 h-4 text-purple-600" /> Explore Templates
          </Button>
        </motion.div>

        {/* 6. TRUST FOOTER */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-24 pt-10 border-t border-slate-200/50 flex items-center justify-center gap-8 grayscale opacity-50"
        >
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
            Trusted by Professionals Worldwide
          </p>
        </motion.div>
      </div>
    </div>
  );
}