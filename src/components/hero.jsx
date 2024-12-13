import { useState, useEffect } from "react";
import { AiOutlineSearch, AiOutlineUser } from "react-icons/ai";

import { movieServices } from "../services/movieServices";

export default function Hero() {
  const [movie, setMovie] = useState(null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchTrendingMovie = async () => {
      try {
        const data = await movieServices.getPopularMovies();
        setMovies(data.results);
        // Set initial random movie
        setMovie(data.results[Math.floor(Math.random() * data.results.length)]);
      } catch (error) {
        console.error("Error fetching trending movie:", error);
      }
    };

    fetchTrendingMovie();

    // Set up interval to change movie every 5 seconds
    const intervalId = setInterval(() => {
      setMovie((currentMovie) => {
        if (!movies.length) return currentMovie;
        let randomIndex;
        let newMovie;
        // Keep generating random index until we get a different movie
        do {
          randomIndex = Math.floor(Math.random() * movies.length);
          newMovie = movies[randomIndex];
        } while (newMovie?.id === currentMovie?.id && movies.length > 1);
        return newMovie;
      });
    }, 10000); // Changed to 5 seconds for smoother transitions

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [movies.length]); // Only re-run if movies array length changes

  if (!movie) return null;

  return (
    <div className="relative h-screen">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent rounded-lg" />
      </div>

      {/* Navbar */}
      <nav className="relative flex items-center justify-between px-6 py-4 w-full">
        <div className="flex items-center w-1/3">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search movies..."
              className="w-full bg-gray-700/30 backdrop-blur-sm text-white px-4 py-3 pl-10 rounded-full focus:outline-none focus:ring-1 focus:ring-gray-500"
            />
            <AiOutlineSearch
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>
        </div>
        <div className="flex items-center">
          <button className="text-white hover:text-gray-300 bg-gray-700/30 backdrop-blur-sm rounded-full p-2">
            <AiOutlineUser size={24} />
          </button>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative h-[calc(100%-80px)] flex items-center px-12">
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
  );
}
