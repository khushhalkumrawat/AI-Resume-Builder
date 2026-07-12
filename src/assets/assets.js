import dummy_profile from "./dummy_profile.png";

export const dummyResumeData = [
<<<<<<< HEAD
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
=======
    {
        // ----------------------------------------------------- Resume 1 ------------------------------------------------------
        personal_info: {
            full_name: "Alex Smith",
            email: "alex@example.com",
            phone: "0 123456789",
            location: "NY, USA",
            linkedin: "https://www.linkedin.com",
            website: "https://www.example.com",
            profession: "Full Stack Developer",
            image: dummy_profile
        },
        _id: "68d2a31a1c4dd38875bb037e",
        userId: "68c180acdf1775dfd02c6d87",
        title: "Alex's Resume",
        public: true,
        professional_summary: "Highly analytical Data Analyst with 6 years of experience transforming complex datasets into actionable insights using SQL, Python, and advanced visualization tools. ",
        skills: ["JavaScript", "React JS", "Full Stack Development", "Git", "GitHub", "NextJS", "Express", "NodeJS", "TypeScript"],
        experience: [
            {
                company: "Example Technologies.",
                position: "Senior Full Stack Developer",
                start_date: "2023-06",
                end_date: "",
                description: "Architected, developed, and deployed innovative full-stack applications at Example Technologies.\ncreating robust back-end systems and intuitive front- end interfaces to deliver meaningful digital experiences ",
                is_current: true,
                _id: "68d2a31a1c4dd38875bb037f"
            },
            {
                company: "Example Technologies.",
                position: "Full Stack Developer",
                start_date: "2019-08",
                end_date: "2023-05",
                description: "Engineered and deployed scalable full-stack web applications for Example Technologies, translating complex requirements into robust front-end interfaces and efficient back-end services.",
                is_current: false,
                _id: "68d4f7abc8f0d46dc8a8b114"
            }
        ],
        education: [
            {
                institution: "Example Institute of Technology",
                degree: "B.TECH",
                field: "CSE",
                graduation_date: "2023-05",
                gpa: "8.7",
                _id: "68d2a31a1c4dd38875bb0380"
            },
            {
                institution: "Example Public School",
                degree: "HIGHER SECONDARY",
                field: "PCM",
                graduation_date: "2019-03",
                gpa: "",
                _id: "68d2a31a1c4dd38875bb0381"
            },
            {
                institution: "Example Academy",
                degree: "SECONDARY SCHOOL",
                field: "",
                graduation_date: "2017-03",
                gpa: "",
                _id: "68d2a31a1c4dd38875bb0382"
            }
        ],
        template: "minimal-image",
        accent_color: "#14B8A6",
        project: [
            {
                name: "Team Task Management System",
                type: "Web Application (Productivity Tool)",
                description: "TaskTrackr is a collaborative task management system designed for teams to create, assign, track, and manage tasks in real time. ",
                _id: "68d4f882c8f0d46dc8a8b139"
            },
            {
                name: "EduHub - Online Learning Platform",
                type: "Web Application (EdTech Platform)",
                description: "EduHub is an online learning platform where instructors can create courses with video lessons, quizzes, and downloadable resources.",
                _id: "68d4f89dc8f0d46dc8a8b147"
            }
        ],
        updatedAt: "2025-09-23T13:39:38.395Z",
        createdAt: "2025-09-23T13:39:38.395Z"
    },
    {
        // ----------------------------------------------------- Resume 2 ------------------------------------------------------
        personal_info: {
            full_name: "Jordan Lee",
            email: "jordan.lee@example.com",
            phone: "0 987654321",
            location: "San Francisco, CA, USA",
            linkedin: "https://www.linkedin.com/in/jordanlee",
            website: "https://www.jordanlee.dev",
            profession: "Frontend Engineer",
            image: dummy_profile
        },
        _id: "78e3b42c2d5ff49286cc148f",
        userId: "78d2e0bdcf2886efg03e7e98",
        title: "Jordan's Resume",
        public: true,
        professional_summary: "Creative and detail-oriented Frontend Engineer with 5+ years of experience crafting responsive, user-centric web applications using React, Vue, and modern CSS frameworks.",
        skills: ["HTML5", "CSS3", "JavaScript", "React", "Vue.js", "SASS", "Tailwind CSS", "Figma", "Web Accessibility", "REST APIs"],
        experience: [
            {
                company: "TechSpark Inc.",
                position: "Lead Frontend Engineer",
                start_date: "2022-02",
                end_date: "",
                description: "Leading a team of frontend developers to build accessible and scalable user interfaces. Collaborated with UX teams to implement design systems and improve frontend performance.",
                is_current: true,
                _id: "78e3b42c2d5ff49286cc1490"
            },
            {
                company: "PixelForge Labs",
                position: "Frontend Developer",
                start_date: "2018-09",
                end_date: "2022-01",
                description: "Developed reusable UI components using React and Vue.js. Worked closely with backend teams to integrate REST APIs and optimize SPA performance.",
                is_current: false,
                _id: "78e3b42c2d5ff49286cc1491"
            }
>>>>>>> d453cae5d7cb3e98a6c9104d88337bfe4a5386eb
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
<<<<<<< HEAD
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
=======
        updatedAt: "2025-09-25T15:10:21.184Z",
        createdAt: "2025-09-25T15:10:21.184Z"
    },
    {
        // ----------------------------------------------------- Resume 3 ------------------------------------------------------
        personal_info: {
            full_name: "Riley Morgan",
            email: "riley.morgan@example.com",
            phone: "0 1122334455",
            location: "Austin, TX, USA",
            linkedin: "https://www.linkedin.com/in/rileymorgan",
            website: "https://www.rileym.dev",
            profession: "Backend Developer",
            image: dummy_profile
        },
        _id: "89f4c53d3e6gg59397dd259g",
        userId: "89e3f1cedg3997fgh14f8f09",
        title: "Riley's Resume",
        public: true,
        professional_summary: "Dedicated Backend Developer with 7+ years of experience building secure, high-performance APIs and microservices using Node.js, Python, and PostgreSQL. Passionate about scalability, automation, and clean architecture.",
        skills: ["Node.js", "Python", "PostgreSQL", "MongoDB", "Docker", "Kubernetes", "CI/CD", "Redis", "GraphQL", "AWS"],
        experience: [
            {
                company: "DataNest Solutions",
                position: "Senior Backend Engineer",
                start_date: "2021-03",
                end_date: "",
                description: "Developed distributed microservices using Node.js and Docker. Implemented API rate limiting, authentication, and background job processing using Redis and Bull.",
                is_current: true,
                _id: "89f4c53d3e6gg59397dd259h"
            },
            {
                company: "CloudCore Systems",
                position: "Backend Developer",
                start_date: "2016-07",
                end_date: "2021-02",
                description: "Maintained and scaled backend systems built on Python and PostgreSQL. Automated deployments with GitLab CI/CD and improved API response time by 35%.",
                is_current: false,
                _id: "89f4c53d3e6gg59397dd259i"
            }
        ],
        education: [
            {
                institution: "Texas Institute of Technology",
                degree: "B.E.",
                field: "Information Technology",
                graduation_date: "2016-05",
                gpa: "3.9",
                _id: "89f4c53d3e6gg59397dd259j"
            },
            {
                institution: "Central High School",
                degree: "High School Diploma",
                field: "Science",
                graduation_date: "2012-04",
                gpa: "",
                _id: "89f4c53d3e6gg59397dd259k"
            }
        ],
        template: "minimal-image",
        accent_color: "#F59E0B",
        project: [
            {
                name: "Invoicr - Invoice Management System",
                type: "Web Application (FinTech)",
                description: "Invoicr is a secure web platform that allows freelancers and small businesses to generate, track, and automate professional invoices. Built with Node.js, MongoDB, and Stripe integration.",
                _id: "89f4c53d3e6gg59397dd259l"
            },
            {
                name: "API Monitor Dashboard",
                type: "DevOps Tool",
                description: "A real-time API monitoring dashboard for microservices. Tracks latency, uptime, and error rates using Prometheus and Grafana.",
                _id: "89f4c53d3e6gg59397dd259m"
            }
        ],
        updatedAt: "2025-09-25T15:26:49.652Z",
        createdAt: "2025-09-25T15:26:49.652Z"
    }
]
>>>>>>> d453cae5d7cb3e98a6c9104d88337bfe4a5386eb
