import { Link } from "react-router-dom";

function Orders({ currentUser, orders }) {
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

          <h1>My Orders</h1>
        </div>

        {userOrders.length === 0 ? (
          <div className="empty-state">
            <h2>No orders yet</h2>

            <Link
              className="btn btn-primary"
              to="/products"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="table-card">
            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Payment</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {userOrders
                    .slice()
                    .reverse()
                    .map((order) => (
                      <tr key={order.id}>
                        <td>{order.id}</td>

                        <td>{order.date}</td>

                        <td>
                          ${Number(order.total).toFixed(2)}
                        </td>

                        <td>{order.paymentMethod}</td>

                        <td>
                          <span
                            className={`status status-${order.status.toLowerCase()}`}
                          >
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Orders;