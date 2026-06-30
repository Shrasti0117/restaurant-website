import mongoose from "mongoose";

const siteContentSchema = new mongoose.Schema(
  {
    business: { type: Object, required: true },
    highlights: { type: [String], default: [] },
    about: { type: Object, required: true },
    menu: { type: [Object], default: [] },
    events: { type: [String], default: [] },
    gallery: { type: [Object], default: [] },
    testimonials: { type: [Object], default: [] }
  },
  { timestamps: true }
);

export const SiteContent = mongoose.model("SiteContent", siteContentSchema);
