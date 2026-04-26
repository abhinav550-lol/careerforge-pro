import React from "react";

function SummaryPreview({ resumeInfo }) {
  // Defensive check to ensure we don't render an empty section
  if (!resumeInfo?.summary) return null;

  return (
    <div className="mt-4">
      {/* High-quality typographic lead-in */}
      <p 
        className="text-[11px] leading-relaxed text-slate-800 text-justify"
        style={{
          // Optional: slight left border in theme color for visual flair
          // borderLeft: `2px solid ${resumeInfo?.themeColor || '#000'}`,
          // paddingLeft: '10px'
        }}
      >
        {resumeInfo?.summary}
      </p>
    </div>
  );
}

export default SummaryPreview;