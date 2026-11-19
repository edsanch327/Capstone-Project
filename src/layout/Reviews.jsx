import { Link } from "react-router";

const reviews = [
    "I left feeling so much more like myself. Such a calm, welcoming experience.",
    "They really listened to what I wanted. Everything felt relaxed and easy.",
    "Beautiful space, thoughtful service, and a haircut I genuinely love."
];

export default function Reviews() {
    return (
        <section className="container inner-page">
            <p className="eyebrow">KIND WORDS</p>
            <h1>A little love goes a long way.</h1>
            <p className="muted page-lead">Example reviews for this demo. Replace these with real testimonials before publishing.</p>
            <div className="review-grid">
                {reviews.map((review, index) => (
                    <article className="review-card" key={index}>
                        <span className="stars">★★★★★</span>
                        <blockquote>“{review}”</blockquote>
                        <p className="muted">Sample client review</p>
                    </article>
                ))}
            </div>
            <Link className="outline-button" to="/booking">BOOK A VISIT ↗</Link>
        </section>
    );
}
