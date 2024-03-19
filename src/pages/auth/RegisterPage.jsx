import { useFormik } from 'formik';
import * as yup from 'yup';
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

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(3)
    .max(50, 'Username cannot be longer than 50')
    .required('Username is required'),
  password: yup.string().min(8).max(255).required('Password is required'),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
});

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
          <ButtonGroup w={'100%'}>
            <Input placeholder="FirstName" />
            <Input placeholder="LastName" />
          </ButtonGroup>
          <ButtonGroup w={'100%'}>
            <Button colorScheme="purple" w={'100%'}>
              Register
            </Button>
            <Button
              as={Link}
              to={'/signin'}
              variant={'ghost'}
              colorScheme="purple"
              w={'100%'}
            >
              Login
            </Button>
          </ButtonGroup>
        </CardBody>
      </Card>
    </Flex>
  );
}
