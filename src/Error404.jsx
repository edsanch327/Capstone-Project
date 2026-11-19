import { Link } from "react-router";

export default function Error404() {
  return <section className="section center"><p className="eyebrow">404</p><h1>Page not found</h1><p>We couldn't find that page.</p><Link className="button" to="/">Back to Home</Link></section>;
}
