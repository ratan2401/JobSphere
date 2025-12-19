import { useState } from "react";
import axios from "../api/axios";

const Login = ({ onSuccess }) => {
  const [mode, setMode] = useState("login"); // 'login' | 'register'
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    try {
      if (mode === "login") {
        const res = await axios.post("/auth/login", { email, password });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setSuccessMsg(`Welcome, ${res.data.user.username}!`);
        onSuccess?.(res.data.user);
      } else {
        await axios.post("/auth/register", { name, username, email, password });
        setSuccessMsg("Registration successful. Please login.");
        setMode("login");
        setPassword("");
      }
    } catch (err) {
      setSuccessMsg("");
      alert(err.response?.data?.message || (mode === "login" ? "Login failed" : "Registration failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center bg-white">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-full space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">
          {mode === "login" ? "Login" : "Create your account"}
        </h2>

        {mode === "register" && (
          <>
            <input
              type="text"
              placeholder="Full name"
              className="border p-2 w-full rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Username"
              className="border p-2 w-full rounded"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </>
        )}

        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-gradient-to-r from-emerald-500 to-teal-600 py-2 font-semibold text-white hover:from-emerald-600 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (mode === "login" ? "Logging in..." : "Registering...") : (mode === "login" ? "Login" : "Register")}
        </button>

        {successMsg && (
          <div className="rounded border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-800">
            {successMsg}
          </div>
        )}

        <div className="text-center text-sm text-gray-600">
          {mode === "login" ? (
            <span className="inline-flex items-center gap-2">
              <span>Don't have an account?</span>{" "}
              <button
                type="button"
                onClick={() => setMode("register")}
                className="inline-flex items-center rounded bg-gradient-to-r from-emerald-500 to-teal-600 px-3 py-1 text-white text-sm font-semibold hover:from-emerald-600 hover:to-teal-700"
              >
                Register
              </button>
            </span>
          ) : (
            <span className="inline-flex items-center gap-2">
              <span>Already have an account?</span>{" "}
              <button
                type="button"
                onClick={() => setMode("login")}
                className="inline-flex items-center rounded bg-gradient-to-r from-emerald-500 to-teal-600 px-3 py-1 text-white text-sm font-semibold hover:from-emerald-600 hover:to-teal-700"
              >
                Login
              </button>
            </span>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
