// controller fro creating a new resume
// POST: /api/resumes/create

import imagekit from "../configs/imageKit.js";
import Resume from "../models/Resume.js";
import fs from 'fs';
import puppeteer from "puppeteer";
import jwt from "jsonwebtoken";

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

export const downloadResumePDF = async (req, res) => {
    
    let browser;

    try {
        const { resumeId } = req.params;

        const userId = req.userId;

        const resume = await Resume.findOne({
             _id: resumeId,
             userId,
        });

        if (!resume) {
            return res.status(404).json({
                message: "Resume not found",
         });
        }

        if (!resumeId) {
            return res.status(400).json({
                message: "Resume ID is required",
            });
        }

        const renderToken = jwt.sign(
          {
             userId: userId.toString(),
             resumeId: resumeId.toString(),
             purpose: "pdf-render",
          },
             process.env.JWT_SECRET,
          {
             expiresIn: "2m",
          }
        );

        console.log("GENERATED RENDER TOKEN:", renderToken);

        browser = await puppeteer.launch({
            headless: true,
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
        });

        const page = await browser.newPage();

        await page.setViewport({
            width: 794,
            height: 1123,
            deviceScaleFactor: 1,
        });

        const resumeUrl =`${process.env.FRONTEND_URL}/pdf-preview/${resumeId}?renderToken=${renderToken}`;

        console.log("Opening resume:", resumeUrl);

        await page.goto(resumeUrl, {
            waitUntil: "domcontentloaded",
        });

          console.log("Page title:", await page.title());
          console.log("Page URL:", page.url());

          console.log("WAITING FOR RESUME PREVIEW...");

         await page.waitForSelector("#resume-preview", {
              timeout: 30000,
              visible: true,
          });

         console.log("RESUME PREVIEW FOUND!");

        // Wait for fonts
        await page.evaluate(async () => {
            await document.fonts.ready;
        });

        // Wait for images
        await page.evaluate(async () => {
            const images = Array.from(document.images);

            await Promise.all(
                images.map((img) => {
                    if (img.complete) {
                        return Promise.resolve();
                    }

                    return new Promise((resolve) => {
                        img.onload = resolve;
                        img.onerror = resolve;
                    });
                })
            );
        });

        console.log("STARTING PDF GENERATION...");

        await page.emulateMediaType("print");

        const pdf = await page.pdf({
            format: "A4",
            printBackground: true,
            preferCSSPageSize: true,
            margin: {
                top: "0mm",
                right: "0mm",
                bottom: "0mm",
                left: "0mm",
            },
            displayHeaderFooter: false,
        });

        console.log("PDF GENERATED SUCCESSFULLY!");
        console.log("PDF SIZE:", pdf.length);

        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename="resume-${resumeId}.pdf"`,
            "Content-Length": pdf.length,
        });

        return res.send(pdf);

    } catch (error) {
        console.error("PDF Generation error:", error);

        return res.status(500).json({
            message: "Failed to generate PDF",
            error: error.message,
        });

    } finally {
        if (browser) {
            await browser.close();
        }
    }
};

//  this is different from pulbic preview , it's independent of public : true

export const getResumeForPDF = async (req, res) => {
    try {
        const { resumeId } = req.params;
        const { token } = req.query;

        console.log("PDF TOKEN RECEIVED:", token);
        console.log("JWT SECRET EXISTS:", !!process.env.JWT_SECRET);

        if (!resumeId || !token) {
            return res.status(400).json({
                message: "Invalid PDF request",
            });
        }

       const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET
        );

        console.log("PDF TOKEN DECODED:", decoded);

        if (decoded.purpose !== "pdf-render") {
            return res.status(401).json({
                message: "Invalid render token",
            });
        }

        if (decoded.resumeId !== resumeId) {
            return res.status(403).json({
                message: "Invalid render token",
            });
        }

        const resume = await Resume.findOne({
            _id: resumeId,
            userId: decoded.userId,
        });

        console.log("PDF RESUME FOUND:", !!resume);
        console.log("PDF TEMPLATE FROM DB:", resume?.template);
        console.log("PDF RESUME OBJECT:", resume);

        if (!resume) {
            return res.status(404).json({
                message: "Resume not found",
            });
        }

        return res.status(200).json({
            resume,
        });

    } catch (error) {
        console.error("PDF data error:", error);

        return res.status(401).json({
            message: "Invalid or expired render token",
        });
    }
};