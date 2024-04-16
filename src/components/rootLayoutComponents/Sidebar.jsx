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
import { MdBallot } from 'react-icons/md';
import { FaAddressCard, FaRegCalendarAlt, FaHome } from 'react-icons/fa';
import {
  FaArrowRightFromBracket,
  FaArrowRightToBracket,
  FaPersonChalkboard,
} from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { flushAuthTokenAction } from '../../redux/auth/authActions.js';

export function Sidebar({ isOpen = false, onClose, isLoggedIn = false }) {
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
            {isLoggedIn && (
              <>
                {' '}
                <Button
                  leftIcon={<FaHome size={'25px'} />}
                  fontWeight={'400'}
                  fontFamily={'B612 Mono", monospace'}
                  marginBottom={'10px'}
                  paddingLeft={'10px'}
                  justifyContent={'start'}
                  variant="ghost"
                  as={Link}
                  to={'/'}
                >
                  Home
                </Button>
                <Button
                  leftIcon={<FaRegCalendarAlt size={'25px'} />}
                  fontWeight={'400'}
                  fontFamily={'B612 Mono", monospace'}
                  marginBottom={'10px'}
                  paddingLeft={'10px'}
                  justifyContent={'start'}
                  variant="ghost"
                  as={Link}
                  to={'/shedule'}
                >
                  Schedule
                </Button>
                <Button
                  leftIcon={<FaPersonChalkboard size={'25px'} />}
                  fontWeight={'400'}
                  fontFamily={'B612 Mono", monospace'}
                  marginBottom={'10px'}
                  paddingLeft={'10px'}
                  justifyContent={'start'}
                  variant="ghost"
                  as={Link}
                  to={'/lesson-list'}
                >
                  Subject List
                </Button>
                <Button
                  leftIcon={<MdBallot size={'25px'} />}
                  fontWeight={'400'}
                  fontFamily={'B612 Mono", monospace'}
                  marginBottom={'10px'}
                  paddingLeft={'10px'}
                  justifyContent={'start'}
                  variant="ghost"
                  as={Link}
                  to={'/hw-list'}
                >
                  Homework List
                </Button>{' '}
              </>
            )}

            {isLoggedIn === false && (
              <>
                <Button
                  leftIcon={<FaAddressCard size={'25px'} />}
                  fontWeight={'400'}
                  fontFamily={'B612 Mono", monospace'}
                  marginBottom={'10px'}
                  paddingLeft={'10px'}
                  justifyContent={'start'}
                  variant="ghost"
                  as={Link}
                  to={'/signup'}
                >
                  Register
                </Button>
                <Button
                  leftIcon={<FaArrowRightToBracket size={'25px'} />}
                  fontWeight={'400'}
                  fontFamily={'B612 Mono", monospace'}
                  marginBottom={'10px'}
                  paddingLeft={'10px'}
                  justifyContent={'start'}
                  variant="ghost"
                  as={Link}
                  to={'/signin'}
                >
                  Log in
                </Button>{' '}
              </>
            )}
          </Flex>
        </DrawerBody>
        <DrawerFooter>
          <IconButton
            onClick={() => {
              dispatch(flushAuthTokenAction());
            }}
            variant="outline"
            icon={<FaArrowRightFromBracket size={'20px'} />}
            as={Link}
            to={'/'}
            aria-label={'logout button'}
          ></IconButton>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

Sidebar.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};
