import { Zap } from 'lucide-react';
import React from 'react'
import Title from './Title'
import target from "../../assets/resumehomepage.jpg";
import {
    Sparkles,
    LayoutTemplate,
    Download
} from "lucide-react";

const Features = () => {

    const [isHover, setIsHover] = React.useState(false);

    return (

        <div id='features' className='flex flex-col items-center my-10 scroll-mt-12'>

            <div className="flex items-center gap-2 text-sm text-blue-800 bg-green-400/10  rounded-full px-4 py-1">
                <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M1.613 8.2a.62.62 0 0 1-.553-.341.59.59 0 0 1 .076-.637l6.048-6.118a.31.31 0 0 1 .375-.069c.061.033.11.084.137.147a.3.3 0 0 1 .014.197L6.537 4.991a.59.59 0 0 0 .07.552.61.61 0 0 0 .504.257h4.276a.62.62 0 0 1 .553.341.59.59 0 0 1-.076.637l-6.048 6.119a.31.31 0 0 1-.375.067.295.295 0 0 1-.15-.344l1.172-3.61a.59.59 0 0 0-.07-.553.61.61 0 0 0-.504-.257z"
                        stroke="#1E4BAF" strokeMiterlimit="5.759" strokeLinecap="round" />
                </svg>
                <span>Simple Process</span>
            </div>

            <Title title='Build a Professional Resume in 3 Easy Steps' description='Create an ATS-friendly resume with powerful templates, AI assistance, and one-click PDF export—all in just a few minutes.' />


            <div className="flex flex-col md:flex-row items-center justify-center gap-14 mt-10">
                <div className="bg-white rounded-3xl shadow-xl p-6">
                    <img
                        src={target}
                        className="w-full max-w-lg rounded-xl"
                        alt="Resume Builder"
                    />
                </div>
                <div className="px-4 md:px-0" onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
                    <div className={"flex items-center justify-center gap-6 max-w-md group cursor-pointer"}>
                        <div className={`p-6 group-hover:bg-violet-100 border border-transparent group-hover:border-violet-300  flex gap-4 rounded-xl transition-colors ${!isHover ? 'border-violet-300 bg-violet-100' : ''}`}>
                            <Sparkles className="text-violet-600 w-6 h-6" />
                            <div className="space-y-2">
                                <h3 className="text-base font-semibold text-slate-700">AI-Powered Content Enhancement</h3>
                                <p className="text-sm text-slate-600 max-w-xs">Improve your professional summary, experience, and projects with intelligent AI suggestions while keeping your information accurate.</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-6 max-w-md group cursor-pointer">
                        <div className="p-6 group-hover:bg-green-100 border border-transparent group-hover:border-green-300 flex gap-4 rounded-xl transition-colors">
                            <LayoutTemplate className="text-green-600 w-6 h-6" />
                            <div className="space-y-2">
                                <h3 className="text-base font-semibold text-slate-700">Professional Resume Templates</h3>
                                <p className="text-sm text-slate-600 max-w-xs">Choose from beautifully designed, ATS-friendly templates that help your resume stand out to recruiters.</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-6 max-w-md group cursor-pointer">
                        <div className="p-6 group-hover:bg-orange-100 border border-transparent group-hover:border-orange-300 flex gap-4 rounded-xl transition-colors">
                            <Download className="text-orange-600 w-6 h-6" />
                            <div className="space-y-2">
                                <h3 className="text-base font-semibold text-slate-700">Export & Share</h3>
                                <p className="text-sm text-slate-600 max-w-xs">Download your resume as a high-quality PDF or share it instantly with employers using a public link.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>
        </div>
    )
}

export default Features