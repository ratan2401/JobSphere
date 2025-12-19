import express from "express";
import { submitApplication, getApplicationsByJob } from "../controllers/applicationController.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", auth, submitApplication);
router.get("/job/:jobId", auth, getApplicationsByJob);

export default router;
