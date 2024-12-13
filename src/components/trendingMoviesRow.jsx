import { useSwipeable } from 'react-swipeable';
import { useState, useRef, useEffect } from 'react';
import { tmdbServices } from '../services/tmdbServices';

const TrendingMoviesRow = () => {
  const [position, setPosition] = useState(0);
  const [movies, setMovies] = useState([]);
  const rowRef = useRef(null);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const data = await tmdbServices.getPopularMovies();
        setMovies(data.results);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      }
    };

    fetchTrendingMovies();
  }, []);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      const rowWidth = rowRef.current?.scrollWidth || 0;
      const containerWidth = rowRef.current?.clientWidth || 0;
      const maxPosition = -(rowWidth - containerWidth);
      setPosition(Math.max(position - 300, maxPosition));
    },
    onSwipedRight: () => {
      setPosition(Math.min(position + 300, 0));
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  return (
    <div className="overflow-hidden w-full h-[400px] relative bg-transparent p-4">
      {/* Navigation Arrows */}
      <button
        className="z-10 -translate-y-1/2 bg-black/50 p-2 text-white opacity-0 transition hover:bg-black/75 group-hover:opacity-100"
        onClick={() => handlers.onSwipedRight()}
      >
        ←
      </button>
      <button
        className="z-10 -translate-y-1/2 bg-black/50 p-2 text-white opacity-0 transition hover:bg-black/75 group-hover:opacity-100"
        onClick={() => handlers.onSwipedLeft()}
      >
        →
      </button>

      {/* Movies Container */}
      <div className="group relative">
        <div
          {...handlers}
          ref={rowRef}
          className="flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(${position}px)` }}
        >
          {movies?.map((movie) => (
            <div
              key={movie.id}
              className="min-w-[150px] flex-shrink-0 cursor-pointer px-1"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="h-[160px] w-full rounded-lg object-cover transition duration-300 hover:scale-105"
              />
              {/* <h3 className="mt-1 text-xs font-semibold truncate">{movie.title}</h3> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingMoviesRow;
