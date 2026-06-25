import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Package,
  RotateCcw,
  XCircle,
  ArrowRightLeft,
  Truck,
  Star,
  ChevronRight,
  ShoppingBag,
  Clock,
  CheckCircle2,
  AlertCircle,
  X,
} from "lucide-react";
import toast from "react-hot-toast";

import {
  getOrders,
  cancelOrder,
  returnOrder,
  replaceOrder,
} from "../api/orderApi";


/* ─── Review Modal ────────────────────────────────────────────── */
const ReviewModal = ({ order, onClose, onSubmitted }) => {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    try {
      setSubmitting(true);
      await API.post("/reviewtoproduct", {
        productId: order?.productId?._id,
        rating,
        comment,
      });
      toast.success("Review submitted!");
      onSubmitted?.();
      onClose();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
        >
          <X size={22} />
        </button>

        <div className="flex items-center gap-4 mb-6">
          <img
            src={order?.productId?.images?.[0] || "https://via.placeholder.com/60"}
            alt={order?.productId?.name}
            className="w-16 h-16 rounded-2xl object-cover"
          />
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-500 mb-0.5">
              Write a Review
            </p>
            <h3 className="font-bold text-gray-900 text-base leading-snug">
              {order?.productId?.name}
            </h3>
          </div>
        </div>

        {/* Star Rating */}
        <div className="flex gap-2 mb-5">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
              className="transition-transform hover:scale-110"
            >
              <Star
                size={30}
                className={
                  star <= (hovered || rating)
                    ? "fill-amber-400 text-amber-400"
                    : "text-gray-200 fill-gray-200"
                }
              />
            </button>
          ))}
          {rating > 0 && (
            <span className="ml-2 self-center text-sm text-gray-500 font-medium">
              {["", "Poor", "Fair", "Good", "Great", "Excellent"][rating]}
            </span>
          )}
        </div>

        <textarea
          rows={4}
          placeholder="What did you think about this product? (optional)"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-300 placeholder-gray-300"
        />

        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 active:scale-95 transition-all text-white font-semibold py-3 rounded-2xl disabled:opacity-60"
        >
          {submitting ? "Submitting…" : "Submit Review"}
        </button>
      </div>
    </div>
  );
};

/* ─── Status helpers ──────────────────────────────────────────── */
const STATUS_CONFIG = {
  delivered: {
    color: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
    icon: <CheckCircle2 size={13} className="inline mr-1" />,
  },
  cancelled: {
    color: "bg-red-50 text-red-600 ring-1 ring-red-200",
    icon: <XCircle size={13} className="inline mr-1" />,
  },
  shipped: {
    color: "bg-blue-50 text-blue-600 ring-1 ring-blue-200",
    icon: <Truck size={13} className="inline mr-1" />,
  },
  processing: {
    color: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
    icon: <Clock size={13} className="inline mr-1" />,
  },
  returned: {
    color: "bg-orange-50 text-orange-600 ring-1 ring-orange-200",
    icon: <RotateCcw size={13} className="inline mr-1" />,
  },
};

const getStatusConfig = (status) =>
  STATUS_CONFIG[status?.toLowerCase()] || {
    color: "bg-gray-100 text-gray-600",
    icon: <AlertCircle size={13} className="inline mr-1" />,
  };

