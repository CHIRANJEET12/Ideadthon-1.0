import bcrypt from "bcryptjs";
import Architect from "../models/architect.js";
import { generateTokenAndSetCookie } from "../lib/utils/generateTokenAndSetCookie.js";

export const registerArchitect = async (req, res) => {
  try {
    const { fullname, email, password, phone, businessName, businessLicense, yearsOfExperience, portfolio, specializations } = req.body;

    if (!fullname?.firstname || !email || !password || !phone || !businessName || !businessLicense) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const existingArchitect = await Architect.findOne({ email });
    if (existingArchitect) {
      return res.status(400).json({ message: "Architect already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newArchitect = await Architect.create({
      fullname,
      email,
      password: hashedPassword,
      phone,
      businessName,
      businessLicense,
      yearsOfExperience,
      portfolio,
      specializations,
    });

    if (newArchitect) {
      generateTokenAndSetCookie(newArchitect._id, res);

      res.status(201).json({
        _id: newArchitect._id,
        fullname: `${newArchitect.fullname.firstname} ${newArchitect.fullname.lastname || ""}`,
        email: newArchitect.email,
        phone: newArchitect.phone,
        businessName: newArchitect.businessName,
      });
    } else {
      res.status(400).json({ error: "Invalid architect data" });
    }
  } catch (error) {
    console.error("Error in registerArchitect:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const loginArchitect = async (req, res) => {
  try {
    const { email, password } = req.body;

    const architect = await Architect.findOne({ email });
    const isPasswordCorrect = await bcrypt.compare(password, architect?.password || "");

    if (!architect || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    generateTokenAndSetCookie(architect._id, res);

    res.status(200).json({
      _id: architect._id,
      fullname: `${architect.fullname.firstname} ${architect.fullname.lastname || ""}`,
      email: architect.email,
      phone: architect.phone,
      businessName: architect.businessName,
    });
  } catch (error) {
    console.error("Error in loginArchitect:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getArchitectProfile = async (req, res) => {
  try {
    const architect = await Architect.findById(req.user._id).select("-password");
    res.status(200).json(architect);
  } catch (error) {
    console.error("Error in getArchitectProfile:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
