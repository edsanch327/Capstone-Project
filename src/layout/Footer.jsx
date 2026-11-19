import { Link } from "react-router";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container footer-inner">
                <Link className="logo" to="/">forma.</Link>
                <p>Good hair. Good energy. A little space to feel like yourself.</p>
                <span>© {new Date().getFullYear()} Beauty Calendar</span>
            </div>
        </footer>
    );
}
