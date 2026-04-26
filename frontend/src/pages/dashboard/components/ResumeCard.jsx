import { FaEye, FaEdit, FaTrashAlt, FaSpinner, FaRobot, FaChartLine } from "react-icons/fa";
import React, { useMemo } from "react";
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
  "from-slate-900 to-slate-800", // CareerForge Professional
  "from-green-600 to-emerald-500", // Success/Growth
  "from-indigo-600 to-purple-600", // AI/Innovation
];

function ResumeCard({ resume, refreshData }) {
  const [loading, setLoading] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const navigate = useNavigate();

  // Ensuring professional branding consistency 
  const gradient = useMemo(() => gradients[Math.floor(Math.random() * gradients.length)], []);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteThisResume(resume._id);
      toast.success("Project archived successfully");
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
      whileHover={{ y: -5 }}
      className={`group relative p-[2px] rounded-2xl bg-gradient-to-br ${gradient} shadow-lg hover:shadow-xl transition-all`}
    >
      <div className="bg-white rounded-[14px] h-full flex flex-col justify-between overflow-hidden">
        {/* Project Header [cite: 90] */}
        <div className={`p-6 bg-gradient-to-r ${gradient} text-white`}>
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-white/20 backdrop-blur-md rounded-lg">
              <FaRobot className="text-xl text-white" />
            </div>
            {/* ATS Score Placeholder as per PRD Week 2  */}
            <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-2 py-1 rounded text-xs font-bold">
              <FaChartLine />
              <span>ATS: 85%</span>
            </div>
          </div>
          <h2 className="font-black text-lg line-clamp-1 uppercase tracking-tight">
            {resume.title}
          </h2>
          <p className="text-xs text-white/70 font-medium mt-1 uppercase tracking-widest">
            AI-MERN Hybrid Project
          </p>
        </div>

        {/* Action Menu [cite: 95] */}
        <div className="flex items-center justify-between p-4 bg-slate-50 border-t border-slate-100">
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(`/dashboard/view-resume/${resume._id}`)}
              className="hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors"
            >
              <FaEye />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(`/dashboard/edit-resume/${resume._id}`)}
              className="hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors"
            >
              <FaEdit />
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setOpenAlert(true)}
            className="hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
          >
            <FaTrashAlt />
          </Button>
        </div>

        {/* Confirmation Dialog */}
        <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
          <AlertDialogContent className="rounded-2xl">
            <AlertDialogHeader>
              <AlertDialogTitle>Archive this Architect project?</AlertDialogTitle>
              <AlertDialogDescription>
                This will remove the data from our **Data + AI Memory** infrastructure. This action is permanent[cite: 36].
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleDelete} 
                disabled={loading}
                className="bg-red-600 hover:bg-red-700 rounded-xl"
              >
                {loading ? <FaSpinner className="animate-spin" /> : "Confirm Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </motion.div>
  );
}

export default ResumeCard;