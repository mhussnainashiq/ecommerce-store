import { Link, useLocation } from "react-router-dom";

function Success() {
  const { state } = useLocation();

  const order = state?.order;

  return (
    <section className="section">
      <div className="container narrow">
        <div className="success-card">
          <div className="success-icon">✓</div>

          <span className="eyebrow">ORDER CONFIRMED</span>

          <h1>Thank you for your order!</h1>

          {order ? (
            <>
              <p>Your order has been created successfully.</p>

              <div className="success-details">
                <div>
                  <span>Order ID</span>
                  <strong>{order.id}</strong>
                </div>

                <div>
                  <span>Total</span>
                  <strong>
                    ${Number(order.total).toFixed(2)}
                  </strong>
                </div>

                <div>
                  <span>Payment</span>
                  <strong>{order.paymentMethod}</strong>
                </div>
              </div>
            </>
          ) : (
            <p>
              Your order was completed. You can view your orders
              from your account.
            </p>
          )}

          <div className="button-row center">
            <Link
              to="/products"
              className="btn btn-secondary"
            >
              Continue Shopping
            </Link>

            <Link
              to="/orders"
              className="btn btn-primary"
            >
              My Orders
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Success;