import { useState } from 'react'
import './App.css'
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import PostJob from "./pages/PostJob";
import Jobs from "./pages/Jobs";
import ApplyJob from "./pages/ApplyJob";

const getStoredUser = () => {
  try {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  } catch (e) {
    return null;
  }
};

function App() {
  const [user, setUser] = useState(getStoredUser);
  const [view, setView] = useState("home"); // 'home' | 'profile' | 'postjob' | 'jobs' | 'apply'
  const [searchParams, setSearchParams] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicationSuccess, setApplicationSuccess] = useState(false);
  const [loginRequired, setLoginRequired] = useState(false);
  const [postLoginRequired, setPostLoginRequired] = useState(false);

  const handleLoginSuccess = (u) => {
    setUser(u);
    localStorage.setItem("user", JSON.stringify(u));
    setView("home");
  };

  const handleProfileUpdate = (u) => {
    setUser(u);
    localStorage.setItem("user", JSON.stringify(u));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setView("home");
  };

  const handleSearch = (query) => {
    setSearchParams(query);
    setView("jobs");
  };

  const handleApplyJob = (job) => {
    if (!user || !localStorage.getItem("token")) {
      setLoginRequired(true);
      setTimeout(() => setLoginRequired(false), 2500);
      setView("home");
      return;
    }
    setSelectedJob(job);
    setView("apply");
  };

  const handleOpenPostJob = () => {
    if (!user || !localStorage.getItem("token")) {
      setPostLoginRequired(true);
      setTimeout(() => setPostLoginRequired(false), 2500);
      setView("home");
      return;
    }
    setView("postjob");
  };

  const handleApplicationSuccess = () => {
    setApplicationSuccess(true);
    setTimeout(() => {
      setApplicationSuccess(false);
      setView("jobs");
    }, 2000);
  };

  return (
    <>
      {applicationSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
          ✓ Applied Successfully!
        </div>
      )}
      {loginRequired && (
        <div className="fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
          Please login to apply.
        </div>
      )}
      {postLoginRequired && (
        <div className="fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
          Please login to post a job.
        </div>
      )}
      
      {view === "home" ? (
        <Home
          user={user}
          onLoginSuccess={handleLoginSuccess}
          onOpenProfile={() => setView("profile")}
          onOpenPostJob={handleOpenPostJob}
          onSearch={handleSearch}
          onLogout={handleLogout}
        />
      ) : view === "profile" ? (
        <Profile
          user={user}
          onBack={() => setView("home")}
          onProfileUpdate={handleProfileUpdate}
          onLogout={handleLogout}
        />
      ) : view === "jobs" ? (
        <Jobs
          user={user}
          searchParams={searchParams}
          onBack={() => setView("home")}
          onOpenProfile={() => setView("profile")}
          onOpenPostJob={handleOpenPostJob}
          onLogout={handleLogout}
          onApply={handleApplyJob}
        />
      ) : view === "apply" ? (
        <ApplyJob
          job={selectedJob}
          onBack={() => setView("jobs")}
          onSuccess={handleApplicationSuccess}
        />
      ) : (
        <PostJob
          user={user}
          onBack={() => setView("home")}
          onLogout={handleLogout}
        />
      )}
    </>
  )
}

export default App
