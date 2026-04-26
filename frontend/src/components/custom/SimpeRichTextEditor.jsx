import React, { useEffect, useState } from "react";
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
import { AIChatSession } from "@/Services/AiModel";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Sparkles, LoaderCircle, Wand2 } from "lucide-react";

// Universal Prompt for all industries
const PROMPT = `Create a JSON object with the following fields:
"projectName": A string representing the project name
"projectSummary": An array of 3-4 strings, each representing a high-impact, professional achievement bullet point in HTML format (using <li> tags) for the project: "{projectName}" using these tools/skills: "{techStack}". 
Focus on measurable results and professional excellence.`;

function SimpeRichTextEditor({ index, onRichTextEditorChange, resumeInfo }) {
  const [value, setValue] = useState(
    resumeInfo?.projects[index]?.projectSummary || ""
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    onRichTextEditorChange(value);
  }, [value]);

  const GenerateSummaryFromAI = async () => {
    const project = resumeInfo?.projects[index];
    
    if (!project?.projectName || !project?.technologies) {
      toast.error("Please add a Project Name and key Skills/Tools first!");
      return;
    }
    
    setLoading(true);
    try {
      const prompt = PROMPT.replace("{projectName}", project.projectName)
                          .replace("{techStack}", project.technologies);
      
      const result = await AIChatSession.sendMessage(prompt);
      const resp = JSON.parse(result.response.text());
      
      const aiContent = resp.projectSummary?.join("");
      setValue(aiContent);
      toast.success("AI has polished your project achievements!");
    } catch (error) {
      toast.error("AI service is busy. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      {/* 1. EDITOR HEADER */}
      <div className="flex justify-between items-end mb-3 px-1">
        <div>
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            Project Impact & Description
          </label>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={GenerateSummaryFromAI}
          disabled={loading}
          className="h-9 px-4 rounded-xl border-purple-100 text-purple-600 font-bold hover:bg-purple-50 flex gap-2 transition-all active:scale-95 shadow-sm"
        >
          {loading ? (
            <LoaderCircle className="animate-spin w-3 h-3" />
          ) : (
            <>
              <Wand2 className="h-3 w-3" /> 
              <span className="text-[10px] uppercase tracking-wider">Refine with AI</span>
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
            }}
            className="min-h-[150px] bg-transparent p-4 outline-none"
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
      
      <p className="mt-2 text-[9px] text-slate-400 font-medium px-2 uppercase tracking-tight">
        Pro-tip: Use the AI button to turn simple tasks into high-impact achievements.
      </p>
    </div>
  );
}

export default SimpeRichTextEditor;