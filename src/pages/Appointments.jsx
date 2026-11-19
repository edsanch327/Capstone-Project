import { useEffect, useState } from "react";
import { Link } from "react-router";
import { api } from "../api/client";
import { useAuth } from "../auth/AuthContext";

export default function Appointments() {
  const { user, loading } = useAuth();
  const [services, setServices] = useState([]);
  const [stylists, setStylists] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [form, setForm] = useState({ serviceId: "", stylistId: "", startsAt: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    api("/services").then((d) => setServices(d.services)).catch((e) => setError(e.message));
    api("/stylists").then((d) => setStylists(d.stylists)).catch((e) => setError(e.message));
  }, []);
  useEffect(() => { if (user) api("/appointments").then((d) => setBookings(d.appointments)).catch((e) => setError(e.message)); }, [user]);

  async function submit(event) {
    event.preventDefault(); setError(""); setMessage("");
    try {
      await api("/appointments", { method: "POST", body: JSON.stringify(form) });
      setMessage("Appointment booked! You'll find it in your appointments below.");
      setForm({ serviceId: "", stylistId: "", startsAt: "" });
      const data = await api("/appointments"); setBookings(data.appointments);
    } catch (e) { setError(e.message); }
  }

  async function cancel(id) {
    setError(""); setMessage("");
    try { await api(`/appointments/${id}`, { method: "DELETE" }); setMessage("Appointment cancelled."); const data = await api("/appointments"); setBookings(data.appointments); } catch (e) { setError(e.message); }
  }

  return <section className="section"><div className="page-heading"><p className="eyebrow">YOUR TIME TO SHINE</p><h1>Book an Appointment</h1><p>Choose a service, stylist, and time that works for you.</p></div>{loading ? <p>Checking your account...</p> : !user ? <div className="form-card center"><h2>Ready to book?</h2><p>Please log in or create an account to book an appointment.</p><div className="button-row"><Link className="button" to="/login">Log In</Link><Link className="button button-outline" to="/register">Register</Link></div></div> : <div className="contact-grid"><div className="form-card"><h2>New Appointment</h2><form onSubmit={submit}><label>Service<select required value={form.serviceId} onChange={(e) => setForm({ ...form, serviceId: e.target.value })}><option value="">Select a service</option>{services.map((s) => <option key={s.id} value={s.id}>{s.name} — ${Number(s.price).toFixed(2)}</option>)}</select></label><label>Stylist<select required value={form.stylistId} onChange={(e) => setForm({ ...form, stylistId: e.target.value })}><option value="">Select a stylist</option>{stylists.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}</select></label><label>Date and Time<input required type="datetime-local" min={new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16)} value={form.startsAt} onChange={(e) => setForm({ ...form, startsAt: e.target.value })} /></label><button className="button">Confirm Booking</button>{message && <p className="success">{message}</p>}{error && <p className="error">{error}</p>}</form></div><div><h2>Your Appointments</h2>{bookings.length === 0 && <p>No appointments yet.</p>}{bookings.map((b) => <article className="booking-card" key={b.id}><strong>{b.service_name}</strong><p>With {b.stylist_name}</p><p>{new Date(b.starts_at).toLocaleString()}</p><p>Status: {b.status}</p>{b.status === "booked" && <button className="text-button" onClick={() => cancel(b.id)}>Cancel appointment</button>}</article>)}</div></div>}</section>;
}
