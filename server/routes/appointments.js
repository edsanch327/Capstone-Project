import { Router } from "express";
import { db } from "../db.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();
router.use(requireAuth);

router.get("/", async (req, res, next) => {
  try {
    const [appointments] = await db.execute(`SELECT a.id, a.starts_at, a.status, s.name AS service_name, t.name AS stylist_name FROM appointments a JOIN services s ON s.id = a.service_id JOIN stylists t ON t.id = a.stylist_id WHERE a.user_id = ? ORDER BY a.starts_at DESC`, [req.userId]);
    res.json({ appointments });
  } catch (error) { next(error); }
});

router.post("/", async (req, res, next) => {
  let connection;
  try {
    const serviceId = Number(req.body.serviceId);
    const stylistId = Number(req.body.stylistId);
    const startsAt = req.body.startsAt;
    if (!Number.isSafeInteger(serviceId) || serviceId < 1 || !Number.isSafeInteger(stylistId) || stylistId < 1 || typeof startsAt !== "string" || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(startsAt)) return res.status(400).json({ error: "Choose a service, stylist, and valid appointment time." });
    const start = new Date(startsAt + ":00Z");
    if (Number.isNaN(start.getTime()) || start <= new Date() || start.getUTCFullYear() !== Number(startsAt.slice(0, 4)) || start.getUTCMonth() + 1 !== Number(startsAt.slice(5, 7)) || start.getUTCDate() !== Number(startsAt.slice(8, 10))) return res.status(400).json({ error: "Choose a future appointment date." });
    connection = await db.getConnection();
    await connection.beginTransaction();
    // Lock the stylist row to serialize concurrent booking attempts.
    const [stylists] = await connection.execute("SELECT id FROM stylists WHERE id = ? AND active = 1 FOR UPDATE", [stylistId]);
    const [services] = await connection.execute("SELECT id, duration_minutes FROM services WHERE id = ? AND active = 1", [serviceId]);
    const [offers] = await connection.execute("SELECT stylist_id FROM stylist_services WHERE stylist_id = ? AND service_id = ?", [stylistId, serviceId]);
    if (!stylists.length || !services.length || !offers.length) { await connection.rollback(); return res.status(400).json({ error: "That stylist does not offer this service." }); }
    const end = new Date(start.getTime() + services[0].duration_minutes * 60000);
    const format = (date) => date.toISOString().slice(0, 19).replace("T", " ");
    const [conflicts] = await connection.execute(`SELECT id FROM appointments WHERE stylist_id = ? AND status = 'booked' AND starts_at < ? AND ends_at > ? LIMIT 1`, [stylistId, format(end), format(start)]);
    if (conflicts.length) { await connection.rollback(); return res.status(409).json({ error: "That stylist is already booked during this time. Try another time." }); }
    const [result] = await connection.execute("INSERT INTO appointments (user_id, service_id, stylist_id, starts_at, ends_at) VALUES (?, ?, ?, ?, ?)", [req.userId, serviceId, stylistId, format(start), format(end)]);
    await connection.commit();
    res.status(201).json({ id: result.insertId, message: "Appointment booked." });
  } catch (error) { if (connection) await connection.rollback().catch(() => {}); next(error); }
  finally { if (connection) connection.release(); }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isSafeInteger(id) || id < 1) return res.status(400).json({ error: "Invalid appointment." });
    const [result] = await db.execute("UPDATE appointments SET status = 'cancelled' WHERE id = ? AND user_id = ? AND status = 'booked'", [id, req.userId]);
    if (!result.affectedRows) return res.status(404).json({ error: "Appointment not found or already cancelled." });
    res.json({ message: "Appointment cancelled." });
  } catch (error) { next(error); }
});
export default router;
