import { Router } from "express";
import { SiteContent } from "../models/SiteContent.js";
import { siteData } from "../data/siteData.js";

const router = Router();

router.get("/site", async (_req, res, next) => {
  try {
    if (global.mongoConnected) {
      const content = await SiteContent.findOne().lean();
      return res.json(content || siteData);
    }

    return res.json(siteData);
  } catch (error) {
    next(error);
  }
});

router.post("/booking", async (req, res) => {
  const { name, phone, eventType } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ message: "Name and phone are required." });
  }

  return res.status(201).json({
    message: "Thank you. Utsav will contact you shortly.",
    booking: { name, phone, eventType: eventType || "Table Booking" }
  });
});

export default router;
