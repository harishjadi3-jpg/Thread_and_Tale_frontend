import API from "./axios";


export const toggleWishlist =
(data)=>{
    const temp={}
    temp.productId=data
    

    return API.post(
        "/toggle-wishlist",
        temp
    );
}; 
export const getWishlist =
()=>{

    return API.get(
        "/getwishlist"
    );
};

export const removeFromWishlist =
(productId)=>{

    return API.delete(
        "/removefromwishlist",
        {
            data:{ productId }
        }
    );
};

export const moveWishlistToCart =
(productId)=>{
    console.log("This is products from ",productId)

    return API.post(
        "/movewishlisttocart",
        { productId }
    );
};