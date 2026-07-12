import React from "react";

const ClassicTemplate = ({ data , sectionOrder=[] }) => {
  const personal = data?.personal_info || {};

  const accentColor = data?.accent_color || "#4F46E5";

  const formatDate = (date) => {
    if (!date) return "";

    try {
      const [year, month] = date.split("-");

      return new Date(year, month - 1).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });
    } catch {
      return date;
    }
  };

  const formatRange = (item) => {
    const start = formatDate(item.start_date);

    const end = item.is_current
      ? "Present"
      : formatDate(item.end_date);

    if (!start && !end) return "";

    return `${start} - ${end}`;
  };

  const parseDescription = (text) => {
    if (!text) return [];

    return text
      .split("\n")
      .map((line) =>
        line
          .replace(/^[-•*]\s*/, "")
          .trim()
      )
      .filter(Boolean);
  };

  const renderLinks = () => {
    const links = [
      {
        label: "LinkedIn",
        value: personal.linkedin,
      },
      {
        label: "GitHub",
        value: personal.github,
      },
      {
        label: "Portfolio",
        value: personal.portfolio,
      },
      {
        label: "LeetCode",
        value: personal.leetcode,
      },
      {
        label: "Codeforces",
        value: personal.codeforces,
      },
      {
        label: "CodeChef",
        value: personal.codechef,
      },
      {
        label: "GeeksforGeeks",
        value: personal.geeksforgeeks,
      },
      {
        label: "AtCoder",
        value: personal.atcoder,
      },
    ].filter((item) => item.value);

    if (!links.length) return null;

    return (
<<<<<<< HEAD
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          marginTop: 12,
        }}
      >
        {links.map((item) => (
          <a
            key={item.label}
            href={item.value}
            target="_blank"
            rel="noreferrer"
            style={{
              color: "#CFCFCF",
              textDecoration: "none",
              fontSize: 12,
            }}
          >
            {item.label}
          </a>
        ))}
      </div>
