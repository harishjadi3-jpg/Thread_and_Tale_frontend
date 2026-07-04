import API from "./axios";


// profile

export const getCurrentUser = () =>
    API.get("/profile");



// username

export const updateUsername = (data) =>
    API.patch(
        "/updateusername",
        data
    );



// profile image

export const updateProfileImage = (data) => {

    console.log(
        "FINAL URL:",
        API.defaults.baseURL + "/updateprofileimage"
    );

    for (let pair of data.entries()) {
        console.log(pair[0], pair[1]);
    }

    return API.patch(
        "/updateprofileimage",
        data,
        {
            headers:{
                "Content-Type":"multipart/form-data"
            }
        }
    );

};



// phone

export const updatePhoneNumber = (data)=>
    API.patch(
        "/updatephonenumber",
        data
    );



// bio

export const updateBio = (data)=>
    API.patch(
        "/updatebio",
        data
    );



// dob

export const updateDateOfBirth = (data)=>
    API.patch(
        "/updatedateofbirth",
        data
    );



// gender

export const updateGender = (data)=>
    API.patch(
        "/updategender",
        data
    );



// EMAIL OTP

export const sendEmailOtp = (email)=>
    API.post(
        "/sendotptoupdateemail",
        {email}
    );


export const verifyEmailOtp = (data)=>
    API.post(
        "/enterotptoverifyemail",
        data
    );


export const updateEmail = (data)=>
    API.patch(
        "/updateemail",
        data
    );



// admin

export const makeAdmin = (data)=>
    API.post(
        "/makeadmin",
        data
    );