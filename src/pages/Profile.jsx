// src/pages/Profile.jsx

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
    FaQuoteLeft,
    FaChevronRight
} from "react-icons/fa";

import {
    useEffect,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import {
    getCurrentUser,
    updateUsername,
    updatePhoneNumber,
    updateGender,
    updateDateOfBirth,
    updateBio,
    updateProfileImage
} from "../api/userApi";



const Profile = () => {

    const navigate = useNavigate();

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editField, setEditField] = useState(null);
    const [editValue, setEditValue] = useState("");
    const [saving, setSaving] = useState(false);
    const [imgUploading, setImgUploading] = useState(false);

    // =====================
    // FETCH USER
    // =====================

    useEffect(() => {

        const fetchUser = async () => {

            try {

                const res = await getCurrentUser();

                setProfile(res.data.data);

            }
            catch (error) {

                console.log(error);

            }
            finally {

                setLoading(false);

            }

        };

        fetchUser();

    }, []);


    // =====================
    // UPDATE DETAILS
    // =====================

    const handleUpdate = async () => {

        try {

            setSaving(true);

            if (editField === "username") {

                await updateUsername({
                    username: editValue
                });

            }

            if (editField === "phoneNumber") {

                await updatePhoneNumber({
                    phoneNumber: editValue
                });

            }

            if (editField === "gender") {

                await updateGender({
                    gender: editValue
                });

            }

            if (editField === "dateOfBirth") {

                await updateDateOfBirth({
                    dateOfBirth: editValue
                });

            }

            if (editField === "bio") {

                await updateBio({
                    bio: editValue
                });

            }

            setProfile({

                ...profile,

                [editField]: editValue

            });

            setEditField(null);

        }
        catch (error) {

            console.log(error);

        }
        finally {

            setSaving(false);

        }

    };


    // =====================
    // IMAGE UPDATE
    // =====================

    const handleImageChange = async (e) => {

    try {

        setImgUploading(true);

        const file = e.target.files[0];

        console.log("Selected file:", file);

        const form = new FormData();

        form.append(
            "profileImage",
            file
        );


        // check FormData values
        for (let pair of form.entries()) {
            console.log(pair[0], pair[1]);
        }


        const res = await updateProfileImage(form);


        setProfile({

            ...profile,

            profileImage: res.data.data.profileImage

        });

    }
    catch(error){

        console.log(error);

    }
    finally{

        setImgUploading(false);

    }

};


    // =====================
    // LOGOUT
    // =====================

    const handleLogout = () => {

        localStorage.removeItem("accessToken");

        navigate("/login");

    };


    if (loading) {

        return (
            <div className="min-h-screen flex items-center justify-center bg-[#faf7f2]">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 rounded-full border-2 border-[#1C1917]/15 border-t-orange-500 animate-spin" />
                    <p className="text-sm tracking-wide text-gray-400">Loading your profile…</p>
                </div>
            </div>
        );

    }


    // =====================
    // INFO ROW
    // =====================

    const InfoRow = ({
        icon,
        label,
        field,
        value,
        editable = true
    }) => (

        <div className="group flex items-center justify-between gap-4 border-b border-gray-100 py-4 sm:py-5 last:border-b-0">

            <div className="flex items-center gap-3 sm:gap-4 min-w-0">

                <div className="shrink-0 bg-orange-50 text-orange-600 p-3 rounded-full transition-colors group-hover:bg-orange-100">
                    {icon}
                </div>

                <div className="min-w-0">
                    <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                        {label}
                    </p>
                    <p className={`truncate ${value ? "text-gray-800" : "text-gray-400 italic"}`}>
                        {value || "Not added"}
                    </p>
                </div>

            </div>

            {editable &&
                <button
                    onClick={() => {
                        setEditField(field);
                        setEditValue(value || "");
                    }}
                    className="shrink-0 flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-orange-600 px-3 py-1.5 rounded-full hover:bg-orange-50 transition-colors cursor-pointer"
                >
                    <FaPen className="text-xs" />
                    <span className="hidden sm:inline">Edit</span>
                </button>
            }

        </div>

    );


    // =====================
    // QUICK ACTION BUTTON
    // =====================

    const QuickAction = ({ icon, label, onClick }) => (
        <button
            onClick={onClick}
            className="w-full flex items-center justify-between gap-3 rounded-xl px-4 py-3.5 text-left text-gray-700 hover:bg-orange-50 hover:text-orange-700 transition-colors cursor-pointer"
        >
            <span className="flex items-center gap-3">
                <span className="text-orange-500">{icon}</span>
                <span className="font-medium text-sm">{label}</span>
            </span>
            <FaChevronRight className="text-xs text-gray-300 group-hover:text-orange-400" />
        </button>
    );


    return (

        <div className="min-h-screen bg-[#faf7f2] p-4 sm:p-6 lg:p-10">

            <div className="max-w-7xl mx-auto">

                {/* HEADER */}

                <div className="relative overflow-hidden bg-[#1C1917] text-white rounded-3xl p-6 sm:p-10 flex flex-col sm:flex-row items-center gap-6 sm:gap-8 text-center sm:text-left">

                    <div className="pointer-events-none absolute -top-20 -right-20 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl" />

                    <div className="relative shrink-0">

                        <img
                            src={profile?.profileImage || "/default-avatar.png"}
                            alt="Profile"
                            className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-white/10 shadow-lg"
                        />

                        <label className="absolute bottom-0 right-0 bg-orange-500 hover:bg-orange-600 transition-colors p-3 rounded-full cursor-pointer shadow-md">

                            {imgUploading
                                ? <span className="block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                : <FaCamera className="text-sm" />
                            }

                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={handleImageChange}
                            />

                        </label>

                    </div>

                    <div className="relative flex-1 min-w-0">

                        <p className="text-orange-400 tracking-[0.2em] text-xs font-semibold">
                            ACCOUNT
                        </p>

                        <h1 className="text-3xl sm:text-4xl font-bold truncate">
                            {profile?.username}
                        </h1>

                        <p className="flex items-center justify-center sm:justify-start gap-2 mt-2 text-white/70 text-sm">
                            <FaEnvelope />
                            <span className="truncate">{profile?.email}</span>
                        </p>

                    </div>

                    <button
                        onClick={handleLogout}
                        className="relative shrink-0 flex items-center gap-2 border border-white/20 hover:bg-white hover:text-[#1C1917] px-5 py-2.5 rounded-full text-sm font-medium transition-colors cursor-pointer"
                    >
                        <FaSignOutAlt />
                        Logout
                    </button>

                </div>


                {/* CARDS */}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 my-6 sm:my-8">

                    <button
                        onClick={() => navigate("/orders")}
                        className="group bg-white p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-md border border-transparent hover:border-orange-100 transition-all cursor-pointer flex flex-col items-start gap-3"
                    >
                        <span className="bg-orange-50 text-orange-600 p-3 rounded-xl group-hover:bg-orange-500 group-hover:text-white transition-colors">
                            <FaShoppingBag />
                        </span>
                        <h2 className="font-semibold text-gray-800">Orders</h2>
                    </button>

                    <button
                        onClick={() => navigate("/wishlist")}
                        className="group bg-white p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-md border border-transparent hover:border-orange-100 transition-all cursor-pointer flex flex-col items-start gap-3"
                    >
                        <span className="bg-orange-50 text-orange-600 p-3 rounded-xl group-hover:bg-orange-500 group-hover:text-white transition-colors">
                            <FaHeart />
                        </span>
                        <h2 className="font-semibold text-gray-800">Wishlist</h2>
                    </button>

                    <button
                        onClick={() => navigate("/cart")}
                        className="group bg-white p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-md border border-transparent hover:border-orange-100 transition-all cursor-pointer flex flex-col items-start gap-3"
                    >
                        <span className="bg-orange-50 text-orange-600 p-3 rounded-xl group-hover:bg-orange-500 group-hover:text-white transition-colors">
                            <FaShoppingCart />
                        </span>
                        <h2 className="font-semibold text-gray-800">Cart</h2>
                    </button>

                </div>


                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">

                    {/* INFORMATION */}

                    <div className="lg:col-span-2 bg-white rounded-2xl p-6 sm:p-8 shadow-sm">

                        <h2 className="text-xl font-bold mb-2 text-gray-900">
                            Personal Information
                        </h2>
                        <p className="text-sm text-gray-400 mb-4">
                            Keep your details up to date.
                        </p>

                        <InfoRow
                            icon={<FaUser />}
                            label="Username"
                            field="username"
                            value={profile?.username}
                        />

                        <InfoRow
                            icon={<FaEnvelope />}
                            label="Email"
                            value={profile?.email}
                            editable={false}
                        />

                        <InfoRow
                            icon={<FaPhone />}
                            label="Phone"
                            field="phoneNumber"
                            value={profile?.phoneNumber}
                        />

                        <InfoRow
                            icon={<FaVenusMars />}
                            label="Gender"
                            field="gender"
                            value={profile?.gender}
                        />

                        <InfoRow
                            icon={<FaBirthdayCake />}
                            label="Date Of Birth"
                            field="dateOfBirth"
                            value={profile?.dateOfBirth}
                        />

                        <InfoRow
                            icon={<FaQuoteLeft />}
                            label="Bio"
                            field="bio"
                            value={profile?.bio}
                        />

                    </div>


                    {/* QUICK ACTIONS */}

                    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm h-fit">

                        <h2 className="font-bold text-xl text-gray-900 mb-4">
                            Quick Actions
                        </h2>

                        <div className="flex flex-col gap-1">

                            <QuickAction
                                icon={<FaShoppingBag />}
                                label="My Orders"
                                onClick={() => navigate("/orders")}
                            />

                            <QuickAction
                                icon={<FaHeart />}
                                label="Wishlist"
                                onClick={() => navigate("/wishlist")}
                            />

                            <QuickAction
                                icon={<FaMapMarkerAlt />}
                                label="Addresses"
                                onClick={() => navigate("/profile/addresses")}
                            />

                            <QuickAction
                                icon={<FaPlus />}
                                label="Add Product"
                                onClick={() => navigate("/addproduct")}
                            />

                        </div>

                    </div>

                </div>


                {/* EDIT MODAL */}

                {editField &&

                    <div
                        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-[fadeIn_0.15s_ease-out]"
                        onClick={() => !saving && setEditField(null)}
                    >

                        <div
                            className="bg-white p-6 sm:p-8 rounded-2xl w-full max-w-sm shadow-xl"
                            onClick={(e) => e.stopPropagation()}
                        >

                            <h2 className="font-bold text-lg text-gray-900 mb-1 capitalize">
                                Update {editField === "dateOfBirth" ? "Date of Birth" : editField === "phoneNumber" ? "Phone Number" : editField}
                            </h2>
                            <p className="text-sm text-gray-400 mb-5">
                                This will be saved to your profile.
                            </p>

                            <input
                                autoFocus
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                className="border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none p-3 rounded-xl w-full transition-all"
                            />

                            <div className="flex gap-3 mt-6">

                                <button
                                    onClick={() => setEditField(null)}
                                    disabled={saving}
                                    className="flex-1 px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer disabled:opacity-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={handleUpdate}
                                    disabled={saving}
                                    className="flex-1 bg-[#1C1917] hover:bg-black text-white px-5 py-2.5 rounded-xl transition-colors cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
                                >
                                    {saving && <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />}
                                    {saving ? "Saving…" : "Save"}
                                </button>

                            </div>

                        </div>

                    </div>

                }

            </div>

        </div>

    );

};

export default Profile;