import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Layout, Columns, Rows, CheckCircle2, Sparkles } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { motion } from "framer-motion";

const templates = [
  {
    id: 'modern',
    name: 'Modern Classic',
    description: 'A clean, standard look that works for every industry.',
    icon: <Rows className="w-6 h-6" />,
  },
  {
    id: 'professional',
    name: 'Executive Edge',
    description: 'A polished two-column style to highlight key expertise.',
    icon: <Columns className="w-6 h-6" />,
  }
];

function TemplatePicker() {
  const dispatch = useDispatch();
  const resumeInfo = useSelector((state) => state.editResume.resumeData);
  const currentTemplate = resumeInfo?.templateId || 'modern';

  const handleTemplateSelect = (id) => {
    dispatch(addResumeData({
      ...resumeInfo,
      templateId: id
    }));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex gap-2 rounded-2xl border-purple-100 text-purple-600 font-bold hover:bg-purple-50 h-11 px-6 shadow-sm transition-all active:scale-95">
          <Layout className="w-4 h-4" /> Change Style
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-2xl bg-white rounded-[2.5rem] p-10 border-none shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)]">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <DialogTitle className="text-2xl font-black uppercase tracking-tighter text-slate-900">
              Select Your <span className="text-purple-600">Style</span>
            </DialogTitle>
          </div>
          <p className="text-slate-500 text-xs font-medium uppercase tracking-widest">
            Choose the best visual path for your career journey
          </p>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {templates.map((template) => (
            <motion.div 
              key={template.id}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleTemplateSelect(template.id)}
              className={`p-6 rounded-[2rem] border-2 cursor-pointer transition-all relative overflow-hidden flex flex-col items-center text-center ${
                currentTemplate === template.id 
                ? 'border-purple-600 bg-purple-50/30' 
                : 'border-slate-50 bg-slate-50/50 hover:border-purple-200 hover:bg-white'
              }`}
            >
              {currentTemplate === template.id && (
                <div className="absolute top-4 right-4 bg-purple-600 rounded-full p-1 shadow-lg shadow-purple-200">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
              )}
              
              <div className={`p-5 rounded-2xl mb-5 transition-all shadow-sm ${
                currentTemplate === template.id 
                ? 'bg-purple-600 text-white' 
                : 'bg-white text-slate-400 group-hover:text-purple-600'
              }`}>
                {template.icon}
              </div>
              
              <h3 className={`font-black uppercase text-sm tracking-tight ${
                currentTemplate === template.id ? 'text-purple-900' : 'text-slate-900'
              }`}>
                {template.name}
              </h3>
              <p className="text-xs font-medium text-slate-500 mt-2 leading-relaxed">
                {template.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex justify-end">
           <Button 
             className="rounded-2xl px-10 h-12 bg-slate-900 text-white font-bold uppercase text-xs tracking-widest shadow-xl shadow-slate-200 hover:bg-purple-600 transition-all"
             onClick={() => document.querySelector('[data-radix-collection-item]')?.click()}
           >
             Confirm Selection
           </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default TemplatePicker;