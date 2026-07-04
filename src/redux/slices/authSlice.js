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



/* ==============================
   REGISTER USER
================================= */

export const register =
createAsyncThunk(

    "auth/register",

    async(formData, thunkAPI)=>{

        try{

            const response =
            await registerUser(formData);

            return response.data.data;

        }
        catch(error){

            return thunkAPI.rejectWithValue(
                error.response?.data?.message
            );
        }
    }
);



/* ==============================
   LOGIN EMAIL
================================= */

export const loginEmail =
createAsyncThunk(

    "auth/loginEmail",

    async(data, thunkAPI)=>{

        try{

            const response =
            await loginWithEmail(data);


            console.log(
                "DEPLOY LOGIN RESPONSE:",
                response.data
            );


            console.log(
                "TOKEN:",
                response.data.data.accessToken
            );


            localStorage.setItem(
                "accessToken",
                response.data.data.accessToken
            );


            console.log(
                "STORED TOKEN:",
                localStorage.getItem("accessToken")
            );


            return response.data.data;

        }
        catch(error){

            console.log(
                "LOGIN ERROR:",
                error
            );

            return thunkAPI.rejectWithValue(
                error.response?.data?.message
            );
        }
    }
);


/* ==============================
   LOGIN PHONE
================================= */

export const loginPhone =
createAsyncThunk(

    "auth/loginPhone",

    async(data, thunkAPI)=>{

        try{

            const response =
            await loginWithPhone(data);

            return response.data.data;

        }
        catch(error){

            return thunkAPI.rejectWithValue(
                error.response?.data?.message
            );
        }
    }
);



/* ==============================
   VERIFY OTP LOGIN
================================= */

export const verifyOTP =
createAsyncThunk(

    "auth/verifyOTP",

    async(data, thunkAPI)=>{

        try{


            const response =
            await verifyOtp(data);



            localStorage.setItem(
                "accessToken",
                response.data.data.accessToken
            );


            return response.data.data;

        }
        catch(error){

            return thunkAPI.rejectWithValue(
                error.response?.data?.message
            );
        }
    }
);




/* ==============================
   GET LOGGED USER
================================= */

export const fetchCurrentUser =
createAsyncThunk(

    "auth/fetchCurrentUser",

    async(_, thunkAPI)=>{

        try{

            const response =
            await getCurrentUser();


            return response.data.data;

        }
        catch(error){


            localStorage.removeItem(
                "accessToken"
            );


            return thunkAPI.rejectWithValue(
                error.response?.data?.message
            );
        }
    }
);





/* ==============================
   LOGOUT
================================= */

export const logout =
createAsyncThunk(

    "auth/logout",

    async(_, thunkAPI)=>{

        try{

            await logoutUser();


            localStorage.removeItem(
                "accessToken"
            );

        }
        catch(error){

            localStorage.removeItem(
                "accessToken"
            );


            return thunkAPI.rejectWithValue(
                error.response?.data?.message
            );
        }
    }
);





/* ==============================
   INITIAL STATE
================================= */


const initialState = {


    user:null,


    loading:false,


    error:null,


    isAuthenticated:
    !!localStorage.getItem(
        "accessToken"
    )
};






const authSlice =
createSlice({


name:"auth",


initialState,


reducers:{},



extraReducers:(builder)=>{


builder



/* REGISTER */

.addCase(
register.pending,

(state)=>{

    state.loading = true;

})



.addCase(
register.fulfilled,

(state)=>{

    state.loading = false;

})



.addCase(
register.rejected,

(state,action)=>{

    state.loading=false;

    state.error =
    action.payload;

})





/* EMAIL LOGIN */

.addCase(
loginEmail.fulfilled,

(state,action)=>{


    state.loading=false;


    state.user =
    action.payload.user;


    state.isAuthenticated =
    true;

})






/* PHONE OTP REQUEST */

.addCase(
loginPhone.fulfilled,

(state)=>{


    state.loading=false;


})






/* OTP VERIFY LOGIN */

.addCase(
verifyOTP.fulfilled,

(state,action)=>{


    state.user =
    action.payload.user;



    state.isAuthenticated =
    true;


})







/* REFRESH USER */


.addCase(
fetchCurrentUser.fulfilled,

(state,action)=>{


    state.user =
    action.payload;



    state.isAuthenticated =
    true;


})



.addCase(
fetchCurrentUser.rejected,

(state)=>{


    state.user=null;


    state.isAuthenticated=false;


})







/* LOGOUT */


.addCase(
logout.fulfilled,

(state)=>{


    state.user=null;


    state.isAuthenticated=false;


});



}

});



export default authSlice.reducer;