import React, { useMemo } from "react";
import { 
  Eye, 
  Edit3, 
  Trash2, 
  Loader2, 
  Cpu, 
  BarChart3, 
  MoreHorizontal 
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteThisResume } from "@/Services/resumeAPI";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const gradients = [
  "from-slate-900 to-slate-800", 
  "from-purple-600 to-blue-600",
  "from-indigo-600 to-violet-500",
];

function ResumeCard({ resume, refreshData }) {
  const [loading, setLoading] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const navigate = useNavigate();

  // Memoizing the gradient so it doesn't change on re-renders
  const gradient = useMemo(() => gradients[Math.floor(Math.random() * gradients.length)], []);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteThisResume(resume._id);
      toast.success("Architecture successfully archived");
      refreshData();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      setOpenAlert(false);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="group relative"
    >
      <div className={`p-[1px] rounded-[2.5rem] bg-gradient-to-br ${gradient} premium-shadow`}>
        <div className="bg-white rounded-[2.4rem] h-full flex flex-col justify-between overflow-hidden">
          
          {/* Header Section */}
          <div className={`p-8 bg-gradient-to-br ${gradient} text-white relative overflow-hidden`}>
            {/* Decorative Background Pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full -mr-10 -mt-10" />
            
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div className="p-2.5 bg-white/20 backdrop-blur-xl rounded-2xl border border-white/20">
                <Cpu className="w-5 h-5 text-white" />
              </div>
              <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-xl px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20">
                <BarChart3 className="w-3 h-3" />
                <span>ATS: 85%</span>
              </div>
            </div>

            <h2 className="font-black text-xl line-clamp-1 uppercase tracking-tighter mb-1">
              {resume.title}
            </h2>
            <p className="text-[10px] text-white/60 font-black uppercase tracking-[0.2em]">
              AI-FORGED STRUCTURE
            </p>
          </div>

          {/* Action Menu */}
          <div className="flex items-center justify-between p-5 bg-white">
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="icon"
                onClick={() => navigate(`/dashboard/view-resume/${resume._id}`)}
                className="w-10 h-10 rounded-xl bg-slate-50 hover:bg-purple-50 hover:text-purple-600 transition-all border-none"
              >
                <Eye className="w-4 h-4" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                onClick={() => navigate(`/dashboard/edit-resume/${resume._id}`)}
                className="w-10 h-10 rounded-xl bg-slate-50 hover:bg-blue-50 hover:text-blue-600 transition-all border-none"
              >
                <Edit3 className="w-4 h-4" />
              </Button>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpenAlert(true)}
              className="w-10 h-10 rounded-xl hover:bg-red-50 hover:text-red-500 transition-all"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          {/* Confirmation Dialog */}
          <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
            <AlertDialogContent className="rounded-[2.5rem] border-none p-8">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-2xl font-black tracking-tight">Archive Project?</AlertDialogTitle>
                <AlertDialogDescription className="text-slate-500 font-medium">
                  This will decommission this resume architecture from your secure AI cloud. This process cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="mt-4 gap-3">
                <AlertDialogCancel className="rounded-2xl font-bold bg-slate-50 border-none">Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={handleDelete} 
                  disabled={loading}
                  className="bg-red-500 hover:bg-red-600 rounded-2xl font-bold px-8"
                >
                  {loading ? <Loader2 className="animate-spin w-4 h-4" /> : "Delete"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </motion.div>
  );
}

export default ResumeCard;