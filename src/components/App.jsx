import { Routes, Route } from 'react-router-dom';
import { NewsDetailPage } from '../pages/news/NewsDetailPage.jsx';
import { HomeworkListPage } from '../pages/HomeworkListPage.jsx';
import { LessonListPage } from '../pages/LessonListPage.jsx';
import { ShedulePage } from '../pages/ShedulePage.jsx';
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
        <Route path="/signin" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />

        <Route
          path="/news"
          element={
            <PrivateRoute>
              <NewsPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/hw-list"
          element={
            <PrivateRoute>
              <HomeworkListPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/lesson-list"
          element={
            <PrivateRoute>
              <LessonListPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/shedule"
          element={
            <PrivateRoute>
              <ShedulePage />
            </PrivateRoute>
          }
        />

        <Route
          path="/news/:id"
          element={
            <PrivateRoute>
              <NewsDetailPage />
            </PrivateRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
