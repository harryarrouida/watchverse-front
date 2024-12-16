import { Routes, Route } from "react-router-dom";
import { AppProvider } from "./contexts/AppProvider";
import Sidebar from "./components/common/sidebar";
import Home from "./pages/public/home";
import Footer from "./components/common/footer";
import Movies from "./pages/public/Movies";
import Shows from "./pages/public/Shows";
import Anime from "./pages/public/Anime";
import Track from "./pages/private/Track";
import ShowDetails from "./pages/public/ShowDetails";

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-black p-2">
          <Sidebar />
          <main className="ml-[300px]">
            <Routes> 
              <Route path="/" element={<Home />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/shows" element={<Shows />} />
              <Route path="/anime" element={<Anime />} />
              <Route path="/track" element={<Track />} />
              <Route path="/settings" element={<div>Settings coming soon</div>} />
              <Route path="/profile" element={<div>Profile coming soon</div>} />
              <Route path="/show-details/:id/:contentType" element={<ShowDetails />} />
            </Routes> 
          </main>
          <Footer />
        </div>
      </AppProvider>
  );
}

export default App;
