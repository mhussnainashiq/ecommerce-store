import { Link } from "react-router-dom";

function Products({ products, onDeleteProduct }) {
  const handleDelete = (product) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${product.name}"?`
    );

    if (confirmed) {
      onDeleteProduct(product.id);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>Products</h1>
          <p>Manage the products in your store.</p>
        </div>

        <Link
          to="/admin/products/add"
          className="admin-primary-button"
        >
          + Add Product
        </Link>
      </div>

      <div className="admin-card">
        {products.length === 0 ? (
          <div className="admin-empty">
            <h2>No Products Yet</h2>

            <p>
              Your store doesn't have any products.
              Add your first product to get started.
            </p>

            <Link
              to="/admin/products/add"
              className="admin-primary-button"
            >
              + Add Your First Product
            </Link>
          </div>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Featured</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div className="admin-product-cell">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="admin-product-image"
                        />

                        <div>
                          <strong>{product.name}</strong>

                          <small>
                            ID: {product.id}
                          </small>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className="admin-category">
                        {product.category || "Other"}
                      </span>
                    </td>

                    <td>
                      <strong>
                        ${Number(product.price || 0).toFixed(2)}
                      </strong>
                    </td>

                    <td>
                      <span
                        className={
                          Number(product.stock) > 0
                            ? "stock-available"
                            : "stock-out"
                        }
                      >
                        {product.stock || 0}
                      </span>
                    </td>

                    <td>
                      {product.featured ? (
                        <span className="featured-yes">
                          Yes
                        </span>
                      ) : (
                        <span className="featured-no">
                          No
                        </span>
                      )}
                    </td>

                    <td>
                      <div className="admin-actions">
                        <Link
                          to={`/admin/products/edit/${product.id}`}
                          className="admin-edit-button"
                        >
                          Edit
                        </Link>

                        <button
                          type="button"
                          className="admin-delete-button"
                          onClick={() =>
                            handleDelete(product)
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="admin-product-count">
        Total Products: <strong>{products.length}</strong>
      </div>
    </div>
  );
}

export default Products;