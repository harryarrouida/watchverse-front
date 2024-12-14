export default function Footer() {
  return (
    <div className="bg-black text-white p-4  w-[calc(100%-300px)] mt-10 ml-[300px]">
      <div className="flex justify-between items-center">
        <div className="text-lg font-bold text-purple-500 ml-4">WatchVerse</div>
        <div className="text-sm">
          content provided by{" "}
          <a
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            The Movie Database
          </a>
        </div>
      </div>
    </div>
  );
}
