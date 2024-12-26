import User from "../models/user.js";
import jwt from "jsonwebtoken";

export const authUser = async (req, res, next) =>{
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).json({ error: "Unauthorized: No Token Provided" });
    }


    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // after decoding we will get only that info that we passed during generating token
        if(!decoded){
            return res.status(401).json({error: "Unauthorized: Invalid Token"});
             }


        const user = await User.findById(decoded.userId).select("-password");
        if(!user){
            return res.status(404).json({error: "User Not Found"});
             }
        req.user = user;

        return next();

    } catch (error) {
        console.log("Error occured in auth.middleware.js",error.message)
        return res.status(500).json({error:"Internal Server Error"});
    }
}   
