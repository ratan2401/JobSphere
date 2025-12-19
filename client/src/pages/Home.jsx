import { useState, useEffect, useRef } from "react";
import Login from "./Login";
import Logo from "../components/Logo";

const Home = ({ user, onLoginSuccess, onOpenProfile, onOpenPostJob, onSearch, onLogout }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [query, setQuery] = useState({ title: "", location: "" });
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

  const onSearchSubmit = (e) => {
    e.preventDefault();
    onSearch?.(query);
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <header className="border-b bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo />
            <span className="text-xl font-semibold">JobSphere</span>
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
            ) : (
              <button
                onClick={() => setShowLogin(true)}
                className="px-4 py-2 text-sm font-medium text-emerald-700 hover:text-emerald-900"
              >
                Login
              </button>
            )}
            <button
              onClick={(e) => { e.preventDefault(); onOpenPostJob?.(); }}
              className="rounded bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-2 text-sm font-semibold text-white hover:from-emerald-600 hover:to-teal-700 cursor-pointer"
            >
              Post a Job
            </button>
          </div>
        </div>
      </header>

      <main className={showLogin ? "pointer-events-none select-none blur-[2px]" : ""}>
        {/* Hero */}
        <section className="bg-gradient-to-b from-blue-50 to-transparent">
          <div className="mx-auto max-w-6xl px-4 py-16">
            <div className="max-w-2xl space-y-4">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                Find your next job and grow your career
              </h1>
              <p className="text-gray-600">
                Search thousands of openings from top companies. Filter by title,
                location, and skills to discover roles tailored to you.
              </p>
            </div>

            {/* Search Bar */}
            <form
              onSubmit={onSearchSubmit}
              className="mt-8 grid gap-3 rounded-xl border bg-white p-3 shadow-sm sm:grid-cols-[1fr_1fr_auto]"
            >
              <input
                type="text"
                placeholder="Job title, company, or keyword"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-600 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                value={query.title}
                onChange={(e) => setQuery((q) => ({ ...q, title: e.target.value }))}
              />
              <input
                type="text"
                placeholder="Location (e.g., Remote, New York)"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-600 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                value={query.location}
                onChange={(e) => setQuery((q) => ({ ...q, location: e.target.value }))}
              />
              <button
                type="submit"
                className="w-full rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-3 font-semibold text-white hover:from-emerald-600 hover:to-teal-700 shadow-md sm:w-auto"
              >
                Search Jobs
              </button>
            </form>

            {/* Quick filters */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {["Frontend", "Backend", "Full‑Stack", "Data", "DevOps", "Remote"].map(
                (tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery((q) => ({ ...q, title: tag }))}
                    className="rounded-full border border-gray-200 bg-white px-3 py-1 text-sm text-gray-700 hover:border-blue-300 hover:text-blue-700"
                  >
                    {tag}
                  </button>
                )
              )}
            </div>
          </div>
        </section>

        {/* Highlights */}
        <section className="mx-auto max-w-6xl px-4 pb-16">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">Why JobSphere?</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Curated Listings",
                desc: "Fresh roles from trusted companies, updated daily.",
              },
              {
                title: "Smart Matches",
                desc: "Get recommendations based on your skills and interests.",
              },
              {
                title: "Career Growth",
                desc: "Resources and insights to level up your career.",
              },
            ].map((card) => (
              <div key={card.title} className="rounded-xl border bg-white p-5 shadow-sm">
                <Logo className="h-9 w-9 mb-2" />
                <h3 className="font-semibold text-gray-900">{card.title}</h3>
                <p className="text-sm text-gray-600">{card.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Strip */}
        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-4 py-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Ready to apply?</h3>
              <p className="text-sm text-gray-600">Sign in to track applications and get alerts.</p>
            </div>
            <div className="flex gap-3">
              {user ? (
                <button
                  onClick={onOpenProfile}
                  className="rounded-lg border border-emerald-500 px-5 py-2 font-medium text-emerald-700 hover:bg-emerald-50"
                >
                  Go to Profile
                </button>
              ) : (
                <button
                  onClick={() => setShowLogin(true)}
                  className="rounded-lg border border-emerald-500 px-5 py-2 font-medium text-emerald-700 hover:bg-emerald-50"
                >
                  Login
                </button>
              )}
              <button
                type="button"
                onClick={() => onOpenPostJob?.()}
                className="rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 px-5 py-2 font-semibold text-white visited:text-white hover:text-white hover:from-emerald-600 hover:to-teal-700 cursor-pointer inline-block text-center"
              >
                Post a Job
              </button>
            </div>
          </div>
        </section>
      </main>

      {showLogin && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg">
            <button
              aria-label="Close"
              onClick={() => setShowLogin(false)}
              className="absolute -top-2 -right-2 z-10 rounded-full bg-white shadow p-0.5 text-gray-700 hover:text-gray-900 text-xs"
            >
              ✕
            </button>
            <div className="overflow-hidden rounded-2xl border bg-white shadow-xl">
              <Login onSuccess={(u) => { onLoginSuccess?.(u); setShowLogin(false); }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
