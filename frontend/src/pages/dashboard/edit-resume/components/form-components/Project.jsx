import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Loader2, 
  Plus, 
  Trash2, 
  Briefcase, 
  Link as LinkIcon, 
  Sparkles,
  Zap,
  Save
} from "lucide-react";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const initialState = {
  projectName: '',
  technologies: '',
  link: '',
  description: ''
};

function Project({ resumeInfo }) {
  const [projectList, setProjectList] = useState([initialState]);
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const dispatch = useDispatch();

  // Initialize and Sync with Redux
  useEffect(() => {
    if (resumeInfo?.projects?.length > 0) {
      setProjectList(resumeInfo.projects);
    }
  }, [resumeInfo]);

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const newEntries = [...projectList];
    newEntries[index] = { ...newEntries[index], [name]: value };
    setProjectList(newEntries);
    
    // LIVE SYNC: Dispatch to Redux immediately for real-time visualization
    dispatch(addResumeData({
      ...resumeInfo,
      projects: newEntries
    }));
  };

  const handleGenerateAI = async (index) => {
    const name = projectList[index]?.projectName;
    if (!name) return toast.error("Please enter a Project Name first!");

    setAiLoading(true);
    try {
      const baseUrl = (import.meta.env.VITE_APP_URL || "http://localhost:5001").replace(/\/+$/, "");
      const response = await axios.post(`${baseUrl}/api/ai/generate-content`, {
        prompt: `Generate 3 high-impact achievement bullet points for a project titled "${name}". Focus on measurable results and specific professional contributions.`,
        type: 'experience'
      });

      const aiContent = response.data.content;
      const newEntries = [...projectList];
      newEntries[index] = { ...newEntries[index], description: aiContent };
      
      setProjectList(newEntries);
      dispatch(addResumeData({ ...resumeInfo, projects: newEntries }));
      toast.success("AI has refined your project impact!");
    } catch (error) {
      toast.error("AI service is currently busy.");
    } finally {
      setAiLoading(false);
    }
  };

  const addNewProject = () => {
    const newList = [...projectList, { ...initialState }];
    setProjectList(newList);
    dispatch(addResumeData({ ...resumeInfo, projects: newList }));
  };

  const removeProject = (index) => {
    const newEntries = projectList.filter((_, i) => i !== index);
    setProjectList(newEntries);
    dispatch(addResumeData({ ...resumeInfo, projects: newEntries }));
  };

  const onSave = () => {
    setLoading(true);
    // Simulate API Sync
    setTimeout(() => {
      setLoading(false);
      toast.success("Project milestones synchronized!");
    }, 800);
  };

  return (
    <div className="p-4 md:p-8 bg-white rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 shadow-xl mt-10 relative">
      {/* 1. HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2.5 bg-purple-600 rounded-2xl shadow-lg shadow-purple-100 shrink-0">
          <Briefcase className="text-white w-5 h-5 md:w-6 md:h-6" />
        </div>
        <div>
          <h2 className="font-black text-xl md:text-2xl text-slate-900 uppercase tracking-tighter leading-none">
            Key <span className="text-purple-600">Showcase</span>
          </h2>
          <p className="hidden md:block text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mt-1.5 opacity-60">
            Highlight your best work, campaigns, or initiatives
          </p>
        </div>
      </div>

      {/* 2. PROJECT LIST */}
      <div className="space-y-6">
        <AnimatePresence>
          {projectList.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, x: -10 }}
              className="p-6 md:p-8 rounded-[2rem] bg-slate-50/50 border border-slate-100 relative group hover:bg-white hover:border-purple-200 transition-all"
            >
              {projectList.length > 1 && (
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="absolute top-3 right-3 md:top-4 md:right-4 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                  onClick={() => removeProject(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">Project or Initiative Name</label>
                  <Input 
                    name="projectName" 
                    value={item.projectName || ''}
                    placeholder="Ex: Community Outreach Program"
                    onChange={(e) => handleChange(index, e)}
                    className="h-11 md:h-12 rounded-xl border-slate-100 bg-white focus:ring-8 focus:ring-purple-600/5 transition-all font-bold text-slate-700"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">Evidence / Portfolio Link</label>
                  <div className="relative">
                    <Input 
                      name="link" 
                      value={item.link || ''}
                      placeholder="https://portfolio.com/project"
                      onChange={(e) => handleChange(index, e)}
                      className="h-11 md:h-12 rounded-xl border-slate-100 bg-white pl-10 focus:ring-8 focus:ring-purple-600/5 transition-all text-xs"
                    />
                    <LinkIcon className="absolute left-3.5 top-3.5 md:top-4 w-4 h-4 text-slate-300" />
                  </div>
                </div>

                <div className="col-span-full space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">Core Skills & Tools Applied</label>
                  <div className="relative">
                    <Input 
                      name="technologies" 
                      value={item.technologies || ''}
                      placeholder="Ex: Strategic Planning, Team Leadership, Budget Management"
                      onChange={(e) => handleChange(index, e)}
                      className="h-11 md:h-12 rounded-xl border-slate-100 bg-white pl-10 focus:ring-8 focus:ring-purple-600/5 transition-all text-purple-600 font-bold"
                    />
                    <Zap className="absolute left-3.5 top-3.5 md:top-4 w-4 h-4 text-purple-400" />
                  </div>
                </div>

                <div className="col-span-full space-y-2">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Impact & Role</label>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleGenerateAI(index)}
                      disabled={aiLoading}
                      className="text-purple-600 font-bold hover:bg-purple-50 flex gap-2 rounded-lg h-7 px-2"
                    >
                      {aiLoading ? <Loader2 className="animate-spin w-3 h-3" /> : <Sparkles className="w-3 h-3" />}
                      <span className="text-[9px] uppercase tracking-tighter">AI Refine</span>
                    </Button>
                  </div>
                  <Textarea 
                    name="description" 
                    value={item.description || ''}
                    placeholder="Briefly describe the goal and the measurable impact you achieved..."
                    onChange={(e) => handleChange(index, e)}
                    className="rounded-2xl border-slate-100 bg-white min-h-[100px] p-4 focus:ring-8 focus:ring-purple-600/5 transition-all text-sm leading-relaxed"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* 3. FOOTER CONTROLS - RESPONSIVE */}
      <div className="mt-8 pt-6 border-t border-slate-50 flex flex-col sm:flex-row justify-between items-center gap-4">
        <Button 
          variant="outline" 
          onClick={addNewProject}
          className="w-full sm:w-auto h-12 rounded-2xl border-slate-100 bg-white text-slate-500 hover:bg-slate-50 font-bold px-8 flex items-center gap-2 text-xs"
        >
          <Plus className="w-4 h-4" /> Add Showcase
        </Button>

        <Button 
          disabled={loading} 
          onClick={onSave}
          className="w-full sm:w-auto h-14 rounded-2xl bg-slate-900 hover:bg-purple-600 text-white px-12 font-black uppercase text-[10px] tracking-[0.2em] shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3"
        >
          {loading ? <Loader2 className="animate-spin w-5 h-5" /> : (
            <>
              <Save className="w-4 h-4" />
              Save
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

export default Project;