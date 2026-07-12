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

export const PersonalInfoForm = ({ data, onChange, removeBackground, ssetRemoveBackground }) => {

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


            <div className='flex items-center gap-2'>

                <label>

                    {data.image ? (
                        <img src={typeof data.image === 'string' ? data.image : URL.createObjectURL(data.image)}
                            alt="user-image" className='w-16 h-16 rounded-full object-cover mt-5 ring ring-slate-300 hover:opacity-80' />
                    ) : (
                        <div className='inline-flex items-center gap-2 mt-5 text-slate-600 hover:text-slate-700 cursor-pointer'>
                            <User className='size-10 p-2.5 border rounded-full' />
                            Upload user image
                        </div>
                    )}
                    <input type="file" accept="image/jpeg , image/png" className="hidden" onChange={(e) => handleChange("image", e.target.files[0])} />
                </label>
                {typeof data.image === 'object' && (
                    <div className="flex flex-col gap-1 pl-4 text-sm">
                        <p>Remove Background</p>
                        <label className='relative inline-flex items-center cursor-pointer text-gray-900 gap-3'>
                            <input type="checkbox" className="sr-only peer" onChange={() => ssetRemoveBackground(prev => !prev)} checked={removeBackground} />
                            <div className='w-9 h-5 bg-slate-300 rounded-full peer peer-checked:bg-green-600 transition-colors duration-200'>
                                <span className='dot absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-4'></span>
                            </div>
                        </label>
                    </div>
                )}
            </div>





        </div>
    )
}
