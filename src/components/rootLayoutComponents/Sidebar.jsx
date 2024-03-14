import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { SiteLogo } from '../SiteLogo.jsx';
import { IoClose } from 'react-icons/io5';

export function Sidebar({ isOpen = false, onClose }) {
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
      </DrawerContent>
    </Drawer>
  );
}

Sidebar.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};
