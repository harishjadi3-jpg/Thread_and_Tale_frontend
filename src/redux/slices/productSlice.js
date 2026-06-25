import {
    createSlice,
    createAsyncThunk
} from "@reduxjs/toolkit";

import {
    getAllProducts,
    getProductById,
    searchProducts
} from "../../api/productApi";

/* ==============================
   FETCH ALL PRODUCTS
================================= */
export const fetchProducts =
createAsyncThunk(
    "products/fetchProducts",

    async (_, thunkAPI) => {
        try {

            const response =
                await getAllProducts();

            return response.data.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(
                error.response?.data?.message
            );
        }
    }
);

/* ==============================
   FETCH SINGLE PRODUCT
================================= */
export const fetchSingleProduct =
createAsyncThunk(
    "products/fetchSingleProduct",

    async (id, thunkAPI) => {
        try {

            const response =
                await getProductById(id);

            return response.data.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(
                error.response?.data?.message
            );
        }
    }
);

/* ==============================
   SEARCH PRODUCTS
================================= */
export const searchAllProducts =
createAsyncThunk(
    "products/searchAllProducts",

    async (keyword, thunkAPI) => {
        try {

            const response =
                await searchProducts(keyword);

            return response.data.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(
                error.response?.data?.message
            );
        }
    }
);

/* ==============================
   SLICE
================================= */
const productSlice = createSlice({

    name: "product",

    initialState: {

        products: [],

        singleProduct: null,

        loading: false,

        error: null

    },

    reducers: {

        setProducts: (state, action) => {

            state.products =
                action.payload;

        }

    },

    extraReducers: (builder) => {

        builder

            /* ==========================
               FETCH PRODUCTS
            ========================== */

            .addCase(
                fetchProducts.pending,
                (state) => {

                    state.loading = true;

                    state.error = null;

                }
            )

            .addCase(
                fetchProducts.fulfilled,
                (state, action) => {

                    state.loading = false;

                    state.products =
                        action.payload;

                }
            )

            .addCase(
                fetchProducts.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error =
                        action.payload;

                }
            )

            /* ==========================
               FETCH SINGLE PRODUCT
            ========================== */

            .addCase(
                fetchSingleProduct.pending,
                (state) => {

                    state.loading = true;

                    state.error = null;

                }
            )

            .addCase(
                fetchSingleProduct.fulfilled,
                (state, action) => {

                    state.loading = false;

                    state.singleProduct =
                        action.payload;

                }
            )

            .addCase(
                fetchSingleProduct.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error =
                        action.payload;

                }
            )

            /* ==========================
               SEARCH PRODUCTS
            ========================== */

            .addCase(
                searchAllProducts.pending,
                (state) => {

                    state.loading = true;

                    state.error = null;

                }
            )

            .addCase(
                searchAllProducts.fulfilled,
                (state, action) => {

                    state.loading = false;

                    state.products =
                        action.payload;

                }
            )

            .addCase(
                searchAllProducts.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error =
                        action.payload;

                }
            );

    }

});

export const {
    setProducts
} = productSlice.actions;

export default productSlice.reducer;