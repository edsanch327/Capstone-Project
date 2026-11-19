import { Router } from "express";
import { db } from "../db.js";

const router = Router();
router.get("/", async (req, res, next) => {
  try {
    const [stylists] = await db.execute("SELECT id, name, specialty, bio FROM stylists WHERE active = 1 ORDER BY id");
    res.json({ stylists });
  } catch (error) { next(error); }
});
export default router;
