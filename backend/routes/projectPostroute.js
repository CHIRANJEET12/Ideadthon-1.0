import express from "express";
import { projectController } from "../controller/projectController.js"

const router = express.Router();

router.post("/project-post", projectController);

export default router;