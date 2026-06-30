import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import siteRoutes from "./routes/siteRoutes.js";
import { siteData } from "./data/siteData.js";
import { SiteContent } from "./models/SiteContent.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://127.0.0.1:5173";

global.mongoConnected = false;

app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", database: global.mongoConnected ? "mongodb" : "fallback" });
});

app.use("/api", siteRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: "Something went wrong." });
});

const seedSiteContent = async () => {
  const existing = await SiteContent.findOne();
  if (!existing) {
    await SiteContent.create(siteData);
  }
};

const connectMongo = async () => {
  if (!process.env.MONGO_URI) {
    console.info("MONGO_URI not set. API will use in-memory fallback data.");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    global.mongoConnected = true;
    await seedSiteContent();
    console.info("MongoDB connected and content ready.");
  } catch (error) {
    console.warn("MongoDB connection failed. API will use fallback data.");
    console.warn(error.message);
  }
};

await connectMongo();

app.listen(PORT, () => {
  console.info(`Utsav API running on http://127.0.0.1:${PORT}`);
});
