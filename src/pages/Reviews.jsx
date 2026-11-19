import { useEffect, useState } from "react";
import { api } from "../api/client";
import { useAuth } from "../auth/AuthContext";
import { Link } from "react-router";

export default function Reviews() {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function loadReviews() {
    try { const data = await api("/reviews"); setReviews(data.reviews); } catch (e) { setError(e.message); }
  }
  useEffect(() => { loadReviews(); }, []);

  async function submit(event) {
    event.preventDefault(); setMessage(""); setError("");
    try { await api("/reviews", { method: "POST", body: JSON.stringify({ rating: Number(rating), comment }) }); setComment(""); setMessage("Thank you for sharing your review!"); await loadReviews(); } catch (e) { setError(e.message); }
  }

  return <section className="section"><div className="page-heading"><p className="eyebrow">KIND WORDS</p><h1>Client Love</h1><p>See what our clients are saying.</p></div>{error && <p className="error">{error}</p>}<div className="card-grid">{reviews.map((review) => <article className="review-card" key={review.id}><div className="stars">{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</div><p>“{review.comment}”</p><strong>— {review.customer_name}</strong></article>)}</div><div className="form-card review-form"><h2>Leave a Review</h2>{user ? <form onSubmit={submit}><label>Rating<select value={rating} onChange={(e) => setRating(e.target.value)}>{[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} stars</option>)}</select></label><label>Your review<textarea required minLength="5" maxLength="1000" value={comment} onChange={(e) => setComment(e.target.value)} /></label><button className="button">Submit Review</button></form> : <p><Link to="/login">Log in</Link> to share your experience.</p>}{message && <p className="success">{message}</p>}</div></section>;
}
