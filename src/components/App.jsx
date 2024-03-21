import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/auth/LoginPage';
import HomePage from '../pages/HomePage';
import { RootLayout } from '../layouts/RootLayout.jsx';
// eslint-disable-next-line no-unused-vars
import PrivateRoute from './PrivateRoute';
import RegisterPage from '../pages/auth/RegisterPage';
import { NewsPage } from '../pages/news/NewsPage.jsx';

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/news" element={<NewsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
