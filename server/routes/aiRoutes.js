import express from "express";
import protect from "../middlewares/authMiddleWare.js";
import { enhanceJobDescription, enhanceProfessioanlSummary, uploadResume } from "../controller/aiController.js";

const aiRouter = express.Router();

aiRouter.post('/enhance-pro-sum' , protect , enhanceProfessioanlSummary)
aiRouter.post('/enhance-job-desc' , protect , enhanceJobDescription)
aiRouter.post('/upload-resume' , protect , uploadResume)

export default aiRouter