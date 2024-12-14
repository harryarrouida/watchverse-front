import { tvShowServices } from "../../services/content/tvshowServices";
import NormalRow from "../common/NormalRow";

const TrendingShowsRow = () => {
  return (
    <NormalRow
      title="Trending TV Shows"
      fetchItems={tvShowServices.getTrendingTvShows}
    />
  );
};

export default TrendingShowsRow;