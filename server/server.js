import "dotenv/config";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { db } from "./db.js";
import auth from "./routes/auth.js";
import services from "./routes/services.js";
import stylists from "./routes/stylists.js";
import appointments from "./routes/appointments.js";
import reviews from "./routes/reviews.js";
import contact from "./routes/contact.js";

if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
  throw new Error("Set JWT_SECRET to a random string of at least 32 characters in server/.env");
}

const app = express();
app.disable("x-powered-by");
app.use(cors({ origin: process.env.FRONTEND_ORIGIN || "http://localhost:5173" }));
app.use(express.json({ limit: "20kb" }));
app.use("/api", rateLimit({ windowMs: 15 * 60 * 1000, limit: 200, standardHeaders: "draft-7", legacyHeaders: false }));
app.use("/api/auth", auth);
app.use("/api/services", services);
app.use("/api/stylists", stylists);
app.use("/api/appointments", appointments);
app.use("/api/reviews", reviews);
app.use("/api/contact", contact);
app.get("/api/health", async (req, res, next) => {
  try { await db.query("SELECT 1"); res.json({ status: "ok" }); } catch (error) { next(error); }
});
app.use("/api", (req, res) => res.status(404).json({ error: "API route not found." }));
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ error: "Server error. Please try again." });
});
const port = Number(process.env.PORT || 3001);
app.listen(port, () => console.log(`Salon API running on http://localhost:${port}`));
