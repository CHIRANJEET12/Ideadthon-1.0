import express from "express";
import { registerArchitect, loginArchitect, getArchitectProfile } from "../controller/architect.controller.js";
import { authUser } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registerArchitect);
router.post("/login", loginArchitect);
router.get("/profile", authUser, getArchitectProfile);

export default router;
