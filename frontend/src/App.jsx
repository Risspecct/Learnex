import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PhaserGame from './components/PhaserGame';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* The root path "/" will now show your new HomePage component */}
        <Route path="/" element={<HomePage />} />

        {/* We've given the physics game a more specific URL */}
        <Route path="/game/physics-lab" element={<PhaserGame />} />

        {/* We will add routes for login, dashboard, etc. here later */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;