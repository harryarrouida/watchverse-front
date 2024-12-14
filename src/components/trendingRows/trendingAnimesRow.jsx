import { animeServices } from "../../services/content/animeServices";
import NormalRow from "../common/NormalRow";

const TrendingAnimesRow = () => {
  const fetchAnimes = async () => {
    const data = await animeServices.getTrendingAnimes();
    // Filter for anime content
    data.results = data.results.filter((movie) => 
      movie.genre_ids.includes(16)
    );
    return data;
  };

  return (
    <NormalRow
      title="Trending Anime"
      fetchItems={fetchAnimes}
    />
  );
};

export default TrendingAnimesRow;
