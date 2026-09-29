import React from "react";
import { Globe } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";

const ProfessionalGrayTemplate = ({ data, sectionOrder = [] }) => {
  const resumeRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const calculateScale = () => {
      if (!resumeRef.current) return;

      // A4 height at 96 DPI
      const A4_HEIGHT_PX = 1100;

      const contentHeight = resumeRef.current.scrollHeight;

      if (contentHeight <= A4_HEIGHT_PX) {
        setScale(1);
        return;
      }

      // Small safety margin so Puppeteer doesn't create page 2
      const availableHeight = A4_HEIGHT_PX - 20;

      const calculatedScale = availableHeight / contentHeight;

      // Don't scale above 1
      setScale(Math.min(1, calculatedScale));
    };

    // Wait until fonts/images/layout are rendered
    const timer = setTimeout(calculateScale, 100);

    window.addEventListener("resize", calculateScale);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", calculateScale);
    };
  }, [data, sectionOrder]);

  console.log("Section Order:", sectionOrder);

  const formatDate = (dateStr) => {
    if (!dateStr) return "";

    const [year, month] = dateStr.split("-");

    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const formatUrl = (url) => {
    if (!url) return "";

    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }

    return `https://${url}`;
  };

  const profileLinks = [
    {
      key: "linkedin",
      label: "LinkedIn",
      icon: FaLinkedin,
    },
    {
      key: "github",
      label: "GitHub",
      icon: FaGithub,
    },
    {
      key: "portfolio",
      label: "Portfolio",
      icon: Globe,
    },
  ];

  const Separator = () => <span className="mx-2 text-gray-300">|</span>;

  const SectionTitle = ({ children }) => (
    <div className="mb-2.5 flex items-center gap-2">
      <div className="w-[3px] h-[13px] bg-blue-600 rounded-sm shrink-0" />

      <h2 className="text-[12px] font-bold uppercase tracking-[0.14em] text-gray-900 whitespace-nowrap">
        {children}
      </h2>

      <div className="h-[1px] flex-1 bg-gray-200" />
    </div>
  );

  const sectionSpacing = Math.max(8, Math.min(data.section_spacing || 10, 14));

  const renderSummary = () => {
    if (!data.professional_summary?.trim()) return null;

    return (
      <section style={{ marginBottom: `${sectionSpacing}px` }}>
        <SectionTitle>Professional Summary</SectionTitle>

        <p className="text-[12.5px] leading-[1.5] text-gray-700 text-justify">
          {data.professional_summary}
        </p>
      </section>
    );
  };

  const renderEducation = () => {
    return (
      data.education?.length > 0 && (
        <section style={{ marginBottom: `${sectionSpacing}px` }}>
          <SectionTitle>Education</SectionTitle>

          <div className="mt-4 space-y-5">
            {data.education.map((edu, index) => (
              <div key={index} className="flex justify-between items-start">
                <div className="w-[75%]">
                  <h3 className="font-semibold text-gray-800">
                    {edu.institution}
                  </h3>

                  <p>
                    {edu.degree}
                    {edu.field && ` in ${edu.field}`}
                  </p>
                </div>

                <div className="text-right whitespace-nowrap text-gray-600 text-[13px]">
                  <p>{formatDate(edu.graduation_date)}</p>

                  {edu.gpa && <p>{edu.gpa}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )
    );
  };

  const renderSkills = () => {
    return (
      data.skills &&
      data.skills.length > 0 && (
        <section style={{ marginBottom: `${sectionSpacing}px` }}>
          <SectionTitle>Skills</SectionTitle>

          <div className="mt-1.5 space-y-[2px] text-[12.5px] leading-[1.35]">
            {data.skills.map((item, index) => (
              <div key={index} className="flex items-start">
                {/* Category */}
                <span className="font-bold min-w-[150px] text-gray-900">
                  {item.category} :
                </span>

                {/* Skills */}
                <span className="flex-1">{item.skills.join(", ")}</span>
              </div>
            ))}
          </div>
        </section>
      )
    );
  };

  const renderExperience = () => {
    return (
      data.experience?.length > 0 && (
        <section style={{ marginBottom: `${sectionSpacing}px` }}>
          <SectionTitle>Experience</SectionTitle>

          <div className="mt-3 space-y-4">
            {data.experience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-start">
                  {/* Left Side */}
                  <div className="w-[75%]">
                    <h3 className="text-[13.5px] font-bold text-gray-900">
                      {exp.position}

                      {exp.company && (
                        <span className="font-medium text-gray-700">
                          {" · "}
                          {exp.company}
                        </span>
                      )}

                      {exp.location && (
                        <span className="font-normal text-gray-500">
                          {" · "}
                          {exp.location}
                        </span>
                      )}
                    </h3>
                  </div>

                  {/* Right Side */}
                  <div className="text-right whitespace-nowrap text-gray-500 text-[11.5px] font-medium">
                    {formatDate(exp.start_date)} -{" "}
                    {exp.is_current ? "Present" : formatDate(exp.end_date)}
                  </div>
                </div>

                {/* Description */}
                {typeof exp.description === "string" &&
                  exp.description.trim() && (
                    <ul className="list-disc pl-5 mt-1.5 space-y-[2px] leading-[1.45] text-[12.5px] text-gray-700">
                      {exp.description
                        .split("\n")
                        .filter((line) => line.trim())
                        .map((line, i) => (
                          <li key={i}>{line.replace(/^\*\s*/, "")}</li>
                        ))}
                    </ul>
                  )}
              </div>
            ))}
          </div>
        </section>
      )
    );
  };

  const renderProjects = () => {
    return (
      data.project?.length > 0 && (
        <section style={{ marginBottom: `${sectionSpacing}px` }}>
          <SectionTitle>Projects</SectionTitle>

          <div className="mt-3 space-y-4">
            {data.project.map((project, index) => (
              <div key={index}>
                {/* Project Heading */}
                <div className="flex justify-between items-center">
                  <h3 className="text-[13.5px] font-bold text-gray-900">
                    {project.name}
                    {project.tech_stack && <> | {project.tech_stack}</>}
                  </h3>

                  <div className="flex gap-3 text-[11.5px] font-medium">
                    {project.github && (
                      <a
                        href={formatUrl(project.github)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-700 hover:underline"
                      >
                        GitHub
                      </a>
                    )}

                    {project.live_demo && (
                      <a
                        href={formatUrl(project.live_demo)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-700 hover:underline"
                      >
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>

                {/* Description */}
                {project.description && (
                  <ul className="list-disc pl-5 mt-1.5 space-y-[2px] leading-[1.45] text-[12.5px] text-gray-700">
                    {project.description
                      .split("\n")
                      .filter((line) => line.trim())
                      .map((line, i) => (
                        <li key={i}>{line}</li>
                      ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )
    );
  };

  const renderAchievements = () => {
    return (
      data.achievements?.length > 0 && (
        <section style={{ marginBottom: `${sectionSpacing}px` }}>
          <SectionTitle>Achievements</SectionTitle>

          <ul className="mt-4 list-disc pl-6 space-y-1 leading-6 text-[13px]">
            {data.achievements.map((achievement, index) => (
              <li key={index} className="text-[12px]">
                {achievement}
              </li>
            ))}
          </ul>
        </section>
      )
    );
  };

  const renderCertifications = () => {
    return (
      data.certifications?.length > 0 && (
        <section style={{ marginBottom: `${sectionSpacing}px` }}>
          <SectionTitle>Certifications</SectionTitle>

          <div className="mt-3 space-y-4">
            {data.certifications.map((certification, index) => (
              <div key={index}>
                <h3 className="font-semibold text-gray-800">
                  {certification.name}
                </h3>

                <p className="text-sm">
                  {certification.issuer}
                  {certification.issue_date &&
                    ` • ${formatDate(certification.issue_date)}`}
                </p>

                {certification.credential_id && (
                  <p className="text-sm">
                    Credential ID: {certification.credential_id}
                  </p>
                )}

                {certification.credential_url && (
                  <a
                    href={certification.credential_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                  >
                    View Credential
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      )
    );
  };

  const sectionComponents = {
    summary: renderSummary,
    education: renderEducation,
    skills: renderSkills,
    experience: renderExperience,
    projects: renderProjects,
    achievements: renderAchievements,
    certifications: renderCertifications,
  };

  return (
    <>
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

        * {
          box-sizing: border-box;
        }

        .popular-page {
          width: 210mm;
          height: 297mm;
          overflow: hidden;
          background: white;
        }

        .popular-resume {
          width: 210mm;
          background: white;
        }

        .break-inside-avoid {
          break-inside: avoid;
          page-break-inside: avoid;
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

          .popular-page {
            width: 210mm;
            height: 297mm;
            overflow: hidden;
            margin: 0 !important;
          }

          *,
          *::before,
          *::after {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}
      </style>

      <div
        className="popular-page"
        style={{
          margin: "0 auto",
          position: "relative",
        }}
      >
        <div
          ref={resumeRef}
          className="popular-resume"
          style={{
            padding: "5mm 5mm",
            fontFamily: "Inter, Arial, sans-serif",
            fontSize: `${data.font_size || 13}px`,
            lineHeight: data.line_height || 1.35,
            color: "#374151",
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            height: `${297 / scale}mm`,
            overflow: "hidden",
          }}
        >
          {/* ================= HEADER ================= */}

          <header className="px-10 pt-8 pb-5 border-b border-gray-200">
            {/* Name */}
            <div className="flex items-end justify-between gap-6">
              <div>
                <h1 className="text-[30px] font-bold tracking-[-0.03em] text-gray-950 leading-none">
                  {data.personal_info.full_name}
                </h1>

                {data.personal_info.profession && (
                  <p className="mt-2 text-[15px] font-medium tracking-wide text-gray-500">
                    {data.personal_info.profession}
                  </p>
                )}
              </div>

              {/* Accent */}
              <div className="w-16 h-[3px] bg-blue-600 mb-1" />
            </div>

            {/* Contact */}
            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-[11.5px] text-gray-600">
              {data.personal_info.phone && (
                <>
                  <span>{data.personal_info.phone}</span>
                  <Separator />
                </>
              )}

              {data.personal_info.email && (
                <>
                  <a
                    href={`mailto:${data.personal_info.email}`}
                    className="text-blue-700 hover:underline"
                  >
                    {data.personal_info.email}
                  </a>

                  <Separator />
                </>
              )}

              {data.personal_info.location && (
                <>
                  <span>{data.personal_info.location}</span>
                  <Separator />
                </>
              )}

              {profileLinks.map((profile) => {
                const url = data?.personal_info?.[profile.key];

                if (!url) return null;

                return (
                  <React.Fragment key={profile.key}>
                    <a
                      href={formatUrl(url)}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-700 hover:underline font-medium"
                    >
                      {profile.label}
                    </a>

                    <Separator />
                  </React.Fragment>
                );
              })}

              {data?.personal_info?.custom_profiles?.map((profile, index) => {
                if (!profile?.name || !profile?.url) return null;

                const validProfiles = data.personal_info.custom_profiles.filter(
                  (p) => p?.name && p?.url,
                );

                const isLast =
                  index === data.personal_info.custom_profiles.length - 1;

                return (
                  <React.Fragment key={`custom-${index}`}>
                    <a
                      href={formatUrl(profile.url)}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-700 hover:underline font-medium"
                    >
                      {profile.name}
                    </a>

                    {!isLast && <Separator />}
                  </React.Fragment>
                );
              })}
            </div>
          </header>

          {/*================== Root container =================== */}

          <div className="px-10 pt-6 pb-8">
            {(sectionOrder.length
              ? sectionOrder
              : [
                  { id: "summary" },
                  { id: "education" },
                  { id: "skills" },
                  { id: "experience" },
                  { id: "projects" },
                  { id: "achievements" },
                  { id: "certifications" },
                ]
            ).map((section) => (
              <React.Fragment key={section.id}>
                {sectionComponents[section.id]?.()}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfessionalGrayTemplate;
