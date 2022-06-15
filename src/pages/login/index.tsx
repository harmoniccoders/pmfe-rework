import {
  Box,
  Text,
  Grid,
  Stack,
  FormLabel,
  Image,
  Input,
  Button,
  InputGroup,
  Flex,
  Divider,
} from '@chakra-ui/react';
import { PrimaryInput } from 'lib/Utils/PrimaryInput';
import { LoginModel } from 'types/api';
import ButtonComponent from 'lib/components/Button';
import React, { FormEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useToasts } from 'react-toast-notifications';
import { useRouter } from 'next/router';
import { useOperationMethod } from 'react-openapi-client';
import Cookies from 'js-cookie';
import Link from 'next/link';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const Login = () => {
  const [LoginModelUser, { loading, data, error }] =
    useOperationMethod('Usertoken');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginModel>({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const { addToast } = useToasts();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(true);
  const changePasswordField = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data: LoginModel) => {
    try {
      const result = await (await LoginModelUser(undefined, data)).data;
      console.log({ result });
      if (result.status) {
        addToast('Login Successful', {
          appearance: 'success',
          autoDismiss: true,
        });
        Cookies.set('token', result.data.token);
        Cookies.set('user', JSON.stringify(result.data));
        Cookies.set('userIn', 'true');
        // router.push('/');
        window.location.href = '/';
        return;
      }
      addToast(result.message, {
        appearance: 'error',
        autoDismiss: true,
      });
      return;
    } catch (err) {}
  };

  return (
    <Box w="90%" mx="auto" h="80vh" mt="1.5rem" overflow="hidden">
      <Grid templateColumns={['repeat(1,1fr)', 'repeat(2,1fr)']} gap={5}>
        <Box
          w={['90%', '100%', '40vw']}
          h={['100%', '100%', '60vh']}
          // bg="#ccc"
          justifyContent="center"
          textAlign="center"
          mx="1.3rem"
          borderRadius="8px"
        >
          <Image
            src="/assets/admin.png"
            my={['1rem', '2rem !important', '5rem']}
          />
        </Box>

        <Stack
          alignItems="center !important"
          justifyContent="center"
          spacing={2}
          w="full"
        >
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
            <Stack gap={3}>
              <PrimaryInput<LoginModel>
                label="Username"
                name="email"
                error={errors.email}
                defaultValue=""
                register={register}
              />
              <PrimaryInput<LoginModel>
                label="Password"
                name="password"
                defaultValue=""
                register={register}
                error={errors.password}
                changePasswordType={changePasswordField}
                type={showPassword ? 'password' : 'text'}
                iconClass={showPassword ? 'fa-eye' : 'fa-eye-slash'}
              />
              <ButtonComponent
                content="Login"
                isValid={isValid}
                loading={loading}
              />
            </Stack>
          </form>
          <Divider mb="1rem !important" mt="1rem !important" />
          <Flex>
            <Text fontSize=".8rem" fontWeight="500">
              Already have an account? &nbsp;
            </Text>
            <Text fontSize=".8rem" fontWeight="bold" color="brand.100">
              <Link href="/register"> Sign Up</Link>
            </Text>
          </Flex>
          <Text color="brand.100" fontWeight="bold">
            <Link href="/login/reset"> Forgot password</Link>
          </Text>
        </Stack>
      </Grid>
    </Box>
  );
};

export default Login;
