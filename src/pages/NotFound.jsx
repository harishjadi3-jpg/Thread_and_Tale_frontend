import { Link } from "react-router-dom";
import { Home, Search, ArrowRight } from "lucide-react";

const QUICK_LINKS = [
  { label: "New Arrivals", to: "/new-arrivals" },
  { label: "Women's Collection", to: "/fashion/women" },
  { label: "Men's Collection", to: "/fashion/men" },
  { label: "Vintage & Pre-loved", to: "/fashion/vintage" },
  { label: "Today's Deals", to: "/deals" },
];

const NotFound = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden"
      style={{ background: "#FAF7F2", fontFamily: "sans-serif" }}
    >

      {/* Background decorative fabric-texture circles */}
      <div
        className="absolute top-[-80px] right-[-80px] w-72 h-72 rounded-full opacity-10 pointer-events-none"
        style={{ background: "#C9826B" }}
      />
      <div
        className="absolute bottom-[-60px] left-[-60px] w-56 h-56 rounded-full opacity-10 pointer-events-none"
        style={{ background: "#7A9E87" }}
      />
      <div
        className="absolute top-1/2 left-[-40px] w-32 h-32 rounded-full opacity-5 pointer-events-none"
        style={{ background: "#1C1917" }}
      />

      {/* Main content */}
      <div className="relative z-10 text-center max-w-lg w-full">

        {/* Eyebrow */}
        <p
          className="text-xs font-bold uppercase tracking-[0.25em] mb-4"
          style={{ color: "#C9826B" }}
        >
          Lost in the wardrobe
        </p>

        {/* Giant 404 */}
        <div className="relative mb-2 select-none">
          <h1
            className="text-[10rem] md:text-[13rem] font-black leading-none"
            style={{
              fontFamily: "Georgia, serif",
              color: "#1C1917",
              letterSpacing: "-0.06em",
              opacity: 0.08,
              lineHeight: 1,
            }}
          >
            404
          </h1>
          {/* Overlaid label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {/* Hanger icon — pure SVG, no external dep */}
            <svg
              width="52"
              height="52"
              viewBox="0 0 52 52"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mb-3"
            >
              <path
                d="M26 10C26 7.8 27.8 6 30 6C32.2 6 34 7.8 34 10C34 11.6 33.1 13 31.7 13.7L26 17"
                stroke="#C9826B"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M26 17L6 30C4.6 30.8 4 32 4 33.5C4 35.4 5.6 37 7.5 37H44.5C46.4 37 48 35.4 48 33.5C48 32 47.4 30.8 46 30L26 17Z"
                stroke="#1C1917"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
            </svg>
            <h2
              className="text-2xl md:text-3xl font-black text-[#1C1917]"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Nothing to wear here
            </h2>
          </div>
        </div>

        <p className="text-stone-500 text-sm leading-relaxed mb-8 mt-4 max-w-xs mx-auto">
          This page seems to have gone out of style. Let's find you something better.
        </p>

        {/* Primary CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-[#FAF7F2] transition-all active:scale-95"
            style={{ background: "#1C1917" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#C9826B")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#1C1917")}
          >
            <Home size={15} />
            Back to Home
          </Link>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border-2 transition-all active:scale-95"
            style={{ borderColor: "#1C1917", color: "#1C1917", background: "transparent" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#1C1917";
              e.currentTarget.style.color = "#FAF7F2";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#1C1917";
            }}
          >
            <Search size={15} />
            Browse all styles
          </Link>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-stone-200" />
          <span className="text-xs text-stone-400 font-medium uppercase tracking-wider">
            or jump to
          </span>
          <div className="flex-1 h-px bg-stone-200" />
        </div>

        {/* Quick links */}
        <ul className="flex flex-col gap-2">
          {QUICK_LINKS.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className="flex items-center justify-between px-5 py-3 rounded-xl bg-white border border-stone-200 text-sm font-medium text-stone-700 hover:border-[#C9826B] hover:text-[#C9826B] transition group"
              >
                {link.label}
                <ArrowRight
                  size={14}
                  className="text-stone-300 group-hover:text-[#C9826B] transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NotFound;