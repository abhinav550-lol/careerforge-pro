import React from 'react';
import { useSelector } from 'react-redux';
import ModernTemplate from './templates/ModernTemplate';
import ProfessionalTemplate from './templates/ProfessionalTemplate';
import { motion } from 'framer-motion';
import { ShieldCheck, Sparkles, Printer } from 'lucide-react';

function PreviewPage() {
  const resumeInfo = useSelector((state) => state.editResume.resumeData);
  const selectedTemplate = resumeInfo?.templateId || 'modern'; 

  return (
    <div className="relative min-h-screen bg-slate-100/50 p-4 md:p-10 flex flex-col items-center">
      
      {/* 1. NON-PRINTING AI STATUS BADGE */}
      <div id="noPrint" className="fixed top-28 right-8 z-50 hidden xl:block">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/80 backdrop-blur-xl p-5 rounded-[2rem] border border-slate-200 shadow-2xl flex flex-col items-center gap-3"
        >
          <div className="relative flex items-center justify-center">
            <svg className="w-16 h-16 transform -rotate-90">
              <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-slate-100" />
              <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" 
                strokeDasharray="175" strokeDashoffset="25" className="text-purple-600" strokeLinecap="round" />
            </svg>
            <span className="absolute font-black text-sm text-slate-900">85%</span>
          </div>
          <div className="text-center">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">ATS Rating</p>
            <div className="flex items-center gap-1 mt-1 justify-center text-purple-600">
              <Sparkles className="w-3 h-3" />
              <span className="text-[10px] font-bold uppercase">AI Optimized</span>
            </div>
          </div>
          
          <div className="h-[1px] w-full bg-slate-100 my-2" />
          
          <button 
            onClick={() => window.print()}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-purple-600 transition-colors"
          >
            <Printer className="w-4 h-4" /> Quick Print
          </button>
        </motion.div>
      </div>

      {/* 2. THE RESUME CANVAS (Studio View) */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        id="pdf-content"
        className="w-full max-w-[210mm] bg-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border border-slate-200 origin-top mb-20"
        style={{ minHeight: '297mm' }} // Forces A4 aspect ratio
      >
        <div className="preview-container h-full">
          {selectedTemplate === 'modern' ? (
            <ModernTemplate resumeInfo={resumeInfo} />
          ) : (
            <ProfessionalTemplate resumeInfo={resumeInfo} />
          )}
        </div>
      </motion.div>

      {/* 3. MOBILE/TABLET DOWNLOAD CTA */}
      <div id="noPrint" className="fixed bottom-8 left-1/2 -translate-x-1/2 xl:hidden">
         <button 
           onClick={() => window.print()}
           className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-2xl flex items-center gap-3 active:scale-95 transition-all"
         >
           <Printer className="w-4 h-4" /> Export PDF
         </button>
      </div>
    </div>
  );
}

export default PreviewPage;