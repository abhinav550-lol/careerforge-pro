import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BrainCircuit, Loader2, Plus, Trash2, Briefcase, Sparkles, Save } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { motion, AnimatePresence } from "framer-motion";

const initialExperience = {
  title: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  workSummary: ""
};

function Experience({ resumeInfo }) {
  const [loading, setLoading] = useState(false);
  const [experienceList, setExperienceList] = useState([initialExperience]);
  const dispatch = useDispatch();

  // Sync with Redux on mount or when resumeInfo changes
  useEffect(() => {
    if (resumeInfo?.experience?.length > 0) {
      setExperienceList(resumeInfo.experience);
    }
  }, [resumeInfo]);

  const handleGenerateAI = async (index) => {
    const jobTitle = experienceList[index]?.title;
    if (!jobTitle) return toast.error("Enter a Job Title first!");

    setLoading(true);
    try {
      const rawUrl = import.meta.env.VITE_APP_URL || "http://localhost:5001";
      const baseUrl = rawUrl.replace(/\/+$/, "");

      const response = await axios.post(`${baseUrl}/api/ai/generate-content`, {
        prompt: `Generate 3 high-impact achievement bullet points for a ${jobTitle}. Focus on measurable success and professional growth.`,
        type: 'experience'
      });

      const aiContent = response.data.content;
      const newEntries = [...experienceList];
      newEntries[index] = { ...newEntries[index], workSummary: aiContent };
      
      setExperienceList(newEntries);
      // Immediate sync for Live Preview
      dispatch(addResumeData({ ...resumeInfo, experience: newEntries }));
      toast.success("AI Achievements Synchronized!");
    } catch (error) {
      toast.error("AI service is currently busy.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const newEntries = [...experienceList];
    newEntries[index] = { ...newEntries[index], [name]: value };
    setExperienceList(newEntries);
    
    // LIVE SYNC: Dispatch on every change for real-time visualization
    dispatch(addResumeData({ ...resumeInfo, experience: newEntries }));
  };

  const addNewExperience = () => {
    const newList = [...experienceList, initialExperience];
    setExperienceList(newList);
    dispatch(addResumeData({ ...resumeInfo, experience: newList }));
  };

  const removeExperience = (index) => {
    const newEntries = experienceList.filter((_, i) => i !== index);
    setExperienceList(newEntries);
    dispatch(addResumeData({ ...resumeInfo, experience: newEntries }));
  };

  return (
    <div className="p-4 md:p-8 bg-white rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 shadow-xl mt-10 relative">
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-purple-600 rounded-xl shrink-0">
          <Briefcase className="text-white w-5 h-5" />
        </div>
        <div>
          <h2 className="font-black text-xl md:text-2xl text-slate-900 uppercase tracking-tighter">
            Career <span className="text-purple-600">History</span>
          </h2>
          <p className="hidden md:block text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mt-1">
            Build your professional narrative
          </p>
        </div>
      </div>

      <AnimatePresence>
        {experienceList.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-5 md:p-8 rounded-[1.5rem] md:rounded-[2rem] bg-slate-50/50 border border-slate-100 mb-6 relative group"
          >
            {experienceList.length > 1 && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 md:top-4 md:right-4 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl"
                onClick={() => removeExperience(index)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">Job Title</label>
                <Input
                  name="title"
                  placeholder="Ex: Senior Developer"
                  value={item.title}
                  onChange={(e) => handleChange(index, e)}
                  className="h-11 md:h-12 rounded-xl border-slate-100 bg-white focus:ring-8 focus:ring-purple-600/5 transition-all font-bold text-sm md:text-base"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">Company</label>
                <Input
                  name="companyName"
                  placeholder="Ex: Google"
                  value={item.companyName}
                  onChange={(e) => handleChange(index, e)}
                  className="h-11 md:h-12 rounded-xl border-slate-100 bg-white focus:ring-8 focus:ring-purple-600/5 transition-all font-bold text-sm md:text-base"
                />
              </div>

              <div className="col-span-full space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Achievements</label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleGenerateAI(index)}
                    disabled={loading}
                    className="text-purple-600 font-bold hover:bg-purple-50 flex gap-2 rounded-lg h-7 px-2"
                  >
                    {loading ? <Loader2 className="animate-spin w-3 h-3" /> : <BrainCircuit className="w-3 h-3" />}
                    <span className="text-[9px] uppercase tracking-tighter">AI Refine</span>
                  </Button>
                </div>
                <Textarea
                  name="workSummary"
                  value={item.workSummary}
                  placeholder="Describe your impact..."
                  onChange={(e) => handleChange(index, e)}
                  className="rounded-2xl border-slate-100 bg-white min-h-[100px] p-4 focus:ring-8 focus:ring-purple-600/5 transition-all text-sm leading-relaxed"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* FOOTER: Fixed button layout for all screens */}
      <div className="mt-6 pt-6 border-t border-slate-50 flex flex-col sm:flex-row justify-between items-center gap-4">
        <Button
          variant="outline"
          onClick={addNewExperience}
          className="w-full sm:w-auto h-12 rounded-2xl border-slate-200 font-bold text-slate-600 hover:bg-slate-50 px-6 text-xs"
        >
          <Plus className="w-4 h-4 mr-2" /> Add History
        </Button>

        <Button
          onClick={() => toast.success("Timeline Synced")}
          className="w-full sm:w-auto h-14 rounded-2xl bg-slate-900 hover:bg-purple-600 text-white px-10 font-black uppercase text-[10px] tracking-[0.2em] shadow-xl transition-all"
        >
          <Save className="w-4 h-4 mr-2" />
          Save
        </Button>
      </div>
    </div>
  );
}

export default Experience;