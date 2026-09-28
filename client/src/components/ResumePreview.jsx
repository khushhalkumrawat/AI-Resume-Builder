import React from 'react'
import ModernTemplate from '../assets/templates/ModernTemplate'
import MinimalTemplate from '../assets/templates/MinimalTemplate'
import MinimalImageTemplate from '../assets/templates/MinimalImageTemplate'
import PopularTemplate from '../assets/templates/PopularTemplate'
import StandardTemplate from '../assets/templates/StandardTemplate'
import { forwardRef } from "react";

const ResumePreview = forwardRef(({ data, template, accentColor, sectionOrder, classes = "", }, ref) => {

  const renderTemplate = () => {

    console.log("PDF/Preview template:", template);

    switch (template) {
      case "minimal":
        return <MinimalTemplate data={data} accentColor={accentColor} sectionOrder={sectionOrder} />;
      case "minimal-image":
        return <MinimalImageTemplate data={data} accentColor={accentColor} sectionOrder={sectionOrder} />;
      case "popular":
        return <PopularTemplate data={data} accentColor={accentColor} sectionOrder={sectionOrder} />
      case "modern":
        return <ModernTemplate data={data} accentColor={accentColor} sectionOrder={sectionOrder} /> 
      case "standard":
        return <StandardTemplate data={data} accentColor={accentColor} sectionOrder={sectionOrder} />  

      default:
        return <PopularTemplate data={data} accentColor={accentColor} sectionOrder={sectionOrder} />
    }
    

  }


return (
  <div
   className="w-full bg-gray-100" >
    <div ref={ref} id="resume-preview" data-template={template} className={`border border-gray-200 shadow ${classes}`}>
      {renderTemplate()}
    </div>

<style>
  {`
    @page {
      size: A4;
      margin: 0;
    }

    @media print {

  html,
  body {
    margin: 0;
    padding: 0;
    background: white !important;
  }

  body {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  body * {
    visibility: hidden;
  }

  #resume-preview,
  #resume-preview * {
    visibility: visible;
  }

  #resume-preview {
    margin: 0 !important;
    border: none !important;
    box-shadow: none !important;
  }

  #resume-preview {
    overflow: visible !important;
    height: auto !important;
  }

  #resume-preview section {
    break-inside: avoid;
    page-break-inside: avoid;
  }

  #resume-preview a {
    color: inherit;
    text-decoration: none;
  }
}

      /* Don't split individual experience/project/education blocks */
      #resume-preview .resume-section,
      #resume-preview .experience-item,
      #resume-preview .project-item,
      #resume-preview .education-item,
      #resume-preview .certification-item {
        break-inside: avoid;
        page-break-inside: avoid;
      }

      /* Keep links as normal clickable PDF links */
      #resume-preview a {
        color: inherit;
        text-decoration: none;
      }
    }
  `}
</style>

    </div>
  )
})

export default ResumePreview