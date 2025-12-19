import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true
    },
    applicantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    college: { type: String },
    skills: { type: String },
    resume: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model("Application", applicationSchema);
