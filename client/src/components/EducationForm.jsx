import { GraduationCap } from 'lucide-react';
import React from 'react'

const EducationForm = () => {

    const addEducation = () => {
        const newEducation = {
            institute : "",
            degree : "",
            field : "",
            graduation_date : "",
            gpa : "",
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
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            <Briefcase className="size-5" />
            Education
          </h3>

          <p className="text-sm text-gray-500">
            Add your Education Details
          </p>
        </div>

        <button
          onClick={addEducation}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
        >
          <Plus className="size-4" />
          Add Education
        </button>
      </div>
      

      {/* Empty State */}
      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <GraduationCap className="w-12 h-12 mx-auto mb-3 text-gray-300" />

          <p>No education added yet.</p>

          <p>Click "Add Education" to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((education, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg space-y-4"
            >
              {/* Header */}
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-gray-800">
                  Education #{index + 1}
                </h4>

                <button
                  onClick={() => removeEducation(index)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              {/* Inputs */}
              <div className="grid md:grid-cols-2 gap-3">
                <input
                  value={education.institute || ""}
                  onChange={(e) =>
                    updatEducation(
                      index,
                      "institute",
                      e.target.value
                    )
                  }
                  type="text"
                  placeholder="Institute Name"
                  className="px-3 py-2 text-sm rounded-lg border border-gray-300 w-full"
                />

                <input
                  value={education.degree || ""}
                  onChange={(e) =>
                    updateEducation(
                      index,
                      "degree",
                      e.target.value
                    )
                  }
                  type="text"
                  placeholder="Degree (e.g., Bachelor's , Master's"
                  className="px-3 py-2 text-sm border border-gray-300 w-full"
                />

                <input
                  value={education.field || ""}
                  onChange={(e) =>
                    updateEducation(
                      index,
                      "field",
                      e.target.value
                    )
                  }
                  type="text"
                  placeholder='Field Of Study'
                  className="px-3 py-2 text-sm border border-gray-300 w-full"
                />

                <input
                  value={education.graduation_date || ""}
                  onChange={(e) =>
                    updateEducation(
                      index,
                      "graduation_date",
                      e.target.value
                    )
                  }
                  type="month"
                  className="px-3 py-2 text-sm border border-gray-300 w-full"
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
                  <label className="text-sm font-medium text-gray-700">
                    Job Description
                  </label>

                  <button
                    type="button"
                    className="flex items-center gap-1 px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50"
                  >
                    <Sparkles className="w-3 h-3" />
                    Enhance with AI
                  </button>
                </div>

                <textarea
                  value={experience.description || ""}
                  onChange={(e) =>
                    updateExperience(
                      index,
                      "description",
                      e.target.value
                    )
                  }
                  rows={4}
                  className="w-full text-sm px-3 py-2 rounded-lg border border-gray-300 resize-none"
                  placeholder="Describe your key responsibilities and achievements..."
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EducationForm