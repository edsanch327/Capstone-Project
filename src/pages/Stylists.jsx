import { useEffect, useState } from "react";
import { Link } from "react-router";
import { api } from "../api/client";

export default function Stylists() {
  const [stylists, setStylists] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => { api("/stylists").then((data) => setStylists(data.stylists)).catch((e) => setError(e.message)); }, []);

  return <section className="section"><div className="page-heading"><p className="eyebrow">MEET THE ARTISTS</p><h1>Our Stylists</h1><p>Passionate people, beautiful results.</p></div>{error && <p className="error">{error}</p>}<div className="card-grid">{stylists.map((stylist) => <article className="stylist-card" key={stylist.id}><div className="stylist-photo">{stylist.name.split(" ").map((part) => part[0]).join("")}</div><div className="stylist-info"><p className="eyebrow">{stylist.specialty}</p><h3>{stylist.name}</h3><p>{stylist.bio}</p><Link to="/appointments">Book with {stylist.name.split(" ")[0]} →</Link></div></article>)}</div></section>;
}
