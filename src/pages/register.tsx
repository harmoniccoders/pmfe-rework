import {
  Box,
  Divider,
  Flex,
  Heading,
  Image,
  Text,
  Link,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import ButtonComponent from 'lib/components/Button';
import React, { FormEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Register } from 'types/api';
import { useOperationMethod } from 'react-openapi-client';
import { PrimaryInput } from 'lib/Utils/PrimaryInput';
import { useToasts } from 'react-toast-notifications';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const mobile = /^([0]{1})[0-9]{10}$/;
const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  phoneNumber: yup.string().matches(mobile, 'Invalid phone number'),
  password: yup.string().min(8).max(16).required(),
  // phoneNumber1: yup.string().matches(mobile, 'Invalid phone number'),
});

const signupform = () => {
  const [RegisterUser, { loading, data, error }] =
    useOperationMethod('Userregister');

  const [passwordType, setPasswordType] = useState<boolean>(false);

  const changePasswordType = () => {
    setPasswordType(!passwordType);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Register>({
    resolver: yupResolver(schema),
    mode: 'all',
  });
  const { addToast } = useToasts();
  const router = useRouter();

  const onSubmit = async (data: Register) => {
    try {
      const result = await (await RegisterUser(undefined, data)).data;
      console.log({ result });
      if (result.status) {
        addToast('User Successfully Created', {
          appearance: 'success',
          autoDismiss: true,
        });
        Cookies.set('userEmail', JSON.stringify(result.data.email));
        router.push('/verify');
        return;
      }
      addToast(result.message, {
        appearance: 'error',
        autoDismiss: true,
      });
      return;
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Box width="90%" mx="auto" mt={['1.875rem', '2.3rem']}>
      <Flex width="100%" direction={['column', 'column', 'row']}>
        <Box w="100%" border="2px hidden red" pr={[0, 0, '1.25rem']}>
          <Heading
            sx={{
              '::first-letter': {
                textTransform: 'uppercase',
              },
            }}
            lineHeight={1.5}
            mb={['1.8rem', '2.4rem']}
            fontSize={['1.6rem', '1.875rem', '2.3rem']}
            w={['100%', '60%', '100%']}
          >
            enter your very own property one-stop shop!
          </Heading>

          <Box
            display={['none', 'block']}
            w="100%"
            h={[0, '18rem', '25rem']}
            // bg="brand.100"
          >
            <Image
              src="assets/admin.png"
              alt="an image to display"
              w="100%"
              h="100%"
              objectFit="contain"
            />
          </Box>
        </Box>
        <Box
          w={['100%', '80%', '100%']}
          border="2px hidden blue"
          pl={[0, 0, '2.5rem']}
          mt={[0, '20px', 0]}
          margin="auto"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <PrimaryInput<Register>
              label="first name"
              name="firstName"
              error={errors.firstName}
              placeholder="Type in your first name"
              defaultValue=""
              register={register}
            />
            <PrimaryInput<Register>
              label="surname "
              name="lastName"
              error={errors.lastName}
              placeholder="Type in your surname"
              defaultValue=""
              register={register}
            />
            <PrimaryInput<Register>
              label="email"
              name="email"
              error={errors.email}
              placeholder="Enter your email"
              defaultValue=""
              register={register}
            />
            <PrimaryInput<Register>
              label="mobile number"
              name="phoneNumber"
              error={errors.phoneNumber}
              placeholder="Enter your mobile number"
              defaultValue=""
              register={register}
            />
            <PrimaryInput<Register>
              label="mobile number 2"
              name="phoneNumber1"
              error={errors.phoneNumber1}
              placeholder="Enter a second mobile number"
              defaultValue=""
              register={register}
            />
            <PrimaryInput<Register>
              label="Create a Password"
              name="password"
              error={errors.password}
              placeholder="* * * *"
              defaultValue=""
              register={register}
              // type="password"
              // iconClass="fa-eye"
              changePasswordType={changePasswordType}
              type={passwordType ? 'password' : 'text'}
              iconClass={passwordType ? 'fa-eye' : 'fa-eye-slash'}
            />
            <ButtonComponent
              content="sign up"
              isValid={isValid}
              loading={loading}
            />
          </form>

          <Box w="100%" padding="10px 0 10px" fontSize=".9rem">
            <Text w="100%" textAlign="center" fontWeight="500">
              Already have an account?
              <NextLink href="/login" passHref>
                <Link color="brand.100" fontWeight="bold">
                  {' '}
                  Login.
                </Link>
              </NextLink>
            </Text>
          </Box>

          <Divider borderColor="brand.50" />

          <Flex
            w="100%"
            align="center"
            mb="1rem"
            mt=".5rem"
            justify="center"
            fontSize=".7rem"
          >
            <Text textAlign="center" padding="10px 0">
              By creating an account you agree to our &nbsp;
            </Text>
            <NextLink href="#" passHref>
              <Text color="brand.100" cursor="pointer">
                terms &amp; conditions
              </Text>
            </NextLink>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default signupform;
