import prisma from "../lib/prisma.js";
import bcrypt from "bcryptjs";

export interface UserInput {
  email: string;
  password?: string;
  role: string;
}

export const getAllUsers = async () => {
  return await prisma.user.findMany({
    select: { id: true, email: true, role: true, createdAt: true },
    orderBy: { createdAt: 'desc' }
  });
};

export const createUser = async (data: UserInput) => {
  const hashedPassword = await bcrypt.hash(data.password || "Default123!", 10);
  return await prisma.user.create({
    data: {
      email: data.email,
      role: data.role,
      password: hashedPassword,
    },
  });
};

export const updateUser = async (id: number, data: Partial<UserInput>) => {
  const updatePayload: any = { ...data };
  if (data.password) {
    updatePayload.password = await bcrypt.hash(data.password, 10);
  }
  return await prisma.user.update({
    where: { id },
    data: updatePayload,
  });
};

export const deleteUser = async (id: number) => {
  return await prisma.user.delete({
    where: { id },
  });
};