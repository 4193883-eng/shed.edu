import { Routes, Route } from 'react-router-dom';
import { HomeworkListPage } from '../pages/HomeworkListPage.jsx';
import { LessonListPage } from '../pages/LessonListPage.jsx';
import { ShedulePage } from '../pages/ShedulePage.jsx';
import LoginPage from '../pages/auth/LoginPage';
import HomePage from '../pages/HomePage';
import { RootLayout } from '../layouts/RootLayout.jsx';
import PrivateRoute from './PrivateRoute';
import RegisterPage from '../pages/auth/RegisterPage';

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

      </Route>
    </Routes>
  );
}

export default App;
