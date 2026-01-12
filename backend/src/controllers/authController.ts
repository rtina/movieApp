import type { Request, Response } from "express";
import * as authService from "../services/authService.js";


export const getStats = async (req: Request, res: Response) => {
  try {
    const stats = await authService.getAdminDashboardStats();
    
    res.status(200).json({
      message: "Stats fetched successfully",
      data: stats
    });
  } catch (error: any) {
    res.status(500).json({ 
      message: "Error fetching dashboard data",
      error: error.message 
    });
  }
};


export const register = async (req: Request, res: Response) => {
  try {
    const user = await authService.registerUser(req.body.email, req.body.password);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await authService.loginUser(email, password);

    // We now include 'role' in the JSON response
    res.status(200).json({
      message: "Login successful",
      token: result.token,
      user: {
        id: result.user.id,
        email: result.user.email,
        role: result.user.role // Add this line!
      }
    });
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};