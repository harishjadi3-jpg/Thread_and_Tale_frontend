import {
    useEffect,
    useState
} from "react";

import {
    useParams
} from "react-router-dom";

import { useNavigate } from "react-router-dom";
import {
    getProductById
} from "../api/productApi";

import { toggleWishlist } from "../api/wishlistApi";

import { Heart, Star, Truck, ShoppingCart, Zap } from "lucide-react";

import {
    orderProduct
}
from "../api/productApi";

import {
    addToCart
} from "../api/cartApi";

import {
    createRazorpayOrder,
    verifyPayment
}
    from "../api/paymentApi";
import { useSelector } from "react-redux";

import { getAddresses } from "../api/addressApi";
import toast from "react-hot-toast";





const SingleProduct = () => {
    const [showPaymentModal, setShowPaymentModal] =
    useState(false);
    const [addresses, setAddresses] = useState([]);
    const [
    showAddressModal,
    setShowAddressModal
] = useState(false);
const navigate = useNavigate();

const [paymentMethod, setPaymentMethod] =
    useState("COD");
    const user =
JSON.parse(
    localStorage.getItem("user")
);
    const [isWishlisted, setIsWishlisted] =
    useState(false);
    useEffect(() => {

    const fetchAddresses = async () => {

        try {

            const res = await getAddresses();

            setAddresses(
                res.data.data || []
            );

        } catch (error) {

            console.log(error);

        }

    };

    fetchAddresses();

}, []);
const handleOpenPaymentModal = () => {

    console.log("Addresses:", addresses);

    if (!addresses || addresses.length === 0) {

        toast.error(
            "Please add delivery address first"
        );

        setShowAddressModal(true);

        return;
    }

    setShowPaymentModal(true);
};
    const handleWishlist =
async () => {

    try {

        const res =
        await toggleWishlist(
            product._id
        );

        setIsWishlisted(
            res.data.isWishlisted
        );

        toast.success(
            res.data.message
        );

    } catch (error) {

        console.log(error);

        toast.error(
            "Wishlist Failed"
        );

    }

};
    const handleAddToCart = async () => {

    try {

        await addToCart(product);

        toast.success(
            "Added To Cart"
        );

    } catch (error) {

        console.log(error);

        toast.error(
            "Failed To Add Cart"
        );

    }

};

    const handleBuyNow = async () => {


try {


console.log(
"Online payment started"
);



const temp =
user?.user;


const amount =
product.details?.[0]?.price;




// STEP 1: CREATE RAZORPAY ORDER

const response =
await createRazorpayOrder(
    amount
);



const razorpayOrder =
response.data.data;



console.log(
"Razorpay Order:",
razorpayOrder
);






const options = {


key:
import.meta.env.VITE_RAZORPAY_KEY,



amount:
razorpayOrder.amount,



currency:
razorpayOrder.currency,



name:
"Thread & Tale",



description:
product.name,



image:
product.images?.[0],



order_id:
razorpayOrder.id,





// STEP 2: PAYMENT SUCCESS

handler:
async function(response){


try {



console.log(
"Payment Response:",
response
);





// STEP 3: VERIFY PAYMENT


const verifyRes =
await verifyPayment({


razorpay_order_id:
response.razorpay_order_id,



razorpay_payment_id:
response.razorpay_payment_id,



razorpay_signature:
response.razorpay_signature


});




console.log(
"Payment Verified:",
verifyRes.data
);






// STEP 4: CREATE ORDER IN DATABASE


const orderData = {


productId:
product._id,



paymentType:
"ONLINE",



orderCount:
1,



color:
product.details?.[0]?.color,



size:
product.details?.[0]?.size,



paymentId:
response.razorpay_payment_id



};




console.log(
"Creating order:",
orderData
);





const orderResponse =
await orderProduct(
orderData
);




console.log(
"MongoDB Order:",
orderResponse.data
);






toast.success(
"Order Placed Successfully"
);




setTimeout(()=>{


navigate(
"/orders"
);


},1500);




}

catch(error){



console.log(
"Order Error:",
error
);



toast.error(
"Payment done but order creation failed"
);



}


},






// USER DETAILS IN PAYMENT WINDOW


prefill:{


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






theme:{

color:"#16a34a"

}



};







// STEP 5: OPEN RAZORPAY


const razorpay =
new window.Razorpay(
options
);



razorpay.open();




}

catch(error){


console.log(
"Payment Error:",
error
);



toast.error(
"Payment Failed"
);



}


};

    const { id } =
        useParams();

    const [product, setProduct] =
        useState(null);

    const [reviews, setReviews] =
        useState([]);

    const [buyers, setBuyers] =
        useState(0);

    const [rating, setRating] =
        useState(5);

    const [
        selectedImage,
        setSelectedImage
    ] = useState("");

    useEffect(() => {
      

    const fetchAddresses = async () => {

        try {

            const res = await getAddresses();

            console.log(
                "Address Response:",
                res.data
            );

            const addressList =
                res?.data?.data ||
                res?.data?.addresses ||
                [];

            setAddresses(addressList);

        } catch (error) {

            console.log(
                "Address Fetch Error:",
                error
            );

            setAddresses([]);

        }

    };

    fetchAddresses();


        const fetchProduct =
            async () => {

                try {

                    const res =
                        await getProductById(
                            id
                        );
                        
                    console.log(
                        "Product Response: this for review",
                        res.data
                    );

                    setProduct(
                        res.data.product
                    );

                    setReviews(
                        res.data.reviews || []
                    );

                    setBuyers(
                        res.data.totalBuyers || 0
                    );

                    setRating(
                        res.data.averageRating || 0
                    );

                    setSelectedImage(
                        res.data.product
                            ?.images?.[0] || ""
                    );

                } catch (error) {

                    console.log(error);

                }

            };

        fetchProduct();

    }, [id]);

    if (!product) {

        return (
            <div className="flex min-h-screen items-center justify-center bg-stone-50">

                <div className="grid w-full max-w-7xl grid-cols-1 gap-8 px-4 lg:grid-cols-2">

                    <div className="aspect-square animate-pulse rounded-2xl bg-stone-200" />

                    <div className="space-y-4 py-4">
                        <div className="h-4 w-24 animate-pulse rounded bg-stone-200" />
                        <div className="h-8 w-3/4 animate-pulse rounded bg-stone-200" />
                        <div className="h-4 w-1/3 animate-pulse rounded bg-stone-200" />
                        <div className="h-10 w-1/4 animate-pulse rounded bg-stone-200" />
                        <div className="h-32 w-full animate-pulse rounded-xl bg-stone-200" />
                    </div>

                </div>

            </div>
        );

    }
    const handlePlaceOrder = async () => {

    try {

        const orderData = {

            productId:
                product._id,

            paymentType:
                paymentMethod,

            orderCount: 1,

            color:
                product.details?.[0]?.color,

            size:
                product.details?.[0]?.size

        };

        console.log(
            "Order Data",
            orderData
        );

        const res=await orderProduct(
            orderData
        );
        console.log("This is order product response", res);

        toast.success(
            "Order Placed Successfully"
        );
        navigate("/orders");

    }
    catch (error) {
        console.log("error", error);
        const message =
            error?.response?.data?.message;
            console.log("This is error message", error.response);

        if (
            message ===
            "Please add address before ordering"
        ) {

            setShowAddressModal(
                true
            );

            return;
        }

        toast.error(
            message ||
            "Something went wrong"
        );

    }

};

    return (
        <div className="min-h-screen bg-stone-50">

            <div className="max-w-7xl mx-auto px-4 py-8">

                <div className="grid lg:grid-cols-2 gap-10">

                    {/* LEFT SIDE — GALLERY */}

                    <div>

                        <div className="
                            overflow-hidden
                            rounded-2xl
                            border
                            border-stone-200
                            bg-white
                        ">
                            <img
                                src={selectedImage}
                                alt={product.name}
                                className="
                                w-full
                                h-[350px]
                                md:h-[560px]
                                object-contain
                            "
                            />
                        </div>

                        <div className="
                        flex
                        gap-3
                        mt-4
                        overflow-x-auto
                        pb-2
                    ">
                            {product.images?.map(
                                (image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt=""
                                        onClick={() =>
                                            setSelectedImage(image)
                                        }
                                        className={`
                                        w-20
                                        h-20
                                        rounded-xl
                                        border-2
                                        cursor-pointer
                                        object-cover
                                        shrink-0
                                        transition
                                        ${selectedImage === image
                                                ? "border-amber-700"
                                                : "border-stone-200 hover:border-stone-300"
                                            }
                                    `}
                                    />
                                )
                            )}
                        </div>

                    </div>

                    {/* RIGHT SIDE — DETAILS */}

                    <div
                        className="
                        lg:h-[90vh]
                        lg:overflow-y-auto
                        lg:pr-3
                    "
                    >

                        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-700">
                            {product.category}
                        </span>

                        <div className="
                            mt-1
                            flex
                            justify-between
                            items-start
                            gap-4
                        ">
                            <h1 className="
                                font-serif
                                text-3xl
                                sm:text-4xl
                                font-semibold
                                tracking-tight
                                text-stone-900
                                flex-1
                            ">
                                {product.name}
                            </h1>

                            <button
                                onClick={handleWishlist}
                                aria-label="Toggle wishlist"
                                className="
                                    flex
                                    h-12
                                    w-12
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-full
                                    border
                                    border-stone-200
                                    bg-white
                                    transition
                                    hover:border-rose-200
                                    hover:bg-rose-50
                                "
                            >
                                <Heart
                                    size={22}
                                    fill={
                                        isWishlisted
                                            ? "#e11d48"
                                            : "none"
                                    }
                                    className={
                                        isWishlisted
                                            ? "text-rose-600"
                                            : "text-stone-400"
                                    }
                                />
                            </button>
                        </div>

                        <p className="
                            text-stone-400
                            mt-2
                        ">
                            {product.brand}
                        </p>

                        <div className="
                        flex
                        items-center
                        gap-3
                        mt-4
                    ">
                            <span className="
                                inline-flex
                                items-center
                                gap-1
                                rounded-full
                                bg-stone-900
                                text-white
                                px-3
                                py-1
                                text-sm
                                font-medium
                            ">
                                <Star size={14} fill="currentColor" />
                                {rating.toFixed(1)}
                            </span>

                            <span className="
                                text-sm
                                text-stone-500
                            ">
                                {buyers}+ buyers
                            </span>
                        </div>

                        {/* PRICE */}

                        <div className="mt-8">

                            <h2 className="
                                font-serif
                                text-4xl
                                font-semibold
                                text-stone-900
                            ">
                                ₹
                                {
                                    product.details?.[0]
                                        ?.price
                                }
                            </h2>

                        </div>

                        {/* DELIVERY */}

                        <div className="
                            mt-6
                            flex
                            items-center
                            gap-3
                            rounded-xl
                            border
                            border-stone-200
                            bg-white
                            p-4
                            text-sm
                            text-stone-600
                        ">
                            <Truck size={18} className="text-amber-700" />
                            Delivery in
                            {" "}
                            <strong className="text-stone-900">
                                {product.deliveryTime} days
                            </strong>
                        </div>

                        {/* VARIANTS */}

                        <div className="mt-8">

                            <h2 className="
                                font-serif
                                text-xl
                                font-semibold
                                text-stone-900
                                mb-4
                            ">
                                Available Variants
                            </h2>

                            <div className="
                            grid
                            sm:grid-cols-2
                            gap-4
                        ">

                                {product.details?.map(
                                    (
                                        variant,
                                        index
                                    ) => (

                                        <div
                                            key={index}
                                            className="
                                                rounded-xl
                                                border
                                                border-stone-200
                                                bg-white
                                                p-4
                                                text-sm
                                                text-stone-600
                                                cursor-pointer
                                                transition
                                                hover:border-amber-700
                                            "
                                        >

                                            <p>
                                                <strong className="text-stone-900">
                                                    Size:
                                                </strong>
                                                {" "}
                                                {variant.size}
                                            </p>

                                            <p className="mt-1">
                                                <strong className="text-stone-900">
                                                    Color:
                                                </strong>
                                                {" "}
                                                {variant.color}
                                            </p>

                                            <p className="mt-1">
                                                <strong className="text-stone-900">
                                                    Gender:
                                                </strong>
                                                {" "}
                                                {variant.gender}
                                            </p>

                                            <p className="
                                                mt-3
                                                text-lg
                                                font-semibold
                                                text-stone-900
                                            ">
                                                ₹
                                                {
                                                    variant.price
                                                }
                                            </p>

                                            <div className="mt-2 flex items-center justify-between text-stone-400">
                                                <span>
                                                    Stock:
                                                    {" "}
                                                    {
                                                        variant.availabilityCount
                                                    }
                                                </span>

                                                <span>
                                                    Sold:
                                                    {" "}
                                                    {
                                                        variant.sellingCount
                                                    }
                                                </span>
                                            </div>

                                        </div>

                                    )
                                )}

                            </div>

                        </div>

                        {/* DESCRIPTION */}

                        <div className="
                            mt-8
                            rounded-xl
                            border
                            border-stone-200
                            bg-white
                            p-5
                        ">

                            <h2 className="
                                font-serif
                                text-xl
                                font-semibold
                                text-stone-900
                                mb-3
                            ">
                                Description
                            </h2>

                            <p className="
                                text-stone-600
                                leading-relaxed
                            ">
                                {product.description}
                            </p>

                        </div>

                        {/* ACTION BUTTONS */}

                        <div className="
                            sticky
                            bottom-0
                            bg-stone-50
                            py-4
                            mt-8
                            flex
                            gap-4
                        ">

                            <button
                                onClick={handleAddToCart}
                                className="
                                    flex-1
                                    inline-flex
                                    items-center
                                    justify-center
                                    gap-2
                                    bg-stone-900
                                    hover:bg-stone-700
                                    text-white
                                    py-4
                                    rounded-full
                                    font-semibold
                                    cursor-pointer
                                    transition
                                "
                            >
                                <ShoppingCart size={18} />
                                Add To Cart
                            </button>

                            <button
    onClick={handleOpenPaymentModal}
    className="
        flex-1
        inline-flex
        items-center
        justify-center
        gap-2
        bg-amber-700
        hover:bg-amber-800
        text-white
        py-4
        rounded-full
        font-semibold
        cursor-pointer
        transition
    "
>
    <Zap size={18} />
    Buy Now
</button>

                        </div>

                    </div>

                </div>

                {/* REVIEWS */}

                <div className="mt-16">

                    <h2 className="
                        font-serif
                        text-3xl
                        font-semibold
                        text-stone-900
                        mb-6
                    ">
                        Customer Reviews
                    </h2>

                    {reviews.length > 0 ? (

                        reviews.map(
                            (review) => (

                                <div
                                    key={review._id}
                                    className="
                                        rounded-xl
                                        border
                                        border-stone-200
                                        bg-white
                                        p-5
                                        mb-5
                                    "
                                >

                                    <div className="
                                    flex
                                    items-center
                                    gap-3
                                ">

                                        <img
                                            src={
                                                review.userId
                                                    ?.profileImage
                                            }
                                            alt=""
                                            className="
                                            w-12
                                            h-12
                                            rounded-full
                                            object-cover
                                            border
                                            border-stone-200
                                        "
                                        />

                                        <div>

                                            <h3 className="
                                                font-semibold
                                                text-stone-900
                                            ">
                                                {
                                                    review.userId
                                                        ?.username
                                                }
                                            </h3>

                                            <p className="flex items-center gap-1 text-sm text-amber-700">
                                                <Star size={13} fill="currentColor" />
                                                {
                                                    review.stars
                                                }
                                            </p>

                                        </div>

                                    </div>

                                    <p className="
                                        mt-4
                                        text-stone-600
                                    ">
                                        {
                                            review.content
                                        }
                                    </p>

                                </div>

                            )
                        )

                    ) : (

                        <div className="
                            rounded-xl
                            border
                            border-dashed
                            border-stone-300
                            p-8
                            text-center
                            text-stone-400
                        ">
                            No Reviews Yet
                        </div>

                    )}

                </div>

            </div>
            {
showPaymentModal && (

<div
className="
fixed
inset-0
bg-black/50
flex
items-center
justify-center
z-50
px-4
"
>

<div
className="
bg-white
w-full
max-w-md
rounded-2xl
p-6
border
border-stone-200
"
>

<h2
className="
font-serif
text-2xl
font-semibold
text-stone-900
mb-6
"
>
Choose Payment Method
</h2>

<label
className={`
flex
items-center
gap-3
mb-3
cursor-pointer
rounded-xl
border
p-4
transition
${paymentMethod === "COD" ? "border-amber-700 bg-amber-50" : "border-stone-200"}
`}
>

<input
type="radio"
name="payment"

checked={
paymentMethod
=== "COD"
}

onChange={()=>
setPaymentMethod(
"COD"
)
}
className="accent-amber-700"
/>

<span className="text-stone-700">Cash On Delivery</span>

</label>

<label
className={`
flex
items-center
gap-3
mb-6
cursor-pointer
rounded-xl
border
p-4
transition
${paymentMethod === "ONLINE" ? "border-amber-700 bg-amber-50" : "border-stone-200"}
`}
>

<input
type="radio"
name="payment"

checked={
paymentMethod
=== "ONLINE"
}

onChange={()=>
setPaymentMethod(
"ONLINE"
)
}
className="accent-amber-700"
/>

<span className="text-stone-700">Online Payment (Razorpay)</span>

</label>

<div
className="
flex
gap-3
"
>

<button
onClick={()=>
setShowPaymentModal(
false
)
}
className="
flex-1
border
border-stone-200
py-3
rounded-full
text-stone-600
hover:bg-stone-50
transition
"
>
Cancel
</button>

<button
    onClick={() => {
        if (paymentMethod === "ONLINE") {
            handleBuyNow();
        } else {
            handlePlaceOrder();
        }
    }}
    className="
        flex-1
        bg-amber-700
        hover:bg-amber-800
        text-white
        py-3
        rounded-full
        font-semibold
        cursor-pointer
        transition
    "
>
    Place Order
</button>

</div>

</div>

</div>

)
}
{
showAddressModal && (

<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">

    <div className="bg-white w-full max-w-md rounded-2xl p-6 border border-stone-200">

        <h2 className="font-serif text-2xl font-semibold text-stone-900 mb-4">

            Address Required

        </h2>

        <p className="text-stone-500 mb-6">

            You don't have any saved delivery address.

            Please add an address before placing an order.

        </p>

        <div className="flex gap-3">

            <button
    onClick={() => {

        setShowAddressModal(false);

        navigate("/profile/addresses");

    }}
    className="
        flex-1
        bg-amber-700
        hover:bg-amber-800
        text-white
        py-3
        rounded-full
        font-semibold
        transition
    "
>
    Add Address
</button>

            <button
                onClick={() =>
                    setShowAddressModal(
                        false
                    )
                }
                className="flex-1 border border-stone-200 py-3 rounded-full text-stone-600 hover:bg-stone-50 transition"
            >
                Cancel
            </button>

        </div>

    </div>

</div>

)
}

        </div>
    );

};

export default SingleProduct;