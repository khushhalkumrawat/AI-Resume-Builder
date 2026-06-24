import {
  ArrowLeftIcon,
  User,
  FileText,
  Briefcase,
  GraduationCap,
  FolderIcon,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Link, useParams } from "react-router-dom";
import { dummyResumeData } from "../assets/assets";
import React, { useEffect, useState } from "react";
import { PersonalInfoForm } from "../components/PersonalInfoForm";

const ResumeBuilder = () => {
  const { resumeId } = useParams();

  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    project: [],
    skills: [],
    template: "classic",
    accent_color: "#3B82F6",
    public: false,
  });

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);

  const sections = [
    { id: "personal", name: "Personal Info", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "projects", name: "Projects", icon: FolderIcon },
    { id: "skills", name: "Skills", icon: Sparkles },
  ];

  const activeSection = sections[activeSectionIndex];

  const loadExistingResume = () => {
    const resume = dummyResumeData.find(
      (resume) => resume._id === resumeId
    );

    if (resume) {
      setResumeData(resume);
      document.title = resume.title;
    }
  };

  useEffect(() => {
    loadExistingResume();
  }, [resumeId]);

  return (
    <div className="px-4 py-4">
      {/* Back Button */}
      <Link
        to="/app"
        className="inline-flex gap-2 items-center text-slate-600 hover:text-slate-700 transition-all mb-6"
      >
        <ArrowLeftIcon className="size-4" />
        Back to Dashboard
      </Link>

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Panel */}
          <div className="relative lg:col-span-5 rounded-lg overflow-hidden">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              {/* Progress Bar */}
              <div className="relative mb-6">
                <div className="h-1 bg-gray-200 rounded-full"></div>

                <div
                  className="absolute top-0 left-0 h-1 bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-500"
                  style={{
                    width: `${
                      (activeSectionIndex * 100) /
                      (sections.length - 1)
                    }%`,
                  }}
                />
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-4">
                <h2 className="font-semibold text-lg">
                  {activeSection.name}
                </h2>

                <div className="flex items-center gap-2">
                  {activeSectionIndex > 0 && (
                    <button
                      onClick={() =>
                        setActiveSectionIndex((prev) =>
                          Math.max(prev - 1, 0)
                        )
                      }
                      className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-all"
                    >
                      <ChevronLeft className="size-4" />
                      Previous
                    </button>
                  )}

                  <button
                    onClick={() =>
                      setActiveSectionIndex((prev) =>
                        Math.min(prev + 1, sections.length - 1)
                      )
                    }
                    disabled={
                      activeSectionIndex === sections.length - 1
                    }
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-all ${
                      activeSectionIndex === sections.length - 1
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    Next
                    <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>

              {/* Form Content */}
              <div className="space-y-6">
                {activeSection.id === "personal" && (
                  <PersonalInfoForm
                    data={resumeData.personal_info}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        personal_info: data,
                      }))
                    }
                    removeBackground={removeBackground}
                    setRemoveBackground={setRemoveBackground}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 min-h-[700px]">
              <h2 className="text-xl font-semibold mb-4">
                Resume Preview
              </h2>

              <p className="text-gray-500">
                Resume preview will appear here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;