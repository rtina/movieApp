import { Router } from "express";
import { register, login } from "../controllers/authController.js";
import { authenticateJWT } from "../middlewares/authMiddleware.js";
import {  authorizeAdmin } from "../middlewares/authMiddleware.js";
import * as authController from "../controllers/authController.js";

const router = Router();

// Public routes
router.post("/register", register);
router.post("/login", login);


// Admin Dashboard Route
// It uses BOTH middlewares: check if logged in + check if admin
router.get(
  "/admin/stats", 
  authenticateJWT, 
  authorizeAdmin, 
  authController.getStats
);

// Protected route example
router.get("/me", authenticateJWT, (req, res) => {
  res.json({ message: "This is a protected route", user: (req as any).user });
});

export default router;