import { Link } from "react-router";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy"><p className="eyebrow">WELCOME TO BEAUTY CALENDAR</p><h1>Good hair.<br /><em>Great days.</em></h1><p>Effortless beauty, thoughtful care, and a little time just for you. Discover your next favorite look with our talented stylists.</p><div className="button-row"><Link className="button" to="/appointments">Book an Appointment</Link><Link className="button button-outline" to="/services">Explore Services</Link></div><div className="hero-note">✦ &nbsp; YOUR HAIR, YOUR MOMENT</div></div>
        <div className="hero-image" role="img" aria-label="Beautiful styled hair" />
      </section>
      <section className="section center"><p className="eyebrow">A LITTLE SOMETHING FOR YOU</p><h2>Beauty is in the details.</h2><p className="section-intro">From a fresh cut to your dream color, we're here to make every visit feel special.</p><div className="feature-grid"><article><span className="feature-icon">✂</span><h3>Expert Styling</h3><p>Precision cuts and styling tailored to your personality.</p></article><article><span className="feature-icon">✦</span><h3>Custom Color</h3><p>Rich tones, soft highlights, and transformations you’ll love.</p></article><article><span className="feature-icon">♡</span><h3>Relax & Renew</h3><p>Take a moment for yourself in our welcoming studio.</p></article></div></section>
      <section className="split-banner"><div className="split-image" /><div className="split-copy"><p className="eyebrow">MORE THAN A HAIRCUT</p><h2>A place to feel like yourself.</h2><p>We believe great hair starts with listening. Our team creates looks that feel as good as they look.</p><Link to="/our-story" className="button">Our Story</Link></div></section>
    </>
  );
}
