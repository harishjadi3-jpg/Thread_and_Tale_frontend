// src/components/layout/Navbar.jsx

import {
  ShoppingCart,
  Heart,
  Menu,
  X,
  Sparkles,
  MapPin,
  ClipboardList,
} from "lucide-react";


import {
  Link,
  useLocation
} from "react-router-dom";


import {
  useSelector,
  useDispatch
} from "react-redux";


import {
  useState,
  useEffect
} from "react";


import MobileMenu
from "./MobileMenu";


import {
  logout,
  fetchCurrentUser
}
from "../../redux/slices/authSlice";



const Navbar = () => {


const location =
useLocation();


const dispatch =
useDispatch();


const [open,setOpen] =
useState(false);



const {
  user,
  isAuthenticated
} = useSelector(
  (state)=>state.auth
);



const {cartItems} =
useSelector(
  (state)=>state.cart
);



const {wishlist} =
useSelector(
  (state)=>state.wishlist
);





// ================================
// FETCH USER WHEN PAGE LOADS
// ================================

useEffect(()=>{


const token =
localStorage.getItem(
  "accessToken"
);



if(token){

  dispatch(
    fetchCurrentUser()
  );

}


},[dispatch]);





// ================================
// LOGOUT
// ================================


const handleLogout = ()=>{


dispatch(
  logout()
);


};





const navLinks = [

{
to:"/products",
label:"Products",
icon:null
},


{
to:"/orders",
label:"My Orders",
icon:<ClipboardList size={15}/>
},


{
to:"/profile/addresses",
label:"Addresses",
icon:<MapPin size={15}/>
}

];




const isActive =
(path)=>
location.pathname === path;





return (

<header className="sticky top-0 z-50 w-full font-sans">


{/* Announcement */}

<div className="bg-[#1C1917] text-[#FAF7F2] text-xs flex items-center justify-center gap-2 py-2">


<Sparkles size={12}/>

<span>
Free shipping on orders above ₹999 · Easy 7-day returns
</span>

<Sparkles size={12}/>


</div>






<nav className="bg-[#FAF7F2] border-b border-stone-200 shadow-sm">


<div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center gap-6">



{/* LOGO */}

<Link
to="/"
className="text-2xl font-black"
>

Thread
<span className="text-[#C9826B]">
&
</span>
Tale

</Link>






{/* NAV LINKS */}


<div className="hidden md:flex gap-2 ml-8">


{
navLinks.map((link)=>(


<Link

key={link.to}

to={link.to}


className={`
flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold

${
isActive(link.to)

?
"bg-[#1C1917] text-white"

:

"text-stone-600 hover:bg-stone-100"

}

`}

>

{link.icon}

{link.label}


</Link>


))
}


</div>








{/* RIGHT */}

<div className="hidden md:flex items-center gap-3 ml-auto">



{/* AUTH */}



{

isAuthenticated

?

(


<div className="flex items-center gap-3">



<Link
to="/profile"
className="flex items-center gap-2"
>


<img

src={
user?.profileImage ||
"/default-avatar.png"
}

alt="profile"

className="w-9 h-9 rounded-full border-2 border-[#C9826B] object-cover"

/>



<span className="font-semibold text-sm">


{
user?.username?.split(" ")[0]
||
user?.name
||
"Profile"
}


</span>



</Link>






<button

onClick={handleLogout}

className="px-3 py-2 border rounded-lg text-sm"

>

Logout

</button>



</div>


)


:


(


<div className="flex gap-2">


<Link

to="/login"

className="px-4 py-2 text-sm font-semibold"

>

Login

</Link>



<Link

to="/register"

className="px-4 py-2 rounded-lg bg-black text-white text-sm"

>

Sign up

</Link>



</div>


)

}






{/* Wishlist */}

<Link
to="/wishlist"
className="relative p-2"
>


<Heart size={20}/>


{

wishlist.length>0 &&

<span className="absolute top-0 right-0 text-xs">

{wishlist.length}

</span>

}


</Link>







{/* Cart */}


<Link
to="/cart"
className="relative p-2"
>


<ShoppingCart size={20}/>


{

cartItems.length>0 &&


<span className="absolute top-0 right-0 text-xs">


{cartItems.length}


</span>

}



</Link>




</div>







{/* MOBILE BUTTON */}


<button

onClick={()=>setOpen(!open)}

className="md:hidden ml-auto"

>

{

open ?

<X/>

:

<Menu/>

}

</button>





</div>


</nav>





<MobileMenu
open={open}
setOpen={setOpen}
/>




</header>


);

};



export default Navbar;