import { Routes, Route } from 'react-router-dom';
import { LoginPage } from '../pages/auth/LoginPage';
import HomePage from '../pages/HomePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signin" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
