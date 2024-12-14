import { useSwipeable } from "react-swipeable";
import { useState, useRef, useEffect } from "react";
import NormalPoster from "./NormalPoster";

const NormalRow = ({ title, content = [], favorites = [] }) => {
  const [position, setPosition] = useState(0);
  const rowRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(true);

  // Process content to include is_favorite flag
  const processedContent = content.map(item => ({
    ...item,
    is_favorite: item.is_favorite === true ? true : favorites.some(fav => fav.tmdbId === item.id)
  }));

  useEffect(() => {
    console.log("content from normal row", content);
    console.log("favorites from normal row", favorites);
    console.log("processedContent from normal row", processedContent);

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
          {processedContent.map(
            (item) =>
              item && (
                <div key={item.id || item._id}>
                  <NormalPoster show={item} />
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default NormalRow;
