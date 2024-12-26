import express from "express";
import bcrypt from 'bcryptjs';
import env from 'dotenv'
import { generateTokenAndSetCookie } from "../lib/utils/generateTokenAndSetCookie.js";
import User from '../models/user.js';

env.config();

export const registerUser = async(req,res)=>{
try {
  const {firstname,lastname,email,password,phone,location,projects,shortlistedProviders} = req.body

  //to check existing user
  const existingUser = await User.findOne({email});
  if(existingUser){
    return res.status(400).json({message:"User Already exists"});
  }

  //hasing
  const saltRounds = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password,saltRounds);

  const newUser = await User.create({
    fullname:{
      firstname,
      lastname
  },
  email,
  password : hashedPassword,
  phone,
  location,
  projects,
  shortlistedProviders
  })

  if(newUser){
    generateTokenAndSetCookie(newUser._id,res);
    await newUser.save();

    res.status(201).json({
      _id: newUser._id,
      fullname :  `${newUser.fullname.firstname.trim()} ${newUser.fullname.lastname.trim()}`,
      email: newUser.email,
      phone : newUser.phone,
      location: newUser.location,
      projects: newUser.projects,
      shortlistedProviders: newUser.shortlistedProviders
    })
  }

  else {
    res.status(400).json({ error: "Invalid user data" });
  }
  

} catch (error) {
  console.log("Error Found in registerUser",error.message);
  return res.status(500).json({error:"Internal Server Error"});
}
}

export const loginUser = async (req,res) => {
  try {
    const {email,password} = req.body;
    const user = await User.findOne({email});
    const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

    if(!user || !isPasswordCorrect){
      return res.status(400).json({ error: "Invalid email or password" });
    }

    generateTokenAndSetCookie(user._id, res);


    res.status(200).json({
      _id: user._id,
      fullname :  `${user.fullname.firstname.trim()} ${user.fullname.lastname.trim()}`,
      email: user.email,
      phone : user.phone,
      location: user.location,
      projects: user.projects,
      shortlistedProviders: user.shortlistedProviders
    })
  } catch (error) {
    console.log("Error Found in loginUser",error.message);
    return res.status(500).json({error:"Internal Server Error"});
  }
}

export const logoutUser = async (req,res) => {
  try {
    res.cookie("jwt","",{maxAge:0});
 res.status(200).json({message:"Logged out successfully"});
  } catch (error) {
    console.log("Error Found in logoutUser",error.message);
    return res.status(500).json({error:"Internal Server Error"});
  }
}

export const getUserProfile = async (req,res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    console.log("Error Found in getUserProfile",error.message);
    return res.status(500).json({error:"Internal Server Error"});
  }
}