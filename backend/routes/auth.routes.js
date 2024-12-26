import express from "express";
import {registerUser} from "../controller/auth.controller.js";
// import { authUser } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post('/register', registerUser);

// router.post('/login', loginUser)

// router.get('/profile', authUser, getUserProfile);

// router.post('/logout', authUser, logoutUser);

export default router;