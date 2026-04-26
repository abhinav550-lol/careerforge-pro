import React from 'react';
import { motion } from "framer-motion";
import {
        Sparkles,
        ShieldCheck,
        Layout,
        Cpu,
        Zap
} from "lucide-react"

const features = [
  {
    title: "Gemini 3 Analysis",
    desc: "Real-time JD matching with 98% ATS accuracy.",
    className: "md:col-span-2 md:row-span-2 bg-purple-600 text-white",
    icon: <Sparkles className="w-8 h-8" />
  },
  {
    title: "PDF Engine",
    desc: "Lightning fast exports via Puppeteer.",
    className: "bg-white border border-slate-100",
    icon: <ShieldCheck className="w-6 h-6 text-purple-600" />
  },
  {
    title: "Multi-Template",
    desc: "Switch between modern and executive styles.",
    className: "bg-white border border-slate-100",
    icon: <Layout className="w-6 h-6 text-blue-600" />
  }
];

export function Features() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[200px]">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className={`p-8 rounded-3xl flex flex-col justify-end shadow-sm ${f.className}`}
            >
              <div className="mb-4">{f.icon}</div>
              <h3 className="text-xl font-bold">{f.title}</h3>
              <p className="text-sm opacity-80 mt-1">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}