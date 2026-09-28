import { NavLink, Link } from "react-router-dom";

function AdminLayout({ children, currentUser }) {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <Link to="/admin" className="admin-logo">
          Admin Panel
        </Link>

        <p className="admin-user">
          {currentUser?.name || "Administrator"}
        </p>

        <nav>
          <NavLink to="/admin" end>
            Dashboard
          </NavLink>

          <NavLink to="/admin/products">
            Products
          </NavLink>

          <NavLink to="/admin/products/add">
            Add Product
          </NavLink>

          <NavLink to="/admin/orders">
            Orders
          </NavLink>

          <NavLink to="/admin/customers">
            Customers
          </NavLink>

          <Link to="/">
            ← Back to Store
          </Link>
        </nav>
      </aside>

      <main className="admin-main">
        {children}
      </main>
    </div>
  );
}

export default AdminLayout;