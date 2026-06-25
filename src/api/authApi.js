import API from "./axios";

export const registerUser = (formData)=>{

    return API.post(
        "/register",
        formData,
        {
            headers:{
                "Content-Type":
                "multipart/form-data"
            }
        }
    );
};

export const loginWithEmail =
(data)=>{

    return API.post(
        "/logginwithemail",
        data
    );
};

export const loginWithPhone =
(data)=>{

    return API.post(
        "/logginwithphonenumber",
        data
    );
};

export const verifyOtp =
(data)=>{

    return API.post(
        "/verifyOtp",
        data
    );
};

export const logoutUser = ()=>{

    return API.post("/logout");
};

export const getCurrentUser = ()=>{

    return API.get("/getuser");
};