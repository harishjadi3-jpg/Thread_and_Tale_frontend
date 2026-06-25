import {
    Link
}
from "react-router-dom";

const MobileMenu = ({
    open,
    setOpen
}) => {

    if(!open){

        return null;
    }

    return (

        <div className="
            md:hidden
            bg-white
            px-4
            py-5
            flex
            flex-col
            gap-4
        ">

            <Link
                to="/products"
                onClick={()=>
                    setOpen(false)
                }
            >
                Products
            </Link>

            <Link
                to="/cart"
                onClick={()=>
                    setOpen(false)
                }
            >
                Cart
            </Link>

            <Link
                to="/wishlist"
                onClick={()=>
                    setOpen(false)
                }
            >
                Wishlist
            </Link>

            <Link
                to="/profile"
                onClick={()=>
                    setOpen(false)
                }
            >
                Profile
            </Link>

        </div>
    );
};

export default MobileMenu;