import React from "react";

function ExperiencePreview({ resumeInfo }) {
  const themeColor = resumeInfo?.themeColor || "#000000";

  return (
    <div className="my-6">
      {/* Section Header */}
      {resumeInfo?.experience?.length > 0 && (
        <div className="mb-3">
          <h2
            className="text-center font-black text-sm uppercase tracking-wider"
            style={{ color: themeColor }}
          >
            Professional Experience
          </h2>
          <hr
            className="border-[1.5px] mt-1"
            style={{ borderColor: themeColor }}
          />
        </div>
      )}

      {/* Experience List */}
      <div className="space-y-4">
        {resumeInfo?.experience?.map((experience, index) => (
          <div key={index} className="leading-relaxed">
            <div className="flex justify-between items-baseline">
              <h3
                className="text-sm font-bold uppercase"
                style={{ color: themeColor }}
              >
                {experience?.title}
              </h3>
              <span className="text-[11px] font-semibold text-slate-700">
                {experience?.startDate} 
                {experience?.startDate ? " — " : ""} 
                {experience?.currentlyWorking ? "Present" : experience?.endDate}
              </span>
            </div>

            <div className="text-[11px] font-medium text-slate-600 italic">
              {experience?.companyName}
              {experience?.companyName && (experience?.city || experience?.state) ? ", " : ""}
              {experience?.city}
              {experience?.city && experience?.state ? ", " : ""}
              {experience?.state}
            </div>

            {/* AI-Generated Work Summary (Rich Text) */}
            <div
              className="text-[11px] mt-2 text-slate-700 preview-rich-text leading-snug"
              dangerouslySetInnerHTML={{ __html: experience?.workSummary }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExperiencePreview;