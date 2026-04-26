import React from "react";

function EducationalPreview({ resumeInfo }) {
  const themeColor = resumeInfo?.themeColor || "#000000";

  return (
    <div className="my-6">
      {/* Section Header */}
      {resumeInfo?.education?.length > 0 && (
        <div className="mb-3">
          <h2
            className="text-center font-black text-sm uppercase tracking-wider"
            style={{ color: themeColor }}
          >
            Education
          </h2>
          <hr
            className="border-[1.5px] mt-1"
            style={{ borderColor: themeColor }}
          />
        </div>
      )}

      {/* Education List */}
      <div className="space-y-4">
        {resumeInfo?.education?.map((education, index) => (
          <div key={index} className="leading-relaxed">
            <div className="flex justify-between items-baseline">
              <h3
                className="text-sm font-bold uppercase"
                style={{ color: themeColor }}
              >
                {education?.universityName}
              </h3>
              <span className="text-[11px] font-semibold text-slate-700">
                {education?.startDate} 
                {education?.startDate && education?.endDate ? " — " : ""} 
                {education?.endDate}
              </span>
            </div>

            <div className="flex justify-between items-center text-[11px] italic text-slate-600">
              <span>
                {education?.degree}
                {education?.degree && education?.major ? " in " : ""}
                {education?.major}
              </span>
              {education?.grade && (
                <span className="font-bold not-italic">
                  {education?.gradeType}: {education?.grade}
                </span>
              )}
            </div>

            {education?.description && (
              <p className="text-[11px] mt-1.5 text-slate-700 whitespace-pre-line leading-snug">
                {education?.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default EducationalPreview;