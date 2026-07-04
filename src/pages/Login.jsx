// src/pages/Login.jsx

import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Eye, EyeOff, ArrowRight, Scissors } from "lucide-react";
import toast from "react-hot-toast";
import { loginEmail } from "../redux/slices/authSlice";

const Login = () => {
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ===============================
  // LOGIN USING REDUX
  // ===============================
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const user = await dispatch(loginEmail(formData)).unwrap();
      console.log("LOGIN SUCCESS:", user);
      toast.success("Login Successful");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: "#F5F0EB" }}
    >
      <div className="w-full max-w-4xl flex rounded-3xl overflow-hidden shadow-2xl border border-black/5">
        {/* LEFT PANEL */}
        <div
          className="hidden lg:flex flex-col justify-between w-[45%] p-10 relative overflow-hidden"
          style={{ background: "#1C1917" }}
        >
          {/* stitched border along the seam */}
          <div
            className="absolute top-0 right-0 h-full w-px"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, #C9826B 0, #C9826B 6px, transparent 6px, transparent 14px)",
              opacity: 0.5,
            }}
          />

          {/* ambient stitched texture */}
          <div
            className="pointer-events-none absolute -right-24 -bottom-24 w-72 h-72 rounded-full"
            style={{
              border: "1.5px dashed rgba(201,130,107,0.25)",
            }}
          />
          <div
            className="pointer-events-none absolute -right-10 -bottom-10 w-52 h-52 rounded-full"
            style={{
              border: "1.5px dashed rgba(201,130,107,0.18)",
            }}
          />

          <div className="relative z-10">
            <span className="text-3xl font-black text-white tracking-tight">Thread</span>
            <span className="text-3xl font-black text-[#C9826B]">&amp;</span>
            <span className="text-3xl font-black text-white tracking-tight">Tale</span>
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <span
                className="block h-px w-6"
                style={{ background: "#C9826B" }}
              />
              <p className="text-[#C9826B] uppercase tracking-[0.2em] text-xs font-medium">
                Welcome back
              </p>
            </div>

            <h2 className="text-4xl font-black text-white leading-[1.15]" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
              Every stitch
              <br />
              has a story.
            </h2>

            <p className="text-stone-400 mt-4 text-sm leading-relaxed max-w-[280px]">
              Sign in to continue shopping, manage orders and wishlist.
            </p>

            <div className="flex items-center gap-2 mt-8 text-stone-500">
              <Scissors size={14} className="text-[#C9826B]" />
              <span
                className="block h-px flex-1"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(to right, #57534e 0, #57534e 4px, transparent 4px, transparent 8px)",
                }}
              />
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex-1 bg-white p-10 sm:p-12">
          <h2 className="text-3xl font-black mb-2 text-stone-900" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
            Sign in
          </h2>

          <p className="text-sm text-stone-500 mb-8">
            Don&apos;t have an account?
            <Link
              to="/register"
              className="ml-2 text-[#C9826B] font-medium hover:underline underline-offset-4"
            >
              Sign up
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* EMAIL */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-stone-500 mb-1.5">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-stone-200 p-3 rounded-xl outline-none transition-all focus:border-[#C9826B] focus:ring-4 focus:ring-[#C9826B]/10 placeholder:text-stone-400"
                placeholder="you@example.com"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-stone-500 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="password"
                  className="w-full border border-stone-200 p-3 pr-11 rounded-xl outline-none transition-all focus:border-[#C9826B] focus:ring-4 focus:ring-[#C9826B]/10 placeholder:text-stone-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              
            </div>

            <button
              disabled={loading}
              className="w-full text-white p-3.5 rounded-xl flex justify-center items-center gap-2 font-medium transition-all hover:opacity-90 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              style={{ background: "#1C1917" }}
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin cursor-not-allowed" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          

          
        </div>
      </div>
    </div>
  );
};

export default Login;