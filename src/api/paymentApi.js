import API from "./axios";

export const createRazorpayOrder =
(amount)=>{

    return API.post(
        "/create-razorpay-order",
        {
            amount
        }
    );

};

export const verifyPayment =
(data)=>{

    return API.post(
        "/verify-razorpay-payment",
        data
    );

};