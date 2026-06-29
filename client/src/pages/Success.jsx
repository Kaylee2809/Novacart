import { useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Success(){

const {setCart}=useCart();
const navigate = useNavigate();


useEffect(()=>{

  setCart([]);

},[]);


return (

<div className="checkout-container">

<h1>
Payment Successful 🎉
</h1>

<p>
Your order has been placed.
</p>


<button
className="checkout-btn"
onClick={()=>navigate("/")}
>
Continue Shopping
</button>


</div>

);

}