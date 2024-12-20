import { useSwipeable } from "react-swipeable";
import { useState, useRef, useEffect } from "react";
import { tmdbServices } from "../../services/tmdbServices";
import NormalPoster from "../common/NormalPoster";

const AllTrendsRow = () => {
  const [position, setPosition] = useState(0);
  const [trends, setTrends] = useState([]);
  const rowRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const fetchAllTrends = async () => {
      try {
        const data = await tmdbServices.getTrendingAll();
        setTrends(data.results);
      } catch (error) {
        console.error("Error fetching all trends:", error);
      }
    };

    fetchAllTrends();
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
    <div className="overflow-hidden w-full h-auto bg-transparent p-4 mb-10">
      <div className="text-white text-2xl font-bold mb-6 ml-8">
        Trending Today
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
          {trends?.map((item) => (
            <NormalPoster show={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllTrendsRow;
