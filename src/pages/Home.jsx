import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ProductGrid from "../components/product/ProductGrid";
import Loader from "../components/common/Loader";

import { fetchProducts } from "../redux/slices/productSlice";

const Home = () => {
    const dispatch = useDispatch();

    const { products, loading } = useSelector(
        (state) => state.product
    );

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1
                className="
                    text-4xl
                    font-bold
                    mb-10
                "
            >
                Featured Products
            </h1>

            {loading ? (
                <Loader />
            ) : (
                <ProductGrid
                    products={products}
                />
            )}
        </div>
    );
};

export default Home;