import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LoaderCircle, GraduationCap, Plus, Minus, Calendar, Award } from "lucide-react";
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
    resumeInfo?.education || [{ ...formFields }]
  );
  const { resume_id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Sync with Redux for real-time Live Preview updates 
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
    if (educationalList.length === 0) {
      return toast.error("At least one educational record is mandatory.");
    }
    setLoading(true);
    
    const data = { data: { education: educationalList } };
    
    if (resume_id) {
      try {
        await updateThisResume(resume_id, data);
        toast.success("Academic Profile Synced Successfully");
        if (enanbledNext) enanbledNext(true);
      } catch (error) {
        toast.error(`Sync Failed: ${error.message}`);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="p-8 bg-white shadow-xl rounded-2xl border-t-4 border-t-blue-500 border border-slate-100 mt-10">
      <div className="mb-6">
        <h2 className="font-black text-2xl text-slate-900 flex items-center gap-2">
          <GraduationCap className="text-blue-500 w-6 h-6" />
          Academic Background
        </h2>
        <p className="text-slate-500 font-medium">
          Document your educational journey for the **AI Architect** to analyze.
        </p>
      </div>

      <div className="space-y-6">
        <AnimatePresence>
          {educationalList.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-xl border border-slate-200 bg-slate-50/50 space-y-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-black uppercase tracking-widest text-slate-400 bg-white px-3 py-1 rounded-full border border-slate-100 shadow-sm">
                  Institution {index + 1}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-full space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400 px-1">University / School Name</label>
                  <Input
                    name="universityName"
                    placeholder="e.g. Rajasthan Technical University"
                    className="rounded-xl border-slate-200 focus:ring-2 focus:ring-blue-400/20"
                    onChange={(e) => handleChange(e, index)}
                    defaultValue={item?.universityName}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400 px-1">Degree</label>
                  <Input
                    name="degree"
                    placeholder="e.g. Bachelor of Technology"
                    className="rounded-xl border-slate-200"
                    onChange={(e) => handleChange(e, index)}
                    defaultValue={item?.degree}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400 px-1">Major / Specialization</label>
                  <Input
                    name="major"
                    placeholder="e.g. Computer Science"
                    className="rounded-xl border-slate-200"
                    onChange={(e) => handleChange(e, index)}
                    defaultValue={item?.major}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1 px-1">
                    <Calendar className="w-3 h-3" /> Start Date
                  </label>
                  <Input
                    type="date"
                    name="startDate"
                    className="rounded-xl border-slate-200"
                    onChange={(e) => handleChange(e, index)}
                    defaultValue={item?.startDate}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1 px-1">
                    <Calendar className="w-3 h-3" /> End Date
                  </label>
                  <Input
                    type="date"
                    name="endDate"
                    className="rounded-xl border-slate-200"
                    onChange={(e) => handleChange(e, index)}
                    defaultValue={item?.endDate}
                  />
                </div>

                <div className="col-span-full space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1 px-1">
                    <Award className="w-3 h-3" /> Grade / Result
                  </label>
                  <div className="flex gap-3">
                    <select
                      name="gradeType"
                      className="bg-white border border-slate-200 text-slate-700 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                      onChange={(e) => handleChange(e, index)}
                      value={item?.gradeType}
                    >
                      <option value="CGPA">CGPA</option>
                      <option value="GPA">GPA</option>
                      <option value="Percentage">Percentage</option>
                    </select>
                    <Input
                      name="grade"
                      placeholder="e.g. 8.5"
                      className="rounded-xl border-slate-200"
                      onChange={(e) => handleChange(e, index)}
                      defaultValue={item?.grade}
                    />
                  </div>
                </div>

                <div className="col-span-full space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400 px-1">Description / Honors</label>
                  <Textarea
                    name="description"
                    placeholder="Briefly describe your focus or key achievements..."
                    className="rounded-xl border-slate-200 min-h-[100px]"
                    onChange={(e) => handleChange(e, index)}
                    defaultValue={item?.description}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-8 pt-6 border-t border-slate-100 gap-4">
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={AddNewEducation}
            className="rounded-xl border-slate-200 text-blue-600 hover:bg-blue-50 font-bold flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Education
          </Button>
          <Button
            variant="ghost"
            onClick={RemoveEducation}
            className="rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 font-bold flex items-center gap-2"
            disabled={educationalList.length <= 1}
          >
            <Minus className="w-4 h-4" /> Remove
          </Button>
        </div>
        
        <Button 
          disabled={loading} 
          onClick={onSave}
          className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white rounded-xl px-10 py-6 font-bold shadow-lg transition-all active:scale-95"
        >
          {loading ? <LoaderCircle className="animate-spin" /> : "Sync Academic Profile"}
        </Button>
      </div>
    </div>
  );
}

export default Education;