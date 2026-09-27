import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../../assets/logo.svg";

const Hero = () => {
    const { user } = useSelector((state) => state.auth);
    const [mobileOpen, setMobileOpen] = React.useState(false);

    return (
        <>
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

                    * {
                        font-family: "Poppins", sans-serif;
                    }

                    @keyframes float {
                        0%, 100% {
                            transform: translateY(0px);
                        }
                        50% {
                            transform: translateY(-18px);
                        }
                    }

                    @keyframes pulseGlow {
                        0%, 100% {
                            opacity: .35;
                            transform: scale(1);
                        }
                        50% {
                            opacity: .6;
                            transform: scale(1.08);
                        }
                    }

                    @keyframes shimmer {
                        0% {
                            background-position: -200% center;
                        }
                        100% {
                            background-position: 200% center;
                        }
                    }

                    .hero-orb {
                        animation: pulseGlow 5s ease-in-out infinite;
                    }

                    .hero-float {
                        animation: float 6s ease-in-out infinite;
                    }

                    .shimmer-text {
                        background-size: 200% auto;
                        animation: shimmer 4s linear infinite;
                    }
                `}
            </style>

            <header
                id="home"
                className="
                    relative
                    min-h-screen
                    overflow-hidden
                    flex flex-col
                    items-center
                    text-white
                    bg-[#071312]
                "
            >

                {/* ================= BACKGROUND ================= */}

                {/* Main gradient */}
                <div className="
                    absolute inset-0
                    bg-[radial-gradient(circle_at_50%_25%,rgba(166,255,93,0.13),transparent_30%),linear-gradient(135deg,#071312_0%,#0b1d1a_45%,#061111_100%)]
                " />

                {/* Grid */}
                <div
                    className="
                        absolute inset-0
                        opacity-[0.08]
                        pointer-events-none
                    "
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
                        `,
                        backgroundSize: "60px 60px",
                    }}
                />

                {/* Green glow */}
                <div
                    className="
                        hero-orb
                        absolute
                        -top-40
                        left-1/2
                        -translate-x-1/2
                        w-[600px]
                        h-[600px]
                        rounded-full
                        bg-[#A6FF5D]/10
                        blur-[130px]
                        pointer-events-none
                    "
                />

                {/* Left glow */}
                <div
                    className="
                        absolute
                        top-[35%]
                        -left-40
                        w-80
                        h-80
                        rounded-full
                        bg-emerald-400/10
                        blur-[120px]
                        pointer-events-none
                    "
                />

                {/* Right glow */}
                <div
                    className="
                        absolute
                        top-[40%]
                        -right-40
                        w-80
                        h-80
                        rounded-full
                        bg-cyan-400/10
                        blur-[120px]
                        pointer-events-none
                    "
                />

                {/* ================= NAVBAR ================= */}

                <nav className="relative z-30 w-full flex justify-center">

                    <div
                        className="
                            w-full
                            max-w-7xl
                            mx-auto
                            px-5
                            md:px-10
                            lg:px-16
                            pt-5
                        "
                    >

                        <div
                            className="
                                flex
                                items-center
                                justify-between
                                px-4
                                md:px-6
                                py-3
                                rounded-2xl
                                border
                                border-white/10
                                bg-white/[0.05]
                                backdrop-blur-xl
                                shadow-[0_10px_40px_rgba(0,0,0,0.2)]
                            "
                        >

                            {/* Logo */}
                            <Link to="/" className="relative z-20">
                                <img
                                    src={logo}
                                    alt="Resume Builder"
                                    className="h-9 md:h-10 w-auto"
                                />
                            </Link>

                            {/* Desktop menu */}
                            <div className="hidden md:flex items-center gap-8">

                                <a
                                    href="#testimonial"
                                    className="
                                        text-sm
                                        text-white/60
                                        hover:text-[#A6FF5D]
                                        transition
                                    "
                                >
                                    Testimonials
                                </a>

                                <a
                                    href="#contact"
                                    className="
                                        text-sm
                                        text-white/60
                                        hover:text-[#A6FF5D]
                                        transition
                                    "
                                >
                                    Contact
                                </a>

                                {user ? (
                                    <Link
                                        to="/app"
                                        className="
                                            px-6
                                            py-2.5
                                            rounded-full
                                            bg-[#A6FF5D]
                                            text-gray-900
                                            text-sm
                                            font-semibold
                                            hover:shadow-[0_0_25px_rgba(166,255,93,0.35)]
                                            hover:scale-105
                                            active:scale-95
                                            transition-all
                                        "
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <Link
                                        to="/app?state=login"
                                        className="
                                            px-6
                                            py-2.5
                                            rounded-full
                                            bg-[#A6FF5D]
                                            text-gray-900
                                            text-sm
                                            font-semibold
                                            hover:shadow-[0_0_25px_rgba(166,255,93,0.35)]
                                            hover:scale-105
                                            active:scale-95
                                            transition-all
                                        "
                                    >
                                        Login
                                    </Link>
                                )}
                            </div>

                            {/* Mobile menu button */}
                            <button
                                onClick={() => setMobileOpen(true)}
                                className="
                                    md:hidden
                                    p-2
                                    rounded-xl
                                    bg-white/10
                                    border border-white/10
                                    hover:bg-white/15
                                "
                            >
                                <svg
                                    width="23"
                                    height="23"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                >
                                    <path d="M4 6h16" />
                                    <path d="M4 12h16" />
                                    <path d="M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </nav>

                {/* ================= MOBILE MENU ================= */}

                {mobileOpen && (
                    <div
                        className="
                            fixed
                            inset-0
                            z-50
                            bg-black/70
                            backdrop-blur-xl
                            flex
                            items-center
                            justify-center
                            md:hidden
                        "
                    >
                        <div className="flex flex-col items-center gap-8">

                            <button
                                onClick={() => setMobileOpen(false)}
                                className="
                                    absolute
                                    top-6
                                    right-6
                                    p-2
                                    rounded-xl
                                    bg-white/10
                                "
                            >
                                ✕
                            </button>

                            <a
                                href="#testimonial"
                                onClick={() => setMobileOpen(false)}
                                className="text-lg text-white/80"
                            >
                                Testimonials
                            </a>

                            <a
                                href="#contact"
                                onClick={() => setMobileOpen(false)}
                                className="text-lg text-white/80"
                            >
                                Contact
                            </a>

                            <Link
                                to="/app?state=login"
                                onClick={() => setMobileOpen(false)}
                                className="
                                    px-8
                                    py-3
                                    rounded-full
                                    bg-[#A6FF5D]
                                    text-gray-900
                                    font-semibold
                                "
                            >
                                Login
                            </Link>
                        </div>
                    </div>
                )}

                {/* ================= HERO CONTENT ================= */}

                <main
                    className="
                        relative
                        z-10
                        flex
                        flex-col
                        items-center
                        text-center
                        px-5
                        pt-24
                        md:pt-28
                        pb-20
                    "
                >

                    {/* Badge */}

                    <div
                        className="
                            hero-float
                            inline-flex
                            items-center
                            gap-3
                            px-5
                            py-2.5
                            rounded-full
                            border
                            border-[#A6FF5D]/30
                            bg-white/[0.06]
                            backdrop-blur-xl
                            shadow-[0_0_30px_rgba(166,255,93,0.08)]
                        "
                    >
                        <span className="relative flex size-2.5">
                            <span
                                className="
                                    absolute
                                    inline-flex
                                    h-full
                                    w-full
                                    rounded-full
                                    bg-[#A6FF5D]
                                    opacity-75
                                    animate-ping
                                "
                            />

                            <span
                                className="
                                    relative
                                    inline-flex
                                    size-2.5
                                    rounded-full
                                    bg-[#A6FF5D]
                                    shadow-[0_0_12px_#A6FF5D]
                                "
                            />
                        </span>

                        <span className="text-xs md:text-sm text-white/80">
                            Designed for Future Builders
                        </span>
                    </div>

                    {/* Heading */}

                    <h1
                        className="
                            mt-8
                            max-w-5xl
                            text-5xl
                            sm:text-6xl
                            md:text-7xl
                            lg:text-[82px]
                            leading-[1.05]
                            font-medium
                            tracking-[-0.04em]
                        "
                    >
                        Land your
                        <span className="text-white"> dream job </span>
                        with

                        <br />

                        <span
                            className="
                                shimmer-text
                                bg-gradient-to-r
                                from-[#A6FF5D]
                                via-white
                                to-[#A6FF5D]
                                bg-clip-text
                                text-transparent
                            "
                        >
                            AI-powered resumes.
                        </span>
                    </h1>

                    {/* Description */}

                    <p
                        className="
                            mt-7
                            max-w-2xl
                            text-sm
                            md:text-lg
                            leading-7
                            text-white/55
                        "
                    >
                        Create, improve and download professional resumes
                        with AI-powered assistance designed to help you
                        stand out from the competition.
                    </p>

                    {/* Feature pills */}

                    <div
                        className="
                            mt-7
                            flex
                            flex-wrap
                            justify-center
                            gap-2
                        "
                    >

                        {[
                            "AI Suggestions",
                            "ATS Friendly",
                            "Professional Templates",
                        ].map((item) => (
                            <div
                                key={item}
                                className="
                                    px-4
                                    py-2
                                    rounded-full
                                    border
                                    border-white/10
                                    bg-white/[0.04]
                                    backdrop-blur-md
                                    text-xs
                                    text-white/60
                                    hover:border-[#A6FF5D]/30
                                    hover:text-white
                                    transition
                                "
                            >
                                <span className="text-[#A6FF5D] mr-2">
                                    ✓
                                </span>
                                {item}
                            </div>
                        ))}
                    </div>

                    {/* Buttons */}

                    <div className="flex flex-col sm:flex-row gap-3 mt-9">

                        {!user && (
                            <Link
                                to="/app?state=register"
                                className="
                                    group
                                    relative
                                    px-8
                                    py-3.5
                                    rounded-full
                                    bg-[#A6FF5D]
                                    text-gray-900
                                    font-semibold
                                    text-sm
                                    overflow-hidden
                                    hover:shadow-[0_0_35px_rgba(166,255,93,0.35)]
                                    hover:-translate-y-0.5
                                    active:scale-95
                                    transition-all
                                "
                            >
                                <span className="relative z-10">
                                    Get Started
                                </span>

                                <span
                                    className="
                                        absolute
                                        inset-0
                                        bg-white/30
                                        translate-x-[-110%]
                                        group-hover:translate-x-[110%]
                                        transition-transform
                                        duration-700
                                        skew-x-12
                                    "
                                />
                            </Link>
                        )}

                        <Link
                            to="/app?state=login"
                            className="
                                px-8
                                py-3.5
                                rounded-full
                                border
                                border-white/15
                                bg-white/[0.06]
                                backdrop-blur-xl
                                text-white
                                text-sm
                                font-medium
                                hover:bg-white/10
                                hover:border-white/25
                                hover:-translate-y-0.5
                                transition-all
                            "
                        >
                            Try Demo
                            <span className="ml-2">→</span>
                        </Link>
                    </div>

                    {/* Trust text */}

                    <p className="mt-6 text-xs text-white/35">
                        No design skills required • Build your resume in minutes
                    </p>

                </main>

                {/* ================= DECORATIVE FLOATING ELEMENTS ================= */}

                <div
                    className="
                        absolute
                        hidden
                        lg:block
                        left-[10%]
                        top-[48%]
                        hero-float
                        w-16
                        h-16
                        rounded-2xl
                        border
                        border-[#A6FF5D]/20
                        bg-white/[0.04]
                        backdrop-blur-xl
                        rotate-12
                    "
                >
                    <div className="flex items-center justify-center h-full text-[#A6FF5D] text-xl">
                        ✦
                    </div>
                </div>

                <div
                    className="
                        absolute
                        hidden
                        lg:block
                        right-[11%]
                        top-[42%]
                        hero-float
                        w-14
                        h-14
                        rounded-full
                        border
                        border-cyan-300/20
                        bg-cyan-300/5
                        backdrop-blur-xl
                    "
                >
                    <div className="flex items-center justify-center h-full text-cyan-300">
                        ✦
                    </div>
                </div>

                {/* ================= SCROLL INDICATOR ================= */}

                <div
                    className="
                        relative
                        z-10
                        flex
                        flex-col
                        items-center
                        gap-3
                        mt-auto
                        pb-8
                        cursor-pointer
                        opacity-60
                        hover:opacity-100
                        transition
                    "
                >
                    <div
                        className="
                            w-6
                            h-10
                            rounded-full
                            border
                            border-white/40
                            flex
                            justify-center
                            pt-2
                        "
                    >
                        <div
                            className="
                                w-1
                                h-2
                                rounded-full
                                bg-white
                                animate-bounce
                            "
                        />
                    </div>

                    <span className="text-xs text-white/50">
                        Scroll to explore
                    </span>
                </div>

            </header>
        </>
    );
};

export default Hero;