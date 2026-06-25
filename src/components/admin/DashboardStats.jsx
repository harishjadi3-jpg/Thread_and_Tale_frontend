const DashboardStats = ({
    users,
    orders,
    sales
}) => {

    return (

        <div className="
            grid
            md:grid-cols-3
            gap-6
        ">

            <div className="
                bg-white
                p-8
                rounded-xl
                shadow-md
            ">

                <h2 className="
                    text-lg
                    text-gray-500
                ">
                    Total Users
                </h2>

                <p className="
                    text-4xl
                    font-bold
                    mt-3
                ">
                    {users}
                </p>

            </div>

            <div className="
                bg-white
                p-8
                rounded-xl
                shadow-md
            ">

                <h2 className="
                    text-lg
                    text-gray-500
                ">
                    Total Orders
                </h2>

                <p className="
                    text-4xl
                    font-bold
                    mt-3
                ">
                    {orders}
                </p>

            </div>

            <div className="
                bg-white
                p-8
                rounded-xl
                shadow-md
            ">

                <h2 className="
                    text-lg
                    text-gray-500
                ">
                    Total Sales
                </h2>

                <p className="
                    text-4xl
                    font-bold
                    mt-3
                ">
                    ₹{sales}
                </p>

            </div>

        </div>
    );
};

export default DashboardStats;