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
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .min(3)
    .max(50, 'Email cannot be longer than 50')
    .required('Email is required'),
  password: yup.string().min(8).max(255).required('Password is required'),
});

export default function RegisterPage() {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
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
          w={'100%'}
        >
          <SiteLogo to="/signin">SignIn</SiteLogo>
          <Box
            mt={'2'}
            display={'flex'}
            flexDir={'column'}
            gap={'4'}
            justifyContent={'center'}
            alignItems={'center'}
            w={'100%'}
          >
            <InputField
              required={true}
              label={'Email'}
              disabled={false}
              meta={formik.getFieldMeta('email')}
              placeholder="Email"
              {...formik.getFieldProps('email')}
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
          </Box>
        </CardBody>
      </Card>
    </Flex>
  );
}
