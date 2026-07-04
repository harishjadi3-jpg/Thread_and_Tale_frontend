import {
    Routes,
    Route,
    Navigate,
    useLocation
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import Products from "../pages/Products";
import SingleProduct from "../pages/SingleProduct";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Cart from "../pages/Cart";
import Wishlist from "../pages/Wishlist";
import Orders from "../pages/Orders";
import Checkout from "../pages/Checkout";
import Profile from "../pages/Profile";
import Addresses from "../pages/Addresses";
import AdminDashboard from "../pages/AdminDashboard";
import CategoryProducts from "../pages/CategoryProducts";
import AddProduct from "../pages/AddProduct";
const ProtectedRoute = ({ children }) => {

    const token =
        localStorage.getItem("accessToken");


    const location =
        useLocation();


    return token ? (
        children
    ) : (
        <Navigate
            to="/login"
            state={{
                from: location
            }}
            replace
        />
    );

};

const AdminRoute = ({ children }) => {

    const user =
        JSON.parse(
            localStorage.getItem("user")
        );

    return user?.role === "admin"
        ? children
        : <Navigate to="/" replace />;
};

const AppRoutes = () => {

    return (

        <Routes>

            {/* MAIN LAYOUT ROUTES */}

            <Route element={<MainLayout />}>

                <Route
                    path="/"
                    element={<Products/>}
                />
                <Route
                    path="/addProduct"
                    element={<AddProduct/>}
                />

                <Route
                    path="/products"
                    element={<Products />}
                />

                <Route
                    path="/product/:id"
                    element={<SingleProduct />}
                />

                <Route
                    path="/category/:category"
                    element={<CategoryProducts />}
                />

                <Route
                    path="/cart"
                    element={<Cart />}
                />

                <Route
                    path="/wishlist"
                    element={
                        <ProtectedRoute>
                            <Wishlist />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/orders"
                    element={
                        <ProtectedRoute>
                            <Orders />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/checkout"
                    element={
                        <ProtectedRoute>
                            <Checkout />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/profile/addresses"
                    element={
                        <ProtectedRoute>
                            <Addresses />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin"
                    element={
                        <AdminRoute>
                            <AdminDashboard />
                        </AdminRoute>
                    }
                />

            </Route>

            {/* AUTH ROUTES */}

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />

            {/* FALLBACK */}

            <Route
                path="*"
                element={
                    <Navigate
                        to="/"
                        replace
                    />
                }
            />

        </Routes>

    );
};

export default AppRoutes;