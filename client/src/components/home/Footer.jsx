import { ArrowUpRight } from "lucide-react";
import logo from "../../assets/logo.svg";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "lucide-react";

const Footer = () => {

     const { user } = useSelector((state) => state.auth);
    
    return (
        <footer
            id="contact"
            className="mt-32 border-t border-gray-200 bg-linear-to-b from-white to-green-50"
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16">

                <div className="grid md:grid-cols-3 gap-12">

                    {/* Left */}
                    <div>
                        {/* Replace with your logo if available */}
                        {/* <img src={logo} className="h-9 mb-5" alt="" /> */}

                        <h2 className="text-2xl font-bold text-gray-900">
                            Resume<span className="text-green-600">Builder</span>
                        </h2>

                        <p className="mt-4 text-gray-600 leading-7 max-w-sm">
                            Build modern, ATS-friendly resumes in minutes with AI-powered
                            writing assistance, beautiful templates, and one-click PDF export.
                        </p>

                        <div className="flex gap-4 mt-6">
                            <a
                                href="https://github.com/khushhalkumrawat"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 rounded-full border border-gray-300 hover:bg-green-600 hover:text-white transition duration-300"
                            >
                                <FaGithub size={20} />
                            </a>

                            <a
                                href="https://www.linkedin.com/in/khushhal-kumrawat-017bb6390/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 rounded-full border border-gray-300 hover:bg-green-600 hover:text-white transition duration-300"
                            >
                                <FaLinkedin size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Center */}
                    <div>
                        <h3 className="font-semibold text-lg text-gray-900 mb-5">
                            Quick Links
                        </h3>

                        <ul className="space-y-3 text-gray-600">
                            <li><a href="#home" className="hover:text-green-600">Home</a></li>
                            <li><a href="#features" className="hover:text-green-600">Features</a></li>
                            <li><a href="#testimonial" className="hover:text-green-600">Testimonials</a></li>
                            <li><a href="#faq" className="hover:text-green-600">FAQ</a></li>
                        </ul>
                    </div>

                    {/* Right */}
                    <div>
                        <h3 className="font-semibold text-lg text-gray-900 mb-5">
                            Get Started
                        </h3>

                        <p className="text-gray-600 leading-7">
                            Ready to create a resume that stands out?
                        </p>


                        <a
                            href="/login"
                            className="inline-flex items-center gap-2 mt-6 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl transition"
                        >
                            Build resume
                            <ArrowUpRight size={18} />
                        </a> 

                    </div>

                </div>

                <div className="border-t mt-14 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                    <p>© 2026 ResumeBuilder. All rights reserved.</p>

                    <p className="mt-3 md:mt-0">
                        Built with React • Node.js • MongoDB
                    </p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
