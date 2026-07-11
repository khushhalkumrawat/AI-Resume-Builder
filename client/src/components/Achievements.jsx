import React from "react";
import { Trophy, Plus, Trash2 } from "lucide-react";

const Achievements = ({ data = [], onChange }) => {
    const addAchievement = () => {
        onChange([...data, ""]);
    };

    const removeAchievement = (index) => {
        onChange(data.filter((_, i) => i !== index));
    };

    const updateAchievement = (index, value) => {
        const updated = [...data];
        updated[index] = value;
        onChange(updated);
    };

    return (
        <div className="space-y-6">

            {/* Header */}

            <div>
                <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    Achievements
                </h3>

                <p className="text-sm text-gray-500">
                    Showcase awards, rankings, scholarships, certifications, contest results, or notable accomplishments.
                </p>
            </div>

            {/* Empty State */}

            {data.length === 0 ? (
                <div className="border rounded-xl py-10 text-center text-gray-500">
                    <Trophy className="w-12 h-12 mx-auto mb-3 text-gray-300" />

                    <p className="font-medium">
                        No achievements added yet.
                    </p>

                    <p className="text-sm mt-1">
                        Add achievements that make your resume stand out.
                    </p>
                </div>
            ) : (
                <div className="space-y-5">

                    {data.map((achievement, index) => (
                        <div
                            key={index}
                            className="border rounded-xl p-5 bg-white shadow-sm"
                        >
                            {/* Card Header */}

                            <div className="flex justify-between items-center mb-4">

                                <h4 className="font-semibold text-gray-900">
                                    Achievement #{index + 1}
                                </h4>

                                <button
                                    type="button"
                                    onClick={() => removeAchievement(index)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>

                            </div>

                            {/* Achievement */}

                            <textarea
                                rows={3}
                                value={achievement}
                                onChange={(e) =>
                                    updateAchievement(index, e.target.value)
                                }
                                placeholder={`Example:

• Solved 800+ Data Structures & Algorithms problems across LeetCode and GeeksforGeeks.

• Ranked 488 out of 11,000+ participants on the GeeksforGeeks Institute Leaderboard.

• Achieved a maximum LeetCode rating of 1642.`}
                                className="w-full border rounded-lg px-3 py-3 text-sm resize-none"
                            />

                            <div className="flex justify-between mt-2 text-xs text-gray-500">

                                <span>
                                    Characters : {achievement.length}
                                </span>

                                <span>
                                    Keep it concise and quantify achievements whenever possible.
                                </span>

                            </div>

                        </div>
                    ))}

                </div>
            )}

            {/* Add Button */}

            <button
                type="button"
                onClick={addAchievement}
                className="w-full border-2 border-dashed border-yellow-300 rounded-xl py-3 text-yellow-700 hover:bg-yellow-50 transition"
            >
                <Plus className="inline w-4 h-4 mr-2" />
                Add Achievement
            </button>

            {/* Tips */}

            <div className="rounded-xl bg-yellow-50 border border-yellow-200 p-4">

                <h4 className="font-semibold text-yellow-900">
                    Tips
                </h4>

                <ul className="mt-2 list-disc pl-5 text-sm text-yellow-800 space-y-1">
                    <li>Mention rankings, awards, scholarships, and certifications.</li>
                    <li>Use numbers whenever possible.</li>
                    <li>Keep each achievement to one or two lines.</li>
                    <li>Prioritize achievements relevant to the job.</li>
                </ul>

                <div className="mt-4 bg-white rounded-lg p-3 text-sm">

                    <strong>Examples</strong>

                    <div className="mt-2 space-y-2">

                        <div>
                            • Solved <strong>800+</strong> DSA problems across LeetCode and GeeksforGeeks.
                        </div>

                        <div>
                            • Ranked <strong>488/11,000+</strong> on the GeeksforGeeks Institute Leaderboard.
                        </div>

                        <div>
                            • Maximum LeetCode Rating: <strong>1642</strong>.
                        </div>

                        <div>
                            • Winner of Smart India Hackathon College Round.
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Achievements;