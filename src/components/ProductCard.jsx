import { Link } from "react-router-dom";

function ProductCard({ product, onAddToCart }) {
  return (
    <article className="product-card">
      <Link to={`/products/${product.id}`} className="product-image-wrap">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />

        {product.featured && (
          <span className="product-tag">Featured</span>
        )}
      </Link>

      <div className="product-card-body">
        <div className="product-category">{product.category}</div>

        <Link to={`/products/${product.id}`}>
          <h3>{product.name}</h3>
        </Link>

        <div className="rating">★ {product.rating}</div>

        <p className="product-price">
          ${Number(product.price).toFixed(2)}
        </p>

        <button
          className="btn btn-primary full-width"
          onClick={() => onAddToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}

export default ProductCard;