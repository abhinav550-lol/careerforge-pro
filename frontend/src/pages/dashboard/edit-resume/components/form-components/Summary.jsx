import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { BrainCircuit, Loader2, Sparkles, Save, CheckCircle2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { motion, AnimatePresence } from "framer-motion";

function Summary({ resumeInfo }) {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(resumeInfo?.summary || "");
  const [aiSuggestions, setAiSuggestions] = useState([]); 
  const dispatch = useDispatch();

  // Sync state when props update
  useEffect(() => {
    setSummary(resumeInfo?.summary || "");
  }, [resumeInfo?.summary]);

  const handleGenerateAI = async () => {
    if (!resumeInfo?.jobTitle) {
      return toast.error("Please add a Job Title first!");
    }
    
    setLoading(true);
    setAiSuggestions([]); 
    try {
      const rawUrl = import.meta.env.VITE_APP_URL || "http://localhost:5001";
      const baseUrl = rawUrl.replace(/\/+$/, ""); 
      
      const response = await axios.post(`${baseUrl}/api/ai/generate-content`, {
        prompt: `Generate 3 professional summaries for a ${resumeInfo.jobTitle}. 
        Return ONLY a JSON array of strings. 
        Option 1: Results-oriented. Option 2: Skills-focused. Option 3: Leadership-driven.`,
        type: 'summary'
      });

      // Handle potential string vs array response
      const aiContent = response.data.content; 
      const suggestionsArray = typeof aiContent === 'string' ? JSON.parse(aiContent) : aiContent;
      
      setAiSuggestions(suggestionsArray);
      toast.success("Variations generated!");
    } catch (error) {
      toast.error("AI service is currently busy.");
    } finally {
      setLoading(false);
    }
  };

  const selectSummary = (selectedText) => {
    setSummary(selectedText);
    // LIVE SYNC: Dispatch immediately so preview reflects choice
    dispatch(addResumeData({ ...resumeInfo, summary: selectedText }));
    setAiSuggestions([]); 
    toast.info("Summary Synchronized");
  };

  const handleTextareaChange = (e) => {
    const newSummary = e.target.value;
    setSummary(newSummary);
    // LIVE SYNC: Dispatch on keystroke for real-time preview
    dispatch(addResumeData({ ...resumeInfo, summary: newSummary }));
  };

  const onSave = (e) => {
    e.preventDefault();
    dispatch(addResumeData({ ...resumeInfo, summary: summary }));
    toast.success("Profile synchronized!");
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 md:p-8 bg-white rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 shadow-xl mt-10 relative"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-600 rounded-xl shrink-0">
             <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-black text-xl md:text-2xl text-slate-900 uppercase tracking-tighter">
              Professional <span className="text-purple-600">Summary</span>
            </h2>
            <p className="hidden md:block text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1">
              Refine your professional narrative
            </p>
          </div>
        </div>

        <Button 
          variant="outline" 
          onClick={handleGenerateAI}
          disabled={loading}
          className="w-full md:w-auto border-purple-100 text-purple-600 hover:bg-purple-50 flex gap-2 font-bold rounded-2xl h-11 px-6 transition-all shadow-sm text-xs"
        >
          {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <BrainCircuit className="w-4 h-4" />}
          {loading ? "Optimizing..." : "AI Writing Assistant"}
        </Button>
      </div>

      {/* --- AI SUGGESTIONS SELECTION GRID --- */}
      <AnimatePresence>
        {aiSuggestions.length > 0 && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mb-8 space-y-4 overflow-hidden"
          >
            <div className="p-1.5 bg-slate-50 rounded-[2rem] border border-slate-100 shadow-inner">
              <div className="grid grid-cols-1 gap-2">
                {aiSuggestions.map((suggestion, index) => (
                  <div 
                    key={index}
                    onClick={() => selectSummary(suggestion)}
                    className="p-5 bg-white rounded-[1.5rem] border border-transparent hover:border-purple-200 hover:bg-purple-50/50 cursor-pointer transition-all group relative"
                  >
                    <div className="flex justify-between items-start gap-4">
                       <p className="text-sm text-slate-600 leading-relaxed font-medium">
                        {suggestion}
                      </p>
                      <CheckCircle2 className="w-5 h-5 text-slate-200 group-hover:text-purple-500 transition-colors shrink-0" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={onSave} className="space-y-6">
        <Textarea 
          className="min-h-[160px] rounded-[2rem] border-slate-100 bg-slate-50/50 p-6 text-slate-700 font-medium leading-relaxed focus:bg-white focus:ring-8 focus:ring-purple-600/5 transition-all outline-none text-sm md:text-base"
          required
          value={summary}
          onChange={handleTextareaChange}
          placeholder="Select an AI option or define your professional impact..."
        />

        <div className="flex justify-end pt-2">
          <Button 
            type="submit" 
            className="w-full md:w-auto bg-slate-900 hover:bg-purple-600 text-white rounded-2xl px-12 h-14 font-black uppercase text-[10px] tracking-[0.2em] shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3"
          >
            <Save className="w-4 h-4" />
            Save
          </Button>
        </div>
      </form>
    </motion.div>
  );
}

export default Summary;