import {
    createSlice,
    createAsyncThunk
}
from "@reduxjs/toolkit";

import {
    getReviews,
    addReview
}
from "../../api/reviewApi";

export const fetchReviews =
createAsyncThunk(

    "review/fetchReviews",

    async(productId,thunkAPI)=>{

        try{

            const response =
            await getReviews(productId);

            return response.data.data;

        }catch(error){

            return thunkAPI.rejectWithValue(
                error.response.data.message
            );
        }
    }
);

const reviewSlice = createSlice({

    name:"review",

    initialState:{

        reviews:[],

        loading:false,

        error:null
    },

    reducers:{},

    extraReducers:(builder)=>{

        builder

        .addCase(fetchReviews.fulfilled,
            (state,action)=>{

            state.reviews =
            action.payload;
        });
    }
});

export default reviewSlice.reducer;