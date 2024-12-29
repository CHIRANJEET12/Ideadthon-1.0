import express from "express";
import User from "../models/user.js";

export const projectController = async (req, res) => {
    try {
        const { userId, title, description, min, max, city, state } = req.body;

        // Validate required fields
        if (!userId || !title || !description || min === undefined || max === undefined || !city || !state) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        if (min > max) {
            return res.status(400).json({ message: "Minimum budget cannot exceed maximum budget" });
        }

        // Find the user
        let user;
        try {
            user = await User.findById(userId);
        } catch (error) {
            return res.status(400).json({ message: "Invalid user ID" });
        }

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check for duplicate project titles
        const isDuplicate = user.projects.some(project => project.title === title);
        if (isDuplicate) {
            return res.status(400).json({ message: "Project with the same title already exists" });
        }

        // Add project
        const project = {
            title,
            description,
            budget: { min, max },
            location: { city, state },
        };

        user.projects.push(project);
        await user.save();

        return res.status(201).json({
            message: "Project posted successfully",
            project: {
                title: project.title,
                description: project.description,
                budget: project.budget,
                location: project.location,
            },
        });
    } catch (error) {
        console.error("Error in projectController:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
