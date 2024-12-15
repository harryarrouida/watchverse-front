import { useMemo } from "react";

export default function EmptyPoster({ count = 1 }) {
  const emptyPosters = useMemo(() => {
    return Array(count).fill(null);
  }, [count]);

  return (
    <>
      {emptyPosters.map((_, index) => (
        <div
          key={index}
          className="min-w-[180px] h-[270px] flex-shrink-0 px-2 mr-6 relative bg-gray-800/30 rounded-lg animate-pulse"
        >
          <div className="absolute top-3 left-3 bg-gray-700/60 w-16 h-6 rounded-md" />
          <div className="absolute top-3 right-3 bg-gray-700/60 w-8 h-8 rounded-full" />
        </div>
      ))}
    </>
  );
}
