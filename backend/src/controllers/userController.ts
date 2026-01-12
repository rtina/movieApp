import type { Request, Response } from "express";
import * as userService from "../services/userService.js";

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users); // Sends pure array
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const addUser = async (req: Request, res: Response) => {
  try {
    const { email, role, password } = req.body;
    if (!email || !role) return res.status(400).json({ error: "Missing fields" });

    const user = await userService.createUser({ email, role, password });
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const editUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { email, role, password } = req.body;

    const updateData: any = { email, role };
    if (password) updateData.password = password;

    const user = await userService.updateUser(id, updateData);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const removeUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await userService.deleteUser(id);
    res.status(200).json({ message: "Deleted" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};