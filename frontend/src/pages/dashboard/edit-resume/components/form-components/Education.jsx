import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LoaderCircle, GraduationCap, Plus, Minus, Calendar, Award, Save } from "lucide-react";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { updateThisResume } from "@/Services/resumeAPI";
import { motion, AnimatePresence } from "framer-motion";

const formFields = {
  universityName: "",
  degree: "",
  major: "",
  grade: "",
  gradeType: "CGPA",
  startDate: "",
  endDate: "",
  description: "",
};

function Education({ resumeInfo, enanbledNext }) {
  const [educationalList, setEducationalList] = useState(
    resumeInfo?.education?.length > 0 ? resumeInfo.education : [{ ...formFields }]
  );
  const { resume_id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(addResumeData({ ...resumeInfo, education: educationalList }));
  }, [educationalList, dispatch]);

  const AddNewEducation = () => {
    setEducationalList([...educationalList, { ...formFields }]);
  };

  const RemoveEducation = () => {
    if (educationalList.length > 1) {
      setEducationalList(educationalList.slice(0, -1));
    }
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...educationalList];
    list[index] = { ...list[index], [name]: value };
    setEducationalList(list);
  };

  const onSave = async () => {
    setLoading(true);
    const data = { data: { education: educationalList } };
    
    if (resume_id) {
      try {
        await updateThisResume(resume_id, data);
        toast.success("Academic achievements updated!");
        if (enanbledNext) enanbledNext(true);
      } catch (error) {
        toast.error("Failed to save education details.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="p-8 bg-white shadow-xl rounded-[2.5rem] border border-slate-100 mt-10 relative overflow-hidden">
      {/* 1. HEADER */}
      <div className="mb-10 flex justify-between items-start">
        <div>
          <h2 className="font-black text-2xl text-slate-900 flex items-center gap-2 tracking-tighter uppercase">
            <GraduationCap className="text-purple-600 w-6 h-6" />
            Academic <span className="text-purple-600">Background</span>
          </h2>
          <p className="text-slate-500 text-xs font-medium uppercase tracking-widest mt-1">
            Share your educational qualifications and honors
          </p>
        </div>
      </div>

      {/* 2. EDUCATION LIST */}
      <div className="space-y-8">
        <AnimatePresence>
          {educationalList.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 rounded-[2rem] bg-slate-50/50 border border-slate-100 space-y-6 relative hover:bg-white hover:border-purple-200 transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-purple-600 bg-purple-50 px-4 py-1.5 rounded-full border border-purple-100">
                  Qualification {index + 1}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-full space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Institution Name</label>
                  <Input
                    name="universityName"
                    placeholder="Ex: University of Oxford"
                    className="h-12 rounded-xl border-slate-100 bg-white focus:ring-8 focus:ring-purple-600/5 focus:border-purple-600/20 transition-all font-bold"
                    onChange={(e) => handleChange(e, index)}
                    defaultValue={item?.universityName}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Degree Type</label>
                  <Input
                    name="degree"
                    placeholder="Ex: Master of Arts"
                    className="h-12 rounded-xl border-slate-100 bg-white focus:ring-8 focus:ring-purple-600/5 transition-all"
                    onChange={(e) => handleChange(e, index)}
                    defaultValue={item?.degree}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Major / Field of Study</label>
                  <Input
                    name="major"
                    placeholder="Ex: Business Administration"
                    className="h-12 rounded-xl border-slate-100 bg-white focus:ring-8 focus:ring-purple-600/5 transition-all"
                    onChange={(e) => handleChange(e, index)}
                    defaultValue={item?.major}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2 ml-1">
                    <Calendar className="w-3 h-3 text-purple-600" /> Start Date
                  </label>
                  <Input
                    type="date"
                    name="startDate"
                    className="h-12 rounded-xl border-slate-100 bg-white focus:ring-8 focus:ring-purple-600/5 transition-all"
                    onChange={(e) => handleChange(e, index)}
                    defaultValue={item?.startDate}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2 ml-1">
                    <Calendar className="w-3 h-3 text-purple-600" /> Graduation Date
                  </label>
                  <Input
                    type="date"
                    name="endDate"
                    className="h-12 rounded-xl border-slate-100 bg-white focus:ring-8 focus:ring-purple-600/5 transition-all"
                    onChange={(e) => handleChange(e, index)}
                    defaultValue={item?.endDate}
                  />
                </div>

                <div className="col-span-full space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2 ml-1">
                    <Award className="w-3 h-3 text-purple-600" /> Final Result / Grade
                  </label>
                  <div className="flex gap-4">
                    <select
                      name="gradeType"
                      className="bg-white border border-slate-100 text-slate-700 text-sm rounded-xl px-4 h-12 focus:ring-8 focus:ring-purple-600/5 outline-none transition-all"
                      onChange={(e) => handleChange(e, index)}
                      value={item?.gradeType}
                    >
                      <option value="CGPA">CGPA</option>
                      <option value="GPA">GPA</option>
                      <option value="Percentage">Percentage</option>
                    </select>
                    <Input
                      name="grade"
                      placeholder="Ex: 3.9"
                      className="h-12 rounded-xl border-slate-100 bg-white focus:ring-8 focus:ring-purple-600/5 transition-all flex-1"
                      onChange={(e) => handleChange(e, index)}
                      defaultValue={item?.grade}
                    />
                  </div>
                </div>

                <div className="col-span-full space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Key Achievements / Honors</label>
                  <Textarea
                    name="description"
                    placeholder="Mention specific awards, scholarships, or research projects..."
                    className="rounded-2xl border-slate-100 bg-white min-h-[100px] p-4 focus:ring-8 focus:ring-purple-600/5 transition-all leading-relaxed"
                    onChange={(e) => handleChange(e, index)}
                    defaultValue={item?.description}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* 3. FOOTER CONTROLS */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-12 pt-8 border-t border-slate-50 gap-6">
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={AddNewEducation}
            className="h-12 rounded-2xl border-slate-200 text-slate-600 hover:bg-slate-50 font-bold px-6 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Education
          </Button>
          <Button
            variant="ghost"
            onClick={RemoveEducation}
            className="h-12 rounded-2xl text-slate-400 hover:text-red-500 hover:bg-red-50 font-bold px-6"
            disabled={educationalList.length <= 1}
          >
            <Minus className="w-4 h-4" /> Remove Last
          </Button>
        </div>
        
        <Button 
          disabled={loading} 
          onClick={onSave}
          className="w-full sm:w-auto bg-slate-900 hover:bg-purple-600 text-white rounded-2xl px-12 h-14 font-black uppercase text-xs tracking-widest shadow-xl transition-all active:scale-95 flex items-center gap-3"
        >
          {loading ? <LoaderCircle className="animate-spin w-5 h-5" /> : (
             <>
               <Save className="w-4 h-4" />
               Save Progress
             </>
          )}
        </Button>
      </div>
    </div>
  );
}

export default Education;