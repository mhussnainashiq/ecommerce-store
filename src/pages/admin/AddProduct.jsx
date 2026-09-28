import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AddProduct({ onAddProduct }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "Electronics",
    image: "",
    rating: "4.5",
    featured: false,
  });

  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");

    if (!formData.name.trim()) {
      setError("Please enter a product name.");
      return;
    }

    if (!formData.description.trim()) {
      setError("Please enter a product description.");
      return;
    }

    if (!formData.price || Number(formData.price) <= 0) {
      setError("Please enter a valid price.");
      return;
    }

    if (
      formData.stock === "" ||
      Number(formData.stock) < 0
    ) {
      setError("Please enter a valid stock quantity.");
      return;
    }

    if (!formData.image.trim()) {
      setError("Please enter an image URL.");
      return;
    }

    onAddProduct({
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
      rating: Number(formData.rating || 4.5),
      featured: Boolean(formData.featured),
    });

    navigate("/admin/products");
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>Add Product</h1>
          <p>Add a new product to your online store.</p>
        </div>

        <Link
          to="/admin/products"
          className="admin-secondary-button"
        >
          ← Back to Products
        </Link>
      </div>

      <div className="admin-card admin-form-card">
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="admin-form-error">
              {error}
            </div>
          )}

          <div className="admin-form-grid">
            <div className="admin-form-group">
              <label htmlFor="name">
                Product Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Example: iPhone 15 Pro"
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="category">
                Category
              </label>

              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="Electronics">
                  Electronics
                </option>

                <option value="Fashion">
                  Fashion
                </option>

                <option value="Home">
                  Home
                </option>

                <option value="Sports">
                  Sports
                </option>

                <option value="Other">
                  Other
                </option>
              </select>
            </div>
          </div>

          <div className="admin-form-group">
            <label htmlFor="description">
              Description
            </label>

            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your product..."
              rows="5"
            />
          </div>

          <div className="admin-form-grid">
            <div className="admin-form-group">
              <label htmlFor="price">
                Price
              </label>

              <input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                placeholder="99.99"
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="stock">
                Stock Quantity
              </label>

              <input
                id="stock"
                name="stock"
                type="number"
                min="0"
                step="1"
                value={formData.stock}
                onChange={handleChange}
                placeholder="50"
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label htmlFor="image">
              Product Image URL
            </label>

            <input
              id="image"
              name="image"
              type="url"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/product.jpg"
            />

            <small className="admin-help-text">
              Enter a direct URL to the product image.
            </small>
          </div>

          <div className="admin-form-grid">
            <div className="admin-form-group">
              <label htmlFor="rating">
                Rating
              </label>

              <input
                id="rating"
                name="rating"
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={formData.rating}
                onChange={handleChange}
              />
            </div>

            <div className="admin-form-checkbox">
              <label>
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                />

                <span>
                  Featured Product
                </span>
              </label>
            </div>
          </div>

          <div className="admin-form-actions">
            <Link
              to="/admin/products"
              className="admin-secondary-button"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="admin-primary-button"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;