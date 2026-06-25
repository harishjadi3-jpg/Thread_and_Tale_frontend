import { useState } from "react";
import { useSelector } from "react-redux";
import { ShieldCheck, MapPin, ChevronDown, ChevronUp, Truck, Tag, Sparkles } from "lucide-react";

import MainLayout from "../layouts/MainLayout";
import RazorpayButton from "../components/payment/RazorpayButton";

const PAYMENT_METHODS = [
  { id: "razorpay", label: "Pay Online", sub: "UPI, Cards, Net Banking, Wallets", icon: "💳" },
  { id: "cod", label: "Cash on Delivery", sub: "Pay when your order arrives", icon: "📦" },
];

const Checkout = () => {
  const { cartItems } = useSelector((state) => state.cart);

  const [selectedPayment, setSelectedPayment] = useState("razorpay");
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [orderSummaryOpen, setOrderSummaryOpen] = useState(true);

  // Derive amounts
  const subtotal = cartItems?.reduce(
    (sum, item) => sum + (item?.price || 0) * (item?.quantity || 1),
    0
  ) || 500;
  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0;
  const delivery = subtotal > 999 ? 0 : 99;
  const total = subtotal - discount + delivery;

  const handleApplyCoupon = () => {
    if (coupon.trim().toUpperCase() === "THREAD10") {
      setCouponApplied(true);
    }
  };

  return (
    <MainLayout>
      <div
        className="min-h-screen py-10 px-4"
        style={{ background: "#FAF7F2", fontFamily: "sans-serif" }}
      >
        <div className="max-w-5xl mx-auto">

          {/* ── Page Header ── */}
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] mb-1" style={{ color: "#C9826B" }}>
              Almost there
            </p>
            <h1
              className="text-3xl md:text-4xl font-black text-[#1C1917]"
              style={{ fontFamily: "Georgia, serif", letterSpacing: "-0.02em" }}
            >
              Checkout
            </h1>
          </div>

          {/* ── Progress indicator ── */}
          <div className="flex items-center gap-0 mb-10">
            {["Cart", "Checkout", "Confirmation"].map((step, i) => (
              <div key={step} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition"
                    style={
                      i === 1
                        ? { background: "#1C1917", borderColor: "#1C1917", color: "#FAF7F2" }
                        : i === 0
                        ? { background: "#C9826B", borderColor: "#C9826B", color: "#fff" }
                        : { background: "transparent", borderColor: "#d6d3d1", color: "#a8a29e" }
                    }
                  >
                    {i === 0 ? "✓" : i + 1}
                  </div>
                  <span
                    className="text-[10px] font-semibold mt-1 uppercase tracking-wider"
                    style={{ color: i === 1 ? "#1C1917" : i === 0 ? "#C9826B" : "#a8a29e" }}
                  >
                    {step}
                  </span>
                </div>
                {i < 2 && (
                  <div
                    className="h-0.5 w-16 md:w-24 mx-1 mb-4 rounded"
                    style={{ background: i === 0 ? "#C9826B" : "#e7e5e4" }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* ── Two-column layout ── */}
          <div className="flex flex-col lg:flex-row gap-8">

            {/* ── LEFT: Delivery + Payment ── */}
            <div className="flex-1 flex flex-col gap-6">

              {/* Delivery address */}
              <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
                <div className="flex items-center gap-3 px-6 py-4 border-b border-stone-100">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "#FAF7F2" }}>
                    <MapPin size={16} style={{ color: "#C9826B" }} />
                  </div>
                  <h2 className="font-bold text-stone-800 text-base">Delivery Address</h2>
                </div>

                <div className="px-6 py-5 flex flex-col gap-4">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">
                        First Name
                      </label>
                      <input
                        type="text"
                        placeholder="Ananya"
                        className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-stone-800 outline-none focus:border-[#C9826B] transition placeholder-stone-300"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">
                        Last Name
                      </label>
                      <input
                        type="text"
                        placeholder="Sharma"
                        className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-stone-800 outline-none focus:border-[#C9826B] transition placeholder-stone-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-stone-800 outline-none focus:border-[#C9826B] transition placeholder-stone-300"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">
                      Address Line
                    </label>
                    <input
                      type="text"
                      placeholder="Flat / House No., Street Name"
                      className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-stone-800 outline-none focus:border-[#C9826B] transition placeholder-stone-300"
                    />
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">
                        City
                      </label>
                      <input
                        type="text"
                        placeholder="Bengaluru"
                        className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-stone-800 outline-none focus:border-[#C9826B] transition placeholder-stone-300"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">
                        PIN Code
                      </label>
                      <input
                        type="text"
                        placeholder="560001"
                        className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-stone-800 outline-none focus:border-[#C9826B] transition placeholder-stone-300"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery method */}
              <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
                <div className="flex items-center gap-3 px-6 py-4 border-b border-stone-100">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "#FAF7F2" }}>
                    <Truck size={16} style={{ color: "#C9826B" }} />
                  </div>
                  <h2 className="font-bold text-stone-800 text-base">Delivery</h2>
                </div>
                <div className="px-6 py-5">
                  <div className="flex items-center justify-between p-4 rounded-xl border-2 border-[#1C1917] bg-stone-50">
                    <div>
                      <p className="text-sm font-semibold text-stone-800">Standard Delivery</p>
                      <p className="text-xs text-stone-500 mt-0.5">Delivered in 3–5 business days</p>
                    </div>
                    <span className="text-sm font-bold" style={{ color: delivery === 0 ? "#7A9E87" : "#1C1917" }}>
                      {delivery === 0 ? "FREE" : `₹${delivery}`}
                    </span>
                  </div>
                  {delivery === 0 && (
                    <p className="text-xs text-[#7A9E87] font-medium mt-2 flex items-center gap-1">
                      <Sparkles size={11} /> Free delivery applied — order above ₹999
                    </p>
                  )}
                </div>
              </div>

              {/* Payment method */}
              <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
                <div className="flex items-center gap-3 px-6 py-4 border-b border-stone-100">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "#FAF7F2" }}>
                    <ShieldCheck size={16} style={{ color: "#C9826B" }} />
                  </div>
                  <h2 className="font-bold text-stone-800 text-base">Payment Method</h2>
                </div>

                <div className="px-6 py-5 flex flex-col gap-3">
                  {PAYMENT_METHODS.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setSelectedPayment(method.id)}
                      className="flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all"
                      style={{
                        borderColor: selectedPayment === method.id ? "#1C1917" : "#e7e5e4",
                        background: selectedPayment === method.id ? "#FAF7F2" : "white",
                      }}
                    >
                      <span className="text-2xl">{method.icon}</span>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-stone-800">{method.label}</p>
                        <p className="text-xs text-stone-500 mt-0.5">{method.sub}</p>
                      </div>
                      <div
                        className="w-4 h-4 rounded-full border-2 flex items-center justify-center"
                        style={{
                          borderColor: selectedPayment === method.id ? "#1C1917" : "#d6d3d1",
                        }}
                      >
                        {selectedPayment === method.id && (
                          <div className="w-2 h-2 rounded-full" style={{ background: "#1C1917" }} />
                        )}
                      </div>
                    </button>
                  ))}

                  {/* Razorpay button rendered conditionally */}
                  {selectedPayment === "razorpay" && (
                    <div className="mt-2">
                      <RazorpayButton amount={total} />
                    </div>
                  )}

                  {selectedPayment === "cod" && (
                    <button
                      className="mt-2 w-full py-3.5 rounded-xl font-bold text-sm text-[#FAF7F2] transition-all active:scale-95"
                      style={{ background: "#1C1917" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#C9826B")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "#1C1917")}
                    >
                      Place Order · Cash on Delivery
                    </button>
                  )}
                </div>
              </div>

              {/* Trust badges */}
              <div className="flex items-center justify-center gap-6 py-4">
                {[
                  { icon: "🔒", label: "Secure Checkout" },
                  { icon: "↩️", label: "7-Day Returns" },
                  { icon: "✅", label: "100% Authentic" },
                ].map((b) => (
                  <div key={b.label} className="flex flex-col items-center gap-1">
                    <span className="text-xl">{b.icon}</span>
                    <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider">
                      {b.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT: Order Summary ── */}
            <div className="lg:w-80 xl:w-96 flex-shrink-0">
              <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden sticky top-24">

                {/* Summary header toggle */}
                <button
                  onClick={() => setOrderSummaryOpen(!orderSummaryOpen)}
                  className="w-full flex items-center justify-between px-6 py-4 border-b border-stone-100"
                >
                  <h2 className="font-bold text-stone-800 text-base">Order Summary</h2>
                  {orderSummaryOpen ? (
                    <ChevronUp size={16} className="text-stone-400" />
                  ) : (
                    <ChevronDown size={16} className="text-stone-400" />
                  )}
                </button>

                {/* Cart items list */}
                {orderSummaryOpen && (
                  <div className="px-6 py-4 max-h-56 overflow-y-auto flex flex-col gap-3 border-b border-stone-100">
                    {cartItems?.length > 0 ? (
                      cartItems.map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <img
                            src={item?.image || item?.images?.[0] || "https://via.placeholder.com/48"}
                            alt={item?.name}
                            className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-stone-800 truncate">{item?.name}</p>
                            <p className="text-xs text-stone-400">Qty: {item?.quantity || 1}</p>
                          </div>
                          <span className="text-sm font-bold text-stone-800">
                            ₹{((item?.price || 0) * (item?.quantity || 1)).toLocaleString("en-IN")}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-4">
                        <p className="text-sm text-stone-400">1 item in your bag</p>
                        <p className="text-base font-bold text-stone-800 mt-1">₹{subtotal.toLocaleString("en-IN")}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Coupon */}
                <div className="px-6 py-4 border-b border-stone-100">
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
                    <Tag size={11} /> Coupon Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      placeholder="e.g. THREAD10"
                      disabled={couponApplied}
                      className="flex-1 border border-stone-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#C9826B] transition placeholder-stone-300 disabled:bg-stone-50 disabled:text-stone-400"
                    />
                    <button
                      onClick={handleApplyCoupon}
                      disabled={couponApplied || !coupon}
                      className="px-4 py-2 rounded-xl text-sm font-bold transition-all disabled:opacity-40"
                      style={{ background: "#1C1917", color: "#FAF7F2" }}
                    >
                      {couponApplied ? "✓" : "Apply"}
                    </button>
                  </div>
                  {couponApplied && (
                    <p className="text-xs text-[#7A9E87] font-semibold mt-1.5 flex items-center gap-1">
                      <Sparkles size={10} /> 10% discount applied!
                    </p>
                  )}
                </div>

                {/* Price breakdown */}
                <div className="px-6 py-4 flex flex-col gap-2.5">
                  <div className="flex justify-between text-sm text-stone-600">
                    <span>Subtotal</span>
                    <span className="font-semibold">₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm" style={{ color: "#7A9E87" }}>
                      <span>Coupon Discount</span>
                      <span className="font-semibold">− ₹{discount.toLocaleString("en-IN")}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm text-stone-600">
                    <span>Delivery</span>
                    <span className="font-semibold" style={{ color: delivery === 0 ? "#7A9E87" : undefined }}>
                      {delivery === 0 ? "FREE" : `₹${delivery}`}
                    </span>
                  </div>

                  <div className="border-t border-stone-100 pt-3 mt-1 flex justify-between items-center">
                    <span className="font-black text-stone-900 text-base">Total</span>
                    <span
                      className="font-black text-xl"
                      style={{ color: "#1C1917", fontFamily: "Georgia, serif" }}
                    >
                      ₹{total.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                {/* Reassurance */}
                <div
                  className="px-6 py-3 flex items-center gap-2 text-xs font-medium"
                  style={{ background: "#FAF7F2", color: "#7A9E87" }}
                >
                  <ShieldCheck size={13} />
                  Payments are 100% encrypted & secure
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Checkout;