// controller for creating a new resume
// POST: /api/resumes/create

import imagekit from "../configs/imageKit.js";
import Resume from "../models/Resume.js";
import fs from "fs";
import puppeteer from "puppeteer";
import jwt from "jsonwebtoken";

// Singleton Puppeteer instance
let sharedBrowser = null;

const getBrowser = async () => {
  if (!sharedBrowser || !sharedBrowser.isConnected()) {
    sharedBrowser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage", // Eliminates /dev/shm memory bottleneck on Render
        "--disable-accelerated-2d-canvas",
        "--no-first-run",
        "--no-zygote",
        "--single-process",        // Drastically lowers memory footprint on Render free tier
        "--disable-gpu",
      ],
    });
  }
  return sharedBrowser;
};

export const createResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { title } = req.body;

    const newResume = await Resume.create({ userId, title });

    return res.status(201).json({ message: "Resume created successfully", resume: newResume });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// controller for deleting a resume
// DELETE : /api/resume/delete

export const deleteResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;

    const newResume = await Resume.findOneAndDelete({ userId, _id: resumeId });

    return res.status(200).json({ message: "Resume deleted successfully", resume: newResume });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

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
    console.error(error);
    console.error(error.stack);
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
    const resume = await Resume.findOne({ public: true, _id: resumeId });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    return res.status(200).json({ resume });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

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

// Download resume PDF
// GET : /api/resumes/download/:resumeId

export const downloadResumePDF = async (req, res) => {
  let page = null;

  try {
    const { resumeId } = req.params;
    const userId = req.userId;

    if (!resumeId) {
      return res.status(400).json({
        message: "Resume ID is required",
      });
    }

    const resume = await Resume.findOne({
      _id: resumeId,
      userId,
    });

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
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

    // Reuse the persistent warm browser instance
    const browser = await getBrowser();
    page = await browser.newPage();

    await page.setViewport({
      width: 794,
      height: 1123,
      deviceScaleFactor: 1,
    });

    const resumeUrl = `${process.env.FRONTEND_URL}/pdf-preview/${resumeId}?renderToken=${renderToken}`;
    console.log("Opening resume:", resumeUrl);

    // Fast navigation without waiting for full 500ms network idle
    await page.goto(resumeUrl, {
      waitUntil: "domcontentloaded",
      timeout: 25000,
    });

    // Wait directly for the rendered template container
    await page.waitForSelector("#resume-preview[data-template]", {
      timeout: 15000,
      visible: true,
    });

    // Fast check for font loading
    await page.evaluate(async () => {
      if (document.fonts) {
        await document.fonts.ready;
      }
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
    });

    console.log("PDF GENERATED SUCCESSFULLY!");
    console.log("PDF SIZE:", pdf.length);

    res.set({
      "Content-Type": "application/pdf",
      "Content-Length": pdf.length,
      "Content-Disposition": `attachment; filename="resume-${resumeId}.pdf"`,
    });

    return res.end(pdf);
  } catch (error) {
    console.error("PDF Generation error:", error);

    return res.status(500).json({
      message: "Failed to generate PDF",
      error: error.message,
    });
  } finally {
    if (page) {
      await page.close();
    }
  }
};

// get resume for PDF preview
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

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

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