import { Layout , Check , FileText } from 'lucide-react'
import React, { useState } from 'react'
import {
  Phone,
  Mail,
  MapPin,
  Globe,
  Code2,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";

const StandardTemplate = ({ data, sectionOrder = [] }) => {

  const formatUrl = (url) => {
    if (!url) return "";
    return url.startsWith("http://") || url.startsWith("https://")
      ? url
      : `https://${url}`;
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";

    // YYYY-MM
    if (/^\d{4}-\d{2}$/.test(dateStr)) {
      const [year, month] = dateStr.split("-");
      const date = new Date(year, Number(month) - 1);

      return date.toLocaleString("en-US", {
        month: "short",
        year: "numeric",
      });
    }

    return dateStr;
  };

  const getDateRange = (item) => {
    if (!item) return "";

    const start = formatDate(
      item.start_date || item.startDate
    );

    const end = item.is_current
      ? "Present"
      : formatDate(item.end_date || item.endDate);

    if (start && end) return `${start} - ${end}`;
    return start || end || "";
  };

  const SectionTitle = ({ children }) => (
    <div className="mt-2.5 mb-1.5">
      <h2 className="text-[14px] font-bold uppercase tracking-wide">
        {children}
      </h2>

      <div className="border-b border-black w-full" />
    </div>
  );

  const renderBullets = (description) => {
    if (!description) return null;

    const bullets = description
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

    return (
      <ul className="list-disc ml-5 mt-0.5 space-y-[1px]">
        {bullets.map((bullet, index) => (
          <li key={index} className="pl-0.5">
            {bullet.replace(/^[-•*]\s*/, "")}
          </li>
        ))}
      </ul>
    );
  };

  /* =========================
     SUMMARY
  ========================= */

  const renderSummary = () => {
    if (!data?.professional_summary?.trim()) return null;

    return (
      <section>
        <SectionTitle>Professional Summary</SectionTitle>

        <p className="text-justify leading-[1.2]">
          {data.professional_summary}
        </p>
      </section>
    );
  };

  /* =========================
     EDUCATION
  ========================= */

  const renderEducation = () => {
    if (!data?.education?.length) return null;

    return (
      <section>
        <SectionTitle>Education</SectionTitle>

        <div className="space-y-1.5">
          {data.education.map((edu, index) => (
            <div key={index}>
              <div className="flex justify-between items-start gap-4">
                <div className="font-bold">
                  {edu.institution}

                  {edu.location && (
                    <span className="font-normal">
                      {" | "}
                      {edu.location}
                    </span>
                  )}
                </div>

                {edu.graduation_date && (
                  <div className="whitespace-nowrap">
                    {edu.graduation_date}
                  </div>
                )}
              </div>

              <div className="flex justify-between items-start gap-4">
                <div>
                  {edu.degree}

                  {edu.field && (
                    <>
                      {" in "}
                      {edu.field}
                    </>
                  )}
                </div>

                {edu.gpa && (
                  <div className="whitespace-nowrap">
                    CGPA: {edu.gpa}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };

  /* =========================
     SKILLS
  ========================= */

  const renderSkills = () => {
    if (!data?.skills?.length) return null;

    return (
      <section>
        <SectionTitle>Skills</SectionTitle>

        <div className="space-y-[2px]">
          {data.skills.map((item, index) => (
            <div
              key={index}
              className="flex items-start"
            >
              <span className="font-bold min-w-[185px]">
                {item.category}:
              </span>

              <span>
                {Array.isArray(item.skills)
                  ? item.skills.join(", ")
                  : item.skills}
              </span>
            </div>
          ))}
        </div>
      </section>
    );
  };

  /* =========================
     EXPERIENCE
  ========================= */

  const renderExperience = () => {
    if (!data?.experience?.length) return null;

    return (
      <section>
        <SectionTitle>Experience</SectionTitle>

        <div className="space-y-2">
          {data.experience.map((exp, index) => (
            <div key={index}>
              <div className="flex justify-between items-start gap-4">
                <div>
                  <span className="font-bold">
                    {exp.company}
                  </span>

                  {exp.location && (
                    <span>
                      {" | "}
                      {exp.location}
                    </span>
                  )}
                </div>

                <span className="whitespace-nowrap">
                  {getDateRange(exp)}
                </span>
              </div>

              <div className="italic">
                {exp.position}

                {exp.employment_type && (
                  <>
                    {" | "}
                    {exp.employment_type}
                  </>
                )}
              </div>

              {renderBullets(exp.description)}
            </div>
          ))}
        </div>
      </section>
    );
  };

  /* =========================
     PROJECTS
  ========================= */

  const renderProjects = () => {
    if (!data?.project?.length) return null;

    return (
      <section>
        <SectionTitle>Projects</SectionTitle>

        <div className="space-y-2">
          {data.project.map((project, index) => (
            <div key={index}>
              <div className="flex justify-between items-start gap-4">
                <div className='flex'>
                  <span className="font-bold">
                    {project.name}
                  </span>

                  {project.type && (
                    <span className="italic">
                      {" | "}
                      {project.type}
                    </span>
                  )}

                  {project.github && (
                    <>
                      {" | "}
                      <a
                        href={formatUrl(project.github)}
                        target="_blank"
                        rel="noreferrer"
                        className="underline flex items-center justify-center space-x-2 px-1"
                      >
                        <FaGithub size={12} strokeWidth={1.8} />
                        <span>Github</span>
                      </a>
                    </>
                  )}

                  {project.live_demo && (
                    <>
                      {" | "}
                      <a
                        href={formatUrl(project.live_demo)}
                        target="_blank"
                        rel="noreferrer"
                        className="underline flex items-center justify-center space-x-2"
                      >
                        <FiExternalLink size={12} strokeWidth={1.8} />
                        <span>Live Demo</span>
                      </a>
                    </>
                  )}
                </div>

                {(project.start_date ||
                  project.end_date) && (
                  <span className="whitespace-nowrap">
                    {getDateRange(project)}
                  </span>
                )}
              </div>

              {renderBullets(project.description)}

              {project.tech_stack && (
                <div className="mt-[1px]">
                  <span className="font-bold">
                    Technologies / Tools Used:
                  </span>{" "}
                  {project.tech_stack}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  };

  /* =========================
     ACHIEVEMENTS
  ========================= */

  const renderAchievements = () => {
    if (!data?.achievements?.length) return null;

    return (
      <section>
        <SectionTitle>Achievements</SectionTitle>

        <ul className="list-disc ml-5 space-y-[1px]">
          {data.achievements.map((achievement, index) => (
            <li key={index}>
              {achievement}
            </li>
          ))}
        </ul>
      </section>
    );
  };

  /* =========================
     CERTIFICATIONS
  ========================= */

  const renderCertifications = () => {
    if (!data?.certifications?.length) return null;

    return (
      <section>
        <SectionTitle>Certifications</SectionTitle>

        <div className="space-y-1.5">
          {data.certifications.map((cert, index) => (
            <div key={index}>
              <div className="flex justify-between gap-4">
                <div>
                  <span className="font-bold">
                    {cert.name}
                  </span>

                  {cert.issuer && (
                    <span>
                      {" | "}
                      {cert.issuer}
                    </span>
                  )}
                </div>

                {cert.issue_date && (
                  <span className="whitespace-nowrap">
                    {cert.issue_date}
                  </span>
                )}
              </div>

              {cert.credential_url && (
                <a
                  href={formatUrl(cert.credential_url)}
                  target="_blank"
                  rel="noreferrer"
                  className="underline"
                >
                  Credential
                </a>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  };

  /* =========================
     SECTION MAP
  ========================= */

  const sectionComponents = {
    summary: renderSummary,
    experience: renderExperience,
    education: renderEducation,
    projects: renderProjects,
    skills: renderSkills,
    achievements: renderAchievements,
    certifications: renderCertifications,
  };

  const defaultOrder = [
    { id: "summary", label: "Professional Summary" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "achievements", label: "Achievements" },
    { id: "certifications", label: "Certifications" },
  ];

  const finalSectionOrder =
    sectionOrder?.length > 0
      ? sectionOrder
      : defaultOrder;

  /* =========================
     TEMPLATE
  ========================= */

  return (
    <div
      id="resume-preview"
      className="
        w-[210mm]
        min-h-[297mm]
        mx-auto
        bg-white
        text-black
        px-[16mm]
        py-[12mm]
      "
      style={{
        fontFamily: '"Times New Roman", Times, serif',
        fontSize: `${data?.font_size || 11}px`,
        lineHeight: data?.line_height || 1.18,
      }}
    >
      {/* ================= HEADER ================= */}

    
      <header className="text-center mb-2">

        <div className = "flex items-center justify-center">

             {data?.personal_info?.full_name && (
                <h1 className="text-[25px] font-bold uppercase leading-none mb-1">
                {data.personal_info.full_name}
            </h1>
            )}

            <h1 className='h-100px'> | </h1>

            {data?.personal_info?.profession && (
                <div className="text-[20px] italic">
                {data.personal_info.profession}
            </div>
            )}

        </div>

        <div className="flex justify-center flex-wrap items-center gap-x-3 gap-y-1 text-[10.5px]">

            {data?.personal_info?.phone && (
                <a
                    href={`tel:${data.personal_info.phone}`}
                    className="flex items-center gap-1"
                >
                <Phone size={11} strokeWidth={1.8} />
                    <span>{data.personal_info.phone}</span>
                </a>
            )}

            {data?.personal_info?.email && (
                <a
                    href={`mailto:${data.personal_info.email}`}
                    className="flex items-center gap-1"
                >
                <Mail size={11} strokeWidth={1.8} />
                <span>{data.personal_info.email}</span>
                </a>
            )}

            {data?.personal_info?.location && (
                <span className="flex items-center gap-1">
                <MapPin size={11} strokeWidth={1.8} />
                <span>{data.personal_info.location}</span>
            </span>
            )}

            {data?.personal_info?.linkedin && (
                <a
                    href={formatUrl(data.personal_info.linkedin)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1"
                >
            <FaLinkedin size={11} strokeWidth={1.8} />
            <span>LinkedIn</span>
            </a>
            )}

            {data?.personal_info?.github && (
                <a
                    href={formatUrl(data.personal_info.github)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1"
                >
                <FaGithub size={11} strokeWidth={1.8} />
                <span>GitHub</span>
                </a>
            )}

            {data?.personal_info?.portfolio && (
                <a
                href={formatUrl(data.personal_info.portfolio)}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1"
            >
            <Globe size={11} strokeWidth={1.8} />
            <span>Portfolio</span>
            </a>
            )}

            {data?.personal_info?.leetcode && (
            <a
                href={formatUrl(data.personal_info.leetcode)}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1"
            >
            <Code2 size={11} strokeWidth={1.8} />
            <span>LeetCode</span>
            </a>
            )}

            {data?.personal_info?.codeforces && (
                <a
                    href={formatUrl(data.personal_info.codeforces)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1"
                >
                <Code2 size={11} strokeWidth={1.8} />
                <span>Codeforces</span>
                </a>
            )}

            {data?.personal_info?.geeksforgeeks && (
                <a
                href={formatUrl(data.personal_info.geeksforgeeks)}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1"
                >
                <Code2 size={11} strokeWidth={1.8} />
                <span>GeeksForGeeks</span>
                </a>
                )}

            </div>
      </header>

      {/* ================= SECTIONS ================= */}

      <main>
        {finalSectionOrder.map((section, index) => {
          const render =
            sectionComponents[section.id];

          if (!render) return null;

          return (
            <React.Fragment key={section.id || index}>
              {render()}
            </React.Fragment>
          );
        })}
      </main>
    </div>
  );
};

export default StandardTemplate;