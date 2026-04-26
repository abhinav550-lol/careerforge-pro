import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { BrainCircuit, Loader2, Sparkles, Save } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { motion } from "framer-motion";

function Summary({ resumeInfo }) {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(resumeInfo?.summary || "");
  const dispatch = useDispatch();

  // Sync local state when resumeInfo updates (e.g., from global Forge button)
  useEffect(() => {
    setSummary(resumeInfo?.summary || "");
  }, [resumeInfo?.summary]);

  const handleGenerateAI = async () => {
    if (!resumeInfo?.jobTitle) {
      return toast.error("Please add a Job Title in the first section so AI can understand your role!");
    }
    
    setLoading(true);
    try {
      const rawUrl = import.meta.env.VITE_APP_URL || "http://localhost:5001";
      const baseUrl = rawUrl.replace(/\/+$/, ""); 
      
      const response = await axios.post(`${baseUrl}/api/ai/generate-content`, {
        prompt: `Write a compelling 3-4 sentence professional summary for a ${resumeInfo.jobTitle}. Highlight key strengths, years of experience, and a commitment to professional excellence. Tone: Professional and approachable.`,
        type: 'summary'
      });

      const aiContent = response.data.content;
      setSummary(aiContent);
      
      dispatch(addResumeData({ ...resumeInfo, summary: aiContent }));
      toast.success("AI has polished your professional summary!");
    } catch (error) {
      toast.error("The AI service is currently unavailable. Please try again shortly.");
    } finally {
      setLoading(false);
    }
  };

  const onSave = (e) => {
    e.preventDefault();
    dispatch(addResumeData({ ...resumeInfo, summary: summary }));
    toast.success("Professional profile updated!");
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-xl mt-10 relative overflow-hidden"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <h2 className="font-black text-2xl text-slate-900 uppercase tracking-tighter">
              Professional <span className="text-purple-600">Summary</span>
            </h2>
          </div>
          <p className="text-slate-500 text-xs font-medium uppercase tracking-widest">
            Summarize your career impact in a few short sentences
          </p>
        </div>

        <Button 
          variant="outline" 
          onClick={handleGenerateAI}
          disabled={loading}
          className="border-purple-100 text-purple-600 hover:bg-purple-50 flex gap-2 font-bold rounded-2xl h-11 px-6 transition-all active:scale-95 shadow-sm"
        >
          {loading ? (
            <Loader2 className="animate-spin w-4 h-4" />
          ) : (
            <BrainCircuit className="w-4 h-4" />
          )}
          {loading ? "Polishing..." : "AI Writing Assistant"}
        </Button>
      </div>

      <form onSubmit={onSave} className="space-y-6">
        <div className="relative group">
          <Textarea 
            className="min-h-[160px] rounded-[2rem] border-slate-100 bg-slate-50/50 p-6 text-slate-700 font-medium leading-relaxed outline-none focus:bg-white focus:border-purple-600/20 focus:ring-8 focus:ring-purple-600/5 transition-all placeholder:text-slate-400"
            required
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Ex: Dynamic professional with a proven track record in..."
          />
          {/* Subtle bottom glow on focus */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-[2px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity" />
        </div>

        <div className="flex justify-end pt-2">
          <Button 
            type="submit" 
            className="bg-slate-900 hover:bg-purple-600 text-white rounded-2xl px-12 h-14 font-black uppercase text-xs tracking-[0.2em] shadow-xl shadow-slate-200 transition-all active:scale-95 flex items-center gap-3"
          >
            <Save className="w-4 h-4" />
            Save Profile
          </Button>
        </div>
      </form>
    </motion.div>
  );
}

export default Summary;