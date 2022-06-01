import {
  Box,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import ButtonComponent from 'lib/components/Button';
import React, { FormEvent } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Register } from 'types/api';
import { useOperationMethod } from 'react-openapi-client';
import { PrimaryInput } from 'lib/Utils/PrimaryInput';
import { useToasts } from 'react-toast-notifications';
import { useRouter } from 'next/router';

const mobile = /^([0]{1})[0-9]{10}$/;
const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  phoneNumber: yup.string().matches(mobile, 'Invalid phone number'),
  password: yup.string().min(8).max(16).required(),
  phoneNumber1: yup.string().matches(mobile, 'Invalid phone number'),
});

const signupform = () => {
  const [RegisterUser, { loading, data, error }] =
    useOperationMethod('Userregister');
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
            bg="brand.100"
          >
            {/* <Image src="" alt="an image to display" /> */}
          </Box>
        </Box>
        <Box
          w={['100%', '80%', '100%']}
          border="2px hidden blue"
          pl={[0, 0, '2.5rem']}
          mt={[0, '20px', 0]}
          margin="auto"
        >
          {/* <form onSubmit={handleSubmit}> */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <PrimaryInput<Register>
              label="first name"
              name="firstName"
              error={errors.firstName}
              defaultValue=""
              register={register}
            />
            <PrimaryInput<Register>
              label="surname "
              name="lastName"
              error={errors.lastName}
              defaultValue=""
              register={register}
            />
            <PrimaryInput<Register>
              label="email"
              name="email"
              error={errors.email}
              defaultValue=""
              register={register}
            />
            <PrimaryInput<Register>
              label="mobile number"
              name="phoneNumber"
              error={errors.phoneNumber}
              defaultValue=""
              register={register}
            />
            <PrimaryInput<Register>
              label="mobile number 2"
              name="phoneNumber1"
              error={errors.phoneNumber1}
              defaultValue=""
              register={register}
            />
            <PrimaryInput<Register>
              label="Create a Password"
              name="password"
              error={errors.password}
              defaultValue=""
              register={register}
              type="password"
            />
            <ButtonComponent
              content="sign up"
              isValid={isValid}
              loading={loading}
            />
          </form>

          <Box></Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default signupform;
