import dotenv from 'dotenv';
dotenv.config();
import express, { type Request, type Response } from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import movieRoutes from './routes/movieRoutes.js';
import userRoutes from './routes/userRoutes.js';


const app = express();

// Middlewares
app.use(cors()); 
app.use(express.json()); 



// Health Check (Optional but recommended)
app.get('/', (req: Request, res: Response) => {
  res.send('Backend API is running...');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use("/api/users", userRoutes);

// Use environment variable for port, or 3000 as fallback
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});