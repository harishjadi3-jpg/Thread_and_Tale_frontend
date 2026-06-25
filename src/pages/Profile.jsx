import {
    FaShoppingBag,
    FaHeart,
    FaShoppingCart,
    FaMapMarkerAlt,
    FaSignOutAlt,
    FaEnvelope,
    FaPhone,
    FaUser,
    FaPen,
    FaCamera,
    FaPlus,
    FaVenusMars,
    FaBirthdayCake,
    FaQuoteLeft
} from "react-icons/fa";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../api/userApi";

const Profile = () => {

    const navigate = useNavigate();

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchProfile = async () => {
            try {

                const response = await getCurrentUser();

                console.log(response);

                setProfile(response.data);

            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();

    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
    };

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center bg-stone-50">
                <div className="flex flex-col items-center gap-3">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-stone-200 border-t-orange-500" />
                    <p className="text-sm font-medium tracking-wide text-stone-400">
                        Loading your profile...
                    </p>
                </div>
            </div>
        );
    }

    // Small presentational helper for personal-info rows.
    const InfoRow = ({ icon, label, value, onEdit, isLast }) => (
        <div
            className={`flex items-center justify-between gap-4 py-4 ${
                isLast ? "" : "border-b border-stone-100"
            }`}
        >
            <div className="flex items-center gap-3 min-w-0">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-stone-100 text-stone-500">
                    {icon}
                </span>
                <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wider text-stone-400">
                        {label}
                    </p>
                    <p className="truncate font-medium text-stone-800">
                        {value}
                    </p>
                </div>
            </div>

            <button
                onClick={onEdit}
                className="flex flex-shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-stone-500 transition hover:bg-stone-100 hover:text-stone-900"
            >
                <FaPen size={11} />
                Edit
            </button>
        </div>
    );

    // Receipt-style stat card.
    const StatCard = ({ icon, value, label, accent, onClick }) => (
        <div
            onClick={onClick}
            className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white ring-1 ring-stone-200 transition hover:-translate-y-0.5 hover:shadow-md"
        >
            <div className="flex items-center justify-between p-5">
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${accent.bg} ${accent.text}`}>
                    {icon}
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-300 transition group-hover:text-stone-500">
                    View &rarr;
                </span>
            </div>

            <div className="relative border-t border-dashed border-stone-200 px-5 py-4">
                <span className="absolute -left-2.5 -top-2.5 h-5 w-5 rounded-full bg-stone-50" />
                <span className="absolute -right-2.5 -top-2.5 h-5 w-5 rounded-full bg-stone-50" />
                <p className="text-2xl font-bold text-stone-900">{value}</p>
                <p className="text-sm text-stone-500">{label}</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-stone-50 px-4 py-8 md:px-8">
            <div className="mx-auto max-w-6xl space-y-6">

                {/* Header */}
                <div className="relative overflow-hidden rounded-3xl bg-stone-900 p-6 text-stone-50 md:p-10">

                    <div className="absolute -top-20 right-0 h-56 w-56 rounded-full bg-orange-500/10" />
                    <div className="absolute -bottom-24 left-10 h-48 w-48 rounded-full bg-emerald-500/5" />

                    <div className="relative flex flex-col items-center gap-6 text-center md:flex-row md:items-end md:text-left">

                        <div className="relative flex-shrink-0">
                            <img
                                src={profile?.profileImage}
                                alt="profile"
                                className="h-28 w-28 rounded-full border-4 border-stone-800 object-cover ring-2 ring-stone-50/10 md:h-32 md:w-32"
                            />

                            <button
                                onClick={() => navigate("/updateprofileimage")}
                                className="absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full bg-orange-500 text-stone-50 shadow-lg transition hover:bg-orange-600"
                            >
                                <FaCamera size={14} />
                            </button>
                        </div>

                        <div className="flex-1">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-400">
                                Account
                            </p>
                            <h1 className="mt-1 font-serif text-3xl font-semibold md:text-4xl">
                                {profile?.username}
                            </h1>
                            <p className="mt-2 flex items-center justify-center gap-2 text-sm text-stone-300 md:justify-start">
                                <FaEnvelope size={12} />
                                {profile?.email}
                            </p>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 rounded-full border border-stone-700 px-5 py-2.5 text-sm font-semibold text-stone-200 transition hover:border-orange-500 hover:text-orange-400"
                        >
                            <FaSignOutAlt />
                            Log out
                        </button>

                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

                    <StatCard
                        icon={<FaShoppingBag size={18} />}
                        value={profile?.statistics?.totalOrders || 0}
                        label="Orders"
                        accent={{ bg: "bg-orange-50", text: "text-orange-600" }}
                        onClick={() => navigate("/orders")}
                    />

                    <StatCard
                        icon={<FaHeart size={18} />}
                        value={profile?.statistics?.totalWishlistItems || 0}
                        label="Wishlist"
                        accent={{ bg: "bg-rose-50", text: "text-rose-600" }}
                        onClick={() => navigate("/wishlist")}
                    />

                    <StatCard
                        icon={<FaShoppingCart size={18} />}
                        value={profile?.statistics?.cartItems || 0}
                        label="Cart"
                        accent={{ bg: "bg-emerald-50", text: "text-emerald-600" }}
                        onClick={() => navigate("/cart")}
                    />

                </div>

                {/* Main content */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

                    <div className="space-y-6 lg:col-span-2">

                        {/* Personal Information */}
                        <div className="rounded-2xl bg-white p-6 ring-1 ring-stone-200">

                            <h2 className="mb-2 font-serif text-xl font-semibold text-stone-900">
                                Personal Information
                            </h2>

                            <div className="divide-y divide-stone-100">

                                <InfoRow
                                    icon={<FaUser size={14} />}
                                    label="Username"
                                    value={profile?.username}
                                    onEdit={() => navigate("/updateusername")}
                                />

                                <InfoRow
                                    icon={<FaEnvelope size={14} />}
                                    label="Email"
                                    value={profile?.email}
                                    onEdit={() => navigate("/updateemail")}
                                />

                                <InfoRow
                                    icon={<FaPhone size={14} />}
                                    label="Phone Number"
                                    value={profile?.phoneNumber || "Not added"}
                                    onEdit={() => navigate("/updatephonenumber")}
                                />

                                <InfoRow
                                    icon={<FaVenusMars size={14} />}
                                    label="Gender"
                                    value={profile?.gender || "Not added"}
                                    onEdit={() => navigate("/updategender")}
                                />

                                <InfoRow
                                    icon={<FaBirthdayCake size={14} />}
                                    label="Date of Birth"
                                    value={profile?.dateOfBirth?.split("T")[0] || "Not added"}
                                    onEdit={() => navigate("/updatedateofbirth")}
                                />

                                <InfoRow
                                    icon={<FaQuoteLeft size={14} />}
                                    label="Bio"
                                    value={profile?.bio || "No bio added"}
                                    onEdit={() => navigate("/updatebio")}
                                    isLast
                                />

                            </div>

                        </div>

                        {/* Address */}
                        <div className="rounded-2xl bg-white p-6 ring-1 ring-stone-200">

                            <div className="mb-4 flex items-center justify-between">
                                <h2 className="flex items-center gap-2 font-serif text-xl font-semibold text-stone-900">
                                    <FaMapMarkerAlt className="text-orange-500" />
                                    Address
                                </h2>

                                {profile?.primaryAddress && (
                                    <button
                                        onClick={() => navigate("/addresses")}
                                        className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-stone-500 transition hover:bg-stone-100 hover:text-stone-900"
                                    >
                                        <FaPen size={11} />
                                        Manage
                                    </button>
                                )}
                            </div>

                            {profile?.primaryAddress ? (
                                <div className="rounded-xl bg-stone-50 p-4 leading-relaxed text-stone-700">
                                    <p className="font-medium text-stone-900">
                                        {profile.primaryAddress.addressLine}
                                    </p>
                                    <p>{profile.primaryAddress.village}</p>
                                    <p>{profile.primaryAddress.mandal}</p>
                                    <p>
                                        {profile.primaryAddress.dist}, {profile.primaryAddress.state}
                                    </p>
                                    <p>{profile.primaryAddress.pinCode}</p>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-stone-200 py-8 text-center">
                                    <p className="text-stone-400">
                                        You haven't added an address yet
                                    </p>
                                    <button
                                        onClick={() => navigate("/addaddress")}
                                        className="flex items-center gap-2 rounded-full bg-stone-900 px-5 py-2.5 text-sm font-semibold text-stone-50 transition hover:bg-orange-600"
                                    >
                                        <FaPlus size={12} />
                                        Add Address
                                    </button>
                                </div>
                            )}

                        </div>

                    </div>

                    {/* Quick Actions */}
                    <div className="rounded-2xl bg-white p-6 ring-1 ring-stone-200">

                        <h2 className="mb-4 font-serif text-xl font-semibold text-stone-900">
                            Quick Actions
                        </h2>

                        <div className="space-y-2">

                            <button
                                onClick={() => navigate("/orders")}
                                className="flex w-full items-center gap-3 rounded-xl p-4 text-left font-medium text-stone-700 transition hover:bg-orange-50 hover:text-orange-700"
                            >
                                <FaShoppingBag />
                                My Orders
                            </button>

                            <button
                                onClick={() => navigate("/wishlist")}
                                className="flex w-full items-center gap-3 rounded-xl p-4 text-left font-medium text-stone-700 transition hover:bg-rose-50 hover:text-rose-700"
                            >
                                <FaHeart />
                                Wishlist
                            </button>

                            <button
                                onClick={() => navigate("/cart")}
                                className="flex w-full items-center gap-3 rounded-xl p-4 text-left font-medium text-stone-700 transition hover:bg-emerald-50 hover:text-emerald-700"
                            >
                                <FaShoppingCart />
                                Cart
                            </button>

                            <button
                                onClick={() => navigate("/addresses")}
                                className="flex w-full items-center gap-3 rounded-xl p-4 text-left font-medium text-stone-700 transition hover:bg-stone-100 hover:text-stone-900"
                            >
                                <FaMapMarkerAlt />
                                Addresses
                            </button>
                            <button
    onClick={() => navigate("/addproduct")}
    className="flex w-full items-center gap-3 rounded-xl p-4 text-left font-medium text-stone-700 transition hover:bg-blue-50 hover:text-blue-700"
>
    <FaPlus />
    Add Product
</button>

                            <button
                                onClick={handleLogout}
                                className="flex w-full items-center gap-3 rounded-xl border border-stone-200 p-4 text-left font-medium text-stone-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                            >
                                <FaSignOutAlt />
                                Logout
                            </button>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
};

export default Profile;