import { useContext, useState } from "react";
import { useCart } from "../context/CartContext";
import api from "../api/axios";

export default function Checkout() {
  const { cart, setCart } = useCart();
  const user = JSON.parse(localStorage.getItem("user"));

  const [message, setMessage] = useState("");

  const total = cart.reduce((sum, item) => {
  const price = Number(item.price) || 0;
  const qty = Number(item.qty) || 0;

  return sum + price * qty;
}, 0);

const handleStripeCheckout = async () => {

  try {


    const normalizedItems = cart.map((item)=>({

      productId:item._id,
      name:item.name,
      price:Number(item.price),
      qty:Number(item.qty) || 1

    }));


    const orderRes = await api.post("/orders",{

      user:{
        id:user.id,
        name:user.name,
        email:user.email
      },

      items:normalizedItems,

      total

    });


    console.log("ORDER CREATED:", orderRes.data);



    const stripeRes = await api.post(
      "/payment/create-checkout-session",
      {
        items:normalizedItems
      }
    );


    window.location.href = stripeRes.data.url;



  } catch(err){

    console.log(err);

  }

};

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>

      {message && <div className="popup">{message}</div>}

      <div className="checkout-box">
        <h3>Customer</h3>
        <p>{user?.name}</p>
        <p>{user?.email}</p>
      </div>

      <div className="checkout-box">
        <h3>Items</h3>

        {cart.length === 0 ? (
          <p>Cart is empty</p>
        ) : (
          cart.map((item) => (
            <div key={item._id} className="checkout-item">
              <span>{item.name}</span>
              <span>R {item.price} x {item.qty}</span>
            </div>
          ))
        )}
      </div>

      <div className="checkout-total">
        <h2>Total: R {total}</h2>
      </div>

<button 
  className="checkout-btn" 
  onClick={handleStripeCheckout}
  disabled={cart.length === 0}
>
  Pay with Card 💳
</button>
    </div>
  );
}