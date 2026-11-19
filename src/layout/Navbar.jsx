import { Link, NavLink } from "react-router";
import { useAuth } from "../auth/AuthContext.jsx";

export default function Navbar() {
    const { user, logout } = useAuth();

    return (
        <>
            <div className="announcement">
                A LITTLE SPACE TO FEEL LIKE YOURSELF — NOW BOOKING
            </div>
            <header className="site-header">
                <nav className="nav container" aria-label="Main navigation">
                    <Link to="/" className="logo">forma.</Link>
                    <div className="nav-links">
                        <NavLink to="/" end>Home</NavLink>
                        <NavLink to="/services">Services</NavLink>
                        <NavLink to="/stylists">Stylists</NavLink>
                        <NavLink to="/about">Our story</NavLink>
                        <NavLink to="/reviews">Reviews</NavLink>
                        <NavLink to="/contact">Contact</NavLink>
                        {user ? (
                            <>
                                <NavLink to="/dashboard">My visits</NavLink>
                                <button type="button" className="nav-logout" onClick={logout}>
                                    Log out
                                </button>
                            </>
                        ) : (
                            <NavLink to="/login">Log in</NavLink>
                        )}
                    </div>
                    <Link className="btn nav-book" to="/booking">
                        BOOK A VISIT ↗
                    </Link>
                </nav>
            </header>
        </>
    );
}
