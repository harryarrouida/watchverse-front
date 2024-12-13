import { useState, useEffect } from "react";
import { tmdbServices } from "../../services/tmdbServices";
import Poster from "../common/Poster";

export default function BestByCategory() {
  const [selectedCategory, setSelectedCategory] = useState("movie");
  const [content, setContent] = useState([]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const data = await tmdbServices.getBestByCategory(selectedCategory);
        setContent(data.results.slice(0, 5)); // Get top 5 results
      } catch (error) {
        console.error("Error fetching best content:", error);
      }
    };

    fetchContent();
  }, [selectedCategory]);

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
        <div className="flex justify-between items-center mb-12">
          <div className="space-y-2">
            <h2 className="text-4xl font-bold text-white tracking-tight">Top 5 Rated</h2>
            <p className="text-gray-400">The highest rated content of all time</p>
          </div>
          <div className="flex gap-4 bg-gray-800/40 p-1.5 rounded-full backdrop-blur-lg transition-all duration-300">
            <button
              onClick={() => setSelectedCategory("movie")}
              className={`px-8 py-2.5 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === "movie"
                  ? "bg-white text-gray-900 shadow-lg"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Movies
            </button>
            <button
              onClick={() => setSelectedCategory("tv")}
              className={`px-8 py-2.5 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === "tv"
                  ? "bg-white text-gray-900 shadow-lg"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              TV Shows
            </button>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-8">
          {content.map((item, index) => (
            // <div
            //   key={item.id}
            //   className="relative group cursor-pointer"
            // >
            //   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl z-10" />
              
            //   <div className="absolute top-4 left-4 flex items-center gap-2 z-20">
            //     <div className="bg-white text-gray-900 font-bold px-3 py-1 rounded-lg shadow-lg">
            //       #{index + 1}
            //     </div>
            //     <div className="bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1">
            //       <span className="text-yellow-400">★</span>
            //       <span className="text-white font-medium">{item.vote_average.toFixed(1)}</span>
            //     </div>
            //   </div>

            //   <div className="relative overflow-hidden rounded-xl aspect-[2/3] group-hover:transform group-hover:scale-[1.02] transition-all duration-300">
            //     <img
            //       src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
            //       alt={item.title || item.name}
            //       className="w-full h-full object-cover"
            //     />
            //   </div>

            //   <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20">
            //     <h3 className="text-white font-bold text-xl mb-2 drop-shadow-lg">
            //       {item.title || item.name}
            //     </h3>
            //     <p className="text-gray-300 font-medium">
            //       {new Date(
            //         item.release_date || item.first_air_date
            //       ).getFullYear()}
            //     </p>
            //   </div>
            // </div>
            <Poster item={item} index={index} showRank={true} />
          ))}
        </div>
      </div>
    </div>
  );
}
