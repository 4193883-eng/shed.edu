import { Routes, Route } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import { RootLayout } from '../layouts/RootLayout.jsx';

function App() {
  // const [isSidebarOpened, onSidebarOpen, onSidebarClose] = useDisclosure();

  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="*" element={<HomePage />} />
      </Route>
    </Routes>
  );
}

export default App;
