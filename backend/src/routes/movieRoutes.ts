import { Router } from "express";
import * as movieController from "../controllers/movieController.js";
import { authenticateJWT, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = Router();

// Publicly viewable
router.get("/", movieController.getMovies);

// Admin restricted
router.post("/", authenticateJWT, authorizeAdmin, movieController.addMovie);
router.put("/:id", authenticateJWT, authorizeAdmin, movieController.editMovie);
router.delete("/:id", authenticateJWT, authorizeAdmin, movieController.removeMovie);

export default router;