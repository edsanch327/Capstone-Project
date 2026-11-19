import { useEffect, useState } from "react";
import { Link } from "react-router";
import { api } from "../api/client";

export default function Services() {
  const [services, setServices] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => { api("/services").then((data) => setServices(data.services)).catch((e) => setError(e.message)); }, []);

  return <section className="section"><div className="page-heading"><p className="eyebrow">WHAT WE DO BEST</p><h1>Our Services</h1><p>Every service is a chance to make you feel amazing.</p></div>{error && <p className="error">{error}</p>}<div className="card-grid">{services.map((service) => <article className="service-card" key={service.id}><div className="card-symbol">✦</div><p className="eyebrow">{service.duration_minutes} MINUTES</p><h3>{service.name}</h3><p>{service.description}</p><div className="card-bottom"><strong>From ${Number(service.price).toFixed(2)}</strong><Link to="/appointments">Book service →</Link></div></article>)}</div></section>;
}
