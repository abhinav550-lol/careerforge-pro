import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { LoaderCircle, Cpu, Plus, Minus, Zap, Wand2, Save } from "lucide-react";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { updateThisResume } from "@/Services/resumeAPI";
import { motion, AnimatePresence } from "framer-motion";

function Skills({ resumeInfo, enanbledNext }) {
  const [loading, setLoading] = useState(false);
  const [skillsList, setSkillsList] = useState(
    resumeInfo?.skills?.length > 0 ? resumeInfo.skills : [{ name: "", rating: 0 }]
  );
  
  // Professional Competency Suggestions
  const [aiSuggestions] = useState([
    "Strategic Planning", "Project Management", "Team Leadership", 
    "Critical Thinking", "Stakeholder Management", "Problem Solving"
  ]);

  const dispatch = useDispatch();
  const { resume_id } = useParams();

  // --- LIVE SYNC LOGIC ---
  useEffect(() => {
    dispatch(addResumeData({ ...resumeInfo, skills: skillsList }));
  }, [skillsList]);

  const AddNewSkills = (skillName = "") => {
    if (skillName && skillsList.some(s => s.name.toLowerCase() === skillName.toLowerCase())) {
      return toast.info(`${skillName} is already active.`);
    }
    const newList = [...skillsList, { name: skillName, rating: 0 }];
    setSkillsList(newList);
  };

  const RemoveSkills = () => {
    if (skillsList.length > 1) {
      setSkillsList(skillsList.slice(0, -1));
    }
  };

  const handleChange = (index, key, value) => {
    const list = [...skillsList];
    list[index] = { ...list[index], [key]: value };
    setSkillsList(list);
  };

  const onSave = async () => {
    setLoading(true);
    const data = { data: { skills: skillsList } };
    if (resume_id) {
      try {
        await updateThisResume(resume_id, data);
        toast.success("Expertise profile synchronized!");
        if (enanbledNext) enanbledNext(true);
      } catch (error) {
        toast.error("Failed to sync expertise.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="p-4 md:p-8 bg-white shadow-xl rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 mt-10 relative overflow-hidden">
      
      {/* 1. SECTION HEADER */}
      <div className="mb-8 flex items-center gap-3">
        <div className="p-2.5 bg-purple-600 rounded-2xl shadow-lg shadow-purple-100 shrink-0">
          <Cpu className="text-white w-5 h-5 md:w-6 md:h-6" />
        </div>
        <div>
          <h2 className="font-black text-xl md:text-2xl text-slate-900 uppercase tracking-tighter leading-none">
            Skills & <span className="text-purple-600">Expertise</span>
          </h2>
          <p className="hidden md:block text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1.5 opacity-60">
            Establish your professional mastery levels
          </p>
        </div>
      </div>

      {/* 2. AI RECOMMENDATION ENGINE */}
      <div className="mb-10 p-5 md:p-8 bg-slate-900 rounded-[2rem] text-white relative overflow-hidden group border border-slate-800 shadow-2xl">
        <div className="absolute top-0 right-0 w-48 h-48 bg-purple-600/10 blur-[80px] rounded-full group-hover:bg-purple-600/20 transition-all" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-5">
            <Wand2 className="w-4 h-4 text-purple-400" />
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-200">Recommended for your Industry</h3>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {aiSuggestions.map((skill, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,1)", color: "#0f172a" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => AddNewSkills(skill)}
                className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] md:text-[11px] font-bold text-white transition-all flex items-center gap-2"
              >
                <Plus className="w-3 h-3" /> {skill}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. SKILLS GRID */}
      <div className="space-y-4">
        <AnimatePresence>
          {skillsList.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, x: -10 }}
              className="grid grid-cols-1 md:grid-cols-12 items-center gap-5 md:gap-8 p-5 md:p-7 rounded-[1.5rem] md:rounded-[2rem] bg-slate-50/50 border border-slate-100 hover:border-purple-200 hover:bg-white transition-all group"
            >
              <div className="md:col-span-7 space-y-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">
                  Expertise Label
                </label>
                <Input
                  className="rounded-xl border-slate-100 bg-white h-12 text-sm font-bold text-slate-700 focus:ring-8 focus:ring-purple-600/5 transition-all"
                  placeholder="Ex: Data Visualization"
                  value={item.name}
                  onChange={(e) => handleChange(index, "name", e.target.value)}
                />
              </div>
              <div className="md:col-span-5 flex flex-col items-center md:items-end gap-2.5">
                <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 md:mr-2">
                  Mastery Level
                </label>
                <div className="bg-white p-2.5 px-5 rounded-xl border border-slate-100 shadow-sm flex items-center justify-center">
                  <Rating
                    style={{ maxWidth: 110 }}
                    value={item.rating}
                    onChange={(v) => handleChange(index, "rating", v)}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* 4. FOOTER CONTROLS - RESPONSIVE STACKING */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-12 pt-8 border-t border-slate-50 gap-4">
        <div className="flex gap-3 w-full sm:w-auto">
          <Button
            variant="outline"
            onClick={() => AddNewSkills()}
            className="flex-1 sm:flex-none rounded-[1.25rem] border-slate-200 text-slate-600 bg-white hover:bg-slate-50 font-bold h-12 px-6 flex items-center gap-2 text-xs"
          >
            <Plus className="w-4 h-4" /> Add
          </Button>
          <Button
            variant="ghost"
            onClick={RemoveSkills}
            className="flex-1 sm:flex-none rounded-[1.25rem] text-slate-400 hover:text-red-500 hover:bg-red-50 font-bold h-12 px-6 text-xs"
            disabled={skillsList.length <= 1}
          >
            <Minus className="w-4 h-4" /> Remove
          </Button>
        </div>
        
        <Button 
          disabled={loading} 
          onClick={onSave}
          className="w-full sm:w-auto bg-slate-900 hover:bg-purple-600 text-white rounded-[1.25rem] px-12 h-14 font-black uppercase text-[10px] tracking-[0.2em] shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3"
        >
          {loading ? (
            <LoaderCircle className="animate-spin w-5 h-5" />
          ) : (
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

export default Skills;