import React from 'react';
import { useSelector } from 'react-redux';
import ModernTemplate from './templates/ModernTemplate';
import ProfessionalTemplate from './templates/ProfessionalTemplate';

function PreviewPage() {
  const resumeInfo = useSelector((state) => state.editResume.resumeData);
  
  // Later, this will come from resumeInfo.templateId
  const selectedTemplate = resumeInfo?.templateId || 'modern'; 

  return (
    <div className="preview-container h-full">
      {selectedTemplate === 'modern' ? (
        <ModernTemplate resumeInfo={resumeInfo} />
      ) : (
        <ProfessionalTemplate resumeInfo={resumeInfo} />
      )}
    </div>
  );
}

export default PreviewPage;