import {
    BriefcaseBusiness,
    Globe,
    Mail,
    MapPin,
    Phone,
    User,
    Trophy,
    Code
} from "lucide-react";
import React from "react";

export const PersonalInfoForm = ({ data, onChange}) => {

    const handleChange = (field, value) => {
        onChange({ ...data, [field]: value })
    }

    const basicFields = [
        {
            key: "full_name",
            label: "Full Name",
            icon: User,
            type: "text",
            required: true,
        },
        {
            key: "profession",
            label: "Profession",
            icon: BriefcaseBusiness,
            type: "text",
        },
        {
            key: "email",
            label: "Email Address",
            icon: Mail,
            type: "email",
            required: true,
        },
        {
            key: "phone",
            label: "Phone Number",
            icon: Phone,
            type: "tel",
        },
        {
            key: "location",
            label: "Location",
            icon: MapPin,
            type: "text",
        },
    ];

    const profileFields = [
        {
            key: "linkedin",
            label: "LinkedIn Profile",
            icon: Globe,
        },
        {
            key: "portfolio",
            label: "Portfolio Website",
            icon: Globe,
        },
        {
            key: "github",
            label: "GitHub Profile",
            icon: Globe,
        },
        {
            key: "leetcode",
            label: "LeetCode Profile",
            icon: Trophy,
        },
        {
            key: "codeforces",
            label: "Codeforces Profile",
            icon: Code,
        },
        {
            key: "codechef",
            label: "CodeChef Profile",
            icon: Code,
        },
        {
            key: "geeksforgeeks",
            label: "GeeksforGeeks Profile",
            icon: Code,
        },
        {
            key: "atcoder",
            label: "AtCoder Profile",
            icon: Code,
        },
    ];

    return (
        <div>

            <h4 className="mt-6 mb-3 font-semibold text-gray-800">
                Basic Information
            </h4>

            {basicFields.map((field) => {
                const Icon = field.icon;

                return (
                    <div key={field.key} className="space-y-1 mt-4">

                        <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                            <Icon className="size-4" />

                            {field.label}

                            {field.required && (
                                <span className="text-red-500">*</span>
                            )}
                        </label>

                        <input
                            type={field.type}
                            value={data[field.key] || ""}
                            onChange={(e) =>
                                handleChange(field.key, e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 outline-none text-sm"
                            placeholder={`Enter your ${field.label.toLowerCase()}`}
                            required={field.required}
                        />

                    </div>
                );
            })}

            <h4 className="mt-8 mb-3 font-semibold text-gray-800">
                Professional Profiles
            </h4>

            {profileFields.map((field) => {
                const Icon = field.icon;

                return (
                    <div key={field.key} className="space-y-1 mt-4">

                        <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                            <Icon className="size-4" />

                            {field.label}
                        </label>

                        <input
                            type="url"
                            value={data[field.key] || ""}
                            onChange={(e) =>
                                handleChange(field.key, e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 outline-none text-sm"
                            placeholder={`https://...`}
                        />

                    </div>
                );
            })}

        </div>
    )
}
