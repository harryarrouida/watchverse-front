import { Link } from 'react-router-dom';

// You'll need to import your icons from a library like react-icons
import { 
  AiFillHome,
  AiOutlineSearch,
  AiOutlineHistory,
  AiFillHeart,
  AiOutlineSetting
} from 'react-icons/ai';
import { 
  BiTrendingUp,
  BiStar
} from 'react-icons/bi';
import { MdFavorite } from 'react-icons/md';

const Sidebar = () => {
  return (
    <div className="fixed left-0 h-screen w-[300px] bg-black text-white pr-2">
      <nav className="flex flex-col space-y-2">
        {/* Top Section */}
        <div className="space-y-2 bg-[#121212] rounded-lg p-2">
          <Link
            to="/"
            className="flex items-center space-x-3 p-2 rounded"
          >
            <AiFillHome size={24} />
            <span>Home</span>
          </Link>
          <Link
            to="/search"
            className="flex items-center space-x-3 p-2 rounded"
          >
            <AiOutlineSearch size={24} />
            <span>Search</span>
          </Link>
        </div>

        {/* Main Navigation */}
        <div className="space-y-2 pb-4 bg-[#121212] rounded-lg p-2">
          <Link
            to="/trending"
            className="flex items-center space-x-3 p-2 rounded"
          >
            <BiTrendingUp size={24} />
            <span>Trending</span>
          </Link>
          <Link
            to="/top-rated"
            className="flex items-center space-x-3 p-2 rounded"
          >
            <BiStar size={24} />
            <span>Top Rated</span>
          </Link>
        </div>

        {/* Personal Lists and Bottom Section */}
        <div className="flex flex-col justify-between h-full bg-[#121212] rounded-lg p-2 gap-y-56">
          <div className="space-y-2">
            <Link
              to="/watchlist"
              className="flex items-center space-x-3 p-2 rounded"
            >
              <AiFillHeart size={24} />
              <span>My Watchlist</span>
            </Link>
            <Link
              to="/favorites"
              className="flex items-center space-x-3 p-2 rounded"
            >
              <MdFavorite size={24} />
              <span>Favorites</span>
            </Link>
          </div>

          <div className="mt-auto space-y-2">
            <Link
              to="/history"
              className="flex items-center space-x-3 p-2 rounded"
            >
              <AiOutlineHistory size={24} />
              <span>History</span>
            </Link>
            <Link
              to="/watchlist"
              className="flex items-center space-x-3 p-2 rounded"
            >
              <AiFillHeart size={24} />
              <span>WatchList</span>
            </Link>
            <Link
              to="/settings"
              className="flex items-center space-x-3 p-2 rounded"
            >
              <AiOutlineSetting size={24} />
              <span>Settings</span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
