const ProductDetails = ({
    product
}) => {

    return (

        <div>

            <h1 className="
                text-4xl
                font-bold
            ">
                {product.title}
            </h1>

            <p className="
                mt-5
                text-gray-500
            ">
                {product.description}
            </p>

            <h2 className="
                text-3xl
                mt-5
            ">
                ₹{product.price}
            </h2>

        </div>
    );
};

export default ProductDetails;