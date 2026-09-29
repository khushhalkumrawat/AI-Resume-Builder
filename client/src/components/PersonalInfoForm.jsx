import {
    BriefcaseBusiness,
    Globe,
    Mail,
    MapPin,
    Phone,
    User,
    Plus,
    Trash2,
} from "lucide-react";

import React, { useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

// --------------------------------------
// Basic Information Fields
// --------------------------------------

const basicFields = [
    {
        key: "full_name",
        label: "Full Name",
        icon: User,
        type: "text",
        required: true,
        placeholder: "Enter your full name",
        autoComplete: "name",
    },
    {
        key: "profession",
        label: "Profession",
        icon: BriefcaseBusiness,
        type: "text",
        placeholder: "e.g. Software Engineer",
        autoComplete: "organization-title",
    },
    {
        key: "email",
        label: "Email Address",
        icon: Mail,
        type: "email",
        required: true,
        placeholder: "you@example.com",
        autoComplete: "email",
    },
    {
        key: "phone",
        label: "Phone Number",
        icon: Phone,
        type: "tel",
        placeholder: "+91 98765 43210",
        autoComplete: "tel",
    },
    {
        key: "location",
        label: "Location",
        icon: MapPin,
        type: "text",
        placeholder: "e.g. Varanasi, India",
        autoComplete: "address-level2",
    },
];

// --------------------------------------
// Fixed Professional Profiles
// --------------------------------------

const profileFields = [
    {
        key: "linkedin",
        label: "LinkedIn",
        icon: FaLinkedin,
        placeholder: "https://linkedin.com/in/username",
    },
    {
        key: "github",
        label: "GitHub",
        icon: FaGithub,
        placeholder: "https://github.com/username",
    },
    {
        key: "portfolio",
        label: "Portfolio",
        icon: Globe,
        placeholder: "https://yourportfolio.com",
    },
];

// --------------------------------------
// Reusable Input
// --------------------------------------

const FormField = ({
    field,
    value,
    onChange,
}) => {
    const Icon = field.icon;

    return (
        <div className="space-y-1 mt-4">

            <label
                htmlFor={field.key}
                className="flex items-center gap-2 text-sm font-medium text-gray-600"
            >
                <Icon className="size-4" />

                <span>{field.label}</span>

                {field.required && (
                    <span className="text-red-500">*</span>
                )}
            </label>

            <input
                id={field.key}
                name={field.key}
                type={field.type || "url"}
                value={value || ""}
                onChange={(e) =>
                    onChange(field.key, e.target.value)
                }
                placeholder={field.placeholder}
                required={field.required}
                autoComplete={field.autoComplete}
                className="
                    w-full
                    px-3 py-2
                    border border-gray-300
                    rounded-lg
                    text-sm
                    outline-none
                    transition
                    focus:border-blue-500
                    focus:ring-2
                    focus:ring-blue-100
                "
            />
        </div>
    );
};

// --------------------------------------
// Main Component
// --------------------------------------

export const PersonalInfoForm = ({ data, onChange }) => {

    const [showCustomForm, setShowCustomForm] = useState(false);

    const [customName, setCustomName] = useState("");
    const [customUrl, setCustomUrl] = useState("");

    // ----------------------------------
    // Normal Field Change
    // ----------------------------------

    const handleChange = (field, value) => {
        onChange({
            ...data,
            [field]: value,
        });
    };

    // ----------------------------------
    // Add Custom Profile
    // ----------------------------------

    const handleAddCustomProfile = () => {

        if (!customName.trim() || !customUrl.trim()) {
            return;
        }

        const newProfile = {
            name: customName.trim(),
            url: customUrl.trim(),
        };

        onChange({
            ...data,
            custom_profiles: [
                ...(data.custom_profiles || []),
                newProfile,
            ],
        });

        // Reset form
        setCustomName("");
        setCustomUrl("");
        setShowCustomForm(false);
    };

    // ----------------------------------
    // Remove Custom Profile
    // ----------------------------------

    const handleRemoveCustomProfile = (index) => {

        const updatedProfiles = (
            data.custom_profiles || []
        ).filter((_, i) => i !== index);

        onChange({
            ...data,
            custom_profiles: updatedProfiles,
        });
    };

    return (
        <div>

            {/* ============================= */}
            {/* Basic Information */}
            {/* ============================= */}

            <h4 className="mt-6 mb-3 font-semibold text-gray-800">
                Basic Information
            </h4>

            {basicFields.map((field) => (
                <FormField
                    key={field.key}
                    field={field}
                    value={data[field.key]}
                    onChange={handleChange}
                />
            ))}

            {/* ============================= */}
            {/* Professional Profiles */}
            {/* ============================= */}

            <h4 className="mt-8 mb-3 font-semibold text-gray-800">
                Professional Profiles
            </h4>

            {profileFields.map((field) => (
                <FormField
                    key={field.key}
                    field={field}
                    value={data[field.key]}
                    onChange={handleChange}
                />
            ))}

            {/* ============================= */}
            {/* Custom Profiles */}
            {/* ============================= */}

            <div className="mt-6">

                {/* Existing Custom Profiles */}

                {(data.custom_profiles || []).map(
                    (profile, index) => (
                        <div
                            key={index}
                            className="
                                flex
                                items-center
                                gap-3
                                mt-3
                                p-3
                                border
                                border-gray-200
                                rounded-lg
                                bg-gray-50
                            "
                        >

                            <Globe className="size-4 text-gray-500 shrink-0" />

                            <div className="flex-1 min-w-0">

                                <p className="text-sm font-medium text-gray-700">
                                    {profile.name}
                                </p>

                                <p className="text-xs text-gray-500 truncate">
                                    {profile.url}
                                </p>

                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    handleRemoveCustomProfile(index)
                                }
                                className="
                                    p-2
                                    text-gray-400
                                    hover:text-red-500
                                    hover:bg-red-50
                                    rounded-lg
                                    transition
                                "
                                title="Remove profile"
                            >
                                <Trash2 className="size-4" />
                            </button>

                        </div>
                    )
                )}

                {/* Add Custom Profile Button */}

                {!showCustomForm && (
                    <button
                        type="button"
                        onClick={() => setShowCustomForm(true)}
                        className="
                            mt-4
                            flex
                            items-center
                            gap-2
                            text-sm
                            font-medium
                            text-blue-600
                            hover:text-blue-700
                            transition
                        "
                    >
                        <Plus className="size-4" />
                        Add Custom Profile
                    </button>
                )}

                {/* Custom Profile Form */}

                {showCustomForm && (
                    <div
                        className="
                            mt-4
                            p-4
                            border
                            border-gray-200
                            rounded-xl
                            bg-gray-50
                        "
                    >

                        <p className="text-sm font-semibold text-gray-800 mb-3">
                            Add Custom Profile
                        </p>

                        {/* Profile Name */}

                        <div className="space-y-1">

                            <label className="text-sm font-medium text-gray-600">
                                Profile Name
                            </label>

                            <input
                                type="text"
                                value={customName}
                                onChange={(e) =>
                                    setCustomName(e.target.value)
                                }
                                placeholder="e.g. Kaggle, HackerRank, Behance"
                                className="
                                    w-full
                                    px-3 py-2
                                    border border-gray-300
                                    rounded-lg
                                    text-sm
                                    outline-none
                                    focus:border-blue-500
                                    focus:ring-2
                                    focus:ring-blue-100
                                "
                            />

                        </div>

                        {/* Profile URL */}

                        <div className="space-y-1 mt-3">

                            <label className="text-sm font-medium text-gray-600">
                                Profile URL
                            </label>

                            <input
                                type="url"
                                value={customUrl}
                                onChange={(e) =>
                                    setCustomUrl(e.target.value)
                                }
                                placeholder="https://..."
                                className="
                                    w-full
                                    px-3 py-2
                                    border border-gray-300
                                    rounded-lg
                                    text-sm
                                    outline-none
                                    focus:border-blue-500
                                    focus:ring-2
                                    focus:ring-blue-100
                                "
                            />

                        </div>

                        {/* Buttons */}

                        <div className="flex justify-end gap-2 mt-4">

                            <button
                                type="button"
                                onClick={() => {
                                    setShowCustomForm(false);
                                    setCustomName("");
                                    setCustomUrl("");
                                }}
                                className="
                                    px-3
                                    py-2
                                    text-sm
                                    text-gray-600
                                    hover:bg-gray-200
                                    rounded-lg
                                    transition
                                "
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={handleAddCustomProfile}
                                disabled={
                                    !customName.trim() ||
                                    !customUrl.trim()
                                }
                                className="
                                    px-4
                                    py-2
                                    text-sm
                                    font-medium
                                    text-white
                                    bg-blue-600
                                    hover:bg-blue-700
                                    disabled:bg-gray-300
                                    disabled:cursor-not-allowed
                                    rounded-lg
                                    transition
                                "
                            >
                                Add Profile
                            </button>

                        </div>

                    </div>
                )}

            </div>

        </div>
    );
};
