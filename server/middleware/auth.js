import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ success: false, message: "Not authorized, no token" });
    }

    //  Decode token 
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded?.id) {
      return res.status(401).json({ success: false, message: "Not authorized, invalid token" });
    }


    req.user = await User.findById(decoded.id).select("-password");

    next();
  } catch (error) {
    console.log("Auth Error:", error.message);
    return res.status(401).json({ success: false, message: "Not authorized, token failed" });
  }
};
