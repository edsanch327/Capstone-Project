import { Link } from "react-router";

const testimonials = [
    {
        quote: "I left feeling so much more like myself. Such a calm, welcoming experience.",
        name: "Sample client review"
    },
    {
        quote: "They really listened to what I wanted, and the whole appointment felt relaxed.",
        name: "Sample client review"
    },
    {
        quote: "Beautiful space, thoughtful service, and a haircut I genuinely love.",
        name: "Sample client review"
    }
];

export default function Reviews() {
    return (
        <section className="inner-page container reviews-page">
            <p className="eyebrow">KIND WORDS</p>
            <h1>A little love goes a long way.</h1>
            <p className="lead">
                These are placeholder testimonials. Replace them with
                real client reviews before publishing.
            </p>
            <div className="reviews-grid">
                {testimonials.map((review, index) => (
                    <article className="review-card" key={index}>
                        <div className="review-stars" aria-label="Five decorative stars">★★★★★</div>
                        <blockquote>“{review.quote}”</blockquote>
                        <p>{review.name}</p>
                    </article>
                ))}
            </div>
            <Link to="/booking" className="btn">FIND YOUR APPOINTMENT ↗</Link>
        </section>
    );
}
