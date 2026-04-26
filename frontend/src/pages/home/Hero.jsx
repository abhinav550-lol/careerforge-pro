import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import { Link, } from "react-router-dom";

export default function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-50">
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-200/50 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-blue-200/40 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm mb-8"
        >
          <span className="flex h-2 w-2 rounded-full bg-purple-600 animate-pulse" />
          <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Now Powered by Gemini 3 Flash</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-6xl md:text-8xl font-black text-slate-900 leading-tight tracking-tighter"
        >
          Architect Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Future.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-lg text-slate-500 max-w-2xl mx-auto font-medium"
        >
          CareerForge Pro uses advanced AI to analyze job descriptions and forge pixel-perfect resumes in seconds. Built for the modern developer.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-10 flex flex-col md:flex-row gap-4 justify-center"
        >
          <Link to="/auth/sign-in"><Button size="lg" className="rounded-2xl bg-slate-900 text-white px-8 h-14 text-lg font-bold shadow-2xl hover:scale-105 transition-transform">
            Start Forging <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          </Link>
          <Button size="lg" variant="outline" className="rounded-2xl px-8 h-14 text-lg font-bold border-slate-200 bg-white shadow-sm">
            Watch Demo
          </Button>
        </motion.div>
      </div>
    </div>
  );
}