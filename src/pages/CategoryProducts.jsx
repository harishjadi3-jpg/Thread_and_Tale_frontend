import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductsByCategory } from "../api/productApi";
import { ArrowLeft, ShoppingBag, Tag, SlidersHorizontal } from "lucide-react";

/* ─── Skeleton card shown while loading ─── */
const SkeletonCard = () => (
  <div className="bg-white rounded-3xl overflow-hidden shadow-sm animate-pulse">
    <div className="h-60 bg-stone-200" />
    <div className="p-4 space-y-2.5">
      <div className="h-4 bg-stone-200 rounded-full w-3/4" />
      <div className="h-3 bg-stone-100 rounded-full w-1/2" />
      <div className="h-4 bg-amber-100 rounded-full w-1/4 mt-3" />
    </div>
  </div>
);

const CategoryProducts = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProductsByCategory(category);
        setProducts(response.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category]);

  const displayName =
    category?.charAt(0).toUpperCase() + category?.slice(1).toLowerCase();

  return (
    <>
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .product-card { animation: fadeSlideUp 0.4s ease both; }
        .product-card:hover .card-img { transform: scale(1.07); }
        .card-img { transition: transform 0.5s cubic-bezier(.4,0,.2,1); }
      `}</style>

      <div className="min-h-screen bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

          {/* ── BACK NAV ── */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-stone-500 hover:text-amber-700 transition-colors mb-6 group text-sm font-medium"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-0.5 transition-transform"
            />
            Back
          </button>

          {/* ── HERO HEADER ── */}
          <div className="relative overflow-hidden rounded-3xl mb-8 shadow-md">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-800 via-amber-700 to-orange-500" />
            {/* decorative blobs */}
            <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full bg-white/5" />
            <div className="absolute -bottom-14 -left-8 w-64 h-64 rounded-full bg-white/5" />

            <div className="relative px-8 py-9 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Tag size={14} className="text-amber-300" />
                  <span className="text-amber-300 text-xs font-semibold tracking-widest uppercase">
                    Category
                  </span>
                </div>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight tracking-tight">
                  {displayName}
                </h1>
              </div>

              {!loading && (
                <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-2.5 self-start sm:self-auto">
                  <ShoppingBag size={15} className="text-white/80" />
                  <span className="text-white font-semibold text-sm">
                    {products.length}{" "}
                    <span className="font-normal text-white/70">
                      {products.length === 1 ? "product" : "products"}
                    </span>
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* ── TOOLBAR (sort/filter placeholder) ── */}
          {!loading && products.length > 0 && (
            <div className="flex items-center justify-between mb-6">
              <p className="text-stone-400 text-sm">
                Showing{" "}
                <span className="text-stone-700 font-medium">{products.length}</span>{" "}
                results
              </p>
              <button className="flex items-center gap-2 border border-stone-200 bg-white text-stone-600 text-sm font-medium px-4 py-2 rounded-xl hover:bg-stone-50 transition-colors shadow-sm">
                <SlidersHorizontal size={14} />
                Filter &amp; Sort
              </button>
            </div>
          )}

          {/* ── LOADING SKELETON ── */}
          {loading && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {Array.from({ length: 8 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          )}

          {/* ── EMPTY STATE ── */}
          {!loading && products.length === 0 && (
            <div className="bg-white rounded-3xl p-14 text-center shadow-sm border border-stone-100">
              <div className="w-20 h-20 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-5">
                <ShoppingBag size={34} className="text-amber-400" />
              </div>
              <h2 className="text-2xl font-bold text-stone-800 mb-2">
                No products found
              </h2>
              <p className="text-stone-400 text-sm max-w-xs mx-auto">
                There are no products in <strong>{displayName}</strong> right
                now. Check back soon.
              </p>
              <button
                onClick={() => navigate(-1)}
                className="mt-7 inline-flex items-center gap-2 bg-amber-700 text-white px-6 py-3 rounded-2xl text-sm font-semibold hover:bg-amber-800 transition-colors"
              >
                <ArrowLeft size={15} />
                Go Back
              </button>
            </div>
          )}

          {/* ── PRODUCT GRID ── */}
          {!loading && products.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {products.map((product, index) => (
                <div
                  key={product._id}
                  onClick={() => navigate(`/product/${product._id}`)}
                  className="product-card group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 cursor-pointer border border-stone-100"
                  style={{ animationDelay: `${Math.min(index * 50, 400)}ms` }}
                >
                  {/* ── IMAGE ── */}
                  <div className="relative h-56 overflow-hidden bg-stone-100">
                    <img
                      src={product.images?.[0]}
                      alt={product.name}
                      className="card-img w-full h-full object-cover"
                    />
                    {/* subtle bottom scrim */}
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 to-transparent" />

                    {/* price chip floating over image */}
                    <div className="absolute bottom-3 left-3">
                      <span className="bg-white text-amber-700 font-bold text-sm px-3 py-1 rounded-xl shadow-md">
                        ₹{product.details[0].price}
                      </span>
                    </div>
                  </div>

                  {/* ── INFO ── */}
                  <div className="p-4">
                    <h2 className="font-bold text-stone-900 text-sm leading-snug line-clamp-2 group-hover:text-amber-800 transition-colors">
                      {product.name}
                    </h2>
                    {product.brand && (
                      <p className="text-stone-400 text-xs mt-1 font-medium uppercase tracking-wide">
                        {product.brand}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CategoryProducts;