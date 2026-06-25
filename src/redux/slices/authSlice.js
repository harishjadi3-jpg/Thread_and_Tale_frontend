import {
    createSlice,
    createAsyncThunk
}
from "@reduxjs/toolkit";

import {
    loginWithEmail,
    loginWithPhone,
    registerUser,
    verifyOtp,
    logoutUser,
    getCurrentUser
}
from "../../api/authApi";

export const register =
createAsyncThunk(

    "auth/register",

    async(formData,thunkAPI)=>{

        try{

            const response =
            await registerUser(formData);

            return response.data.data;

        }catch(error){

            return thunkAPI.rejectWithValue(
                error.response.data.message
            );
        }
    }
);

export const loginEmail =
createAsyncThunk(

    "auth/loginEmail",

    async(data,thunkAPI)=>{

        try{

            const response =
            await loginWithEmail(data);

            localStorage.setItem(
                "accessToken",
                response.data.data.accessToken
            );

            return response.data.data;

        }catch(error){

            return thunkAPI.rejectWithValue(
                error.response.data.message
            );
        }
    }
);

export const loginPhone =
createAsyncThunk(

    "auth/loginPhone",

    async(data,thunkAPI)=>{

        try{

            const response =
            await loginWithPhone(data);

            return response.data.data;

        }catch(error){

            return thunkAPI.rejectWithValue(
                error.response.data.message
            );
        }
    }
);

export const verifyOTP =
createAsyncThunk(

    "auth/verifyOTP",

    async(data,thunkAPI)=>{

        try{

            const response =
            await verifyOtp(data);

            localStorage.setItem(
                "accessToken",
                response.data.data.accessToken
            );

            return response.data.data;

        }catch(error){

            return thunkAPI.rejectWithValue(
                error.response.data.message
            );
        }
    }
);

export const fetchCurrentUser =
createAsyncThunk(

    "auth/fetchCurrentUser",

    async(_,thunkAPI)=>{

        try{

            const response =
            await getCurrentUser();

            return response.data.data;

        }catch(error){

            return thunkAPI.rejectWithValue(
                error.response.data.message
            );
        }
    }
);

export const logout =
createAsyncThunk(

    "auth/logout",

    async(_,thunkAPI)=>{

        try{

            await logoutUser();

            localStorage.removeItem(
                "accessToken"
            );

        }catch(error){

            return thunkAPI.rejectWithValue(
                error.response.data.message
            );
        }
    }
);

const authSlice = createSlice({

    name:"auth",

    initialState:{

        user:null,

        loading:false,

        error:null,

        isAuthenticated:false
    },

    reducers:{},

    extraReducers:(builder)=>{

        builder

        .addCase(register.pending,
            (state)=>{

            state.loading = true;
        })

        .addCase(register.fulfilled,
            (state)=>{

            state.loading = false;
        })

        .addCase(register.rejected,
            (state,action)=>{

            state.loading = false;

            state.error = action.payload;
        })

        .addCase(loginEmail.fulfilled,
            (state,action)=>{

            state.user =
            action.payload.user;

            state.isAuthenticated =
            true;
        })

        .addCase(loginPhone.fulfilled,
            (state)=>{

            state.loading = false;
        })

        .addCase(verifyOTP.fulfilled,
            (state,action)=>{

            state.user =
            action.payload.user;

            state.isAuthenticated =
            true;
        })

        .addCase(fetchCurrentUser.fulfilled,
            (state,action)=>{

            state.user =
            action.payload;

            state.isAuthenticated =
            true;
        })

        .addCase(logout.fulfilled,
            (state)=>{

            state.user = null;

            state.isAuthenticated =
            false;
        });
    }
});

export default authSlice.reducer;