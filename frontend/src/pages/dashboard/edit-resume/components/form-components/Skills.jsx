import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { LoaderCircle, Cpu, Plus, Minus, Zap } from "lucide-react";
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
  const dispatch = useDispatch();
  const { resume_id } = useParams();

  useEffect(() => {
    // UI (UX): Real-time dispatch for the split-screen Live Preview 
    dispatch(addResumeData({ ...resumeInfo, skills: skillsList }));
  }, [skillsList, dispatch]);

  const AddNewSkills = () => {
    setSkillsList([...skillsList, { name: "", rating: 0 }]);
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
        // Syncing with Data + AI Memory (MongoDB Atlas Vector Search) [cite: 17, 36]
        await updateThisResume(resume_id, data);
        toast.success("Skill Architecture Synced");
        if (enanbledNext) enanbledNext(true);
      } catch (error) {
        toast.error(`Sync Failed: ${error.message}`);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="p-8 bg-white shadow-xl rounded-2xl border-t-4 border-t-yellow-500 border border-slate-100 mt-10">
      <div className="mb-6">
        <h2 className="font-black text-2xl text-slate-900 flex items-center gap-2">
          <Cpu className="text-yellow-500 w-6 h-6" />
          Technical Proficiency
        </h2>
        <p className="text-slate-500 font-medium">
          Add core competencies for the **AI Job Matcher** to analyze[cite: 68].
        </p>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {skillsList.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col md:flex-row items-center justify-between gap-4 border border-slate-200 p-4 rounded-xl bg-slate-50/50 hover:border-yellow-400 transition-all"
            >
              <div className="w-full md:w-3/5 space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">
                  Skill Name
                </label>
                <Input
                  className="rounded-lg border-slate-200 focus:ring-2 focus:ring-yellow-400/20"
                  placeholder="e.g. MERN Stack, Gemini API"
                  defaultValue={item.name}
                  onChange={(e) => handleChange(index, "name", e.target.value)}
                />
              </div>
              <div className="flex flex-col items-center gap-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Proficiency
                </label>
                <Rating
                  style={{ maxWidth: 120 }}
                  value={item.rating}
                  onChange={(v) => handleChange(index, "rating", v)}
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-8 pt-6 border-t border-slate-100 gap-4">
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={AddNewSkills}
            className="rounded-xl border-slate-200 text-yellow-600 hover:bg-yellow-50 font-bold flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Skill
          </Button>
          <Button
            variant="ghost"
            onClick={RemoveSkills}
            className="rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 font-bold flex items-center gap-2"
            disabled={skillsList.length <= 1}
          >
            <Minus className="w-4 h-4" /> Remove
          </Button>
        </div>
        
        <Button 
          disabled={loading} 
          onClick={onSave}
          className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white rounded-xl px-10 py-6 font-bold shadow-lg transition-all active:scale-95 flex items-center gap-2"
        >
          {loading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <>
              <Zap className="w-4 h-4 text-yellow-400" />
              Sync Architecture
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

export default Skills;