import LazyImage from "./LazyImage";
export default function NormalPoster({ show }) {
  return (
    <div
      key={show.id}
      className="min-w-[180px] flex-shrink-0 cursor-pointer px-2 mr-6 relative hover:transform hover:scale-105 transition-all duration-300 group"
    >
      <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1 z-20">
        <span className="text-yellow-400">★</span>
        <span className="text-white text-sm">
          {show.vote_average}
        </span>
      </div>
      <LazyImage
        src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
        alt={show.name}
        className="w-full h-[270px] object-cover rounded-lg"
        loading="lazy"
      />
    </div>
  );
}
