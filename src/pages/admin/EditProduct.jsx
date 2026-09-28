import { Link, useParams } from "react-router-dom";
import ProductForm from "./ProductForm";

function EditProduct({
  products,
  onEditProduct,
}) {
  const { id } = useParams();

  const product = products.find(
    (item) => String(item.id) === String(id)
  );

  if (!product) {
    return (
      <div className="empty-state">
        <h2>Product not found</h2>

        <Link
          className="btn btn-primary"
          to="/admin/products"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <ProductForm
      title="Edit Product"
      initialProduct={product}
      onSave={(updatedProduct) =>
        onEditProduct(
          product.id,
          updatedProduct
        )
      }
    />
  );
}

export default EditProduct;