const OrdersTable = ({
    orders
}) => {

    return (

        <div className="
            overflow-x-auto
            bg-white
            rounded-xl
            shadow-md
        ">

            <table className="
                w-full
            ">

                <thead className="
                    bg-black
                    text-white
                ">

                    <tr>

                        <th className="p-4">
                            Order ID
                        </th>

                        <th className="p-4">
                            User
                        </th>

                        <th className="p-4">
                            Amount
                        </th>

                        <th className="p-4">
                            Status
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {
                        orders.map((order)=>(

                            <tr
                                key={order._id}
                                className="
                                    border-b
                                "
                            >

                                <td className="
                                    p-4
                                ">
                                    {order._id}
                                </td>

                                <td className="
                                    p-4
                                ">
                                    {
                                        order.user
                                        ?.username
                                    }
                                </td>

                                <td className="
                                    p-4
                                ">
                                    ₹{
                                        order.totalPrice
                                    }
                                </td>

                                <td className="
                                    p-4
                                ">
                                    {
                                        order.orderStatus
                                    }
                                </td>

                            </tr>
                        ))
                    }

                </tbody>

            </table>

        </div>
    );
};

export default OrdersTable;