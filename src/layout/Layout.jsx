import { Outlet, Link } from "react-router";
import Navbar from "./Navbar";

/** Shared layout for the entire salon website. */
export default function Layout() {
  return (
    <>
      <Navbar />
      <main><Outlet /></main>
      <footer className="footer">
        <div><Link to="/" className="footer-brand">BEAUTY CALENDAR</Link><p>Beautiful hair, beautifully you.</p></div>
        <div><strong>Explore</strong><Link to="/services">Services</Link><Link to="/stylists">Our Stylists</Link><Link to="/appointments">Book an Appointment</Link></div>
        <div><strong>Visit Us</strong><p>Contact us for our current salon location and hours.</p><Link to="/contact">Get in touch</Link></div>
        <small>© {new Date().getFullYear()} Beauty Calendar</small>
      </footer>
    </>
  );
}
