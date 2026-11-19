import { Outlet } from "react-router";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

export default function Layout() {
    return (
        <div className="site-shell">
            <Navbar />
            <main><Outlet /></main>
            <Footer />
        </div>
    );
}
