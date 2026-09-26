import React from 'react'
import ClassicTemplate from '../assets/templates/ClassicTemplate'
import ModernTemplate from '../assets/templates/ModernTemplate'
import MinimalTemplate from '../assets/templates/MinimalTemplate'
import MinimalImageTemplate from '../assets/templates/MinimalImageTemplate'
import PopularTemplate from '../assets/templates/PopularTemplate'
import { forwardRef } from "react";

const ResumePreview = forwardRef(({ data, template, accentColor, sectionOrder, classes = "", }, ref) => {

  const renderTemplate = () => {

    switch (template) {
      case "classic":
        return <ClassicTemplate data={data} accentColor={accentColor} sectionOrder={sectionOrder} />;
      case "minimal":
        return <MinimalTemplate data={data} accentColor={accentColor} sectionOrder={sectionOrder} />;
      case "minimal-image":
        return <MinimalImageTemplate data={data} accentColor={accentColor} sectionOrder={sectionOrder} />;
      case "popular":
        return <PopularTemplate data={data} accentColor={accentColor} sectionOrder={sectionOrder} />
      case "modern":
        return <ModernTemplate data={data} accentColor={accentColor} sectionOrder={sectionOrder} /> 

      default:
        return <PopularTemplate data={data} accentColor={accentColor} sectionOrder={sectionOrder} />;
    }

  }


return (
  <div
   className="w-full bg-gray-100" >
    <div ref={ref} id="resume-preview" className={`border border-gray-200 shadow ${classes}`}>
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
        width: 210mm;
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
        position: absolute;
        left: 0;
        top: 0;
        width: 210mm !important;
        min-height: 297mm;
        margin: 0 !important;
        padding: 0 !important;
        border: none !important;
        box-shadow: none !important;
        background: white !important;
      }

      /* Don't cut content when resume is longer than one page */
      #resume-preview {
        overflow: visible !important;
        height: auto !important;
      }

      /* Keep sections together when possible */
      #resume-preview section {
        break-inside: avoid;
        page-break-inside: avoid;
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