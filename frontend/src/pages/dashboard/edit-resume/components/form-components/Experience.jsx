import React, { useState } from "react";
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
  const [experienceList, setExperienceList] = useState(
    resumeInfo?.experience?.length > 0 ? resumeInfo.experience : [initialExperience]
  );
  const dispatch = useDispatch();

  const handleGenerateAI = async (index) => {
    const jobTitle = experienceList[index]?.title;
    if (!jobTitle) {
      return toast.error("Please enter a Job Title first so AI can help!");
    }

    setLoading(true);
    try {
      const rawUrl = import.meta.env.VITE_APP_URL || "http://localhost:5001";
      const baseUrl = rawUrl.replace(/\/+$/, "");

      const response = await axios.post(`${baseUrl}/api/ai/generate-content`, {
        prompt: `Write 3 professional, results-oriented achievement bullet points for a ${jobTitle} role. Focus on impact and professional growth. Do not use technical jargon unless relevant.`,
        type: 'experience'
      });

      const aiContent = response.data.content;
      const newEntries = [...experienceList];
      newEntries[index] = { ...newEntries[index], workSummary: aiContent };
      setExperienceList(newEntries);

      dispatch(addResumeData({ ...resumeInfo, experience: newEntries }));
      toast.success("AI has polished your professional achievements!");
    } catch (error) {
      toast.error("AI service is currently busy. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const newEntries = [...experienceList];
    newEntries[index] = { ...newEntries[index], [name]: value };
    setExperienceList(newEntries);
    dispatch(addResumeData({ ...resumeInfo, experience: newEntries }));
  };

  const addNewExperience = () => {
    setExperienceList([...experienceList, initialExperience]);
  };

  const removeExperience = (index) => {
    const newEntries = experienceList.filter((_, i) => i !== index);
    setExperienceList(newEntries);
    dispatch(addResumeData({ ...resumeInfo, experience: newEntries }));
  };

  return (
    <div className="p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-xl mt-10 relative overflow-hidden">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-600 rounded-xl">
            <Briefcase className="text-white w-5 h-5" />
          </div>
          <div>
            <h2 className="font-black text-2xl text-slate-900 uppercase tracking-tighter">
              Professional <span className="text-purple-600">Experience</span>
            </h2>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">
              Document your career journey and achievements
            </p>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {experienceList.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="p-8 rounded-[2rem] bg-slate-50/50 border border-slate-100 mb-8 relative group transition-all hover:bg-white hover:border-purple-200"
          >
            {experienceList.length > 1 && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                onClick={() => removeExperience(index)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Job Title</label>
                <Input
                  name="title"
                  placeholder="Ex: Senior Manager"
                  defaultValue={item.title}
                  onChange={(e) => handleChange(index, e)}
                  className="h-12 rounded-xl border-slate-100 bg-white focus:ring-8 focus:ring-purple-600/5 transition-all font-bold"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Company Name</label>
                <Input
                  name="companyName"
                  placeholder="Ex: Global Solutions Inc."
                  defaultValue={item.companyName}
                  onChange={(e) => handleChange(index, e)}
                  className="h-12 rounded-xl border-slate-100 bg-white focus:ring-8 focus:ring-purple-600/5 transition-all font-bold"
                />
              </div>

              <div className="col-span-full space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Role Summary & Achievements</label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleGenerateAI(index)}
                    disabled={loading}
                    className="text-purple-600 font-bold hover:bg-purple-50 flex gap-2 rounded-lg h-8 px-3"
                  >
                    {loading ? <Loader2 className="animate-spin w-3 h-3" /> : <BrainCircuit className="w-3 h-3" />}
                    <span className="text-[10px] uppercase">Refine with AI</span>
                  </Button>
                </div>
                <Textarea
                  name="workSummary"
                  value={item.workSummary}
                  placeholder="Briefly describe your responsibilities and key successes..."
                  onChange={(e) => handleChange(index, e)}
                  className="rounded-2xl border-slate-100 bg-white min-h-[120px] p-4 focus:ring-8 focus:ring-purple-600/5 transition-all leading-relaxed"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="mt-8 pt-8 border-t border-slate-50 flex flex-col sm:flex-row justify-between items-center gap-6">
        <Button
          variant="outline"
          onClick={addNewExperience}
          className="w-full sm:w-auto h-12 rounded-2xl border-slate-200 font-bold text-slate-600 hover:bg-slate-50 px-8 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Experience
        </Button>

        <Button
          onClick={() => toast.success("Experience timeline synchronized!")}
          className="w-full sm:w-auto h-14 rounded-2xl bg-slate-900 hover:bg-purple-600 text-white px-12 font-black uppercase text-xs tracking-[0.2em] shadow-xl transition-all active:scale-95 flex items-center gap-3"
        >
          <Save className="w-4 h-4" />
          Save Experience
        </Button>
      </div>
    </div>
  );
}

export default Experience;