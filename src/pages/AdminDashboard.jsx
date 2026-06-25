import MainLayout
from "../layouts/MainLayout";

const AdminDashboard = () => {

    return (

        <MainLayout>

            <h1 className="
                text-4xl
                font-bold
                mb-10
            ">
                Admin Dashboard
            </h1>

            <div className="
                grid
                md:grid-cols-3
                gap-6
            ">

                <div className="
                    bg-white
                    p-10
                    rounded-xl
                ">
                    Total Users
                </div>

                <div className="
                    bg-white
                    p-10
                    rounded-xl
                ">
                    Total Orders
                </div>

                <div className="
                    bg-white
                    p-10
                    rounded-xl
                ">
                    Total Sales
                </div>

            </div>

        </MainLayout>
    );
};

export default AdminDashboard;