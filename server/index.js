import express, { json } from "express";
import { connect } from "mongoose";
import cors from "cors";

require("dotenv").config();

import authRoutes from "./routes/auth.routes";
import linkRoutes from "./routes/link.routes";
import redirectRoutes from "./routes/redirect.routes";

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(json());

app.use("/api/auth", authRoutes);
app.use("/api/links", linkRoutes);

app.use("/", redirectRoutes);

connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
