import { Avatar, Flex, IconButton, Text } from '@chakra-ui/react';
import { FaBars } from 'react-icons/fa6';
import { RiLoginBoxLine } from 'react-icons/ri';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import sitemap from '../../sitemap.json';
import { useEffect, useState } from 'react';
import { SiteLogo } from '../SiteLogo.jsx';

export function Navbar({ isLoggedIn, onOpen }) {
  const loc = useLocation();
  const [pageName, setPageName] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setPageName(sitemap[loc.pathname]);
  }, [loc]);

  return (
    <>
      {' '}
      <Flex
        alignItems={'center'}
        justifyContent={'space-between'}
        bg={'purple.600'}
        w={'100%'}
        p={'2'}
      >
        <Flex flexDir={'row'} gap={2} alignItems={'center'} mr={3}>
          <IconButton
            color={'purple.50'}
            _hover={{
              color: 'purple.400',
              bg: 'purple.50',
            }}
            aria-label={'toggle sidebar'}
            icon={<FaBars />}
            variant={'outline'}
            onClick={onOpen}
          />
          <SiteLogo />
          <Text color={'white'} fontSize={'xl'}>
            {pageName}
          </Text>
        </Flex>
        {!isLoggedIn ? (
          <IconButton
            aria-label={'login'}
            color={'purple.50'}
            _hover={{
              color: 'purple.400',
              bg: 'purple.50',
            }}
            icon={<RiLoginBoxLine />}
            variant={'outline'}
            onClick={() => {
              navigate('/signin');
            }}
          />
        ) : (
          <Avatar />
        )}
      </Flex>
    </>
  );
}

Navbar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  onOpen: PropTypes.func,
};
