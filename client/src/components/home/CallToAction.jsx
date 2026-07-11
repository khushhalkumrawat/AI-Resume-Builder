import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const CallToAction = () => {

     const { user } = useSelector(state => state.auth)

    return (

        <div id='cta' className='border-y border-dashed border-slate-200 w-full max-w-5xl mx-auto px-10 sm:px-16 mt-28'>
            <div className="flex flex-col md:flex-row text-center md:text-left items-center justify-between gap-8 px-3 md:px-10 border-x border-dashed border-slate-200 py-16 sm:py-20 -mt-10 -mb-10 w-full">
                <p className="text-xl font-medium max-w-md text-slate-800"> Build a Professional Resume That Helps You Stand Out and Get Hired. </p>
                <Link
                    to="/app?state=register"
                    className=" flex m bg-[#A6FF5D] hover:bg-[#A6FF5D]/90 text-gray-800 px-6 py-2.5 rounded-full text-sm transition cursor-pointer group"
                >
                    <span> Get Started </span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4.5"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                </Link>
            </div>
        </div>
    )
}

export default CallToAction