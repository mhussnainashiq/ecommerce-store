import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function ProductDetails({ products, onAddToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find(
    (item) => String(item.id) === String(id)
  );

  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <section className="section">
        <div className="container empty-state">
          <h2>Product not found</h2>

          <Link className="btn btn-primary" to="/products">
            Back to Products
          </Link>
        </div>
      </section>
    );
  }

  const increase = () => {
    setQuantity((value) => Math.min(value + 1, product.stock));
  };

  const addToCart = () => {
    onAddToCart(product, quantity);
  };

  const buyNow = () => {
    onAddToCart(product, quantity);
    navigate("/cart");
  };

  return (
    <section className="section">
      <div className="container">
        <Link to="/products" className="back-link">
          ← Back to Products
        </Link>

        <div className="details-grid">
          <div className="details-image">
            <img src={product.image} alt={product.name} />
          </div>

          <div className="details-content">
            <span className="product-category">
              {product.category}
            </span>

            <h1>{product.name}</h1>

            <div className="rating large">
              ★ {product.rating} / 5
            </div>

            <div className="details-price">
              ${Number(product.price).toFixed(2)}
            </div>

            <p>{product.description}</p>

            <p className={product.stock > 0 ? "stock good" : "stock bad"}>
              {product.stock > 0
                ? `${product.stock} items in stock`
                : "Out of stock"}
            </p>

            {product.stock > 0 && (
              <>
                <div className="quantity-control">
                  <button
                    onClick={() =>
                      setQuantity((value) => Math.max(1, value - 1))
                    }
                  >
                    −
                  </button>

                  <span>{quantity}</span>

                  <button onClick={increase}>+</button>
                </div>

                <div className="button-row">
                  <button
                    className="btn btn-secondary"
                    onClick={addToCart}
                  >
                    Add to Cart
                  </button>

                  <button
                    className="btn btn-primary"
                    onClick={buyNow}
                  >
                    Buy Now
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;