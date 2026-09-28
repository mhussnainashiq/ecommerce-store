import { Link } from "react-router-dom";

function Dashboard({ products, orders, users }) {
  const revenue = orders.reduce(
    (sum, order) => sum + Number(order.total || 0),
    0
  );

  const pending = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <span className="eyebrow">OVERVIEW</span>
          <h1>Dashboard</h1>
        </div>

        <Link
          className="btn btn-primary"
          to="/admin/products/add"
        >
          Add Product
        </Link>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span>Products</span>
          <strong>{products.length}</strong>
        </div>

        <div className="stat-card">
          <span>Orders</span>
          <strong>{orders.length}</strong>
        </div>

        <div className="stat-card">
          <span>Customers</span>
          <strong>
            {users.filter((user) => user.role !== "admin").length}
          </strong>
        </div>

        <div className="stat-card">
          <span>Revenue</span>
          <strong>${revenue.toFixed(2)}</strong>
        </div>

        <div className="stat-card">
          <span>Pending Orders</span>
          <strong>{pending}</strong>
        </div>
      </div>

      <div className="admin-card">
        <h2>Quick Actions</h2>

        <div className="quick-actions">
          <Link to="/admin/products">
            Manage Products
          </Link>

          <Link to="/admin/orders">
            Manage Orders
          </Link>

          <Link to="/admin/customers">
            View Customers
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;