import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import RichTextEditor from "@/components/custom/RichTextEditor"
import { BrainCircuit, Loader2, Plus, Trash2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";

function Experience({ resumeInfo }) {
  const [loading, setLoading] = useState(false);
  const [experienceList, setExperienceList] = useState(
    resumeInfo?.experience?.length > 0 ? resumeInfo.experience : [{}]
  );
  const dispatch = useDispatch();

  const handleGenerateAI = async (index) => {
  const jobTitle = experienceList[index]?.title;
  
  if (!jobTitle) {
    return toast.error("Architecture Error: Please define a Job Title first!");
  }

  setLoading(true);
  try {
    const rawUrl = import.meta.env.VITE_APP_URL || "http://localhost:5001";
    const baseUrl = rawUrl.replace(/\/+$/, ""); 

    const response = await axios.post(`${baseUrl}/api/ai/generate-content`, {
      prompt: `Write 3 high-impact, results-driven bullet points for a ${jobTitle} role. Use action verbs and focus on technical achievements. Return only the bullet points.`,
      type: 'experience'
    });

    const aiContent = response.data.content;

    // Update local state
    const newEntries = [...experienceList];
    newEntries[index] = {
      ...newEntries[index],
      workSummary: aiContent
    };
    setExperienceList(newEntries);

    // Sync with Redux (Critical for Live Preview)
    dispatch(addResumeData({
      ...resumeInfo,
      experience: newEntries
    }));

    toast.success("AI Architect has refined your achievements!");
  } catch (error) {
    console.error("Experience AI Error:", error);
    toast.error("Handshake failed. Check backend terminal.");
  } finally {
    setLoading(false);
  }
};

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const newEntries = [...experienceList];
    newEntries[index][name] = value;
    setExperienceList(newEntries);
    dispatch(addResumeData({ ...resumeInfo, experience: newEntries }));
  };

  return (
    <div className="p-5 shadow-sm border-t-4 border-t-purple-600 rounded-lg bg-white mt-10">
      <h2 className="font-black text-lg text-slate-800 uppercase tracking-tight">Professional Experience</h2>
      <p className="text-slate-500 text-sm mb-6 font-medium">Add your previous roles and let AI optimize your achievements.</p>

      {experienceList.map((item, index) => (
        <div key={index} className="grid grid-cols-2 gap-4 border p-5 my-5 rounded-2xl bg-slate-50/30 relative">
          <div className="col-span-2 md:col-span-1">
            <label className="text-xs font-black uppercase text-slate-400">Job Title</label>
            <Input name="title" defaultValue={item.title} onChange={(e) => handleChange(index, e)} className="rounded-xl mt-1" />
          </div>
          <div className="col-span-2 md:col-span-1">
            <label className="text-xs font-black uppercase text-slate-400">Company</label>
            <Input name="companyName" defaultValue={item.companyName} onChange={(e) => handleChange(index, e)} className="rounded-xl mt-1" />
          </div>
          
          <div className="col-span-2">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-black uppercase text-slate-400">Work Summary</label>
              <RichTextEditor
                index={index}
                defaultValue={item?.workSummary}
                title={item?.title} // Passing title so the editor knows the context
                onRichTextEditorChange={(v) => {
                  const event = { target: { name: 'workSummary', value: v } };
                  handleChange(index, event);
                }}
  />
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleGenerateAI(index)}
                disabled={loading}
                className="text-purple-600 font-bold hover:bg-purple-50 flex gap-2 rounded-lg"
              >
                {loading ? <Loader2 className="animate-spin w-3 h-3" /> : <BrainCircuit className="w-3 h-3" />}
                Generate AI Points
              </Button>
            </div>
            <Textarea 
              name="workSummary" 
              value={item.workSummary} 
              onChange={(e) => handleChange(index, e)} 
              className="rounded-xl min-h-[100px]"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Experience;