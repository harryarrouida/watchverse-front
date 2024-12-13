import Sidebar from "./components/common/sidebar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Footer from "./components/footer";
import Movies from "./pages/Movies";

function App() {
  return (
    <div className="min-h-screen bg-black p-2">
      <Sidebar />
      <main className="ml-[300px]">
        <Routes> 
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
