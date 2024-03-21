import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerOverlay,
  Flex,
  IconButton,
  Button,
  DrawerBody,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { SiteLogo } from '../SiteLogo.jsx';
import { IoClose } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { flushAuthTokenAction } from '../../redux/auth/authActions.js';

export function Sidebar({ isOpen = false, onClose }) {
  const dispatch = useDispatch();
  return (
    <Drawer placement={'left'} isOpen={isOpen} onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader bg={'purple.600'} p={2}>
          <Flex alignItems={'center'} justifyContent={'space-between'}>
            <SiteLogo />
            <IconButton
              color={'purple.50'}
              _hover={{
                color: 'purple.400',
                bg: 'purple.50',
              }}
              aria-label={'toggle sidebar'}
              icon={<IoClose />}
              variant={'outline'}
              onClick={onClose}
            />
          </Flex>
        </DrawerHeader>
        <DrawerBody>
          <Flex flexDirection={'column'}>
            <Button marginBottom={'10px'} as={Link} to={'/'}>
              Home page
            </Button>
            <Button marginBottom={'10px'} as={Link} to={'/signin'}>
              Log in
            </Button>
            <Button as={Link} to={'/news'}>
              News
            </Button>
          </Flex>
        </DrawerBody>
        <DrawerFooter>
          <Button
            onClick={() => {
              dispatch(flushAuthTokenAction());
            }}
            as={Link}
            to={'/'}
          >
            Log out
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

Sidebar.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};
