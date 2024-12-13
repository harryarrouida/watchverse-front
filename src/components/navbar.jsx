import { AiOutlineSearch, AiOutlineUser } from 'react-icons/ai';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 absolute top-0 left-0 w-full z-10">
      <div className="flex items-center w-1/3">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search movies..."
            className="w-full bg-gray-700/30 backdrop-blur-sm text-white px-4 py-3 pl-10 rounded-full focus:outline-none focus:ring-1 focus:ring-gray-500"
          />
          <AiOutlineSearch
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>
      </div>
      <div className="flex items-center">
        <button className="text-white hover:text-gray-300 bg-gray-700/30 backdrop-blur-sm rounded-full p-2">
          <AiOutlineUser size={24} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
