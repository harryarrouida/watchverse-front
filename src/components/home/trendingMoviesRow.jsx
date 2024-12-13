import { useSwipeable } from "react-swipeable";
import { useState, useRef, useEffect } from "react";
import { movieServices } from "../../services/movieServices";

const TrendingMoviesRow = () => {
  const [position, setPosition] = useState(0);
  const [movies, setMovies] = useState([]);
  const rowRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const data = await movieServices.getTrendingMovies();
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      }
    };

    fetchTrendingMovies();
  }, []);

  useEffect(() => {
    let intervalId;

    if (isAnimating && rowRef.current) {
      intervalId = setInterval(() => {
        const rowWidth = rowRef.current.scrollWidth;
        const containerWidth = rowRef.current.clientWidth;
        const maxPosition = -(rowWidth - containerWidth);

        setPosition((prevPosition) => {
          const newPosition = prevPosition - 220; // Move one movie poster width
          return newPosition <= maxPosition ? 0 : newPosition;
        });
      }, 3000); // Move every 3 seconds
    }

    return () => clearInterval(intervalId);
  }, [isAnimating]);

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
    trackMouse: true,
  });

  return (
    <div className="overflow-hidden w-full h-auto bg-transparent p-4 mt-10 mt-10">
      <div className="text-white text-2xl font-bold mb-6 ml-8">
        Trending Movies
      </div>
      {/* Movies Container */}
      <div
        className="group relative"
        onMouseEnter={() => setIsAnimating(false)}
        onMouseLeave={() => setIsAnimating(true)}
      >
        <div
          {...handlers}
          ref={rowRef}
          className="flex transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(${position}px)` }}
        >
          {movies?.map((movie, index) => (
            <div
              key={movie.id}
              className="min-w-[180px] flex-shrink-0 cursor-pointer px-2 mr-6 relative hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1 z-20">
                <span className="text-yellow-400">★</span>
                <span className="text-white text-sm">
                  {movie.vote_average.toFixed(1)}
                </span>
              </div>
              <div className="relative">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="h-[270px] w-full rounded-lg object-cover shadow-lg shadow-black/50"
                />
                {index === 0 && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[#121212] via-transparent to-transparent" />
                )}
                {index === movies.length - 1 && (
                  <div className="absolute inset-0 bg-gradient-to-l from-[#121212] via-transparent to-transparent" />
                )}
              </div>
              {/* <h3 className="mt-2 text-sm text-white font-semibold truncate px-1">{movie.title}</h3> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingMoviesRow;
