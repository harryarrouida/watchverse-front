import { useState } from "react";

export default function TopFromWatchlist() {
  // Dummy data for now
  const [content] = useState([
    {
      id: 1,
      title: "Arcane",
      vote_average: 9.1,
      poster_path: "/fqldf2t8ztc9aiwn3k6mlX3tvRT.jpg",
      release_date: "2021-11-06"
    },
    {
      id: 2,
      title: "The Godfather",
      vote_average: 9.2,
      poster_path: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
      release_date: "1972-03-14"
    },
    {
      id: 3,
      title: "The Dark Knight",
      vote_average: 9.0,
      poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg", 
      release_date: "2008-07-16"
    },
    {
      id: 4,
      title: "Pulp Fiction",
      vote_average: 8.9,
      poster_path: "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
      release_date: "1994-09-10"
    },
    {
      id: 5,
      title: "Fight Club",
      vote_average: 8.8,
      poster_path: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
      release_date: "1999-10-15"
    }
  ]);

  return (
    <div className="w-full min-h-[600px] bg-gradient-to-b from-[#121212] to-[#000000] backdrop-blur-lg rounded-2xl p-12 shadow-2xl mt-10 relative overflow-hidden">
      <div className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
        {content.map((item, index) => (
          <div 
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-300 ${
              index === content.findIndex(i => i.id === item.id) ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
              alt=""
              className="w-full h-full object-cover blur-2xl opacity-30"
            />
          </div>
        ))}
      </div>
      
      <div className="relative z-10">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-white tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            From Your Watchlist
          </h2>
          <p className="text-gray-400 mt-2">Your most anticipated content</p>
        </div>

        <div className="grid grid-cols-5 gap-8">
          {content.map((item, index) => (
            <div
              key={item.id}
              className="relative group cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl z-10" />
              
              <div className="absolute top-4 left-4 flex items-center gap-2 z-20">
                <div className="bg-white text-black px-3 py-1 rounded-lg">
                  #{index + 1}
                </div>
                <div className="bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1">
                  <span className="text-yellow-400">★</span>
                  <span className="text-white font-medium">{item.vote_average.toFixed(1)}</span>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-xl aspect-[2/3] group-hover:transform group-hover:scale-[1.02] transition-all duration-300">
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20">
                <h3 className="text-white font-bold text-xl mb-2 drop-shadow-lg">
                  {item.title}
                </h3>
                <p className="text-gray-300 font-medium">
                  {new Date(item.release_date).getFullYear()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
