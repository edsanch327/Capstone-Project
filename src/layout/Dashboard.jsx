import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../auth/AuthContext.jsx";
import { request } from "../auth/api.js";

export default function Dashboard() {
    const { user, loading } = useAuth();
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!user) return;
        request("/appointments")
            .then((data) => setAppointments(data.appointments))
            .catch((err) => setError(err.message));
    }, [user]);

    async function cancel(id) {
        try {
            await request(`/appointments/${id}`, { method: "DELETE" });
            setAppointments((items) => items.filter((item) => item.id !== id));
        } catch (err) {
            setError(err.message);
        }
    }

    if (loading) return <section className="container inner-page">Loading...</section>;
    if (!user) return <section className="container inner-page"><h1>Your visits.</h1><p className="muted">Log in to see your appointments.</p><Link className="outline-button" to="/login">LOG IN ↗</Link></section>;

    return (
        <section className="container inner-page">
            <p className="eyebrow">YOUR LITTLE CORNER</p>
            <h1>Hi, {user.name}.</h1>
            <p className="muted page-lead">Your upcoming salon appointments live here.</p>
            {error && <p className="form-error" role="alert">{error}</p>}
            {appointments.length === 0 && <p className="muted">No appointments yet. Let's change that.</p>}
            <div className="appointment-list">
                {appointments.map((item) => (
                    <article className="appointment-card" key={item.id}>
                        <div><h2>{item.service}</h2><p className="muted">{item.stylist} · {item.date} at {item.time}</p></div>
                        <button className="text-link" onClick={() => cancel(item.id)}>Cancel</button>
                    </article>
                ))}
            </div>
            <Link className="outline-button" to="/booking">BOOK ANOTHER VISIT ↗</Link>
        </section>
    );
}
