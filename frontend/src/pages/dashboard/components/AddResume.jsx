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
    setLoading(true);
    if (!resumetitle.trim()) return;

    // AI-MERN Hybrid Role: Data + AI Memory Initialization [cite: 17]
    const data = {
      data: {
        title: resumetitle,
        themeColor: "#22c55e", // CareerForge Brand Green
      },
    };

    try {
      const res = await createNewResume(data);
      // Navigate to the AI-MERN Hybrid edit suite [cite: 14, 15]
      navigate(`/dashboard/edit-resume/${res.data.resume._id}`);
    } catch (error) {
      console.error("AI Architect initialization failed:", error.message);
    } finally {
      setLoading(false);
      setResumetitle("");
      setOpenDialog(false);
    }
  };

  return (
    <>
      {/* SaaS Style Add Card */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="p-14 py-24 flex flex-col items-center justify-center border-2 border-dashed border-slate-300 bg-white rounded-2xl h-[380px] cursor-pointer hover:border-green-500 hover:bg-green-50/30 transition-all group shadow-sm"
        onClick={() => setOpenDialog(true)}
      >
        <div className="bg-slate-100 p-4 rounded-full group-hover:bg-green-100 transition-colors">
          <Plus className="text-slate-400 group-hover:text-green-600 transition-colors w-8 h-8" />
        </div>
        <p className="mt-4 font-bold text-slate-500 group-hover:text-green-700">New AI Architect</p>
      </motion.div>

      <Dialog open={isDialogOpen} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[425px] rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-slate-900 flex items-center gap-2">
              <Wand2 className="text-purple-500 w-5 h-5" />
              Initialize AI Architect
            </DialogTitle>
            <DialogDescription className="text-slate-500 font-medium">
              Give your new project a title. Our **Agentic Systems** will help you optimize it for ATS compliance[cite: 13, 71].
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <Input
              id="title"
              placeholder="Ex: Senior MERN Developer Resume"
              className="col-span-3 rounded-xl border-slate-200 focus:ring-2 focus:ring-green-400/20"
              value={resumetitle}
              onChange={(e) => setResumetitle(e.target.value)}
              autoFocus
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button 
              variant="ghost" 
              className="rounded-xl"
              onClick={() => setOpenDialog(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={createResume} 
              disabled={!resumetitle.trim() || loading}
              className="rounded-xl bg-slate-900 text-white hover:bg-slate-800 flex items-center gap-2 px-6"
            >
              {loading ? (
                <Loader2 className="animate-spin w-4 h-4" />
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-green-400" />
                  Start Building
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