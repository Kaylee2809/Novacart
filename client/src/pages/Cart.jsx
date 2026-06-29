import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, addToCart, removeFromCart } = useCart();

  const increaseQty = (item) => {
    addToCart({ ...item, qty: 1 });
  };

  const decreaseQty = (item) => {
    removeFromCart(item._id);
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  const navigate = useNavigate();
  return (
    <div className="cart-page">

      <div className="cart-items">

        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cart.map((item) => (
            <div className="cart-item" key={item._id}>

              <img
                src={`http://localhost:5000/images/${item.image}`}
                alt={item.name}
              />

              <div className="item-info">
                <h3>{item.name}</h3>
                <p>R {item.price}</p>
              </div>

              <div className="qty-controls">

                <button onClick={() => removeFromCart(item._id)}>-</button>
                <span>{item.qty}</span>
                <button onClick={() => addToCart(item)}>+</button>

              </div>

            </div>
          ))
        )}

      </div>

      <div className="cart-summary">
        <h2>Order Summary</h2>

        <p>Total Items: {cart.length}</p>
        <h3>Total: R {total.toFixed(2)}</h3>

        <button className="checkout-btn"  onClick={() => navigate("/checkout")}>
          Checkout
        </button>
      </div>

    </div>
  );
}