const ReviewCard = ({
    review
}) => {

    return (

        <div className="
            bg-white
            p-5
            rounded-xl
            mb-5
        ">

            <h2 className="
                font-bold
            ">
                {review.user.username}
            </h2>

            <p className="
                mt-3
            ">
                {review.comment}
            </p>

        </div>
    );
};

export default ReviewCard;