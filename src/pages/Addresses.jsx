import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAddress, setDefaultAddress, deleteAddress } from "../api/addressApi";
import toast from "react-hot-toast";
import { MapPin, Plus, Trash2, Home, Navigation, X, ChevronRight, CheckCircle2, Phone, Hash } from "lucide-react";

import { fetchAddresses } from "../redux/slices/addressSlice";

const Addresses = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [showManualForm, setShowManualForm] = useState(false);
  const [formData, setFormData] = useState({
    addressLine: "",
    village: "",
    mandal: "",
    dist: "",
    state: "",
    pinCode: "",
    phoneNumber: "",
  });

  const { addresses = [], loading } = useSelector((state) => state.address);

  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  const handleUseLocation = async () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
          );
          const data = await response.json();
          setFormData({
            addressLine: data.display_name || "",
            village: data.address.village || data.address.town || data.address.city || "",
            mandal: data.address.county || "",
            dist: data.address.state_district || "",
            state: data.address.state || "",
            pinCode: data.address.postcode || "",
            phoneNumber: "",
          });
          setShowManualForm(true);
        } catch (error) {
          console.log(error);
          toast.error("Failed to fetch location");
        }
      },
      () => {
        toast.error("Location permission denied");
      }
    );
  };

  const handleManualSave = async () => {
    try {
      await addAddress(formData);
      toast.success("Address Added Successfully");
      dispatch(fetchAddresses());
      setShowModal(false);
      setShowManualForm(false);
      setFormData({ addressLine: "", village: "", mandal: "", dist: "", state: "", pinCode: "", phoneNumber: "" });
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to save address");
    }
  };

  const handleSetDefault = async (address) => {
    try {
      if (address.isDefault) {
        toast.success("Already Default Address");
        return;
      }
      await setDefaultAddress(address._id);
      toast.success("Default Address Updated");
      dispatch(fetchAddresses());
    } catch (error) {
      console.log(error);
      toast.error("Failed To Set Default");
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      await deleteAddress(addressId);
      toast.success("Address Deleted Successfully");
      dispatch(fetchAddresses());
    } catch (error) {
      console.log(error);
      toast.error("Failed To Delete Address");
    }
  };

  const inputClass =
    "w-full border border-stone-200 bg-stone-50 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-100 px-4 py-3 rounded-xl text-stone-800 placeholder-stone-400 transition-all duration-200 outline-none text-sm";

  return (
    <>
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .card-enter { animation: slideUp 0.35s ease both; }
        .modal-fade  { animation: fadeIn 0.2s ease both; }
        .modal-slide { animation: slideUp 0.3s cubic-bezier(.4,0,.2,1) both; }
        .pin-watermark {
          position: absolute;
          right: -12px;
          bottom: -14px;
          opacity: 0.045;
          pointer-events: none;
        }
      `}</style>

      <div className="min-h-screen bg-stone-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">

          {/* ── HEADER ── */}
          <div className="relative overflow-hidden rounded-3xl mb-10 shadow-lg">
            {/* gradient bg */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-800 via-amber-700 to-orange-500" />
            {/* decorative circles */}
            <div className="absolute -top-10 -right-10 w-52 h-52 rounded-full bg-white/5" />
            <div className="absolute -bottom-16 -left-10 w-64 h-64 rounded-full bg-white/5" />
            <div className="relative p-8 sm:p-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div>
                <p className="text-amber-200 text-sm font-semibold tracking-widest uppercase mb-1">
                  Delivery
                </p>
                <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
                  My Addresses
                </h1>
                <p className="text-white/60 mt-2 text-sm">
                  {addresses.length > 0
                    ? `${addresses.length} saved location${addresses.length > 1 ? "s" : ""}`
                    : "No locations saved yet"}
                </p>
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2.5 bg-white text-amber-800 font-semibold px-6 py-3.5 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 active:scale-100 transition-all duration-200 self-start sm:self-auto whitespace-nowrap"
              >
                <Plus size={18} strokeWidth={2.5} />
                Add Address
              </button>
            </div>
          </div>

          {/* ── LOADING ── */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <div className="w-12 h-12 rounded-full border-4 border-stone-200 border-t-amber-600 animate-spin" />
              <p className="text-stone-400 text-sm">Loading your addresses…</p>
            </div>
          )}

          {/* ── EMPTY STATE ── */}
          {!loading && addresses.length === 0 && (
            <div className="bg-white rounded-3xl p-14 text-center shadow-sm border border-stone-100 card-enter">
              <div className="w-24 h-24 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-5">
                <MapPin size={40} className="text-amber-400" />
              </div>
              <h2 className="text-2xl font-bold text-stone-800 mb-2">No saved addresses</h2>
              <p className="text-stone-400 mb-8 max-w-xs mx-auto text-sm leading-relaxed">
                Add a delivery address to speed up checkout every time you order.
              </p>
              <button
                onClick={() => setShowModal(true)}
                className="inline-flex items-center gap-2 bg-amber-700 hover:bg-amber-800 text-white font-semibold px-7 py-3.5 rounded-2xl transition-all duration-200 hover:shadow-lg"
              >
                <Plus size={18} />
                Add Your First Address
              </button>
            </div>
          )}

          {/* ── ADDRESS GRID ── */}
          {!loading && addresses.length > 0 && (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {addresses.map((address, index) => (
                <div
                  key={address._id}
                  className="relative overflow-hidden bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100 flex flex-col card-enter"
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  {/* default badge ribbon */}
                  {address.isDefault && (
                    <div className="absolute top-0 right-0">
                      <div className="bg-emerald-500 text-white text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-bl-xl rounded-tr-3xl">
                        Default
                      </div>
                    </div>
                  )}

                  {/* watermark pin */}
                  <MapPin size={100} strokeWidth={0.6} className="pin-watermark text-amber-400" />

                  <div className="p-6 flex-1">
                    {/* card header */}
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-11 h-11 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0">
                        <Home size={18} className="text-amber-700" />
                      </div>
                      <div>
                        <p className="text-xs text-stone-400 font-medium uppercase tracking-wider">
                          Location {index + 1}
                        </p>
                        <h3 className="font-bold text-stone-800 text-base leading-tight">
                          {address.village || address.dist || "Saved Address"}
                        </h3>
                      </div>
                    </div>

                    {/* divider */}
                    <div className="h-px bg-stone-100 mb-4" />

                    {/* details */}
                    <div className="space-y-2.5 text-sm">
                      {address.addressLine && (
                        <p className="text-stone-700 leading-snug line-clamp-2">{address.addressLine}</p>
                      )}
                      <div className="flex flex-wrap gap-x-1.5 gap-y-1 text-stone-500">
                        {[address.village, address.mandal, address.dist, address.state]
                          .filter(Boolean)
                          .map((part, i, arr) => (
                            <span key={i}>
                              {part}
                              {i < arr.length - 1 && <span className="text-stone-300">,</span>}
                            </span>
                          ))}
                      </div>
                      <div className="flex items-center gap-4 pt-1">
                        {address.pinCode && (
                          <span className="flex items-center gap-1.5 text-stone-500">
                            <Hash size={12} className="text-amber-500" />
                            {address.pinCode}
                          </span>
                        )}
                        {address.phoneNumber && (
                          <span className="flex items-center gap-1.5 text-stone-500">
                            <Phone size={12} className="text-amber-500" />
                            {address.phoneNumber}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* action row */}
                  <div className="flex border-t border-stone-100">
                    <button
                      onClick={() => handleSetDefault(address)}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-3.5 text-sm font-medium transition-colors duration-150
                        ${address.isDefault
                          ? "text-emerald-600 bg-emerald-50"
                          : "text-stone-500 hover:text-amber-700 hover:bg-amber-50"
                        }`}
                    >
                      <CheckCircle2 size={15} />
                      {address.isDefault ? "Default" : "Set Default"}
                    </button>
                    <div className="w-px bg-stone-100" />
                    <button
                      onClick={() => handleDeleteAddress(address._id)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-3.5 text-sm font-medium text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors duration-150"
                    >
                      <Trash2 size={15} />
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              {/* add another card */}
              <button
                onClick={() => setShowModal(true)}
                className="group relative overflow-hidden bg-white rounded-3xl border-2 border-dashed border-stone-200 hover:border-amber-400 hover:bg-amber-50/30 transition-all duration-300 flex flex-col items-center justify-center p-10 min-h-[220px] card-enter"
                style={{ animationDelay: `${addresses.length * 60}ms` }}
              >
                <div className="w-12 h-12 rounded-2xl bg-stone-100 group-hover:bg-amber-100 flex items-center justify-center mb-3 transition-colors duration-200">
                  <Plus size={20} className="text-stone-400 group-hover:text-amber-700 transition-colors duration-200" />
                </div>
                <p className="text-sm font-semibold text-stone-400 group-hover:text-amber-700 transition-colors duration-200">
                  Add New Address
                </p>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── MODAL ── */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4 modal-fade"
          onClick={(e) => { if (e.target === e.currentTarget) { setShowModal(false); setShowManualForm(false); } }}
        >
          <div className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl modal-slide overflow-hidden">

            {/* modal header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-5 border-b border-stone-100">
              <div>
                {showManualForm && (
                  <p className="text-xs text-amber-600 font-semibold uppercase tracking-wider mb-0.5">
                    {showManualForm ? "Step 2 of 2" : "Step 1 of 2"}
                  </p>
                )}
                <h2 className="text-xl font-bold text-stone-900">
                  {showManualForm ? "Enter Address Details" : "Add New Address"}
                </h2>
              </div>
              <button
                onClick={() => { setShowModal(false); setShowManualForm(false); }}
                className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center transition-colors"
              >
                <X size={17} className="text-stone-600" />
              </button>
            </div>

            {!showManualForm ? (
              /* ── STEP 1: choose method ── */
              <div className="p-6 space-y-3">
                <button
                  onClick={handleUseLocation}
                  className="w-full flex items-center gap-4 bg-gradient-to-r from-amber-700 to-orange-500 text-white px-5 py-4 rounded-2xl hover:opacity-95 active:opacity-90 transition-all shadow-md hover:shadow-lg group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                    <Navigation size={18} />
                  </div>
                  <div className="text-left flex-1">
                    <p className="font-semibold text-sm">Use Current Location</p>
                    <p className="text-white/70 text-xs mt-0.5">Auto-fill from GPS</p>
                  </div>
                  <ChevronRight size={16} className="opacity-60 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <button
                  onClick={() => setShowManualForm(true)}
                  className="w-full flex items-center gap-4 border border-stone-200 bg-stone-50 hover:bg-stone-100 px-5 py-4 rounded-2xl transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-stone-200 flex items-center justify-center shrink-0">
                    <MapPin size={18} className="text-stone-600" />
                  </div>
                  <div className="text-left flex-1">
                    <p className="font-semibold text-sm text-stone-800">Enter Manually</p>
                    <p className="text-stone-400 text-xs mt-0.5">Type your full address</p>
                  </div>
                  <ChevronRight size={16} className="text-stone-400 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            ) : (
              /* ── STEP 2: form ── */
              <div className="p-6 overflow-y-auto max-h-[70vh]">
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-500 mb-1.5 uppercase tracking-wide">Address Line</label>
                    <textarea
                      value={formData.addressLine}
                      placeholder="House no., building, street…"
                      rows={2}
                      className={inputClass + " resize-none"}
                      onChange={(e) => setFormData({ ...formData, addressLine: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-500 mb-1.5 uppercase tracking-wide">Village / Town</label>
                      <input value={formData.village} placeholder="Village" className={inputClass}
                        onChange={(e) => setFormData({ ...formData, village: e.target.value })} />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-500 mb-1.5 uppercase tracking-wide">Mandal</label>
                      <input value={formData.mandal} placeholder="Mandal" className={inputClass}
                        onChange={(e) => setFormData({ ...formData, mandal: e.target.value })} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-500 mb-1.5 uppercase tracking-wide">District</label>
                      <input value={formData.dist} placeholder="District" className={inputClass}
                        onChange={(e) => setFormData({ ...formData, dist: e.target.value })} />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-500 mb-1.5 uppercase tracking-wide">State</label>
                      <input value={formData.state} placeholder="State" className={inputClass}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-500 mb-1.5 uppercase tracking-wide">PIN Code</label>
                      <input value={formData.pinCode} placeholder="500001" className={inputClass}
                        onChange={(e) => setFormData({ ...formData, pinCode: e.target.value })} />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-500 mb-1.5 uppercase tracking-wide">Phone</label>
                      <input value={formData.phoneNumber} placeholder="9876543210" className={inputClass}
                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })} />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setShowManualForm(false)}
                    className="flex-1 border border-stone-200 text-stone-600 font-semibold py-3.5 rounded-2xl hover:bg-stone-50 transition-colors text-sm"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleManualSave}
                    className="flex-1 bg-gradient-to-r from-amber-700 to-orange-500 text-white font-semibold py-3.5 rounded-2xl hover:opacity-95 active:opacity-90 transition-all shadow-md hover:shadow-lg text-sm"
                  >
                    Save Address
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Addresses;