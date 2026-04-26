import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Palette, Check } from "lucide-react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { updateThisResume } from "@/Services/resumeAPI";

function ThemeColor({ resumeInfo }) {
  const dispatch = useDispatch();
  const { resume_id } = useParams();
  
  // Professional palette curated for ATS-friendly resumes
  const colors = [
    "#000000", "#1e293b", "#2563eb", "#0891b2", "#059669",
    "#4f46e5", "#7c3aed", "#c026d3", "#db2777", "#e11d48",
    "#ea580c", "#d97706", "#65a30d", "#4b5563", "#dc2626",
    "#22c55e", "#06b6d4", "#3b82f6", "#8b5cf6", "#f43f5e"
  ];

  const [selectedColor, setSelectedColor] = useState(resumeInfo?.themeColor);

  const onColorSelect = async (color) => {
    setSelectedColor(color);
    
    // UI (UX): Immediate Redux dispatch for real-time Live Preview
    dispatch(
      addResumeData({
        ...resumeInfo,
        themeColor: color,
      })
    );

    const data = {
      data: {
        themeColor: color,
      },
    };

    try {
      await updateThisResume(resume_id, data);
      toast.success("Design Identity Updated");
    } catch (error) {
      toast.error("Failed to sync theme preferences");
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="rounded-xl border-slate-200 gap-2 font-bold hover:bg-slate-50 transition-all"
        >
          <Palette className="w-4 h-4 text-slate-600" />
          <span>Theme</span>
          <div 
            className="w-3 h-3 rounded-full border border-slate-200 shadow-sm" 
            style={{ backgroundColor: selectedColor || resumeInfo?.themeColor || "#000000" }} 
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-4 rounded-2xl shadow-2xl border-slate-100">
        <div className="space-y-3">
          <div>
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-400">
              Accent Palette
            </h2>
            <p className="text-[10px] text-slate-500 italic">Select a color for your visual hierarchy.</p>
          </div>
          
          <div className="grid grid-cols-5 gap-3">
            {colors.map((item, index) => (
              <div
                key={index}
                onClick={() => onColorSelect(item)}
                className={`h-8 w-8 rounded-full cursor-pointer flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-sm
                  ${(selectedColor === item || resumeInfo?.themeColor === item) 
                    ? "ring-2 ring-slate-900 ring-offset-2" 
                    : "hover:ring-2 hover:ring-slate-200 hover:ring-offset-1"
                  }
                `}
                style={{ backgroundColor: item }}
              >
                {(selectedColor === item || resumeInfo?.themeColor === item) && (
                  <Check className="w-4 h-4 text-white drop-shadow-md" />
                )}
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default ThemeColor;