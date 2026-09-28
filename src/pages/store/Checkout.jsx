import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Checkout({ cart, onCreateOrder }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Pakistan",
    paymentMethod: "Cash on Delivery",
  });

  const [error, setError] = useState("");

  const subtotal = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  const shipping = subtotal >= 100 ? 0 : 10;
  const total = subtotal + shipping;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    const required = [
      "fullName",
      "email",
      "phone",
      "address",
      "city",
      "postalCode",
      "country",
    ];

    if (required.some((field) => !form[field].trim())) {
      setError("Please fill in all required fields.");
      return;
    }

    const order = {
      id: `ORD-${Date.now()}`,

      customer: {
        name: form.fullName,
        email: form.email,
        phone: form.phone,
        address: form.address,
        city: form.city,
        postalCode: form.postalCode,
        country: form.country,
      },

      items: cart,
      subtotal,
      shipping,
      total,
      paymentMethod: form.paymentMethod,
      status: "Pending",
      date: new Date().toLocaleString(),
    };

    onCreateOrder(order);

    navigate("/success", {
      state: {
        order,
      },
    });
  };

  if (cart.length === 0) {
    return (
      <section className="section">
        <div className="container empty-state">
          <h2>Your cart is empty</h2>

          <button
            className="btn btn-primary"
            onClick={() => navigate("/products")}
          >
            Shop Products
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container narrow">
        <div className="page-header">
          <span className="eyebrow">CHECKOUT</span>

          <h1>Customer Information</h1>

          <p>
            Enter your information and select a dummy payment method.
          </p>
        </div>

        {error && <div className="alert">{error}</div>}

        <form className="checkout-form" onSubmit={submit}>
          <div className="form-grid">
            <label>
              Full Name
              <input
                className="input"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
              />
            </label>

            <label>
              Email
              <input
                className="input"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
            </label>

            <label>
              Phone
              <input
                className="input"
                name="phone"
                value={form.phone}
                onChange={handleChange}
              />
            </label>

            <label>
              City
              <input
                className="input"
                name="city"
                value={form.city}
                onChange={handleChange}
              />
            </label>

            <label className="full-span">
              Address
              <input
                className="input"
                name="address"
                value={form.address}
                onChange={handleChange}
              />
            </label>

            <label>
              Postal Code
              <input
                className="input"
                name="postalCode"
                value={form.postalCode}
                onChange={handleChange}
              />
            </label>

            <label>
              Country
              <input
                className="input"
                name="country"
                value={form.country}
                onChange={handleChange}
              />
            </label>
          </div>

          <h2>Payment Method</h2>

          <div className="payment-options">
            <label className="payment-option">
              <input
                type="radio"
                name="paymentMethod"
                value="Cash on Delivery"
                checked={
                  form.paymentMethod === "Cash on Delivery"
                }
                onChange={handleChange}
              />

              Cash on Delivery
            </label>

            <label className="payment-option">
              <input
                type="radio"
                name="paymentMethod"
                value="Dummy Card Payment"
                checked={
                  form.paymentMethod === "Dummy Card Payment"
                }
                onChange={handleChange}
              />

              Dummy Card Payment
            </label>
          </div>

          <div className="checkout-total">
            <span>Total</span>
            <strong>${total.toFixed(2)}</strong>
          </div>

          <button
            className="btn btn-primary full-width"
            type="submit"
          >
            Place Order
          </button>
        </form>
      </div>
    </section>
  );
}

export default Checkout;