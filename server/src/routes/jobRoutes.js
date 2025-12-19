import express from "express";
import { postJob, getJobs } from "../controllers/jobController.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", auth, postJob);
router.get("/", getJobs);

export default router;
