// src/pages/Register.jsx

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowRight, Upload, User } from "lucide-react";
import toast from "react-hot-toast";
import API from "../api/axios";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
    dateOfBirth: "",
    gender: "",
    bio: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setProfilePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const submitData = new FormData();
      Object.keys(formData).forEach((key) => submitData.append(key, formData[key]));
      if (profileImage) submitData.append("profileImage", profileImage);
      await API.post("/register", submitData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Registration Successful. Please login to continue.");
      setTimeout(() => navigate("/login", { replace: true }), 1500);
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border-2 border-stone-200 text-sm text-stone-800 placeholder-stone-400 outline-none focus:border-[#C9826B] transition bg-[#FAF7F2]";
  const labelClass = "block text-sm font-semibold text-stone-700 mb-1.5";

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "#F5F0EB" }}>
      <div className="w-full max-w-5xl flex rounded-3xl overflow-hidden shadow-2xl">

        {/* ── Left panel ── */}
        <div
          className="hidden lg:flex flex-col justify-between w-[38%] p-10"
          style={{ background: "#1C1917" }}
        >
          {/* Brand */}
          <div className="flex items-baseline gap-0 select-none">
            <span className="text-3xl font-black text-[#FAF7F2]" style={{ fontFamily: "'Georgia', serif", letterSpacing: "-0.03em" }}>Thread</span>
            <span className="text-3xl font-black text-[#C9826B]" style={{ fontFamily: "'Georgia', serif" }}>&</span>
            <span className="text-3xl font-black text-[#FAF7F2]" style={{ fontFamily: "'Georgia', serif", letterSpacing: "-0.03em" }}>Tale</span>
          </div>

          {/* Copy */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C9826B] mb-3">
              New here?
            </p>
            <h2
              className="text-4xl font-black text-[#FAF7F2] leading-tight mb-4"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Start your<br />story today.
            </h2>
            <p className="text-stone-400 text-sm leading-relaxed">
              Join thousands of shoppers discovering curated fashion — new arrivals,
              pre-loved treasures, and everything in between.
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
        <div className="flex-1 bg-white p-8 md:p-10 overflow-y-auto">

          {/* Mobile brand */}
          <div className="flex lg:hidden items-baseline gap-0 select-none mb-6 justify-center">
            <span className="text-2xl font-black text-[#1C1917]" style={{ fontFamily: "'Georgia', serif" }}>Thread</span>
            <span className="text-2xl font-black text-[#C9826B]" style={{ fontFamily: "'Georgia', serif" }}>&</span>
            <span className="text-2xl font-black text-[#1C1917]" style={{ fontFamily: "'Georgia', serif" }}>Tale</span>
          </div>

          {/* Heading */}
          <div className="mb-6">
            <h2 className="text-3xl font-black text-[#1C1917] mb-1" style={{ fontFamily: "'Georgia', serif" }}>
              Create account
            </h2>
            <p className="text-stone-500 text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-[#C9826B] font-semibold hover:underline">
                Sign in
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Profile image picker */}
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-full border-2 border-dashed border-stone-300 flex items-center justify-center overflow-hidden flex-shrink-0 cursor-pointer hover:border-[#C9826B] transition"
                onClick={() => document.getElementById("profileImageInput").click()}
              >
                {profilePreview ? (
                  <img src={profilePreview} alt="preview" className="w-full h-full object-cover" />
                ) : (
                  <User size={24} className="text-stone-300" />
                )}
              </div>
              <div>
                <p className="text-sm font-semibold text-stone-700 mb-1">Profile photo</p>
                <button
                  type="button"
                  onClick={() => document.getElementById("profileImageInput").click()}
                  className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border-2 border-stone-200 text-stone-600 hover:border-[#C9826B] hover:text-[#C9826B] transition"
                >
                  <Upload size={12} />
                  Upload photo
                </button>
                <input
                  id="profileImageInput"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            </div>

            {/* 2-col grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Username */}
              <div>
                <label className={labelClass}>Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder="e.g. priya_styles"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>

              {/* Email */}
              <div>
                <label className={labelClass}>Email address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>

              {/* Phone */}
              <div>
                <label className={labelClass}>Phone number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="+91 98765 43210"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>

              {/* Password */}
              <div>
                <label className={labelClass}>Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Min. 8 characters"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className={`${inputClass} pr-12`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-[#C9826B] transition"
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>

              {/* Date of birth */}
              <div>
                <label className={labelClass}>Date of birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              {/* Gender */}
              <div>
                <label className={labelClass}>Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

            </div>

            {/* Bio — full width */}
            <div>
              <label className={labelClass}>Bio <span className="text-stone-400 font-normal">(optional)</span></label>
              <textarea
                name="bio"
                placeholder="Tell us a little about your style…"
                value={formData.bio}
                onChange={handleChange}
                rows={3}
                className={inputClass}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200"
              style={{ background: loading ? "#a8a29e" : "#1C1917", color: "#FAF7F2" }}
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account…
                </>
              ) : (
                <>
                  Create account
                  <ArrowRight size={16} />
                </>
              )}
            </button>

            {/* Footer */}
            <p className="text-center text-xs text-stone-400 pt-1">
              By registering you agree to our{" "}
              <span className="underline cursor-pointer hover:text-[#C9826B]">Terms</span>
              {" & "}
              <span className="underline cursor-pointer hover:text-[#C9826B]">Privacy Policy</span>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;