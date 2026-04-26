import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { BrainCircuit, Loader2, Sparkles } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";

function Summary({ resumeInfo, enanbledNext }) {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(resumeInfo?.summary || "");
  const dispatch = useDispatch();

  const handleGenerateAI = async () => {
    if (!resumeInfo?.jobTitle) {
      return toast.error("Please add a Job Title in Personal Details first to help the AI!");
    }
    
    setLoading(true);
    try {
    // Clean the URL to remove any trailing slashes from .env
    const rawUrl = import.meta.env.VITE_APP_URL || "http://localhost:5001";
    const baseUrl = rawUrl.replace(/\/+$/, ""); // Removes trailing slashes
    
    const response = await axios.post(`${baseUrl}/api/ai/generate-content`, {
      prompt: `Generate a professional summary for ${resumeInfo.jobTitle}`,
      type: 'summary'
    });

      const aiContent = response.data.content;
      setSummary(aiContent);
      
      // Update Redux immediately
      dispatch(addResumeData({ ...resumeInfo, summary: aiContent }));
      toast.success("AI Architect has generated your summary!");
    } catch (error) {
      console.error("AI Generation Error:", error);
      toast.error("Failed to generate AI content. Check backend connection.");
    } finally {
      setLoading(false);
    }
  };

  const onSave = (e) => {
    e.preventDefault();
    dispatch(addResumeData({ ...resumeInfo, summary: summary }));
    toast.success("Summary saved successfully!");
  };

  return (
    <div className="p-5 shadow-sm border-t-4 border-t-purple-600 rounded-lg bg-white mt-10">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h2 className="font-black text-lg text-slate-800 uppercase tracking-tight">Professional Summary</h2>
          <p className="text-slate-500 text-sm font-medium">Add a summary for your job role or use our AI.</p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleGenerateAI}
          disabled={loading}
          className="border-purple-200 text-purple-600 hover:bg-purple-50 flex gap-2 font-bold rounded-xl"
        >
          {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <BrainCircuit className="w-4 h-4" />}
          Generate with AI
        </Button>
      </div>

      <form onSubmit={onSave}>
        <Textarea 
          className="mt-5 min-h-[120px] rounded-xl border-slate-200 focus:ring-purple-500/10"
          required
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="I am a Full Stack Developer experienced in..."
        />
        <div className="mt-5 flex justify-end">
          <Button type="submit" className="bg-slate-900 hover:bg-slate-800 rounded-xl px-8 font-bold text-white shadow-lg">
            Save Summary
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Summary;