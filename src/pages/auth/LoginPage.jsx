import { Link } from 'react-router-dom';
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
import { SiteLogo } from '../../components/SiteLogo';
import { useFormik } from 'formik';
import * as yup from 'yup';

export function LoginPage() {
  return (
    <>
      <Flex h={'90vh'} justifyContent={'center'} alignItems={'center'}>
        <Card mx={'30%'} w={'500px'}>
          <CardBody
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}
            gap={4}
          >
            <SiteLogo to="/signin">Login</SiteLogo>
            <Input placeholder="email" />
            <Input placeholder="password" type="password" />
            <ButtonGroup w={'100%'}>
              <Button colorScheme="purple" w={'100%'}>
                Login
              </Button>
              <Button
                as={Link}
                to={'/signup'}
                variant={'ghost'}
                colorScheme="purple"
                w={'100%'}
              >
                Register
              </Button>
            </ButtonGroup>
          </CardBody>
        </Card>
      </Flex>
    </>
  );
}
