import React from "react";

function ProjectPreview({ resumeInfo }) {
  const themeColor = resumeInfo?.themeColor || "#1e293b";

  // Hide section if no projects exist
  if (!resumeInfo?.projects || resumeInfo?.projects?.length === 0) return null;

  return (
    <div className="my-6">
      {/* 1. SECTION HEADER: Left-aligned for universal professional authority */}
      <div className="mb-3">
        <h2
          className="font-bold text-[13px] uppercase tracking-wider"
          style={{ color: themeColor }}
        >
          Selected Projects
        </h2>
        <hr
          className="border-[1.5px] mt-1"
          style={{ borderColor: themeColor }}
        />
      </div>

      {/* 2. PROJECT LIST */}
      <div className="space-y-5">
        {resumeInfo?.projects?.map((project, index) => (
          <div key={index} className="leading-relaxed">
            <div className="flex justify-between items-baseline">
              <h3
                className="text-[12px] font-bold"
                style={{ color: themeColor }}
              >
                {project?.projectName}
              </h3>
            </div>

            {/* 3. TECH STACK / TOOLS: Formatted as a subtle sub-header */}
            {project?.techStack && (
              <div className="text-[11px] font-semibold text-slate-700 mt-0.5">
                <span className="italic font-medium text-slate-500">Core Tools: </span>
                {project.techStack.split(",").map((tech, i) => (
                  <React.Fragment key={i}>
                    {tech.trim()}
                    {i < project.techStack.split(",").length - 1 ? " | " : ""}
                  </React.Fragment>
                ))}
              </div>
            )}

            {/* 4. CONTENT AREA: Structured for high-impact readability */}
            <div
              className="text-[11px] mt-2 text-slate-800 preview-rich-text custom-bullet-list"
              dangerouslySetInnerHTML={{ __html: project?.projectSummary }}
              style={{
                // Ensure the list has proper spacing for both humans and ATS
                lineHeight: "1.6",
              }}
            />
          </div>
        ))}
      </div>

      {/* Internal CSS for consistent rich-text rendering */}
      <style jsx>{`
        .custom-bullet-list :global(ul) {
          list-style-type: disc;
          margin-left: 1.2rem;
        }
        .custom-bullet-list :global(li) {
          margin-bottom: 0.2rem;
        }
      `}</style>
    </div>
  );
}

export default ProjectPreview;