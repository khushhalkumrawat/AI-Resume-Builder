import { GraduationCap } from 'lucide-react';
import React from 'react'
import { Briefcase, Plus, Sparkles, Trash2 } from "lucide-react";
import api from '../configs/api';
import { useSelector } from "react-redux";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";

const ProjectForm = ({ data = [], onChange }) => {

    const { token } = useSelector((state) => state.auth)
    const [generatingIndex, setGeneratingIndex] = useState(-1);

    const addProject = () => {
        const newProject = {
            name: "",
            type: "",
            tech_stack: "",
            github: "",
            live_demo: "",
            description: "",
        };

        onChange([...data, newProject]);
    };

    const removeProject = (index) => {
        const updated = data.filter((_, i) => i !== index);
        onChange(updated);
    };

    const updateProject = (index, field, value) => {

        const updated = [...data];

        updated[index] = {
            ...updated[index],
            [field]: value,
        };

        onChange(updated);
    };

    const generateDescription = async (index) => {
        setGeneratingIndex(index);
        const ProJect = data[index];
        const prompt = `
Improve the following resume project.

Name:
${ProJect.name}

Tech_Stack:
${ProJect.tech_stack}

Github:
${ProJect.github}

Live_Demo:
${ProJect.live_demo}

Current Description:
${ProJect.description}

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
            const { data } = await api.post('/api/ai/enhance-project-desc', { userContent: prompt }, { headers: { Authorization: token } })
            updateProject(index, "description", data.enhancedContent.content);
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

    };

    return (

        <div>

            <button
                onClick={addProject}
                className="flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"  >
                <Plus className="size-4" />
                Add Project
            </button>

            <div className="space-y-6 mt-6">

                {data?.length === 0 ? (

                    <div className="border rounded-xl py-10 text-center text-gray-500">

                        <Briefcase className="w-12 h-12 mx-auto mb-3 text-gray-300" />

                        <p className="font-medium">
                            No projects added yet.
                        </p>

                        <p className="text-sm mt-1">
                            Showcase your best academic or personal projects.
                        </p>

                    </div>

                ) : (

                    data.map((project, index) => (

                        <div
                            key={index}
                            className="border rounded-xl p-5 bg-white shadow-sm"
                        >

                            {/* Header */}

                            <div className="flex justify-between items-start mb-5">

                                <div>

                                    <h4 className="font-semibold text-gray-900">
                                        {project.name || "New Project"}
                                    </h4>

                                    <p className="text-sm text-gray-500">
                                        {project.type || "Project Type"}
                                    </p>

                                </div>

                                <button
                                    onClick={() => removeProject(index)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>

                            </div>

                            {/* Inputs */}

                            <div className="grid md:grid-cols-2 gap-4">

                                <input
                                    value={project.name || ""}
                                    onChange={(e) =>
                                        updateProject(index, "name", e.target.value)
                                    }
                                    placeholder="Project Name"
                                    className="border rounded-lg px-3 py-2 text-sm md:col-span-2"
                                />


                                <input
                                    value={project.type || ""}
                                    onChange={(e) =>
                                        updateProject(index, "type", e.target.value)
                                    }
                                    placeholder="Category : Web App / Mobile App / ML / Research..."
                                    className="border rounded-lg px-3 py-2 text-sm md:col-span-2"
                                />

                                <input
                                    value={project.tech_stack || ""}
                                    onChange={(e) =>
                                        updateProject(index, "tech_stack", e.target.value)
                                    }
                                    placeholder="Tech Stack : React, Node.js, MongoDB..."
                                    className="border rounded-lg px-3 py-2 text-sm md:col-span-2"
                                />

                                <input
                                    value={project.github || ""}
                                    onChange={(e) =>
                                        updateProject(index, "github", e.target.value)
                                    }
                                    placeholder="GitHub Repository URL"
                                    className="border rounded-lg px-3 py-2 text-sm md:col-span-2"
                                />

                                <input
                                    value={project.live_demo || ""}
                                    onChange={(e) =>
                                        updateProject(index, "live_demo", e.target.value)
                                    }
                                    placeholder="Live Demo URL"
                                    className="border rounded-lg px-3 py-2 text-sm md:col-span-2"
                                />

                            </div>

                            {/* Description */}

                            <div className="mt-5">

                                <div className="flex items-center justify-between">

                                    <label className="text-sm font-medium">
                                        Project Description

                                    </label>

                                    <button
                                        type="button"
                                        onClick={() => generateDescription(index)}
                                        disabled={
                                            generatingIndex === index
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
                                    value={project.description || ""}
                                    onChange={(e) =>
                                        updateProject(index, "description", e.target.value)
                                    }
                                    placeholder={`• Built a scalable full-stack application...

• Reduced loading time by 40%.

• Implemented JWT Authentication.

• Used MongoDB for efficient storage.`}
                                    className="w-full mt-2 border rounded-lg px-3 py-3 resize-none text-sm"
                                />

                                <div className="flex justify-between mt-2 text-xs text-gray-500">

                                    <span>
                                        Characters : {project.description?.length || 0}
                                    </span>

                                    <span>
                                        Use bullet points for ATS-friendly resumes.
                                    </span>

                                </div>

                            </div>

                        </div>

                    ))

                )}

            </div>

        </div>





    )
};

export default ProjectForm