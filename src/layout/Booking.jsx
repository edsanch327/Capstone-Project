import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../auth/AuthContext.jsx";
import { request } from "../auth/api.js";
import { services, stylists } from "./data.js";

export default function Booking() {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const [service, setService] = useState(services[0].name);
    const [stylist, setStylist] = useState(stylists[0].name);
    const [date, setDate] = useState("");
    const [time, setTime] = useState("10:00");
    const [error, setError] = useState("");
    const [busy, setBusy] = useState(false);
    const today = new Date().toLocaleDateString("en-CA");

    async function submit(event) {
        event.preventDefault();
        setBusy(true);
        setError("");

        try {
            await request("/appointments", {
                method: "POST",
                body: JSON.stringify({ service, stylist, date, time })
            });
            navigate("/dashboard");
        } catch (err) {
            setError(err.message);
        } finally {
            setBusy(false);
        }
    }

    if (loading) return <section className="container inner-page">Loading...</section>;
    if (!user) return <section className="container inner-page"><h1>Let's get you booked.</h1><p className="muted">Please log in or create an account first.</p><Link className="outline-button" to="/login">LOG IN ↗</Link></section>;

    return (
        <section className="container inner-page">
            <p className="eyebrow">MAKE TIME FOR YOU</p>
            <h1>Find your appointment.</h1>
            <p className="muted page-lead">Pick a service, stylist, and time that works for you.</p>
            <form className="booking-form" onSubmit={submit}>
                <label>Service<select value={service} onChange={(e) => setService(e.target.value)}>{services.map((item) => <option key={item.name}>{item.name}</option>)}</select></label>
                <label>Stylist<select value={stylist} onChange={(e) => setStylist(e.target.value)}>{stylists.map((item) => <option key={item.name}>{item.name}</option>)}</select></label>
                <label>Date<input type="date" min={today} value={date} onChange={(e) => setDate(e.target.value)} required /></label>
                <label>Time<select value={time} onChange={(e) => setTime(e.target.value)}>{["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"].map((slot) => <option key={slot} value={slot}>{slot}</option>)}</select></label>
                {error && <p className="form-error" role="alert">{error}</p>}
                <button className="outline-button" disabled={busy}>{busy ? "Saving..." : "CONFIRM APPOINTMENT ↗"}</button>
            </form>
        </section>
    );
}
