import { useState } from "react";
import { Plus, Trash2, Upload, X, Loader2, Tag, Package, Truck, Star } from "lucide-react";
import toast from "react-hot-toast";
import API from "../api/axios";

// ─── Config ────────────────────────────────────────────────────────────────────

const CATEGORIES = ["Women", "Men", "Ethnic", "Vintage", "Accessories", "Casual", "Formal"];
const SIZES = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];
const GENDERS = ["MEN", "WOMEN", "UNISEX"];

const DEFAULT_VARIANT = {
  size: "M",
  color: "",
  gender: "UNISEX",
  price: "",
  availabilityCount: "",
};

const INITIAL_FORM = {
  category: "",
  name: "",
  description: "",
  deliveryTime: "",
  brand: "",
  isFeatured: false,
  details: [{ ...DEFAULT_VARIANT }],
};

// ─── Helpers ───────────────────────────────────────────────────────────────────

function validate(formData, images) {
  if (!formData.name.trim()) return "Product name is required.";
  if (!formData.brand.trim()) return "Brand is required.";
  if (!formData.category) return "Please select a category.";
  if (!formData.description.trim()) return "Description is required.";
  if (!formData.deliveryTime.trim()) return "Delivery time is required.";
  if (images.length === 0) return "Please upload at least one product image.";
  for (let i = 0; i < formData.details.length; i++) {
    const v = formData.details[i];
    if (!v.color.trim()) return `Variant ${i + 1}: Color is required.`;
    if (!v.price || isNaN(v.price) || Number(v.price) <= 0)
      return `Variant ${i + 1}: Enter a valid price.`;
    if (!v.availabilityCount || isNaN(v.availabilityCount) || Number(v.availabilityCount) < 0)
      return `Variant ${i + 1}: Enter a valid stock count.`;
  }
  return null;
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function SectionLabel({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-2 mb-3 mt-6">
      <Icon size={16} className="text-indigo-500" />
      <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">{label}</span>
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <div className="mb-1">
      {label && <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>}
      {children}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function AddProduct() {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [dragActive, setDragActive] = useState(false);

  // ── Field handlers ────────────────────────────────────────────────────────

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ── Image handlers ────────────────────────────────────────────────────────

  const processFiles = (files) => {
    const valid = files.filter((f) => f.type.startsWith("image/"));
    if (valid.length !== files.length) toast.error("Only image files are accepted.");
    setImages((prev) => [...prev, ...valid]);
    const previews = valid.map((f) => URL.createObjectURL(f));
    setPreviewImages((prev) => [...prev, ...previews]);
  };

  const handleImageInput = (e) => {
    processFiles(Array.from(e.target.files));
    e.target.value = "";
  };

  const removeImage = (index) => {
    URL.revokeObjectURL(previewImages[index]);
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    processFiles(Array.from(e.dataTransfer.files));
  };

  // ── Variant handlers ──────────────────────────────────────────────────────

  const handleVariantChange = (index, field, value) => {
    const updated = formData.details.map((v, i) => (i === index ? { ...v, [field]: value } : v));
    setFormData({ ...formData, details: updated });
  };

  const addVariant = () => {
    setFormData({ ...formData, details: [...formData.details, { ...DEFAULT_VARIANT }] });
  };

  const removeVariant = (index) => {
    if (formData.details.length === 1) {
      toast.error("At least one variant is required.");
      return;
    }
    setFormData({ ...formData, details: formData.details.filter((_, i) => i !== index) });
  };

  // ── Submit ────────────────────────────────────────────────────────────────

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validate(formData, images);
    if (error) {
      toast.error(error);
      return;
    }

    const data = new FormData();
    data.append("name", formData.name.trim());
    data.append("brand", formData.brand.trim());
    data.append("category", formData.category);
    data.append("description", formData.description.trim());
    data.append("deliveryTime", formData.deliveryTime.trim());
    data.append("isFeatured", formData.isFeatured);
    data.append("details", JSON.stringify(formData.details));
    images.forEach((img) => data.append("images", img));

    try {
      setLoading(true);
      await API.post("/addProduct", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Product added successfully!");
      // Reset
      previewImages.forEach((url) => URL.revokeObjectURL(url));
      setImages([]);
      setPreviewImages([]);
      setFormData(INITIAL_FORM);
    } catch (err) {
      const msg = err?.response?.data?.message || "Failed to add product. Please try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Add New Product</h1>
          <p className="text-sm text-slate-500 mt-1">Fill in the details below to list a new product.</p>
        </div>

        {/* ── Card: Basic Info ─────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-5">
          <SectionLabel icon={Tag} label="Basic Information" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            <Field label="Product Name">
              <input
                type="text"
                name="name"
                placeholder="e.g. Floral Wrap Dress"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </Field>

            <Field label="Brand">
              <input
                type="text"
                name="brand"
                placeholder="e.g. Zara"
                value={formData.brand}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </Field>

            <Field label="Category">
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
              >
                <option value="">Select a category</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </Field>

            <Field label="Delivery Time">
              <input
                type="text"
                name="deliveryTime"
                placeholder="e.g. 3–5 business days"
                value={formData.deliveryTime}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </Field>
          </div>

          <Field label="Description">
            <textarea
              rows={4}
              name="description"
              placeholder="Describe the product — material, fit, occasion..."
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
            />
          </Field>

          {/* Featured toggle */}
          <label className="flex items-center gap-3 mt-2 cursor-pointer select-none w-fit">
            <div className="relative">
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleChange}
                className="sr-only"
              />
              <div
                className={`w-10 h-6 rounded-full transition-colors ${
                  formData.isFeatured ? "bg-indigo-500" : "bg-slate-300"
                }`}
              />
              <div
                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                  formData.isFeatured ? "translate-x-4" : ""
                }`}
              />
            </div>
            <div className="flex items-center gap-1.5 text-sm text-slate-700">
              <Star size={14} className={formData.isFeatured ? "text-yellow-400 fill-yellow-400" : "text-slate-400"} />
              Featured product
            </div>
          </label>
        </div>

        {/* ── Card: Images ─────────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-5">
          <SectionLabel icon={Upload} label="Product Images" />

          {/* Drop zone */}
          <label
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-2xl p-10 cursor-pointer transition-colors ${
              dragActive
                ? "border-indigo-400 bg-indigo-50"
                : "border-slate-300 bg-slate-50 hover:border-indigo-300 hover:bg-indigo-50/40"
            }`}
          >
            <Upload size={28} className="text-slate-400" />
            <p className="text-sm font-medium text-slate-600">
              Drag & drop images here, or <span className="text-indigo-500 underline">browse</span>
            </p>
            <p className="text-xs text-slate-400">PNG, JPG, WEBP — multiple allowed</p>
            <input type="file" multiple hidden accept="image/*" onChange={handleImageInput} />
          </label>

          {/* Preview grid */}
          {previewImages.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 mt-4">
              {previewImages.map((src, i) => (
                <div key={i} className="relative group aspect-square">
                  <img
                    src={src}
                    alt={`preview-${i}`}
                    className="w-full h-full object-cover rounded-xl border border-slate-200"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Card: Variants ───────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-5">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Package size={16} className="text-indigo-500" />
              <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                Variants
              </span>
            </div>
            <button
              type="button"
              onClick={addVariant}
              className="flex items-center gap-1.5 text-xs font-medium text-indigo-600 border border-indigo-200 rounded-lg px-3 py-1.5 hover:bg-indigo-50 transition-colors"
            >
              <Plus size={13} /> Add Variant
            </button>
          </div>

          <div className="space-y-4 mt-3">
            {formData.details.map((variant, index) => (
              <div
                key={index}
                className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 relative"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Variant {index + 1}
                  </span>
                  {formData.details.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeVariant(index)}
                      className="text-red-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 size={15} />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                  {/* Size */}
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Size</label>
                    <select
                      value={variant.size}
                      onChange={(e) => handleVariantChange(index, "size", e.target.value)}
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    >
                      {SIZES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  {/* Color */}
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Color</label>
                    <input
                      type="text"
                      placeholder="e.g. Navy Blue"
                      value={variant.color}
                      onChange={(e) => handleVariantChange(index, "color", e.target.value)}
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                  </div>

                  {/* Gender */}
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Gender</label>
                    <select
                      value={variant.gender}
                      onChange={(e) => handleVariantChange(index, "gender", e.target.value)}
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    >
                      {GENDERS.map((g) => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                  </div>

                  {/* Price */}
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Price (₹)</label>
                    <input
                      type="number"
                      min="0"
                      placeholder="999"
                      value={variant.price}
                      onChange={(e) => handleVariantChange(index, "price", e.target.value)}
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                  </div>

                  {/* Stock */}
                  <div>
                    <label className="block text-xs text-slate-500 mb-1">Stock</label>
                    <input
                      type="number"
                      min="0"
                      placeholder="50"
                      value={variant.availabilityCount}
                      onChange={(e) => handleVariantChange(index, "availabilityCount", e.target.value)}
                      className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Submit ───────────────────────────────────────────────────────── */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => {
              previewImages.forEach((url) => URL.revokeObjectURL(url));
              setImages([]);
              setPreviewImages([]);
              setFormData(INITIAL_FORM);
            }}
            className="px-6 py-2.5 rounded-xl text-sm font-medium border border-slate-300 text-slate-600 hover:bg-slate-100 transition-colors"
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-8 py-2.5 rounded-xl text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors shadow-sm"
          >
            {loading ? (
              <>
                <Loader2 size={15} className="animate-spin" /> Saving…
              </>
            ) : (
              "Save Product"
            )}
          </button>
        </div>

      </form>
    </div>
  );
}