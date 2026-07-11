import { GraduationCap } from 'lucide-react';
import React from 'react'
import { Briefcase, Plus, Sparkles, Trash2 } from "lucide-react";

const EducationForm = ({ data = [], onChange }) => {

  const addEducation = () => {
    const newEducation = {
      institution: "",
      degree: "",
      field: "",
      graduation_date: "",
      gpa: "",
      is_current: false,
    };

    onChange([...data, newEducation]);
  };

  const removeEducation = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateEducation = (index, field, value) => {
    const updated = [...data];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    onChange(updated);
  };

  return (


    <div className="space-y-6">

      {/* Header */}

      <div>
        <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
          <GraduationCap className="size-5" />
          Education
        </h3>

        <p className="text-sm text-gray-500">
          Add your educational qualifications.
        </p>
      </div>

      {/* Empty State */}

      {data.length === 0 ? (

        <div className="border rounded-xl py-10 text-center text-gray-500">

          <GraduationCap className="w-12 h-12 mx-auto mb-3 text-gray-300" />

          <p className="font-medium">
            No education added yet.
          </p>

          <p className="text-sm mt-1">
            Add your college, university, or school details.
          </p>

        </div>

      ) : (

        <div className="space-y-5">

          {data.map((education, index) => (

            <div
              key={index}
              className="border rounded-xl p-5 shadow-sm bg-white"
            >

              {/* Card Header */}

              <div className="flex justify-between items-start mb-5">

                <div>

                  <h4 className="font-semibold text-gray-900">
                    {education.degree || "New Education"}
                  </h4>

                  <p className="text-sm text-gray-500">
                    {education.institution || "Institution Name"}
                  </p>

                </div>

                <button
                  onClick={() => removeEducation(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-5 h-5" />
                </button>

              </div>

              {/* Inputs */}

              <div className="grid md:grid-cols-2 gap-4">

                <input
                  value={education.institution || ""}
                  onChange={(e) =>
                    updateEducation(index, "institution", e.target.value)
                  }
                  placeholder="Institution Name"
                  className="px-3 py-2 border rounded-lg text-sm"
                />

                <input
                  value={education.degree || ""}
                  onChange={(e) =>
                    updateEducation(index, "degree", e.target.value)
                  }
                  placeholder="Degree (B.Tech, M.Tech, MBA...)"
                  className="px-3 py-2 border rounded-lg text-sm"
                />

                <input
                  value={education.field || ""}
                  onChange={(e) =>
                    updateEducation(index, "field", e.target.value)
                  }
                  placeholder="Field of Study"
                  className="px-3 py-2 border rounded-lg text-sm"
                />

                <input
                  type="month"
                  value={education.graduation_date || ""}
                  disabled={education.is_current}
                  onChange={(e) =>
                    updateEducation(index, "graduation_date", e.target.value)
                  }
                  className="px-3 py-2 border rounded-lg text-sm disabled:bg-gray-100"
                />

                <input
                  value={education.gpa || ""}
                  onChange={(e) =>
                    updateEducation(index, "gpa", e.target.value)
                  }
                  placeholder="CGPA / GPA (Optional)"
                  className="px-3 py-2 border rounded-lg text-sm"
                />

              </div>

              {/* Current Studying */}

              <label className="flex items-center gap-2 mt-4">

                <input
                  type="checkbox"
                  checked={education.is_current || false}
                  onChange={(e) =>
                    updateEducation(index, "is_current", e.target.checked)
                  }
                />

                <span className="text-sm text-gray-700">
                  I am currently studying here
                </span>

              </label>

            </div>

          ))}

        </div>

      )}

      {/* Add Button */}

      <button
        type="button"
        onClick={addEducation}
        className="w-full border-2 border-dashed border-blue-300 rounded-xl py-3 text-blue-700 hover:bg-blue-50 transition"
      >
        <Plus className="inline-block w-4 h-4 mr-2" />
        Add Another Education
      </button>

    </div>

  );
};

export default EducationForm