import express from "express";
import verfiyUser from "../middlewares/auth.middleware.js";
import { getMe, login, register } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", verfiyUser, getMe);

export default router;
