import Sidebar from "./components/common/sidebar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/public/home";
import Footer from "./components/common/footer";
import Movies from "./pages/public/Movies";
import Shows from "./pages/public/Shows";
import Anime from "./pages/public/Anime";
import Favorites from "./pages/private/Favorites";

function App() {
  return (
    <div className="min-h-screen bg-black p-2">
      <Sidebar />
      <main className="ml-[300px]">
        <Routes> 
          <Route path="/" element={<Home />} />

          {/* public content routes */}
          <Route path="/movies" element={<Movies />} />
          <Route path="/shows" element={<Shows />} />
          <Route path="/anime" element={<Anime />} />

          {/* private content routes */}
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
