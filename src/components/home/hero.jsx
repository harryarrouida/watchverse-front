import { useState, useEffect } from "react";
import { AiOutlineSearch, AiOutlineUser } from "react-icons/ai";
import AuthModal from "../modals/AuthModal";

import { tmdbServices } from "../../services/tmdbServices";
import SearchModal from "../modals/searchModal";
import LazyImage from "../common/LazyImage";

import { MdOutlineLogin, MdOutlineHail } from "react-icons/md";

export default function Hero() {
  const [content, setContent] = useState(null);
  const [allContent, setAllContent] = useState([]);

  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const fetchTrendingContent = async () => {
      try {
        const data = await tmdbServices.getTrendingAll();
        setAllContent(data.results);
        // Set initial random content
        setContent(
          data.results[Math.floor(Math.random() * data.results.length)]
        );
      } catch (error) {
        console.error("Error fetching trending content:", error);
      }
    };

    fetchTrendingContent();

    // Set up interval to change content every 10 seconds
    const intervalId = setInterval(() => {
      if (isAnimating) {
        setContent((currentContent) => {
          if (!allContent.length) return currentContent;
          let randomIndex;
          let newContent;
          // Keep generating random index until we get different content
          do {
            randomIndex = Math.floor(Math.random() * allContent.length);
            newContent = allContent[randomIndex];
          } while (
            newContent?.id === currentContent?.id &&
            allContent.length > 1
          );
          return newContent;
        });
      }
    }, 10000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [allContent.length]); // Only re-run if content array length changes

  if (isSearchModalOpen) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50">
        <SearchModal onClose={() => setIsSearchModalOpen(false)} />
      </div>
    );
  }

  const handleAuthModal = () => {
    setIsAuthModalOpen(!isAuthModalOpen);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, [isAuthModalOpen]);

  if (!content) return null;

  return (
    <div className="relative h-screen rounded-lg">
      {/* Background Image */}
      <div className="absolute inset-0 rounded-lg">
        {content ? (
          <LazyImage
            src={`https://image.tmdb.org/t/p/original${content.backdrop_path}`}
            alt={content.title || content.name}
            className="w-full h-full object-cover opacity-40 rounded-lg"
            loading="lazy"
            show={content}
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent rounded-lg" />
      </div>

      {/* Navbar */}
      <nav className="relative flex items-center justify-between px-6 py-4 w-full">
        <div className="flex items-center w-1/3">
          <div className="relative w-full">
            <input
              onClick={() => setIsSearchModalOpen(true)}
              type="text"
              placeholder="Search..."
              className="w-full bg-gray-700/30 backdrop-blur-sm text-white px-4 py-3 pl-10 rounded-full focus:outline-none focus:ring-1 focus:ring-gray-500 cursor-pointer"
              readOnly
            />
            <AiOutlineSearch
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>
        </div>
        <div className="flex items-center">
          {token ? (
            <button className="text-white hover:text-gray-300 bg-gray-700/30 backdrop-blur-sm rounded-full p-2">
              <MdOutlineHail size={24} />
            </button>
          ) : (
            <button
              onClick={handleAuthModal}
              className="text-white hover:text-gray-300 bg-gray-700/30 backdrop-blur-sm rounded-full p-2"
            >
              <MdOutlineLogin size={24} className="text-indigo-500" />
            </button>
          )}
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative h-[calc(100%-80px)] flex items-center px-12">
        <div className="w-2/3 space-y-6">
          <h1 className="text-6xl font-bold text-white">
            {content.title || content.name}
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-yellow-400 text-xl font-semibold">
              ★ {content.vote_average.toFixed(1)}
            </span>
            <span className="text-gray-300">
              Release: {content.release_date || content.first_air_date}
            </span>
          </div>
          <p className="text-gray-300 text-lg max-w-2xl line-clamp-3">
            {content.overview}
          </p>
          <div className="flex gap-4">
            <button className="px-8 py-3 bg-white text-black font-semibold rounded hover:bg-opacity-90 transition">
              Watch Now
            </button>
            <button className="px-8 py-3 bg-gray-600/30 text-white font-semibold rounded hover:bg-gray-600/50 transition">
              More Info
            </button>
          </div>
        </div>
      </div>

      {isAuthModalOpen && (
        <AuthModal isOpen={isAuthModalOpen} onClose={handleAuthModal} />
      )}
    </div>
  );
}
