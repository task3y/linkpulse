import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, lowercase: true, required: true },
    password: { type: String, required: true },
    plan: {
      type: String,
      enum: ["Free", "Pro"],
      default: "Free",
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
