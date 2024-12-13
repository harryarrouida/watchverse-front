import { useState, useEffect } from 'react';
import { tmdbServices } from '../services/tmdbServices';

export default function Hero() {
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const fetchTrendingMovie = async () => {
            try {
                const data = await tmdbServices.getPopularMovies();
                setMovie(data.results[0]);
            } catch (error) {
                console.error('Error fetching trending movie:', error);
            }
        };

        fetchTrendingMovie();
    }, []);

    if (!movie) return null;

    return (
      <div className="fixed top-0 right-0 w-[calc(100%-300px)] h-screen bg-transparent">
        {/* Hero Content */}
        <div className="mt-24 px-6">
          <div className="bg-gray-700/30 backdrop-blur-sm rounded-lg flex items-center justify-between p-8 shadow-2xl">
            {/* info section */}
            <div className="w-1/2 flex flex-col justify-center gap-4 pr-8">
              <h1 className="text-4xl font-bold text-white tracking-wide">{movie.title}</h1>
              <p className="text-lg text-gray-200 line-clamp-3">
                {movie.overview}
              </p>
              <div className="flex items-center gap-6 mt-2">
                <span className="text-yellow-400 text-xl font-semibold flex items-center gap-1">
                  ★ {movie.vote_average.toFixed(1)}
                </span>
                <span className="text-gray-300 text-lg">
                  Release: {movie.release_date}
                </span>
              </div>
            </div>
            {/* image section */}
            <div className="w-1/2 flex items-center justify-center">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="h-80 rounded-lg shadow-2xl transform transition-transform hover:scale-105 duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    );
}
