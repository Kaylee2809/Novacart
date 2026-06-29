import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">

      <div className="footer-inner">

        {/* BRAND */}
        <div className="footer-section">
          <h3>NovaCart</h3>
          <p>Modern e-commerce built for speed and simplicity.</p>
        </div>

        {/* LINKS */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <Link to="/">Home</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/checkout">Checkout</Link>
        </div>

        {/* ACCOUNT */}
        <div className="footer-section">
          <h4>Account</h4>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>

        {/* SOCIAL */}
        <div className="footer-section">
          <h4>Contact</h4>
          <p>support@novacart.com</p>
          <p>South Africa</p>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} NovaCart. All rights reserved.
      </div>

    </footer>
  );
}