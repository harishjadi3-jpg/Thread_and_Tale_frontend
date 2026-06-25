import ReviewCard
from "./ReviewCard";

const ReviewList = ({
    reviews
}) => {

    return (

        <div className="
            mt-10
        ">

            {
                reviews.map((review)=>(

                    <ReviewCard
                        key={review._id}
                        review={review}
                    />
                ))
            }

        </div>
    );
};

export default ReviewList;