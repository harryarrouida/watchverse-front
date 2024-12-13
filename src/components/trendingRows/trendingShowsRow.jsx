import { useSwipeable } from "react-swipeable";
import { useState, useRef, useEffect } from "react";
import { tvShowServices } from "../../services/specific/tvshowServices";

const TrendingShowsRow = () => {
  const [position, setPosition] = useState(0);
  const [shows, setShows] = useState([]);
  const rowRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const fetchTrendingShows = async () => {
      try {
        const data = await tvShowServices.getTrendingTvShows();
        setShows(data.results);
      } catch (error) {
        console.error("Error fetching trending shows:", error);
      }
    };

    fetchTrendingShows();
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
        Trending TV Shows
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
          {shows?.map((show) => (
            <div
              key={show.id}
              className="min-w-[180px] flex-shrink-0 cursor-pointer px-2 mr-6 relative hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1 z-20">
                <span className="text-yellow-400">★</span>
                <span className="text-white text-sm">
                  {show.vote_average.toFixed(1)}
                </span>
              </div>
              <img
                src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                alt={show.name}
                className="w-full h-[270px] object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingShowsRow;
