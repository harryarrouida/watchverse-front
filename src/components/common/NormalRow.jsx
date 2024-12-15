import { useSwipeable } from "react-swipeable";
import { useState, useRef, useEffect, useMemo } from "react";
import NormalPoster from "./NormalPoster";
import { useFavorites } from "../../contexts/FavoritesContext";
import EmptyPoster from "./EmptyPoster";
import { useTrack } from "../../contexts/TrackContext";

const NormalRow = ({ title, content = [], animate = false, showHeart = true }) => {
  const { favorites } = useFavorites();
  const { tracks } = useTrack();

  const [position, setPosition] = useState(0);
  const rowRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(animate);

  // Memoize processed content to avoid unnecessary recalculations
  const processedContent = useMemo(() => {
    let currentContent = content;

    // explaining: this is for the favorites row
    if (title === "favorites") {
      return content.map((item) => ({
        ...item,
        is_favorite: true,
      }));
    }

    return currentContent.map((item) => ({
      ...item,
      is_favorite: favorites.some((fav) => fav.tmdbId === item.id),
      status : item.status ? item.status : tracks.find(track => track.tmdbId === item.id)?.status
    }));
  }, [content, favorites, tracks, title]);

  // animation handler
  // useEffect(() => {
  //   let intervalId;

  //   if (isAnimating && rowRef.current) {
  //     intervalId = setInterval(() => {
  //       const rowWidth = rowRef.current.scrollWidth;
  //       const containerWidth = rowRef.current.clientWidth;
  //       const maxPosition = -(rowWidth - containerWidth);

  //       setPosition((prevPosition) => {
  //         const newPosition = prevPosition - 220;
  //         return newPosition <= maxPosition ? 0 : newPosition;
  //       });
  //     }, 3000);
  //   }

  //   return () => clearInterval(intervalId);
  // }, [isAnimating]);

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
        {processedContent.length === 0 ? (
          <EmptyPoster count={1} />
        ) : (
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
                    <NormalPoster show={item} showHeart={showHeart} title={title} />
                  </div>
                )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NormalRow;
