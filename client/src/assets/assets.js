import dummy_profile from "./dummy_profile.png";

export const dummyResumeData = [
  {
    // -------------------------------- Resume --------------------------------

    _id: "68d2a31a1c4dd38875bb037e",
    userId: "68c180acdf1775dfd02c6d87",

    title: "Alex's Resume",

    public: true,

    template: "iitbhu",

    accent_color: "#14B8A6",

    font_size: 15,
    line_height: 1.3,
    section_spacing: 14,

    personal_info: {
      image: dummy_profile,

      full_name: "Alex Smith",

      profession: "Full Stack Developer",

      email: "alexsmith@gmail.com",

      phone: "+91 9876543210",

      location: "Bangalore, India",

      linkedin: "https://linkedin.com/in/alexsmith",

      portfolio: "https://alexsmith.dev",

      github: "https://github.com/alexsmith",

      leetcode: "https://leetcode.com/u/alexsmith",

      codeforces: "https://codeforces.com/profile/alexsmith",

      codechef: "https://www.codechef.com/users/alexsmith",

      geeksforgeeks:
        "https://auth.geeksforgeeks.org/user/alexsmith",

      atcoder: "https://atcoder.jp/users/alexsmith",
    },

    professional_summary:
      "Highly analytical Data Analyst with 6 years of experience transforming complex datasets into actionable insights using SQL, Python, and advanced visualization tools.",

    skills: [
      {
        category: "Programming Languages",
        skills: ["JavaScript", "TypeScript", "Python"],
      },
      {
        category: "Frontend",
        skills: [
          "React.js",
          "Next.js",
          "HTML5",
          "CSS3",
          "Tailwind CSS",
        ],
      },
      {
        category: "Backend",
        skills: ["Node.js", "Express.js"],
      },
      {
        category: "Database",
        skills: ["MongoDB", "MySQL"],
      },
      {
        category: "Tools & Technologies",
        skills: [
          "Git",
          "GitHub",
          "Docker",
          "VS Code",
          "Postman",
        ],
      },
      {
        category: "Core CS Concepts",
        skills: [
          "Data Structures & Algorithms",
          "Operating Systems",
          "DBMS",
          "Computer Networks",
          "OOP",
        ],
      },
    ],
    experience: [
      {
        company: "Google",

        position: "Software Engineer",

        location: "Bangalore, India",

        employment_type: "Full Time",

        start_date: "2023-06",

        end_date: "",

        is_current: true,

        description:
          "Developed scalable React applications serving over 100K users.\nOptimized backend APIs reducing response time by 35%.\nCollaborated with designers and product managers to deliver new features.",
      },

      {
        company: "Microsoft",

        position: "Software Engineering Intern",

        location: "Hyderabad, India",

        employment_type: "Internship",

        start_date: "2022-05",

        end_date: "2022-08",

        is_current: false,

        description:
          "Implemented REST APIs using .NET.\nImproved SQL query performance.\nBuilt reusable frontend components using React.",
      },
    ],

    education: [
      {
        institution: "Example Institute of Technology",

        degree: "B.Tech",

        field: "Computer Science",

        graduation_date: "2023-05",

        gpa: "8.7",

        _id: "68d2a31a1c4dd38875bb0380",
      },

      {
        institution: "Example Public School",

        degree: "Higher Secondary",

        field: "PCM",

        graduation_date: "2019-03",

        gpa: "90%",

        _id: "68d2a31a1c4dd38875bb0381",
      },

      {
        institution: "Example Academy",

        degree: "Secondary School",

        field: "",

        graduation_date: "2017-03",

        gpa: "92%",

        _id: "68d2a31a1c4dd38875bb0382",
      },
    ],

    project: [
      {
        name: "Team Task Management System",

        tech_stack:
          "React.js, Node.js, Express.js, MongoDB",

        github:
          "https://github.com/alexsmith/task-manager",

        live_demo:
          "https://taskmanager.vercel.app",

        description:
          "Developed a collaborative task management platform.\nImplemented authentication using JWT.\nAdded real-time task updates.\nDesigned a responsive dashboard.",

        _id: "68d4f882c8f0d46dc8a8b139",
      },

      {
        name: "EduHub - Online Learning Platform",

        tech_stack:
          "React.js, Express.js, MongoDB",

        github:
          "https://github.com/alexsmith/eduhub",

        live_demo:
          "https://eduhub.vercel.app",

        description:
          "Created an online learning platform.\nIntegrated video lessons and quizzes.\nImplemented secure authentication.\nAdded instructor dashboard.",

        _id: "68d4f89dc8f0d46dc8a8b147",
      },
    ],

    achievements: [
      "LeetCode Maximum Rating: 1900+",
      "Solved 700+ DSA problems across coding platforms.",
      "5★ on CodeChef.",
      "Knight on LeetCode.",
    ],

    certifications: [
      {
        name: "META",
        issuer: "Meta",
        issue_date: "2024-12",
        credential_id: "KERN123",
        credential_url: "https://example.com/certificate",
      },
    ],
    sectionOrder: [
      { id: "summary", label: "Professional Summary" },
      { id: "experience", label: "Experience" },
      { id: "education", label: "Education" },
      { id: "projects", label: "Projects" },
      { id: "skills", label: "Skills" },
      { id: "achievements", label: "Achievements" },
      { id: "certifications", label: "Certifications" },
    ],

    createdAt: "2025-09-23T13:39:38.395Z",

    updatedAt: "2025-09-23T13:39:38.395Z",
  },
];