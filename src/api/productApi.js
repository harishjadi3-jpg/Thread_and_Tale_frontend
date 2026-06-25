import API from "./axios";

export const getAllProducts = ()=>{

    return API.get(
        "/getallproducts"
    );
};




export const getProductById =
(id) => {

    return API.get(
        `/getproductbyid/${id}`
    );

};

export const searchProducts =
(keyword)=>{
    console.log("This is searchcing keyword",keyword)
    return API.get(
        `/searchproducts?keyword=${keyword}`
    );
};

export const filterProducts =
(query)=>{

    return API.get(
        `/filterproducts?${query}`
    );
};

export const sortProducts =
(sortBy)=>{

    return API.get(
        `/sortproducts?sort=${sortBy}`
    );
};

export const getFeaturedProducts =
()=>{

    return API.get(
        "/getfeaturedproducts"
    );
};

export const orderProduct =
(data)=>{
    console.log("This is order product api", data);

    return API.post(
        "/orderproduct",
        data
    );

};



export const getProductsByCategory = (category) => {
    return API.get(
        `/get-products/${category}`
    );
};