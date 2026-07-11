// controller fro creating a new resume
// POST: /api/resumes/create

import imagekit from "../configs/imageKit.js";
import Resume from "../models/Resume.js";
import fs from 'fs';

export const createResume = async (req, res) => {
    try {
        const userId = req.userId;

        const { title } = req.body;

        //create new resume
        const newResume = await Resume.create({ userId, title })

        // return success message
        return res.status(201).json({ message: 'Resume created successfully', resume: newResume })

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

// controller for deleting a resume
// DELETE : /api/resume/delete

export const deleteResume = async (req, res) => {
    try {
        const userId = req.userId;

        const { resumeId } = req.params;

        const newResume = await Resume.findOneAndDelete({ userId, _id: resumeId })

        // return success message
        return res.status(200).json({ message: 'Resume deleted successfully', resume: newResume })

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

// get user resume by id
// GET : /api/resume/get

export const getResumeById = async (req, res) => {
    try {
        const userId = req.userId;
        const { resumeId } = req.params;

        const resume = await Resume.findOne({
            _id: resumeId,
            userId,
        });

        if (!resume) {
            return res.status(404).json({
                message: "Resume not found",
            });
        }

        resume.__v = undefined;
        resume.createdAt = undefined;
        resume.updatedAt = undefined;

        return res.status(200).json({ resume });

    } catch (error) {
        console.error(error);          // <-- IMPORTANT
        console.error(error.stack);    // <-- IMPORTANT
        return res.status(400).json({
            message: error.message,
        });
    }
};

// get resume by id public
// GET : /api/resumes/public

export const getPublicResumeById = async (req, res) => {

    try {
        const { resumeId } = req.params;
        const resume = await Resume.findOne({ public: true, _id: resumeId })

        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }

        return res.status(200).json({ resume })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }

}

// controller for updating a resume:
// PUT : /api/resumes/update

export const updateResume = async (req, res) => {
    try {
        console.log("Controller entered");

        const userId = req.userId;
        const { resumeId, resumeData, removeBackground } = req.body;
        const image = req.file;

        console.log("resumeId:", resumeId);

        let resumeDataCopy;

        if (typeof resumeData === "string") {
            console.log("Parsing JSON");
            resumeDataCopy = JSON.parse(resumeData);
        } else {
            console.log("Using structuredClone");
            resumeDataCopy = structuredClone(resumeData);
        }

        if (image) {
            console.log("Uploading image...");
            // image upload code
        }

        console.log("Before findOneAndUpdate");

        const resume = await Resume.findOneAndUpdate(
            { userId, _id: resumeId },
            resumeDataCopy,
            { new: true }
        );

        console.log("After findOneAndUpdate", resume);

        return res.status(200).json({
            message: "Saved Successfully",
            resume,
        });

    } catch (error) {
        console.error(error);
        console.error(error.stack);

        return res.status(400).json({
            message: error.message,
        });
    }
};