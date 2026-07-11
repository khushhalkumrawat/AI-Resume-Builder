import { Briefcase, Plus, Sparkles, Trash2 } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { toast } from "react-hot-toast";
import api from "../configs/api";
import { Loader2 } from "lucide-react";

export const ExperienceForm = ({ data = [], onChange }) => {

  const { token } = useSelector((state) => state.auth)
  const [generatingIndex, setGeneratingIndex] = useState(-1);

  const addExperience = () => {
    const newExperience = {
      company: "",
      position: "",
      location: "",
      employment_type: "",

      start_date: "",
      end_date: "",

      is_current: false,

      description: "",
    };

    onChange([...data, newExperience]);
  };

  const removeExperience = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateExperience = (index, field, value) => {
    const updated = [...data];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    onChange(updated);
  };

  const generateDescription = async (index) => {
    setGeneratingIndex(index);
    const experience = data[index];
    const prompt = `
Improve the following resume experience.

Company:
${experience.company}

Position:
${experience.position}

Location:
${experience.location}

Current Description:
${experience.description}

Requirements:

• ATS friendly

• Professional language

• Use strong action verbs

• Keep bullet points

• Do not invent information

• Improve grammar

• Quantify achievements where possible
`;


    try {
      const { data } = await api.post('/api/ai/enhance-job-desc', { userContent: prompt }, { headers: { Authorization: token } })
      updateExperience(index, "description", data.enhancedContent.content);
    } catch (error) {

      if (!navigator.onLine) {

        toast.error("No internet connection.");

      }

      else if (error.code === "ECONNABORTED") {

        toast.error("AI took too long to respond.");

      }

      else if (error.response?.status === 429) {

        toast.error("AI is busy. Please try again shortly.");

      }

      else if (error.response?.status >= 500) {

        toast.error("AI service is temporarily unavailable.");

      }

      else {

        toast.error("Couldn't generate content.");

      }
    } finally {
      setGeneratingIndex(-1);
    }

  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            <Briefcase className="size-5" />
            Professional Experience
          </h3>

          <p className="text-sm text-gray-500">
            Add your job experience
          </p>
        </div>

        <div className="pt-2">

          <button
            onClick={addExperience}
            className="w-full border-2 border-dashed border-green-300 rounded-lg py-3 text-green-700 hover:bg-green-50 transition"
          >
            + Add Another Experience
          </button>

        </div>
      </div>


      {/* Empty State */}
      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Briefcase className="w-12 h-12 mx-auto mb-3 text-gray-300" />

          <p>No work experience added yet.</p>

          <p>Click "Add Experience" to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((experience, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg space-y-4"
            >
              {/* Header */}
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-gray-800">
                  Experience #{index + 1}
                </h4>

                <button
                  onClick={() => removeExperience(index)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              {/* Inputs */}

              <div className="grid md:grid-cols-2 gap-4">

                {/* Company */}

                <input
                  value={experience.company || ""}
                  onChange={(e) =>
                    updateExperience(index, "company", e.target.value)
                  }
                  placeholder="Company Name"
                  className="px-3 py-2 text-sm rounded-lg border border-gray-300"
                />

                {/* Position */}

                <input
                  value={experience.position || ""}
                  onChange={(e) =>
                    updateExperience(index, "position", e.target.value)
                  }
                  placeholder="Job Title"
                  className="px-3 py-2 text-sm rounded-lg border border-gray-300"
                />

                {/* Location */}

                <input
                  value={experience.location || ""}
                  onChange={(e) =>
                    updateExperience(index, "location", e.target.value)
                  }
                  placeholder="Location (e.g. Bangalore, India)"
                  className="px-3 py-2 text-sm rounded-lg border border-gray-300"
                />

                {/* Employment Type */}

                <select
                  value={experience.employment_type || ""}
                  onChange={(e) =>
                    updateExperience(index, "employment_type", e.target.value)
                  }
                  className="px-3 py-2 text-sm rounded-lg border border-gray-300"
                >
                  <option value="">Employment Type</option>
                  <option>Full Time</option>
                  <option>Internship</option>
                  <option>Part Time</option>
                  <option>Freelance</option>
                  <option>Contract</option>
                </select>

                {/* Start Date */}

                <input
                  type="month"
                  value={experience.start_date || ""}
                  onChange={(e) =>
                    updateExperience(index, "start_date", e.target.value)
                  }
                  className="px-3 py-2 text-sm rounded-lg border border-gray-300"
                />

                {/* End Date */}

                <input
                  type="month"
                  value={experience.end_date || ""}
                  disabled={experience.is_current}
                  onChange={(e) =>
                    updateExperience(index, "end_date", e.target.value)
                  }
                  className="px-3 py-2 text-sm rounded-lg border border-gray-300 disabled:bg-gray-100"
                />

              </div>

              {/* Current Job Checkbox */}
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={experience.is_current || false}
                  onChange={(e) =>
                    updateExperience(
                      index,
                      "is_current",
                      e.target.checked
                    )
                  }
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />

                <span className="text-sm text-gray-700">
                  Currently working here
                </span>
              </label>

              {/* Description */}
              <div className="space-y-2">

                <div className="flex items-center justify-between">

                  <label className="font-medium text-sm">
                    Responsibilities & Achievements
                  </label>

                  <button
                    type="button"
                    onClick={() => generateDescription(index)}
                    disabled={
                      generatingIndex === index ||
                      !experience.position ||
                      !experience.company
                    }
                    className="flex items-center gap-2 px-3 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200 disabled:opacity-50"
                  >
                    {generatingIndex === index ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Sparkles className="w-4 h-4" />
                    )}

                    AI Enhance
                  </button>

                </div>

                <textarea
                  rows={6}
                  value={experience.description || ""}
                  onChange={(e) =>
                    updateExperience(index, "description", e.target.value)
                  }
                  placeholder={`• Developed scalable web applications...

• Reduced API response time by 35%.

• Collaborated with cross-functional teams.`}
                  className="w-full border rounded-lg px-3 py-3 resize-none text-sm"
                />

                <div className="flex justify-between text-xs text-gray-500">

                  <span>
                    Characters: {experience.description?.length || 0}
                  </span>

                  <span>
                    Use bullet points for better ATS compatibility.
                  </span>

                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExperienceForm;