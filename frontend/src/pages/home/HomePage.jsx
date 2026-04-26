import React from 'react';
import Header from '@/components/custom/Header';
import Hero from './Hero'; // We'll create this below
import { Features } from './Features'; // We'll create this below
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from 'react-router-dom';

function Homepage() {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-50 min-h-screen font-sans selection:bg-purple-100 selection:text-purple-900">
      <Header />
      
      <main>
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Trust / Social Proof (Optional) */}
        <div className="py-10 bg-white border-y border-slate-100">
          <div className="container mx-auto px-6 text-center">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-0">
              Built with Industry-Leading Tech
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 mt-6 opacity-50 grayscale hover:grayscale-0 transition-all">
               <span className="font-bold text-xl text-slate-800">MERN</span>
               <span className="font-bold text-xl text-slate-800">Google Gemini</span>
               <span className="font-bold text-xl text-slate-800">Puppeteer</span>
               <span className="font-bold text-xl text-slate-800">Tailwind</span>
            </div>
          </div>
        </div>

        {/* 3. Bento Features Section */}
        <Features />

        {/* 4. Final Call to Action */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden"
            >
              {/* Decorative Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/20 blur-[80px] rounded-full" />
              
              <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
                Ready to beat the <br /> 
                <span className="text-purple-400">ATS algorithms?</span>
              </h2>
              <p className="text-slate-400 mt-6 text-lg max-w-xl mx-auto font-medium">
                Join thousands of developers using CareerForge Pro to land their dream roles.
              </p>
              <Button 
                onClick={() => navigate('/dashboard')}
                size="lg" 
                className="mt-10 rounded-2xl bg-white text-slate-900 px-10 h-16 text-xl font-bold hover:bg-slate-100 hover:scale-105 transition-all"
              >
                Get Started Now <ArrowRight className="ml-2 w-6 h-6" />
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      {/* 5. Footer */}
      <footer className="py-12 border-t border-slate-200 bg-white">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Sparkles className="text-purple-600 w-5 h-5" />
            <span className="font-black text-xl tracking-tighter uppercase">CareerForge Pro</span>
          </div>
          <p className="text-slate-500 text-sm font-medium">
            © 2026 Developed by Pratik Suthar. Built for the Modern Web.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Homepage;