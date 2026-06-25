import { useState }
from "react";

import {
    addReview
}
from "../../api/reviewApi";

const ReviewForm = ({
    productId
}) => {

    const [comment,setComment] =
    useState("");

    const [rating,setRating] =
    useState(5);

    const submitReview =
    async()=>{

        const formData =
        new FormData();

        formData.append(
            "productId",
            productId
        );

        formData.append(
            "comment",
            comment
        );

        formData.append(
            "rating",
            rating
        );

        await addReview(formData);
    };

    return (

        <div className="
            mt-10
        ">

            <textarea

                value={comment}

                onChange={(e)=>
                    setComment(
                        e.target.value
                    )
                }

                className="
                    w-full
                    border
                    p-3
                    rounded-lg
                "
            />

            <button

                onClick={submitReview}

                className="
                    mt-4
                    bg-black
                    text-white
                    px-5
                    py-3
                    rounded-lg
                "
            >
                Submit Review
            </button>

        </div>
    );
};

export default ReviewForm;