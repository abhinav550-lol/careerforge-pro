import React from "react";

function SkillsPreview({ resumeInfo }) {
  const themeColor = resumeInfo?.themeColor || "#000000";

  return (
    <div className="my-6">
      {/* Section Header */}
      {resumeInfo?.skills?.length > 0 && (
        <div className="mb-3">
          <h2
            className="text-center font-black text-sm uppercase tracking-wider"
            style={{ color: themeColor }}
          >
            Technical Proficiency
          </h2>
          <hr
            className="border-[1.5px] mt-1"
            style={{ borderColor: themeColor }}
          />
        </div>
      )}

      {/* Skills Grid */}
      <div className="grid grid-cols-2 gap-x-10 gap-y-3 mt-4">
        {resumeInfo?.skills.map((skill, index) => (
          <div key={index} className="flex items-center justify-between">
            {/* Skill Name */}
            <h2 className="text-[11px] font-bold text-slate-700 uppercase">
              {skill.name}
            </h2>

            {/* Proficiency Bar: Professional Minimalist Style */}
            {skill.name && (
              <div className="h-1.5 bg-slate-100 w-24 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    backgroundColor: themeColor,
                    width: skill?.rating * 20 + "%",
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkillsPreview;