import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'
import logo from "../../assets/logo.svg"; 

const Hero = () => {

    const { user } = useSelector(state => state.auth)

    const [mobileOpen, setMobileOpen] = React.useState(false);

    return (

        <>
            <style>
                {`
                    @import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
                    *{
                        font-family: "Poppins", sans-serif;
                    }
                    @keyframes rotate {
                        100% {
                            transform: rotate(1turn);
                        }
                    }
            
                    .rainbow::before {
                        content: '';
                        position: absolute;
                        z-index: -2;
                        left: -50%;
                        top: -50%;
                        width: 200%;
                        height: 200%;
                        background-position: 100% 50%;
                        background-repeat: no-repeat;
                        background-size: 50% 30%;
                        filter: blur(6px);
                        background-image: linear-gradient(#FFF);
                        animation: rotate 4s linear infinite;
                    }
                `}
            </style>

            <header id="home" className='bg-black text-white flex flex-col items-center bg-[url("https://assets.prebuiltui.com/images/components/hero-section/hero-background-image.png")] bg-cover bg-center bg-no-repeat pb-10'>
                <nav className="flex flex-col items-center w-full" >
                    <div className="flex items-center justify-between p-4 md:px-16 lg:px-24 xl:px-32 md:py-4 w-full">
                        <a href="/">
                            <img
                                src={logo}
                                alt="Resume Builder"
                                className="text-[#000000]"
                                className="h-10 w-auto"
                            />
                        </a>

                        <div id="menu" className={`${mobileOpen ? 'max-md:w-full' : 'max-md:w-0'} max-md:fixed max-md:top-0 max-md:z-10 max-md:left-0 max-md:transition-all max-md:duration-300 max-md:overflow-hidden max-md:h-screen max-md:bg-black/50 max-md:backdrop-blur max-md:flex-col max-md:justify-center flex items-center gap-8 text-sm`}>
                            <a href="#testimonial" onClick={() => setMobileOpen(false)} className="text-green-600 hover:text-green-600">Testimonials</a>
                            <a href="#contact" onClick={() => setMobileOpen(false)} className="text-green-600 hover:text-green-600 mr-6">Contact</a>

                            <button id="close-menu" onClick={() => setMobileOpen(false)} className="md:hidden bg-gray-900 hover:bg-gray-800 text-white p-2 rounded-md aspect-square font-medium transition">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                                </svg>
                            </button>

                            <div className="p-[0.5px] rounded-full bg-linear-to-r from-white to-[#999999]/0">
                                {user ? (
                                    <Link
                                        to="/app"
                                        className="hidden md:block px-8 py-2 bg-green-500 hover:bg-green-700 active:scale-95 transition-all rounded-full text-white"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <Link
                                        to="/app?state=login"
                                        className="hidden md:flex items-center gap-2 bg-[#A6FF5D] text-gray-800 font-medium px-4 py-2.5 rounded-full text-sm transition cursor-pointer group"
                                    >
                                        <svg width="14" height="15" viewBox="0 0 14 15" fill="none">
                                            {/* SVG path */}
                                        </svg>

                                        <span>Login</span>
                                    </Link>
                                )}
                            </div>

                        </div>

                        <button id="open-menu" onClick={() => setMobileOpen(true)}
                            className="md:hidden bg-gray-900 hover:bg-gray-800 text-gray-50 p-2 rounded-md aspect-square font-medium transition">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M4 12h16" /><path d="M4 18h16" /><path d="M4 6h16" />
                            </svg>
                        </button>
                    </div>
                </nav>

                <div className="rainbow relative z-0 bg-white/15 overflow-hidden p-px flex items-center justify-center rounded-full transition duration-300 active:scale-100 mt-28 md:mt-32">
                    <button className="flex items-center justify-center gap-3 pl-4 pr-6 py-3 text-white rounded-full font-medium bg-gray-900/80 backdrop-blur">
                        <div className="relative flex size-3.5 items-center justify-center">
                            <span className="absolute inline-flex h-full w-full rounded-full bg-[#A6FF5D] opacity-75 animate-ping duration-300"></span>
                            <span className="relative inline-flex size-2 rounded-full bg-[#A6FF5D]"></span>
                        </div>
                        <span className='text-xs'>Designed for Future Builders</span>
                    </button>
                </div>

                <h1 className="text-4xl md:text-[64px]/[82px] text-center max-w-4xl mt-5 bg-clip-text leading-tight px-4">
                    Land your dream job with AI-powered resumes.
                </h1>
                <p className="text-sm md:text-base text-gray-300 bg-clip-text text-center max-w-lg mt-4.5 px-4">
                    Create edit and download professional resumes with AI-powered assistance.
                </p>

                <div className='flex gap-3 mt-8'>
                    {!user && (
                        <Link
                            to="/app?state=register"
                            className="bg-[#A6FF5D] hover:bg-[#A6FF5D]/90 text-gray-800 px-6 py-2.5 rounded-full text-sm transition cursor-pointer group"
                        >
                            <div className="relative overflow-hidden">
                                <span>Get Started</span>
                            </div>
                        </Link>
                    )}
                    <div className="bg-white/15 hover:bg-white/10 p-px flex items-center justify-center rounded-full hover:scale-105 transition duration-300 active:scale-100">
                        <Link to='/app?state=login' className="px-6 text-sm py-3 text-white rounded-full bg-white/5 cursor-pointer">
                            Try Demo
                        </Link>
                    </div>
                </div>

                <div className='scroll-down flex flex-col items-center gap-4 mt-20 animate-bounce cursor-pointer'>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 9A7 7 0 1 0 5 9v6a7 7 0 1 0 14 0zm-7-3v4" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
                    <p className='text-sm text-white/50'>Scroll down</p>
                </div>
            </header>
        </>

    )
}

export default Hero