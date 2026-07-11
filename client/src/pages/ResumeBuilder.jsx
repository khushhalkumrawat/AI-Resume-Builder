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
  Share,
  Share2Icon,
  EyeIcon,
  EyeOffIcon,
  DownloadIcon,
  Trophy,
} from "lucide-react";

import { Link, useParams } from "react-router-dom";
import { dummyResumeData } from "../assets/assets";
import React, { useEffect, useState } from "react";
import { PersonalInfoForm } from "../components/PersonalInfoForm";
import ResumePreview from "../components/ResumePreview";
import TemplateSelector from "../components/TemplateSelector";
import ColorPicker from "../components/ColorPicker";
import ProfessionalSummary from "../components/ProfessionalSummary";
import ExperienceForm from "../components/ExperienceForm";
import EducationForm from "../components/EducationForm";
import ProjectForm from "../components/ProjectForm";
import SkillsForm from "../components/SkillsForm";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import api from '../configs/api'
import Achievements from "../components/Achievements";
import CertificationsForm from "../components/CertificationsForm";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import SectionOrder from "../components/SectionOrder";
import { fitResume, PAGE_HEIGHT } from "../utils/fitResume";
import { useRef } from "react";

const ResumeBuilder = () => {

  const [isOverflowing, setIsOverflowing] = useState(false);

  const checkResumeOverflow = () => {

    const resume = document.getElementById("resume-preview");

    if (!resume) return;

    setIsOverflowing(resume.scrollHeight > resume.clientHeight);

  };

  const resumeRef = useRef(null);

  const defaultSectionOrder = [
    { id: "summary", label: "Professional Summary" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "achievements", label: "Achievements" },
    { id: "certifications", label: "Certifications" },
  ];

  const [sectionOrder, setSectionOrder] = useState(defaultSectionOrder);

  const { resumeId } = useParams();
  const { token } = useSelector((state) => state.auth);

  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    project: [],
    skills: [],
    achievements: [],
    certifications: [],
    template: "classic",
    accent_color: "#3B82F6",
    public: false,
    sectionOrder: [
      "summary",
      "experience",
      "education",
      "projects",
      "skills",
      "achievements",
      "certifications",
    ],
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
    { id: "achievements", name: "Achievements", icon: Trophy },
    { id: "certifications", name: "Certifications", icon: Sparkles },

  ];

  const activeSection = sections[activeSectionIndex];

  const loadExistingResume = async () => {

    try {

      const { data } = await api.get('/api/resumes/get/' + resumeId, { headers: { Authorization: token } })
      if (data.resume) {
        setResumeData(data.resume)
        setSectionOrder(
          data.resume.sectionOrder?.length
            ? data.resume.sectionOrder
            : defaultSectionOrder
        );
        document.title = data.resume.title;
      }

    } catch (error) {
      console.log(error.message)
    }

  };

  useEffect(() => {
    loadExistingResume();
  }, [resumeId]);

  useEffect(() => {

    const timer = setTimeout(() => {

      checkResumeOverflow();

    }, 100);

    return () => clearTimeout(timer);

  }, [resumeData]);

  const changeResumeVisibility = async () => {
    try {

      const formData = new FormData();
      formData.append("resumeId", resumeId);
      formData.append("resumeData", JSON.stringify({ public: !resumeData.public }));

      const { data } = await api.put('/api/resumes/update', formData, { headers: { Authorization: token } })

      setResumeData({ ...resumeData, public: !resumeData.public })
      toast.success(data.message)

    } catch (error) {
      toast.error("Please Try Again");
    }
  }

  const handleShare = () => {
    const frontendUrl = window.location.href.split('/app/')[0];
    const resumeUrl = frontendUrl + '/view/' + resumeId;

    if (navigator.share) {
      navigator.share({ url: resumeUrl, text: "My Resume", })
    }
    else {
      toast.error('Share not supported on this browser. ')
    }
  }

  const getResumeHeight = () => {
    return resumeRef.current?.scrollHeight || 0;
  };

  const tempDownload = async () => {
    try {
      window.print();
    } catch (error) {
      toast.error("Failed to download resume.");
    }

  }
  const downloadResume = async () => {
    try {
      const resume = document.getElementById("resume-preview");

      if (!resume) {
        toast.error("Resume preview not found.");
        return;
      }

      const canvas = await html2canvas(resume, {
        scale: 3,
        useCORS: true,
        backgroundColor: "#fff",
        width: resume.scrollWidth,
        height: resume.scrollHeight,
        windowWidth: resume.scrollWidth,
        windowHeight: resume.scrollHeight,
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = 210;
      const pdfHeight = 297;

      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // const scaleX = pdfWidth / canvas.width;
      // const scaleY = pdfHeight / canvas.height;

      pdf.addImage(
        imgData,
        "PNG",
        0,
        0,
        imgWidth,
        imgHeight
      );

      /*

      const addLink = (id, url) => {

        const el = document.getElementById(id);

        if (!el || !url) return;

        const rect = el.getBoundingClientRect();

        const x = rect.left * scaleX;
        const y = rect.top * scaleY;
        const w = rect.width * scaleX;
        const h = rect.height * scaleY;

        pdf.link(x, y, w, h, { url });
      };

      addLink("email-link", `mailto:${resumeData.personal_info.email}`);
      addLink("github-link", resumeData.personal_info.github);
      addLink("linkedin-link", resumeData.personal_info.linkedin);
      addLink("portfolio-link", resumeData.personal_info.portfolio);
      addLink("leetcode-link", resumeData.personal_info.leetcode);
      addLink("codeforces-link", resumeData.personal_info.codeforces);
      addLink("codechef-link", resumeData.personal_info.codechef);
      addLink("gfg-link", resumeData.personal_info.geeksforgeeks);
      addLink("atcoder-link", resumeData.personal_info.atcoder);

      */

      if (isOverflowing) {

        const proceed = window.confirm(
          "This resume exceeds one A4 page.\n\nIt will be downloaded as a 2-page PDF.\n\nContinue?"
        );

        if (!proceed) return;
      }

      pdf.save(`${resumeData.title || "Resume"}.pdf`);

      toast.success("Resume downloaded successfully!");

    } catch (error) {
      console.error(error);
      toast.error("Failed to download resume.");
    }
  };

  const saveResume = async () => {

    console.log("Save resume function frontend id", resumeId);

    try {

      let updatedResumeData = structuredClone(resumeData);

      // remove image from updatedResumeData


      if (typeof resumeData.personal_info.image === 'object') {
        delete updatedResumeData.personal_info.image;
      }

      console.log("JSON PROBLEM FINDING ->")

      console.log(updatedResumeData.project);
      console.log(typeof updatedResumeData.project);
      console.log(Array.isArray(updatedResumeData.project));

      const formData = new FormData();
      formData.append("resumeId", resumeId);
      formData.append("resumeData", JSON.stringify(updatedResumeData));
      removeBackground && formData.append("removeBackground", true);
      typeof resumeData.personal_info.image === 'object' && formData.append("image", resumeData.personal_info.image);

      const { data } = await api.put('/api/resumes/update', formData, { headers: { Authorization: token } })

      setResumeData(data.resume);
      toast.success(data.message)

    } catch (error) {
      toast.error("Unable to save your resume. Please try again.");
    }
  }

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
                    width: `${(activeSectionIndex * 100) /
                      (sections.length - 1)
                      }%`,
                  }}
                />
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-4">

                {/* Template Change Option */}
                <div className='flex items-center gap-2 '>

                  <TemplateSelector selectedTemplate={resumeData.template} onChange={(template) => setResumeData(prev => ({ ...prev, template }))} />

                  <ColorPicker selectedColor={resumeData.accent_color} onChange={(color) => setResumeData(prev => ({ ...prev, accent_color: color }))} />

                </div>

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
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-all ${activeSectionIndex === sections.length - 1
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
                {
                  activeSection.id === 'summary' && (
                    <ProfessionalSummary data={resumeData.professional_summary} onChange={(data) => setResumeData(prev => ({ ...prev, professional_summary: data }))} setResumeData={setResumeData} />
                  )
                }

                {
                  activeSection.id === 'experience' && (
                    <ExperienceForm data={resumeData.experience} onChange={(data) => setResumeData(prev => ({ ...prev, experience: data }))} />
                  )
                }

                {
                  activeSection.id === 'education' && (
                    <EducationForm data={resumeData.education} onChange={(data) => setResumeData(prev => ({ ...prev, education: data }))} />
                  )
                }

                {
                  activeSection.id === 'projects' && (
                    <ProjectForm data={resumeData.project} onChange={(data) => setResumeData(prev => ({ ...prev, project: data }))} />
                  )
                }

                {
                  activeSection.id === 'skills' && (
                    <SkillsForm data={resumeData.skills} onChange={(data) => setResumeData(prev => ({ ...prev, skills: data }))} />
                  )
                }

                {
                  activeSection.id === 'achievements' && (
                    <Achievements data={resumeData.achievements} onChange={(data) => setResumeData(prev => ({ ...prev, achievements: data }))} />
                  )
                }

                {
                  activeSection.id === 'certifications' && (
                    <CertificationsForm data={resumeData.certifications} onChange={(data) => setResumeData(prev => ({ ...prev, certifications: data }))} />
                  )
                }

              </div>

              <div className="mt-8">
                <SectionOrder
                  sections={sectionOrder}
                  setSections={setSectionOrder}
                />
              </div>


              <button onClick={() => { toast.promise(saveResume, { loading: 'Saving...' }) }} className='bg-gradient-to-br from-green-100 to-green-200 ring-green-300 text-green-600 ring hover:ring-green-400 transition-all rounded-md px-6 py-2 mt-6 text-sm' >
                Save Changes
              </button>

            </div>
          </div>


          {/* Right Panel - Preview */}
          <div className='lg:col-span-7 max-lg:mt-6' >

            <div className='relative w-full'>
              {/* ---- buttons --- */}
              <div className='absolute bottom-3 left-0 right-0 flex items-center justify-end gap-2 '>
                {resumeData.public && (
                  <button onClick={handleShare} className='flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 rounded-lg ring-blue-300 hover:ring transition-colors'>
                    <Share2Icon className='size-4' />
                  </button>
                )}

                <button onClick={changeResumeVisibility} className='flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-purple-100 to-purple-200 text-purple-600 ring-purple-300 rounded-lg hover:ring transition-colors' >
                  {resumeData.public ? <EyeIcon className='size-4' /> : <EyeOffIcon className='size-4' />}
                  {resumeData.public ? 'Public' : 'Private'}
                </button>

                <button onClick={tempDownload} className='lex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-purple-100 to-purple-200 text-purple-600 ring-purple-300 rounded-lg hover:ring transition-colors' >
                  <DownloadIcon className='size-4' /> Download
                </button>

              </div>

            </div>

            {/* --- resume preview */}
            {
              isOverflowing && (
                <div className="mb-3 rounded-lg border border-yellow-300 bg-yellow-50 px-4 py-3 text-sm text-yellow-800">

                  ⚠️ Your resume exceeds one A4 page. It will be downloaded as a 2-page PDF.

                </div>
              )
            }
            <ResumePreview ref={resumeRef} data={resumeData} template={resumeData.template} accentColor={resumeData.accent_color} sectionOrder={sectionOrder} />

          </div>


        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;