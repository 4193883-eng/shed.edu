import { Routes, Route } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import RegisterPage from '../pages/auth/RegisterPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
