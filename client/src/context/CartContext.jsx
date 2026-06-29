import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    // load from localStorage on first render
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // SAVE TO LOCALSTORAGE whenever cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ADD TO CART
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item._id === product._id);

      if (existing) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });
  };

  // REMOVE / DECREASE
  const removeFromCart = (id) => {
    setCart((prev) => {
      const item = prev.find((p) => p._id === id);

      if (!item) return prev;

      if (item.qty > 1) {
        return prev.map((p) =>
          p._id === id
            ? { ...p, qty: p.qty - 1 }
            : p
        );
      }

      return prev.filter((p) => p._id !== id);
    });
  };

  // CLEAR CART (optional but useful)
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        setCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);