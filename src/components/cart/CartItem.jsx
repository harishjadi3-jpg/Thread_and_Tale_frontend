const CartItem = ({
    item
}) => {

    return (

        <div className="
            flex
            justify-between
            items-center
            bg-white
            p-5
            rounded-xl
            mb-5
        ">

            <div>

                <h2 className="
                    font-bold
                ">
                    {item.title}
                </h2>

                <p>
                    ₹{item.price}
                </p>

            </div>

            <img
                src={item.images[0]}
                alt=""
                className="
                    w-20
                    h-20
                    object-cover
                    rounded-lg
                "
            />

        </div>
    );
};

export default CartItem;