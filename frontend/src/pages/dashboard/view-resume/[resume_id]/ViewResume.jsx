import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getResumeData } from "@/Services/resumeAPI";
import ResumePreview from "../../edit-resume/components/PreviewPage";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { RWebShare } from "react-web-share";
import { toast } from "sonner";
import { Download, Share2, Rocket } from "lucide-react";

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
      toast.error("Failed to fetch Architect data");
    }
  };

  const HandleDownload = () => {
  // 1. Check if the ID exists
  if (!resume_id) {
    return toast.error("Invalid Resume ID");
  }

  // 2. Build the URL. 
  // Make sure you use a string template and check the variable name in your .env
  const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
  const downloadUrl = `${baseUrl}/api/resume/download/${resume_id}`;

  toast.info("AI Architect is rendering your PDF...");

  // 3. Use window.open or window.location.assign to prevent React Router 
  // from thinking this is an internal page route.
  window.open(downloadUrl, "_blank");
};

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* HEADER SECTION: Hidden during print via 'print:hidden' */}
      <div id="noPrint" className="print:hidden">
        <div className="my-10 mx-10 md:mx-20 lg:mx-36 text-center">
          <div className="inline-flex items-center justify-center p-3 mb-4 rounded-xl bg-green-100 shadow-sm">
            <Rocket className="text-green-600 w-6 h-6" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Architect Profile Initialized!
          </h2>
          <p className="text-slate-500 font-medium mt-2">
            Your AI-optimized identity is ready for deployment.
          </p>

          <div className="flex justify-center gap-6 my-10">
            <Button 
              onClick={HandleDownload} 
              className="bg-slate-900 hover:bg-slate-800 text-white px-8 rounded-xl flex gap-2 font-bold shadow-lg transition-all active:scale-95"
            >
              <Download className="w-4 h-4" /> Download PDF
            </Button>
            
            <RWebShare
              data={{
                text: "Check out my AI-optimized resume architected on CareerForge Pro",
                url: window.location.href,
                title: "CareerForge Pro Resume",
              }}
              onClick={() => toast.success("Deployment Link Shared!")}
            >
              <Button variant="outline" className="rounded-xl border-slate-200 flex gap-2 font-bold px-8">
                <Share2 className="w-4 h-4" /> Share URL
              </Button>
            </RWebShare>
          </div>
        </div>
      </div>

      {/* RESUME AREA: Centered A4 container */}
      <div className="flex justify-center">
        <div 
          id="pdf-content"
          className="bg-white shadow-2xl print:shadow-none transition-all duration-300"
          style={{ 
            width: "210mm", 
            minHeight: "297mm",
            // Ensuring Puppeteer sees the exact right scale
          }}
        >
          <ResumePreview />
        </div>
      </div>
    </div>
  );
}

export default ViewResume;