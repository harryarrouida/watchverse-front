import Sidebar from "./components/common/sidebar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Footer from "./components/ui/footer";
import Movies from "./pages/Movies";
import Shows from "./pages/Shows";
import Anime from "./pages/Anime";

function App() {
  return (
    <div className="min-h-screen bg-black p-2">
      <Sidebar />
      <main className="ml-[300px]">
        <Routes> 
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/shows" element={<Shows />} />
          <Route path="/anime" element={<Anime />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
