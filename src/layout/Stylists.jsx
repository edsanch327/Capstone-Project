import { Link } from "react-router";

const stylists = [
    {
        name: "Alex Morgan",
        specialty: "CUTS & TEXTURE",
        description: "Thoughtful, lived-in cuts that work with your natural texture.",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=850&q=85"
    },
    {
        name: "Jordan Lee",
        specialty: "COLOUR & DIMENSION",
        description: "Soft colour, effortless dimension, and healthy-looking shine.",
        image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=850&q=85"
    },
    {
        name: "Taylor Reed",
        specialty: "STYLING & FINISH",
        description: "A polished finish that still feels completely like you.",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=850&q=85"
    }
];

export default function Stylists() {
    return (
        <section className="inner-page container stylists-page">
            <p className="eyebrow">GOOD PEOPLE, GOOD HAIR</p>
            <h1>Meet your people.</h1>
            <p className="lead">
                A little about the artists behind the chair.
                The profiles below are examples for your project.
            </p>
            <div className="stylist-grid">
                {stylists.map((stylist) => (
                    <article className="stylist-card" key={stylist.name}>
                        <img src={stylist.image} alt={`Example portrait for ${stylist.name}`} />
                        <p className="eyebrow">{stylist.specialty}</p>
                        <h2>{stylist.name}</h2>
                        <p>{stylist.description}</p>
                        <Link to="/booking" className="text-link">Book a visit ↗</Link>
                    </article>
                ))}
            </div>
        </section>
    );
}
