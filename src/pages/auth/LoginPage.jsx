import { setAuthTokenAction } from '../../redux/auth/authActions';
import { loginService } from '../../services/authServices.js';
import { useDispatch } from 'react-redux';
import { InputField } from '../../components/auth/InputField';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { SiteLogo } from '../../components/SiteLogo';
import {
  Flex,
  Box,
  Card,
  CardBody,
  Button,
  ButtonGroup,
  useToast,
  useColorMode,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(3)
    .max(50, 'Email cannot be longer than 50')
    .required('Email is required'),
  password: yup.string().min(8).max(255).required('Password is required'),
});

export default function LoginPage() {
  const { colorMode } = useColorMode();
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      loginService(values)
        .then((user) => {
          dispatch(setAuthTokenAction(user.token));
        })
        .catch((err) => {
          toast({
            title: 'An error has been encountered',
            message: err.message,
            status: 'error',
          });
        })
        .finally(() => {
          navigate('/');
        });
    },
  });
  return (
    <Flex h={'90vh'} justifyContent={'center'} alignItems={'center'}>
      <Card mW={'500px'} w={'95%'}>
        <CardBody
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          gap={4}
          w={'100%'}
        >
          <SiteLogo to="/signin" isLight={colorMode === 'dark'} />
          <Box
            as="form"
            mt={'2'}
            display={'flex'}
            flexDir={'column'}
            gap={'4'}
            justifyContent={'center'}
            alignItems={'center'}
            w={'100%'}
            onSubmit={formik.handleSubmit}
          >
            <InputField
              required={true}
              label={'Username'}
              disabled={false}
              meta={formik.getFieldMeta('username')}
              placeholder="Username"
              {...formik.getFieldProps('username')}
            />
            <InputField
              required={true}
              label={'Password'}
              disabled={false}
              meta={formik.getFieldMeta('password')}
              placeholder="Password"
              type="password"
              {...formik.getFieldProps('password')}
            />
            <ButtonGroup w={'100%'}>
              <Button type="submit" colorScheme="purple" w={'100%'}>
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
          </Box>
        </CardBody>
      </Card>
    </Flex>
  );
}
