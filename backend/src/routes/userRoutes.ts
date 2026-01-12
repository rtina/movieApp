import { Router } from "express";
import * as userController from "../controllers/userController.js";
import { authenticateJWT, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = Router();

// Apply BOTH middlewares to all routes
// 1. authenticateJWT: Extracts user from token
// 2. authorizeAdmin: Checks if that user is an ADMIN
router.use(authenticateJWT, authorizeAdmin);

router.get("/", userController.getUsers);
router.post("/", userController.addUser);
router.put("/:id", userController.editUser);
router.delete("/:id", userController.removeUser);

export default router;