import { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import AuthModal from "../modals/AuthModal";

import { tmdbServices } from "../../services/tmdbServices";
import SearchModal from "../modals/searchModal";
import LazyImage from "../common/LazyImage";

import { MdOutlineLogin, MdOutlineHail } from "react-icons/md";

import { useAuth } from "../../contexts/AuthContext";
import { setWithExpiry, getWithExpiry, CACHE_KEYS } from '../../utils/cacheUtils';
import { useFavorites } from '../../contexts/FavoritesContext';
import { useTrack } from '../../contexts/TrackContext';

export default function Hero() {
  const [content, setContent] = useState(null);
  const [allContent, setAllContent] = useState([]);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true); // Set to true by default
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { isLoggedIn } = useAuth();
  const [loading, setLoading] = useState(true);
  const { favorites } = useFavorites();
  const { tracks } = useTrack();

  useEffect(() => {
    const fetchHeroShow = async () => {
      setLoading(true);
      try {
        // Check cache first
        const cachedShow = getWithExpiry(CACHE_KEYS.HERO_SHOW);
        
        if (cachedShow) {
          console.log('🚀 Using cached hero show:', cachedShow);
          console.log('⏰ Cache timestamp:', new Date(JSON.parse(localStorage.getItem(CACHE_KEYS.HERO_SHOW)).timestamp));
          setAllContent(cachedShow);
          // Set initial random content
          const initialContent = cachedShow[Math.floor(Math.random() * cachedShow.length)];
          setContent(initialContent);
          setLoading(false);
          return;
        }

        console.log('🔄 Cache miss - fetching from API...');
        
        // If no cache, fetch from API
        const data = await tmdbServices.getTrendingAll();
        if (data?.results && Array.isArray(data.results)) {
          setAllContent(data.results);
          // Set initial random content
          const initialContent = data.results[Math.floor(Math.random() * data.results.length)];
          setContent(initialContent);

          // Store in cache
          setWithExpiry(CACHE_KEYS.HERO_SHOW, data.results);
        }
      } catch (error) {
        console.error('Error fetching hero show:', error);
      }
      setLoading(false);
    };

    fetchHeroShow();

    // Set up interval to change content every 10 seconds
    const intervalId = setInterval(() => {
      if (isAnimating && allContent.length > 0) {
        setContent((currentContent) => {
          const availableContent = allContent.filter(item => 
            item?.id !== currentContent?.id && 
            item?.backdrop_path // Ensure content has backdrop image
          );
          
          if (availableContent.length === 0) return currentContent;
          
          const randomIndex = Math.floor(Math.random() * availableContent.length);
          return availableContent[randomIndex];
        });
      }
    }, 60000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [allContent.length, isAnimating]);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!content || !content.backdrop_path) return null;

  // Merge with user-specific data
  const processedContent = {
    ...content,
    is_favorite: favorites.some(fav => fav.tmdbId === content.id),
    status: tracks.find(track => track.tmdbId === content.id)?.status
  };

  return (
    <div className="relative h-screen rounded-lg">
      {/* Background Image */}
      <div className="absolute inset-0 rounded-lg">
        <LazyImage
          src={`https://image.tmdb.org/t/p/original${processedContent.backdrop_path}`}
          alt={processedContent.title || processedContent.name}
          className="w-full h-full object-cover opacity-40 rounded-lg"
          loading="lazy"
          show={processedContent}
        />
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
          {isLoggedIn ? (
            <button className="text-white hover:text-gray-300 bg-gray-700/30 backdrop-blur-sm rounded-full p-2">
              <MdOutlineHail size={24} />
            </button>
          ) : (
            <button
              onClick={handleAuthModal}
              className="text-white hover:text-gray-300 bg-gray-700/30 backdrop-blur-sm rounded-full p-2"
            >
              <MdOutlineLogin size={24} className="text-white" />
            </button>
          )}
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative h-[calc(100%-80px)] flex items-center px-12">
        <div className="w-2/3 space-y-6">
          <h1 className="text-6xl font-bold text-white">
            {processedContent.title || processedContent.name}
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-yellow-400 text-xl font-semibold">
              ★ {processedContent.vote_average?.toFixed(1)}
            </span>
            <span className="text-gray-300">
              Release: {processedContent.release_date || processedContent.first_air_date}
            </span>
            <span className="text-gray-300">
              {processedContent.media_type === 'movie' ? 'Movie' : 'TV Series'}
            </span>
          </div>
          <p className="text-gray-300 text-lg max-w-2xl line-clamp-3">
            {processedContent.overview}
          </p>
        </div>
      </div>

      {isAuthModalOpen && (
        <AuthModal isOpen={isAuthModalOpen} onClose={handleAuthModal} />
      )}
    </div>
  );
}
