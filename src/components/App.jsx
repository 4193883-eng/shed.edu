import { Routes, Route } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}

export default App;
