import { Link } from "react-router";
import { stylists } from "./data.js";

export default function Stylists() {
    return (
        <section className="container inner-page">
            <p className="eyebrow">GOOD PEOPLE, GOOD HAIR</p>
            <h1>Meet your people.</h1>
            <p className="muted page-lead">Friendly faces, thoughtful hands, and a little extra care. Sample profiles for this demo.</p>
            <div className="stylist-grid">
                {stylists.map((stylist) => (
                    <article className="stylist-card" key={stylist.name}>
                        <img src={stylist.image} alt={`Example portrait of ${stylist.name}`} />
                        <p className="eyebrow">{stylist.specialty}</p>
                        <h2>{stylist.name}</h2>
                        <p className="muted">{stylist.description}</p>
                        <Link className="text-link" to="/booking">Book a visit ↗</Link>
                    </article>
                ))}
            </div>
        </section>
    );
}
