import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getResumeData } from "@/Services/resumeAPI";
import ResumePreview from "../../edit-resume/components/PreviewPage";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { RWebShare } from "react-web-share";
import { toast } from "sonner";
import { Download, Share2, PartyPopper, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

function ViewResume() {
  const { resume_id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchResumeInfo();
  }, [resume_id]);

  const fetchResumeInfo = async () => {
    try {
      const response = await getResumeData(resume_id);
      dispatch(addResumeData(response.data));
    } catch (error) {
      toast.error("Failed to load your professional profile");
    }
  };

  const HandleDownload = () => {
    if (!resume_id) {
      return toast.error("Resume reference not found");
    }

    const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
    const downloadUrl = `${baseUrl}/api/resume/download/${resume_id}`;

    toast.info("Preparing your professional PDF...");
    window.open(downloadUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 selection:bg-purple-100">
      {/* HEADER SECTION */}
      <div id="noPrint" className="print:hidden">
        <div className="my-16 mx-10 md:mx-20 lg:mx-36 text-center">
          
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center justify-center p-4 mb-6 rounded-3xl bg-purple-100 shadow-sm"
          >
            <PartyPopper className="text-purple-600 w-8 h-8" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">
              Your Career Profile is <span className="text-purple-600">Ready!</span>
            </h2>
            <div className="flex items-center justify-center gap-2 mt-3">
               <CheckCircle2 className="w-4 h-4 text-emerald-500" />
               <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em]">
                 Expert Review Passed // Optimized for Success
               </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center gap-4 mt-10"
          >
            <Button 
              onClick={HandleDownload} 
              className="bg-slate-900 hover:bg-purple-600 text-white px-10 h-14 rounded-2xl flex gap-3 font-black uppercase text-xs tracking-widest shadow-xl shadow-slate-200 transition-all active:scale-95"
            >
              <Download className="w-4 h-4" /> Download PDF
            </Button>
            
            <RWebShare
              data={{
                text: "Check out my professional resume created on CareerForge",
                url: window.location.href,
                title: "My Professional Resume",
              }}
              onClick={() => toast.success("Shared successfully!")}
            >
              <Button variant="outline" className="h-14 rounded-2xl border-slate-200 bg-white hover:bg-slate-50 text-slate-600 flex gap-3 font-black uppercase text-xs tracking-widest px-10 transition-all shadow-sm">
                <Share2 className="w-4 h-4" /> Share Profile
              </Button>
            </RWebShare>
          </motion.div>
        </div>
      </div>

      {/* RESUME AREA: Centered A4 container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="flex justify-center px-4"
      >
        <div 
          id="pdf-content"
          className="bg-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] print:shadow-none transition-all duration-300 rounded-sm overflow-hidden"
          style={{ 
            width: "210mm", 
            minHeight: "297mm",
          }}
        >
          <ResumePreview />
        </div>
      </motion.div>
    </div>
  );
}

export default ViewResume;