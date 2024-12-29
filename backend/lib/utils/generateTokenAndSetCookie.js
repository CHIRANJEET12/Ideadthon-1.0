import jwt from 'jsonwebtoken';

export const generateTokenAndSetCookie = (userId, res) => {
  try {
      const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "30d" });

      res.cookie("jwt", token, {
          maxAge: 30 * 24 * 60 * 60 * 1000,
          httpOnly: true,
          sameSite: "strict",
          secure: process.env.NODE_ENV !== "development",
      });
  } catch (error) {
      console.error("Error generating token:", error.message);
      throw new Error("Token generation failed");
  }
};
