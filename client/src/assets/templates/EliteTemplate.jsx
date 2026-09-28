import React from "react";
import {
  Phone,
  Mail,
  MapPin,
  Globe,
  Code2,
  ExternalLink,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const EliteTemplate = ({ data, sectionOrder = [] }) => {
  const accent = data?.accent_color || "#283593";

  const formatUrl = (url) => {
    if (!url) return "";
    return /^https?:\/\//i.test(url) ? url : `https://${url}`;
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";

    if (/^\d{4}-\d{2}$/.test(dateStr)) {
      const [year, month] = dateStr.split("-");
      return new Date(Number(year), Number(month) - 1).toLocaleString(
        "en-US",
        {
          month: "short",
          year: "numeric",
        }
      );
    }

    return dateStr;
  };

  const getDateRange = (item) => {
    if (!item) return "";

    const start = formatDate(item.start_date || item.startDate);
    const end = item.is_current
      ? "Present"
      : formatDate(item.end_date || item.endDate);

    if (start && end) return `${start} - ${end}`;
    return start || end || "";
  };

  const renderBullets = (description) => {
    if (!description?.trim()) return null;

    const bullets = description
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

    return (
      <ul className="mt-[2px] ml-4 list-disc space-y-[2px]">
        {bullets.map((bullet, index) => (
          <li key={index} className="pl-[1px]">
            {bullet.replace(/^[-•*]\s*/, "")}
          </li>
        ))}
      </ul>
    );
  };

  const SectionTitle = ({ children }) => (
    <div className="mb-[4px] mt-[5px]">
      <h2
        className="font-serif text-[14px] font-semibold uppercase tracking-[0.04em]"
        style={{ color: accent }}
      >
        {children}
      </h2>
      <div
        className="mt-[1px] h-[1px] w-full"
        style={{ backgroundColor: accent }}
      />
    </div>
  );

  /* =========================
     EDUCATION
  ========================= */

  const renderEducation = () => {
    if (!data?.education?.length) return null;

    return (
      <section className="mb-[2px]">
        <SectionTitle>Education</SectionTitle>

        <div className="border-collapse text-[10.5px]">
          <div
            className="grid grid-cols-[1.1fr_1.05fr_2fr_.7fr] border"
            style={{ borderColor: `${accent}99` }}
          >
            {["Year", "Qualification", "School / Institution", "CPI / %"].map(
              (heading) => (
                <div
                  key={heading}
                  className="border-r px-1 py-[2px] text-center font-semibold last:border-r-0"
                  style={{
                    color: accent,
                    borderColor: `${accent}99`,
                  }}
                >
                  {heading}
                </div>
              )
            )}

            {data.education.map((edu, index) => {
              const year =
                edu.graduation_date ||
                edu.year ||
                (index === 0 ? "Present" : "");

              return (
                <React.Fragment key={index}>
                  <div
                    className="border-r border-t px-1 py-[2px] text-center"
                    style={{ borderColor: `${accent}99` }}
                  >
                    {year}
                  </div>

                  <div
                    className="border-r border-t px-1 py-[2px] text-center"
                    style={{ borderColor: `${accent}99` }}
                  >
                    {[edu.degree, edu.field].filter(Boolean).join(" in ")}
                  </div>

                  <div
                    className="border-r border-t px-1 py-[2px] text-center"
                    style={{ borderColor: `${accent}99` }}
                  >
                    {edu.institution}
                  </div>

                  <div
                    className="border-t px-1 py-[2px] text-center"
                    style={{ borderColor: `${accent}99` }}
                  >
                    {edu.gpa || ""}
                  </div>
                </React.Fragment>
              );
            })}
          </div>
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
        <SectionTitle>Scholastic Achievements</SectionTitle>

        <ul className="ml-5 list-disc space-y-[2px]">
          {data.achievements.map((achievement, index) => (
            <li key={index}>{achievement}</li>
          ))}
        </ul>
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
        <SectionTitle>Work Experience</SectionTitle>

        <div className="space-y-[7px]">
          {data.experience.map((exp, index) => (
            <article key={index} className="break-inside-avoid">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div
                    className="font-semibold leading-[1.15]"
                    style={{ color: accent }}
                  >
                    {exp.position || exp.company}
                  </div>

                  {exp.company && exp.position && (
                    <div
                      className="font-semibold leading-[1.15]"
                      style={{ color: accent }}
                    >
                      {exp.company}
                    </div>
                  )}

                  {(exp.location || exp.employment_type) && (
                    <div className="italic leading-[1.15]">
                      {[exp.location, exp.employment_type]
                        .filter(Boolean)
                        .join(" | ")}
                    </div>
                  )}
                </div>

                <span className="whitespace-nowrap text-right">
                  {getDateRange(exp)}
                </span>
              </div>

              {renderBullets(exp.description)}
            </article>
          ))}
        </div>
      </section>
    );
  };

  /* =========================
     PROJECT
  ========================= */

  const ProjectCard = ({ project }) => (
    <article className="break-inside-avoid">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div
            className="font-semibold leading-[1.15]"
            style={{ color: accent }}
          >
            {project.name}
          </div>

          {project.type && (
            <div className="font-semibold leading-[1.15]" style={{ color: accent }}>
              {project.type}
            </div>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {project.github && (
            <a
              href={formatUrl(project.github)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 underline"
            >
              <FaGithub size={11} />
              GitHub
            </a>
          )}

          {project.live_demo && (
            <a
              href={formatUrl(project.live_demo)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 underline"
            >
              <ExternalLink size={10} />
              Demo
            </a>
          )}
        </div>
      </div>

      {renderBullets(project.description)}

      {project.tech_stack && (
        <div className="mt-[2px]">
          <span className="font-semibold">Technologies:</span>{" "}
          {project.tech_stack}
        </div>
      )}
    </article>
  );

  const renderProjects = (projects, showTitle = true) => {
    if (!projects?.length) return null;

    return (
      <section>
        {showTitle && <SectionTitle>Key Projects</SectionTitle>}

        <div className="space-y-[7px]">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
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
        <SectionTitle>Technical Skills</SectionTitle>

        <ul className="ml-4 list-disc space-y-[2px]">
          {data.skills.map((item, index) => (
            <li key={index}>
              {item.category && (
                <span className="font-semibold">{item.category}: </span>
              )}

              {Array.isArray(item.skills)
                ? item.skills.join(", ")
                : item.skills}
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

        <div className="space-y-[5px]">
          {data.certifications.map((cert, index) => (
            <article key={index} className="break-inside-avoid">
              <div className="flex justify-between gap-3">
                <div>
                  <span className="font-semibold">{cert.name}</span>
                  {cert.issuer && <span> | {cert.issuer}</span>}
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
            </article>
          ))}
        </div>
      </section>
    );
  };

  /* =========================
     SECTION ORDER
  ========================= */

  const defaultOrder = [
    { id: "summary", label: "Professional Summary" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "achievements", label: "Achievements" },
    { id: "certifications", label: "Certifications" },
  ];

  const finalOrder = sectionOrder?.length ? sectionOrder : defaultOrder;
  const enabled = new Set(finalOrder.map((item) => item.id));

  const showSummary = enabled.has("summary");
  const showExperience = enabled.has("experience");
  const showProjects = enabled.has("projects");
  const showSkills = enabled.has("skills");
  const showCertifications = enabled.has("certifications");

  const projects = data?.project || [];
  const projectSplit = Math.ceil(projects.length / 2);
  const leftProjects = projects.slice(0, projectSplit);
  const rightProjects = projects.slice(projectSplit);

  return (
    <div
      className="
        mx-auto
        min-h-[297mm]
        w-[210mm]
        bg-white
        px-[14mm]
        py-[9mm]
        text-black
      "
      style={{
        fontFamily: '"Times New Roman", Times, serif',
        fontSize: `${data?.font_size || 10.5}px`,
        lineHeight: data?.line_height || 1.18,
      }}
    >
      {/* ================= HEADER ================= */}

      <header className="mb-[7px]">
  <div className="grid grid-cols-[1fr_auto_1fr] items-start gap-3">

    {/* LEFT - Profile Image */}
    <div className="flex justify-start">
      {data?.personal_info?.image && (
        <img
          src={data.personal_info.image}
          alt=""
          className="
            h-[58px] w-[58px]
            rounded-full
            object-cover
          "
        />
      )}
    </div>

    {/* CENTER - Name + Profession */}
    <div className="text-center pt-[2px]">
      {data?.personal_info?.full_name && (
        <h1
          className="
            font-serif
            text-[26px]
            font-medium
            uppercase
            tracking-[0.04em]
            leading-none
            whitespace-nowrap
          "
          style={{ color: accent }}
        >
          {data.personal_info.full_name}
        </h1>
      )}

      {data?.personal_info?.profession && (
        <div className="mt-[5px] text-[20px]">
          {data.personal_info.profession}
        </div>
      )}
    </div>

    {/* RIGHT - Contact + Profiles */}
    <div
      className="flex flex-col items-end justify-start gap-[2px] text-[9.5px] leading-[1.15] min-w-0 ">
        {data?.personal_info?.email && (
            <a
            href={`mailto:${data.personal_info.email}`}
            className="flex items-center gap-1 whitespace-nowrap"
            >
            <span>{data.personal_info.email}</span>
            <Mail size={9} />
            </a>
        )}

        {data?.personal_info?.phone && (
            <a
            href={`tel:${data.personal_info.phone}`}
            className="flex items-center gap-1 whitespace-nowrap"
            >
            <span>{data.personal_info.phone}</span>
            <Phone size={9} />
            </a>
        )}

        {data?.personal_info?.location && (
            <span className="flex items-center gap-1 whitespace-nowrap">
            <span>{data.personal_info.location}</span>
            <MapPin size={9} />
            </span>
        )}

        {data?.personal_info?.linkedin && (
            <a
            href={formatUrl(data.personal_info.linkedin)}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 whitespace-nowrap"
            >
            <span>LinkedIn</span>
            <FaLinkedin size={9} />
            </a>
        )}

        {data?.personal_info?.github && (
            <a
            href={formatUrl(data.personal_info.github)}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 whitespace-nowrap"
            >
            <span>GitHub</span>
            <FaGithub size={9} />
            </a>
        )}

        {data?.personal_info?.portfolio && (
            <a
            href={formatUrl(data.personal_info.portfolio)}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 whitespace-nowrap"
            >
            <span>Portfolio</span>
            <Globe size={9} />
            </a>
        )}

        {data?.personal_info?.leetcode && (
            <a
            href={formatUrl(data.personal_info.leetcode)}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 whitespace-nowrap"
            >
            <span>LeetCode</span>
            <Code2 size={9} />
            </a>
        )}

        {data?.personal_info?.codeforces && (
            <a
            href={formatUrl(data.personal_info.codeforces)}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 whitespace-nowrap"
            >
            <span>Codeforces</span>
            <Code2 size={9} />
            </a>
         )}

        {data?.personal_info?.codechef && (
        <a
          href={formatUrl(data.personal_info.codechef)}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1 whitespace-nowrap"
        >
          <span>CodeChef</span>
          <Code2 size={9} />
        </a>
        )}

        {data?.personal_info?.geeksforgeeks && (
            <a
            href={formatUrl(data.personal_info.geeksforgeeks)}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 whitespace-nowrap"
            >
            <span>GeeksForGeeks</span>
            <Code2 size={9} />
            </a>
         )}

        {data?.personal_info?.atcoder && (
            <a
            href={formatUrl(data.personal_info.atcoder)}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 whitespace-nowrap"
            >
            <span>AtCoder</span>
          < Code2 size={9} />
            </a>
            )}
        </div>

        </div>
    </header>

      {/* ================= FULL WIDTH ================= */}

      <main>
        {enabled.has("education") && renderEducation()}
        {enabled.has("achievements") && renderAchievements()}

        {showSummary && data?.professional_summary?.trim() && (
          <section>
            <SectionTitle>Professional Summary</SectionTitle>
            <p className="text-justify">{data.professional_summary}</p>
          </section>
        )}

        {/* ================= TWO COLUMNS ================= */}

        <div className="mt-[2px] grid grid-cols-[1fr_1fr] items-start gap-x-[13px]">
          {/* LEFT COLUMN */}
          <div className="min-w-0">
            {showExperience && renderExperience()}

            {showProjects && leftProjects.length > 0 && (
              <div className={showExperience ? "mt-[3px]" : ""}>
                {renderProjects(leftProjects)}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN */}
          <div className="min-w-0">
            {showProjects && rightProjects.length > 0 && (
              <div>{renderProjects(rightProjects)}</div>
            )}

            {showSkills && (
              <div className="mt-[3px]">{renderSkills()}</div>
            )}

            {showCertifications && (
              <div className="mt-[3px]">{renderCertifications()}</div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default EliteTemplate;
