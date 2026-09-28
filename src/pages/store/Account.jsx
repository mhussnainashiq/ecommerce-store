import { Link } from "react-router-dom";

function Account({ currentUser, orders }) {
  const userOrders = orders.filter(
    (order) =>
      order.customer?.email?.toLowerCase() ===
      currentUser?.email?.toLowerCase()
  );

  return (
    <section className="section">
      <div className="container">
        <div className="page-header">
          <span className="eyebrow">ACCOUNT</span>

          <h1>My Account</h1>
        </div>

        <div className="account-grid">
          <div className="account-card">
            <h2>Profile</h2>

            <p>
              <strong>Name:</strong> {currentUser.name}
            </p>

            <p>
              <strong>Email:</strong> {currentUser.email}
            </p>

            <p>
              <strong>Account type:</strong> {currentUser.role}
            </p>
          </div>

          <div className="account-card">
            <h2>Orders</h2>

            <p>
              You have placed {userOrders.length} order(s).
            </p>

            <Link
              className="btn btn-primary"
              to="/orders"
            >
              View My Orders
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Account;