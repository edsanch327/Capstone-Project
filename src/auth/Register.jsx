import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "./AuthContext.jsx";

export default function Register() {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [busy, setBusy] = useState(false);

    async function submit(event) {
        event.preventDefault();
        setError("");
        setBusy(true);

        try {
            await register(name, email, password);
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
                <p className="eyebrow">JOIN THE STUDIO</p>
                <h1>Make yourself at home.</h1>
                <p className="muted">Create an account to book your next visit.</p>
                <form onSubmit={submit}>
                    <label>Full name<input value={name} onChange={(e) => setName(e.target.value)} required autoComplete="name" /></label>
                    <label>Email<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" /></label>
                    <label>Password (at least 8 characters)<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} minLength={8} required autoComplete="new-password" /></label>
                    {error && <p className="form-error" role="alert">{error}</p>}
                    <button className="outline-button" disabled={busy}>{busy ? "Creating account..." : "CREATE ACCOUNT ↗"}</button>
                </form>
                <p className="muted">Already registered? <Link className="text-link" to="/login">Log in</Link></p>
            </div>
        </section>
    );
}
