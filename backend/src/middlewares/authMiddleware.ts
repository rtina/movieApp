import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_super_secret_key";

// 1. Existing middleware: Checks if any user is logged in
export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    (req as any).user = decoded; 
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

// 2. NEW middleware: Checks specifically for Admin role
export const authorizeAdmin = (req: Request, res: Response, next: NextFunction) => {
  // authenticateJWT must run before this to populate req.user
  const user = (req as any).user;

  if (user && user.role === "ADMIN") {
    next(); // User is admin, proceed to the dashboard route
  } else {
    res.status(403).json({ message: "Access denied. Admin rights required." });
  }
};