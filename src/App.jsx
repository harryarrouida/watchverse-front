import Sidebar from './components/sidebar';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';

function App() {
  return (
    <div className="w-screen h-screen bg-black">
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
