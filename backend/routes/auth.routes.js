import express from "express";
import {registerUser,loginUser,logoutUser,getUserProfile} from "../controller/auth.controller.js";
import { authUser } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser)

router.post('/logout',logoutUser);

router.get('/profile', authUser, getUserProfile);


export default router;