import React from "react";

function PersonalDeatailPreview({ resumeInfo }) {
  const themeColor = resumeInfo?.themeColor || "#000000";

  return (
    <div className="text-center">
      {/* Full Name: High Authority Header */}
      <h1
        className="font-black text-2xl uppercase tracking-tighter"
        style={{ color: themeColor }}
      >
        {resumeInfo?.firstName} {resumeInfo?.lastName}
      </h1>

      {/* Professional Target */}
      <p className="text-sm font-bold text-slate-800 mt-1 uppercase tracking-widest">
        {resumeInfo?.jobTitle || "Professional Developer"}
      </p>

      {/* Contact & Professional Links Container */}
      <div className="mt-3 flex flex-wrap justify-center items-center gap-x-4 gap-y-1 text-[11px] font-medium text-slate-600">
        {resumeInfo?.address && (
          <span className="flex items-center">{resumeInfo?.address}</span>
        )}
        
        {resumeInfo?.phone && (
          <span className="flex items-center gap-1">
            <span style={{ color: themeColor }}>•</span> {resumeInfo?.phone}
          </span>
        )}

        {resumeInfo?.email && (
          <span className="flex items-center gap-1">
            <span style={{ color: themeColor }}>•</span> {resumeInfo?.email}
          </span>
        )}

        {/* Dynamic Professional Links (Essential for MERN Devs) */}
        {resumeInfo?.github && (
          <span className="flex items-center gap-1">
            <span style={{ color: themeColor }}>•</span> GitHub
          </span>
        )}
        
        {resumeInfo?.linkedin && (
          <span className="flex items-center gap-1">
            <span style={{ color: themeColor }}>•</span> LinkedIn
          </span>
        )}
      </div>

      {/* Visual Separator */}
      <hr
        className="border-[1.5px] mt-4 mb-2"
        style={{ borderColor: themeColor }}
      />
    </div>
  );
}

export default PersonalDeatailPreview;