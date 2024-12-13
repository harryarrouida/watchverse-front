export default function Footer() {
  return (
    <div className="bg-black text-white p-4">
      <div className="flex justify-between items-center">
        <div className="text-lg font-bold">WatchVerse</div>
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
