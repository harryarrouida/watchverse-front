import Sidebar from "./components/common/sidebar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/public/home";
import Footer from "./components/common/footer";
import Movies from "./pages/public/Movies";
import Shows from "./pages/public/Shows";
import Anime from "./pages/public/Anime";

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
