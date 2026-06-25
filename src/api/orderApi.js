import API from "./axios";

export const checkOrdersHistory =
()=>{

    return API.get(
        "/checkordershistory"
    );
};

export const getOrderById =
(orderId)=>{

    return API.get(
        `/getorderbyid?orderId=${orderId}`
    );
};

export const cancelOrder =
(orderId)=>{

    return API.post(
        "/cancellorderedproduct",
        { orderId }
    );
};

export const trackOrder =
(orderId)=>{

    return API.get(
        `/trackorder?orderId=${orderId}`
    );
};




export const getOrders = () => {

    return API.get(
        "/checkordershistory"
    );

};



export const returnOrder = (
    orderId
) => {

    return API.post(
        "/returnorderedproduct",
        {
            orderId
        }
    );

};

export const replaceOrder = (
    orderId
) => {

    return API.post(
        "/replaceorderedproduct",
        {
            orderId
        }
    );

};