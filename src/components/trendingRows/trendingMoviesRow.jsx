import { movieServices } from "../../services/specific/movieServices";
import NormalRow from "../common/NormalRow";

const TrendingMoviesRow = () => {
  return (
    <NormalRow
      title="Trending Movies"
      fetchItems={movieServices.getTrendingMovies}
    />
  );
};

export default TrendingMoviesRow;
