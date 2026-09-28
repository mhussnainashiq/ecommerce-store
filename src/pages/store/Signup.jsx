import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup({ users, onSignup }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();

    if (form.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (
      users.some(
        (user) =>
          user.email.toLowerCase() ===
          form.email.toLowerCase()
      )
    ) {
      setError("An account with this email already exists.");
      return;
    }

    onSignup({
      id: Date.now(),
      name: form.name,
      email: form.email,
      password: form.password,
      role: "customer",
      createdAt: new Date().toLocaleString(),
    });

    navigate("/account");
  };

  return (
    <section className="section">
      <div className="container auth-container">
        <form className="auth-card" onSubmit={submit}>
          <span className="eyebrow">JOIN US</span>

          <h1>Create Account</h1>

          {error && <div className="alert">{error}</div>}

          <label>
            Name

            <input
              className="input"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              required
            />
          </label>

          <label>
            Email

            <input
              className="input"
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
              required
            />
          </label>

          <label>
            Password

            <input
              className="input"
              type="password"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
              required
            />
          </label>

          <label>
            Confirm Password

            <input
              className="input"
              type="password"
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({
                  ...form,
                  confirmPassword: e.target.value,
                })
              }
              required
            />
          </label>

          <button
            className="btn btn-primary full-width"
            type="submit"
          >
            Create Account
          </button>

          <p className="form-note">
            Already registered? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Signup;