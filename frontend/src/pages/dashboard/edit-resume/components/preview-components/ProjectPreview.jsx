import React from "react";

function ProjectPreview({ resumeInfo }) {
  const themeColor = resumeInfo?.themeColor || "#000000";

  return (
    <div className="my-6">
      {/* Section Header */}
      {resumeInfo?.projects?.length > 0 && (
        <div className="mb-3">
          <h2
            className="text-center font-black text-sm uppercase tracking-wider"
            style={{ color: themeColor }}
          >
            Technical Projects
          </h2>
          <hr
            className="border-[1.5px] mt-1"
            style={{ borderColor: themeColor }}
          />
        </div>
      )}

      {/* Project List */}
      <div className="space-y-4">
        {resumeInfo?.projects?.map((project, index) => (
          <div key={index} className="leading-relaxed">
            <div className="flex justify-between items-baseline">
              <h3
                className="text-sm font-bold uppercase"
                style={{ color: themeColor }}
              >
                {project?.projectName}
              </h3>
            </div>

            {/* Tech Stack: Formatted for scannability */}
            {project?.techStack && (
              <div className="text-[11px] font-bold text-slate-700 mt-0.5">
                <span className="italic font-medium text-slate-500">Technologies: </span>
                {project.techStack.split(",").map((tech, i) => (
                  <React.Fragment key={i}>
                    {tech.trim()}
                    {i < project.techStack.split(",").length - 1 ? " • " : ""}
                  </React.Fragment>
                ))}
              </div>
            )}

            {/* AI-Generated Project Summary (Rich Text) */}
            <div
              className="text-[11px] mt-2 text-slate-700 preview-rich-text leading-snug"
              dangerouslySetInnerHTML={{ __html: project?.projectSummary }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectPreview;