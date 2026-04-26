import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { BrainCircuit, Loader2, Wand2 } from 'lucide-react';
import {
  BtnBold,
  BtnBulletList,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnStrikeThrough,
  BtnUnderline,
  Editor,
  EditorProvider,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";

export default function RichTextEditor({ defaultValue, onRichTextEditorChange, index, title }) {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(defaultValue || "");

  // Sync internal state with external defaultValue (important for AI updates)
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const GenerateSummeryFromAI = async () => {
    if (!title) {
      toast.error('Please enter a Job Title first so AI can help!');
      return;
    }
    setLoading(true);

    try {
      const rawUrl = import.meta.env.VITE_APP_URL || "http://localhost:5001";
      const baseUrl = rawUrl.replace(/\/+$/, ""); 
      
      const response = await axios.post(`${baseUrl}/api/ai/generate-content`, {
        // Universal prompt: focusing on results and impact for any industry
        prompt: `Provide 3 professional achievement bullet points for a ${title} role. Focus on measurable results, leadership, and professional growth. Return as an HTML list using <li> tags.`,
        type: 'experience'
      });

      const aiResult = response.data.content;
      
      setValue(aiResult);
      onRichTextEditorChange(aiResult);
      
      toast.success("AI has polished your professional achievements!");
    } catch (error) {
      console.error("AI Error:", error);
      toast.error("The AI service is currently busy. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* 1. EDITOR HEADER */}
      <div className="flex justify-between items-end mb-3">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
          Achievements & Impact
        </label>
        <Button
          variant="outline"
          type="button"
          size="sm"
          onClick={GenerateSummeryFromAI}
          disabled={loading}
          className="h-8 rounded-xl border-purple-100 text-purple-600 font-bold hover:bg-purple-50 flex gap-2 transition-all active:scale-95 shadow-sm px-4"
        >
          {loading ? (
            <Loader2 className="animate-spin w-3 h-3" />
          ) : (
            <>
              <Wand2 className="h-3 w-3" /> 
              <span className="text-[10px] uppercase">Refine with AI</span>
            </>
          )}
        </Button>
      </div>

      {/* 2. EDITOR CANVAS */}
      <div className="rounded-[1.5rem] overflow-hidden border border-slate-100 bg-slate-50/30 focus-within:border-purple-200 focus-within:ring-8 focus-within:ring-purple-600/5 transition-all">
        <EditorProvider>
          <Editor
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              onRichTextEditorChange(e.target.value);
            }}
            className="min-h-[160px] bg-transparent p-4 outline-none leading-relaxed"
          >
            <Toolbar className="bg-white border-b border-slate-100 p-2 flex gap-1">
              <BtnBold />
              <BtnItalic />
              <BtnUnderline />
              <BtnStrikeThrough />
              <Separator className="mx-1 border-slate-100" />
              <BtnNumberedList />
              <BtnBulletList />
              <Separator className="mx-1 border-slate-100" />
              <BtnLink />
            </Toolbar>
          </Editor>
        </EditorProvider>
      </div>
    </div>
  );
}