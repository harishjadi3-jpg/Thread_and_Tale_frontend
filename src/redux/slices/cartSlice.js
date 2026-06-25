import {
    createSlice,
    createAsyncThunk
}
from "@reduxjs/toolkit";

import {
    addToCart,
    getCart,
    removeFromCart,
    clearCart
}
from "../../api/cartApi";

export const addProductToCart =
createAsyncThunk(

    "cart/addProductToCart",

    async(data,thunkAPI)=>{

        try{

            const response =
            await addToCart(data);

            return response.data.data;

        }catch(error){

            return thunkAPI.rejectWithValue(
                error.response.data.message
            );
        }
    }
);

export const fetchCart =
createAsyncThunk(

    "cart/fetchCart",

    async(_,thunkAPI)=>{

        try{

            const response =
            await getCart();

            return response.data.data;

        }catch(error){

            return thunkAPI.rejectWithValue(
                error.response.data.message
            );
        }
    }
);

export const removeProductFromCart =
createAsyncThunk(

    "cart/removeProductFromCart",

    async(productId,thunkAPI)=>{

        try{

            await removeFromCart(productId);

            return productId;

        }catch(error){

            return thunkAPI.rejectWithValue(
                error.response.data.message
            );
        }
    }
);

const cartSlice = createSlice({

    name:"cart",

    initialState:{

        cartItems:[],

        loading:false,

        error:null
    },

    reducers:{},

    extraReducers:(builder)=>{

        builder

        .addCase(fetchCart.fulfilled,
            (state,action)=>{

            state.cartItems =
            action.payload;
        })

        .addCase(addProductToCart.fulfilled,
            (state,action)=>{

            state.cartItems.push(
                action.payload
            );
        })

        .addCase(removeProductFromCart.fulfilled,
            (state,action)=>{

            state.cartItems =
            state.cartItems.filter(
                item=>
                item._id!==action.payload
            );
        });
    }
});

export default cartSlice.reducer;