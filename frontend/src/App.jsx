import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import AiToolsPage from './pages/AiToolsPage';
import DashboardPage from './pages/DashboardPage'; 
import PhaserGame from './components/PhaserGame';
import ProfilePage from './pages/ProfilePage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game/physics-lab" element={<PhaserGame />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/ai-tools" element={<AiToolsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;