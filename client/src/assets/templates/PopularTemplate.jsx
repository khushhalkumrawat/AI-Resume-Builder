import React from "react";

const ProfessionalGrayTemplate = ({ data, sectionOrder = [] }) => {

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

    const Separator = () => (
        <span className="mx-2 text-gray-300">•</span>
    );


    const renderSummary = () => {
        return (
            data.professional_summary && (

                <section style={{
                    marginBottom: `${data.section_spacing || 12}px`
                }}>

                    <div className="bg-[#d9d9d9] text-center font-bold uppercase py-[3px] text-[15px]">

                        Professional Summary

                    </div>

                    <p className="mt-4 space-y-5">

                        {data.professional_summary}

                    </p>

                </section>
            )
        )
    };


    const renderEducation = () => {
        return (
            data.education?.length > 0 && (
                <section style={{
                    marginBottom: `${data.section_spacing}px`
                }}>
                    <div className="bg-[#d9d9d9] text-center font-bold uppercase py-[3px] text-[15px]">
                        Education
                    </div>

                    <div className="mt-4 space-y-5">
                        {data.education.map((edu, index) => (
                            <div
                                key={index}
                                className="flex justify-between items-start"
                            >
                                <div className="w-[75%]">
                                    <h3 className="font-semibold text-gray-800" >
                                        {edu.institution}
                                    </h3>

                                    <p>
                                        {edu.degree}
                                        {edu.field &&
                                            ` in ${edu.field}`}
                                    </p>
                                </div>

                                <div className="text-right whitespace-nowrap text-gray-600 text-[13px]">
                                    <p>
                                        {formatDate(
                                            edu.graduation_date
                                        )}
                                    </p>

                                    {edu.gpa && (
                                        <p>{edu.gpa}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )
        )
    };

    const renderSkills = () => {
        return (
            data.skills && data.skills.length > 0 && (
                <section style={{
                    marginBottom: `${data.section_spacing}px`
                }}>
                    <div className="bg-[#d9d9d9] text-center font-bold uppercase py-[3px] text-[15px]">
                        Skills
                    </div>

                    <div className="mt-4 space-y-3 text-[13px] leading-6">
                        {data.skills.map((item, index) => (
                            <div key={index} className="flex items-start">
                                {/* Category */}
                                <span className="font-semibold min-w-[180px] text-gray-800">
                                    {item.category} :
                                </span>

                                {/* Skills */}
                                <span className="flex-1">
                                    {item.skills.join(", ")}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>
            )
        )
    };


    const renderExperience = () => {
        return (
            data.experience?.length > 0 && (
                <section
                    style={{
                        marginBottom: `${data.section_spacing}px`,
                    }}
                >
                    <div className="bg-[#d9d9d9] text-center font-bold uppercase py-[3px] text-[15px]">
                        Experience
                    </div>

                    <div className="mt-3 space-y-4">
                        {data.experience.map((exp, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-start">

                                    {/* Left Side */}
                                    <div className="w-[75%]">
                                        <h3 className="font-semibold text-gray-800">

                                            {exp.position}

                                            {exp.company && (
                                                <span className="font-medium text-gray-700">
                                                    {" | "}{exp.company}
                                                </span>
                                            )}

                                            {exp.location && (
                                                <span className="font-normal text-gray-500">
                                                    {" • "}{exp.location}
                                                </span>
                                            )}

                                            {exp.employment_type && (
                                                <span className="font-normal text-gray-500">
                                                    {" • "}{exp.employment_type}
                                                </span>
                                            )}

                                        </h3>
                                    </div>

                                    {/* Right Side */}
                                    <div className="text-right whitespace-nowrap text-gray-500 text-[13px]">
                                        {formatDate(exp.start_date)} -{" "}
                                        {exp.is_current
                                            ? "Present"
                                            : formatDate(exp.end_date)}
                                    </div>

                                </div>

                                {/* Description */}
                                {typeof exp.description === "string" && exp.description.trim() && (
                                    <ul className="list-disc pl-5 mt-1 space-y-1 leading-[1.6] text-[13px] text-gray-700">
                                        {exp.description
                                            .split("\n")
                                            .filter((line) => line.trim())
                                            .map((line, i) => (
                                                <li key={i}>
                                                    {line.replace(/^\*\s*/, "")}
                                                </li>
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
                <section
                    style={{
                        marginBottom: `${data.section_spacing}px`,
                    }}
                >
                    <div className="bg-[#d9d9d9] text-center font-bold uppercase py-[3px] text-[15px]">
                        Projects
                    </div>

                    <div className="mt-3 space-y-4">
                        {data.project.map((project, index) => (
                            <div key={index}>

                                {/* Project Heading */}
                                <div className="flex justify-between items-center">

                                    <h3 className="font-semibold text-gray-800">
                                        {project.name}
                                        {project.tech_stack && (
                                            <> | {project.tech_stack}</>
                                        )}
                                    </h3>

                                    <div className="flex gap-3 text-[12px]">
                                        {project.github && (
                                            <a
                                                href={formatUrl(project.github)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-gray-600 hover:text-gray-800 hover:underline"
                                            >
                                                GitHub
                                            </a>
                                        )}

                                        {project.live_demo && (
                                            <a
                                                href={formatUrl(project.live_demo)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-gray-600 hover:text-gray-800 hover:underline"
                                            >
                                                Live Demo
                                            </a>
                                        )}
                                    </div>

                                </div>

                                {/* Description */}
                                {project.description && (
                                    <ul className="list-disc pl-5 mt-1 space-y-1 leading-[1.6] text-[13px] text-gray-700">
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
                <section style={{
                    marginBottom: `${data.section_spacing}px`
                }}>
                    <div className="bg-[#d9d9d9] text-center font-bold uppercase py-[3px] text-[15px]">
                        Achievements
                    </div>

                    <ul className="mt-4 list-disc pl-6 space-y-1 leading-6 text-[13px]">
                        {data.achievements.map((achievement, index) => (
                            <li key={index} className="text-[12px]">
                                {achievement}
                            </li>
                        ))}
                    </ul>
                </section>
            )
        )
    };

    const renderCertifications = () => {
        return (
            data.certifications?.length > 0 && (
                <section style={{
                    marginBottom: `${data.section_spacing}px`
                }}>
                    <div className="bg-[#d9d9d9] text-center font-bold uppercase py-[3px] text-[15px]">
                        Certifications
                    </div>

                    <div className="mt-3 space-y-4">
                        {data.certifications.map((certification, index) => (
                            <div key={index}>
                                <h3 className="font-semibold text-gray-800" >
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
        )
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
        <div
            className="w-[210mm] min-h-[297mm] bg-white mx-auto shadow-xl"
            style={{
                fontFamily: "Inter, Arial, sans-serif",
                fontSize: `${data.font_size || 15}px`,
                lineHeight: 1.3,
                color: "#4b5563",
            }}
        >
            {/* ================= HEADER ================= */}

            <header className="border-b border-gray-300 px-8 pt-4 pb-3">

                {/* Name + Profession */}
                <div className="text-center">
                    <h1 className="text-[24px] font-semibold text-gray-800 tracking-tight">
                        {data.personal_info.full_name}

                        {data.personal_info.profession && (
                            <>
                                <span className="mx-3 text-gray-400 font-normal">|</span>

                                <span className="text-[20px] font-medium text-gray-600">
                                    {data.personal_info.profession}
                                </span>
                            </>
                        )}
                    </h1>
                </div>

                {/* Contact + Links */}
                <div className="mt-4 flex flex-wrap justify-center items-center gap-x-3 gap-y-2 text-[13px]">

                    {data.personal_info.phone &&
                        <>
                            <span>{data.personal_info.phone}</span>
                            <Separator />
                        </>
                    }

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

                    {data.personal_info.linkedin && (
                        <>
                            <a
                                href={formatUrl(data.personal_info.linkedin)}
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-700 hover:underline"
                            >
                                LinkedIn
                            </a>
                            <Separator />
                        </>
                    )}

                    {data.personal_info.github && (
                        <>
                            <a
                                href={formatUrl(data.personal_info.github)}
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-700 hover:underline"
                            >
                                GitHub
                            </a>
                            <Separator />
                        </>
                    )}

                    {data.personal_info.portfolio && (
                        <>
                            <a
                                href={formatUrl(data.personal_info.portfolio)}
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-700 hover:underline"
                            >
                                Portfolio
                            </a>
                            <Separator />
                        </>
                    )}

                    {data.personal_info.leetcode && (
                        <>
                            <a
                                href={formatUrl(data.personal_info.leetcode)}
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-700 hover:underline"
                            >
                                LeetCode
                            </a>
                            <Separator />
                        </>
                    )}

                    {data.personal_info.codeforces && (
                        <>
                            <a
                                href={formatUrl(data.personal_info.codeforces)}
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-700 hover:underline"
                            >
                                Codeforces
                            </a>
                            <Separator />
                        </>
                    )}

                    {data.personal_info.geeksforgeeks && (
                        <a
                            href={formatUrl(data.personal_info.geeksforgeeks)}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-700 hover:underline"
                        >
                            GFG
                        </a>
                    )}
                </div>

            </header>

            {/*================== Root container =================== */}

            <div
                className="px-10 pt-3 pb-8"
                style={{
                    fontFamily: "Inter, Arial, sans-serif",
                    fontSize: `${data.font_size || 15}px`,
                    lineHeight: data.line_height || 1.3,
                }}
            >

                {
                    (sectionOrder.length
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
                    ))
                }

            </div>
        </div>
    );
};

export default ProfessionalGrayTemplate;