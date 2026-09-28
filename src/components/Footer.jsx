import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <h3>ecommerce-store</h3>
          <p>
            A modern React e-commerce practice project built with Vite and
            LocalStorage.
          </p>
        </div>

        <div>
          <h4>Store</h4>
          <Link to="/products">Products</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/account">My Account</Link>
        </div>

        <div>
          <h4>Account</h4>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
          <Link to="/orders">My Orders</Link>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} ecommerce-store. Practice project.
      </div>
    </footer>
  );
}

export default Footer;