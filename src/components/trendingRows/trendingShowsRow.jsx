import { tvShowServices } from "../../services/specific/tvshowServices";
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