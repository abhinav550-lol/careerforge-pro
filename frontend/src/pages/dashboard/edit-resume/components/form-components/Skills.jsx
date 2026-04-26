import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { LoaderCircle, Cpu, Plus, Minus, Zap, Wand2, Sparkles } from "lucide-react";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { updateThisResume } from "@/Services/resumeAPI";
import { motion, AnimatePresence } from "framer-motion";

function Skills({ resumeInfo, enanbledNext }) {
  const [loading, setLoading] = useState(false);
  const [skillsList, setSkillsList] = useState(
    resumeInfo?.skills || [{ name: "", rating: 0 }]
  );
  
  // Universal Professional Suggestions for all industries
  const [aiSuggestions] = useState([
    "Team Leadership", "Project Management", "Strategic Planning", 
    "Customer Relations", "Critical Thinking", "Problem Solving"
  ]);

  const dispatch = useDispatch();
  const { resume_id } = useParams();

  useEffect(() => {
    dispatch(addResumeData({ ...resumeInfo, skills: skillsList }));
  }, [skillsList, dispatch]);

  const AddNewSkills = (skillName = "") => {
    if (skillName && skillsList.some(s => s.name.toLowerCase() === skillName.toLowerCase())) {
      return toast.info(`${skillName} is already in your profile.`);
    }
    setSkillsList([...skillsList, { name: skillName, rating: 0 }]);
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
        toast.success("Skills & expertise updated!");
        if (enanbledNext) enanbledNext(true);
      } catch (error) {
        toast.error("Failed to save changes.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="p-8 bg-white shadow-2xl rounded-[2.5rem] border border-slate-100 mt-10 relative overflow-hidden">
      {/* 1. SECTION HEADER */}
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h2 className="font-black text-2xl text-slate-900 flex items-center gap-2 tracking-tighter uppercase">
            <Cpu className="text-purple-600 w-6 h-6" />
            Skills & <span className="text-purple-600">Expertise</span>
          </h2>
          <p className="text-slate-500 text-xs font-medium uppercase tracking-widest mt-1">
            Define your professional competencies and mastery levels
          </p>
        </div>
      </div>

      {/* 2. AI SUGGESTION BAR */}
      <div className="mb-10 p-6 bg-slate-900 rounded-[2rem] text-white relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/20 blur-[60px] rounded-full group-hover:bg-purple-600/30 transition-all" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Wand2 className="w-4 h-4 text-purple-400" />
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-200">Recommended for your role</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {aiSuggestions.map((skill, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => AddNewSkills(skill)}
                className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[11px] font-bold text-white hover:bg-white hover:text-slate-900 transition-all flex items-center gap-2"
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
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-12 items-center gap-6 p-6 rounded-[1.5rem] bg-slate-50/50 border border-transparent hover:border-purple-200 hover:bg-white transition-all group"
            >
              <div className="md:col-span-7 space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                  Skill / Competency
                </label>
                <Input
                  className="rounded-xl border-slate-100 bg-white h-12 text-sm font-medium focus:ring-8 focus:ring-purple-600/5 focus:border-purple-600/20"
                  placeholder="Ex: Communication or Data Analysis"
                  value={item.name}
                  onChange={(e) => handleChange(index, "name", e.target.value)}
                />
              </div>
              <div className="md:col-span-5 flex flex-col items-center md:items-end gap-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mr-1">
                  Proficiency Level
                </label>
                <div className="bg-white p-2 px-4 rounded-xl border border-slate-100 shadow-sm">
                  <Rating
                    style={{ maxWidth: 120 }}
                    value={item.rating}
                    onChange={(v) => handleChange(index, "rating", v)}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* 4. FOOTER CONTROLS */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-12 pt-8 border-t border-slate-50 gap-6">
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={() => AddNewSkills()}
            className="rounded-2xl border-slate-100 text-slate-600 hover:bg-slate-50 font-bold h-12 px-6 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Skill
          </Button>
          <Button
            variant="ghost"
            onClick={RemoveSkills}
            className="rounded-2xl text-slate-400 hover:text-red-500 hover:bg-red-50 font-bold h-12 px-6"
            disabled={skillsList.length <= 1}
          >
            <Minus className="w-4 h-4" /> Remove Last
          </Button>
        </div>
        
        <Button 
          disabled={loading} 
          onClick={onSave}
          className="w-full sm:w-auto bg-slate-900 hover:bg-purple-600 text-white rounded-2xl px-12 h-14 font-black uppercase text-xs tracking-widest shadow-xl shadow-slate-200 transition-all active:scale-95 flex items-center gap-3"
        >
          {loading ? (
            <LoaderCircle className="animate-spin w-5 h-5" />
          ) : (
            <>
              <Zap className="w-4 h-4 text-purple-400" />
              Save Expertise
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

export default Skills;