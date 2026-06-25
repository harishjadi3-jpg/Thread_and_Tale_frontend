import API from "./axios";

export const addToCart =
(data)=>{
    console.log("This is add to cart api to data", data);
    let details={}
    details.userId = localStorage.getItem("user");
    details.productId = data._id;
    details.quantity = 1;
    details.size = data.details[0].size;
    details.color = data.details[0].color;
    details.gender = data.details[0].gender;
    console.log("This is add to cart api", details);
    return API.post(
        "/addtocart",
        details
    );
};


export const addToCartFromWishList =
(data)=>{
    console.log("This is add to cart api to data from whishlist", data.productId);
    let details={}
    details.userId = localStorage.getItem("user");
    details.productId = data.productId._id;
    details.quantity = 1;
    details.size = data.productId.details[0].size;
    details.color = data.productId.details[0].color;
    details.gender = data.productId.details[0].gender;
    console.log("This is add to cart api", details);
    return API.post(
        "/addtocart",
        details
    );
};



export const removeFromCart =
(productId)=>{

    return API.delete(
        "/removefromcart",
        {
            data:{ productId }
        }
    );
};

export const getCart = ()=>{

    return API.get("/getcart");
};

export const clearCart = ()=>{

    return API.delete(
        "/clearcart"
    );
};

export const orderCartProducts =
(data)=>{

    return API.post(
        "/orderCartProducts",
        data
    );
};