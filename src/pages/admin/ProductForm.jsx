import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProductForm({
  initialProduct,
  onSave,
  title,
}) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: initialProduct?.name || "",
    description: initialProduct?.description || "",
    price: initialProduct?.price || "",
    image: initialProduct?.image || "",
    category: initialProduct?.category || "Electronics",
    stock: initialProduct?.stock ?? "",
    rating: initialProduct?.rating ?? 4.5,
    featured: initialProduct?.featured || false,
  });

  const [error, setError] = useState("");

  const update = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setForm({
      ...form,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    });
  };

  const submit = (e) => {
    e.preventDefault();

    if (
      !form.name.trim() ||
      !form.description.trim() ||
      !form.price ||
      !form.image.trim()
    ) {
      setError(
        "Please complete all required fields."
      );
      return;
    }

    onSave({
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
      rating: Number(form.rating),
    });

    navigate("/admin/products");
  };

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <span className="eyebrow">CATALOG</span>
          <h1>{title}</h1>
        </div>
      </div>

      {error && (
        <div className="alert">
          {error}
        </div>
      )}

      <form
        className="admin-card checkout-form"
        onSubmit={submit}
      >
        <div className="form-grid">
          <label>
            Name

            <input
              className="input"
              name="name"
              value={form.name}
              onChange={update}
              required
            />
          </label>

          <label>
            Category

            <select
              className="input"
              name="category"
              value={form.category}
              onChange={update}
            >
              <option>Electronics</option>
              <option>Fashion</option>
              <option>Home</option>
              <option>Sports</option>
              <option>Other</option>
            </select>
          </label>

          <label>
            Price

            <input
              className="input"
              type="number"
              step="0.01"
              name="price"
              value={form.price}
              onChange={update}
              required
            />
          </label>

          <label>
            Stock

            <input
              className="input"
              type="number"
              min="0"
              name="stock"
              value={form.stock}
              onChange={update}
              required
            />
          </label>

          <label>
            Rating

            <input
              className="input"
              type="number"
              min="0"
              max="5"
              step="0.1"
              name="rating"
              value={form.rating}
              onChange={update}
            />
          </label>

          <label>
            Image URL

            <input
              className="input"
              name="image"
              value={form.image}
              onChange={update}
              required
            />
          </label>

          <label className="full-span">
            Description

            <textarea
              className="input textarea"
              name="description"
              value={form.description}
              onChange={update}
              required
            />
          </label>

          <label className="checkbox-label full-span">
            <input
              type="checkbox"
              name="featured"
              checked={form.featured}
              onChange={update}
            />

            Featured product
          </label>
        </div>

        <div className="button-row">
          <button
            type="button"
            className="btn btn-outline"
            onClick={() =>
              navigate("/admin/products")
            }
          >
            Cancel
          </button>

          <button
            className="btn btn-primary"
            type="submit"
          >
            Save Product
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;