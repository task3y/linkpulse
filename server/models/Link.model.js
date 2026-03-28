import mongoose from "mongoose";

const linkSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    originalUrl: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
    customSlug: { type: String, default: null },
    title: { type: String, default: "" },
    totalClicks: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    expiresAt: { type: Date, default: null },
  },
  { timestamps: true },
);

const Link = mongoose.model("Link", linkSchema);

export default Link;
