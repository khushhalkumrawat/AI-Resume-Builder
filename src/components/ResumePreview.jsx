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
             size : letter;
             margin : 0;
             }
             
             @media print {
              html , body {
               width : 8.5in;
               height : 11in;
               overflow : hidden;
              }
              body * {
              visibility : hidden;
              } 
              #resume-preview , #resume-preview * {
              visibility : visible;
              }
              #resume-preview {     
                position : absolute;
                left : 0;
                top : 0;
                width : 100%;
                height : auto;
                margin : 0;
                padding : 0;
                box-shadow : none !important;
                border:  none !important;    
              }
            }
            `}
      </style>

    </div>
  )
})

export default ResumePreview