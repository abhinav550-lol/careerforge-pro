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
import { motion } from "framer-motion";

function AddResume() {
  const [isDialogOpen, setOpenDialog] = useState(false);
  const [resumetitle, setResumetitle] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const createResume = async () => {
    if (!resumetitle.trim()) return;
    setLoading(true);

    const data = {
      data: {
        title: resumetitle,
        themeColor: "#9333ea", 
      },
    };

    try {
      const res = await createNewResume(data);
      navigate(`/dashboard/edit-resume/${res.data.resume._id}`);
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
      {/* 1. UPDATED PREMIUM BUTTON (Matches Optimize Button) */}
      <Button 
        onClick={() => setOpenDialog(true)}
        className="h-28 px-8 rounded-2xl bg-slate-900 text-white hover:bg-purple-600 font-black uppercase text-[10px] tracking-widest flex gap-3 transition-all shadow-xl shadow-slate-200 group active:scale-95"
      >
        <PlusCircle className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
        Create New Resume
      </Button>

      {/* 2. OPTIONAL: Keep the Grid Card as well (if you want both) */}
      {/* If you only want the button, you can remove the motion.div below */}
      {/* <motion.div
        whileHover={{ y: -5 }}
        onClick={() => setOpenDialog(true)}
        className="hidden lg:flex p-10 flex-col items-center justify-center border-2 border-dashed border-slate-200 bg-white rounded-[2.5rem] h-[380px] cursor-pointer hover:border-purple-600 hover:bg-purple-50/30 transition-all group"
      >
        <Plus className="text-slate-300 group-hover:text-purple-600 w-10 h-10 transition-colors" />
      </motion.div> 
      */}

      {/* 3. CREATION DIALOG */}
      <Dialog open={isDialogOpen} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[425px] rounded-[2.5rem] p-10 border-none shadow-2xl bg-white">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-600 rounded-xl">
                <Wand2 className="text-white w-5 h-5" />
              </div>
              <DialogTitle className="text-2xl font-black text-slate-900 uppercase tracking-tighter leading-none pt-1">
                New <span className="text-purple-600">Architecture</span>
              </DialogTitle>
            </div>
            <DialogDescription className="text-slate-500 font-medium text-xs uppercase tracking-widest leading-relaxed">
              Define the title of your next professional milestone.
            </DialogDescription>
          </DialogHeader>

          <div className="py-8">
            <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1 mb-3 block">
              Resume Title / Role Name
            </label>
            <Input
              id="title"
              placeholder="Ex: Senior Full Stack Developer"
              className="h-14 rounded-2xl border-none bg-slate-50 focus:bg-white focus:ring-8 focus:ring-purple-600/5 transition-all font-bold text-slate-700"
              value={resumetitle}
              onChange={(e) => setResumetitle(e.target.value)}
              autoFocus
            />
          </div>

          <div className="flex flex-col gap-3">
            <Button 
              onClick={createResume} 
              disabled={!resumetitle.trim() || loading}
              className="w-full h-14 rounded-2xl bg-slate-900 text-white hover:bg-purple-600  font-black uppercase text-xs tracking-[0.2em] shadow-xl transition-all flex items-center justify-center gap-3"
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
              className="w-full rounded-2xl h-12 font-bold text-slate-400 hover:text-slate-600 text-[10px] uppercase tracking-widest"
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