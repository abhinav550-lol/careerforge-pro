// pages/Homepage.jsx
import React from 'react';
import Header from '@/components/custom/Header';
import Hero from './Hero';
import { Features } from './Features';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Star } from "lucide-react";
import { useNavigate } from 'react-router-dom';

function Homepage() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#F8FAFC] min-h-screen selection:bg-purple-100">
      <Header />
      <main>
        <Hero />

        {/* --- HOW IT WORKS --- */}
        <section className="py-24 bg-white border-y border-slate-100">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-600 mb-4">The Process</h2>
              <h3 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">Your Path to <span className="text-purple-600">Success</span></h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { step: "01", title: "Input Details", desc: "Share your experience and the role you're targeting." },
                { step: "02", title: "AI Refinement", desc: "Our intelligence engine polishes every bullet point for impact." },
                { step: "03", title: "Deploy Resume", desc: "Download your professional PDF and start applying." }
              ].map((item, i) => (
                <div key={i} className="relative group">
                  <div className="text-6xl font-black text-slate-100 absolute -top-8 -left-4 group-hover:text-purple-50 transition-colors">{item.step}</div>
                  <h4 className="relative z-10 text-xl font-black text-slate-900 uppercase tracking-tight mb-2">{item.title}</h4>
                  <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Features />

        {/* --- FINAL CTA --- */}
        <section className="py-24 pb-32">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase mb-10">Ready to <span className="text-purple-600">Win?</span></h2>
            <Button 
              onClick={() => navigate('/dashboard')}
              className="rounded-[2rem] bg-slate-900 text-white px-12 h-20 text-xs font-black uppercase tracking-[0.3em] hover:bg-purple-600 transition-all shadow-2xl"
            >
              Access Your Hub <ArrowRight className="ml-3 w-5 h-5" />
            </Button>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-slate-100 bg-white">
        <div className="container mx-auto px-6 text-center text-slate-400 text-[10px] font-black uppercase tracking-widest">
           © 2026 CareerForge • Crafted for Excellence
        </div>
      </footer>
    </div>
  );
}

export default Homepage;