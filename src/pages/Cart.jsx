import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ShoppingCart,
    Trash2,
    ArrowRight,
    Wallet,
    CreditCard,
    PackageX,
    X
} from "lucide-react";

import {
    getCart,
    removeFromCart,
    clearCart,
    orderCartProducts
} from "../api/cartApi";
import toast from "react-hot-toast";
import { createRazorpayOrder } from "../api/paymentApi";
import { verifyPayment } from "../api/paymentApi";

const Cart = () => {

    const navigate = useNavigate();
    const [showPaymentModal, setShowPaymentModal] =
    useState(false);

const [paymentMethod, setPaymentMethod] =
    useState("COD");

    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCartItems = async () => {

        try {

            const response = await getCart();

            console.log("Cart Response", response.data.data);

            setCart(
                response.data.data || []
            );

        }
        catch (error) {

            console.log(error);

        }
        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchCartItems();

    }, []);

    const handleRemove = async (productId) => {

        try {

            await removeFromCart(productId);

            setCart(prev =>
                prev.filter(
                    item =>
                        (
                            item.productId?._id ||
                            item.productId ||
                            item._id
                        ) !== productId
                )
            );

        }
        catch (error) {

            console.log(error);

        }

    };

    const handleClearCart = async () => {

        try {

            await clearCart();

            setCart([]);

        }
        catch (error) {

            console.log(error);

        }

    };

    const handleBuyNow = (productId) => {

        navigate(`/product/${productId}`);

    };

    const totalPrice = cart.reduce(
        (total, item) =>
            total +
            (
                item.price ||
                item.productId?.details?.[0]?.price ||
                0
            ) *
            (
                item.quantity || 1
            ),
        0
    );

    if (loading) {

        return (
            <div className="min-h-[60vh] flex items-center justify-center bg-[#FAF6EF]">
                <div className="font-mono text-xs uppercase tracking-[0.3em] text-[#8B8378] animate-pulse">
                    Printing your ticket...
                </div>
            </div>
        );

    }

   

const handleCartCOD =
async () => {

    try {

        await orderCartProducts({

            paymentType:
            "COD"

        });

        toast.success(
            "Order Placed Successfully"
        );

        setTimeout(() => {

            navigate(
                "/orders"
            );

        }, 1500);

    }
    catch (error) {

        console.log(error);

        toast.error(
            error?.response?.data?.message ||
            "Order Failed"
        );

    }

};

    const handleCartOnlinePayment =
