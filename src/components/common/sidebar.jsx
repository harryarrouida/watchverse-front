import { Link } from "react-router-dom";

import {
  AiFillHome,
  AiOutlineSearch,
  AiOutlineHistory,
  AiOutlineSetting,
  AiOutlineVideoCamera,
} from "react-icons/ai";
import { BiMoviePlay } from "react-icons/bi"; 
import { MdFavorite, MdLocalMovies } from "react-icons/md";
import { BsBookmarkHeart } from "react-icons/bs";

const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-[300px] bg-black text-white p-2">
      <nav className="flex flex-col space-y-2">
        {/* Top Section */}
        <div className="space-y-2 bg-[#121212] rounded-lg p-2">
          <Link to="/" className="flex items-center space-x-3 p-2 rounded">
            <AiFillHome size={24} />
            <span>Home</span>
          </Link>
          <Link
            to="/profile"
            className="flex items-center space-x-3 p-2 rounded"
          >
            <AiOutlineSearch size={24} />
            <span>Profile</span>
          </Link>
        </div>

        {/* Main Navigation */}
        <div className="space-y-2 pb-4 bg-[#121212] rounded-lg p-2">
          <Link
            to="/movies"
            className="flex items-center space-x-3 p-2 rounded"
          >
            <MdLocalMovies size={24} />
            <span>Movies</span>
          </Link>
          <Link
            to="/shows"
            className="flex items-center space-x-3 p-2 rounded"
          >
            <AiOutlineSearch size={24} />
            <span>Shows</span>
          </Link>
          <Link
            to="/anime"
            className="flex items-center space-x-3 p-2 rounded"
          >
            <AiOutlineVideoCamera size={24} />
            <span>Anime</span>
          </Link>
        </div>

        {/* Personal Lists and Bottom Section */}
        <div className="flex flex-col justify-between h-full bg-[#121212] rounded-lg p-2 gap-y-56">
          <div className="space-y-2">
            <Link
              to="/track"
              className="flex items-center space-x-3 p-2 rounded"
            >
              <MdFavorite size={24} />
              <span>Track</span>
            </Link>
            <Link
              to="/favorites"
              className="flex items-center space-x-3 p-2 rounded"
            >
              <MdFavorite size={24} />
              <span>test</span>
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
              <BiMoviePlay size={24} />
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
    </aside>
  );
};

export default Sidebar;
