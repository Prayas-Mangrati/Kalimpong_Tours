import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("isAdmin", "true");
        showToast("Logged in successfully", "success");

        navigate("/admin/dashboard");
      } else {
        alert(data.message || "Invalid credentials");
        showToast("Invalid username or password", "error");
      }
    } catch (error) {
      showToast("An error occurred during login", "error");
    }
  };

  const navigate = useNavigate();

  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border-gradient shadow-2xl">
        <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        <div className="absolute -right-14 -top-14 h-36 w-36 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute -left-14 -bottom-14 h-36 w-36 rounded-full bg-violet-500/10 blur-3xl" />

        <div className="border-gradient-inner relative rounded-3xl p-6 sm:p-8">
          <div className="mb-8 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-blue-300/90">
              Admin Access
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Sign in to continue
            </h1>
            <p className="mt-3 text-sm leading-6 text-gray-300">
              Use your admin username and password to manage travel places.
            </p>
          </div>

          <form className="grid gap-5" onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <label
                htmlFor="username"
                className="text-sm font-medium text-gray-200"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                autoComplete="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="Enter admin username"
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-gray-500 outline-none transition focus:border-blue-400/70 focus:ring-2 focus:ring-blue-500/30"
              />
            </div>

            <div className="grid gap-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-200"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter password"
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-gray-500 outline-none transition focus:border-blue-400/70 focus:ring-2 focus:ring-blue-500/30"
              />
            </div>

            <div className="flex items-center justify-between gap-4 text-sm text-gray-300">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-500 bg-transparent text-blue-500 focus:ring-blue-500"
                />
                <span>Remember me</span>
              </label>

              <button
                type="button"
                className="font-medium text-blue-300 transition hover:text-blue-200"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="mt-2 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-violet-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:scale-[1.01] hover:shadow-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-400/60"
            >
              Log in
            </button>
          </form>

          <div className="mt-8 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-center text-xs text-gray-400">
            Protected area for content management and place updates.
          </div>
        </div>
      </div>
    </main>
  );
}
