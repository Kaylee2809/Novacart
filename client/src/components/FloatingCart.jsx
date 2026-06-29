import { useState } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function FloatingCart() {
  const { cart } = useCart();
  const [open, setOpen] = useState(false);

  const totalItems = cart.reduce((sum, item) => {
  return sum + (Number(item.qty) || Number(item.qty) || 0);
}, 0);

  return (
    <div
      className="floating-cart-wrapper"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >

      {/* MAIN BUTTON */}
      <Link to="/cart" className="floating-cart">
        🛒

        {totalItems > 0 && (
          <span className="cart-badge">
            {totalItems}
          </span>
        )}
      </Link>

      {/* EXPANDED ACTION */}
      {open && (
        <div className="floating-cart-panel">

          <p>{totalItems} item(s) in cart</p>

          <Link to="/checkout" className="checkout-mini-btn">
            Checkout Now
          </Link>

        </div>
      )}

    </div>
  );
}