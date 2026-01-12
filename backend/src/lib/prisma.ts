import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

// 1. Create a standard 'pg' pool
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

// 2. Initialize the Prisma adapter
const adapter = new PrismaPg(pool);

// 3. Pass the adapter to the PrismaClient constructor
// This is the "Prisma 7 way" for direct DB connections
const prisma = new PrismaClient({ adapter });

export default prisma;