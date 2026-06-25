import {
    createSlice,
    createAsyncThunk
}
from "@reduxjs/toolkit";

import {
    toggleWishlist,
    getWishlist,
    removeFromWishlist
}
from "../../api/wishlistApi";

export const fetchWishlist =
createAsyncThunk(

    "wishlist/fetchWishlist",

    async(_,thunkAPI)=>{

        try{

            const response =
            await getWishlist();

            return response.data.data;

        }catch(error){

            return thunkAPI.rejectWithValue(
                error.response.data.message
            );
        }
    }
);

export const addProductToWishlist =
createAsyncThunk(

    "wishlist/addProductToWishlist",

    async(data,thunkAPI)=>{

        try{

            const response =
            await addToWishlist(data);

            return response.data.data;

        }catch(error){

            return thunkAPI.rejectWithValue(
                error.response.data.message
            );
        }
    }
);

const wishlistSlice = createSlice({

    name:"wishlist",

    initialState:{

        wishlist:[],

        loading:false,

        error:null
    },

    reducers:{},

    extraReducers:(builder)=>{

        builder

        .addCase(fetchWishlist.fulfilled,
            (state,action)=>{

            state.wishlist =
            action.payload;
        })

        .addCase(addProductToWishlist.fulfilled,
            (state,action)=>{

            state.wishlist.push(
                action.payload
            );
        });
    }
});

export default wishlistSlice.reducer;