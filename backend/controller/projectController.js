import express from "express";
import User from "../models/user.js";

export const projectController = async (req, res) => {
    try {
        const { userId, title, description, min, max, city, state } = req.body;

        if (!userId || !title || !description || min === undefined || max === undefined || !city || !state) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const project = {
            title,
            description,
            budget: { min, max },
            location: { city, state },
        };

        user.projects.push(project);

        await user.save();

        return res.status(201).json({ message: "Project posted successfully", project });
    } catch (error) {
        console.log("Error Found in projectController", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export default projectController;
