import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, ShoppingCart, ArrowRight, Heart } from "lucide-react";

import {
    getWishlist,
    removeFromWishlist,
    moveWishlistToCart
} from "../api/wishlistApi";


import { addToCartFromWishList} from "../api/cartApi";

const Wishlist = () => {

    const navigate = useNavigate();

    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchWishlist = async () => {

        try {

            const response = await getWishlist();

            setWishlist(
                response.data.data || []
            );

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchWishlist();

    }, []);

    const removeItem = async (productId) => {

        try {

            await removeFromWishlist(productId);

            setWishlist(prev =>
                prev.filter(
                    item =>
                        item.productId._id !== productId
                )
            );

        } catch (error) {

            console.log(error);

        }

    };

    const handleAddToCart = async (productId) => {

        try {
            console.log("I am trying")

            await addToCartFromWishList({
                productId,
                quantity: 1
            });

            alert("Added To Cart");

        } catch (error) {

            console.log(error);

        }

    };

    const handleBuyNow = (productId) => {

        navigate(`/product/${productId}`);

    };

    const handleMoveAllToCart = async () => {

        try {

            await moveWishlistToCart();

            fetchWishlist();

        } catch (error) {

            console.log(error);

        }

    };

    const totalPrice = wishlist.reduce(
        (total, item) =>
            total +
            (
                item.productId.details?.[0]?.price || 0
            ),
        0
    );

    // ---------- Loading state ----------
    if (loading) {

        return (
            <div className="max-w-7xl mx-auto px-4 py-10">

                <div className="mb-10 h-9 w-56 animate-pulse rounded bg-stone-200" />

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">

                    <div className="space-y-5 lg:col-span-3">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div
                                key={i}
                                className="flex gap-5 rounded-2xl border border-stone-200 bg-white p-5"
                            >
                                <div className="h-32 w-32 shrink-0 animate-pulse rounded-xl bg-stone-100" />
                                <div className="flex-1 space-y-3 py-1">
                                    <div className="h-3 w-20 animate-pulse rounded bg-stone-200" />
                                    <div className="h-4 w-2/3 animate-pulse rounded bg-stone-200" />
                                    <div className="h-4 w-24 animate-pulse rounded bg-stone-200" />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="h-48 animate-pulse rounded-2xl border border-stone-200 bg-white" />

                </div>

            </div>
        );

    }

    return (

        <div className="max-w-7xl mx-auto px-4 py-10">

            {/* Header */}
            <div className="mb-8 flex flex-wrap items-baseline justify-between gap-2 border-b border-stone-200 pb-4">

                <h1 className="font-serif text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
                    Your Collection
                </h1>

                <p className="text-sm uppercase tracking-[0.2em] text-stone-400">
                    {wishlist.length} {wishlist.length === 1 ? "piece" : "pieces"} saved
                </p>

            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">

                {/* Wishlist Products */}
                <div className="lg:col-span-3">

                    {
                        wishlist.length === 0 ? (

                            // ---------- Empty state ----------
                            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-stone-300 py-24 text-center">

                                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-stone-300 text-stone-400">
                                    <Heart size={28} strokeWidth={1.5} />
                                </div>

                                <h3 className="font-serif text-2xl font-semibold text-stone-900">
                                    Your Wishlist is Empty
                                </h3>

                                <p className="mt-2 max-w-sm text-sm text-stone-500">
                                    Add products to your wishlist so you can find your favorites again later.
                                </p>

                                <button
                                    onClick={() => navigate("/")}
                                    className="mt-6 rounded-full bg-stone-900 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-stone-700"
                                >
                                    Browse products
                                </button>

                            </div>

                        ) : (

                            <div className="space-y-5">

                                {wishlist.map((item) => {

                                    const product = item.productId;

                                    return (

                                        <div
                                            key={item._id}
                                            className="group relative flex flex-col gap-5 overflow-hidden rounded-2xl border border-stone-200 bg-white p-5 transition-shadow hover:shadow-lg sm:flex-row"
                                        >

                                            {/* Image */}
                                            <div
                                                className="relative h-44 w-full shrink-0 cursor-pointer overflow-hidden rounded-xl bg-stone-50 sm:h-32 sm:w-32"
                                                onClick={() =>
                                                    navigate(`/product/${product._id}`)
                                                }
                                            >

                                                <img
                                                    src={product.images?.[0] || "https://via.placeholder.com/200"}
                                                    alt={product.name}
                                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />

                                            </div>

                                            {/* Details */}
                                            <div className="flex flex-1 flex-col">

                                                <div
                                                    className="flex-1 cursor-pointer"
                                                    onClick={() =>
                                                        navigate(`/product/${product._id}`)
                                                    }
                                                >

                                                    <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-700">
                                                        {product.category}
                                                    </span>

                                                    <h3 className="mt-1 font-serif text-lg font-semibold leading-snug text-stone-900 sm:text-xl">
                                                        {product.name}
                                                    </h3>

                                                    <p className="mt-1 text-sm text-stone-400">
                                                        Brand: {product.brand}
                                                    </p>

                                                    <p className="mt-2 text-lg font-semibold text-stone-900">
                                                        ₹{product.details?.[0]?.price}
                                                    </p>

                                                </div>

                                                <div className="mt-4 flex flex-wrap items-center gap-3">

                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();

                                                            handleAddToCart(
                                                                product
                                                            );
                                                        }}
                                                        className="inline-flex items-center gap-2 rounded-full bg-stone-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-stone-700"
                                                    >
                                                        <ShoppingCart size={15} />
                                                        Add to cart
                                                    </button>

                                                    <button
                                                        onClick={(e) => {

                                                            e.stopPropagation();

                                                            handleBuyNow(
                                                                product._id
                                                            );

                                                        }}
                                                        className="inline-flex items-center gap-2 rounded-full border border-amber-700 px-4 py-2 text-sm font-medium text-amber-700 transition hover:bg-amber-50"
                                                    >
                                                        Buy now
                                                        <ArrowRight size={15} />
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            removeItem(
                                                                product._id
                                                            )
                                                        }
                                                        aria-label="Remove from wishlist"
                                                        className="ml-auto flex h-9 w-9 items-center justify-center rounded-full text-stone-400 transition hover:bg-rose-50 hover:text-rose-600"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>

                                                </div>

                                            </div>

                                        </div>

                                    );

                                })}

                            </div>

                        )
                    }

                </div>

                {/* Summary */}
                <div className="h-fit rounded-2xl border border-stone-200 bg-white p-6 lg:sticky lg:top-5">

                    <h2 className="font-serif text-xl font-semibold text-stone-900">
                        Summary
                    </h2>

                    <div className="mt-5 space-y-3 text-sm">

                        <div className="flex justify-between text-stone-500">
                            <span>Products</span>
                            <span className="font-medium text-stone-900">
                                {wishlist.length}
                            </span>
                        </div>

                        <div className="flex justify-between border-t border-stone-100 pt-3 text-stone-500">
                            <span>Total value</span>
                            <span className="text-lg font-semibold text-stone-900">
                                ₹{totalPrice}
                            </span>
                        </div>

                    </div>

                    <button
                        onClick={handleMoveAllToCart}
                        disabled={wishlist.length === 0}
                        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-amber-700 py-3 text-sm font-semibold text-white transition hover:bg-amber-800 disabled:cursor-not-allowed disabled:bg-stone-200 disabled:text-stone-400"
                    >
                        <ShoppingCart size={16} />
                        Move all to cart
                    </button>

                </div>

            </div>

        </div>

    );

};

export default Wishlist;