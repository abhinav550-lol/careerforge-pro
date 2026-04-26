import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Loader2, 
  Plus, 
  Trash2, 
  FolderGit2, 
  ExternalLink, 
  Sparkles
} from "lucide-react";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { toast } from "sonner";

const initialState = {
  projectName: '',
  technologies: '',
  link: '',
  description: ''
};

function Project({ resumeInfo }) {
  // We initialize state by cloning the resumeInfo projects to avoid read-only errors
  const [projectList, setProjectList] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (resumeInfo?.projects?.length > 0) {
      setProjectList(JSON.parse(JSON.stringify(resumeInfo.projects)));
    } else {
      setProjectList([initialState]);
    }
  }, []);

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    
    // FIX: Create a deep copy of the array and the specific object
    const newEntries = [...projectList];
    newEntries[index] = {
      ...newEntries[index],
      [name]: value
    };
    
    setProjectList(newEntries);
    
    // Sync with Redux immediately for real-time preview
    dispatch(addResumeData({
      ...resumeInfo,
      projects: newEntries
    }));
  };

  const addNewProject = () => {
    setProjectList([...projectList, { ...initialState }]);
  };

  const removeProject = (index) => {
    const newEntries = projectList.filter((_, i) => i !== index);
    setProjectList(newEntries);
    dispatch(addResumeData({
      ...resumeInfo,
      projects: newEntries
    }));
  };

  const onSave = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success("Project architecture synchronized!");
    }, 800);
  };

  return (
    <div className="p-5 shadow-sm border-t-4 border-t-purple-600 rounded-lg bg-white mt-10">
      <div className="flex items-center gap-2 mb-2">
        <FolderGit2 className="text-purple-600 w-5 h-5" />
        <h2 className="font-black text-lg text-slate-800 uppercase tracking-tight">Technical Projects</h2>
      </div>
      <p className="text-slate-500 text-sm mb-6 font-medium">Showcase your builds and technical contributions.</p>

      <div className="space-y-6">
        {projectList.map((item, index) => (
          <div key={index} className="p-5 border border-slate-100 rounded-2xl bg-slate-50/30 relative group transition-all">
            {projectList.length > 1 && (
              <Button 
                variant="ghost" 
                size="icon"
                className="absolute -top-2 -right-2 bg-white shadow-sm rounded-full text-red-500 hover:bg-red-50"
                onClick={() => removeProject(index)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 mb-1 block">Project Title</label>
                <Input 
                  name="projectName" 
                  value={item.projectName || ''}
                  placeholder="e.g. CareerForge Pro"
                  onChange={(e) => handleChange(index, e)}
                  className="rounded-xl border-slate-200"
                />
              </div>
              
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 mb-1 block">Live / Repo Link</label>
                <div className="relative">
                  <Input 
                    name="link" 
                    value={item.link || ''}
                    placeholder="https://github.com/..."
                    onChange={(e) => handleChange(index, e)}
                    className="rounded-xl border-slate-200 pl-8"
                  />
                  <ExternalLink className="absolute left-2.5 top-3 w-4 h-4 text-slate-300" />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="text-[10px] font-black uppercase text-slate-400 mb-1 block">Tech Stack</label>
                <Input 
                  name="technologies" 
                  value={item.technologies || ''}
                  placeholder="React, Node.js, MongoDB"
                  onChange={(e) => handleChange(index, e)}
                  className="rounded-xl border-slate-200"
                />
              </div>

              <div className="md:col-span-2">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[10px] font-black uppercase text-slate-400">Description</label>
                  <Button variant="ghost" size="sm" className="h-6 text-[10px] text-purple-600 font-bold hover:bg-purple-50">
                    <Sparkles className="w-3 h-3 mr-1" /> AI Enhance
                  </Button>
                </div>
                <Textarea 
                  name="description" 
                  value={item.description || ''}
                  placeholder="Describe your role and impact..."
                  onChange={(e) => handleChange(index, e)}
                  className="rounded-xl border-slate-200 min-h-[80px]"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-between">
        <Button 
          variant="outline" 
          onClick={addNewProject}
          className="rounded-xl border-slate-200 font-bold text-slate-600"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Project
        </Button>

        <Button 
          disabled={loading} 
          onClick={onSave}
          className="rounded-xl bg-slate-900 hover:bg-slate-800 text-white px-8 font-bold"
        >
          {loading ? <Loader2 className="animate-spin w-4 h-4" /> : "Save Projects"}
        </Button>
      </div>
    </div>
  );
}

export default Project;