import { Navigate } from "react-router-dom";
import NormalRow from "../../components/common/NormalRow";
import { FavoritesProvider } from "../../contexts/FavoritesContext";
import { useFavorites } from "../../contexts/FavoritesContext";
import { useTrack } from "../../contexts/TrackContext";

const TrackContent = () => {
  const { watching, watched, toWatch, loading, error } = useTrack();
  const { favorites} = useFavorites();

  console.log("watching, watched, toWatch from TrackContent", watching, watched, toWatch);

  if (loading) {
    return (
      <div className="min-h-screen text-white p-8">
        <h1 className="text-3xl font-bold mb-6">Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen text-white p-8">
        <h1 className="text-3xl font-bold mb-6">Error: {error}</h1>
      </div>
    );
  }

  return (
    <div className="h-auto text-white bg-gradient-to-b from-[#121212] to-black rounded-lg pt-10">
      <div className="text-start">
        <h1 className="text-4xl font-bold z-20 text-white ml-10">
          Track all of your shows and movies
        </h1>
      </div>

      <div className="space-y-4">
        <NormalRow title="favorites" content={favorites} />
        <NormalRow title="watching" content={watching} showHeart={false}/>
        <NormalRow title="watched" content={watched} showHeart={false}/>
        <NormalRow title="to watch" content={toWatch} showHeart={false}/>
      </div>
    </div>
  );
};

const Track = () => {
  if (!localStorage.getItem("token")) {
    return <Navigate to="/home" />;
  }

  return (
    <FavoritesProvider>
      <TrackContent />
    </FavoritesProvider>
  );
};

export default Track;
