import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

function AdminLogin({
  users,
  onLogin,
}) {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("admin@example.com");

  const [password, setPassword] =
    useState("admin123");

  const [error, setError] =
    useState("");


  // ==========================================================
  // LOGIN
  // ==========================================================

  const handleSubmit = (event) => {

    event.preventDefault();

    setError("");


    const user = users.find(
      (item) =>

        item.email?.toLowerCase() ===
          email.trim().toLowerCase()

        &&

        item.password === password
    );


    // No account found
    if (!user) {

      setError(
        "Invalid admin email or password."
      );

      return;
    }


    // Account is not admin
    if (user.role !== "admin") {

      setError(
        "This account does not have admin access."
      );

      return;
    }


    // Login
    onLogin(user);


    // Go to dashboard
    navigate("/admin");
  };


  return (

    <main className="auth-page">

      <div className="auth-card">


        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="auth-header">

          <div className="admin-login-icon">
            ⚙️
          </div>

          <h1>
            Admin Login
          </h1>

          <p>
            Sign in to access your
            ecommerce admin dashboard.
          </p>

        </div>


        {/* ==================================================
            ERROR
        ================================================== */}

        {error && (

          <div className="auth-error">
            {error}
          </div>

        )}


        {/* ==================================================
            FORM
        ================================================== */}

        <form
          onSubmit={handleSubmit}
        >


          {/* EMAIL */}

          <div className="auth-form-group">

            <label htmlFor="admin-email">
              Admin Email
            </label>

            <input
              id="admin-email"
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(
                  event.target.value
                )
              }
              placeholder="admin@example.com"
              required
            />

          </div>


          {/* PASSWORD */}

          <div className="auth-form-group">

            <label htmlFor="admin-password">
              Password
            </label>

            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(
                  event.target.value
                )
              }
              placeholder="Enter admin password"
              required
            />

          </div>


          {/* SUBMIT */}

          <button
            type="submit"
            className="auth-submit-button"
          >
            Sign In to Admin
          </button>

        </form>


        {/* ==================================================
            DEMO ACCOUNT
        ================================================== */}

        <div className="admin-login-info">

          <strong>
            Admin Account
          </strong>

          <p>
            Email:
            <br />
            <b>
              admin@example.com
            </b>
          </p>

          <p>
            Password:
            <br />
            <b>
              admin123
            </b>
          </p>

        </div>


        {/* ==================================================
            BACK TO STORE
        ================================================== */}

        <div className="auth-footer">

          <Link to="/">
            ← Back to Store
          </Link>

        </div>

      </div>

    </main>
  );
}


export default AdminLogin;