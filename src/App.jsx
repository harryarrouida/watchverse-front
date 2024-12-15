import Sidebar from "./components/common/sidebar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/public/home";
import Footer from "./components/common/footer";
import Movies from "./pages/public/Movies";
import Shows from "./pages/public/Shows";
import Anime from "./pages/public/Anime";
import Track from "./pages/private/Track";
import { FavoritesProvider } from './contexts/FavoritesContext';
import { TrackProvider } from './contexts/TrackContext';

function App() {
  return (
    <TrackProvider>
      <FavoritesProvider>
        <div className="min-h-screen bg-black p-2">
          <Sidebar />
          <main className="ml-[300px]">
            <Routes> 
              <Route path="/" element={<Home />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/shows" element={<Shows />} />
              <Route path="/anime" element={<Anime />} />
              <Route path="/track" element={<Track />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </FavoritesProvider>
    </TrackProvider>
  );
}

export default App;
