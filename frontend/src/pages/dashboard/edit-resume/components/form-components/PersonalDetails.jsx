import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { LoaderCircle, User, MapPin, Phone, Mail, Briefcase, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { updateThisResume } from "@/Services/resumeAPI";
import { motion } from "framer-motion";

function PersonalDetails({ resumeInfo, enanbledNext }) {
  const { resume_id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    if (enanbledNext) enanbledNext(false); 
    const { name, value } = e.target;
    
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
        await updateThisResume(resume_id, data);
        toast.success("Profile updated successfully");
        if (enanbledNext) enanbledNext(true);
      } catch (error) {
        toast.error("Failed to update profile");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-10 bg-white shadow-2xl rounded-[2.5rem] border border-slate-100 mt-10 relative overflow-hidden"
    >
      {/* Background Subtle Accent */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-slate-50 rounded-full -mr-20 -mt-20 z-0" />

      <div className="mb-10 relative z-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-slate-900 rounded-xl">
            <User className="text-white w-5 h-5" />
          </div>
          <h2 className="font-black text-2xl text-slate-900 uppercase tracking-tighter">
            Personal <span className="text-purple-600">Information</span>
          </h2>
        </div>
        <p className="text-slate-500 text-xs font-medium uppercase tracking-widest">
          Foundational details for your professional profile.
        </p>
      </div>

      <form onSubmit={onSave} className="space-y-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">First Name</label>
            <Input
              name="firstName"
              placeholder="Ex: Jane"
              defaultValue={resumeInfo?.firstName}
              required
              onChange={handleInputChange}
              className="h-12 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-8 focus:ring-purple-600/5 focus:border-purple-600/20 transition-all"
            />
          </div>

          {/* Last Name */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Last Name</label>
            <Input
              name="lastName"
              placeholder="Ex: Doe"
              defaultValue={resumeInfo?.lastName}
              required
              onChange={handleInputChange}
              className="h-12 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-8 focus:ring-purple-600/5 focus:border-purple-600/20 transition-all"
            />
          </div>

          {/* Job Title */}
          <div className="col-span-full space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1 flex items-center gap-2">
              <Briefcase className="w-3 h-3 text-purple-600" /> Current or Target Role
            </label>
            <Input
              name="jobTitle"
              placeholder="Ex: Marketing Manager or Staff Nurse"
              defaultValue={resumeInfo?.jobTitle}
              onChange={handleInputChange}
              className="h-12 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-8 focus:ring-purple-600/5 focus:border-purple-600/20 transition-all font-bold text-slate-700"
            />
          </div>

          {/* Address */}
          <div className="col-span-full space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1 flex items-center gap-2">
              <MapPin className="w-3 h-3 text-purple-600" /> Location
            </label>
            <Input
              name="address"
              placeholder="Ex: London, UK or Remote"
              defaultValue={resumeInfo?.address}
              required
              onChange={handleInputChange}
              className="h-12 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-8 focus:ring-purple-600/5 focus:border-purple-600/20 transition-all"
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1 flex items-center gap-2">
              <Phone className="w-3 h-3 text-purple-600" /> Phone Number
            </label>
            <Input
              name="phone"
              type="tel"
              placeholder="+44 20 7946 0000"
              defaultValue={resumeInfo?.phone}
              required
              onChange={handleInputChange}
              className="h-12 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-8 focus:ring-purple-600/5 focus:border-purple-600/20 transition-all"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1 flex items-center gap-2">
              <Mail className="w-3 h-3 text-purple-600" /> Email Address
            </label>
            <Input
              name="email"
              type="email"
              placeholder="jane.doe@example.com"
              defaultValue={resumeInfo?.email}
              required
              onChange={handleInputChange}
              className="h-12 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-8 focus:ring-purple-600/5 focus:border-purple-600/20 transition-all"
            />
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t border-slate-50">
          <Button 
            type="submit" 
            disabled={loading}
            className="bg-slate-900 text-white hover:bg-purple-600 rounded-2xl px-12 h-14 font-black uppercase text-xs tracking-widest shadow-xl shadow-slate-200 transition-all active:scale-95 flex items-center gap-2"
          >
            {loading ? <LoaderCircle className="animate-spin" /> : (
              <>
                <ShieldCheck className="w-4 h-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </form>
    </motion.div>
  );
}

export default PersonalDetails;