import React from "react";
import {
    Award,
    Plus,
    Trash2,
    ExternalLink
} from "lucide-react";

const CertificationsForm = ({ data = [], onChange }) => {

    const addCertification = () => {
        onChange([
            ...data,
            {
                name: "",
                issuer: "",
                issue_date: "",
                credential_id: "",
                credential_url: "",
            },
        ]);
    };

    const removeCertification = (index) => {
        onChange(data.filter((_, i) => i !== index));
    };

    const updateCertification = (index, field, value) => {
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

                <h3 className="flex items-center gap-2 text-lg font-semibold">

                    <Award className="w-5 h-5 text-orange-500" />

                    Certifications

                </h3>

                <p className="text-sm text-gray-500">

                    Add certifications, online courses and professional credentials.

                </p>

            </div>

            {data.length === 0 ? (

                <div className="border rounded-xl py-10 text-center text-gray-500">

                    <Award className="w-12 h-12 mx-auto mb-3 text-gray-300" />

                    <p className="font-medium">

                        No certifications added.

                    </p>

                    <p className="text-sm mt-1">

                        Showcase certifications that strengthen your profile.

                    </p>

                </div>

            ) : (

                <div className="space-y-5">

                    {data.map((certification, index) => (

                        <div
                            key={index}
                            className="border rounded-xl p-5 shadow-sm bg-white"
                        >

                            {/* Header */}

                            <div className="flex justify-between items-start mb-5">

                                <div>

                                    <h4 className="font-semibold">

                                        {certification.name || "New Certification"}

                                    </h4>

                                    <p className="text-sm text-gray-500">

                                        {certification.issuer || "Issuer"}

                                    </p>

                                </div>

                                <button
                                    onClick={() => removeCertification(index)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>

                            </div>

                            {/* Inputs */}

                            <div className="grid md:grid-cols-2 gap-4">

                                <input
                                    value={certification.name || ""}
                                    onChange={(e) =>
                                        updateCertification(
                                            index,
                                            "name",
                                            e.target.value
                                        )
                                    }
                                    placeholder="Certification Name"
                                    className="border rounded-lg px-3 py-2 text-sm"
                                />

                                <input
                                    value={certification.issuer || ""}
                                    onChange={(e) =>
                                        updateCertification(
                                            index,
                                            "issuer",
                                            e.target.value
                                        )
                                    }
                                    placeholder="Issued By"
                                    className="border rounded-lg px-3 py-2 text-sm"
                                />

                                <input
                                    type="month"
                                    value={certification.issue_date || ""}
                                    onChange={(e) =>
                                        updateCertification(
                                            index,
                                            "issue_date",
                                            e.target.value
                                        )
                                    }
                                    className="border rounded-lg px-3 py-2 text-sm"
                                />

                                <input
                                    value={certification.credential_id || ""}
                                    onChange={(e) =>
                                        updateCertification(
                                            index,
                                            "credential_id",
                                            e.target.value
                                        )
                                    }
                                    placeholder="Credential ID (Optional)"
                                    className="border rounded-lg px-3 py-2 text-sm"
                                />

                                <input
                                    value={certification.credential_url || ""}
                                    onChange={(e) =>
                                        updateCertification(
                                            index,
                                            "credential_url",
                                            e.target.value
                                        )
                                    }
                                    placeholder="Credential URL"
                                    className="border rounded-lg px-3 py-2 text-sm md:col-span-2"
                                />

                            </div>

                            {certification.credential_url && (

                                <a
                                    href={certification.credential_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 mt-4 text-sm text-blue-600 hover:underline"
                                >

                                    <ExternalLink className="w-4 h-4" />

                                    Preview Credential

                                </a>

                            )}

                        </div>

                    ))}

                </div>

            )}

            <button
                type="button"
                onClick={addCertification}
                className="w-full border-2 border-dashed border-orange-300 rounded-xl py-3 text-orange-700 hover:bg-orange-50 transition"
            >

                <Plus className="inline w-4 h-4 mr-2" />

                Add Certification

            </button>

            <div className="rounded-xl bg-orange-50 border border-orange-200 p-4">

                <h4 className="font-semibold text-orange-900">

                    Tips

                </h4>

                <ul className="mt-2 list-disc pl-5 text-sm text-orange-800 space-y-1">

                    <li>Add certifications relevant to your target role.</li>

                    <li>Include issuer and completion date.</li>

                    <li>Add the credential URL if available.</li>

                    <li>List recognized platforms like Coursera, Udemy, Google, AWS, Microsoft, etc.</li>

                </ul>

                <div className="mt-4 rounded-lg bg-white p-3 text-sm">

                    <strong>Examples</strong>

                    <div className="mt-2 space-y-2">

                        <div>
                            Google Data Analytics Professional Certificate
                        </div>

                        <div>
                            AWS Certified Cloud Practitioner
                        </div>

                        <div>
                            Meta Front-End Developer Professional Certificate
                        </div>

                        <div>
                            CS50x – Harvard University
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default CertificationsForm;