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
  Zap
} from "lucide-react";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const initialState = {
  projectName: '',
  technologies: '',
  link: '',
  description: ''
};

function Project({ resumeInfo }) {
  const [projectList, setProjectList] = useState([initialState]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (resumeInfo?.projects?.length > 0) {
      setProjectList(JSON.parse(JSON.stringify(resumeInfo.projects)));
    }
  }, []);

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const newEntries = [...projectList];
    newEntries[index] = { ...newEntries[index], [name]: value };
    setProjectList(newEntries);
    
    dispatch(addResumeData({
      ...resumeInfo,
      projects: newEntries
    }));
  };

  const addNewProject = () => {
    setProjectList([...projectList, { ...initialState }]);
  };

  const removeProject = (index) => {
    const newEntries = projectList.filter((_, i) => i !== index);
    setProjectList(newEntries);
    dispatch(addResumeData({
      ...resumeInfo,
      projects: newEntries
    }));
  };

  const onSave = () => {
    setLoading(true);
    // Simulate Sync
    setTimeout(() => {
      setLoading(false);
      toast.success("Project milestones updated!");
    }, 800);
  };

  return (
    <div className="p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-xl mt-10 relative overflow-hidden">
      {/* 1. HEADER - Uses Purple */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-600 rounded-xl">
            <Briefcase className="text-white w-5 h-5" />
          </div>
          <div>
            <h2 className="font-black text-2xl text-slate-900 uppercase tracking-tighter">
              Key <span className="text-purple-600">Showcase</span>
            </h2>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">
              Highlight your best work, campaigns, or initiatives
            </p>
          </div>
        </div>
      </div>

      {/* 2. PROJECT LIST */}
      <div className="space-y-8">
        <AnimatePresence>
          {projectList.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="p-8 rounded-[2rem] bg-slate-50/50 border border-slate-100 relative group transition-all hover:bg-white hover:border-purple-200"
            >
              {projectList.length > 1 && (
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="absolute top-4 right-4 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                  onClick={() => removeProject(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Project Name */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Project or Initiative Name</label>
                  <Input 
                    name="projectName" 
                    value={item.projectName || ''}
                    placeholder="Ex: Community Outreach Program"
                    onChange={(e) => handleChange(index, e)}
                    className="h-12 rounded-xl border-slate-100 bg-white focus:ring-8 focus:ring-purple-600/5 focus:border-purple-600/20 transition-all font-bold"
                  />
                </div>
                
                {/* Link */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Evidence / Portfolio Link</label>
                  <div className="relative">
                    <Input 
                    name="link" 
                      value={item.link || ''}
                      placeholder="https://yourportfolio.com/project"
                      onChange={(e) => handleChange(index, e)}
                      className="h-12 rounded-xl border-slate-100 bg-white pl-10 focus:ring-8 focus:ring-purple-600/5 focus:border-purple-600/20 transition-all"
                    />
                    <LinkIcon className="absolute left-3.5 top-4 w-4 h-4 text-slate-300" />
                  </div>
                </div>

                {/* Skills/Tools Used */}
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Core Skills & Tools Applied</label>
                  <div className="relative">
                    <Input 
                      name="technologies" 
                      value={item.technologies || ''}
                      placeholder="Ex: Strategic Planning, Team Leadership, Event Management"
                      onChange={(e) => handleChange(index, e)}
                      className="h-12 rounded-xl border-slate-100 bg-white pl-10 focus:ring-8 focus:ring-purple-600/5 focus:border-purple-600/20 transition-all text-purple-600 font-medium"
                    />
                    <Zap className="absolute left-3.5 top-4 w-4 h-4 text-purple-400" />
                  </div>
                </div>

                {/* Description */}
                <div className="md:col-span-2 space-y-2">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Project Impact & Role</label>
                    <button className="flex items-center gap-1 text-[10px] font-bold text-purple-600 hover:text-purple-800 transition-colors">
                      <Sparkles className="w-3 h-3" /> Let AI improve description
                    </button>
                  </div>
                  <Textarea 
                    name="description" 
                    value={item.description || ''}
                    placeholder="Briefly describe the goal and the measurable impact you achieved..."
                    onChange={(e) => handleChange(index, e)}
                    className="rounded-2xl border-slate-100 bg-white min-h-[100px] p-4 focus:ring-8 focus:ring-purple-600/5 focus:border-purple-600/20 transition-all leading-relaxed"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* 3. FOOTER CONTROLS */}
      <div className="mt-12 pt-8 border-t border-slate-50 flex flex-col sm:flex-row justify-between items-center gap-6">
        <Button 
          variant="outline" 
          onClick={addNewProject}
          className="w-full sm:w-auto h-12 rounded-2xl border-slate-200 font-bold text-slate-600 hover:bg-slate-50 px-8"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Project
        </Button>

        <Button 
          disabled={loading} 
          onClick={onSave}
          className="w-full sm:w-auto h-14 rounded-2xl bg-slate-900 hover:bg-purple-600 text-white px-12 font-black uppercase text-xs tracking-[0.2em] shadow-xl shadow-slate-200 transition-all active:scale-95 flex items-center gap-3"
        >
          {loading ? <Loader2 className="animate-spin w-4 h-4" /> : (
            <>
              <Zap className="w-4 h-4 text-purple-400" />
              Save Progress
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

export default Project;