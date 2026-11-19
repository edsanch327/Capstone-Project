import { Router } from "express";
import { db } from "../db.js";

const router = Router();
router.post("/", async (req, res, next) => {
  try {
    const name = String(req.body.name || "").trim();
    const email = String(req.body.email || "").trim();
    const message = String(req.body.message || "").trim();
    if (!name || name.length > 100 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 255 || message.length < 5 || message.length > 3000) return res.status(400).json({ error: "Please complete all contact fields correctly." });
    const [result] = await db.execute("INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)", [name, email, message]);
    res.status(201).json({ id: result.insertId });
  } catch (error) { next(error); }
});
export default router;
