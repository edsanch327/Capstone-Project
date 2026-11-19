import { useState } from "react";
import { api } from "../api/client";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  async function submit(event) {
    event.preventDefault(); setStatus(""); setError("");
    try { await api("/contact", { method: "POST", body: JSON.stringify(form) }); setStatus("Your message has been received!"); setForm({ name: "", email: "", message: "" }); } catch (e) { setError(e.message); }
  }

  return <section className="section"><div className="page-heading"><p className="eyebrow">SAY HELLO</p><h1>Contact Us</h1><p>Questions, ideas, or just want to say hi? We'd love to hear from you.</p></div><div className="contact-grid"><div><h2>Let's talk hair.</h2><p>Send us a message using the form and our salon team can follow up.</p><p className="muted">Salon address, phone, and business hours can be added once confirmed.</p></div><div className="form-card"><form onSubmit={submit}><label>Your Name<input required maxLength="100" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label><label>Email Address<input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label><label>Your Message<textarea required minLength="5" maxLength="3000" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} /></label><button className="button">Send Message</button>{status && <p className="success">{status}</p>}{error && <p className="error">{error}</p>}</form></div></div></section>;
}
