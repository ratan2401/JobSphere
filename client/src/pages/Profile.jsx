import { useEffect, useState } from "react";
import axios from "../api/axios";
import Logo from "../components/Logo";

const Profile = ({ user, onBack, onProfileUpdate, onLogout }) => {
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    college: "",
    company: "",
    phone: ""
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please login to view your profile.");
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axios.get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = res.data;
        setForm({
          name: data.name || "",
          username: data.username || "",
          email: data.email || "",
          college: data.college || "",
          company: data.company || "",
          phone: data.phone || ""
        });
        onProfileUpdate?.(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please login again.");
      setSaving(false);
      return;
    }

    try {
      const res = await axios.put(
        "/auth/me",
        {
          name: form.name,
          college: form.college,
          company: form.company,
          phone: form.phone
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = res.data;
      setForm({
        name: data.name || "",
        username: data.username || "",
        email: data.email || "",
        college: data.college || "",
        company: data.company || "",
        phone: data.phone || ""
      });
      setSuccess("Profile updated.");
      onProfileUpdate?.(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-600">Loading profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="space-y-4 text-center">
          <p className="text-red-600">{error}</p>
          <div className="flex justify-center gap-2">
            <button
              onClick={onBack}
              className="rounded border px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Back
            </button>
            <button
              onClick={onLogout}
              className="rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <Logo />
            <span className="text-lg font-semibold">Profile</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onBack}
              className="rounded border px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Home
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

      <main className="mx-auto max-w-5xl px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <form onSubmit={handleSave} className="rounded-xl border bg-white p-6 shadow-sm space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Your Profile</h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-1 text-sm">
                <span className="text-gray-700">Full name</span>
                <input
                  type="text"
                  className="w-full rounded border px-3 py-2"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  required
                />
              </label>
              <label className="space-y-1 text-sm">
                <span className="text-gray-700">Username</span>
                <input
                  type="text"
                  className="w-full rounded border px-3 py-2 bg-gray-100 cursor-not-allowed"
                  value={form.username}
                  disabled
                />
              </label>
              <label className="space-y-1 text-sm">
                <span className="text-gray-700">Email</span>
                <input
                  type="email"
                  className="w-full rounded border px-3 py-2 bg-gray-100 cursor-not-allowed"
                  value={form.email}
                  disabled
                />
              </label>
              <label className="space-y-1 text-sm">
                <span className="text-gray-700">Phone</span>
                <input
                  type="tel"
                  className="w-full rounded border px-3 py-2"
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  placeholder="e.g., +1 555 123 4567"
                />
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-1 text-sm">
                <span className="text-gray-700">College</span>
                <input
                  type="text"
                  className="w-full rounded border px-3 py-2"
                  value={form.college}
                  onChange={(e) => setForm((f) => ({ ...f, college: e.target.value }))}
                  placeholder="Your college name"
                />
              </label>
              <label className="space-y-1 text-sm">
                <span className="text-gray-700">Company</span>
                <input
                  type="text"
                  className="w-full rounded border px-3 py-2"
                  value={form.company}
                  onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                  placeholder="Current company"
                />
              </label>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="rounded bg-blue-600 px-5 py-2 text-white font-semibold hover:bg-blue-700 disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save changes"}
              </button>
              <button
                type="button"
                onClick={onBack}
                className="rounded border px-5 py-2 text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>

            {success && (
              <div className="rounded border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-800">
                {success}
              </div>
            )}
            {error && (
              <div className="rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
                {error}
              </div>
            )}
          </form>

          <div className="rounded-xl border bg-white p-6 shadow-sm space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">At a glance</h3>
            <div className="space-y-1 text-sm text-gray-700">
              <p><span className="font-semibold">Name:</span> {form.name || "-"}</p>
              <p><span className="font-semibold">Username:</span> {form.username || "-"}</p>
              <p><span className="font-semibold">Email:</span> {form.email || "-"}</p>
              <p><span className="font-semibold">College:</span> {form.college || "-"}</p>
              <p><span className="font-semibold">Company:</span> {form.company || "-"}</p>
              <p><span className="font-semibold">Phone:</span> {form.phone || "-"}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
