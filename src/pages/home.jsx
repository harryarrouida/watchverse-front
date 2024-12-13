// import Navbar from "../components/navbar";
import Hero from "../components/hero";
import TrendingMoviesRow from "../components/trendingMoviesRow";
import TrendingShowsRow from "../components/trendingShowsRow";
import TrendingAnimesRow from "../components/trendingAnimesRow";

export default function home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* <Navbar /> */}
      <Hero />
      <TrendingMoviesRow />
      <TrendingShowsRow />
      <TrendingAnimesRow />
    </div>
  );
}
