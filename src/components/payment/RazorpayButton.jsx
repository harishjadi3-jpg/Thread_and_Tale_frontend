import {
    createRazorpayOrder,
    verifyPayment
}
from "../../api/paymentApi";

const RazorpayButton = ({
    amount
}) => {

    const handlePayment =
    async()=>{

        const {
            data
        } = await createRazorpayOrder({
            amount
        });

        const options = {

            key:
            import.meta.env
            .VITE_RAZORPAY_KEY,

            amount:data.amount,

            currency:"INR",

            order_id:data.id,

            handler:
            async(response)=>{

                await verifyPayment({
                    razorpay_order_id:
                    response.razorpay_order_id,

                    razorpay_payment_id:
                    response.razorpay_payment_id,

                    razorpay_signature:
                    response.razorpay_signature
                });

                alert(
                    "Payment Successful"
                );
            }
        };

        const razorpay =
        new window.Razorpay(
            options
        );

        razorpay.open();
    };

    return (

        <button

            onClick={handlePayment}

            className="
                bg-green-500
                text-white
                px-5
                py-3
                rounded-lg
            "
        >
            Pay Now
        </button>
    );
};

export default RazorpayButton;