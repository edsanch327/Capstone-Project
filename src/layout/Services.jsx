import { Link } from "react-router";
import { services } from "./data.js";

export default function Services() {
  return (
    <section className="container inner-page">
      <p className="eyebrow">THE GOOD STUFF</p>
      <h1>Services made for you.</h1>
      <p className="muted page-lead">
        Every appointment begins with listening. Here are a few ways we can make
        your hair feel its best.
      </p>
      <div className="service-list">
        {services.map((service, index) => (
          <article className="service-row" key={service.name}>
            <span className="eyebrow">0{index + 1}</span>
            <div>
              <h2>{service.name}</h2>
              <p className="muted">{service.description}</p>
            </div>
            <div className="service-price">
              From ${service.price}
              <small>{service.duration} min</small>
            </div>
            <Link className="text-link" to="/booking">
              Book ↗
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
