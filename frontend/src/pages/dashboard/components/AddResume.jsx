import React, { useState } from "react";
import { Plus, Loader2, Sparkles, Wand2, PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createNewResume } from "@/Services/resumeAPI";
import { useNavigate } from "react-router-dom";

function AddResume() {
  const [isDialogOpen, setOpenDialog] = useState(false);
  const [resumetitle, setResumetitle] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const createResume = async () => {
    if (!resumetitle.trim()) return;
    setLoading(true);

    // ALIGNMENT FIX: Send the flat object to match your Mongoose Schema
    const payload = {
      title: resumetitle,
    };

    try {
      const res = await createNewResume(payload);
      
      // ALIGNMENT FIX: Hardened response extractor to handle ApiResponse structure
      const responseData = res?.data?.data ? res.data.data : res?.data || res;
      
      if (responseData?._id) {
        navigate(`/dashboard/edit-resume/${responseData._id}`);
      }
    } catch (error) {
      console.error("Profile creation failed:", error.message);
    } finally {
      setLoading(false);
      setResumetitle("");
      setOpenDialog(false);
    }
  };

  return (
    <>
      {/* 1. RESPONSIVE PREMIUM BUTTON */}
      <Button 
        onClick={() => setOpenDialog(true)}
        className="w-full sm:w-auto h-20 sm:h-28 px-6 sm:px-8 rounded-2xl bg-slate-900 text-white hover:bg-purple-600 font-black uppercase text-[10px] tracking-widest flex gap-3 transition-all shadow-xl shadow-slate-200 group active:scale-95"
      >
        <PlusCircle className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
        Create New Resume
      </Button>

      {/* 2. RESPONSIVE CREATION DIALOG */}
      <Dialog open={isDialogOpen} onOpenChange={setOpenDialog}>
        <DialogContent className="w-[95vw] max-w-[425px] rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 border-none shadow-2xl bg-white">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-600 rounded-xl shrink-0">
                <Wand2 className="text-white w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <DialogTitle className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tighter leading-none pt-1">
                New <span className="text-purple-600">Architecture</span>
              </DialogTitle>
            </div>
            <DialogDescription className="text-slate-500 font-medium text-[10px] sm:text-xs uppercase tracking-widest leading-relaxed">
              Define the title of your next professional milestone.
            </DialogDescription>
          </DialogHeader>

          <div className="py-6 sm:py-8">
            <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1 mb-3 block">
              Resume Title / Role Name
            </label>
            <Input
              id="title"
              placeholder="Ex: Senior Full Stack Developer"
              className="h-12 sm:h-14 rounded-2xl border-none bg-slate-50 focus:bg-white focus:ring-8 focus:ring-purple-600/5 transition-all font-bold text-slate-700"
              value={resumetitle}
              onChange={(e) => setResumetitle(e.target.value)}
              autoFocus
            />
          </div>

          <div className="flex flex-col gap-3">
            <Button 
              onClick={createResume} 
              disabled={!resumetitle.trim() || loading}
              className="w-full h-12 sm:h-14 rounded-2xl bg-slate-900 text-white hover:bg-purple-600 font-black uppercase text-xs tracking-[0.2em] shadow-xl transition-all flex items-center justify-center gap-3"
            >
              {loading ? (
                <Loader2 className="animate-spin w-5 h-5" />
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  Initialize Studio
                </>
              )}
            </Button>
            <Button 
              variant="ghost" 
              className="w-full rounded-2xl h-10 sm:h-12 font-bold text-slate-400 hover:text-slate-600 text-[10px] uppercase tracking-widest"
              onClick={() => setOpenDialog(false)}
            >
              Discard
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddResume;