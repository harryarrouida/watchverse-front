import { useSwipeable } from "react-swipeable";
import { useState, useRef, useEffect, useMemo } from "react";
import NormalPoster from "./NormalPoster";
import { useFavorites } from "../../contexts/FavoritesContext";
import EmptyPoster from "./EmptyPoster";
import { useTrack } from "../../contexts/TrackContext";

const NormalRow = ({ title, content = [], animate = false, showHeart = true }) => {
  const { favorites } = useFavorites();
  const { tracks } = useTrack();

  // State to keep track of horizontal scroll position
  const [position, setPosition] = useState(0);
  // Reference to the row container for width calculations
  const rowRef = useRef(null);
  // Width of one poster including margins - used for precise scrolling
  const POSTER_WIDTH = 205;

  // Memoize processed content to avoid unnecessary recalculations
  const processedContent = useMemo(() => {
    let currentContent = content;

    if (title === "favorites") {
      return content.map((item) => ({
        ...item,
        is_favorite: true,
      }));
    }

    return currentContent.map((item) => ({
      ...item,
      is_favorite: favorites.some((fav) => fav.tmdbId === item.id),
      status: item.status ? item.status : tracks.find(track => track.tmdbId === item.id)?.status
    }));
  }, [content, favorites, tracks, title]);

  // Handler for the "next" (right) button
  // Moves the row left by one poster width
  // Prevents scrolling beyond the last poster
  const handleNext = () => {
    const rowWidth = rowRef.current?.scrollWidth || 0;     // Total scrollable width
    const containerWidth = rowRef.current?.clientWidth || 0; // Visible container width
    const maxPosition = -(rowWidth - containerWidth);      // Maximum scroll position
    setPosition(Math.max(position - POSTER_WIDTH, maxPosition));
  };

  // Handler for the "previous" (left) button
  // Moves the row right by one poster width
  // Prevents scrolling beyond the first poster
  const handlePrev = () => {
    setPosition(Math.min(position + POSTER_WIDTH, 0));
  };

  // Touch and mouse swipe handlers
  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  // Check if the row is empty to disable navigation
  const isEmpty = processedContent.length === 0;

  return (
    <div className="overflow-hidden w-full h-auto bg-transparent p-4 mt-10">
      {/* Title row with navigation buttons */}
      <div className="flex items-center justify-between mb-6 mx-8">
        <div className="text-white text-2xl font-bold">{title}</div>
        {/* Navigation buttons container */}
        <div className="flex items-center gap-1">
          {/* Previous (left) button */}
          <button
            onClick={handlePrev}
            className="w-8 h-8 flex items-center justify-center bg-zinc-800/80 text-zinc-400 rounded-full hover:bg-zinc-700/80 hover:text-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-zinc-800/80 disabled:hover:text-zinc-400"
            // Disable if at the start or if content is empty
            disabled={position === 0 || isEmpty}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              className="w-5 h-5"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          {/* Next (right) button */}
          <button
            onClick={handleNext}
            className="w-8 h-8 flex items-center justify-center bg-zinc-800/80 text-zinc-400 rounded-full hover:bg-zinc-700/80 hover:text-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-zinc-800/80 disabled:hover:text-zinc-400"
            // Disable if at the end or if content is empty
            disabled={position <= -(rowRef.current?.scrollWidth - rowRef.current?.clientWidth) || isEmpty}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              className="w-5 h-5"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
      {/* Content row */}
      <div className="group relative">
        {isEmpty ? (
          // Show empty poster if no content
          <EmptyPoster count={1} />
        ) : (
          // Content container with horizontal scrolling
          <div
            {...handlers}
            ref={rowRef}
            className="flex transition-transform duration-500 ease-in-out"
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
