import { Link, useNavigate } from "react-router-dom";

function Cart({
  cart,
  onIncrease,
  onDecrease,
  onRemove,
  onClear,
}) {
  const navigate = useNavigate();

  const subtotal = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  const shipping =
    cart.length === 0 ? 0 : subtotal >= 100 ? 0 : 10;

  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <section className="section">
        <div className="container empty-state">
          <h1>Your Cart is Empty</h1>

          <p>Add some products before checking out.</p>

          <Link to="/products" className="btn btn-primary">
            Continue Shopping
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <div className="page-header">
          <span className="eyebrow">SHOPPING BAG</span>
          <h1>Your Cart</h1>
        </div>

        <div className="cart-layout">
          <div className="cart-items">
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} />

                <div className="cart-item-info">
                  <Link to={`/products/${item.id}`}>
                    <h3>{item.name}</h3>
                  </Link>

                  <p>${Number(item.price).toFixed(2)}</p>

                  <div className="quantity-control small">
                    <button onClick={() => onDecrease(item.id)}>
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button onClick={() => onIncrease(item.id)}>
                      +
                    </button>
                  </div>
                </div>

                <div className="cart-item-right">
                  <strong>
                    $
                    {(Number(item.price) * item.quantity).toFixed(2)}
                  </strong>

                  <button
                    className="remove-button"
                    onClick={() => onRemove(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <button className="btn btn-outline" onClick={onClear}>
              Clear Cart
            </button>
          </div>

          <aside className="summary-card">
            <h2>Order Summary</h2>

            <div>
              <span>Subtotal</span>
              <strong>${subtotal.toFixed(2)}</strong>
            </div>

            <div>
              <span>Shipping</span>
              <strong>
                {shipping === 0
                  ? "Free"
                  : `$${shipping.toFixed(2)}`}
              </strong>
            </div>

            <hr />

            <div className="summary-total">
              <span>Total</span>
              <strong>${total.toFixed(2)}</strong>
            </div>

            <button
              className="btn btn-primary full-width"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default Cart;