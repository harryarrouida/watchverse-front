import React from 'react';
import LazyImage from './LazyImage';

const Poster = ({ item, index, showRank = false }) => {
  const title = item.title || item.name;
  const releaseDate = item.release_date || item.first_air_date;
  const year = releaseDate ? new Date(releaseDate).getFullYear() : null;

  return (
    <div className="relative group cursor-pointer">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl z-10" />
      
      {/* Top badges */}
      <div className="absolute top-4 left-4 flex items-center gap-2 z-20">
        {showRank && (
          <div className="bg-white text-gray-900 font-bold px-3 py-1 rounded-lg shadow-lg">
            #{index + 1}
          </div>
        )}
        {item.vote_average && (
          <div className="bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1">
            <span className="text-yellow-400">★</span>
            <span className="text-white font-medium">
              {item.vote_average.toFixed(1)}
            </span>
          </div>
        )}
      </div>

      {/* Poster image */}
      <div className="relative overflow-hidden rounded-xl aspect-[2/3] group-hover:transform group-hover:scale-[1.02] transition-all duration-300">
        <LazyImage
          src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
          alt={title}
          className="w-full h-full object-cover"
          show={item}
        />
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20">
        <h3 className="text-white font-bold text-xl mb-2 drop-shadow-lg">
          {title}
        </h3>
        {year && (
          <p className="text-gray-300 font-medium">
            {year}
          </p>
        )}
      </div>
    </div>
  );
};

export default Poster;
