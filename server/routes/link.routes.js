import express from "express";
import verfiyUser from "../middlewares/auth.middleware.js";
import {
  createLink,
  getLinks,
  deleteLink,
  toggleLink,
} from "../controllers/link.controller.js";

const router = express.Router();

router.post("/", verfiyUser, createLink);
router.get("/", verfiyUser, getLinks);
router.delete("/:id", verfiyUser, deleteLink);
router.patch("/:id/toggle", verfiyUser, toggleLink);

export default router;
