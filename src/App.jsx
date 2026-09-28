import { useEffect, useState } from "react";
import {
BrowserRouter,
Navigate,
Route,
Routes,
useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminLayout from "./components/AdminLayout";

import productsData from "./data/products";

import Home from "./pages/store/Home";
import Products from "./pages/store/Products";
import ProductDetails from "./pages/store/ProductDetails";
import Cart from "./pages/store/Cart";
import Checkout from "./pages/store/Checkout";
import Login from "./pages/store/Login";
import Signup from "./pages/store/Signup";
import Account from "./pages/store/Account";
import Orders from "./pages/store/Orders";
import Success from "./pages/store/Success";
import AdminLogin from "./pages/store/AdminLogin";

import Dashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/Products";
import AddProduct from "./pages/admin/AddProduct";
import EditProduct from "./pages/admin/EditProduct";
import AdminOrders from "./pages/admin/Orders";
import Customers from "./pages/admin/Customers";

const ADMIN_USER = {
id: "admin-1",
name: "Administrator",
email: "[admin@example.com](mailto:admin@example.com)",
password: "admin123",
role: "admin",
};

function getStorage(key, fallback) {
try {
const saved = localStorage.getItem(key);

if (!saved) {
  return fallback;
}

return JSON.parse(saved);
} catch (error) {
console.error("Storage error:", error);
return fallback;
}
}

function ProtectedRoute({ currentUser, children }) {
const location = useLocation();

if (!currentUser) {
return (
<Navigate
to="/login"
replace
state={{
from: location.pathname,
}}
/>
);
}

return children;
}

function AdminRoute({ currentUser, children }) {
if (!currentUser) {
return <Navigate to="/admin-login" replace />;
}

if (currentUser.role !== "admin") {
return <Navigate to="/" replace />;
}

return children;
}

function App() {
const [products, setProducts] = useState(() =>
getStorage("store_products", productsData)
);

const [cart, setCart] = useState(() =>
getStorage("store_cart", [])
);

const [orders, setOrders] = useState(() =>
getStorage("store_orders", [])
);

const [users, setUsers] = useState(() => {
const savedUsers = getStorage(
"store_users",
[]
);

const customerUsers = Array.isArray(savedUsers)
  ? savedUsers.filter(
      (user) =>
        user.email?.toLowerCase() !==
        ADMIN_USER.email.toLowerCase()
    )
  : [];

return [ADMIN_USER, ...customerUsers];
});

const [currentUser, setCurrentUser] = useState(() =>
getStorage("store_current_user", null)
);

useEffect(() => {
localStorage.setItem(
"store_products",
JSON.stringify(products)
);
}, [products]);

useEffect(() => {
localStorage.setItem(
"store_cart",
JSON.stringify(cart)
);
}, [cart]);

useEffect(() => {
localStorage.setItem(
"store_orders",
JSON.stringify(orders)
);
}, [orders]);

useEffect(() => {
localStorage.setItem(
"store_users",
JSON.stringify(users)
);
}, [users]);

useEffect(() => {
if (currentUser) {
localStorage.setItem(
"store_current_user",
JSON.stringify(currentUser)
);
} else {
localStorage.removeItem(
"store_current_user"
);
}
}, [currentUser]);

// =========================
// PRODUCTS
// =========================

const addProduct = (newProduct) => {
const product = {
...newProduct,
id: Date.now(),
price: Number(newProduct.price),
};

setProducts((currentProducts) => [
  ...currentProducts,
  product,
]);
};

const deleteProduct = (productId) => {
setProducts((currentProducts) =>
currentProducts.filter(
(product) => product.id !== productId
)
);
};

const editProduct = (
productId,
updatedProduct
) => {
setProducts((currentProducts) =>
currentProducts.map((product) =>
product.id === productId
? {
...product,
...updatedProduct,
price: Number(
updatedProduct.price
),
}
: product
)
);
};

// =========================
// CART
// =========================

const addToCart = (product) => {
setCart((currentCart) => {
const existingProduct =
currentCart.find(
(item) => item.id === product.id
);

  if (existingProduct) {
    return currentCart.map((item) =>
      item.id === product.id
        ? {
            ...item,
            quantity:
              item.quantity + 1,
          }
        : item
    );
  }

  return [
    ...currentCart,
    {
      ...product,
      quantity: 1,
    },
  ];
});

};

const increaseQuantity = (productId) => {
setCart((currentCart) =>
currentCart.map((item) =>
item.id === productId
? {
...item,
quantity:
item.quantity + 1,
}
: item
)
);
};

const decreaseQuantity = (productId) => {
setCart((currentCart) =>
currentCart
.map((item) =>
item.id === productId
? {
...item,
quantity:
item.quantity - 1,
}
: item
)
.filter(
(item) => item.quantity > 0
)
);
};

const removeFromCart = (productId) => {
setCart((currentCart) =>
currentCart.filter(
(item) => item.id !== productId
)
);
};

const clearCart = () => {
setCart([]);
};

const cartCount = cart.reduce(
(total, item) =>
total + Number(item.quantity || 0),
0
);

// =========================
// ORDERS
// =========================

const createOrder = (orderData) => {
const newOrder = {
id: Date.now(),
...orderData,
date: new Date().toLocaleString(),
};

setOrders((currentOrders) => [
  ...currentOrders,
  newOrder,
]);

return newOrder;

};

const updateOrder = (
orderId,
updatedOrder
) => {
setOrders((currentOrders) =>
currentOrders.map((order) =>
order.id === orderId
? {
...order,
...updatedOrder,
}
: order
)
);
};

// =========================
// USERS
// =========================

const signup = (userData) => {
const email = userData.email
.trim()
.toLowerCase();

const existingUser = users.find(
  (user) =>
    user.email?.toLowerCase() ===
    email
);

if (existingUser) {
  return {
    success: false,
    message:
      "An account with this email already exists.",
  };
}

const newUser = {
  id: Date.now(),
  name: userData.name,
  email,
  password: userData.password,
  role: "customer",
};

setUsers((currentUsers) => [
  ...currentUsers,
  newUser,
]);

return {
  success: true,
  user: newUser,
};

};

const login = (user) => {
const loggedInUser = {
...user,
role:
user.email?.toLowerCase() ===
ADMIN_USER.email.toLowerCase()
? "admin"
: "customer",
};

setCurrentUser(loggedInUser);

return {
  success: true,
  user: loggedInUser,
};

};

const logout = () => {
setCurrentUser(null);
};

// =========================
// APP
// =========================

return ( <BrowserRouter> <div className="app">

    <Navbar
      cartCount={cartCount}
      currentUser={currentUser}
      onLogout={logout}
    />

    <Routes>

      {/* =====================
          STORE
      ====================== */}

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/products"
        element={
          <Products
            products={products}
            onAddToCart={addToCart}
          />
        }
      />

      <Route
        path="/products/:id"
        element={
          <ProductDetails
            products={products}
            onAddToCart={addToCart}
          />
        }
      />

      <Route
        path="/cart"
        element={
          <Cart
            cart={cart}
            onIncrease={increaseQuantity}
            onDecrease={decreaseQuantity}
            onRemove={removeFromCart}
          />
        }
      />

      {/* =====================
          CHECKOUT
      ====================== */}

      <Route
        path="/checkout"
        element={
          <ProtectedRoute
            currentUser={currentUser}
          >
            <Checkout
              cart={cart}
              onClearCart={clearCart}
              onCreateOrder={createOrder}
            />
          </ProtectedRoute>
        }
      />

      {/* =====================
          LOGIN
      ====================== */}

      <Route
        path="/login"
        element={
          currentUser ? (
            <Navigate
              to={
                currentUser.role ===
                "admin"
                  ? "/admin"
                  : "/account"
              }
              replace
            />
          ) : (
            <Login
              users={users}
              onLogin={login}
            />
          )
        }
      />

      {/* =====================
          SIGNUP
      ====================== */}

      <Route
        path="/signup"
        element={
          currentUser ? (
            <Navigate
              to="/account"
              replace
            />
          ) : (
            <Signup
              onSignup={signup}
            />
          )
        }
      />

      {/* =====================
          CUSTOMER ACCOUNT
      ====================== */}

      <Route
        path="/account"
        element={
          <ProtectedRoute
            currentUser={currentUser}
          >
            <Account
              currentUser={currentUser}
              onLogout={logout}
            />
          </ProtectedRoute>
        }
      />

      {/* =====================
          CUSTOMER ORDERS
      ====================== */}

      <Route
        path="/orders"
        element={
          <ProtectedRoute
            currentUser={currentUser}
          >
            <Orders
              orders={orders}
              currentUser={currentUser}
            />
          </ProtectedRoute>
        }
      />

      {/* =====================
          SUCCESS
      ====================== */}

      <Route
        path="/success"
        element={<Success />}
      />

      {/* =====================
          ADMIN LOGIN
      ====================== */}

      <Route
        path="/admin-login"
        element={
          currentUser?.role ===
          "admin" ? (
            <Navigate
              to="/admin"
              replace
            />
          ) : (
            <AdminLogin
              users={users}
              onLogin={login}
            />
          )
        }
      />

      {/* =====================
          ADMIN DASHBOARD
      ====================== */}

      <Route
        path="/admin"
        element={
          <AdminRoute
            currentUser={currentUser}
          >
            <AdminLayout
              currentUser={currentUser}
            >
              <Dashboard
                products={products}
                orders={orders}
                users={users}
              />
            </AdminLayout>
          </AdminRoute>
        }
      />

      {/* =====================
          ADMIN PRODUCTS
      ====================== */}

      <Route
        path="/admin/products"
        element={
          <AdminRoute
            currentUser={currentUser}
          >
            <AdminLayout
              currentUser={currentUser}
            >
              <AdminProducts
                products={products}
                onDeleteProduct={
                  deleteProduct
                }
              />
            </AdminLayout>
          </AdminRoute>
        }
      />

      {/* =====================
          ADD PRODUCT
      ====================== */}

      <Route
        path="/admin/products/add"
        element={
          <AdminRoute
            currentUser={currentUser}
          >
            <AdminLayout
              currentUser={currentUser}
            >
              <AddProduct
                onAddProduct={
                  addProduct
                }
              />
            </AdminLayout>
          </AdminRoute>
        }
      />

      {/* =====================
          EDIT PRODUCT
      ====================== */}

      <Route
        path="/admin/products/edit/:id"
        element={
          <AdminRoute
            currentUser={currentUser}
          >
            <AdminLayout
              currentUser={currentUser}
            >
              <EditProduct
                products={products}
                onEditProduct={
                  editProduct
                }
              />
            </AdminLayout>
          </AdminRoute>
        }
      />

      {/* =====================
          ADMIN ORDERS
      ====================== */}

      <Route
        path="/admin/orders"
        element={
          <AdminRoute
            currentUser={currentUser}
          >
            <AdminLayout
              currentUser={currentUser}
            >
              <AdminOrders
                orders={orders}
                onUpdateOrder={
                  updateOrder
                }
              />
            </AdminLayout>
          </AdminRoute>
        }
      />

      {/* =====================
          ADMIN CUSTOMERS
      ====================== */}

      <Route
        path="/admin/customers"
        element={
          <AdminRoute
            currentUser={currentUser}
          >
            <AdminLayout
              currentUser={currentUser}
            >
              <Customers
                users={users}
              />
            </AdminLayout>
          </AdminRoute>
        }
      />

      {/* =====================
          UNKNOWN PAGE
      ====================== */}

      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />

    </Routes>

    <Footer />

  </div>
</BrowserRouter>
);
}

export default App;