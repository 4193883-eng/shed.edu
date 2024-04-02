import { setAuthTokenAction } from '../../redux/auth/authActions';
import { registerService } from '../../services/authServices.js';
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
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(3)
    .max(50, 'Email cannot be longer than 50')
    .required('Email is required'),
  password: yup.string().min(8).max(255).required('Password is required'),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
});

export default function RegisterPage() {
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
    },
    validationSchema,
    onSubmit: (values) => {
      registerService(values)
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
      <Card mx={'30%'} w={'500px'}>
        <CardBody
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          gap={4}
        >
          <SiteLogo to="/signin">SignIn</SiteLogo>
          <Box
            as="form"
            mt={'2'}
            display={'flex'}
            flexDir={'column'}
            gap={'4'}
            justifyContent={'center'}
            alignItems={'center'}
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
              <InputField
                required={true}
                label={'First Name'}
                disabled={false}
                meta={formik.getFieldMeta('firstName')}
                placeholder="First Name"
                {...formik.getFieldProps('firstName')}
              />
              <InputField
                required={true}
                label={'Last Name'}
                disabled={false}
                meta={formik.getFieldMeta('lastName')}
                placeholder="Last Name"
                {...formik.getFieldProps('lastName')}
              />
            </ButtonGroup>
            <ButtonGroup w={'100%'}>
              <Button type="submit" colorScheme="purple" w={'100%'}>
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
          </Box>
        </CardBody>
      </Card>
    </Flex>
  );
}
