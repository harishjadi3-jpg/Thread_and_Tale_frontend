import {
    createSlice,
    createAsyncThunk
}
from "@reduxjs/toolkit";

import {
    checkOrdersHistory
}
from "../../api/orderApi";

export const fetchOrders =
createAsyncThunk(

    "orders/fetchOrders",

    async(_,thunkAPI)=>{

        try{

            const response =
            await checkOrdersHistory();

            return response.data.data;

        }catch(error){

            return thunkAPI.rejectWithValue(
                error.response.data.message
            );
        }
    }
);

const orderSlice = createSlice({

    name:"order",

    initialState:{

        orders:[],

        loading:false,

        error:null
    },

    reducers:{},

    extraReducers:(builder)=>{

        builder

        .addCase(fetchOrders.fulfilled,
            (state,action)=>{

            state.orders =
            action.payload;
        });
    }
});

export default orderSlice.reducer;