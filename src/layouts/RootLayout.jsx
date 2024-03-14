import { Navbar } from '../components/rootLayoutComponents/Navbar.jsx';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/rootLayoutComponents/Sidebar.jsx';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAuthToken } from '../redux/auth/authSelectors.js';

export function RootLayout() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const authToken = useSelector(selectAuthToken);

  return (
    <>
      <Navbar isLoggedIn={authToken} onOpen={() => setIsSideBarOpen(true)} />
      <Sidebar isOpen={isSideBarOpen} onClose={() => setIsSideBarOpen(false)} />
      <Outlet />
    </>
  );
}
