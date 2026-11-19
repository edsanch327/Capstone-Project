import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "./AuthContext.jsx";

export default function Login() {
  const { login } = useAuth(),
    navigate = useNavigate();
  const [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError("");
    setBusy(true);

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <p className="eyebrow">WELCOME BACK</p>
        <h1>Good to see you.</h1>
        <p>Log in to manage your appointments.</p>

        <form onSubmit={submit}>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </label>

          {error && (
            <p className="error" role="alert">
              {error}
            </p>
          )}

          <button className="btn" disabled={busy}>
            {busy ? "Signing in..." : "LOG IN ↗"}
          </button>
        </form>

        <p>
          New here? <Link to="/register">Create an account</Link>
        </p>
      </div>
    </section>
  );
}
