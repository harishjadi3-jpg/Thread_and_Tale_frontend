import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SlidersHorizontal, X, ChevronDown, Sparkles } from "lucide-react";

import MainLayout from "../layouts/MainLayout";
import ProductGrid from "../components/product/ProductGrid";
import CategoryFilter from "../components/product/CategoryFilter";
import SearchBar from "../components/navbar/SearchBar";

import {
  fetchProducts,
  searchAllProducts,
  setProducts,
} from "../redux/slices/productSlice";
import { getProductsByCategory } from "../api/productApi";
import { useSearchParams } from "react-router-dom";

const SORT_OPTIONS = [
    { label: "Newest first", value: "newest" },
    { label: "Price: Low to High", value: "price_asc" },
    { label: "Price: High to Low", value: "price_desc" },
    { label: "Most Popular", value: "popular" },
];

const QUICK_FILTERS = [
    "All",
    "Women",
    "Men",
    "Ethnic",
    "Vintage",
    "Casual",
    "Formal",
    "Accessories",
];

const Products = () => {
    const dispatch = useDispatch();

    const { products } = useSelector((state) => state.product);
    const [searchParams] = useSearchParams();

    const [search, setSearch] = useState(
    searchParams.get("search") || ""
    
);

    const [category, setCategory] = useState("All");
    const [sort, setSort] = useState("newest");
    const [sortOpen, setSortOpen] = useState(false);
    const [filterOpen, setFilterOpen] = useState(false);

    useEffect(() => {

    const timer = setTimeout(() => {
        console.log("Searching:", search);

        if (
            search.trim() === ""
        ) {

            dispatch(fetchProducts());

        } else {

            dispatch(
                searchAllProducts(
                    search
                )
            );

        }

    }, 500);

    return () =>
        clearTimeout(timer);

}, [search, dispatch]);

    const handleSearch = () => {

    if (
        search.trim()
    ) {

        dispatch(
            searchAllProducts(
                search
            )
        );

    } else {

        dispatch(
            fetchProducts()
        );

    }

};

    const handleClearSearch = () => {
        setSearch("");
        dispatch(fetchProducts());
    };

    const activeSort = SORT_OPTIONS.find((o) => o.value === sort);
    const handleCategoryClick = async (categoryName) => {

  setCategory(categoryName);

  if (categoryName === "All") {

    dispatch(fetchProducts());

    return;
  }

  try {

    const response =
      await getProductsByCategory(
        categoryName
      );

    dispatch(
      setProducts(
        response.data.data
      )
    );

  } catch (error) {

    if (
      error?.response?.status === 404
    ) {

      dispatch(
        setProducts([])
      );

    } else {

      console.log(error);
    }
  }
};

  const sortedProducts = [...(products || [])];

switch (sort) {

    case "price_asc":

        sortedProducts.sort((a, b) => {

            const priceA =
                Number(a?.details?.[0]?.price || 0);

            const priceB =
                Number(b?.details?.[0]?.price || 0);

            return priceA - priceB;
        });

        break;

    case "price_desc":

        sortedProducts.sort((a, b) => {

            const priceA =
                Number(a?.details?.[0]?.price || 0);

            const priceB =
                Number(b?.details?.[0]?.price || 0);

            return priceB - priceA;
        });

        break;

    case "newest":

        sortedProducts.sort(
            (a, b) =>
                new Date(b.createdAt) -
                new Date(a.createdAt)
        );

        break;

    case "popular":

        sortedProducts.sort((a, b) => {

            const salesA =
                a?.details?.reduce(
                    (sum, item) =>
                        sum + (item.sellingCount || 0),
                    0
                ) || 0;

            const salesB =
                b?.details?.reduce(
                    (sum, item) =>
                        sum + (item.sellingCount || 0),
                    0
                ) || 0;

            return salesB - salesA;
        });

        break;

    default:
        break;
}

    return (
        <div
            className="min-h-screen"
            style={{ background: "#FAF7F2", fontFamily: "sans-serif" }}
        >
            {/* ── Page Hero Banner ── */}
            <div
                className="w-full py-10 px-4 text-center border-b border-stone-200"
                style={{ background: "#1C1917" }}
            >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C9826B] mb-2">
                    <Sparkles size={10} className="inline mr-1" />
                    Curated Collection
                </p>
                <h1
                    className="text-4xl md:text-5xl font-black text-[#FAF7F2] mb-3"
                    style={{ fontFamily: "Georgia, serif", letterSpacing: "-0.02em" }}
                >
                    Every Stitch Has a Story
                </h1>
                <p className="text-stone-400 text-sm max-w-md mx-auto leading-relaxed">
                    New styles dropping daily. Pre-loved treasures waiting to be rediscovered.
                </p>

                {/* Stats row */}
                <div className="flex items-center justify-center gap-8 mt-6">
                    {[
                        { value: `${products?.length || 0}+`, label: "Styles" },
                        { value: "7-day", label: "Easy Returns" },
                        { value: "₹99", label: "Delivery" },
                    ].map((s) => (
                        <div key={s.label} className="text-center">
                            <p className="text-[#C9826B] font-extrabold text-xl">{s.value}</p>
                            <p className="text-stone-500 text-xs mt-0.5">{s.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Search + Controls ── */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-2">

                {/* Search bar */}
                <div className="relative mb-6">
                    <SearchBar
                        search={search}
                        setSearch={setSearch}
                        handleSearch={handleSearch}
                    />
                    {search && (
                        <button
                            onClick={handleClearSearch}
                            className="absolute right-14 top-1/2 -translate-y-1/2 text-stone-400 hover:text-[#C9826B] transition"
                        >
                            <X size={16} />
                        </button>
                    )}
                </div>

                {/* Active search pill */}
                {search && (
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-sm text-stone-500">Results for</span>
                        <span className="inline-flex items-center gap-1.5 bg-[#1C1917] text-[#FAF7F2] text-xs font-semibold px-3 py-1 rounded-full">
                            "{search}"
                            <button onClick={handleClearSearch}>
                                <X size={11} />
                            </button>
                        </span>
                    </div>
                )}

                {/* Quick filter chips + Sort */}
                <div className="flex items-center justify-between gap-4 flex-wrap mb-6">

                    {/* Category chips */}
                    <div className="flex items-center gap-2 flex-wrap">
                        {QUICK_FILTERS.map((f) => (
                            <button
                                key={f}
                                onClick={async () => {
                                    setCategory(f);

                                    if (f === "All") {
                                        dispatch(fetchProducts());
                                        return;
                                    }

                                    try {

                                        const response =
                                            await getProductsByCategory(f);

                                        dispatch({
                                            type: "product/setProducts",
                                            payload: response.data.data,
                                        });

                                    } catch (error) {

                                        if (
                                            error?.response?.status === 404
                                        ) {

                                            dispatch({
                                                type: "product/setProducts",
                                                payload: [],
                                            });

                                        } else {

                                            console.log(error);
                                        }
                                    }
                                }}
                                className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all duration-150 ${category === f
                                    ? "bg-[#1C1917] text-[#FAF7F2] border-[#1C1917]"
                                    : "bg-white text-stone-600 border-stone-200 hover:border-[#C9826B] hover:text-[#C9826B]"
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>

                    {/* Right side: sort + filter toggle */}
                    <div className="flex items-center gap-3">

                        {/* Sort dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setSortOpen(!sortOpen)}
                                className="flex items-center gap-2 px-4 py-2 bg-white border border-stone-200 rounded-xl text-sm font-semibold text-stone-700 hover:border-[#C9826B] transition"
                            >
                                {activeSort?.label}
                                <ChevronDown
                                    size={14}
                                    className={`transition-transform ${sortOpen ? "rotate-180" : ""}`}
                                />
                            </button>
                            {sortOpen && (
                                <div className="absolute right-0 top-full mt-2 bg-white border border-stone-200 rounded-2xl shadow-lg overflow-hidden z-20 w-52">
                                    {SORT_OPTIONS.map((opt) => (
                                        <button
                                            key={opt.value}
                                            onClick={() => { setSort(opt.value); setSortOpen(false); }}
                                            className={`w-full text-left px-5 py-3 text-sm transition ${sort === opt.value
                                                ? "bg-[#FAF7F2] text-[#C9826B] font-semibold"
                                                : "text-stone-600 hover:bg-stone-50"
                                                }`}
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Filter toggle (for advanced CategoryFilter) */}

                    </div>
                </div>

                {/* Advanced filter panel */}
                {filterOpen && (
                    <div className="bg-white border border-stone-200 rounded-2xl p-5 mb-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <p className="font-bold text-stone-800">Refine Results</p>
                            <button
                                onClick={() => setFilterOpen(false)}
                                className="text-stone-400 hover:text-stone-700 transition"
                            >
                                <X size={18} />
                            </button>
                        </div>
                        <CategoryFilter selected={category} setSelected={setCategory} />
                    </div>
                )}

                {/* Results count */}
                <div className="flex items-center justify-between mb-5">
                    <p className="text-sm text-stone-500">
                        Showing{" "}
                        <span className="font-semibold text-stone-800">{products?.length || 0}</span>{" "}
                        {category !== "All" && (
                            <>
                                in <span className="font-semibold text-[#C9826B]">{category}</span>
                            </>
                        )}
                    </p>
                    {category !== "All" && (
    <button
        onClick={() => {
            setCategory("All");
            dispatch(fetchProducts());
        }}
        className="text-xs text-stone-400 hover:text-[#C9826B] flex items-center gap-1 transition"
    >
        <X size={11} /> Clear filter
    </button>
)}
                </div>
            </div>

            {/* ── Product Grid ── */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 pb-16">
                {products?.length === 0 ? (
                    <div className="text-center py-24">
                        <div
                            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5"
                            style={{ background: "#f0ebe4" }}
                        >
                            <Sparkles size={32} className="text-[#C9826B]" />
                        </div>
                        <h3 className="text-xl font-bold text-stone-800 mb-2">
                            No Products Found
                        </h3>

                        <p className="text-stone-500 text-sm mb-6">
                            No products available in
                            {" "}
                            <span className="font-semibold">
                                {category}
                            </span>
                        </p>
                        <button
                            onClick={() => { setCategory("All"); setSearch(""); dispatch(fetchProducts()); }}
                            className="px-6 py-3 bg-[#1C1917] text-[#FAF7F2] rounded-xl font-semibold hover:bg-[#C9826B] transition"
                        >
                            Browse all styles
                        </button>
                    </div>
                ) : (
                    <ProductGrid products={sortedProducts} />
                )}
            </div>
        </div>
    );
};

export default Products;