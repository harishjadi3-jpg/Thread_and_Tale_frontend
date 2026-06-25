import API from "./axios";

export const addReview =
(formData)=>{

    return API.post(
        "/reviewtoproduct",
        formData,
        {
            headers:{
                "Content-Type":
                "multipart/form-data"
            }
        }
    );
};

export const getReviews =
(productId)=>{

    return API.get(
        `/getproductreviews?productId=${productId}`
    );
};

export const likeReview =
(reviewId)=>{

    return API.post(
        "/likereview",
        { reviewId }
    );
};

export const dislikeReview =
(reviewId)=>{

    return API.post(
        "/dislikereview",
        { reviewId }
    );
};