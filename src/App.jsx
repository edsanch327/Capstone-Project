import { Route, Routes, Navigate } from "react-router";
import Layout from "./layout/Layout.jsx";
//Imports the shared page layout, often containing elements such as the navigation bar and footer. For the nested pages to appear inside it, Layout should render an <Outlet />.//
import Home from "./layout/Home.jsx";
import Services from "./layout/Services.jsx";
import Stylists from "./layout/Stylists.jsx";
import About from "./layout/About.jsx";
import Reviews from "./layout/Reviews.jsx";
import Contact from "./layout/Contact.jsx";
import Booking from "./layout/Booking.jsx";
import Dashboard from "./layout/Dashboard.jsx";
import Login from "./auth/Login.jsx";
import Register from "./auth/Register.jsx";
//Loads the CSS files so their styles apply to the app. These imports don’t render components.//
import "./stylesheet/index.css";
import "./stylesheet/navbar.css";
import "./stylesheet/home.css";
import "./stylesheet/pages.css";
import "./stylesheet/auth.css";
import "./stylesheet/footer.css";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/stylists" element={<Stylists />} />
        <Route path="/about" element={<About />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
//a visitor going to /services sees the Services page inside Layout; a visitor going to an unrecognized URL is redirected to the homepage. For the shared layout to display its nested page, Layout.jsx needs to render React Router’s <Outlet /> where that page should appear.//
