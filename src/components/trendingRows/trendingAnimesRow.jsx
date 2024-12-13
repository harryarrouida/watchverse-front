import { useSwipeable } from "react-swipeable";
import { useState, useRef, useEffect } from "react";
import { animeServices } from "../../services/specific/animeServices";
import LazyImage from "../common/LazyImage";

const TrendingAnimesRow = () => {
  const [position, setPosition] = useState(0);
  const [animes, setAnimes] = useState([]);
  const rowRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const fetchTrendingAnimes = async () => {
      try {
        const data = await animeServices.getTrendingAnimes();
        // Filter for anime content
        const animeResults = data.results.filter(
          (movie) => movie.genre_ids.includes(16) // 16 is the genre ID for animation
        );
        setAnimes(animeResults);
      } catch (error) {
        console.error("Error fetching trending animes:", error);
      }
    };

    fetchTrendingAnimes();
  }, []);

  useEffect(() => {
    let intervalId;

    if (isAnimating && rowRef.current) {
      intervalId = setInterval(() => {
        const rowWidth = rowRef.current.scrollWidth;
        const containerWidth = rowRef.current.clientWidth;
        const maxPosition = -(rowWidth - containerWidth);

        setPosition((prevPosition) => {
          const newPosition = prevPosition - 220;
          return newPosition <= maxPosition ? 0 : newPosition;
        });
      }, 3000);
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
    <div className="overflow-hidden w-full h-auto bg-transparent p-4 mt-10">
      <div className="text-white text-2xl font-bold mb-6 ml-8">
        Trending Anime
      </div>
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
          {animes?.map((anime) => (
            <div
              key={anime.id}
              className="min-w-[180px] flex-shrink-0 cursor-pointer px-2 mr-6 relative hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1 z-20">
                <span className="text-yellow-400">★</span>
                <span className="text-white text-sm">
                  {anime.vote_average.toFixed(1)}
                </span>
              </div>
              <LazyImage
                src={`https://image.tmdb.org/t/p/w500${anime.poster_path}`}
                alt={anime.title}
                className="w-full h-[270px] object-cover rounded-lg"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingAnimesRow;
