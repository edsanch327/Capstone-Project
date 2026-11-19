import { Link } from "react-router";
import { services } from "./data.js";

export default function Home() {
    return (
        <>
            <section className="hero container">
                <div className="hero-copy">
                    <p className="eyebrow">YOUR HAIR, THOUGHTFULLY CONSIDERED</p>
                    <h1>Good hair.<br />Good energy.</h1>
                    <p className="muted hero-description">A neighbourhood studio for great hair and a slower kind of self-care. Come as you are; leave feeling a little more like yourself.</p>
                    <div className="hero-actions">
                        <Link className="outline-button" to="/booking">FIND YOUR APPOINTMENT ↗</Link>
                        <Link className="text-link" to="/services">Explore services</Link>
                    </div>
                    <p className="rating"><span>★★★★★</span> &nbsp; A little love from our clients</p>
                </div>
                <div className="hero-image-wrap">
                    <img className="hero-image" src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1100&q=90" alt="Woman with long hair in a studio" />
                    <span className="image-caption">A softer kind of salon day.</span>
                </div>
            </section>
            <div className="value-strip"><span>THOUGHTFUL CONSULTATIONS</span><span>GOOD PEOPLE, GOOD PRODUCTS</span><span>CARE THAT FEELS LIKE YOU</span></div>
            <section className="home-services container">
                <div className="section-intro">
                    <div><p className="eyebrow">THE GOOD STUFF</p><h2>Made for your kind of hair.</h2></div>
                    <p className="muted">Every appointment starts with a conversation. We'll find the service that feels right for you.</p>
                </div>
                <div className="service-grid">
                    {services.slice(0, 3).map((service, index) => (
                        <Link className="service-preview" to="/services" key={service.name}>
                            <div className="service-top"><span>0{index + 1}</span><span>↗</span></div>
                            <h3>{service.name}</h3>
                            <p className="muted">{service.description}</p>
                        </Link>
                    ))}
                </div>
            </section>
        </>
    );
}
