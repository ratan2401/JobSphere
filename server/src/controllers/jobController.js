import Job from "../models/Job.js";

/**
 * POST /api/jobs
 */
export const postJob = async (req, res) => {
  try {
    const job = await Job.create({ ...req.body, postedBy: req.user.id });
    res.status(201).json(job);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/**
 * GET /api/jobs
 * Filters + pagination
 */
export const getJobs = async (req, res) => {
  try {
    const { page = 1, limit = 50, skill, location } = req.query;

    const filter = {};
    
    // Search across title, company, and skills if skill parameter is provided
    if (skill) {
      filter.$or = [
        { title: { $regex: skill, $options: 'i' } },
        { company: { $regex: skill, $options: 'i' } },
        { skills: { $regex: skill, $options: 'i' } }
      ];
    }
    
    if (location) {
      filter.location = { $regex: location, $options: 'i' };
    }

    const jobs = await Job.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
