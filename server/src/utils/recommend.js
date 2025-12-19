import Job from "./models/Job.js";

export const recommendJobs = async (skills) => {
  return Job.find({ skills: { $in: skills } })
    .limit(5)
    .sort({ createdAt: -1 });
};
