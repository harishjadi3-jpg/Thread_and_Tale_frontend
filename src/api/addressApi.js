import API from "./axios";

export const addAddress = async (data) => {
    const response = await API.post(
        "/address/add-address",
        data
    );

    return response.data;
};

export const getAddresses =
()=>{

    return API.get(
        "/getaddresses"
    );
};

export const deleteAddress = async (addressId) => {
    const response = await API.delete(
        "/address/delete-address",
        {
            data: {
                addressId
            }
        }
    );

    return response.data;
};

export const updateAddress =
(data)=>{

    return API.patch(
        "/updateaddress",
        data
    );
};

export const setDefaultAddress = async (addressId) => {
    console.log("Try try ",addressId)
    const response = await API.patch(
        `/address/set-default/${addressId}`
    );

    return response.data;
};