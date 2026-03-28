import mongoose from "mongoose";

const clickSchema = new mongoose.Schema(
  {
    linkId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Link",
      required: true,
    },
    timestamp: { type: Date, default: Date.now },
    ip: String,
    country: { type: String, default: "Unknow" },
    city: { type: String, default: "Unknow" },
    devices: {
      type: String,
      enum: ["Mobile", "Tablet", "Desktop"],
      default: "Desktop",
    },
    browser: { type: String, default: "Unkown" },
    os: { type: String, default: "Unkown" },
    referrer: { type: String, default: "Direct" },
  },
  { timestamps: false },
);

const Click = mongoose.model("Click", clickSchema);

export default Click;
