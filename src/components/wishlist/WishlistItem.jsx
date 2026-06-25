const WishlistItem = ({
    item
}) => {

    return (

        <div className="
            bg-white
            p-5
            rounded-xl
            flex
            justify-between
            items-center
        ">

            <h2>
                {item.title}
            </h2>

            <img
                src={item.images[0]}
                alt=""
                className="
                    w-20
                    h-20
                    rounded-lg
                    object-cover
                "
            />

        </div>
    );
};

export default WishlistItem;