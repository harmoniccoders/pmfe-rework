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

interface iFormInputs {
  first_name: string;
  surname: string;
  email: string;
  mobile_number: string;
  create_password: string;
  confirm_password: string;
}

const schema = yup.object().shape({
  first_name: yup.string().required(),
  surname: yup.string().required(),
  email: yup.string().email().required(),
  mobile_number: yup.string().required(),
  create_password: yup.string().min(8).max(16).required(),
  confirm_password: yup.string().oneOf([yup.ref('create_password'), null]),
});

const signupform = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<iFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmission = (data: iFormInputs) => {
    console.log(data);
    console.log(6);
  };

  return (
    <Box border="2px solid green" width="100%">
      <Box width="90%" mr="auto" ml="auto" mt={['1.875rem', '2.3rem']}>
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
            <form onSubmit={handleSubmit(onSubmission)}>
              <FormControl>
                <FormLabel
                  htmlFor="firstname"
                  textTransform="capitalize"
                  pos="relative"
                  top={5}
                  left={4}
                  w="90px"
                  zIndex={3}
                  bg="brand.200"
                >
                  first name
                </FormLabel>
                <Input
                  type="text"
                  id="firstname"
                  placeholder="Type in your first name"
                  variant="outline"
                  {...register('first_name')}
                />
                <Text>{errors.first_name?.message}</Text>
              </FormControl>

              <FormControl>
                <FormLabel
                  htmlFor="surname"
                  textTransform="capitalize"
                  pos="relative"
                  top={5}
                  left={4}
                  w="85px"
                  zIndex={3}
                  bg="brand.200"
                >
                  surname
                </FormLabel>
                <Input
                  type="text"
                  id="surname"
                  placeholder="Type in your Surname"
                  variant="outline"
                  {...register('surname')}
                />
              </FormControl>

              <FormControl>
                <FormLabel
                  htmlFor="email"
                  textTransform="capitalize"
                  pos="relative"
                  top={5}
                  left={4}
                  w="60px"
                  zIndex={3}
                  bg="brand.200"
                >
                  email
                </FormLabel>
                <Input
                  type="email"
                  placeholder="Type in your email"
                  id="email"
                  variant="outline"
                  {...register('email')}
                />
              </FormControl>

              <FormControl>
                <FormLabel
                  htmlFor="mobilenumber"
                  textTransform="capitalize"
                  pos="relative"
                  top={5}
                  left={4}
                  w="140px"
                  zIndex={3}
                  bg="brand.200"
                >
                  mobile number
                </FormLabel>
                <Input
                  type="text"
                  placeholder="type in your mobile number"
                  id="mobilenumber"
                  variant="outline"
                  {...register('mobile_number')}
                />
              </FormControl>

              <FormControl>
                <FormLabel
                  htmlFor="password"
                  textTransform="capitalize"
                  pos="relative"
                  top={5}
                  left={4}
                  w="170px"
                  zIndex={3}
                  bg="brand.200"
                >
                  create a password
                </FormLabel>
                <Input
                  type="password"
                  placeholder="* * * *"
                  id="password"
                  variant="outline"
                  {...register('create_password')}
                />
              </FormControl>

              <FormControl>
                <FormLabel
                  htmlFor="confirmpassword"
                  textTransform="capitalize"
                  pos="relative"
                  top={5}
                  left={4}
                  w="190px"
                  zIndex={3}
                  bg="brand.200"
                >
                  retype your password
                </FormLabel>

                <Input
                  type="password"
                  placeholder="* * * *"
                  id="confirmpaassword"
                  variant="outline"
                  {...register('confirm_password')}
                />
              </FormControl>

              <ButtonComponent content="sign up" />
            </form>

            <Box></Box>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default signupform;
