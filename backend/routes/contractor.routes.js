import express from "express";
import { registerContractor, loginContractor, getContractorProfile } from "../controller/contractor.controller.js";
import { authUser } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registerContractor);
router.post("/login", loginContractor);
router.get("/profile", authUser, getContractorProfile);

export default router;
