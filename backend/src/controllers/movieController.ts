import type{ Request, Response } from "express";
import * as movieService from "../services/movieService.js";

/**
 * Interface representing the raw data sent from the Vue frontend.
 * Frontend forms often send numeric values as strings.
 */
interface MovieRequestBody {
  title: string;
  description: string;
  posterUrl: string;
  genre: string;
  releaseYear: string | number;
}

/**
 * Interface representing the strict types required by the Prisma Service.
 */
interface MovieInput {
  title: string;
  description: string;
  posterUrl: string;
  genre: string;
  releaseYear: number;
}

export const getMovies = async (_req: Request, res: Response) => {
  try {
    const movies = await movieService.getAllMovies();
    res.status(200).json(movies);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const addMovie = async (req: Request, res: Response) => {
  try {
    const body: MovieRequestBody = req.body;

    // 1. Validate required fields
    if (!body.title || !body.description || !body.posterUrl || !body.releaseYear) {
      return res.status(400).json({ error: "Title, description, posterUrl, and releaseYear are required." });
    }

    // 2. Transform types (Force releaseYear to be a Number for Prisma)
    const movieData: MovieInput = {
      title: body.title,
      description: body.description,
      posterUrl: body.posterUrl,
      genre: body.genre,
      releaseYear: Number(body.releaseYear),
    };

    const movie = await movieService.createMovie(movieData);
    res.status(201).json({ message: "Movie created successfully", movie });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const editMovie = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const body: Partial<MovieRequestBody> = req.body;

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid movie ID" });
    }

    // 3. Manually map properties to satisfy strict TypeScript 'exactOptionalPropertyTypes'
    const updateData: Partial<MovieInput> = {};

    if (body.title !== undefined) updateData.title = body.title;
    if (body.description !== undefined) updateData.description = body.description;
    if (body.posterUrl !== undefined) updateData.posterUrl = body.posterUrl;
    if (body.genre !== undefined) updateData.genre = body.genre;
    if (body.releaseYear !== undefined) {
      updateData.releaseYear = Number(body.releaseYear);
    }

    const movie = await movieService.updateMovie(id, updateData);
    res.status(200).json({ message: "Movie updated successfully", movie });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const removeMovie = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid movie ID" });
    }

    await movieService.deleteMovie(id);
    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};