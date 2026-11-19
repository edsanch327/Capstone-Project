import { Link, NavLink } from "react-router";
import { useAuth } from "../auth/AuthContext.jsx";

export default function Navbar() {
    const { user, logout } = useAuth();

    return (
        <>
            <div className="announcement">A LITTLE SPACE TO FEEL LIKE YOURSELF — NOW BOOKING</div>
            <header className="header">
                <nav className="container navigation" aria-label="Main navigation">
                    <Link className="logo" to="/">forma.</Link>
                    <div className="nav-links">
                        <NavLink to="/" end>Home</NavLink>
                        <NavLink to="/services">Services</NavLink>
                        <NavLink to="/stylists">Stylists</NavLink>
                        <NavLink to="/about">Our story</NavLink>
                        <NavLink to="/reviews">Reviews</NavLink>
                        <NavLink to="/contact">Contact</NavLink>
                        {user ? <NavLink to="/dashboard">My visits</NavLink> : <NavLink to="/login">Log in</NavLink>}
                        {user && <button className="nav-logout" onClick={logout}>Log out</button>}
                    </div>
                    <Link className="outline-button" to="/booking">BOOK A VISIT ↗</Link>
                </nav>
            </header>
        </>
    );
}
