import React from 'react';
import Header from '@/components/custom/Header';
import Hero from './Hero';
import { Features } from './Features';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Sparkles, 
  Briefcase, 
  CheckCircle2, 
  Users, 
  Zap, 
  Star 
} from "lucide-react";
import { useNavigate } from 'react-router-dom';

function Homepage() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#F8FAFC] min-h-screen font-sans selection:bg-purple-100">
      <Header />
      <main>
        <Hero />

        {/* --- 1. HOW IT WORKS SECTION --- */}
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
                  <div className="relative z-10">
                    <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-2">{item.title}</h4>
                    <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Features />

        {/* --- 2. TESTIMONIALS SECTION --- */}
        <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
             <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-purple-500 blur-[120px] rounded-full" />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
              <div className="text-center md:text-left">
                <h2 className="text-4xl font-black uppercase tracking-tighter italic">Trusted by the <br/><span className="text-purple-400 text-6xl">Best.</span></h2>
              </div>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-5 h-5 fill-purple-400 text-purple-400" />)}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-sm">
                <p className="text-xl font-medium leading-relaxed italic text-slate-300">
                  "This platform changed my job search. I went from zero responses to three interviews in one week. The AI suggestions are actually smart."
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500" />
                  <div>
                    <h5 className="font-bold uppercase tracking-widest text-xs">Sarah Jenkins</h5>
                    <p className="text-[10px] text-slate-500 uppercase">Marketing Director</p>
                  </div>
                </div>
              </div>

              <div className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-sm">
                <p className="text-xl font-medium leading-relaxed italic text-slate-300">
                  "Clean, fast, and professional. I love how I can switch templates instantly. It's the only resume builder I'll ever use."
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-500 to-emerald-500" />
                  <div>
                    <h5 className="font-bold uppercase tracking-widest text-xs">David Chen</h5>
                    <p className="text-[10px] text-slate-500 uppercase">Software Engineer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- 3. PRICING / TIERS SECTION --- */}
        <section className="py-32 bg-[#F8FAFC]">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="text-center mb-16">
              <h3 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">Simple <span className="text-purple-600">Pricing</span></h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Basic Tier */}
              <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-6">Standard</h4>
                  <div className="text-5xl font-black text-slate-900 mb-8">$0<span className="text-sm text-slate-400">/mo</span></div>
                  <ul className="space-y-4 mb-10">
                    {["3 Resume Builds", "Basic AI Editing", "Standard Templates"].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm font-medium text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button variant="outline" className="w-full h-14 rounded-2xl font-bold uppercase tracking-widest text-[10px]">Get Started</Button>
              </div>

              {/* Pro Tier */}
              <div className="bg-slate-900 p-10 rounded-[3rem] border border-purple-500/30 shadow-2xl shadow-purple-500/10 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-purple-600 px-4 py-1 text-[8px] font-black uppercase text-white tracking-widest rounded-bl-xl">Popular</div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-[0.3em] text-purple-400 mb-6">Executive</h4>
                  <div className="text-5xl font-black text-white mb-8">$12<span className="text-sm text-slate-500">/mo</span></div>
                  <ul className="space-y-4 mb-10">
                    {["Unlimited Builds", "Advanced AI Suggestions", "Executive Templates", "Priority Support"].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm font-medium text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-purple-500" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button className="w-full h-14 rounded-2xl bg-purple-600 text-white hover:bg-purple-500 font-bold uppercase tracking-widest text-[10px]">Go Pro</Button>
              </div>
            </div>
          </div>
        </section>

        {/* --- FINAL CTA SECTION --- */}
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