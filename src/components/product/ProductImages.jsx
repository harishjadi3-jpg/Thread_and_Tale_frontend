const ProductImages = ({
    images
}) => {

    return (

        <div className="
            grid
            gap-4
        ">

            {
                images.map((image,index)=>(

                    <img
                        key={index}
                        src={image}
                        alt=""
                        className="
                            rounded-xl
                        "
                    />
                ))
            }

        </div>
    );
};

export default ProductImages;