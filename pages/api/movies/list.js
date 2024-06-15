// pages/api/movie/list.js
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const hero = req.query.hero === 'true';
    const limit = hero ? 1 : parseInt(req.query.limit) || 6;
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * limit;

    try {
      const response = await axios.get(`https://storage.filmovyraj.com/api/movie/GetMovieList?page=${page}&limit=${limit}`);
      const movies = response.data;

      // Process the fetched data to match the desired structure
      const processedMovies = movies
        .filter(movie => movie.hasSource) // Filter out movies without source
        .map((movie) => ({
          id: movie.id,
          title: movie.movieName,
          year: movie.releaseYear,
          genres: movie.genres.join(', '),
          rating: movie.rating,
          overview: movie.overview,
          friendlyUrl: movie.friendlyUrl,
          hasSource: movie.hasSource,
          image: movie.poster.replace('/w500/', '/w1280/'), // Ensure the correct image size is used
        }));

      // Sort the movies by ID in descending order
      const sortedMovies = processedMovies.sort((a, b) => b.id - a.id);

      res.status(200).json(sortedMovies);
    } catch (error) {
      console.error('Error fetching movies:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
