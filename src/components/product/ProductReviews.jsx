import {
    useEffect
}
from "react";

import {
    useDispatch,
    useSelector
}
from "react-redux";

import {
    fetchReviews
}
from "../../redux/slices/reviewSlice";

import ReviewForm
from "../reviews/ReviewForm";

import ReviewList
from "../reviews/ReviewList";

import Loader
from "../common/Loader";

const ProductReviews = ({
    productId
}) => {

    const dispatch =
    useDispatch();

    const {
        reviews,
        loading
    } = useSelector(
        state=>state.review
    );

    useEffect(()=>{

        dispatch(
            fetchReviews(productId)
        );

    },[dispatch,productId]);

    return (

        <div className="
            mt-16
        ">

            <h2 className="
                text-3xl
                font-bold
                mb-8
            ">
                Product Reviews
            </h2>

            <ReviewForm
                productId={productId}
            />

            {
                loading
                ?
                <Loader />
                :
                reviews.length > 0
                ?
                <ReviewList
                    reviews={reviews}
                />
                :
                <p className="
                    mt-10
                    text-gray-500
                ">
                    No Reviews Yet
                </p>
            }

        </div>
    );
};

export default ProductReviews;