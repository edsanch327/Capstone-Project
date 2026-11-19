import { Router } from "express";
import { db } from "../db.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();
router.get("/", async (req, res, next) => {
  try {
    const [reviews] = await db.execute("SELECT r.id, r.rating, r.comment, u.name AS customer_name FROM reviews r JOIN users u ON u.id = r.user_id ORDER BY r.created_at DESC LIMIT 100");
    res.json({ reviews });
  } catch (error) { next(error); }
});
router.post("/", requireAuth, async (req, res, next) => {
  try {
    const rating = Number(req.body.rating);
    const comment = String(req.body.comment || "").trim();
    if (!Number.isInteger(rating) || rating < 1 || rating > 5 || comment.length < 5 || comment.length > 1000) return res.status(400).json({ error: "Choose 1–5 stars and write a review of 5–1000 characters." });
    const [result] = await db.execute("INSERT INTO reviews (user_id, rating, comment) VALUES (?, ?, ?)", [req.userId, rating, comment]);
    res.status(201).json({ id: result.insertId });
  } catch (error) { next(error); }
});
export default router;
