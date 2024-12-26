import express from "express";
import bcrypt from 'bcrypt';
import env from 'dotenv';
import { generateTokenAndSetCookie } from "../lib/utils/generateTokenAndSetCookie.js";
import User from '../models/user.js';

env.config();

export const registerUser = async (req, res) => {
    try {
        const { firstname, lastname, email, password, phone, location, projects, shortlistedProviders } = req.body;

        if (!firstname || !lastname || !email || !password) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = await User.create({
            fullname: {
                firstname,
                lastname,
            },
            email,
            password: hashedPassword,
            phone,
            location,
            projects,
            shortlistedProviders
        });

        if (user) {
            return res.status(201).json(user);
        }

    } catch (error) {
        console.log("Error Found in registerUser", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
