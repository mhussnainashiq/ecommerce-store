
import { Link } from "react-router-dom"

function Orders({
  orders,
  onUpdateOrderStatus,
}) {

  return (
    <main className="admin-page">

      <div className="admin-header">

        <div>

          <p className="admin-label">
            ADMIN PANEL
          </p>

          <h1>
            Orders
          </h1>

          <p>
            View and manage customer orders.
          </p>

        </div>


        <Link
          to="/admin"
          className="view-store-button"
        >
          ← Dashboard
        </Link>

      </div>


      {orders.length === 0 ? (

        <section className="admin-section">

          <div className="admin-empty">

            <div className="admin-empty-icon">
              📦
            </div>

            <h2>
              No Orders Yet
            </h2>

            <p>
              Orders will appear here after
              customers complete checkout.
            </p>

            <Link
              to="/products"
              className="admin-add-button"
            >
              View Store
            </Link>

          </div>

        </section>

      ) : (

        <section className="admin-section">

          <div className="admin-section-header">

            <h2>
              Customer Orders
            </h2>

            <p>
              {orders.length} order
              {orders.length !== 1
                ? "s"
                : ""}{" "}
              received.
            </p>

          </div>


          <div className="admin-orders-list">

            {orders.map((order) => (

              <div
                className="admin-order-card"
                key={order.id}
              >

                {/* ORDER HEADER */}

                <div className="admin-order-header">

                  <div>

                    <span className="admin-order-label">
                      ORDER
                    </span>

                    <h3>
                      #{order.id}
                    </h3>

                  </div>


                  <select
                    className="order-status-select"
                    value={
                      order.status ||
                      "Pending"
                    }
                    onChange={(event) =>
                      onUpdateOrderStatus(
                        order.id,
                        event.target.value
                      )
                    }
                  >

                    <option value="Pending">
                      Pending
                    </option>

                    <option value="Processing">
                      Processing
                    </option>

                    <option value="Shipped">
                      Shipped
                    </option>

                    <option value="Delivered">
                      Delivered
                    </option>

                    <option value="Cancelled">
                      Cancelled
                    </option>

                  </select>

                </div>


                {/* CUSTOMER */}

                <div className="admin-order-customer">

                  <h3>
                    Customer Information
                  </h3>


                  <div className="customer-details">

                    <p>
                      <strong>
                        Name:
                      </strong>{" "}
                      {order.customer?.name}
                    </p>

                    <p>
                      <strong>
                        Email:
                      </strong>{" "}
                      {order.customer?.email}
                    </p>

                    <p>
                      <strong>
                        Phone:
                      </strong>{" "}
                      {order.customer?.phone}
                    </p>

                    <p>
                      <strong>
                        City:
                      </strong>{" "}
                      {order.customer?.city}
                    </p>

                    <p>
                      <strong>
                        Address:
                      </strong>{" "}
                      {order.customer?.address}
                    </p>

                    <p>
                      <strong>
                        Postal Code:
                      </strong>{" "}
                      {order.customer?.postalCode}
                    </p>

                  </div>

                </div>


                {/* PRODUCTS */}

                <div className="admin-order-products">

                  <h3>
                    Ordered Products
                  </h3>


                  {order.products?.map(
                    (product) => (

                      <div
                        className="admin-order-product"
                        key={product.id}
                      >

                        <div className="admin-order-product-image">
                          {product.image}
                        </div>


                        <div className="admin-order-product-info">

                          <strong>
                            {product.name}
                          </strong>

                          <p>
                            Quantity:{" "}
                            {product.quantity}
                          </p>

                        </div>


                        <strong>

                          $
                          {(
                            Number(
                              product.price
                            ) *
                            product.quantity
                          ).toFixed(2)}

                        </strong>

                      </div>

                    )
                  )}

                </div>


                {/* FOOTER */}

                <div className="admin-order-footer">

                  <div>

                    <small>
                      Order Date
                    </small>

                    <p>
                      {order.date}
                    </p>

                  </div>


                  <div className="admin-order-total">

                    <span>
                      Total
                    </span>

                    <strong>

                      $
                      {Number(
                        order.total
                      ).toFixed(2)}

                    </strong>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </section>

      )}

    </main>
  )
}

export default Orders