=======
        <div className="max-w-4xl mx-auto p-8 bg-white text-gray-800 leading-relaxed">
            {/* Header */}
            <header className="text-center mb-8 pb-6 border-b-2" style={{ borderColor: accentColor }}>
                <h1 className="text-3xl font-bold mb-2" style={{ color: accentColor }}>
                    {data.personal_info?.full_name || "Your Name"}
                </h1>

                <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                    {data.personal_info?.email && (
                        <div className="flex items-center gap-1">
                            <Mail className="size-4" />
                            <span>{data.personal_info.email}</span>
                        </div>
                    )}
                    {data.personal_info?.phone && (
                        <div className="flex items-center gap-1">
                            <Phone className="size-4" />
                            <span>{data.personal_info.phone}</span>
                        </div>
                    )}
                    {data.personal_info?.location && (
                        <div className="flex items-center gap-1">
                            <MapPin className="size-4" />
                            <span>{data.personal_info.location}</span>
                        </div>
                    )}
                    {data.personal_info?.linkedin && (
                        <div className="flex items-center gap-1">
                            <Linkedin className="size-4" />
                            <span className="break-all">{data.personal_info.linkedin}</span>
                        </div>
                    )}
                    {data.personal_info?.website && (
                        <div className="flex items-center gap-1">
                            <Globe className="size-4" />
                            <span className="break-all">{data.personal_info.website}</span>
                        </div>
                    )}
                </div>
            </header>

            {/* Professional Summary */}
            {data.professional_summary && (
                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-3" style={{ color: accentColor }}>
                        PROFESSIONAL SUMMARY
                    </h2>
                    <p className="text-gray-700 leading-relaxed">{data.professional_summary}</p>
                </section>
            )}

            {/* Experience */}
            {data.experience && data.experience.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-4" style={{ color: accentColor }}>
                        PROFESSIONAL EXPERIENCE
                    </h2>

                    <div className="space-y-4">
                        {data.experience.map((exp, index) => (
                            <div key={index} className="border-l-3 pl-4" style={{ borderColor: accentColor }}>
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                                        <p className="text-gray-700 font-medium">{exp.company}</p>
                                    </div>
                                    <div className="text-right text-sm text-gray-600">
                                        <p>{formatDate(exp.start_date)} - {exp.is_current ? "" : formatDate(exp.end_date)}</p>
                                    </div>
                                </div>
                                {exp.description && (
                                    <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                                        {exp.description}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects */}
            {data.project && data.project.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-4" style={{ color: accentColor }}>
                        PROJECTS
                    </h2>

                    <ul className="space-y-3 ">
                        {data.project.map((proj, index) => (
                            <div key={index} className="flex justify-between items-start border-l-3 border-gray-300 pl-6">
                                <div>
                                    <li className="font-semibold text-gray-800 ">{proj.name}</li>
                                    <p className="text-gray-600">{proj.description}</p>
                                </div>
                            </div>
                        ))}
                    </ul>
                </section>
            )}

            {/* Education */}
            {data.education && data.education.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-4" style={{ color: accentColor }}>
                        EDUCATION
                    </h2>

                    <div className="space-y-3">
                        {data.education.map((edu, index) => (
                            <div key={index} className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold text-gray-900">
                                        {edu.degree} {edu.field && `in ${edu.field}`}
                                    </h3>
                                    <p className="text-gray-700">{edu.institution}</p>
                                    {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                                </div>
                                <div className="text-sm text-gray-600">
                                    <p>{formatDate(edu.graduation_date)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {data.skills && data.skills.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-4" style={{ color: accentColor }}>
                        CORE SKILLS
                    </h2>

                    <div className="flex gap-4 flex-wrap">
                        {data.skills.map((skill, index) => (
                            <div key={index} className="text-gray-700">
                                • {skill}
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
>>>>>>> d453cae5d7cb3e98a6c9104d88337bfe4a5386eb
    );
  };

  const SectionTitle = ({ children }) => (
    <div
      style={{
        marginTop: 32,
        marginBottom: 16,
      }}
    >
      <h2
        style={{
          margin: 0,
          color: "#ffffff",
          fontSize: 15,
          fontWeight: 700,
          letterSpacing: 1.5,
          textTransform: "uppercase",
          borderBottom: "1px solid #3b3b3b",
          paddingBottom: 8,
        }}
      >
        {children}
      </h2>
    </div>
  );

  const renderSummary = () => {
    if (!data.professional_summary) return null;

    return (
      <>
        <SectionTitle>Professional Summary</SectionTitle>

        <p
          style={{
            margin: 0,
            color: "#D6D6D6",
            lineHeight: 1.8,
            fontSize: 13,
          }}
        >
          {data.professional_summary}
        </p>
      </>
    );
  };

  const renderExperience = () => {
    if (!data.experience?.length) return null;

    return (
      <>
        <SectionTitle>Experience</SectionTitle>

        {data.experience.map((exp, index) => (
          <div
            key={index}
            style={{
              marginBottom: 28,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: 20,
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 16,
                    color: "#fff",
                    fontWeight: 700,
                  }}
                >
                  {exp.position}
                </div>

                <div
                  style={{
                    color: "#CFCFCF",
                    fontSize: 13,
                    marginTop: 4,
                  }}
                >
                  {exp.company}
                  {exp.location && ` • ${exp.location}`}
                </div>

                {exp.employment_type && (
                  <div
                    style={{
                      color: "#8D8D8D",
                      marginTop: 4,
                      fontSize: 12,
                    }}
                  >
                    {exp.employment_type}
                  </div>
                )}
              </div>

              <div
                style={{
                  whiteSpace: "nowrap",
                  color: "#9D9D9D",
                  fontSize: 12,
                }}
              >
                {formatRange(exp)}
              </div>
            </div>

            {parseDescription(exp.description).length > 0 && (
              <ul
                style={{
                  marginTop: 12,
                  marginBottom: 0,
                  paddingLeft: 20,
                  color: "#D4D4D4",
                  fontSize: 13,
                  lineHeight: 1.8,
                }}
              >
                {parseDescription(exp.description).map((item, i) => (
                  <li
                    key={i}
                    style={{
                      marginBottom: 6,
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </>
    );
  };

    const renderEducation = () => {
    if (!data.education?.length) return null;

    return (
      <>
        <SectionTitle>Education</SectionTitle>

        {data.education.map((edu, index) => (
          <div
            key={index}
            style={{
              marginBottom: 24,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: 20,
              }}
            >
              <div>
                <div
                  style={{
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 15,
                  }}
                >
                  {edu.institution}
                </div>

                <div
                  style={{
                    marginTop: 5,
                    color: "#d4d4d4",
                    fontSize: 13,
                  }}
                >
                  {[edu.degree, edu.field]
                    .filter(Boolean)
                    .join(" • ")}
                </div>

                {edu.gpa && (
                  <div
                    style={{
                      marginTop: 4,
                      color: "#9b9b9b",
                      fontSize: 12,
                    }}
                  >
                    GPA : {edu.gpa}
                  </div>
                )}
              </div>

              <div
                style={{
                  color: "#9b9b9b",
                  fontSize: 12,
                  whiteSpace: "nowrap",
                }}
              >
                {edu.graduation_date}
              </div>
            </div>
          </div>
        ))}
      </>
    );
  };

  const renderProjects = () => {
    if (!data.project?.length) return null;

    return (
      <>
        <SectionTitle>Projects</SectionTitle>

        {data.project.map((project, index) => (
          <div
            key={index}
            style={{
              marginBottom: 28,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 15,
                }}
              >
                {project.name}
              </div>

              <div
                style={{
                  color: "#999",
                  fontSize: 12,
                }}
              >
                {project.type}
              </div>
            </div>

            {project.tech_stack && (
              <div
                style={{
                  marginTop: 5,
                  color: accentColor,
                  fontSize: 12,
                  fontWeight: 500,
                }}
              >
                {project.tech_stack}
              </div>
            )}

            {(project.github || project.live_demo) && (
              <div
                style={{
                  display: "flex",
                  gap: 18,
                  marginTop: 8,
                }}
              >
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      color: "#d4d4d4",
                      fontSize: 12,
                      textDecoration: "none",
                    }}
                  >
                    GitHub
                  </a>
                )}

                {project.live_demo && (
                  <a
                    href={project.live_demo}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      color: "#d4d4d4",
                      fontSize: 12,
                      textDecoration: "none",
                    }}
                  >
                    Live Demo
                  </a>
                )}
              </div>
            )}

            {parseDescription(project.description).length > 0 && (
              <ul
                style={{
                  paddingLeft: 20,
                  marginTop: 12,
                  color: "#d4d4d4",
                  lineHeight: 1.8,
                  fontSize: 13,
                }}
              >
                {parseDescription(project.description).map((item, i) => (
                  <li
                    key={i}
                    style={{
                      marginBottom: 6,
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </>
    );
  };

  const renderSkills = () => {
    if (!data.skills) return null;

    return (
      <>
        <SectionTitle>Skills</SectionTitle>

        {Array.isArray(data.skills) ? (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
            }}
          >
            {data.skills.map((skill, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid #444",
                  color: "#fff",
                  padding: "6px 14px",
                  borderRadius: 4,
                  fontSize: 12,
                }}
              >
                {skill}
              </div>
            ))}
          </div>
        ) : (
          Object.entries(data.skills).map(([category, list]) => (
            <div
              key={category}
              style={{
                marginBottom: 18,
              }}
            >
              <div
                style={{
                  color: accentColor,
                  fontWeight: 700,
                  marginBottom: 10,
                }}
              >
                {category}
              </div>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 10,
                }}
              >
                {list.map((skill, i) => (
                  <div
                    key={i}
                    style={{
                      border: "1px solid #444",
                      color: "#fff",
                      padding: "6px 14px",
                      borderRadius: 4,
                      fontSize: 12,
                    }}
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </>
    );
  };

    const renderAchievements = () => {
    if (!data.achievements?.length) return null;

    return (
      <>
        <SectionTitle>Achievements</SectionTitle>

        <ul
          style={{
            paddingLeft: 20,
            margin: 0,
            color: "#d4d4d4",
            fontSize: 13,
            lineHeight: 1.8,
          }}
        >
          {data.achievements.map((achievement, index) => (
            <li
              key={index}
              style={{
                marginBottom: 8,
              }}
            >
              {achievement}
            </li>
          ))}
        </ul>
      </>
    );
  };

  const renderCertifications = () => {
    if (!data.certifications?.length) return null;

    return (
      <>
        <SectionTitle>Certifications</SectionTitle>

        {data.certifications.map((cert, index) => (
          <div
            key={index}
            style={{
              marginBottom: 24,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: 20,
              }}
            >
              <div>
                <div
                  style={{
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 15,
                  }}
                >
                  {cert.name}
                </div>

                {cert.issuer && (
                  <div
                    style={{
                      marginTop: 5,
                      color: "#d4d4d4",
                      fontSize: 13,
                    }}
                  >
                    {cert.issuer}
                  </div>
                )}

                {cert.credential_id && (
                  <div
                    style={{
                      marginTop: 5,
                      color: "#999",
                      fontSize: 12,
                    }}
                  >
                    Credential ID : {cert.credential_id}
                  </div>
                )}

                {cert.credential_url && (
                  <a
                    href={cert.credential_url}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "inline-block",
                      marginTop: 8,
                      color: accentColor,
                      textDecoration: "none",
                      fontSize: 12,
                    }}
                  >
                    View Credential
                  </a>
                )}
              </div>

              <div
                style={{
                  whiteSpace: "nowrap",
                  color: "#999",
                  fontSize: 12,
                }}
              >
                {cert.issue_date}
              </div>
            </div>
          </div>
        ))}
      </>
    );
  };

  const renderSection = (id) => {
    switch (id) {
      case "summary":
        return renderSummary();

      case "experience":
        return renderExperience();

      case "education":
        return renderEducation();

      case "projects":
        return renderProjects();

      case "skills":
        return renderSkills();

      case "achievements":
        return renderAchievements();

      case "certifications":
        return renderCertifications();

      default:
        return null;
    }
  };

    return (
    <div
      style={{
        width: "210mm",
        minHeight: "297mm",
        margin: "0 auto",
        background: "#1E1E1E",
        color: "#ffffff",
        padding: "48px",
        fontFamily: "Inter, Arial, sans-serif",
        boxSizing: "border-box",
      }}
    >
      {/* ================= HEADER ================= */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          borderBottom: "2px solid #3a3a3a",
          paddingBottom: 28,
          marginBottom: 30,
        }}
      >
        <div style={{ flex: 1 }}>
          <h1
            style={{
              margin: 0,
              fontSize: 36,
              fontWeight: 700,
              color: accentColor,
              letterSpacing: 1,
            }}
          >
            {personal.full_name || "Your Name"}
          </h1>

          {personal.profession && (
            <div
              style={{
                marginTop: 8,
                fontSize: 17,
                color: "#D6D6D6",
              }}
            >
              {personal.profession}
            </div>
          )}

          <div
            style={{
              marginTop: 16,
              display: "flex",
              flexWrap: "wrap",
              gap: 16,
              color: "#BDBDBD",
              fontSize: 12,
            }}
          >
            {personal.phone && <span>{personal.phone}</span>}

            {personal.email && <span>{personal.email}</span>}

            {personal.location && (
              <span>{personal.location}</span>
            )}
          </div>

          {renderLinks()}
        </div>

        {personal.image && (
          <img
            src={personal.image}
            alt="profile"
            style={{
              width: 110,
              height: 110,
              borderRadius: 8,
              objectFit: "cover",
              marginLeft: 30,
            }}
          />
        )}
      </div>

      {/* ================= BODY ================= */}

      {(data.sectionOrder || []).map((section) => (
        <React.Fragment key={section.id}>
          {renderSection(section.id)}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ClassicTemplate;