const CartSummary = ({
    total
}) => {

    return (

        <div className="
            bg-white
            p-6
            rounded-xl
            shadow-lg
        ">

            <h2 className="
                text-2xl
                font-bold
            ">
                Order Summary
            </h2>

            <div className="
                flex
                justify-between
                mt-5
            ">

                <span>Total</span>

                <span>
                    ₹{total}
                </span>

            </div>

        </div>
    );
};

export default CartSummary;