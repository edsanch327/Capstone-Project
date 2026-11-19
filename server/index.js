import express from "express";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Database from "better-sqlite3";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(root, ".env") });

if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
    console.error("Set a secure JWT_SECRET (32+ characters) in .env before starting the backend.");
    process.exit(1);
}

const db = new Database(path.join(root, "server", "beauty-calendar.db"));
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");
db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS appointments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        service TEXT NOT NULL,
        stylist TEXT NOT NULL,
        date TEXT NOT NULL,
        time TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        UNIQUE(stylist, date, time)
    );
`);

const app = express();
app.use(express.json({ limit: "20kb" }));

function createToken(user) {
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

function publicUser(user) {
    return { id: user.id, name: user.name, email: user.email };
}

function requireAuth(req, res, next) {
    const token = req.headers.authorization?.replace(/^Bearer /, "");

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const user = db.prepare("SELECT id, name, email FROM users WHERE id = ?").get(payload.id);
        if (!user) return res.status(401).json({ error: "Account not found." });
        req.user = user;
        next();
    } catch {
        return res.status(401).json({ error: "Please log in again." });
    }
}

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.post("/api/auth/register", async (req, res) => {
    const name = String(req.body?.name || "").trim();
    const email = String(req.body?.email || "").trim().toLowerCase();
    const password = req.body?.password;

    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || typeof password !== "string" || password.length < 8) {
        return res.status(400).json({ error: "Enter your name, a valid email, and a password of at least 8 characters." });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    try {
        const result = db.prepare("INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)").run(name, email, passwordHash);
        const user = { id: result.lastInsertRowid, name, email };
        return res.status(201).json({ user, token: createToken(user) });
    } catch (error) {
        if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
            return res.status(409).json({ error: "An account with this email already exists." });
        }
        console.error(error);
        return res.status(500).json({ error: "Could not create your account." });
    }
});

app.post("/api/auth/login", async (req, res) => {
    const email = String(req.body?.email || "").trim().toLowerCase();
    const password = req.body?.password;
    const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);

    if (!user || typeof password !== "string" || !(await bcrypt.compare(password, user.password_hash))) {
        return res.status(401).json({ error: "Incorrect email or password." });
    }

    return res.json({ user: publicUser(user), token: createToken(user) });
});

app.get("/api/auth/me", requireAuth, (req, res) => res.json({ user: req.user }));

app.get("/api/appointments", requireAuth, (req, res) => {
    const appointments = db.prepare("SELECT id, service, stylist, date, time FROM appointments WHERE user_id = ? ORDER BY date, time").all(req.user.id);
    res.json({ appointments });
});

app.post("/api/appointments", requireAuth, (req, res) => {
    const { service, stylist, date, time } = req.body || {};
    const services = ["Signature Cut", "Colour Ritual", "Gloss & Tone", "Blowout & Style"];
    const stylists = ["Alex Morgan", "Jordan Lee", "Taylor Reed"];
    const times = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"];
    const validDate = typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date) && !Number.isNaN(Date.parse(date)) && new Date(`${date}T23:59:59`) >= new Date();

    if (!services.includes(service) || !stylists.includes(stylist) || !validDate || !times.includes(time)) {
        return res.status(400).json({ error: "Choose a valid service, stylist, date, and time." });
    }

    try {
        const result = db.prepare("INSERT INTO appointments (user_id, service, stylist, date, time) VALUES (?, ?, ?, ?, ?)").run(req.user.id, service, stylist, date, time);
        return res.status(201).json({ id: result.lastInsertRowid });
    } catch (error) {
        if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
            return res.status(409).json({ error: "That stylist is already booked at that time." });
        }
        console.error(error);
        return res.status(500).json({ error: "Could not save your appointment." });
    }
});

app.delete("/api/appointments/:id", requireAuth, (req, res) => {
    const result = db.prepare("DELETE FROM appointments WHERE id = ? AND user_id = ?").run(req.params.id, req.user.id);
    if (!result.changes) return res.status(404).json({ error: "Appointment not found." });
    return res.json({ success: true });
});

const port = Number(process.env.PORT || 3001);
app.listen(port, () => console.log(`Beauty Calendar API running at http://localhost:${port}`));
