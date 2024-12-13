import Sidebar from "./components/sidebar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";

function App() {
  return (
    <div className="min-h-screen bg-black p-2">
      <Sidebar />
      <main className="ml-[300px]">
        <Routes> 
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
