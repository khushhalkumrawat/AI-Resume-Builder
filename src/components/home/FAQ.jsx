import React, { useState } from "react";
import Title from "./Title";
import { CircleHelp, ChevronDown } from "lucide-react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "Is ResumeBuilder free to use?",
      answer:
        "Yes. You can create, edit, and download professional resumes for free. Additional premium features may be introduced in the future.",
    },
    {
      question: "What is an ATS-friendly resume?",
      answer:
        "An ATS-friendly resume is optimized to pass Applicant Tracking Systems by using clean formatting, proper headings, and readable fonts.",
    },
    {
      question: "Can I upload my existing resume?",
      answer:
        "Yes. Upload your existing resume and ResumeBuilder will automatically extract the information so you can continue editing without starting from scratch.",
    },
    {
      question: "How does AI improve my resume?",
      answer:
        "AI helps enhance your professional summary, work experience, and project descriptions by improving grammar, clarity, and professional wording while keeping your information accurate.",
    },
    {
      question: "Can I customize my resume?",
      answer:
        "Absolutely. You can customize templates, fonts, colors, spacing, and section order to create a resume that reflects your style.",
    },
    {
      question: "Can I download my resume as a PDF?",
      answer:
        "Yes. Export your resume as a high-quality PDF that's ready to share with recruiters.",
    },
    {
      question: "Is my personal information secure?",
      answer:
        "Yes. Your resume data is securely stored, and we do not share your personal information with third parties.",
    },
    {
      question: "Can I create multiple resumes?",
      answer:
        "Yes. Create multiple resumes tailored to different job roles and industries while keeping everything organized in one place.",
    },
  ];

  return (
    <section
      id="faq"
      className="max-w-4xl mx-auto py-20 px-6 scroll-mt-12"
    >
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-2 text-sm text-green-600 bg-green-400/10 rounded-full px-4 py-1.5">
          <CircleHelp className="size-4.5" />
          <span>FAQ</span>
        </div>

        <Title
          title="Frequently Asked Questions"
          description="Everything you need to know about building professional, ATS-friendly resumes with ResumeBuilder."
        />
      </div>

      <div className="mt-10 space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-2xl bg-white shadow-sm hover:shadow-md transition"
          >
            <button
              onClick={() =>
                setOpenIndex(openIndex === index ? -1 : index)
              }
              className="w-full flex justify-between items-center p-6 text-left"
            >
              <h3 className="font-semibold text-gray-800">
                {faq.question}
              </h3>

              <ChevronDown
                className={`transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index
                  ? "max-h-40 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <p className="px-6 pb-6 text-gray-600 leading-7">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;