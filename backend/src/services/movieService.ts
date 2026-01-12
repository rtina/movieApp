import prisma from "../lib/prisma.js";

/**
 * Interface representing the data required to create a Movie.
 * This aligns with your PostgreSQL schema: title, description, posterUrl, genre, and releaseYear (Int).
 */
export interface MovieInput {
  title: string;
  description: string;
  posterUrl: string;
  genre: string;
  releaseYear: number;
}

/**
 * Fetch all movies, ordered by the most recently created.
 */
export const getAllMovies = async () => {
  return await prisma.movie.findMany({
    orderBy: { 
      createdAt: 'desc' 
    }
  });
};

/**
 * Create a new movie record in the database.
 * @param data - Validated MovieInput object
 */
export const createMovie = async (data: MovieInput) => {
  return await prisma.movie.create({ 
    data: {
      title: data.title,
      description: data.description,
      posterUrl: data.posterUrl,
      genre: data.genre,
      releaseYear: data.releaseYear
    }
  });
};

/**
 * Update an existing movie record.
 * Uses Partial<MovieInput> to allow updating only specific fields.
 * @param id - The unique database ID of the movie
 * @param data - An object containing the fields to be updated
 */
export const updateMovie = async (id: number, data: Partial<MovieInput>) => {
  return await prisma.movie.update({
    where: { id },
    data: data
  });
};

/**
 * Permanently remove a movie from the database.
 * @param id - The unique database ID of the movie
 */
export const deleteMovie = async (id: number) => {
  return await prisma.movie.delete({
    where: { id }
  });
};