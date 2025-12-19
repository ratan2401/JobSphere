import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, index: true },
    company: { type: String, required: true },
    location: { type: String, index: true },
    skills: [{ type: String, index: true }],
    experience: String,
    education: String,
    salary: Number,
    description: String,
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
