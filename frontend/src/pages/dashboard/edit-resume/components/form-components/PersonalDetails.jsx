import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { LoaderCircle, User, MapPin, Phone, Mail, Briefcase } from "lucide-react";
import { toast } from "sonner";
import { updateThisResume } from "@/Services/resumeAPI";

function PersonalDetails({ resumeInfo, enanbledNext }) {
  const { resume_id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    enanbledNext(false); // Disables next button until save
    const { name, value } = e.target;
    
    // UI (UX): Instantaneous updates for the split-screen Live Preview [cite: 84]
    dispatch(
      addResumeData({
        ...resumeInfo,
        [name]: value,
      })
    );
  };

  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const data = {
      data: Object.fromEntries(formData),
    };

    if (resume_id) {
      try {
        // AI-MERN Hybrid Role: Syncing Data + AI Memory [cite: 17]
        await updateThisResume(resume_id, data);
        toast.success("Architect Profile Updated");
        enanbledNext(true);
      } catch (error) {
        toast.error("Failed to sync profile");
        console.error("Profile sync error:", error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="p-8 bg-white shadow-xl rounded-2xl border border-slate-100 mt-10">
      <div className="mb-6">
        <h2 className="font-black text-2xl text-slate-900 flex items-center gap-2">
          <User className="text-green-500 w-6 h-6" />
          Personal Architect Profile
        </h2>
        <p className="text-slate-500 font-medium">
          Foundational identity for your **CareerForge Pro** project. [cite: 68]
        </p>
      </div>

      <form onSubmit={onSave} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-400">First Name</label>
            <Input
              name="firstName"
              placeholder="Pratik"
              defaultValue={resumeInfo?.firstName}
              required
              onChange={handleInputChange}
              className="rounded-xl border-slate-200 focus:ring-2 focus:ring-green-400/20"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Last Name</label>
            <Input
              name="lastName"
              placeholder="Suthar"
              defaultValue={resumeInfo?.lastName}
              required
              onChange={handleInputChange}
              className="rounded-xl border-slate-200 focus:ring-2 focus:ring-green-400/20"
            />
          </div>
          <div className="col-span-full space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1">
              <Briefcase className="w-3 h-3" /> Target Job Title
            </label>
            <Input
              name="jobTitle"
              placeholder="Full Stack Developer // UI/UX Designer"
              defaultValue={resumeInfo?.jobTitle}
              onChange={handleInputChange}
              className="rounded-xl border-slate-200 focus:ring-2 focus:ring-green-400/20"
            />
          </div>
          <div className="col-span-full space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1">
              <MapPin className="w-3 h-3" /> Professional Address
            </label>
            <Input
              name="address"
              placeholder="Rajasthan, India"
              defaultValue={resumeInfo?.address}
              required
              onChange={handleInputChange}
              className="rounded-xl border-slate-200 focus:ring-2 focus:ring-green-400/20"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1">
              <Phone className="w-3 h-3" /> Contact Phone
            </label>
            <Input
              name="phone"
              type="tel"
              defaultValue={resumeInfo?.phone}
              required
              onChange={handleInputChange}
              className="rounded-xl border-slate-200 focus:ring-2 focus:ring-green-400/20"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1">
              <Mail className="w-3 h-3" /> Professional Email
            </label>
            <Input
              name="email"
              type="email"
              defaultValue={resumeInfo?.email}
              required
              onChange={handleInputChange}
              className="rounded-xl border-slate-200 focus:ring-2 focus:ring-green-400/20"
            />
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-50">
          <Button 
            type="submit" 
            disabled={loading}
            className="bg-slate-900 text-white hover:bg-slate-800 rounded-xl px-8 py-6 font-bold shadow-lg shadow-slate-200 transition-all active:scale-95"
          >
            {loading ? <LoaderCircle className="animate-spin" /> : "Sync Profile"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PersonalDetails;