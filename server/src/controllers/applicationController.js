import Application from "../models/Application.js";

/**
 * POST /api/applications
 */
export const submitApplication = async (req, res) => {
  try {
    const { jobId, name, email, mobile, college, skills } = req.body;
    const resume = req.file?.filename || req.body.resume;

    if (!jobId || !name || !email || !mobile) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if user already applied
    const existing = await Application.findOne({
      jobId,
      email
    });

    if (existing) {
      return res.status(400).json({ message: "You have already applied to this job" });
    }

    const application = await Application.create({
      jobId,
      applicantId: req.user?.id,
      name,
      email,
      mobile,
      college,
      skills,
      resume
    });

    res.status(201).json({
      message: "Application submitted successfully",
      application
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * GET /api/applications/job/:jobId
 */
export const getApplicationsByJob = async (req, res) => {
  try {
    const applications = await Application.find({ jobId: req.params.jobId })
      .sort({ createdAt: -1 });
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
