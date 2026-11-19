import jwt from "jsonwebtoken";

/** Require a valid login token before accessing private routes. */
export function requireAuth(req, res, next) {
  const token = req.headers.authorization?.replace(/^Bearer /, "");
  if (!token) return res.status(401).json({ error: "Please log in first." });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ["HS256"] });
    req.userId = payload.id;
    next();
  } catch {
    res.status(401).json({ error: "Your session has expired. Please log in again." });
  }
}
