import React from 'react';
import { motion } from "framer-motion";
import {
  Sparkles,
  ShieldCheck,
  Layout,
  Zap,
  Target,
  FileCheck
} from "lucide-react"

const features = [
  {
    title: "Intelligence-First Analysis",
    desc: "Real-time industry matching with 98% compatibility accuracy across all professional fields.",
    className: "md:col-span-2 md:row-span-2 bg-slate-900 text-white overflow-hidden relative group",
    icon: <Sparkles className="w-10 h-10 text-purple-400" />,
    accent: <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/20 blur-[100px] rounded-full -mr-20 -mt-20 group-hover:bg-purple-600/30 transition-all duration-700" />
  },
  {
    title: "Expert Readiness",
    desc: "Instant professional formatting optimized for modern hiring systems.",
    className: "bg-white border border-slate-100 shadow-sm hover:border-purple-200 transition-all",
    icon: <FileCheck className="w-8 h-8 text-purple-600" />
  },
  {
    title: "Dynamic Styles",
    desc: "Seamlessly switch between various professional templates with one click.",
    className: "bg-white border border-slate-100 shadow-sm hover:border-purple-200 transition-all",
    icon: <Layout className="w-8 h-8 text-blue-600" />
  },
  {
    title: "Smart Suggestions",
    desc: "Receive tailored achievement points based on your specific job history.",
    className: "md:col-span-1 bg-purple-50 border border-purple-100 hover:bg-purple-100 transition-all",
    icon: <Target className="w-8 h-8 text-purple-700" />
  }
];

export function Features() {
  return (
    <section className="py-32 bg-[#F8FAFC]">
      <div className="container mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-16 text-center md:text-left">
          <h2 className="text-sm font-black uppercase tracking-[0.3em] text-purple-600 mb-4">
            Advanced Capabilities
          </h2>
          <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">
            Built for Your <span className="text-purple-600">Success.</span>
          </h3>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[220px]">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className={`p-10 rounded-[2.5rem] flex flex-col justify-end relative overflow-hidden group ${f.className}`}
            >
              {f.accent}
              
              <div className="relative z-10">
                <div className="mb-6 p-3 bg-white/10 w-fit rounded-2xl backdrop-blur-sm group-hover:scale-110 transition-transform duration-500 shadow-sm border border-white/5">
                  {f.icon}
                </div>
                <h3 className="text-2xl font-black tracking-tight uppercase leading-none mb-3">
                  {f.title}
                </h3>
                <p className="text-sm font-medium opacity-70 leading-relaxed max-w-[280px]">
                  {f.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}