import bcrypt from "bcryptjs";
import Contractor from "../models/contractor.js";
import { generateTokenAndSetCookie } from "../lib/utils/generateTokenAndSetCookie.js";

export const registerContractor = async (req, res) => {
  try {
    const { fullname, email, password, phone, businessName, businessLicense, yearsOfExperience, portfolio, specializations, insurance } = req.body;

    if (!fullname?.firstname || !email || !password || !phone || !businessName || !businessLicense) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const existingContractor = await Contractor.findOne({ email });
    if (existingContractor) {
      return res.status(400).json({ message: "Contractor already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newContractor = await Contractor.create({
      fullname,
      email,
      password: hashedPassword,
      phone,
      businessName,
      businessLicense,
      yearsOfExperience,
      portfolio,
      specializations,
      insurance,
    });

    if (newContractor) {
      generateTokenAndSetCookie(newContractor._id, res);

      res.status(201).json({
        _id: newContractor._id,
        fullname: `${newContractor.fullname.firstname} ${newContractor.fullname.lastname || ""}`,
        email: newContractor.email,
        phone: newContractor.phone,
        businessName: newContractor.businessName,
      });
    } else {
      res.status(400).json({ error: "Invalid contractor data" });
    }
  } catch (error) {
    console.error("Error in registerContractor:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const loginContractor = async (req, res) => {
  try {
    const { email, password } = req.body;

    const contractor = await Contractor.findOne({ email });
    const isPasswordCorrect = await bcrypt.compare(password, contractor?.password || "");

    if (!contractor || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    generateTokenAndSetCookie(contractor._id, res);

    res.status(200).json({
      _id: contractor._id,
      fullname: `${contractor.fullname.firstname} ${contractor.fullname.lastname || ""}`,
      email: contractor.email,
      phone: contractor.phone,
      businessName: contractor.businessName,
    });
  } catch (error) {
    console.error("Error in loginContractor:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getContractorProfile = async (req, res) => {
  try {
    const contractor = await Contractor.findById(req.user._id).select("-password");
    res.status(200).json(contractor);
  } catch (error) {
    console.error("Error in getContractorProfile:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
