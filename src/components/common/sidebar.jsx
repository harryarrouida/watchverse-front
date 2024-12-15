import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

import {
  MdOutlineHome,
  MdOutlineSettings,
  MdOutlineMovie,
  MdOutlineLiveTv,
  MdOutlineVideoLibrary,
  MdOutlineFavorite,
  MdOutlinePlaylistPlay,
  MdOutlinePerson,
  MdOutlineLogout,
  MdOutlineLogin,
} from "react-icons/md";

const Sidebar = () => {
  const navigate = useNavigate();
  const { logoutUser, isLoggedIn } = useAuth();

  const handleLogout = () => {
    console.log("logout");
    logoutUser();
    navigate("/");
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-[300px] bg-black text-white p-2">
      <nav className="flex flex-col h-full">
        {/* Top Section */}
        <div className="space-y-2 bg-[#121212] rounded-lg p-2">
          <Link to="/" className="flex items-center space-x-3 p-2 rounded">
            <MdOutlineHome size={24} />
            <span>Home</span>
          </Link>
          <Link
            to="/profile"
            className="flex items-center space-x-3 p-2 rounded"
          >
            <MdOutlinePerson size={24} />
            <span>Profile (coming soon)</span>
          </Link>
        </div>

        {/* Main Navigation */}
        <div className="space-y-2 mt-2 bg-[#121212] rounded-lg p-2">
          <Link
            to="/movies"
            className="flex items-center space-x-3 p-2 rounded"
          >
            <MdOutlineMovie size={24} />
            <span>Movies</span>
          </Link>
          <Link
            to="/shows"
            className="flex items-center space-x-3 p-2 rounded"
          >
            <MdOutlineLiveTv size={24} />
            <span>Shows</span>
          </Link>
          <Link
            to="/anime"
            className="flex items-center space-x-3 p-2 rounded"
          >
            <MdOutlineVideoLibrary size={24} />
            <span>Anime</span>
          </Link>
        </div>

        {/* Personal Lists and Bottom Section */}
        <div className="flex-1 flex flex-col mt-2 bg-[#121212] rounded-lg p-2">
          <div className="space-y-2">
            <Link
              to="/track"
              className="flex items-center space-x-3 p-2 rounded"
            >
              <MdOutlinePlaylistPlay size={24} />
              <span>Track</span>
            </Link>
            <Link
              to="/settings"
              className="flex items-center space-x-3 p-2 rounded"
            >
              <MdOutlineSettings size={24} />
              <span>Settings</span>
            </Link>
            <Link
              to="/favorites"
              className="flex items-center space-x-3 p-2 rounded"
            >
              <MdOutlineFavorite size={24} />
              <span>test</span>
            </Link>
          </div>

          <div className="mt-auto">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 p-2 rounded w-full"
              >
                <MdOutlineLogout size={24} className="text-red-500" />
                <span className="text-red-500">Logout</span>   
              </button>
            ) : 
              <button
                className="flex items-center space-x-3 p-2 rounded w-full"
              >
                <MdOutlineLogin size={24} />
                <span>Login</span>
              </button>
            }
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
