import { useState, useEffect } from "react";
import { tmdbServices } from "../services/tmdbServices";

export default function Hero() {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchTrendingMovie = async () => {
      try {
        const data = await tmdbServices.getPopularMovies();
        setMovie(data.results[0]);
      } catch (error) {
        console.error("Error fetching trending movie:", error);
      }
    };

    fetchTrendingMovie();
  }, []);

  if (!movie) return null;

  return (
    <div className="fixed top-0 right-0 w-[calc(100%-300px)] h-screen bg-[#121212] z-0">
      <div className="relative h-full">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent" />
        </div>

        {/* Content */}
        <div className="relative h-full flex items-center px-12">
          <div className="w-2/3 space-y-6">
            <h1 className="text-6xl font-bold text-white">{movie.title}</h1>
            <div className="flex items-center gap-4">
              <span className="text-yellow-400 text-xl font-semibold">
                ★ {movie.vote_average.toFixed(1)}
              </span>
              <span className="text-gray-300">
                Release: {movie.release_date}
              </span>
            </div>
            <p className="text-gray-300 text-lg max-w-2xl line-clamp-3">
              {movie.overview}
            </p>
            <div className="flex gap-4">
              <button className="px-8 py-3 bg-white text-black font-semibold rounded hover:bg-opacity-90 transition">
                Watch Now
              </button>
              <button className="px-8 py-3 bg-gray-600/30 text-white font-semibold rounded hover:bg-gray-600/50 transition">
                More Info
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
