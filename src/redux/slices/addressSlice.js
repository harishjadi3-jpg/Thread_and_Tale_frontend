import {
    createSlice,
    createAsyncThunk
}
from "@reduxjs/toolkit";

import {
    getAddresses,
    addAddress
}
from "../../api/addressApi";

export const fetchAddresses =
createAsyncThunk(

    "address/fetchAddresses",

    async(_,thunkAPI)=>{

        try{

            const response =
            await getAddresses();

            return response.data.data;

        }catch(error){

            return thunkAPI.rejectWithValue(
                error.response.data.message
            );
        }
    }
);

export const createAddress =
createAsyncThunk(

    "address/createAddress",

    async(data,thunkAPI)=>{

        try{

            const response =
            await addAddress(data);

            return response.data.data;

        }catch(error){

            return thunkAPI.rejectWithValue(
                error.response.data.message
            );
        }
    }
);

const addressSlice = createSlice({

    name:"address",

    initialState:{

        addresses:[],

        loading:false,

        error:null
    },

    reducers:{},

    extraReducers:(builder)=>{

        builder

        .addCase(fetchAddresses.fulfilled,
            (state,action)=>{

            state.addresses =
            action.payload;
        })

        .addCase(createAddress.fulfilled,
            (state,action)=>{

            state.addresses.push(
                action.payload
            );
        });
    }
});

export default addressSlice.reducer;