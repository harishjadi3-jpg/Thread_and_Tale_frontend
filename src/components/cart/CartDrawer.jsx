import {
    X
}
from "lucide-react";

import CartItem
from "./CartItem";

import {
    Link
}
from "react-router-dom";

const CartDrawer = ({

    isOpen,

    onClose,

    cartItems

}) => {

    if(!isOpen){

        return null;
    }

    const total =

    cartItems.reduce(

        (acc,item)=>

        acc + item.price,

        0
    );

    return (

        <div className="
            fixed
            inset-0
            bg-black/50
            z-50
        ">

            <div className="
                absolute
                right-0
                top-0
                h-full
                w-full
                max-w-md
                bg-white
                p-5
                overflow-y-auto
            ">

                <div className="
                    flex
                    justify-between
                    items-center
                    mb-5
                ">

                    <h2 className="
                        text-2xl
                        font-bold
                    ">
                        Shopping Cart
                    </h2>

                    <button
                        onClick={onClose}
                    >
                        <X />
                    </button>

                </div>

                {
                    cartItems.length === 0
                    ?
                    <p>
                        Cart is Empty
                    </p>
                    :
                    cartItems.map((item)=>(

                        <CartItem
                            key={item._id}
                            item={item}
                        />
                    ))
                }

                <div className="
                    mt-10
                    border-t
                    pt-5
                ">

                    <div className="
                        flex
                        justify-between
                        mb-5
                    ">

                        <span className="
                            font-bold
                        ">
                            Total
                        </span>

                        <span className="
                            font-bold
                        ">
                            ₹{total}
                        </span>

                    </div>

                    <Link
                        to="/checkout"
                    >

                        <button
                            className="
                                w-full
                                bg-black
                                text-white
                                py-3
                                rounded-lg
                            "
                        >
                            Checkout
                        </button>

                    </Link>

                </div>

            </div>

        </div>
    );
};

export default CartDrawer;