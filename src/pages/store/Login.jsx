import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Login({ users, onLogin }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();

    const user = users.find(
      (item) =>
        item.email.toLowerCase() === email.toLowerCase() &&
        item.password === password
    );

    if (!user) {
      setError("Invalid email or password.");
      return;
    }

    onLogin(user);

    navigate(location.state?.from || "/account");
  };

  return (
    <section className="section">
      <div className="container auth-container">
        <form className="auth-card" onSubmit={submit}>
          <span className="eyebrow">WELCOME BACK</span>

          <h1>Login</h1>

          {error && <div className="alert">{error}</div>}

          <label>
            Email

            <input
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label>
            Password

            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <button
            className="btn btn-primary full-width"
            type="submit"
          >
            Login
          </button>

          <p className="form-note">
            No account? <Link to="/signup">Create one</Link>
          </p>

          <p className="form-note">
            Demo admin: admin@example.com / admin123
          </p>
        </form>
      </div>
    </section>
  );
}

export default Login;