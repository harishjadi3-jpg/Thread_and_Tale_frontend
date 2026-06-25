// src/pages/Login.jsx

import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff, ArrowRight, Shirt } from "lucide-react";
import toast from "react-hot-toast";
import API from "../api/axios";

const Login = () => {
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await API.post("/logginwithemail", formData);
      localStorage.setItem("user", JSON.stringify(response.data.data));
      toast.success("Login Successful");
      setTimeout(() => {
        navigate(from, { replace: true });
        window.location.reload();
      }, 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: "#F5F0EB" }}
    >
      <div className="w-full max-w-4xl flex rounded-3xl overflow-hidden shadow-2xl">

        {/* ── Left panel ── */}
        <div
          className="hidden lg:flex flex-col justify-between w-[45%] p-10"
          style={{ background: "#1C1917" }}
        >
          {/* Brand */}
          <div className="flex items-baseline gap-0 select-none">
            <span
              className="text-3xl font-black text-[#FAF7F2]"
              style={{ fontFamily: "'Georgia', serif", letterSpacing: "-0.03em" }}
            >
              Thread
            </span>
            <span
              className="text-3xl font-black text-[#C9826B]"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              &
            </span>
            <span
              className="text-3xl font-black text-[#FAF7F2]"
              style={{ fontFamily: "'Georgia', serif", letterSpacing: "-0.03em" }}
            >
              Tale
            </span>
          </div>

          {/* Middle copy */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C9826B] mb-3">
              Welcome back
            </p>
            <h2
              className="text-4xl font-black text-[#FAF7F2] leading-tight mb-4"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Every stitch<br />has a story.
            </h2>
            <p className="text-stone-400 text-sm leading-relaxed">
              Sign in to continue your journey — track orders, revisit
              your wishlist, and discover new arrivals.
            </p>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6">
            {[
              { value: "2k+", label: "Styles" },
              { value: "7-day", label: "Returns" },
              { value: "₹99", label: "Delivery" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-[#C9826B] font-extrabold text-lg">{s.value}</p>
                <p className="text-stone-500 text-xs">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right panel ── */}
        <div className="flex-1 bg-white p-8 md:p-12 flex flex-col justify-center">

          {/* Mobile brand */}
          <div className="flex lg:hidden items-baseline gap-0 select-none mb-8 justify-center">
            <span className="text-2xl font-black text-[#1C1917]" style={{ fontFamily: "'Georgia', serif" }}>Thread</span>
            <span className="text-2xl font-black text-[#C9826B]" style={{ fontFamily: "'Georgia', serif" }}>&</span>
            <span className="text-2xl font-black text-[#1C1917]" style={{ fontFamily: "'Georgia', serif" }}>Tale</span>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-black text-[#1C1917] mb-1"
              style={{ fontFamily: "'Georgia', serif" }}>
              Sign in
            </h2>
            <p className="text-stone-500 text-sm">
              Don't have an account?{" "}
              <Link to="/register" className="text-[#C9826B] font-semibold hover:underline">
                Sign up
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1.5">
                Email address
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 text-sm text-stone-800 placeholder-stone-400 outline-none focus:border-[#C9826B] transition bg-[#FAF7F2]"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-semibold text-stone-700">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-[#C9826B] hover:underline font-medium"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 text-sm text-stone-800 placeholder-stone-400 outline-none focus:border-[#C9826B] transition bg-[#FAF7F2] pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-[#C9826B] transition"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 mt-2"
              style={{
                background: loading ? "#a8a29e" : "#1C1917",
                color: "#FAF7F2",
              }}
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in…
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRight size={16} />
                </>
              )}
            </button>

          </form>

          {/* Footer note */}
          <p className="text-center text-xs text-stone-400 mt-8">
            By signing in you agree to our{" "}
            <span className="underline cursor-pointer hover:text-[#C9826B]">Terms</span>
            {" & "}
            <span className="underline cursor-pointer hover:text-[#C9826B]">Privacy Policy</span>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;