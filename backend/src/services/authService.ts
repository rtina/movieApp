import 'dotenv/config';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from "@prisma/adapter-pg";
import pkg from 'pg'; // Import the default package
const { Pool } = pkg;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is not set");
}

export const registerUser = async (email: string, password: string) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);

  return await prisma.user.create({
    data: { email, password: hashedPassword },
    select: { id: true, email: true, role: true }
  });
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) throw new Error("User not found");

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error("Invalid password");

  // CRITICAL CHANGE: 
  // We include 'role' in the payload so the middleware can verify it later.
  const token = jwt.sign(
    { 
      userId: user.id, 
      role: user.role  // Make sure your Prisma schema has a role field!
    }, 
    process.env.JWT_SECRET!, 
    { expiresIn: '1h' }
  );

  // Return both items
  return { token, user };
};


export const getAdminDashboardStats = async () => {
  // Promise.all runs both counts simultaneously for better performance
  const [userCount, movieCount] = await Promise.all([
    prisma.user.count(),
    prisma.movie.count(),
  ]);

  return {
    totalUsers: userCount,
    totalMovies: movieCount,
  };
};