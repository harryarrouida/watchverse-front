import { AiOutlineSearch } from "react-icons/ai";

const SearchModal = () => {
    return (
      <div className="w-screen h-screen bg-black/50 z-50 flex items-center justify-center">
        <input
          type="text"
          placeholder="Search movies..."
          className="w-[500px] bg-gray-700/30 backdrop-blur-sm text-white px-4 py-3 pl-10 rounded-full focus:outline-none focus:ring-1 focus:ring-gray-500"
        />
        <AiOutlineSearch
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
      </div>
    );
}

export default SearchModal;
