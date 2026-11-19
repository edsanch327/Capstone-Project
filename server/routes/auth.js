import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../db.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

function makeToken(user) {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d", algorithm: "HS256" });
}

router.post("/register", async (req, res, next) => {
  try {
    const name = String(req.body.name || "").trim();
    const email = String(req.body.email || "").trim().toLowerCase();
    const password = req.body.password;
    if (!name || name.length > 100 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 255 || typeof password !== "string" || password.length < 8 || password.length > 72) return res.status(400).json({ error: "Enter a valid name, email, and password (8–72 characters)." });
    const hash = await bcrypt.hash(password, 12);
    const [result] = await db.execute("INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)", [name, email, hash]);
    const user = { id: result.insertId, name, email };
    res.status(201).json({ user, token: makeToken(user) });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") return res.status(409).json({ error: "This email is already registered." });
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const email = String(req.body.email || "").trim().toLowerCase();
    const password = req.body.password;
    if (typeof password !== "string" || !email) return res.status(400).json({ error: "Email and password are required." });
    const [rows] = await db.execute("SELECT id, name, email, password_hash FROM users WHERE email = ?", [email]);
    if (!rows.length || !(await bcrypt.compare(password, rows[0].password_hash))) return res.status(401).json({ error: "Invalid email or password." });
    const { id, name } = rows[0];
    const user = { id, name, email };
    res.json({ user, token: makeToken(user) });
  } catch (error) { next(error); }
});

router.get("/me", requireAuth, async (req, res, next) => {
  try {
    const [rows] = await db.execute("SELECT id, name, email FROM users WHERE id = ?", [req.userId]);
    if (!rows.length) return res.status(401).json({ error: "Account not found." });
    res.json({ user: rows[0] });
  } catch (error) { next(error); }
});

export default router;
