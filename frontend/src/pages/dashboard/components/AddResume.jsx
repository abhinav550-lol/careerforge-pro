import React, { useState } from "react";
import { Plus, Loader2, Sparkles, Wand2 } from "lucide-react";
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
        themeColor: "#9333ea", // CareerForge Brand Purple
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
      {/* 1. UNIVERSAL ADD CARD */}
      <motion.div
        whileHover={{ y: -5, scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className="p-10 py-20 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 bg-white rounded-[2.5rem] h-[380px] cursor-pointer hover:border-purple-600 hover:bg-purple-50/30 transition-all group shadow-sm"
        onClick={() => setOpenDialog(true)}
      >
        <div className="bg-slate-50 p-6 rounded-full group-hover:bg-purple-600 group-hover:rotate-90 transition-all duration-300 shadow-sm">
          <Plus className="text-slate-400 group-hover:text-white transition-colors w-8 h-8" />
        </div>
        <p className="mt-6 font-black uppercase text-xs tracking-[0.2em] text-slate-400 group-hover:text-purple-600 transition-colors">
          Create New Profile
        </p>
      </motion.div>

      {/* 2. CREATION DIALOG */}
      <Dialog open={isDialogOpen} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[425px] rounded-[2.5rem] p-10 border-none shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] bg-white">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-1">
              <Wand2 className="text-purple-600 w-5 h-5" />
              <DialogTitle className="text-2xl font-black text-slate-900 uppercase tracking-tighter">
                Start Your <span className="text-purple-600">Profile</span>
              </DialogTitle>
            </div>
            <DialogDescription className="text-slate-500 font-medium text-sm leading-relaxed">
              Give your professional resume a title. Our **Smart Assistant** will help you optimize it for your next big role.
            </DialogDescription>
          </DialogHeader>

          <div className="py-6">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-2 block">
              Resume Title
            </label>
            <Input
              id="title"
              placeholder="Ex: Marketing Manager or Staff Nurse"
              className="h-12 rounded-2xl border-none bg-slate-50 focus:bg-white focus:ring-8 focus:ring-purple-600/5 transition-all font-bold text-slate-700"
              value={resumetitle}
              onChange={(e) => setResumetitle(e.target.value)}
              autoFocus
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button 
              variant="ghost" 
              className="rounded-2xl h-12 px-6 font-bold text-slate-400 hover:text-slate-600"
              onClick={() => setOpenDialog(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={createResume} 
              disabled={!resumetitle.trim() || loading}
              className="rounded-2xl bg-slate-900 text-white hover:bg-purple-600 h-12 px-8 font-black uppercase text-[10px] tracking-widest shadow-xl shadow-slate-100 transition-all flex items-center gap-2"
            >
              {loading ? (
                <Loader2 className="animate-spin w-4 h-4" />
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  Begin Journey
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddResume;