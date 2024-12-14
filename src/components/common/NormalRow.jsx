import { useSwipeable } from "react-swipeable";
import { useState, useRef, useEffect } from "react";
import { MdFavorite } from "react-icons/md";
import { addFavorite } from "../../services/tracker/favoritesServices";
import NormalPoster from "./NormalPoster";

const NormalRow = ({ title, fetchItems, data = null }) => {
  const [position, setPosition] = useState(0);
  const [content, setContent] = useState([]);
  const rowRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (data) {
      console.log('Data received:', data);
      setContent(data);
    } else {
      const fetchContent = async () => {
        try {
          const response = await fetchItems();
          console.log('Fetched results:', response.results);
          setContent(response.results);
        } catch (error) {
          console.error(`Error fetching ${title}:`, error);
        }
      };

      fetchContent();
    }
  }, [data, fetchItems, title]);

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

  const handleAddFavorite = async (item) => {
    try {
      const favorite = {
        title: item.title || item.name,
        type: "tv",
        poster_path: item.poster_path,
        tmdbId: item.id, 
        vote_average: item.vote_average,
      };
      await addFavorite(favorite);
      console.log("Added to favorites:", favorite);
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  return (
    <div className="overflow-hidden w-full h-auto bg-transparent p-4 mt-10">
      <div className="text-white text-2xl font-bold mb-6 ml-8">{title}</div>
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
          {content?.map((item) => (
            item && (
              <div key={item.id} className="relative">
                <NormalPoster show={item} />
                <button
                  onClick={() => handleAddFavorite(item)}
                  className="absolute bottom-2 left-2 text-white hover:text-red-500 transition-colors duration-200"
                >
                  <MdFavorite size={24} />
                </button>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default NormalRow;
