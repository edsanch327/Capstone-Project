//This is a react login page. it displays an email-and-form calls a login function when submitted 
shows error if login fails and sends user to dahsbourd if login is successful//

import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "./AuthContext.jsx";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [busy, setBusy] = useState(false);

    async function submit(event) {
        event.preventDefault();
        setError("");
        setBusy(true);

        try {
            await login(email, password);
            navigate("/dashboard");
        } catch (err) {
            setError(err.message);
        } finally {
            setBusy(false);
        }
    }

    return (
        <section className="auth-page container">
            <div className="auth-card">
                <p className="eyebrow">WELCOME BACK</p>
                <h1>Good to see you.</h1>
                <p className="muted">Log in to manage your appointments.</p>
                <form onSubmit={submit}>
                    <label>Email<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" /></label>
                    <label>Password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" /></label>
                    {error && <p className="form-error" role="alert">{error}</p>}
                    <button className="outline-button" disabled={busy}>{busy ? "Signing in..." : "LOG IN ↗"}</button>
                </form>
                <p className="muted">New here? <Link className="text-link" to="/register">Create an account</Link></p>
            </div>
        </section>
    );
}
