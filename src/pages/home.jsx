import Navbar from "../components/navbar";
import Hero from "../components/hero";
import TrendingMoviesRow from "../components/trendingMoviesRow";

export default function home() {
  return (
    <div className="w-[calc(100%-300px)] h-full bg-transparent fixed top-0 right-0">
      <Navbar />
      <Hero />
      <TrendingMoviesRow />
    </div>
  );
}
