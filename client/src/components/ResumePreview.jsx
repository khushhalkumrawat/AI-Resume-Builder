import React from "react";
import PopularTemplate from "../assets/templates/PopularTemplate";
import StandardTemplate from "../assets/templates/StandardTemplate";
import EliteTemplate from "../assets/templates/EliteTemplate";
import { forwardRef } from "react";

const ResumePreview = forwardRef(
  ({ data, template, accentColor, sectionOrder, classes = "" }, ref) => {
    const renderTemplate = () => {
      console.log("PDF/Preview template:", template);

      switch (template) {
        case "popular":
          return (
            <PopularTemplate
              data={data}
              accentColor={accentColor}
              sectionOrder={sectionOrder}
            />
          );
        case "standard":
          return (
            <StandardTemplate
              data={data}
              accentColor={accentColor}
              sectionOrder={sectionOrder}
            />
          );
        case "elite":
          return (
            <EliteTemplate
              data={data}
              accentColor={accentColor}
              sectionOrder={sectionOrder}
            />
          );

        default:
          return (
            <StandardTemplate
              data={data}
              accentColor={accentColor}
              sectionOrder={sectionOrder}
            />
          );
      }
    };

    return (
      <div className="w-full bg-gray-100">
        <div
          ref={ref}
          id="resume-preview"
          data-template={template}
          className={`border border-gray-200 shadow ${classes}`}
        >
          {renderTemplate()}
        </div>

        <style>
          {`
    @page {
      size: A4;
      margin: 0;
    }

    html,
    body {
      margin: 0 !important;
      padding: 0 !important;
      background: white !important;
    }

    #resume-preview {
      width: 210mm;
      height: 297mm;
      max-height: 297mm;
      overflow: hidden;
      margin: 0 !important;
      padding: 0 !important;
      background: white;
      box-sizing: border-box;
      box-shadow: none !important;
      border: none !important;
    }

    * {
      box-sizing: border-box;
    }

    *,
    *::before,
    *::after {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    @media print {
      html,
      body {
        width: 210mm;
        height: 297mm;
        margin: 0 !important;
        padding: 0 !important;
        overflow: hidden !important;
        background: white !important;
      }

      #resume-preview {
        width: 210mm;
        height: 297mm;
        max-height: 297mm;
        overflow: hidden;
        margin: 0 !important;
        padding: 0 !important;
      }
    }
  `}
        </style>
      </div>
    );
  },
);

export default ResumePreview;
