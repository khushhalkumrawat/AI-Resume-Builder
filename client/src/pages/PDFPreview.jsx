import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import ResumePreview from "../components/ResumePreview";
import api from "../configs/api";

const PDFPreview = () => {
    const { resumeId } = useParams();
    const [searchParams] = useSearchParams();

    const renderToken = searchParams.get("renderToken");

    const [resumeData, setResumeData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadResume = async () => {
            try {
                if (!renderToken) {
                    setError("Invalid PDF request");
                    return;
                }

                const { data } = await api.get(
                    `/api/resumes/pdf-data/${resumeId}`,
                    {
                        params: {
                            token: renderToken,
                        },
                    }
                );

                console.log("PDFPreview RECEIVED TEMPLATE:", data.resume?.template);

                setResumeData(data.resume);

            } catch (error) {
                 console.error("PDF preview error:", error);
                 console.error("Status:", error.response?.status);
                 console.error("Response:", error.response?.data);
                 console.error("URL:", error.config?.url);
                setError("Failed to load resume");
            }
        };

        loadResume();
    }, [resumeId, renderToken]);

    if (error) {
        return (
            <div>
                {error}
            </div>
        );
    }

    if (!resumeData) {
        return (
            <div>
                Loading...
            </div>
        );
    }

    return (
        <div id="pdf-resume">
            <ResumePreview
                data={resumeData}
                template={resumeData.template}
                accentColor={resumeData.accent_color}
                sectionOrder={resumeData.sectionOrder}
            />
        </div>
    );
};

export default PDFPreview;