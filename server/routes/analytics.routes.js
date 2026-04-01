import { Router } from "express";
import { getLinkAnalytics } from "../controllers/analytics.controller.js";
import verifyUser from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/:slug", verifyUser, getLinkAnalytics);

export default router;