/* ─── Action Button ───────────────────────────────────────────── */
const ActionBtn = ({ onClick, icon, label, variant = "default" }) => {
  const variants = {
    default: "bg-gray-900 hover:bg-gray-700 text-white",
    danger: "bg-red-500 hover:bg-red-600 text-white",
    orange: "bg-orange-500 hover:bg-orange-600 text-white",
    green: "bg-emerald-600 hover:bg-emerald-700 text-white",
    indigo: "bg-indigo-600 hover:bg-indigo-700 text-white",
    blue: "bg-blue-600 hover:bg-blue-700 text-white",
  };
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-95 ${variants[variant]}`}
    >
      {icon}
      {label}
    </button>
  );
};

/* ─── Orders Page ─────────────────────────────────────────────── */
const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewOrder, setReviewOrder] = useState(null);

  const fetchOrders = async () => {
    try {
      const response = await getOrders();
      setOrders(response?.data?.data || []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  const handleCancel = async (orderId) => {
    try {
      await cancelOrder(orderId);
      toast.success("Order cancelled");
      fetchOrders();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unable to cancel order");
    }
  };

  const handleReturn = async (orderId) => {
    try {
      await returnOrder(orderId);
      toast.success("Return request submitted");
      fetchOrders();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unable to request return");
    }
  };

  const handleReplace = async (orderId) => {
    try {
      await replaceOrder(orderId);
      toast.success("Replacement request submitted");
      fetchOrders();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Unable to request replacement");
    }
  };

  /* ── Loading ── */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 font-medium">Loading your orders…</p>
        </div>
      </div>
    );
  }

  /* ── Empty ── */
  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-md p-14 text-center max-w-md w-full">
          <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={36} className="text-indigo-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No orders yet</h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            You haven't placed any orders. Start shopping to see them here.
          </p>
          <button
            onClick={() => navigate("/products")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-2xl font-semibold transition-all active:scale-95"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  /* ── Main ── */
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      {/* Review Modal */}
      {reviewOrder && (
        <ReviewModal
          order={reviewOrder}
          onClose={() => setReviewOrder(null)}
          onSubmitted={fetchOrders}
        />
      )}

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-500 mb-1">
            Account
          </p>
          <h1 className="text-3xl font-extrabold text-gray-900">My Orders</h1>
          <p className="text-gray-500 mt-1 text-sm">
            {orders.length} order{orders.length !== 1 ? "s" : ""} placed
          </p>
        </div>

        {/* Order Cards */}
        <div className="space-y-5">
          {orders.map((order) => {
            const product = order?.productId;
            const statusCfg = getStatusConfig(order?.orderStatus);
            const isDelivered = order?.orderStatus?.toLowerCase() === "delivered";
            const isCancelled = order?.orderStatus?.toLowerCase() === "cancelled";

            return (
              <div
                key={order._id}
                className="bg-white rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
              >
                {/* Top stripe: order meta */}
                <div className="flex items-center justify-between px-6 py-3 bg-gray-50 border-b border-gray-100">
                  <div className="flex items-center gap-3 text-xs text-gray-500 font-medium">
                    <span>
                      Ordered{" "}
                      <span className="text-gray-700 font-semibold">
                        {new Date(order?.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="uppercase tracking-wider">{order?.paymentType}</span>
                  </div>
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${statusCfg.color}`}
                  >
                    {statusCfg.icon}
                    {order?.orderStatus}
                  </span>
                </div>

                {/* Body */}
                <div className="flex flex-col sm:flex-row gap-5 p-6">
                  {/* Product image */}
                  <button
                    onClick={() => navigate(`/product/${product?._id}`)}
                    className="flex-shrink-0 group"
                  >
                    <img
                      src={product?.images?.[0] || "https://via.placeholder.com/160"}
                      alt={product?.name}
                      className="w-28 h-28 sm:w-32 sm:h-32 object-cover rounded-2xl group-hover:opacity-90 transition"
                    />
                  </button>

                  {/* Product info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-0.5">
                      {product?.brand} · {product?.category}
                    </p>
                    <h2
                      className="text-lg font-bold text-gray-900 leading-snug mb-3 cursor-pointer hover:text-indigo-600 transition-colors"
                      onClick={() => navigate(`/product/${product?._id}`)}
                    >
                      {product?.name}
                    </h2>

                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-2xl font-extrabold text-gray-900">
                        ₹{order?.totalAmount?.toLocaleString("en-IN")}
                      </span>
                      {order?.orderCount > 1 && (
                        <span className="text-sm text-gray-400">
                          × {order.orderCount}
                        </span>
                      )}
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-wrap gap-2">
                      {/* Track */}
                      <ActionBtn
                        onClick={() => navigate(`/track-order/${order._id}`)}
                        icon={<Truck size={15} />}
                        label="Track"
                        variant="blue"
                      />

                      {/* Cancel — hide if already cancelled or delivered */}
                      {!isCancelled && !isDelivered && (
                        <ActionBtn
                          onClick={() => handleCancel(order._id)}
                          icon={<XCircle size={15} />}
                          label="Cancel"
                          variant="danger"
                        />
                      )}

                      {/* Delivered actions */}
                      {isDelivered && (
                        <>
                          <ActionBtn
                            onClick={() => handleReturn(order._id)}
                            icon={<RotateCcw size={15} />}
                            label="Return"
                            variant="orange"
                          />
                          <ActionBtn
                            onClick={() => handleReplace(order._id)}
                            icon={<ArrowRightLeft size={15} />}
                            label="Replace"
                            variant="green"
                          />
                          <ActionBtn
                            onClick={() => setReviewOrder(order)}
                            icon={<Star size={15} />}
                            label="Review"
                            variant="indigo"
                          />
                        </>
                      )}

                      {/* View details */}
                      <button
                        onClick={() => navigate(`/product/${product?._id}`)}
                        className="flex items-center gap-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
                      >
                        Details <ChevronRight size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Orders;