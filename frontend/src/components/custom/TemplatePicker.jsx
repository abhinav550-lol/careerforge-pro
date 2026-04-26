import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Layout, Columns, Rows, CheckCircle2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";

const templates = [
  {
    id: 'modern',
    name: 'Modern Minimal',
    description: 'Clean single-column chronological layout.',
    icon: <Rows className="w-8 h-8" />,
  },
  {
    id: 'professional',
    name: 'Executive Sidebar',
    description: 'Two-column layout with a focused sidebar.',
    icon: <Columns className="w-8 h-8" />,
  }
];

function TemplatePicker() {
  const dispatch = useDispatch();
  const resumeInfo = useSelector((state) => state.editResume.resumeData);
  const currentTemplate = resumeInfo?.templateId || 'modern';

  const handleTemplateSelect = (id) => {
    dispatch(addResumeData({
      ...resumeInfo,
      templateId: id
    }));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex gap-2 rounded-xl border-purple-200 text-purple-600 font-bold hover:bg-purple-50">
          <Layout className="w-4 h-4" /> Change Layout
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl bg-white rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black uppercase tracking-tight text-slate-800">
            Select Architecture
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {templates.map((template) => (
            <div 
              key={template.id}
              onClick={() => handleTemplateSelect(template.id)}
              className={`p-5 rounded-2xl border-2 cursor-pointer transition-all relative overflow-hidden ${
                currentTemplate === template.id 
                ? 'border-purple-600 bg-purple-50/50' 
                : 'border-slate-100 hover:border-purple-200 bg-slate-50/50'
              }`}
            >
              {currentTemplate === template.id && (
                <CheckCircle2 className="absolute top-3 right-3 w-5 h-5 text-purple-600" />
              )}
              
              <div className={`p-3 rounded-xl mb-4 w-fit ${
                currentTemplate === template.id ? 'bg-purple-600 text-white' : 'bg-white text-slate-400'
              }`}>
                {template.icon}
              </div>
              
              <h3 className="font-bold text-slate-800">{template.name}</h3>
              <p className="text-xs text-slate-500 mt-1">{template.description}</p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default TemplatePicker;