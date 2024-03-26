import { Navbar } from '../components/rootLayoutComponents/Navbar.jsx';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/rootLayoutComponents/Sidebar.jsx';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAuthToken } from '../redux/auth/authSelectors.js';
import {Flex} from "@chakra-ui/react";

export function RootLayout() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const authToken = useSelector(selectAuthToken);

  return (
    <Flex flexDirection={'column'} height={'100vh'}>
      <Navbar isLoggedIn={!!authToken} onOpen={() => setIsSideBarOpen(true)} />
      <Sidebar isOpen={isSideBarOpen} onClose={() => setIsSideBarOpen(false)} />
      <Outlet />
    </Flex>
  );
}
