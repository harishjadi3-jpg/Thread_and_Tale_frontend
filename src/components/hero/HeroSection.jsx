import {
    Link
}
from "react-router-dom";

const HeroSection = () => {

    return (

        <div className="
            bg-black
            text-white
            rounded-3xl
            p-10
            flex
            flex-col
            md:flex-row
            items-center
            justify-between
            mb-10
        ">

            <div>

                <h1 className="
                    text-5xl
                    font-bold
                ">
                    Discover Latest Fashion
                </h1>

                <p className="
                    mt-5
                    text-gray-300
                ">
                    Best Ecommerce Store
                </p>

                <Link
                    to="/products"
                    className="
                        inline-block
                        mt-6
                        bg-white
                        text-black
                        px-6
                        py-3
                        rounded-lg
                    "
                >
                    Shop Now
                </Link>

            </div>

            <img
                src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518"
                alt=""
                className="
                    w-96
                    rounded-xl
                    mt-10
                    md:mt-0
                "
            />

        </div>
    );
};

export default HeroSection;