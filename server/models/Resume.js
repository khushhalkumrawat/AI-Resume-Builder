import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    title: {
      type: String,
      default: "Untitled Resume",
    },

    public: {
      type: Boolean,
      default: false,
    },

    template: {
      type: String,
      default: "popular",
    },

    accent_color: {
      type: String,
      default: "#3B82F6",
    },

    professional_summary: {
      type: String,
      default: "",
    },

    skills: {
      type: mongoose.Schema.Types.Mixed,
      default: [],
    },

    personal_info: {
      image: {
        type: String,
        default: "",
      },

      full_name: {
        type: String,
        default: "",
      },

      profession: {
        type: String,
        default: "",
      },

      email: {
        type: String,
        default: "",
      },

      phone: {
        type: String,
        default: "",
      },

      location: {
        type: String,
        default: "",
      },

      linkedin: {
        type: String,
        default: "",
      },

      portfolio: {
        type: String,
        default: "",
      },

      github: {
        type: String,
        default: "",
      },

      leetcode: {
        type: String,
        default: "",
      },

      codeforces: {
        type: String,
        default: "",
      },

      codechef: {
        type: String,
        default: "",
      },

      geeksforgeeks: {
        type: String,
        default: "",
      },

      atcoder: {
        type: String,
        default: "",
      },
    },

    experience: [
      {
        company: {
          type: String,
          default: "",
        },

        position: {
          type: String,
          default: "",
        },

        location: {
          type: String,
          default: "",
        },

        employment_type: {
          type: String,
          default: "",
        },

        start_date: {
          type: String,
          default: "",
        },

        end_date: {
          type: String,
          default: "",
        },

        is_current: {
          type: Boolean,
          default: false,
        },

        description: {
          type: String,
          default: "",
        },
      },
    ],

    project: [{
      name: {
        type: String,
        default: ""
      },
      type: {
        type: String,
        default: ""
      },
      tech_stack: {
        type: String,
        default: ""
      },
      github: {
        type: String,
        default: ""
      },
      live_demo: {
        type: String,
        default: ""
      },
      description: {
        type: String,
        default: ""
      }
    }],

    education: [
      {
        institution: String,

        degree: String,

        field: String,

        graduation_date: String,

        gpa: String,
      },
    ],

    achievements: {
      type: [String],
      default: [],
    },

    certifications: [
      {
        name: {
          type: String,
          default: "",
        },

        issuer: {
          type: String,
          default: "",
        },

        issue_date: {
          type: String,
          default: "",
        },

        credential_id: {
          type: String,
          default: "",
        },

        credential_url: {
          type: String,
          default: "",
        },
      },
    ],

    sectionOrder: {
      type: [
        {
          id: String,
          label: String,
        },
      ],
      default: [
        { id: "summary", label: "Professional Summary" },
        { id: "experience", label: "Experience" },
        { id: "education", label: "Education" },
        { id: "projects", label: "Projects" },
        { id: "skills", label: "Skills" },
        { id: "achievements", label: "Achievements" },
        { id: "certifications", label: "Certifications" },
      ],
    },

    font_size: {
      type: Number,
      default: 14,
    },
  },
  {
    timestamps: true,
    minimize: false,
  }
);

const Resume = mongoose.model("Resume", ResumeSchema);

export default Resume;