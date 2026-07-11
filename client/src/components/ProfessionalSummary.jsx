import { Sparkles, Loader2, Lightbulb } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import api from "../configs/api";

const ProfessionalSummary = ({ data, onChange, setResumeData }) => {
    const { token } = useSelector((state) => state.auth);

    const [isGenerating, setIsGenerating] = useState(false);

    const generateSummary = async () => {
        if (!data?.trim()) {
            toast.error("Please write a professional summary first.");
            return;
        }

        try {
            setIsGenerating(true);

            const response = await api.post(
                "/api/ai/enhance-pro-sum",
                {
                    userContent: data,
                },
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );

            const enhanced =
                response.data.enhancedContent?.content ||
                response.data.enhancedContent

            setResumeData((prev) => ({
                ...prev,
                professional_summary: enhanced,
            }));

            toast.success("Professional summary enhanced!");
        } catch (error) {
            console.error(error);

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
            setIsGenerating(false);
        }
    };

    return (
        <div className="space-y-5">

            {/* Header */}

            <div className="flex justify-between items-center">

                <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                        Professional Summary
                    </h3>

                    <p className="text-sm text-gray-500">
                        Write a concise overview that highlights your
                        experience, technical skills and career goals.
                    </p>
                </div>

                <button
                    type="button"
                    disabled={isGenerating || !data?.trim()}
                    onClick={generateSummary}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition disabled:opacity-50"
                >
                    {isGenerating ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        <Sparkles className="w-4 h-4" />
                    )}

                    {isGenerating
                        ? "Enhance Your Summary..."
                        : "AI Enhance"}
                </button>

            </div>

            {/* Textarea */}

            <div>
                <textarea
                    rows={8}
                    value={data || ""}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 p-4 text-sm resize-none focus:ring-2 focus:ring-purple-500 outline-none"
                    placeholder="Example:

Full Stack Developer with 2+ years of experience developing scalable web applications using React, Node.js and MongoDB. Passionate about creating high-performance applications and solving challenging algorithmic problems. Looking to contribute to innovative software products while continuously learning modern technologies."
                />

                <div className="flex justify-between text-xs text-gray-500 mt-2">

                    <span>
                        Words :{" "}
                        {data?.trim()
                            ? data.trim().split(/\s+/).length
                            : 0}
                    </span>

                    <span>
                        Characters : {data?.length || 0}
                    </span>

                </div>

            </div>

            {/* Tips */}

            <div className="rounded-xl bg-purple-50 border border-purple-200 p-4">

                <div className="flex items-center gap-2 font-medium text-purple-700 mb-2">
                    <Lightbulb className="w-4 h-4" />
                    Writing Tips
                </div>

                <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">

                    <li>Keep it between 3–5 sentences.</li>

                    <li>Mention your years of experience.</li>

                    <li>Highlight your strongest technical skills.</li>

                    <li>Include measurable achievements whenever possible.</li>

                    <li>End with your career objective.</li>

                </ul>

            </div>

        </div>
    );
};

export default ProfessionalSummary;