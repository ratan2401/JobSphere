import { useEffect, useState, useRef } from "react";
import axios from "../api/axios";
import JobCard from "../components/JobCard";
import Logo from "../components/Logo";

const Jobs = ({ user, searchParams, onBack, onOpenProfile, onOpenPostJob, onLogout, onApply }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showUserMenu]);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (searchParams?.title) params.append("skill", searchParams.title);
        if (searchParams?.location) params.append("location", searchParams.location);
        
        const res = await axios.get(`/jobs?${params.toString()}`);
        setJobs(res.data);
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo />
            <span className="text-xl font-semibold">Job Search Results</span>
          </div>
          <div className="flex items-center gap-3">
            {user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-100"
                >
                  <span>Hi, {user.username}</span>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 rounded-lg border bg-white shadow-lg z-10">
                    <button
                      onClick={() => { onOpenProfile(); setShowUserMenu(false); }}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 rounded-t-lg"
                    >
                      View Profile
                    </button>
                    <button
                      onClick={() => { onLogout(); setShowUserMenu(false); }}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 rounded-b-lg"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : null}
            <button
              onClick={onBack}
              className="rounded border px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Back to Home
            </button>
            <button
              onClick={onOpenPostJob}
              className="rounded bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-2 text-sm font-semibold text-white hover:from-emerald-600 hover:to-teal-700"
            >
              Post a Job
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        {searchParams && (
          <div className="mb-6 rounded-lg bg-white p-4 shadow-sm border">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Search Filters</h2>
            <div className="flex gap-4 text-sm text-gray-600">
              {searchParams.title && <span>Keywords: <strong>{searchParams.title}</strong></span>}
              {searchParams.location && <span>Location: <strong>{searchParams.location}</strong></span>}
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12 text-gray-600">Loading jobs...</div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No jobs found matching your search.</p>
            <button
              onClick={onBack}
              className="rounded bg-emerald-500 px-6 py-2 text-white hover:bg-emerald-600"
            >
              Try a Different Search
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">{jobs.length} job{jobs.length !== 1 ? 's' : ''} found</p>
            {jobs.map(job => (
              <JobCard key={job._id} job={job} onApply={onApply} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Jobs;
