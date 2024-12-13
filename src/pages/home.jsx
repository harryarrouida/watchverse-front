import Navbar from "../components/navbar";
import Hero from "../components/hero";
export default function home() {
  return (
    <div className="w-full h-full bg-[#121212] rounded-xl">
        <Navbar />
        <Hero />
    </div>
  );
}
