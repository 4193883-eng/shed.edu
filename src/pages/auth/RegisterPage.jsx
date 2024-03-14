import { SiteLogo } from '../../components/SiteLogo';
import {
  Flex,
  Box,
  Center,
  Card,
  CardBody,
  Input,
  Button,
  ButtonGroup,
  Wrap,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function RegisterPage() {
  return (
    <Flex h={'90vh'} justifyContent={'center'} alignItems={'center'}>
      <Card mx={'30%'} w={'500px'}>
        <CardBody
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          gap={4}
        >
          <SiteLogo to="/signin">SignIn</SiteLogo>
          <Input placeholder="email" />
          <Input placeholder="password" type="password" />
          <ButtonGroup>
            <Input placeholder="FirstName" />
            <Input placeholder="LastName" />
          </ButtonGroup>
          <ButtonGroup>
            <Button colorScheme="purple">Register</Button>
            <Button
              as={Link}
              to={'/signin'}
              variant={'ghost'}
              colorScheme="purple"
            >
              Login
            </Button>
          </ButtonGroup>
        </CardBody>
      </Card>
    </Flex>
  );
}