async () => {

    try {

        const user =
        JSON.parse(
            localStorage.getItem("user")
        );

        const temp =
        user?.user;

        const response =
        await createRazorpayOrder(
            totalPrice
        );

        const order =
        response.data.data;

        const options = {

            key:
            import.meta.env
            .VITE_RAZORPAY_KEY,

            amount:
            order.amount,

            currency:
            order.currency,

            name:
            "Harish",

            description:
            "Cart Checkout",

            order_id:
            order.id,

            handler:
            async function (
                response
            ) {

                try {

                    await verifyPayment({

                        razorpay_order_id:
                        response.razorpay_order_id,

                        razorpay_payment_id:
                        response.razorpay_payment_id,

                        razorpay_signature:
                        response.razorpay_signature

                    });

                    await orderCartProducts({

                        paymentType:
                        "ONLINE"

                    });

                    toast.success(
                        "Order Placed Successfully"
                    );

                    setTimeout(() => {

                        navigate(
                            "/orders"
                        );

                    }, 1500);

                }
                catch (error) {

                    console.log(
                        error
                    );

                    toast.error(
                        "Payment Verification Failed"
                    );

                }

            },

            prefill: {

                name:
                temp?.username ||
                "Customer",

                email:
                temp?.email ||
                "",

                contact:
                temp?.phoneNumber ||
                ""

            },

            theme: {

                color:
                "#16a34a"

            }

        };

        const razorpay =
        new window.Razorpay(
            options
        );

        razorpay.open();

    }
    catch (error) {

        console.log(error);

        toast.error(
            "Payment Failed"
        );

    }

};

    return (

        <>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Space+Mono:wght@400;700&display=swap');

                .ticket-serif { font-family: 'Fraunces', Georgia, serif; }
                .ticket-mono { font-family: 'Space Mono', 'Courier New', monospace; }

                .barcode-strip {
                    background-color: #FAF6EF;
                    background-image: repeating-linear-gradient(
                        90deg,
                        #2B2823 0px, #2B2823 2px,
                        transparent 2px, transparent 5px,
                        #2B2823 5px, #2B2823 6px,
                        transparent 6px, transparent 12px,
                        #2B2823 12px, #2B2823 15px,
                        transparent 15px, transparent 20px
                    );
                }

                .ticket-scallop {
                    height: 14px;
                    background-color: #FFFFFF;
                    -webkit-mask: radial-gradient(circle at 7px -1px, transparent 8px, #000 8.5px) repeat-x;
                    mask: radial-gradient(circle at 7px -1px, transparent 8px, #000 8.5px) repeat-x;
                    -webkit-mask-size: 14px 14px;
                    mask-size: 14px 14px;
                }
            `}</style>

            <div className="min-h-screen bg-[#FAF6EF] px-4 sm:px-6 lg:px-8 py-8 sm:py-10">

                <div className="max-w-6xl mx-auto">

                    <header className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b-2 border-[#2B2823] pb-4">

                        <div>
                            <p className="ticket-mono text-xs uppercase tracking-[0.25em] text-[#8B8378] mb-1">
                                Order Ticket
                            </p>
                            <h1 className="ticket-serif text-4xl sm:text-5xl font-semibold text-[#2B2823]">
                                My Cart
                            </h1>
                            {
                                cart.length > 0 &&
                                <p className="ticket-mono text-xs text-[#8B8378] mt-2">
                                    {cart.length} {cart.length === 1 ? "item" : "items"} ready for checkout
                                </p>
                            }
                        </div>

                        {
                            cart.length > 0 &&
                            <button
                                onClick={handleClearCart}
                                className="ticket-mono text-xs uppercase tracking-wide text-[#B0473E] border border-[#B0473E]/30 rounded-full px-4 py-2 hover:bg-[#B0473E] hover:text-white transition-colors"
                            >
                                Clear cart
                            </button>
                        }

                    </header>

                    {
                        cart.length === 0 ? (

                            <div className="border-2 border-dashed border-[#D9D2C4] rounded-2xl py-16 sm:py-24 px-6 text-center bg-white/50">

                                <PackageX size={48} strokeWidth={1.5} className="mx-auto text-[#C9C0B2] mb-4" />

                                <h2 className="ticket-serif text-2xl text-[#2B2823] mb-2">
                                    Your ticket is empty
                                </h2>

                                <p className="ticket-mono text-sm text-[#8B8378] mb-6">
                                    Items you add will line up here, ready to check out.
                                </p>

                                <button
                                    onClick={() => navigate("/")}
                                    className="ticket-mono text-xs uppercase tracking-wide bg-[#2B2823] text-white px-6 py-3 rounded-full hover:bg-[#15803D] transition-colors"
                                >
                                    Browse products
                                </button>

                            </div>

                        ) : (

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">

                                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-[#EFE9DD] px-5 sm:px-7">

                                    {
                                        cart.map((item, index) => {

                                            const product =
                                                item.productId || item;

                                            const productId =
                                                product._id ||
                                                item.productId;

                                            const price =
                                                product.details?.[0]?.price ||
                                                item.price ||
                                                0;

                                            const isLast =
                                                index === cart.length - 1;

                                            return (

                                                <div
                                                    key={item._id}
                                                    className={`flex flex-col sm:flex-row sm:items-center gap-4 py-5 ${isLast ? "" : "border-b border-dashed border-[#D9D2C4]"}`}
                                                >

                                                    <div className="flex gap-4 flex-1 min-w-0">

                                                        <div
                                                            onClick={() =>
                                                                navigate(
                                                                    `/product/${productId}`
                                                                )
                                                            }
                                                            className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0 cursor-pointer ring-1 ring-[#EFE9DD]"
                                                        >

                                                            <img
                                                                src={
                                                                    product.images?.[0] ||
                                                                    item.productImage
                                                                }
                                                                alt={
                                                                    product.name ||
                                                                    item.title
                                                                }
                                                                className="w-full h-full object-cover"
                                                            />

                                                        </div>

                                                        <div className="flex-1 min-w-0 flex flex-col justify-center">

                                                            <h2
                                                                onClick={() =>
                                                                    navigate(
                                                                        `/product/${productId}`
                                                                    )
                                                                }
                                                                className="ticket-serif text-lg sm:text-xl text-[#2B2823] cursor-pointer hover:text-[#15803D] transition-colors line-clamp-2"
                                                            >
                                                                {
                                                                    product.name ||
                                                                    item.title
                                                                }
                                                            </h2>

                                                            <p className="ticket-mono text-xs uppercase tracking-wide text-[#8B8378] mt-1">
                                                                Qty {item.quantity || 1}
                                                            </p>

                                                            <span className="ticket-mono text-lg font-bold text-[#15803D] mt-1 sm:hidden">
                                                                ₹{price}
                                                            </span>

                                                        </div>

                                                    </div>

                                                    <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-5 pl-24 sm:pl-0">

                                                        <span className="hidden sm:inline ticket-mono text-lg font-bold text-[#15803D] w-24 text-right">
                                                            ₹{price}
                                                        </span>

                                                        <div className="flex gap-2">

                                                            <button
                                                                onClick={() =>
                                                                    handleBuyNow(
                                                                        productId
                                                                    )
                                                                }
                                                                title="Buy now"
                                                                className="flex items-center gap-1.5 bg-[#2B2823] text-white px-3 py-2 rounded-full ticket-mono text-xs uppercase tracking-wide hover:bg-[#15803D] transition-colors"
                                                            >
                                                                Buy now
                                                                <ArrowRight size={14} />
                                                            </button>

                                                            <button
                                                                onClick={() =>
                                                                    handleRemove(
                                                                        productId
                                                                    )
                                                                }
                                                                title="Remove from cart"
                                                                className="flex items-center justify-center w-9 h-9 rounded-full border border-[#EFE9DD] text-[#B0473E] hover:bg-[#FBEAE8] hover:border-[#B0473E]/40 transition-colors"
                                                            >
                                                                <Trash2 size={15} />
                                                            </button>

                                                        </div>

                                                    </div>

                                                </div>

                                            );

                                        })
                                    }

                                </div>

                                <div className="lg:sticky lg:top-6">

                                    <div className="bg-white rounded-t-2xl shadow-sm border border-[#EFE9DD] border-b-0 overflow-hidden">

                                        <div className="barcode-strip h-7" />

                                        <div className="px-6 py-6">

                                            <h2 className="ticket-mono text-xs uppercase tracking-[0.25em] text-[#8B8378] mb-5">
                                                Order Summary
                                            </h2>

                                            <div className="space-y-3 ticket-mono text-sm text-[#5C564C]">

                                                <div className="flex justify-between">
                                                    <span>Items ({cart.length})</span>
                                                    <span>₹{totalPrice}</span>
                                                </div>

                                                <div className="flex justify-between">
                                                    <span>Delivery</span>
                                                    <span className="text-[#15803D]">Free</span>
                                                </div>

                                            </div>

                                            <div className="border-t border-dashed border-[#D9D2C4] my-4" />

                                            <div className="flex justify-between items-baseline">
                                                <span className="ticket-serif text-lg text-[#2B2823]">
                                                    Total
                                                </span>
                                                <span className="ticket-mono text-2xl font-bold text-[#15803D]">
                                                    ₹{totalPrice}
                                                </span>
                                            </div>

                                            <button
                                                onClick={() =>
                                                    setShowPaymentModal(true)
                                                }
                                                className="w-full mt-6 bg-[#2B2823] hover:bg-[#15803D] text-white py-3.5 rounded-xl ticket-mono text-sm uppercase tracking-wide font-semibold transition-colors flex items-center justify-center gap-2"
                                            >
                                                <ShoppingCart size={16} />
                                                Checkout
                                            </button>

                                        </div>

                                    </div>

                                    <div className="ticket-scallop rounded-b-sm" />

                                </div>

                                {
                                    showPaymentModal && (

                                        <div className="fixed inset-0 bg-[#2B2823]/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">

                                            <div className="bg-white w-full max-w-md rounded-2xl overflow-hidden shadow-xl">

                                                <div className="barcode-strip h-6" />

                                                <div className="p-6 sm:p-7">

                                                    <div className="flex items-center justify-between mb-1">

                                                        <p className="ticket-mono text-xs uppercase tracking-[0.25em] text-[#8B8378]">
                                                            Step 2 of 2
                                                        </p>

                                                        <button
                                                            onClick={() =>
                                                                setShowPaymentModal(false)
                                                            }
                                                            className="text-[#8B8378] hover:text-[#2B2823] transition-colors"
                                                            aria-label="Close payment dialog"
                                                        >
                                                            <X size={18} />
                                                        </button>

                                                    </div>

                                                    <h2 className="ticket-serif text-2xl text-[#2B2823] mb-6">
                                                        How will you pay?
                                                    </h2>

                                                    <label
                                                        className={`flex items-center gap-3 mb-3 cursor-pointer rounded-xl border-2 p-4 transition-colors ${
                                                            paymentMethod === "COD"
                                                                ? "border-[#15803D] bg-[#ECF5EE]"
                                                                : "border-[#EFE9DD]"
                                                        }`}
                                                    >

                                                        <input
                                                            type="radio"
                                                            checked={paymentMethod === "COD"}
                                                            onChange={() =>
                                                                setPaymentMethod("COD")
                                                            }
                                                            className="w-4 h-4 accent-[#15803D]"
                                                        />

                                                        <Wallet size={20} className="text-[#5C564C] shrink-0" />

                                                        <div>
                                                            <p className="font-medium text-[#2B2823]">
                                                                Cash on Delivery
                                                            </p>
                                                            <p className="ticket-mono text-xs text-[#8B8378]">
                                                                Pay when your order arrives
                                                            </p>
                                                        </div>

                                                    </label>

                                                    <label
                                                        className={`flex items-center gap-3 mb-6 cursor-pointer rounded-xl border-2 p-4 transition-colors ${
                                                            paymentMethod === "ONLINE"
                                                                ? "border-[#15803D] bg-[#ECF5EE]"
                                                                : "border-[#EFE9DD]"
                                                        }`}
                                                    >

                                                        <input
                                                            type="radio"
                                                            checked={paymentMethod === "ONLINE"}
                                                            onChange={() =>
                                                                setPaymentMethod("ONLINE")
                                                            }
                                                            className="w-4 h-4 accent-[#15803D]"
                                                        />

                                                        <CreditCard size={20} className="text-[#5C564C] shrink-0" />

                                                        <div>
                                                            <p className="font-medium text-[#2B2823]">
                                                                Online Payment
                                                            </p>
                                                            <p className="ticket-mono text-xs text-[#8B8378]">
                                                                Pay now via Razorpay
                                                            </p>
                                                        </div>

                                                    </label>

                                                    <div className="border-t border-dashed border-[#D9D2C4] my-5" />

                                                    <div className="flex justify-between items-baseline mb-5">
                                                        <span className="ticket-mono text-xs uppercase tracking-wide text-[#8B8378]">
                                                            Amount payable
                                                        </span>
                                                        <span className="ticket-mono text-xl font-bold text-[#15803D]">
                                                            ₹{totalPrice}
                                                        </span>
                                                    </div>

                                                    <div className="flex gap-3">

                                                        <button
                                                            onClick={() =>
                                                                setShowPaymentModal(false)
                                                            }
                                                            className="flex-1 border border-[#EFE9DD] py-3 rounded-xl ticket-mono text-sm uppercase tracking-wide text-[#5C564C] hover:bg-[#FAF6EF] transition-colors"
                                                        >
                                                            Cancel
                                                        </button>

                                                        <button
                                                            onClick={() => {

                                                                if (
                                                                    paymentMethod ===
                                                                    "ONLINE"
                                                                ) {

                                                                    handleCartOnlinePayment();

                                                                }
                                                                else {

                                                                    handleCartCOD();

                                                                }

                                                            }}
                                                            className="flex-1 bg-[#15803D] hover:bg-[#136932] text-white py-3 rounded-xl ticket-mono text-sm uppercase tracking-wide font-semibold transition-colors"
                                                        >
                                                            Place order
                                                        </button>

                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                    )
                                }

                            </div>

                        )
                    }

                </div>

            </div>

        </>

    );

};

export default Cart;