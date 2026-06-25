import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../redux/slices/authSlice";
import productReducer from "../redux/slices/productSlice";
import cartReducer from "../redux/slices/cartSlice";
import wishlistReducer from "../redux/slices/wishlistSlice";
import orderReducer from "../redux/slices/orderSlice";
import reviewReducer from "../redux/slices/reviewSlice";
import addressReducer from "../redux/slices/addressSlice";

export const store = configureStore({

    reducer:{

        auth:authReducer,

        product:productReducer,

        cart:cartReducer,

        wishlist:wishlistReducer,

        order:orderReducer,

        review:reviewReducer,

        address:addressReducer
    }
});