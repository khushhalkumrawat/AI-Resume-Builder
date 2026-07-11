import { Plus, X } from "lucide-react";
import React, { useState } from "react";

const SkillsForm = ({ data = [], onChange }) => {
    const [category, setCategory] = useState("");
    const [skills, setSkills] = useState("");

    const addCategory = () => {
        if (!category.trim() || !skills.trim()) return;

        const exists = data.some(
            (item) =>
                item.category.toLowerCase() === category.trim().toLowerCase()
        );

        if (exists) {
            alert("Category already exists.");
            return;
        }

        onChange([
            ...data,
            {
                category: category.trim(),
                skills: skills
                    .split(",")
                    .map((skill) => skill.trim())
                    .filter(Boolean),
            },
        ]);

        setCategory("");
        setSkills("");
    };

    const removeCategory = (index) => {
        onChange(data.filter((_, i) => i !== index));
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addCategory();
        }
    };

    return (
        <div className="space-y-5">
            {/* Header */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900">
                    Skills
                </h3>
                <p className="text-sm text-gray-500">
                    Create your own skill categories and add skills separated by commas.
                </p>
            </div>

            {/* Inputs */}
            <div className="space-y-3">

                <input
                    type="text"
                    placeholder="Category (e.g. Programming Languages)"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />

                <input
                    type="text"
                    placeholder="Skills (e.g. C++, JavaScript, Python)"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />

                <button
                    onClick={addCategory}
                    disabled={!category.trim() || !skills.trim()}
                    className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Plus className="w-4 h-4" />
                    Add Category
                </button>

            </div>

            {/* Preview */}
            {data.length > 0 ? (
                <div className="space-y-3">
                    {data.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-start justify-between rounded-lg border border-gray-200 p-3"
                        >
                            <div className="flex-1">
                                <span className="font-bold">
                                    {item.category} :
                                </span>{" "}
                                <span>{item.skills.join(", ")}</span>
                            </div>

                            <button
                                onClick={() => removeCategory(index)}
                                className="ml-3 rounded-full p-1 hover:bg-red-100"
                            >
                                <X className="w-4 h-4 text-red-500" />
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="rounded-lg border-2 border-dashed border-gray-300 p-6 text-center text-gray-500">
                    <p className="font-medium">No skill categories added yet.</p>
                    <p className="text-sm mt-1">
                        Create a category and add comma-separated skills.
                    </p>
                </div>
            )}

            {/* Tip */}
            <div className="rounded-lg bg-blue-50 p-3 text-sm text-blue-900">
                <strong>Example</strong>

                <div className="mt-2 space-y-1">
                    <div>
                        <strong>Programming Languages :</strong> C++, JavaScript, Python
                    </div>

                    <div>
                        <strong>Frontend :</strong> HTML5, CSS3, React.js
                    </div>

                    <div>
                        <strong>Backend :</strong> Node.js, Express.js
                    </div>

                    <div>
                        <strong>Tools & Technologies :</strong> Git, Docker, VS Code
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkillsForm;