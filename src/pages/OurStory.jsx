import { Link } from "react-router";

export default function OurStory() {
  return <><section className="story-hero"><div><p className="eyebrow">THE HEART BEHIND THE HAIR</p><h1>Our Story</h1><p>At Beauty Calendar, our inspiration is simple: a salon experience that makes you feel seen, heard, and beautiful.</p></div></section><section className="section story-text"><p className="eyebrow">OUR PHILOSOPHY</p><h2>It's about more than hair.</h2><p>Beauty Calendar is a sample salon concept built around thoughtful consultations, creativity, and welcoming service. Every style begins with a conversation about what makes you feel your best.</p><p>Whether you want a small refresh or a whole new look, we want your time in the chair to feel like time well spent.</p><Link to="/appointments" className="button">Come See Us</Link></section></>;
}
