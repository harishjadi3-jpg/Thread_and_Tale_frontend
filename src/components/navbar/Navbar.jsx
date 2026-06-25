// src/components/layout/Navbar.jsx

import {
  ShoppingCart,
  Heart,
  Menu,
  X,
  Sparkles,
  MapPin,
  ClipboardList,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import MobileMenu from "./MobileMenu";
import { getCurrentUser } from "../../api/userApi"; // ← adjust path to your actual API file

const Navbar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null); // ← start as null, let the effect verify

  const { cartItems } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);

  // ── Single source of truth: always verify token with backend ──
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await getCurrentUser();
        // adjust based on your API response shape
        setUser(res.data.data ?? res.data);
      } catch (error) {
        // token expired or invalid → clear everything
        localStorage.removeItem("user");
        setUser(null);
      }
    };

    verifyUser();
  }, []); // runs once on mount

  // ── Also sync if localStorage changes in another tab ──
  useEffect(() => {
    const checkUser = () => {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        setUser(null);
      }
    };
    window.addEventListener("storage", checkUser);
    return () => window.removeEventListener("storage", checkUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  };

  const navLinks = [
    { to: "/products", label: "Products", icon: null },
    { to: "/orders", label: "My Orders", icon: <ClipboardList size={15} /> },
    { to: "/profile/addresses", label: "Addresses", icon: <MapPin size={15} /> },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full font-sans">

      {/* ── Announcement bar ── */}
      <div className="bg-[#1C1917] text-[#FAF7F2] text-xs flex items-center justify-center gap-2 py-2 tracking-wide">
        <Sparkles size={12} className="text-[#C9826B]" />
        <span>Free shipping on orders above ₹999 · Easy 7-day returns</span>
        <Sparkles size={12} className="text-[#C9826B]" />
      </div>

      {/* ── Main nav ── */}
      <nav className="bg-[#FAF7F2] border-b border-stone-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center gap-6">

          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-baseline gap-0 select-none">
            <span className="text-2xl font-black text-[#1C1917]" style={{ fontFamily: "'Georgia', serif", letterSpacing: "-0.03em" }}>Thread</span>
            <span className="text-2xl font-black text-[#C9826B]" style={{ fontFamily: "'Georgia', serif" }}>&</span>
            <span className="text-2xl font-black text-[#1C1917]" style={{ fontFamily: "'Georgia', serif", letterSpacing: "-0.03em" }}>Tale</span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1 ml-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-1.5 text-sm font-semibold px-3 py-2 rounded-lg transition-all duration-150 ${
                  isActive(link.to)
                    ? "bg-[#1C1917] text-[#FAF7F2]"
                    : "text-stone-600 hover:bg-stone-100 hover:text-[#1C1917]"
                }`}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right section */}
          <div className="hidden md:flex items-center gap-3 ml-auto">

            {/* Auth — driven purely by verified user state */}
            {user ? (
              <div className="flex items-center gap-3">
                <Link to="/profile" className="flex items-center gap-2 group">
                  <img
                    src={user.profileImage || "/default-avatar.png"}
                    alt="profile"
                    className="w-9 h-9 rounded-full object-cover border-2 border-[#C9826B] group-hover:border-[#1C1917] transition"
                  />
                  <span className="text-sm font-semibold text-stone-700 group-hover:text-[#C9826B] transition">
                    {user.username?.split(" ")[0] || "Profile"}
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-xs font-semibold px-3 py-2 rounded-lg border border-stone-300 text-stone-600 hover:bg-[#1C1917] hover:text-white hover:border-[#1C1917] transition"
                >
                  Log out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="text-sm font-semibold px-4 py-2 rounded-lg text-stone-700 hover:text-[#C9826B] transition">
                  Log in
                </Link>
                <Link to="/register" className="text-sm font-semibold px-4 py-2 rounded-lg bg-[#1C1917] text-[#FAF7F2] hover:bg-[#C9826B] transition">
                  Sign up
                </Link>
              </div>
            )}

            {/* Divider */}
            <div className="w-px h-6 bg-stone-200" />

            {/* Wishlist */}
            <Link to="/wishlist" className="relative group p-2 rounded-lg hover:bg-stone-100 transition">
              <Heart
                size={20}
                className={`transition ${isActive("/wishlist") ? "text-[#C9826B] fill-[#C9826B]" : "text-stone-600 group-hover:text-[#C9826B] group-hover:fill-[#C9826B]"}`}
              />
              {wishlist.length > 0 && (
                <span className="absolute top-0 right-0 bg-[#C9826B] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative group p-2 rounded-lg hover:bg-stone-100 transition">
              <ShoppingCart
                size={20}
                className={`transition ${isActive("/cart") ? "text-[#1C1917]" : "text-stone-600 group-hover:text-[#1C1917]"}`}
              />
              {cartItems.length > 0 && (
                <span className="absolute top-0 right-0 bg-[#1C1917] text-[#FAF7F2] text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden ml-auto p-2 rounded-lg text-stone-700 hover:bg-stone-100 hover:text-[#C9826B] transition"
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <MobileMenu open={open} setOpen={setOpen} />
    </header>
  );
};

export default Navbar;