const EmptyState = ({
    title,
    subtitle
}) => {

    return (

        <div className="
            flex
            flex-col
            items-center
            justify-center
            py-20
        ">

            <h2 className="
                text-3xl
                font-bold
            ">
                {title}
            </h2>

            <p className="
                text-gray-500
                mt-3
            ">
                {subtitle}
            </p>

        </div>
    );
};

export default EmptyState;