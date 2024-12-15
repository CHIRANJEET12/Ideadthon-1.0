import express from "express";
// import {registerUser, loginUser, getUserProfile, logoutUser} from "../controllers/user.controller.js";
import { authUser } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post('/register', registerUser)

router.post('/login', loginUser)

router.get('/profile', authUser, getUserProfile);

router.get('/logout', authUser, logoutUser);

export default router;