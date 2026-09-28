import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

function Navbar({ cartCount, currentUser, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="container navbar-inner">

        {/* LOGO */}
        <Link
          to="/"
          className="logo"
          onClick={closeMenu}
        >
          ecommerce-store
        </Link>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          className="menu-button"
          onClick={() => setMenuOpen((value) => !value)}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        {/* NAVIGATION */}
        <nav
          className={`nav-links ${
            menuOpen ? "open" : ""
          }`}
        >

          <NavLink
            to="/"
            end
            onClick={closeMenu}
          >
            Home
          </NavLink>

          <NavLink
            to="/products"
            onClick={closeMenu}
          >
            Products
          </NavLink>

          <NavLink
            to="/cart"
            onClick={closeMenu}
          >
            Cart{" "}
            <span className="cart-badge">
              {cartCount}
            </span>
          </NavLink>

          {/* CUSTOMER ACCOUNT */}
          {currentUser && currentUser.role !== "admin" && (
            <NavLink
              to="/account"
              onClick={closeMenu}
            >
              My Account
            </NavLink>
          )}

          {/* ADMIN BUTTON */}
          <Link
            to="/admin"
            className="admin-button"
            onClick={closeMenu}
          >
            Admin
          </Link>

          {/* LOGIN / LOGOUT */}
          {currentUser ? (
            <button
              type="button"
              className="nav-logout"
              onClick={() => {
                onLogout();
                closeMenu();
              }}
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              onClick={closeMenu}
            >
              Login
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;