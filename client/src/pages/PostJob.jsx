import { useState } from "react";
import axios from "../api/axios";
import Logo from "../components/Logo";

const PostJob = ({ user, onBack, onLogout }) => {
  const [form, setForm] = useState({ 
    title: "", 
    company: "", 
    location: "", 
    experience: "",
    education: "",
    skills: "" 
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please login to post a job.");
      return;
    }

    if (!form.title || !form.company) {
      setError("Title and company are required.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await axios.post("/jobs", {
        title: form.title,
        company: form.company,
        location: form.location,
        experience: form.experience,
        education: form.education,
        skills: form.skills.split(",").map(s => s.trim()).filter(s => s)
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess("Job posted successfully!");
      setForm({ title: "", company: "", location: "", experience: "", education: "", skills: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to post job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <Logo />
            <span className="text-lg font-semibold">Post a Job</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onBack}
              className="rounded border px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Back
            </button>
            <button
              onClick={onLogout}
              className="rounded bg-gray-100 px-3 py-2 text-sm text-gray-700 hover:bg-gray-200"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8">
        <form onSubmit={submit} className="rounded-xl border bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">Post a New Job</h2>
          <p className="text-sm text-gray-600">Share a job opening with our community.</p>

          <div className="space-y-4">
            <label className="space-y-1 text-sm">
              <span className="text-gray-700 font-medium">Job Title</span>
              <input
                type="text"
                placeholder="e.g., Senior React Developer"
                className="w-full rounded border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:outline-none"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </label>

            <label className="space-y-1 text-sm">
              <span className="text-gray-700 font-medium">Company</span>
              <input
                type="text"
                placeholder="e.g., Tech Corp Inc."
                className="w-full rounded border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:outline-none"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                required
              />
            </label>

            <label className="space-y-1 text-sm">
              <span className="text-gray-700 font-medium">Location</span>
              <input
                type="text"
                placeholder="e.g., Remote, New York, San Francisco"
                className="w-full rounded border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:outline-none"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-1 text-sm">
                <span className="text-gray-700 font-medium">Experience Level</span>
                <select
                  className="w-full rounded border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:outline-none"
                  value={form.experience}
                  onChange={(e) => setForm({ ...form, experience: e.target.value })}
                >
                  <option value="">Select level</option>
                  <option value="Fresher">Fresher</option>
                  <option value="0-1 years">0-1 years</option>
                  <option value="1-3 years">1-3 years</option>
                  <option value="3-5 years">3-5 years</option>
                  <option value="5-10 years">5-10 years</option>
                  <option value="10+ years">10+ years</option>
                </select>
              </label>

              <label className="space-y-1 text-sm">
                <span className="text-gray-700 font-medium">Education</span>
                <select
                  className="w-full rounded border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:outline-none"
                  value={form.education}
                  onChange={(e) => setForm({ ...form, education: e.target.value })}
                >
                  <option value="">Select education</option>
                  <option value="High School">High School</option>
                  <option value="Bachelor's Degree">Bachelor's Degree</option>
                  <option value="Master's Degree">Master's Degree</option>
                  <option value="PhD">PhD</option>
                  <option value="Any">Any</option>
                </select>
              </label>
            </div>

            <label className="space-y-1 text-sm">
              <span className="text-gray-700 font-medium">Required Skills (comma separated)</span>
              <textarea
                placeholder="e.g., React, Node.js, MongoDB"
                rows="3"
                className="w-full rounded border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:outline-none"
                value={form.skills}
                onChange={(e) => setForm({ ...form, skills: e.target.value })}
              />
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="rounded bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-2 text-white font-semibold hover:from-emerald-600 hover:to-teal-700 disabled:opacity-60"
            >
              {loading ? "Posting..." : "Post Job"}
            </button>
            <button
              type="button"
              onClick={onBack}
              className="rounded border px-6 py-2 text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>

          {success && (
            <div className="rounded border border-green-200 bg-green-50 px-4 py-2 text-sm text-green-800">
              {success}
            </div>
          )}
          {error && (
            <div className="rounded border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-800">
              {error}
            </div>
          )}
        </form>
      </main>
    </div>
  );
};

export default PostJob;
